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

// json

let ts = document.querySelector('.trend-slider');
let element = [];
product = fetch('./json/trend.json')
  .then((respose) => {
    return respose.json();
  })
  .then((val) => {
    val.forEach((p, i) => {
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

    // trend slider
    element.forEach((ele, i) => {
      ele.style.left = `${i * 28}%`;
    });

    // add cart

    let ac = document.querySelectorAll('.add-cart');
    ac.forEach((v, i) => {
      v.addEventListener('click', () => {
        addCart(val[i]);
      });
    });
  });

let cart = [];

function addCart(product) {
  acc.textContent++;
  let qtyUpdate = cart.find((check) => {
    return check.id === product.id;
  });
  if (qtyUpdate) {
    qtyUpdate.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  console.log(cart);
  display();
}

// DISPLAY
// cartDetails

function display() {
  tb.innerHTML = '';
  cart.forEach((i) => {
    let tr = document.createElement('div');
    tr.classList.add('tr');
    tr.innerHTML = `
    <div class="cd-img"><img src="${i.img}" alt=""></div>
    <div class="cd-name">${i.name}</div>
    <input class="cd-qty" type="number" min="1" value = "${i.quantity}">
    <div class="cd-price">${i.price}</div>
    <div class="cd-remove">remove</div>
    `;
    tb.appendChild(tr);
  });
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
let hitems = cartDetails.querySelector('h2');
let tb = cartDetails.querySelector('.tb');
let acc = document.querySelector('.add-cart-counter');
iconCart.addEventListener('click', () => {
  if (acc.textContent == 0) {
    tb.classList.remove('tb');
  }
  if (acc.textContent != 0) {
    ops.style.display = 'none';
    tb.classList.add('tb');
  }
  cartDetails.style.display = 'initial';
});

close.addEventListener('click', () => {
  cartDetails.style.display = 'none';
});
