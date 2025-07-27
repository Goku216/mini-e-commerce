"use client"
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation"

export default function SuccessPage() {
  const removeItem = useCartStore((state) => state.clearCart);
  removeItem()
  

    const router=useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <div>
        <h1 className="text-3xl font-bold">🎉 Payment Successful!</h1>
        <p className="mt-2 text-muted-foreground">Thank you for your purchase.</p>
        <Button onClick={()=>router.push("/")} className="mt-2 cursor-pointer" > Go To Home</Button>
      </div>
    </div>
  )
}
