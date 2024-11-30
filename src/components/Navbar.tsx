'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const contactSection = document.getElementById('contact-section')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false)
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const menuVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" }
  }

  const iconVariants = {
    open: { rotate: 90 },
    closed: { rotate: 0 }
  }

  return (
    <>
      <nav className="mx-auto max-w-7xl p-5 relative z-50" ref={navRef}>
        <div className="flex justify-between items-center">
          <Link href="/" className="font-bebas-neue text-3xl">
            Hassan RJ
          </Link>
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-white focus:outline-none relative z-50"
            >
              <motion.div
                animate={isOpen ? "open" : "closed"}
                variants={iconVariants}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </button>
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
                transition={{ duration: 0.3 }}
                className="fixed inset-y-0 right-0 w-64 bg-gray-800 p-5 md:hidden"
              >
                <ul className="flex flex-col gap-6 font-manrope text-[#C7C7C7] mt-16">
                  <NavItem href="/" pathname={pathname} onClick={() => setIsOpen(false)}>Home</NavItem>
                  <NavItem href="/projects" pathname={pathname} onClick={() => setIsOpen(false)}>Projects</NavItem>
                  <NavItem href="/about" pathname={pathname} onClick={() => setIsOpen(false)}>About</NavItem>
                  <li>
                    <a href="#contact-section" onClick={scrollToContact} className="hover:text-white transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
          <ul className="hidden md:flex gap-6 font-manrope text-[#C7C7C7]">
            <NavItem href="/" pathname={pathname}>Home</NavItem>
            <NavItem href="/projects" pathname={pathname}>Projects</NavItem>
            <NavItem href="/about" pathname={pathname}>About</NavItem>
            <li>
              <a href="#contact-section" onClick={scrollToContact} className="hover:text-white transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40" />
      )}
    </>
  )
}

const NavItem = ({ href, pathname, children, onClick }: { href: string; pathname: string; children: React.ReactNode; onClick?: () => void }) => (
  <li>
    <Link 
      href={href} 
      className={`${pathname === href ? 'text-white' : ''} hover:text-white transition-colors`}
      onClick={onClick}
    >
      {children}
    </Link>
  </li>
)

export default Navbar

