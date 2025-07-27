import { useCartStore } from "@/store/cartStore";

 export const cartCount = useCartStore((state) =>
  state.items.reduce((total, item) => total + item.quantity, 0)
)
