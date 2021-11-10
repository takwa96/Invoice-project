function displayOptions() {
    var products = JSON.parse(localStorage.getItem("products") || "[]");

    var options = `
    <option> Select a product </option>
    `;

    for (let i = 0; i < products.length; i++) {
        options += `
        <option value='${products[i].id}'>${products[i].productName}</option>
        `;
        
    }

    document.getElementById('productsList').innerHTML = options;

}

function goToInvoice() {
    var productId = document.getElementById("productsList").value;
    var qty = document.getElementById("qty").value;

    console.log("productId",productId);
    console.log("qty",qty);

    localStorage.setItem("productOrder",productId);
    localStorage.setItem("qtyOrder",qty);

    location.replace("invoice.html");

}

function displayInvoice() {
    var today = new Date();
    var dateTime = today.toLocaleString();
    console.log(dateTime);

    document.getElementById("dateNow").innerHTML = dateTime;

    var productId = localStorage.getItem("productOrder");
    var qty = localStorage.getItem("qtyOrder");

    var product = searchById(productId,"products");
    var invoiceTable = `
    <table class="table table-striped">
                     <thead>
                         <tr>
                             <th>Product Name</th>
                             <th class="right">Price</th>
                             <th class="center">Qty</th>
                         </tr>
                     </thead>
                     <tbody>
                         <tr>
                             <td class="left strong">${product.productName}</td>
                             <td class="left">${product.price} DT</td>
                             <td class="right">${qty} pieces</td>
                          
                         </tr>
                      
                     </tbody>
                 </table>`;

    document.getElementById("invoiceTable").innerHTML = invoiceTable;

    var total = `
    <table class="table table-clear">
    <tbody>
        <tr>
            <td class="left">
                <strong class="text-dark">Total</strong>
            </td>
            <td class="right">${Number(product.price) * Number(qty)} DT</td>
        </tr>
        
    </tbody>
</table>`;

document.getElementById("total").innerHTML = total;
}

function searchById(id,key) {
    var Tab = JSON.parse(localStorage.getItem(key) || "[]");
    var obj;
    for (let i = 0; i < Tab.length; i++) {
        if (Tab[i].id == id) {
            obj = Tab[i];
        }
        
    }

    return obj ;
}