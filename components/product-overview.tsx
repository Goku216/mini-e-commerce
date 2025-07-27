"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, Truck, ShieldCheck, Heart } from "lucide-react";
import { Badge } from "./ui/badge";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import Link from "next/link";

export default function ProductOverview({ id }: { id: string }) {
  const [prodData, setProdData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


   const addItemToCart = () => {
  useCartStore.getState().addItem({
    id: prodData._id || id, // fallback
    title: prodData.title,
    price: prodData.price,
    thumbnail: prodData.thumbnail,
    quantity: 1,
  });
  toast.success("Item Added Successfully!")
  
};

  const fetchProduct = async () => {
    try {
      const response = await fetch(`https://api.freeapi.app/api/v1/public/randomproducts/${id}`);
      const data = await response.json();
      setProdData(data.data);
    } catch (err) {
      console.error("Fetch failed:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  if (!id || error) {
    return (
      <div className="p-6">
        <p className="text-3xl font-bold h-screen w-screen flex items-center justify-center">Product Not Found</p>
      </div>
    );
  }

  if (loading || !prodData) {
    return (
      <div className="p-6">
        <p className="text-sm text-muted-foreground h-screen w-screen flex items-center justify-center">Loading product...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
          <img
            src={prodData.thumbnail}
            alt={prodData.title}
            className="object-cover w-full h-full"
            width={700}
            height={700}
          />
          <div className="absolute top-4 right-4">
            <Button
              size="icon"
              variant="outline"
              className="rounded-full bg-background/80 backdrop-blur-sm"
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-4 mb-4">
            <Badge variant="outline" >
              {prodData.category || "New Arrival"}
            </Badge>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-medium">{prodData.rating || "4.5"}</span>
              <span className="text-sm text-muted-foreground">(reviews)</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-2">{prodData.title}</h1>

          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-2xl font-bold">${prodData.price}</span>
            {prodData.discountPercentage && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  ${(prodData.price / (1 - prodData.discountPercentage / 100)).toFixed(2)}
                </span>
                <span className="text-sm font-medium text-green-600">
                  Save {prodData.discountPercentage}%
                </span>
              </>
            )}
          </div>

          <p className="text-muted-foreground mb-6">{prodData.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm">
              <div className={`h-2 w-2 rounded-full ${prodData.stock > 0 ? "bg-green-500" : "bg-red-500"}`} />
              <span>{prodData.stock > 0 ? "In Stock" : "Out of Stock"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Truck className="h-4 w-4" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <ShieldCheck className="h-4 w-4" />
              <span>2 Year Warranty</span>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <span className="font-medium">Select Color</span>
              <div className="flex gap-2">
                <Button size="icon" className="w-8 h-8 rounded-full bg-black ring-2 ring-offset-2 ring-black"></Button>
                <Button size="icon" className="w-8 h-8 rounded-full bg-amber-800"></Button>
                <Button size="icon" className="w-8 h-8 rounded-full bg-slate-200"></Button>
              </div>
            </div>

          </div>

          <div className="flex gap-4 mt-8">
            <Button onClick={addItemToCart} size="lg" className="flex-1 cursor-pointer">
              Add to Cart
            </Button>
            <Button asChild size="lg" variant="outline" className="flex-1 cursor-pointer">
              <Link href="/orders" >
              Buy Now
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
