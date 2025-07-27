"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { useCartStore } from "@/store/cartStore" // adjust if path is different

export default function ProductsPage() {
  const router = useRouter()
  const items = useCartStore((state) => state.items)

  useEffect(() => {
    const token = Cookies.get("token")
    if (!token) {
      router.replace("/admin/login")
    }
  }, [router])

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
          <h1 className="text-2xl font-semibold mb-4">All Products</h1>

          {items.length === 0 ? (
            <p className="text-muted-foreground">No products in cart yet.</p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-4 p-4 border rounded-lg bg-white dark:bg-neutral-950"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-16 h-16 rounded-md object-cover border"
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{item.title}</span>
                    <span className="text-sm text-muted-foreground">
                      ${item.price.toFixed(2)} × {item.quantity}
                    </span>
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
