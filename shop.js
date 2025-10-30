// shop.js - simple cart + checkout hook (Persian)
(async function(){
  const products = await fetch('products.json').then(r=>r.json());
  const grid = document.getElementById('product-grid') || document.getElementById('products-list');
  function money(n){ return new Intl.NumberFormat('fa-IR').format(n); }
  function renderCard(p){
    const div = document.createElement('div'); div.className='card';
    div.innerHTML = `<img src="${p.image}" alt="${p.title}" /><h4>${p.title}</h4><p class="price">${money(p.price)} تومان</p><p>${p.description}</p><p><button class="btn add-to-cart" data-id="${p.id}">افزودن به سبد</button></p>`;
    return div;
  }
  products.forEach(p=> grid.appendChild(renderCard(p)));

  // cart
  const CART_KEY = 'ts_cart_v1';
  function getCart(){ return JSON.parse(localStorage.getItem(CART_KEY)||'[]'); }
  function saveCart(c){ localStorage.setItem(CART_KEY, JSON.stringify(c)); updateCartCount(); }
  function updateCartCount(){ document.getElementById('cart-count').textContent = getCart().reduce((s,i)=>s+i.qty,0); }
  updateCartCount();

  document.body.addEventListener('click', async (e)=>{
    if(e.target.matches('.add-to-cart')){
      const id = e.target.dataset.id; const p = products.find(x=>x.id===id);
      const cart = getCart(); const item = cart.find(i=>i.id===id);
      if(item){ item.qty++; } else { cart.push({id:p.id,title:p.title,price:p.price,qty:1,image:p.image}); }
      saveCart(cart);
      alert('به سبد اضافه شد');
    }
    if(e.target.id==='open-cart'){ openCart(); }
    if(e.target.id==='close-cart'){ closeCart(); }
    if(e.target.id==='checkout-btn'){ 
      const cart = getCart(); if(cart.length===0){ alert('سبد شما خالی است'); return; }
      const payload = {cart, customer:{}, metadata:{source:'web'} };
      try{
        const res = await fetch('/api/checkout', {method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload)});
        const data = await res.json();
        if(data.url){ window.location = data.url; } else if(data.success){ alert('سفارش ثبت شد (حالت تستی).'); localStorage.removeItem(CART_KEY); updateCartCount(); closeCart(); }
        else { alert('خطا در ایجاد سفارش'); }
      }catch(err){ console.error(err); alert('خطا در اتصال به سرویس پرداخت'); }
    }
  });

  // cart modal functions
  function openCart(){
    document.getElementById('cart-modal').classList.add('open');
    document.getElementById('cart-modal').setAttribute('aria-hidden','false');
    renderCartItems();
  }
  function closeCart(){
    document.getElementById('cart-modal').classList.remove('open');
    document.getElementById('cart-modal').setAttribute('aria-hidden','true');
  }
  window.openCart = openCart; window.closeCart = closeCart;
  function renderCartItems(){
    const wrap = document.getElementById('cart-items'); wrap.innerHTML='';
    const cart = getCart();
    if(cart.length===0){ wrap.innerHTML='<p>سبد خرید خالی است</p>'; document.getElementById('checkout-btn').style.display='none'; document.getElementById('cart-total').textContent='0'; return; }
    document.getElementById('checkout-btn').style.display='inline-block';
    cart.forEach(item=>{
      const div = document.createElement('div'); div.className='cart-row';
      div.innerHTML = `<div style="display:flex;gap:8px;align-items:center"><img src="${item.image}" style="width:64px;height:48px;object-fit:contain"/><div><strong>${item.title}</strong><div>${new Intl.NumberFormat('fa-IR').format(item.price)} تومان × ${item.qty}</div></div></div>`;
      wrap.appendChild(div);
    });
    const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
    document.getElementById('cart-total').textContent = new Intl.NumberFormat('fa-IR').format(total);
  }

  // header cart button wiring
  document.getElementById('open-cart').addEventListener('click',openCart);
  document.getElementById('close-cart').addEventListener('click',closeCart);
})();
