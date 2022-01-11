// edit button: when clicked, allows user to edit the text fields
$(document).on('click', '.btn-edit', function () {
    var $this = $(this);

    // make fields editable
    $this.siblings(".form-display-editable").toggleClass("form-control-plaintext form-control");
    $this.siblings(".form-display-editable").removeAttr("readonly");

    $this.siblings(".select-div").children(".stock").removeAttr("disabled");

    // change from an edit button to an update button (submit)
    $this.html("Update");
    $this.toggleClass("btn-edit btn-update");
});

// update button: after editing enabled, updates data in database <3:o] <-- clown face
$(document).on('click', '.btn-update', function () {
    var $this = $(this);
    $this.attr("name", "type");
    $this.attr("value", "edit");
    $this.attr("type", "submit");
});

// disable enter to submit form, which defaults to the delete button
$(".inventory-item").keypress(function(event){
    if (event.which == '13') {
        event.preventDefault();
    }
});

function exportCSV() {

    var ids = document.getElementsByClassName("id");
    var items = document.getElementsByClassName("item");
    var stocks = document.getElementsByClassName("stock");
    var data = 'id, item, stock\n';
    
    for (i = 0; i < ids.length; i++) {
        console.log(ids[i]);
        data += ids[i].value + ',' + items[i].value + ',' + stocks[i].value + '\n';
    }

    // referenced: https://code-boxx.com/create-save-files-javascript/

    var a = document.createElement("a");
    a.href = window.URL.createObjectURL(new Blob([data], {type: "text/csv"}));
    a.download = "export.csv";
    a.click(); 
}