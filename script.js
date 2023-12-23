let slider = document.querySelectorAll('.img');
let ar = document.querySelector('.ar');
let al = document.querySelector('.al');
let acc = document.querySelector('.add-cart-counter');
let addCartCounter = 0;
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

    function addCart(i) {
      addCartCounter++;
      acc.innerText = addCartCounter;
      console.log(i);
      console.log(addCartCounter);

      // cartDetails

      let tr = document.createElement('tr');
      tr.classList.add('table-row');
      tr.innerHTML = `
      <td>${i.id}</td>
      <td>${i.name} </td>
      <td>${i.price}</td>`;

      table.appendChild(tr);
    }
  });

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
iconCart.addEventListener('click', () => {
  if (addCartCounter == 0) {
    table.classList.remove('tb');
  }
  if (addCartCounter != 0) {
    ops.style.display = 'none';
    table.classList.add('tb');
  }
  cartDetails.style.display = 'initial';
});

close.addEventListener('click', () => {
  cartDetails.style.display = 'none';
});

let table = cartDetails.querySelector('table');
