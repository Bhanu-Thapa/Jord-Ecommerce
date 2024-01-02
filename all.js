let allProduct = document.querySelector('.all-product');

fetch('./json/men.json')
  .then((response) => {
    return response.json();
  })
  .then((val) => {
    val.forEach((element) => {
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
  });
