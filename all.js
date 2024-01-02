let allProduct = document.querySelector('.all-product');

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

    let bigTitle = document.querySelectorAll('.p-name');
    bigTitle.forEach((ele) => {
      if (ele.textContent.length > 24) {
        ele.style.fontSize = '16px';
        ele.style.fontWeight = '500';
      }
    });

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
    qtyUpdate.price *= qtyUpdate.quantity;
  } else {
    acc.textContent++;
    allCart.push({ ...product, quantity: 1 });
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
    <input class="cd-qty" type="number" min="1" value = "${i.quantity}">
    <div class="cd-price">${i.price}</div>
    <div class="cd-remove"> <i class="fa-solid fa-trash" ></i></div>
    `;
    tb.appendChild(tr);
    sum += +i.price;
    totalPrice.textContent = sum;
  });

  // ADD CART
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
  console.log(allCart.length);
  if (allCart.length > 0) {
    display();
  } else {
    ops.style.display = 'initial';
    total.style.display = 'none';
    proceed.style.display = 'none';
    display();
  }
}
