require('dotenv').config();
var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
const e = require('express');
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var pgp = require('pg-promise')();

const dev_dbConfig = {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_DATABASE,
	user:  process.env.DB_USER,
	password: process.env.DB_PASSWORD
};

const isProduction = process.env.NODE_ENV === 'production';
const dbConfig = isProduction ? process.env.DATABASE_URL : dev_dbConfig;

if (isProduction) {
  pgp.pg.defaults.ssl = {rejectUnauthorized: false};
}

const db = pgp(dbConfig);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));

app.get('/', function(req, res) {
    var select = 'SELECT * FROM inventory;';

	db.any(select)
    .then(function (rows) {
        // console.log(rows)
        res.render('main', {
            items: rows,
            message: 'Lite Version - Go Pro For Only $9.99/Month'
        })
    })
    .catch(function (err) {
        console.log(err);
        res.render('main', {
            items: '',
            message: 'There was an error with loading the page. Please try again!'   
        })
    })
});

app.post('/create', function(req, res) {
    var item_name = req.body.item_name;

    // dollar quotes to deal with apostrophes, for whatever reason
    var insert = `INSERT INTO inventory(item) values ($$${item_name}$$);`;

    // Once item is added, reload page to see in inventory
	db.any(insert)
    .then(function (rows) {
        res.redirect('/');
    })
    .catch(function (err) {
        console.log(err);
        res.render('main', {
            items: '',
            message: 'There was an error with adding your item. Please try again!'
        })
    })

});

app.post('/edit', function(req, res) {

    var type = req.body.type;
    var id = req.body.id;
    
    // console.log(type);

    if (type === 'delete') {

        var del = `DELETE FROM inventory WHERE id=${id};`;

        db.any(del)
        .then(function (rows) {
            res.redirect('/');
        })
        .catch(function (err) {
            console.log(err);
            res.render('main', {
                items: '',
                message: 'There was an error with deleting the item. Please try again!'
            })
        })
    }
    else if (type === 'edit') {
        var item_name = req.body.item;
        console.log(`Editing: ${item_name}`)

        var update = `UPDATE inventory SET item=$$${item_name}$$ WHERE id=${id};`;
        console.log(update);

        db.any(update)
        .then(function (rows) {
            res.redirect('/');
        })
        .catch(function (err) {
            console.log(err);
            res.render('main', {
                items: '',
                message: 'There was an error with updating the item. (Item name length is max 255 characters.) Please try again!'
            })
        })
    }
    
});

const server = app.listen(process.env.PORT || 5432, () => {
    console.log('5432 is the magic port');
});