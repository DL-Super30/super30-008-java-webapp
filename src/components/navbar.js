'use client'

import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faCalendarDays, faUser, faBarsStaggered } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const pathName = usePathname()
  const router = useRouter()

  const [showMenuIcon, setShowMenuIcon] = useState(false)
  const [isLogout, setIsLogout] = useState(false)

  const getLinkClass = (path) => {
    return pathName === path
      ? 'border-b-4 border-indigo-600 bg-indigo-100 rounded-t-md text-indigo-800'
      : 'bg-white text-indigo-600 hover:bg-indigo-50'
  }

  const handleHomePage = () => {
    router.replace('/')
  }

  const navItems = [
    { path: '/dashboard', label: 'Home' },
    { path: '/leads', label: 'Leads' },
    { path: '/oppurtunities', label: 'Opportunities' },
    { path: '/learners', label: 'Learners' },
    { path: '/courses', label: 'Courses' },
  ]

  return (
    <nav className="relative w-full h-16 border-b-2 border-indigo-200 flex items-center justify-between fixed z-10 bg-white shadow-md">
      <div className="flex items-center px-4">
        <button
          className="text-2xl text-indigo-600 md:hidden"
          onClick={() => setShowMenuIcon(!showMenuIcon)}
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon icon={faBarsStaggered} />
        </button>
        <Link href="/dashboard">
          <img
            className="h-10 ml-4"
            src="https://crm.skillcapital.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fskillcapital.41121682.png&w=1920&q=75"
            alt="Skill Capital Logo"
          />
        </Link>
      </div>

      <div className="hidden md:flex space-x-1">
        {navItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <button className={`px-4 py-2 font-medium transition-colors duration-200 ${getLinkClass(item.path)}`}>
              {item.label}
            </button>
          </Link>
        ))}
      </div>

      <div className="flex items-center space-x-4 mr-4">
        <Link href="/calender">
          <button className="text-2xl text-black hover:text-indigo-800 transition-colors duration-200" aria-label="Calendar">
            <FontAwesomeIcon icon={faCalendarDays} />
          </button>
        </Link>
        <Link href="/aipage">
          <img
            src="https://crm.skillcapital.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FAILogo1.a2708f70.gif&w=640&q=75"
            className="w-8 hover:cursor-pointer"
            alt="AI Assistant"
          />
        </Link>
        <button
          className="text-2xl text-black hover:text-indigo-800 transition-colors duration-200"
          onClick={() => setIsLogout(!isLogout)}
          aria-label="User menu"
        >
          <FontAwesomeIcon icon={faUser} />
        </button>
      </div>

      <AnimatePresence>
        {isLogout && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20"
          >
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 transition-colors duration-200"
              onClick={handleHomePage}
            >
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMenuIcon && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-30 md:hidden"
          >
            <div className="p-4">
              <button
                className="text-2xl text-indigo-600 mb-4"
                onClick={() => setShowMenuIcon(false)}
                aria-label="Close menu"
              >
                <FontAwesomeIcon icon={faBarsStaggered} />
              </button>
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <button className={`block w-full text-left px-4 py-2 mb-2 font-medium rounded transition-colors duration-200 ${getLinkClass(item.path)}`}>
                    {item.label}
                  </button>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}