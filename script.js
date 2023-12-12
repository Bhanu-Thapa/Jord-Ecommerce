let slider = document.querySelectorAll('.img');
let ar = document.querySelector('.ar');
let al = document.querySelector('.al');

console.log(slider);

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

fetch('./json/trend.json')
  .then((respose) => {
    return respose.json();
  })
  .then((val) => {
    val.forEach((p) => {
      let pro = document.createElement('div');
      pro.innerHTML = ` <div class='product-card'>
      <div class="p-img">
        <img src="${p.img}" alt="Casual">
      </div>
      <div class="p-details-sec">
        <div class="p-details">
          <p class="p-name">${p.name}</p>
          <p class="p-price">&#8377; ${p.price}/-</p>
        </div>
        <div class="add-cart">
          <i class="fa-solid fa-cart-shopping fa-xl"></i>
          <p>Add Cart</p>
        </div>
      </div>
    </div>`;
      ts.appendChild(pro);
    });
  });
