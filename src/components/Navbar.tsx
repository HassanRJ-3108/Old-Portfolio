'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const pathname = usePathname()

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const contactSection = document.getElementById('contact-section')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="mx-auto max-w-7xl p-5">
      <div className="flex justify-between items-center">
        <Link href="/" className="font-bebas-neue text-3xl">
          Hassan RJ
        </Link>
        <ul className="flex gap-6 font-manrope text-[#C7C7C7]">
          <li>
            <Link href="/" className={pathname === '/' ? 'text-white' : ''}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/projects" className={pathname === '/projects' ? 'text-white' : ''}>
              Projects
            </Link>
          </li>
          <li>
            <Link href="/about" className={pathname === '/about' ? 'text-white' : ''}>
              About
            </Link>
          </li>
          <li>
            <a href="#contact-section" onClick={scrollToContact}>
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar