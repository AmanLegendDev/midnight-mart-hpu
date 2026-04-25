import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],

      addToCart: (product) =>
        set((state) => {
          const exists = state.cart.find(
            (p) => p._id === product._id
          );

          if (exists) {
            return {
              cart: state.cart.map((p) =>
                p._id === product._id
                  ? { ...p, qty: p.qty + 1 }
                  : p
              ),
            };
          }

          return {
            cart: [
              ...state.cart,
              { ...product, qty: 1 },
            ],
          };
        }),

      decreaseQty: (id) =>
        set((state) => ({
          cart: state.cart
            .map((p) =>
              p._id === id
                ? { ...p, qty: p.qty - 1 }
                : p
            )
            .filter((p) => p.qty > 0),
        })),

      removeItem: (id) =>
        set((state) => ({
          cart: state.cart.filter(
            (p) => p._id !== id
          ),
        })),

      // ⭐ IMPORTANT FUNCTION
      resetCart: () =>
        set({
          cart: [],
        }),
    }),
    {
      name: "cart-storage",
    }
  )
);