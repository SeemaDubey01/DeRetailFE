function printReceipt(){
    var oldBody = $('body').html();
    $('body').html($('#print-div').html());
    $('#header').hide();
    $('#footer').hide();
    window.print();
    $('body').html(oldBody);
}