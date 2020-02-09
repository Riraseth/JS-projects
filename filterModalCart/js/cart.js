// show cart

(() => {
  const cartInfo = document.querySelector('#cart-info');
  const cart = document.querySelector('#cart');

  cartInfo.addEventListener('click', () => {
    cart.classList.toggle('show-cart');
  })
})();

// add items to the cart

(() => {
  const cartBtns = document.querySelectorAll('.store-item-icon');
  cartBtns.forEach(cartBtn => {
    cartBtn.addEventListener('click', e => {
      if (e.target.parentElement.classList.contains('store-item-icon')) {
        let fullPath = e.target.parentElement.previousElementSibling.src;
        let pos = fullPath.indexOf('img') + 3;
        let partialPath = fullPath.slice(pos);
        const item = {};
        item.img = `img-cart${partialPath}`;

        let name = e.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
        item.name = name;

        let price = e.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent.slice(1).trim();
        item.price = price;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item', 'd-flex', 'justify-content-between', 'text-capitalize', 'my-3');
        cartItem.innerHTML = `
        <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
        <div class="cart-item-text">
        <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
        <span>$</span>
        <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
        </div>
        <a href="#" id='cart-item-remove' class="cart-item-remove">
        <i class="fas fa-trash"></i>
        </a>
        `;

        const cart = document.querySelector('#cart');
        const total = document.querySelector('.cart-total-container');
        cart.insertBefore(cartItem, total);
        alert('item added to the cart');
        removeItem();
        clearCart();
        showTotals();
      }
    })
  })

  function showTotals() {
    const total = [];
    const items = document.querySelectorAll('.cart-item-price');
    items.forEach(item => {
      total.push(parseFloat(item.textContent));
    })
    totalMoney = total.reduce((total, value) => total + value, 0);
    const finalMoney = totalMoney.toFixed(2);

    document.querySelector('#cart-total').textContent = finalMoney;
    document.querySelector('#item-count').textContent = total.length;
    document.querySelector('.item-total').textContent = finalMoney;
  }

  function removeItem() {
    const trashIcons = document.querySelectorAll('.cart-item-remove');
    trashIcons.forEach(icon => {
      icon.addEventListener('click', () => {
        icon.parentElement.remove();
        showTotals();
      })
    })
  }

  function clearCart() {
    const clearBtn = document.getElementById('clear-cart');
    const cartItems = document.querySelectorAll('.cart-item');
    clearBtn.addEventListener('click', () => {
      cartItems.forEach(item => {
        item.remove();
      })
      showTotals();
    })
  }
})();