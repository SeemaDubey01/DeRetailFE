function checkSearchOption(){
    if ($('#searchCodeRadio').prop('checked')){
        $('#searchCode').prop("disabled", false);
        $('#searchBrand').prop("disabled", true);
        $('#searchName').prop("disabled", true);
    }
    else {
        if ($('#searchBrandRadio').prop('checked')){
            $('#searchCode').prop("disabled", true);
            $('#searchBrand').prop("disabled", false);
            $('#searchName').prop("disabled", true);
        }
        else {
            $('#searchCode').prop("disabled", true);
            $('#searchBrand').prop("disabled", true);
            $('#searchName').prop("disabled", false);
        }
    }
}
function showProductList(){
    $('#productList-div').show();
    $('#productUpdate-div').hide();
    $('#productDisplay-div').hide();
}
function showProductUpdate(){
    $('#productList-div').hide();
    $('#productUpdate-div').show();
}
function showProductDisplay(){
    $('#productList-div').hide();
    $('#productDisplay-div').show();
}