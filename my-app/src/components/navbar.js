'use client'

import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faCalendarDays, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faMeta } from "@fortawesome/free-brands-svg-icons"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [showLogout, setShowLogout] = useState(false)
  
  const handleLogout = () => {
    router.replace('/')
  }

  const navItems = [
    { name: 'Home', path: '/dashboard' },
    { name: 'Leads', path: '/leads' },
    { name: 'Opportunities', path: '/opportunities' },
    { name: 'Learners', path: '/learners' },
    { name: 'Courses', path: '/courses' },
  ]

  return (
    <nav className="w-full bg-gradient-to-r from-purple-400 to-pink-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/dashboard">
              <img 
                className="h-10 w-auto" 
                src="https://crm.skillcapital.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fskillcapital.41121682.png&w=1920&q=75" 
                alt="Skill Capital"
              />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === item.path 
                      ? 'bg-purple-700 text-white' 
                      : 'text-purple-200 hover:bg-purple-600 hover:text-white'
                  } transition duration-150 ease-in-out`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button className="p-1 rounded-full text-purple-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-800 focus:ring-white">
                <FontAwesomeIcon icon={faCalendarDays} className="h-6 w-6" />
              </button>
              <button className="ml-3 p-1 rounded-full text-purple-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-800 focus:ring-white">
                <img 
                  src="https://crm.skillcapital.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FAILogo1.a2708f70.gif&w=640&q=75" 
                  className="h-8 w-8 rounded-full"
                  alt="AI Assistant"
                />
              </button>
              <div className="ml-3 relative">
                <div>
                  <button 
                    className="max-w-xs bg-purple-600 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-800 focus:ring-white"
                    onClick={() => setShowLogout(!showLogout)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <FontAwesomeIcon icon={faUser} className="h-8 w-8 rounded-full p-2" />
                  </button>
                </div>
                {showLogout && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}