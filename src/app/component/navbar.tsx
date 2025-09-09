import React from 'react'
import Link from 'next/link'

function navbar() {
    const links =[
        {name : 'home',href:'/'},
        {name : 'currency',href:'/currency'},
        {name : 'weight',href:'/weight'},
        {name : 'age',href:'/age'}
        
    ]
  return (
    <div>
      <nav className='w-full h-[120px] bg-blue-600 flex items-center justify-around text-white text-lg font-semibold shadow-md'>
        {links.map((link)=>(
          <Link key={link.href} href={link.href}>
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default navbar
