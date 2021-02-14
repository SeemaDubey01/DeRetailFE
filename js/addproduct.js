var glIndex = 0;
var wsProductDetailArray = [];
function resetProductList(){
    tempHtml  = '<tbody><tr class="table-light"><th>Product Code</th><th>Brand</th><th>SKU</th>';
    tempHtml += '<th>Product Name</th><th>Description</th><th>Image</th><th></th></tr></tbody>'
    $('#product-table').html(tempHtml);
    glIndex = 0;
    wsProductDetailArray = [];
    initAddForm();
}
function initAddForm(){
    $('#productCode').val('');
    $('#brand').val('');
    $('#sku').val('');
    $('#productName').val('');
    $('#productDescr').val('');
    $('#productCode').select();
}
function addProduct(){
    glIndex++;
    tempHtml =  '<tr id="trProduct-'+glIndex+'"><td>'+$('#productCode').val()+'</td><td>'+$('#brand').val()+'</td>';
    tempHtml += '<td>'+$('#sku').val()+'</td><td>'+$('#productName').val()+'</td><td>'+$('#productDescr').val()+'</td>';
    tempHtml += '<td><span class="far fa-image text-secondary" data-toggle="tooltip" title="product_image.jpg" ><div>product_image.jpg</div></td>'
    tempHtml += '<td class="text-center">';
    tempHtml += '<span id="trSpan-'+glIndex+'" class="btn far fa-trash-alt text-danger" data-toggle="tooltip" title="Delete" onclick="eraseProduct('+glIndex+')">';
    tempHtml += '</span></td></tr>';
    
    $('#product-table').append(tempHtml);
    storeWsProductDetail();
    initAddForm();
    return false;
}
function eraseProduct(index){
    wsProductDetailArray.splice(index-1,1);
    while (index < glIndex) {
        $('#trSpan-'+(index+1)).attr("onclick","eraseProduct("+index+")");
        $('#trProduct-'+index).html($('#trProduct-'+(index+1)).html());
        alert("chaged trProduct-"+index);
        index ++;
    }
    $('#trProduct-'+index).remove();
    glIndex--;
   
}
function storeWsProductDetail(){
    var wsProductDetail = new WSProductDetail($('#productCode').val(),$('#brand').val(),$('#sku').val(),$('#productName').val(),$('#productDescr').val());
    wsProductDetailArray.push(wsProductDetail);
}
function WSProductDetail(wsProductCode, wsBrand, wsSKU, wsProductName, wsProductDescr){
    this.productCode = wsProductCode;
    this.brand = wsBrand;
    this.SKU = wsSKU;
    this.prductName = wsProductName;
    this.productDescr = wsProductDescr;
}