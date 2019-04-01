//let cart = [];
//let products = [
//               {
//                   name: 'bag',
//                   color: 'green',
//                   cost: 150,
//                   cover: "img/layer1.jpg"
//               },
//                {
//                   name: 'pump',
//                   color: 'white', 
//                   cost: 555,
//                   cover: "img/layer2.jpg" 
//               },
//                {
//                   name: 'jacket',
//                   color: 'blue',  
//                   cost: 259,
//                   cover: "img/layer3.jpg" 
//               },
//                {
//                   name: 'parkа',
//                   color: 'green',
//                   cost: 150,
//                   cover: "img/layer4.jpg"
//               },
//                {
//                   name: 'coat',
//                   color: 'white', 
//                   cost: 555,
//                   cover: "img/layer5.jpg" 
//               },
//                {
//                   name: 'blazer',
//                   color: 'blue',  
//                   cost: 259,
//                   cover: "img/layer6.jpg" 
//               },
//                {
//                   name: 'furs',
//                   color: 'green',
//                   cost: 150,
//                   cover: "img/layer7.jpg"
//               },
//                {
//                   name: 'shirt',
//                   color: 'white', 
//                   cost: 555,
//                   cover: "img/layer8.jpg" 
//               },
//               
//           ];



//class Item {
//    constructor(id, className, tagName){
//        this.id = id;
//        this.className = className;
//        this.tagName = tagName;
//    }
//    
// }

//class Menu extends Container{
//    constructor(id, className, items){
//        
//    super(id, className, 'ul');
//    this.items = items;
//}

// создаёт разметку для каждого товара
const $productsWrap = document.getElementById('productsWrap');
const $cart = document.getElementById('cart');

//function sendRequest(url) {
//    return fetch(url).then((response) => response.json());
//}




function sendRequest(url, callBack) {
    const xhrj = new XMLHttpRequest();
          xhrj.open('GET', url);
          xhrj.send();
          
          xhrj.onreadystatechange = () => {
              if(xhrj.readyState === xhrj.DONE) {
                 callBack(JSON.parse(xhrj.responseText)); 
                 
              }
          }
};


class Item {
    constructor(name, price){
        this.name = name;
        this.price = price;
    }
    
    render(){
    return `<div class="item"><h3>${this.name}<span>${this.price}</span></h3></div>`;
    
}
}

class ItemsList {
    constructor(){
        this.items = [];
   }
    getItems(callBack) { 
//       return sendRequest('http://localhost:3000/product.json').then((products) => { 
//        this.items = products.map(item => new Item(item.name, item.price));
//        return this.items;                                                                     
//           
//       });
        
        sendRequest('http://localhost:3000/product.json', (products) => {this.items = products.map(item => new Item(item.name, item.price));
        
        callBack();
        });
    }
    
    
    render() {
        const itemsHtml = this.items.map(item => item.render());
                                         
        return itemsHtml.join('');                                 
    }
    // считает сумму товаров
    total() {
        return this.items.reduce((acc, item) => acc + item.price, 0);
    }
}

const items = new ItemsList();
items.getItems(() => $productsWrap.innerHTML = items.render());

//items.getItems().then(() => {
//    $productsWrap.innerHTML = items.render();
//});


// классы для корзины

//class ItemCart() {
//    
//    deleteCart();
//    
//};
//
//class ListCart(){
//    
//    totalCart();
//};



 const $buttonCtr = document.querySelector('#control');
      $buttonCtr.addEventListener('click', () => {
         sendRequest('http://localhost:3000/product.json', (products) => $cart.innerHTML = products.map(item => `<li>${item.name}: ${item.price}</li>`));
      });