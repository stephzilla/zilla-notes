import { shadow } from "@/styles/utils";
import Link from "next/link"
import Image from "next/image"
import { Button } from "./ui/button";
import DarkModeToggle from "./DarkModeToggle";
import LogOutButton from "./LogOutButton";
import { getUser } from "@/auth/server";
import { SidebarTrigger } from "./ui/sidebar";

async function Header() {
    const user = await getUser();
  return (
    <header className="relative flex h-24 w-full items-center justify-between bg-popover px-3 sm:px-8" style={{ boxShadow: shadow}}>
        <SidebarTrigger className="absolute left-0 top-0" />

        <Link className="flex items-end gap-2 " href="/">
            <Image
                src="/zilla.png" 
                alt="Logo"
                width={60}
                height={60}
                className="rounded-full"
                priority
            />
            <h1 className="flex flex-col pb-1 text-2xl font-semibold leading-6">
                ZILLA <span>Notes</span>
            </h1>
        </Link>

        <div className="flex gap-4">
            {user ? (
                <LogOutButton />
            ) : (
                <>
                    <Button asChild>
                        <Link href="/sign-up" className="hidden sm:block">
                            Sign Up
                        </Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/login">Login</Link>
                    </Button>
                </>
            )}
            <DarkModeToggle />
        </div>
    </header>
  )
}

export default Header;