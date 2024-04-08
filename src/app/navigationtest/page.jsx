"use client"
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const NavigationTestPage = () => {

    // CLIENT SIDE NAVIGATION
    const router = useRouter();
    const pathName = usePathname(); // It returns only the pathname not the query
    const searchParams = useSearchParams();

    const query = searchParams.get("q");

    const j = searchParams.get('j')

    console.log(j)

    console.log(query)

    console.log(pathName)

    const handleClick = () =>{
        console.log("Clicked")
        router.push('/') // push(), It performs a client side navigation to the provided route
    }

  return (
    <div>
        <Link href="/" prefetch={false}>Return Home</Link>
        <button onClick={handleClick}>Write and Redirect</button>
    </div>
  )
}

export default NavigationTestPage