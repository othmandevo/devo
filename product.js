(function(){
  function qs(id){ return document.getElementById(id); }
  const params = new URLSearchParams(location.search);
  const id = Number(params.get('id'));

  function waitForStore(cb){
    if (window.devoStore) return cb(window.devoStore);
    const ready = () => cb(window.devoStore);
    document.addEventListener('devoStoreReady', ready, { once: true });
    document.addEventListener('DOMContentLoaded', ready, { once: true });
  }

  waitForStore(store => {
    const product = store.products.find(p => p.id === id);
    if (!product) { location.href = 'index.html#products'; return; }

    const card = qs('detailCard');
    const title = qs('detailTitle');
    const desc = qs('detailDescription');
    const features = qs('detailFeatures');
    const price = qs('detailPrice');
    const rating = qs('detailRating');
    const downloads = qs('detailDownloads');
    const icon = qs('detailIcon');
    const primary = qs('detailPrimary');

    title.textContent = product.name;
    desc.textContent = product.description;
    price.innerHTML = store.renderPrice(product.price);
    rating.textContent = `${product.rating || 0} ★ (${product.ratingCount || 0})`;
    downloads.textContent = `${product.cartAdditions || 0} downloads`;
    icon.className = `icon-container ${product.category}`;
    icon.innerHTML = store.getProductIcon(product.category);

    features.innerHTML = (product.features || []).map(f => `<span class="chip">${f}</span>`).join('');

    if (product.productCode === 'PUBG-MOBILE' || product.productCode === 'FREE-FIRE') {
      primary.textContent = 'Top Up';
      primary.onclick = () => { location.href = `topup.html?game=${product.productCode}`; };
    } else {
      primary.textContent = 'Add to Cart';
      primary.onclick = () => { store.addToCart(product.id); };
    }

    card.hidden = false;
  });
})();


