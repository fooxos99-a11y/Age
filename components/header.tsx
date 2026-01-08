"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Link from "next/link"

export function Header() {
  const navItems = [
    { name: "أفضل اللاعبين", href: "/" },
    { name: "البطولات", href: "/tournaments" },
    { name: "الفيديوهات", href: "/videos" },
    { name: "ديسكورد", href: "/discord" },
    { name: "الداعمين", href: "/supporters" },
  ]

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If it's a route (doesn't start with #), let Next.js handle it
    if (!href.startsWith("#")) {
      return
    }

    e.preventDefault()
    const targetId = href.substring(1)
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="w-full py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="hover:opacity-80 transition-opacity block">
            <img src="/logo.png" alt="Logo" className="h-12 w-auto" style={{maxWidth: '120px'}} />
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-4 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-[#888888] hover:text-foreground px-6 py-3 rounded-full font-semibold text-lg transition-colors whitespace-nowrap"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* حذف زر تغيير اللغة والاكتفاء بالعربية */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-foreground">
                <Menu className="h-7 w-7" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="bg-background border-t border-border text-foreground">
              <SheetHeader>
                <SheetTitle className="text-left text-xl font-semibold text-foreground">
                  القائمة
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-[#888888] hover:text-foreground justify-start text-lg py-2"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
