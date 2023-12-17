let slider = document.querySelectorAll('.img');
let ar = document.querySelector('.ar');
let al = document.querySelector('.al');
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
fetch('./json/trend.json')
  .then((respose) => {
    return respose.json();
  })
  .then((val) => {
    val.forEach((p, i) => {
      let pro = document.createElement('div');
      pro.className = 'product-card';
      // pro.style.left = `${i * 30}%`;
      pro.innerHTML = `
      <div class="p-img">
        <img src="${p.img}" alt="Casual">
      </div>
      <div class="p-details-sec">
        <div class="p-details">
          <p class="p-name">${p.name}</p>
          <p class="p-cate">${p.category}</p>
          <p class="p-price">&#8377; ${p.price}/-</p>
        </div>
        <div class="add-cart">
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
  console.log(c);
  if (c == 2) {
    element.forEach((slide) => {
      slide.style.transform = `translateX(-${c * 230}%)`;
    });
  } else
    element.forEach((slide) => {
      slide.style.transform = `translateX(-${c * 300}%)`;
    });
}
