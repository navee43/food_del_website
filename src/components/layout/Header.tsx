'use client'
import React, { useContext } from 'react'
import Link from 'next/link'
import { Menu ,User  } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import localFont from 'next/font/local'
import { signOut, useSession } from 'next-auth/react'
import { ShoppingCart } from 'lucide-react';
import { CartContext } from '@/context/authProvider'
import CartProducts from  '@/context/authProvider'

  



const myFont = localFont({
  src: "../../../public/fonts/1.ttf"
});



function Header() {
   const context = useContext(CartContext);

  if (!context) {
    throw new Error("CartPage must be used within CartProvider");
  }

  const { cartProducts } = context;



  const session = useSession();
const status = session.status;
// console.log(session?.data?.user)


  return (
    <div className={` p-20  ${myFont.className} bg-red-500  flex items-center justify-center`}>
         <header className="flex justify-between  p-5   fixed z-50 w-[22rem]  md:w-7xl rounded-full bg-white">
      <Link href="/home" className={`font-bold text-2xl text-red-500 `}>Gomino</Link>
      <nav  className="sm:flex gap-10 font-semibold text-xl hidden ">
        <Link href="/" className="hover:text-red-600 text-black">Home</Link>
        <Link href="/menu" className="hover:text-red-600 text-black">Menu</Link>
        <Link href="/aboutus" className="hover:text-red-600 text-black">About</Link>
        <Link href="/contactus" className="hover:text-red-600 text-black">Contact</Link>
         
       <div className="relative">
  <Link href="/cart">
    <ShoppingCart className="size-7" />
    {cartProducts?.length > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-mono w-5 h-5 flex items-center justify-center rounded-full">
        {cartProducts.length}
      </span>
    )}
  </Link>
</div>

         
         
        

        {status ==='authenticated'? <Link href='/profile' className='font-bold' ><User/></Link> : <Link href="/profile" className=''></Link> }
        {
          status =='authenticated' ? <button onClick={() =>{signOut()}}><Link href="/" className="  text-white hover:text-black
         bg-red-600 p-1 rounded-md px-4">Logout</Link></button> : <Link href="/signin" className="  text-white hover:text-black
         bg-red-600 p-1 rounded-md px-4">Login</Link>
        }
         
      </nav>


<div className='flex space-x-4 justify-center items-center md:hidden '>
  <Link href="/cart">
    <ShoppingCart className="size-7" />
    {cartProducts?.length > 0 && (
      <span className="absolute top-5 right-16 bg-red-500 text-white text-xs font-mono w-5 h-5 flex items-center justify-center rounded-full">
        {cartProducts.length}
      </span>
    )}
  </Link>
      <Popover >
        
  <PopoverTrigger className=''><Menu className="text-black w-9 h-9 flex md:hidden " /></PopoverTrigger>
  <PopoverContent>
     <nav  className={`flex flex-col items-center gap-5  text-xl ${myFont.className}`}>
        <Link href="/" className="hover:text-red-600 text-black">Home</Link>
        <Link href="/menu" className="hover:text-red-600 text-black">Menu</Link>
        <Link href="/aboutus" className="hover:text-red-600 text-black">About</Link>
        <Link href="/contactus" className="hover:text-red-600 text-black">Contact</Link>
         {status ==='authenticated'? <Link href='/profile' className='font-bold' >Profile</Link> : <Link href="/profile" className=''></Link> }
        {
          status =='authenticated' ? <button onClick={() =>{signOut()}}><Link href="/" className="  text-white hover:text-black
         bg-red-600 p-1 rounded-md px-4">Logout</Link></button> : <Link href="/signin" className="  text-white hover:text-black
         bg-red-600 p-1 rounded-md px-4">Login</Link>
        }
         
      </nav>
  </PopoverContent>
</Popover>
</div>
      
      
      
    </header> 
    </div>
  )
}

export default Header