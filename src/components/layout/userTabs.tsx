'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type UserTabsProps = {
  admin?: boolean;
};

function UserTabs({ admin = false }: UserTabsProps) {
  const path = usePathname();

  const linkClass = (href: string) =>
    `px-4 py-2 rounded-lg transition ${
      path.startsWith(href) ? 'bg-black text-white' : 'bg-gray-200 hover:bg-gray-300'
    }`;

  return (
    <nav className="flex mx-auto gap-2 justify-center flex-wrap bg-white p-2 rounded-lg  md:w-[400px]">
      <Link className={linkClass('/profile')} href="/profile">Profile</Link>

      {admin && (
        <>
          {/* <Link className={linkClass('/categories')} href="/categories">Categories</Link> */}
          <Link className={linkClass('/menuitems')} href="/menuitems">Menu Items</Link>
          <Link className={linkClass('/users')} href="/users">Users</Link>
        </>
      )}

      <Link className={linkClass('/orders')} href="/orders">Orders</Link>
    </nav>
  )
}

export default UserTabs;
