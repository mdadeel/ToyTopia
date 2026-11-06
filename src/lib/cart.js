const KEY = 'toytopia_cart';

export function getCart() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

export function addToCart(toy) {
  const cart = getCart();
  const existing = cart.find((t) => t.id === toy.id);
  if (existing) existing.qty = (existing.qty || 1) + 1;
  else cart.push({ id: toy.id, name: toy.name, price: toy.price, image: toy.image, qty: 1 });
  localStorage.setItem(KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event('toytopia:cart'));
}

export function cartCount() {
  return getCart().reduce((n, t) => n + (t.qty || 1), 0);
}
