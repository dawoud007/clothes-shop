window.addEventListener('scroll', function() {
    let header = this.document.querySelector('header')
    header.classList.toggle('sticky', window.scrollY > 0)
})

function toggleMenu() {
    let menuToggle = document.querySelector('.toggle')
    let menu = document.querySelector('.menu')
    menuToggle.classList.toggle('active')
    menu.classList.toggle('active')
}
///////////////////////////////////////////////////////////////
//shopping carg
let carts=document.querySelectorAll(".addCart")
let products=[
    {
        name:'red Tshirt',
        tag:'product-1.jpg',
        price:50,
        inCart:0
},
{
    name:' sports shoes',
    tag:'product-2.jpg',
    price:100,
    inCart:0
},
{
    name:' classic grey trouser',
    tag:'product-3.jpg',
    price:75,
    inCart:0
},
{
    name:'grey Tshirt',
    tag:'product-4.jpg',
    price:50,
    inCart:0
},
{
    name:'grey Shoes',
    tag:'product-5.jpg',
    price:75,
    inCart:0
},
{
    name:'black Tshirt',
    tag:'product-6.jpg',
    price:15,
    inCart:0
},
{
    name:'socks collection',
    tag:'product-7.jpg',
    price:45,
    inCart:0
},
{
    name:'dark watch',
    tag:'product-8.jpg',
    price:15,
    inCart:0
},
{
    name:'Modern watch',
    tag:'product-9.jpg',
    price:200,
    inCart:0
},
{
    name:'sports black shoes',
    tag:'product-10.jpg',
    price:150,
    inCart:0
},
{
    name:' well made grey shoes',
    tag:'product-11.jpg',
    price:98,
    inCart:0
},
{
    name:'modern black trousers',
    tag:'product-12.jpg',
    price:150,
    inCart:0
}
,
{
    name:'orange shoes',
    tag:'category-1.jpg',
    price:150,
    inCart:0
}
,
{
    name:'classic shoes',
    tag:'category-2.jpg',
    price:150,
    inCart:0
}
,
{
    name:'white sweatshirt',
    tag:'category-3.jpg',
    price:170,
    inCart:0
}
,
{
    name:'modern touch watch',
    tag:'exclusive.png',
    price:200,
    inCart:0
}

]
for(let i=0;i<carts.length;i++){
    carts[i].addEventListener('click',()=>{
        cartNumbers(products[i])
        totalPrice(products[i])
        
       
    })

}
function onloadCartNunbers(){
    let productNumbers=localStorage.getItem("cartNumbers")
    if(productNumbers){
        document.querySelector('.theCart').textContent=productNumbers
    }
}

function cartNumbers(product){
   
let productNumbers=localStorage.getItem("cartNumbers")
productNumbers=parseInt(productNumbers)

if(productNumbers){
    localStorage.setItem('cartNumbers',productNumbers+1)
    document.querySelector('.theCart').textContent=productNumbers+1 
}
else{
    localStorage.setItem('cartNumbers',1)
    document.querySelector('.theCart').textContent=1
}
setitems(product)

}
function setitems(product){
console.log(product.tag)
    let cartItems=localStorage.getItem('productInCart')
    cartItems=JSON.parse(cartItems)
   
    if(cartItems !=null){
     if(cartItems[product.tag]==undefined){
         cartItems={
             ...cartItems,
             [product.tag]:product
         }
     }
        cartItems[product.tag].inCart+=1
        
 
    }else{
        product.inCart = 1 
        cartItems={
            [product.tag]:product
        }
    }
    localStorage.setItem('productInCart',JSON.stringify(cartItems))


}
function totalPrice(product){
    let cartCost=localStorage.getItem('totalPrice')
    if(cartCost!=undefined||null){
        cartCost=parseInt(cartCost)
        localStorage.setItem('totalPrice',product.price+cartCost)
    }else{
        localStorage.setItem('totalPrice',product.price)
    }
   
    
}
function displayCart(){
let cartItems=localStorage.getItem('productInCart')
let cartCost=localStorage.getItem('totalPrice')
cartItems=JSON.parse(cartItems)
let productContainer=document.querySelector('.products')
if(cartItems&&productContainer){
    productContainer.innerHTML=''
    Object.values(cartItems).map(item =>{
        
    productContainer.innerHTML+=`  
    <div class="producting">
    <div>
  
    <i class="far fa-times-circle deleting"></i>
    <img src="images/${item.tag}">

    <span>${item.name}</span>
    </div>
   
    <div class="price">${item.price} </div>
    <div class="quantity">${item.inCart}</div>
    <div class="total">${item.inCart * item.price}</div>
    </div>
`
    })
    productContainer.innerHTML +=`

    <div class="basketTotal ">
    <i class="far fa-times-circle delet  delall">delete all</i>
<h4 class="basketTitle">basket total</h4>
<h4 class="basketTotalPrice">
$${cartCost}
    </div>
    `
   
}


}
function deleting(){

    let cartItems=localStorage.getItem('productInCart')
 cartItems=JSON.parse(cartItems)
    let deleted=document.querySelectorAll('.deleting')
    console.log(cartItems)
   
        
        
    for(let i=0;i<deleted.length;i++){

        deleted[i].addEventListener('click',()=>{
           deleted[i].parentElement.parentElement.remove()
        
          decrease()
          delCartItems(products[i])
          
        })
        
      
}



}
function decrease()
{
    let productNumbers=localStorage.getItem("cartNumbers")
    productNumbers=parseInt(productNumbers)

    if(productNumbers){
        localStorage.setItem('cartNumbers',productNumbers-1)
        document.querySelector('.theCart').textContent=productNumbers-1
}
}
function delCartItems(product){
    let cartItems=localStorage.getItem('productInCart')
    cartItems=JSON.parse(cartItems)
    Object.values(cartItems).map(item =>{
        item=null
        cartItems={
           [product.tag]:item
        }

        localStorage.setItem('productInCart',JSON.stringify(cartItems))
    })
    console.log(cartItems)
}
function dela(){
    let productContainer=document.querySelector('.products')
let delall=document.querySelector('.delall')
delall.addEventListener('click',()=>{
    localStorage.removeItem('productInCart')
    localStorage.removeItem("cartNumbers")
    localStorage.removeItem('totalPrice')
    productContainer.innerHTML =` select items`
})
}

onloadCartNunbers()
displayCart() 
deleting()  
dela()
