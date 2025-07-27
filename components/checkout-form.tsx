"use client"

import { useId, useState } from "react"
import { useRouter } from "next/navigation"
import { CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CheckoutForm() {
  const id = useId()
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckout = () => {
    console.log("Checkout Data:", formData)
    
    // Simulate a checkout process
    setTimeout(() => {
      router.push("/success") // 🔥 Redirect to /success
    }, 500)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full cursor-pointer">
          <CreditCard className="mr-2 h-4 w-4" />
          Proceed to Checkout
        </Button>
      </DialogTrigger>

      <DialogContent
        onOpenAutoFocus={(e) => {
          e.preventDefault()
        }}
      >
        <div className="flex flex-col gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <CreditCard className="opacity-80" size={16} />
          </div>
          <DialogHeader>
            <DialogTitle className="text-left">Checkout</DialogTitle>
            <DialogDescription className="text-left">
              Fill in your details to complete the purchase.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5">
          <div className="space-y-4">
            <div>
              <Label htmlFor={`${id}-name`}>Full Name</Label>
              <Input
                id={`${id}-name`}
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor={`${id}-email`}>Email Address</Label>
              <Input
                id={`${id}-email`}
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor={`${id}-address`}>Shipping Address</Label>
              <Input
                id={`${id}-address`}
                name="address"
                placeholder="123 Street, City, Country"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>

          <Button type="button" className="w-full cursor-pointer" onClick={handleCheckout}>
            Checkout
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
