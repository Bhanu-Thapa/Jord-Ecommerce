let allProduct = document.querySelector('.all-product');

// media

let media = window.matchMedia('(max-width:480px)');

fetch('./json/men.json')
  .then((response) => {
    return response.json();
  })
  .then((value) => {
    value.forEach((element) => {
      let card = document.createElement('div');
      card.classList.add('product-card', 'all-card');
      card.innerHTML = `
      <div class="p-img">
    <img src="${element.img}" alt="Casual">
  </div>
  <div class="p-details-sec">
    <div class="p-details">
      <p class="p-name">${element.name}</p>
      <p class="p-cate">${element.category}</p>
      <p class="p-price">&#8377; ${element.price}/-</p>
    </div>
    <div class="add-cart" data-id="${element.id}">
      <i class="fa-solid fa-cart-shopping fa-xl"></i>
      <p>Add Cart</p>
    </div>
  </div>
      `;

      allProduct.appendChild(card);
    });

    // style logic for big title

    let bigTitle = document.querySelectorAll('.p-name');
    bigTitle.forEach((ele) => {
      if (ele.textContent.length > 24) {
        ele.style.fontSize = '16px';
        ele.style.fontWeight = '500';
      }
    });

    if (media.matches) {
      bigTitle.forEach((ele) => {
        if (ele.textContent.length > 24) {
          ele.style.fontSize = '12px';
          ele.style.fontWeight = '500';
        }
      });
    }

    // ADD CART

    let ac = document.querySelectorAll('.add-cart');
    ac.forEach((v, i) => {
      v.addEventListener('click', () => {
        addCart(value[i]);
      });
    });
  });

// ADD CART

let allCart = [];

function addCart(product) {
  // css
  ops.style.display = 'none';
  proceed.style.display = 'initial';

  let qtyUpdate = allCart.find((check) => {
    return check.id === product.id;
  });
  if (qtyUpdate) {
    qtyUpdate.quantity++;
    qtyUpdate.qtyPrice = qtyUpdate.price * qtyUpdate.quantity;
  } else {
    acc.textContent++;
    allCart.push({ ...product, quantity: 1, qtyPrice: product.price });
  }
  display();
}

// DISPLAY CART

function display() {
  tb.innerHTML = '';
  let sum = 0;
  totalPrice.textContent = sum;
  allCart.forEach((i) => {
    let tr = document.createElement('div');
    tr.classList.add('tr');
    tr.innerHTML = `
    <div class="cd-img"><img src="${i.img}" alt="product-image"></div>
    <div class="cd-name">${i.name}</div>
    <input class="cd-qty" type="text" value = "${i.quantity}">
    <div class="cd-inde">  
    <i class="fa-solid fa-less-than incre"></i>
    <i class="fa-solid fa-greater-than decre"></i>
    </div>
    <div class="cd-price">${i.qtyPrice}</div>
    <div class="cd-remove"> <i class="fa-solid fa-trash" ></i></div>
    `;
    tb.appendChild(tr);
    sum += +i.qtyPrice;
    totalPrice.textContent = sum;
    total.style.display = 'flex';
  });

  // INCREMENT AND DECREMENT

  let incre = document.querySelectorAll('.incre');
  let decre = document.querySelectorAll('.decre');

  incre.forEach((inc, i) => {
    inc.addEventListener('click', () => {
      increment(i);
    });
  });
  decre.forEach((dec, i) => {
    dec.addEventListener('click', () => {
      decrement(i);
    });
  });

  // REMOVE
  let rem = document.querySelectorAll('.cd-remove');

  rem.forEach((rem, i) => {
    rem.addEventListener('click', () => {
      remove(i);
    });
  });
}

// REMOVE
function remove(i) {
  acc.textContent--;
  allCart.splice(i, 1);

  if (allCart.length != 0) {
    display();
  } else {
    ops.style.display = 'block';
    total.style.display = 'none';
    proceed.style.display = 'none';
    display();
  }
}

function increment(i) {
  allCart[i].quantity++;
  allCart[i].qtyPrice = allCart[i].price * allCart[i].quantity;
  display();
}

function decrement(i) {
  allCart[i].quantity--;
  if (allCart[i].quantity != 0) {
    allCart[i].qtyPrice = allCart[i].price * allCart[i].quantity;
    display();
  } else {
    remove(i);
  }
}

// SEARCH

let input = document.querySelector('#input');

input.addEventListener('keyup', search);

function search() {
  let items = allProduct.querySelectorAll('.all-card');

  let inputValue = input.value.toUpperCase();

  items.forEach((ele) => {
    let itemName = ele.querySelector('.p-name');

    if (itemName.textContent.toUpperCase().indexOf(inputValue) > -1) {
      console.log(itemName.textContent.toUpperCase().indexOf(inputValue));
      ele.style.display = 'initial';
    } else {
      ele.style.display = 'none';
    }
  });
}
