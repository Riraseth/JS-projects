//modal
(() => {
  let imageList = [];
  let counter = 0;
  const images = document.querySelectorAll('.store-img');
  const container = document.querySelector('.lightbox-container');
  const item = document.querySelector('.lightbox-item');
  const closeIcon = document.querySelector('.lightbox-close');
  const btnLeft = document.querySelector('.btnLeft')
  const btnRight = document.querySelector('.btnRight');
  // add all imagest to the array
  images.forEach(image => {
    imageList.push(image.src);
  })
  //open modal
  images.forEach(image => {
    image.addEventListener('click', e => {
      //show modal
      container.classList.add('show');
      //get source
      let src = e.target.src;
      counter = imageList.indexOf(src);
      item.style.backgroundImage = `url('${src}')`
    })
  })
  closeIcon.addEventListener('click', () => {
    container.classList.remove('show');
  })
  container.addEventListener('click', e => {
    if (e.target.classList.contains('lightbox-container')) {
      container.classList.remove('show');
    }
  })
  //left btn
  btnLeft.addEventListener('click', () => {
    counter--;
    if (counter < 0) {
      counter = imageList.length - 1;
    }
    item.style.backgroundImage = `url('${imageList[counter]}')`;
  })
  // right btn
  btnRight.addEventListener('click', () => {
    counter++;
    if (counter > imageList.length - 1) {
      counter = 0;
    }
    item.style.backgroundImage = `url('${imageList[counter]}')`;
  })
})();