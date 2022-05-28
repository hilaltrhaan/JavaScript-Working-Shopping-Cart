let cartIcon = document.querySelector("#cart-icon");

let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

cartIcon.onclick = () => {
  cart.classList.add("active");
};
closeCart.onclick = () => {
  cart.classList.remove("active");
};

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

//Making Function
function ready(){
 var removeCartButtons =document.getElementsByClassName('cart-remove')
 console.log(removeCartButtons)
 for (var i=0;  i< removeCartButtons.length; i++){
   var button= removeCartButtons[i]
   button.addEventListener('click',removeCartItem)
 }
 //Quantiy Changes
 var quantityInputs = document.getElementsByClassName('cart-quantity')
 for (var i=0;  i< quantityInputs.length; i++){
   var input =quantityInputs[i]
   input.addEventListener('change',quantityChanged);

 }
 //Add to cart
 var addCart = document.getElementsByClassName('add-cart');
 for (var i=0;  i< addCart.length; i++){
   var button= addCart[i]
   button.addEventListener('click',addCartClicked)
 }
 //Buy button Work
 document.getElementsByClassName('btn-buy')[0].addEventListener('click',buyButtonClicked);
}

//Buy button 
function buyButtonClicked(){
  alert('Siparisiniz verilmistir... ')
  var cartContent =document.getElementsByClassName('cart-content')[0]
  while(cartContent.hasChildNodes()){
    cartContent.removeChild(cartContent.firstChild);
  }
updateTotal();
}


function removeCartItem(event){
  var buttonClicked = event.target
  buttonClicked.parentElement.remove()
  updateTotal();
}
//Add to cart
function addCartClicked(event){
  var button= event.target
  var shopProducts = button.parentElement
  var title =shopProducts.getElementsByClassName('product-title')[0].innerText;
   var price =
     shopProducts.getElementsByClassName("price")[0].innerText;
      var productImg =
        shopProducts.getElementsByClassName("product-img")[0].src;
       addProductToCart(title,price,productImg);
       updateTotal();

}
function addProductToCart(title,price,productImg){
  var cartShopBox = document.createElement('div')
  cartShopBox.classList.add('cart-box')
  var cartItems= document.getElementsByClassName('cart-content')[0];

  var cartItemNames =cartItems.getElementsByClassName('cart-product-title')
  for (var i=0;  i< cartItemNames.length; i++){
    if(cartItemNames[i].innerText==title){
    alert('Bu ürünü sepetinize zaten eklediniz');
    return;
     
    }

  }
var cartBoxContent = `<img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">Earbuds</div>
                            <div class="cart-price">$25</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <!-- remove cart -->
                        <i class='bx bxs-trash-alt cart-remove' ></i>`;

cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox)
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click',removeCartItem)

cartShopBox
  .getElementsByClassName("cart-quantity")[0]
  .addEventListener("change", quantityChanged);



}
//Quantity Changes
function quantityChanged(event){
  var input = event.target
  if(isNaN(input.value) || input.value <= 0){
    input.value=1;
  }
  updateTotal();
}


//Update Total

function updateTotal(){
  var cartContent = document.getElementsByClassName('cart-content')[0]
  var  cartBoxes = cartContent.getElementsByClassName('cart-box')
  var total=0;
   for (var i=0;  i< cartBoxes.length; i++){

 var cartBox= cartBoxes[i];
 var priceElement= cartBox.getElementsByClassName('cart-price')[0];
 var quantityElement= cartBox.getElementsByClassName('cart-quantity')[0];
 var price =parseFloat(priceElement.innerText.replace("$", ""));
 var quantity= quantityElement.value;
 total=total +  (price * quantity);
   }
 total =Math.round(total *100) /100;



 document.getElementsByClassName('total-price')[0].innerText = '$' + total;

}