// filter btns
(() => {
  const filterBtn = document.querySelectorAll('.filter-btn');
  filterBtn.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const value = e.target.dataset.filter;
      const items = document.querySelectorAll('.store-item');
      items.forEach(item => {
        if (value === 'all') {
          item.style.display = 'block';
        } else {
          if (item.classList.contains(value)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        }
      })
    })
  })
})();

//search input
(() => {
  const search = document.querySelector('#search-item');
  search.addEventListener('keyup', () => {
    let value = search.value.toLowerCase().trim();
    const items = document.querySelectorAll('.store-item');
    items.forEach(item => {
      let type = item.dataset.item;
      // if (type.includes(value)) {
      //   item.style.display = 'block';
      // } else {
      //   item.style.display = 'none';
      // }
      let length = value.length;
      let match = type.slice(0, length);
      if (value === match) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    })
  })
})();