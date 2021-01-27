var index = 0;
var wsSellDetailsArray = [];
$(document).ready(function(){
    /* write current date and time on page */ 
    let d = new Date();
    alert ('timestamp : ' + d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2) + ' ' + d.toTimeString().substr(0,8));
    $('#date-today').html('<b>Date :</b> ' + d.toDateString() + '   <b>Time:</b> ' + d.toTimeString().substr(0,8));
    
    /* change background color of input boxes */
    inputBgColor();

    initAddForm();
    /* Calculate total when unit price or quantity changes */
    calculateTotalPrice();
    
});
 /* change background color of input boxes */
function inputBgColor(){
    $('input').focusin(function(){
        $(this).css("background-color","#FFFFCC");
    });
    $('input').focusout(function(){
        $(this).css("background-color","#FFFFFF");
    });
    $('input').focus(function(){$(this).select();})
}
 /* Calculate total when unit price or quantity changes */
function calculateTotalPrice(index){
    let totalPrice = 0;
    $('#quantity').focusout(function(){
        totalPrice = $('#quantity').val() * $('#unitPrice').val();
        $('#totalPrice').val(totalPrice.toFixed(2));  
    });
    $('#unitPrice').focusout(function(){
        totalPrice = $('#quantity').val() * $('#unitPrice').val();
        $('#totalPrice').val(totalPrice.toFixed(2));  
    });
}
function resetNewBill(){
    $('#billing-table').html('<tbody><tr class="table-light"><th>#</th><th>Description</th><th>Unit Price</th><th>Qty</th><th>Total Price</th></tr></tbody>');
    index = 0;
    wsSellDetailsArray = [];
    calculateBillAmount();''
}
function addItem(){
    /*if($('#productCode').val()==0){
        alert ("product code can not be blank");
        return;
    } */
    index++;
    $('#billing-table').append('<tr><td>'+index+'</td><td>'+$('#productDescr').val()+'</td><td>'+$('#unitPrice').val()+'</td><td>'+$('#quantity').val()+'</td><td>'+$('#totalPrice').val()+'</td></tr>');
    storeWSSellDetails();
    initAddForm();
    calculateBillAmount();
}
function initAddForm(){
    let amt =0;
    $('#productCode').val(0);
    $('#productDescr').val('');
    $('#unitPrice').val(amt.toFixed(2));
    $('#quantity').val(0);
    $('#totalPrice').val(amt.toFixed(2));
    $('#productCode').select();
}
function calculateBillAmount(){
    let totalBill = 0.00;
    let gst = 0.00;
    let payable = 0.00;
    wsSellDetailsArray.forEach(function (item, index){
    //    console.log("index: " + index + " amt: " + item.totalPrice);
        totalBill = +totalBill + +item.totalPrice;
    });
    gst = totalBill * 18 / 100;
    payable = +totalBill + gst;

    $('#totalBill').text(totalBill.toFixed(2));
    $('#gst').text(gst.toFixed(2));
    $('#payable').text(payable.toFixed(2));

    $('#pay-by-card-amt').text(payable.toFixed(2));
    $('#pay-by-cash-amt').text(payable.toFixed(2));
}
function billSubmit(){
    $('#user').val('admin');
    $('#sellDetails').val(wsSellDetailsArray);
    wsSellDetailsArray.forEach(function(item,index){
    	$('#billing-form').append('<input type="hidden" name="sellDetails['+index+'].itemNo" value="'+item.itemNo+'">');
    	$('#billing-form').append('<input type="hidden" name="sellDetails['+index+'].productCode" value="'+item.productCode+'">');
    	$('#billing-form').append('<input type="hidden" name="sellDetails['+index+'].productDescr" value="'+item.productDescr+'">');
    	$('#billing-form').append('<input type="hidden" name="sellDetails['+index+'].unitPrice" value="'+item.unitPrice+'">');
    	$('#billing-form').append('<input type="hidden" name="sellDetails['+index+'].quantity" value="'+item.quantity+'">');
    });
    $('#billing-form').submit();
}
function storeWSSellDetails(){
    var wsSellDetails = new WSSellDetails(index-1, $('#productCode').val(),$('#productDescr').val(),$('#unitPrice').val(),$('#quantity').val(),$('#totalPrice').val());
    wsSellDetailsArray.push(wsSellDetails);
}
function WSSellDetails(wsIndex, wsProductCode, wsProductDescr, wsUnitPrice, wsQuantity){
    this.itemNo = wsIndex;
    this.productCode = wsProductCode;
    this.productDescr = wsProductDescr;
    this.unitPrice = wsUnitPrice;
    this.quantity = wsQuantity;
    this.totalPrice = (wsUnitPrice * wsQuantity).toFixed(2);
}