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
