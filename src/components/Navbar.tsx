'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { poppins } from '@/app/ui/font'

const Navbar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const toggleMenu = () => setIsOpen(!isOpen)

  const menuVariants = {
    closed: {
      opacity: 0,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    closed: { opacity: 0, x: -50 },
    open: { opacity: 1, x: 0 }
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0E0E0E] bg-opacity-90 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl p-5 flex justify-between items-center">
          <Link href="/" className="font-bebas-neue text-3xl text-white">
            Hassan RJ
          </Link>
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none z-50 relative"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <motion.div
              animate={isOpen ? "open" : "closed"}
              variants={{
                open: { rotate: 90 },
                closed: { rotate: 0 }
              }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#0E0E0E] bg-opacity-90 backdrop-blur-sm z-40 flex items-center"
          >
            <motion.ul
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className={`w-full max-w-7xl mx-auto px-5 flex flex-col items-start gap-8 ${poppins.className} text-white`}
            >
              <motion.li variants={itemVariants}>
                <NavItem href="/" pathname={pathname} onClick={toggleMenu}>Home</NavItem>
              </motion.li>
              <motion.li variants={itemVariants}>
                <NavItem href="/projects" pathname={pathname} onClick={toggleMenu}>Projects</NavItem>
              </motion.li>
              <motion.li variants={itemVariants}>
                <NavItem href="/about" pathname={pathname} onClick={toggleMenu}>About</NavItem>
              </motion.li>
              <motion.li variants={itemVariants}>
                <NavItem href="#contact-section" pathname={pathname} onClick={toggleMenu}>Contact</NavItem>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const NavItem = ({ href, pathname, children, onClick }: { href: string; pathname: string; children: React.ReactNode; onClick?: () => void }) => (
  <Link 
    href={href} 
    className={`${pathname === href ? 'text-white' : 'text-[#C7C7C7]'} hover:text-white transition-colors text-4xl font-bold`}
    onClick={onClick}
  >
    {children}
  </Link>
)

export default Navbar

