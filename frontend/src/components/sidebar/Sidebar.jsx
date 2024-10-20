import React, { useState } from 'react'
import Control from '../../assets/control.png'
import Logo from '../../assets/logo.png'

function Sidebar() {
    const [open,setOpen] = useState(false);
    const Menus = [
        {title: 'Dashboard'},
        {title: 'Events'},
        {title: 'Inbox', gap: true},
        {title: 'Accounts'},
    ]
  return (
    <div className='flex'>
        <div className={`${open ? 'w-72' : 'w-20'} h-screen bg-purple-950 p-5 pt-8 duration-300 relative`}>
            <img src={Control} alt="XControl" className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 bg-purple-950 ${!open && 'rotate-180'}`} onClick={()=>setOpen(!open)} />
            <div
             className='flex gap-x-4 items-center'>
                <img src={Logo} alt="Logo" className={`cursor-pointer duration-500 ${open && 'rotate-[360deg]'}`} />
                <h1 className={`text-white origin-left font-medium text-xl duration-300 ${!open && 'scale-0' }`}>Designer</h1>
            </div>
            <ul className='pt-6'>
                {Menus.map((menu,index)=>(
                    <li key={index} className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-slate-800 rounded-md ${menu.gap ? 'mt-9': 'mt-2'}`}>
                        <span className={`${!open && 'hidden'} origin-left duration-200`}>{menu.title}</span>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default Sidebar