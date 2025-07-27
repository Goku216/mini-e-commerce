"use client"

import { Eye, EyeClosed, GalleryVerticalEnd } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Cookies from "js-cookie"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const [togglePassword, setTogglePassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [routerReady, setRouterReady] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Ensure router is ready
    setRouterReady(true)
  }, [])

  const handleTogglePassword = () => {
    setTogglePassword(!togglePassword)
  }

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true)
    setErrorMsg("")

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await res.json()
      console.log("API Response:", result) // Debug log

      if (!res.ok) {
        // Use the already parsed result instead of calling res.json() again
        throw new Error(result?.error || "Login failed")
      }

      // Verify token exists in response
      if (!result.token) {
        throw new Error("No token received from server")
      }

      // On success, set cookie and redirect
      Cookies.set("token", result.token, { 
        expires: 1, // 1 day
        path: '/', // Make sure cookie is available site-wide
        sameSite: 'lax'
      })
      
      console.log("Cookie set:", Cookies.get("token")) // Verify cookie was set
      console.log("About to redirect...") // Debug log
      
      console.log("Cookie set, redirecting...") // Debug log
      
      // Simple and reliable redirect
      router.push("/admin/dashboard")
    } catch (err: any) {
      setErrorMsg(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a href="#" className="flex flex-col items-center gap-2 font-medium">
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to Store</h1>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}

              <Label htmlFor="password">Password</Label>
              <div className="relative">
                {togglePassword ? (
                  <Eye
                    onClick={handleTogglePassword}
                    className="size-5 absolute top-2 right-2 cursor-pointer"
                  />
                ) : (
                  <EyeClosed
                    onClick={handleTogglePassword}
                    className="size-5 absolute top-2 right-2 cursor-pointer"
                  />
                )}
                <Input
                  id="password"
                  type={togglePassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            {errorMsg && (
              <p className="text-sm text-destructive text-center">{errorMsg}</p>
            )}

            <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </div>
      </form>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}