"use client"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

export function SiteHeader() {
  const router = useRouter()

  const handleLogout = () => {
    // Remove the token cookie
    Cookies.remove("token")
    
    // Optional: Remove any other authentication-related cookies
    // Cookies.remove("refreshToken")
    // Cookies.remove("userInfo")
    
    console.log("User logged out, token removed") // Debug log
    
    // Redirect to login page
    router.replace("/admin/login")
  }

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Documents</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="hidden sm:flex cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}