import { useState } from 'react';
import logo from '../assets/logo.png';
import { navItems } from '../constants/navItems';
import { Menu, X } from 'lucide-react'

export const NavBar = () => {

    const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false)

    const toogleMobileDrawer = (): void => {
        setMobileDrawerOpen(!mobileDrawerOpen)
    }

    return (
        <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
            <div className="container px-4 mx-auto relative text-sm">
                <div className="flex justify-between items-center">
                    <a href="/">
                        <div className="flex items-center flex-shrink-0">
                            <img src={logo} alt="logo" className="w-8 h-8 mr-2" />
                            <span className="text-xl tracking-tight">ClientTrackr</span>
                        </div>

                    </a>
                    <ul className='hidden lg:flex ml-14 space-x-12'>
                        {navItems.map((item, index) => (
                            <li key={index} className='hover:text-orange-500 transition-colors'
                            >
                                <a href={item.href}>{item.label}</a>
                            </li>
                        ))}
                    </ul>
                    <div className='lg:hidden md:flex flex-col justify-end'>
                        <button onClick={toogleMobileDrawer}>
                            {mobileDrawerOpen ?
                                <X /> : <Menu />
                            }
                        </button>
                    </div>
                </div>
                {mobileDrawerOpen &&
                    (
                        <div className='fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden'>
                            <ul>
                                {navItems.map((item, index) => (
                                    <li key={index} className='py-4 hover:text-orange-500 transition-colors'>
                                        <a href={item.href}>{item.label}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                }
            </div>
        </nav>
    )
}