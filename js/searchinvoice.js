$(document).ready(function (){
   // $('#sell-detail-div').hide();
})

function selldetails(){
    $('#sell-header-div').hide();
    $('#sell-detail-div').show();
}
function sellupdate(){
    alert("updating details")
}
function showSellHeader(){
    $('#sell-header-div').show();
    $('#sell-detail-div').hide();
}
function enableSearchByBill(){
    if ($('#srchBillCheckbox').prop('checked')){
        var now = new Date();
        alert(now.getDay() + ' ' + (now.getMonth()+1));
        var today = now.getFullYear() + "-" + ("0" + (now.getMonth() + 1)).slice(-2) + "-" + ("0" + now.getDate()).slice(-2) ;
        $('#srchStartDate').val(today);
        $('#srchEndDate').val(today);
        $('#srchStartDate').prop("disabled", true);
        $('#srchEndDate').prop("disabled", true);
        $('#srchBillNo').prop("disabled", false);
    }
    else {
        $('#srchStartDate').prop("disabled", false);
        $('#srchEndDate').prop("disabled", false);
        $('#srchBillNo').val(0);
        $('#srchBillNo').prop("disabled", true);
    }
}