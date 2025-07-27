"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { useCartStore } from "@/store/cartStore" // same store you're using

export default function OrdersPage() {
  const router = useRouter()
  const items = useCartStore((state) => state.items)

  useEffect(() => {
    const token = Cookies.get("token")
    if (!token) {
      router.replace("/admin/login")
    }
  }, [router])

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-semibold mb-4">Last Orders</h1>

          {items.length === 0 ? (
            <p className="text-muted-foreground">No orders yet.</p>
          ) : (
            <ul className="space-y-4">
              <li className="p-4 border rounded-lg bg-white dark:bg-neutral-950">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Cart Items Summary</p>
                    <p className="text-sm text-muted-foreground">
                      Showing items from current cart
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      Total: ${total.toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {items.length} product(s)
                    </p>
                  </div>
                </div>
              </li>

              {items.map((item) => (
                <li
                  key={item.id}
                  className="p-4 border rounded-lg bg-white dark:bg-neutral-950"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        ${item.price.toFixed(2)} each
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Subtotal: ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
