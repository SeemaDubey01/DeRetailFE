var glIndex = 0;
var wsSellDetailsArray = [];
$(document).ready(function(){
    /* write current date and time on page */ 
    let d = new Date();
    $('#date-today').html('<b>Date :</b> ' + d.toDateString() + '   <b>Time:</b> ' + d.toTimeString().substr(0,8));
    
    

    initAddForm();
    /* Calculate total when unit price or quantity changes */
    calculateTotalPrice();
    
});

 /* Calculate total when unit price or quantity changes */
function calculateTotalPrice(){
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
    glIndex = 0;
    wsSellDetailsArray = [];
    calculateBillAmount();
}
function addItem(){
    /*if($('#productCode').val()==0){
        alert ("product code can not be blank");
        return;
    } */
    glIndex++;
    tempHtml =  '<tr><td>'+glIndex+'</td><td>'+$('#productDescr').val()+'</td>';
    tempHtml += '<td id="tdUnitPrice-'+glIndex+'">'+$('#unitPrice').val()+'</td>';
    tempHtml += '<td id="tdQuantity-'+glIndex+'">'+$('#quantity').val()+'</td>'
    tempHtml += '<td id="tdTotalPrice-'+glIndex+'">'+$('#totalPrice').val()+'</td>';
    tempHtml += '<td onclick="tdEditQuantity('+glIndex+')">';
    //tempHtml += '<td onclick="tdEditQuantity(\'tdUnitPrice-'+glIndex+'\',\'tdQuantity-'+glIndex+'\',\'tdTotalPrice-'+glIndex+'\', '+glIndex+')">';
    tempHtml += '<span class="btn fas fa-edit text-primary m-width-td-1" data-toggle="tooltip" title="Update"></span></td></tr>';
    $('#billing-table').append(tempHtml);
    storeWSSellDetails();
    initAddForm();
    calculateBillAmount();
}
function tdEditQuantity(wIndex){
  //  alert (" tdEditQuantity : " + $('#tdUnitPrice-'+wIndex).text() + ", " + $('#tdQuantity-'+wIndex).text() + ", " + $('#tdTotalPrice-'+wIndex).text());
    tempQuantity = $('#tdQuantity-'+wIndex).text();
    $('#tdQuantity-'+wIndex).html('<input type="number" class="form-control m-width-td-4" value="'+ tempQuantity +'" id="in-tdQuantity-'+wIndex+'" onfocusout="tdEditQuantityDone('+wIndex+')">');
    $('#in-tdQuantity-'+wIndex).select();
}
function tdEditQuantityDone(wIndex){
    let totalBill = 0.00;
    tempQuantity = $('#in-tdQuantity-'+wIndex).val();
    totalBill = +$('#tdUnitPrice-'+wIndex).text() * tempQuantity;
    
    $('#tdQuantity-'+wIndex).text(tempQuantity);
    $('#tdTotalPrice-'+wIndex).text(totalBill.toFixed(2));

    wsSellDetailsArray[wIndex-1].quantity = tempQuantity;
    wsSellDetailsArray[wIndex-1].totalPrice = totalBill;
 
    calculateBillAmount()
}
function populateSellDetails(){
	let totalBill = 0.00;
	wsSellDetailsArray.forEach(function(item,index){
		glIndex++;
		$('#billing-table').append('<tr><td>'+glIndex+'</td><td>'+item.productDescr+'</td><td>'+item.unitPrice+'</td><td>'+item.quantity+'</td><td>'+item.totalPrice+'</td></tr>');
		totalBill = +totalBill + +item.totalPrice;
	});
	gst = +totalBill * 0 / 100;
    payable = +totalBill + gst;

    $('#totalBill').text(totalBill.toFixed(2));
    $('#gst').text(gst.toFixed(2));
    $('#payable').text(payable.toFixed(2));

    $('#pay-by-card-amt').text(payable.toFixed(2));
    $('#pay-by-cash-amt').text(payable.toFixed(2));
    $('#reset-details').prop('disabled',true);
}
function initAddForm(){
    let amt =0;
    $('#productCode').val(0);
    $('#productDescr').val('');
    $('#unitPrice').val(amt.toFixed(2));
    $('#quantity').val(0);
    $('#totalPrice').val(amt.toFixed(2));
    $('#pay-by-card-amt').text(amt.toFixed(2));
    $('#pay-by-cash-amt').text(amt.toFixed(2));
    $('#productCode').select();
}
function calculateBillAmount(){
    let totalBill = 0.00;
    let gst = 0.00;
    let payable = 0.00;
    wsSellDetailsArray.forEach(function (item, index){
        totalBill = +totalBill + +item.totalPrice;
    });
    gst = +totalBill * 0 / 100;
    payable = +totalBill + gst;

    $('#totalBill').text(totalBill.toFixed(2));
    $('#gst').text(gst.toFixed(2));
    $('#payable').text(payable.toFixed(2));

    $('#pay-by-card-amt').text(payable.toFixed(2));
    $('#pay-by-cash-amt').text(payable.toFixed(2));
}
function billSubmit(){
    let d = new Date();
    let dateSold =  d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2) + ' ' + d.toTimeString().substr(0,8);
    $('#dateSold').val(dateSold);
    $('#user').val('admin');
  //  $('#sellDetails').val(wsSellDetailsArray);
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
    var wsSellDetails = new WSSellDetails(glIndex, $('#productCode').val(),$('#productDescr').val(),$('#unitPrice').val(),$('#quantity').val(),$('#totalPrice').val());
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