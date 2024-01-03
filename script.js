// IMAGE SLIDER
let slider = document.querySelectorAll('.img');
let ar = document.querySelector('.ar');
let al = document.querySelector('.al');

let iconCart = document.querySelector('.icon-cart');

slider.forEach((slide, index) => {
  slide.style.left = `${index * 100}%`;
});

let count = 0;

function next() {
  if (count < slider.length - 1) {
    count++;
    imgslide();
  }
}

function prev() {
  if (count > 0) {
    count--;
    imgslide();
  }
}

function imgslide() {
  slider.forEach((slide) => {
    slide.style.transform = `translateX(-${count * 100}%)`;
  });

  if (count > 0) {
    al.style.display = 'flex';
  }
  if (count == 0) {
    al.style.display = 'none';
  }

  if (count == slider.length - 1) {
    ar.style.display = 'none';
  }

  if (count != slider.length - 1) {
    ar.style.display = 'flex';
  }
}

////////////JSON  ////////////

let ts = document.querySelector('.trend-slider');
let element = [];

/// DATA FETCH ///////

fetch('./json/trend.json')
  .then((respose) => {
    return respose.json();
  })
  .then((val) => {
    val.forEach((p, i) => {
      // CARD DISPLAY
      let pro = document.createElement('div');
      pro.className = 'product-card';
      pro.innerHTML = `<div class="p-img">
        <img src="${p.img}" alt="Casual">
      </div>
      <div class="p-details-sec">
        <div class="p-details">
          <p class="p-name">${p.name}</p>
          <p class="p-cate">${p.category}</p>
          <p class="p-price">&#8377; ${p.price}/-</p>
        </div>
        <div class="add-cart" data-id="${p.id}">
          <i class="fa-solid fa-cart-shopping fa-xl"></i>
          <p>Add Cart</p>
        </div>
    </div>`;

      ts.appendChild(pro);
      element.push(pro);
    });

    element.forEach((ele, i) => {
      ele.style.left = `${i * 28}%`;
    });

    let ac = document.querySelectorAll('.add-cart');
    ac.forEach((v, i) => {
      v.addEventListener('click', () => {
        addCart(val[i]);
      });
    });
  });

// ADD CART

let cart = [];

function addCart(product) {
  // css
  ops.style.display = 'none';
  proceed.style.display = 'initial';

  let qtyUpdate = cart.find((check) => {
    return check.id === product.id;
  });
  if (qtyUpdate) {
    qtyUpdate.quantity++;
    qtyUpdate.qtyPrice = qtyUpdate.price * qtyUpdate.quantity;
  } else {
    acc.textContent++;
    cart.push({ ...product, quantity: 1, qtyPrice: product.price });
  }
  display();
}

// DISPLAY CART

function display() {
  tb.innerHTML = '';
  let sum = 0;
  totalPrice.textContent = sum;
  cart.forEach((i) => {
    let tr = document.createElement('div');
    tr.classList.add('tr');
    tr.innerHTML = `
    <div class="cd-img"><img src="${i.img}" alt="product-image"></div>
    <div class="cd-name">${i.name}</div>
    <input class="cd-qty" type="text" value = "${i.quantity}">
    <div>   
    <i class="fa-solid fa-less-than incre"></i>
    <i class="fa-solid fa-greater-than decre"></i>
    </div>
    <div class="cd-price">${i.qtyPrice}</div>
    <div class="cd-remove"> <i class="fa-solid fa-trash" ></i></div>
    `;
    tb.appendChild(tr);
    sum += +i.qtyPrice;
    totalPrice.textContent = sum;
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
  cart.splice(i, 1);

  if (cart.length != 0) {
    display();
  } else {
    ops.style.display = 'initial';
    total.style.display = 'none';
    proceed.style.display = 'none';
    display();
  }
}

function increment(i) {
  cart[i].quantity++;
  cart[i].qtyPrice = cart[i].price * cart[i].quantity;
  display();
  console.log(cart);
}

function decrement(i) {
  cart[i].quantity--;
  if (cart[i].quantity != 0) {
    cart[i].qtyPrice = cart[i].price * cart[i].quantity;
    display();
  } else {
    remove(i);
  }
}

// Trend Slider

let c = 0;

function n() {
  if (c < element.length - 6) {
    c++;
    trendslide();
  }
}

function p() {
  if (c > 0) {
    c--;
    trendslide();
  }
}

function trendslide() {
  if (c == 2) {
    element.forEach((slide) => {
      slide.style.transform = `translateX(-${c * 230}%)`;
    });
  } else
    element.forEach((slide) => {
      slide.style.transform = `translateX(-${c * 300}%)`;
    });
}

// ICON CART

let cartDetails = document.querySelector('.cart-details');
let close = cartDetails.querySelector('.close');
let ops = cartDetails.querySelector('p');
// let hitems = cartDetails.querySelector('h2');
let tb = cartDetails.querySelector('.tb');
let acc = document.querySelector('.add-cart-counter');
const proceed = document.querySelector('.proceed');

iconCart.addEventListener('click', () => {
  if (acc.textContent == 0) {
    tb.classList.remove('tb');
    proceed.style.display = 'none';
    total.style.display = 'none';
  }
  if (acc.textContent != 0) {
    ops.style.display = 'none';
    tb.classList.add('tb');
    proceed.style.display = 'initial';
    total.style.display = 'flex';
  }
  cartDetails.style.display = 'initial';
});

close.addEventListener('click', () => {
  cartDetails.style.display = 'none';
});

let total = cartDetails.querySelector('.total');
let totalPrice = cartDetails.querySelector('.total-price');
