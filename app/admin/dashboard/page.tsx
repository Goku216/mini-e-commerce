"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { useCartStore } from "@/store/cartStore" // adjust path if needed

export default function Page() {
  const router = useRouter()

  // Pull items from Zustand cart store
  const items = useCartStore((state) => state.items)

  // Derived stats
  const totalOrders = items.length
  const totalProducts = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalRevenue = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  )

  // Redirect if token not found
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
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* 📊 Our dynamic data */}
              <div className="px-4 lg:px-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard title="Total Products" value={totalProducts} />
                <StatCard title="Total Orders" value={totalOrders} />
                <StatCard
                  title="Total Revenue"
                  value={`$${totalRevenue.toFixed(2)}`}
                />
              </div>

              {/* 🧱 Static mock content below */}
              <div className="px-4 lg:px-6 text-muted-foreground">
                <h2 className="text-lg font-semibold mb-2">Activity Overview</h2>
                <p>This is a static chart section placeholder.</p>
              </div>

              <div className="px-4 lg:px-6 text-muted-foreground">
                <h2 className="text-lg font-semibold mb-2">Latest Transactions</h2>
                <p>This is a static data table placeholder.</p>
              </div>

              <div className="px-4 lg:px-6 text-muted-foreground">
                <h2 className="text-lg font-semibold mb-2">Suggestions</h2>
                <p>This is a static card section placeholder.</p>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="rounded-xl border bg-white dark:bg-neutral-950 p-4 shadow-sm">
      <h3 className="text-sm text-muted-foreground">{title}</h3>
      <p className="text-xl font-bold">{value}</p>
    </div>
  )
}
