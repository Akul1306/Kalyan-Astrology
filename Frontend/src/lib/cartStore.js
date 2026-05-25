import { create } from "zustand";

const getStoredCart = () => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("kalyan_cart");
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Failed to parse cart from localStorage", e);
    return [];
  }
};

export const useCartStore = create((set) => ({
  cartItems: getStoredCart(),
  
  addToCart: (product, quantity = 1) => set((state) => {
    const productId = product._id || product.id;
    const name = product.name || product.title;
    const thumbnail = product.thumbnail || product.image;
    
    const existing = state.cartItems.find((item) => item.id === productId);
    let updated;
    
    if (existing) {
      updated = state.cartItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock || 99) }
          : item
      );
    } else {
      updated = [
        ...state.cartItems,
        {
          id: productId,
          name,
          price: product.price,
          thumbnail,
          category: product.category,
          stock: product.stock || 99,
          quantity,
        },
      ];
    }
    
    localStorage.setItem("kalyan_cart", JSON.stringify(updated));
    return { cartItems: updated };
  }),

  removeFromCart: (productId) => set((state) => {
    const updated = state.cartItems.filter((item) => item.id !== productId);
    localStorage.setItem("kalyan_cart", JSON.stringify(updated));
    return { cartItems: updated };
  }),

  updateQuantity: (productId, quantity) => set((state) => {
    const updated = state.cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    localStorage.setItem("kalyan_cart", JSON.stringify(updated));
    return { cartItems: updated };
  }),

  clearCart: () => set(() => {
    localStorage.removeItem("kalyan_cart");
    return { cartItems: [] };
  }),
}));
