'use client'
import Link from "next/link"
import { useUser, SignedIn,SignedOut,SignOutButton } from "@clerk/nextjs"
import Image from "next/image";



const Navbar = () => {
    const {isLoaded, isSignedIn, user} = useUser();

    if(!isLoaded){
        return null;
    }

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href={'/'}>
              Meal Plan
            </Link>
            {/* navigation Link */}
            <div className="space-x-6 flex items-center">
                <SignedIn>
                    <Link href={'/mealplan'} className="gext-gray-700 hover:text-emerald-500 transition-colors">
                     Meal Plan
                    </Link>
                    {user?.imageUrl ? (
                        <Link href={'profile'}>
                            <Image src={user.imageUrl} alt="Profile picture" width={30} height={30} className="rounded-full"/>
                        </Link>
                    ):(
                        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    )}
                    <SignOutButton >
                        <button className="ml-4 px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition cursor-pointer">
                            Sign out
                        </button>
                    </SignOutButton>
                </SignedIn>
                <SignedOut>
                <Link
              href="/"
              className="text-gray-700 hover:text-emerald-500 transition-colors"
            >
              Home
            </Link> 
            <Link
              href={isSignedIn ? "/subscribe" : "/sign-up"}
              className="text-gray-700 hover:text-emerald-500 transition-colors"
            >
              Subscribe
            </Link>
            <Link
              href="/sign-up"
              className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition"
            >
              Sign Up
            </Link>
                </SignedOut>
            </div>
        </div>
    </nav>
  )
}

export default Navbar