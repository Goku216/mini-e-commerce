"use client"
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { Heart, Minus, Plus, Star } from "lucide-react";
import { toast } from "sonner";


export default function CartList() {
  const items = useCartStore((state) => state.items);
  const addToCart = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);

 const handleAdd = (item: any) => {
  addToCart(item);
  toast.success("Item Added Successfully!")
 }

 const handleRemove = (id: string) => {
  removeItem(id)
  toast.error("Item Removed!")
 }
  


  

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="space-y-4">
        {items.length ===0 ? (
          <p> Your Cart is empty</p>
        ) : ( items.map((item) => (
          <div
            key={item.id}
            className="group flex gap-4 items-center bg-card border rounded-lg p-2 hover:bg-accent/50 transition-colors"
          >
            {/* Product Image */}
            <div className="relative h-24 aspect-square bg-muted rounded-md overflow-hidden shrink-0">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="object-cover"
                sizes="(max-width: 768px) 96px, 96px"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0 grid sm:grid-cols-4 gap-4 items-center">
              <div className="min-w-0">
                <h3 className="font-medium truncate">{item.title}</h3>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                  <span className="text-sm">4.9</span>
                  <span className="text-sm text-muted-foreground">(128)</span>
                </div>
              </div>

              <div className="sm:text-center">
                <div className="text-sm text-muted-foreground">Price</div>
                <div className="font-medium">${item.price * item.quantity}</div>
                <div className="text-sm text-muted-foreground line-through">
                  $399
                </div>
              </div>

               <div className="sm:text-center">
                <div className="text-sm text-muted-foreground">Quantity</div>
                <div className="font-medium">{item.quantity}</div>
               
              </div>

              <div className="flex items-center gap-2 sm:justify-end">
                <Button
                  size="icon"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => handleAdd(item)}
                >
                  <Plus className="size-5" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={()=> handleRemove(item.id)}
                >
                  <Minus className="size-5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="shrink-0 h-8 w-8"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )))}
      </div>
    </div>
    
  );
}
