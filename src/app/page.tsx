import Portfolio from "@/components/Portfolio"
import Header from "../components/Header"
import About from "@/components/About"
import Contact from "@/components/Contact"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: "HassanRJ - Full Stack Developer Portfolio",
  description: "Explore HassanRJ's personal full stack portfolio showcasing web development projects and an innovative AI assistant integration.",
  keywords: [
    'Hassan', 
    "HassanRJ", 
    "Hassanrj portfolio", 
    'hassan personal portfolio', 
    'full stack developer', 
    'AI assistant', 
    'web development', 
    'portfolio website',
    'React',
    'Next.js',
    'JavaScript',
    'TypeScript'
  ],
  robots: "index, follow",
  authors: [{ name: 'HassanRJ' }],
  openGraph: {
    title: "HassanRJ - Full Stack Developer Portfolio",
    description: "Discover HassanRJ's innovative web development projects and AI integrations.",
    type: 'website',
    url: 'https://hassanrj.vercel.app',
    images: [
      {
        url: '/images/pic.jpg',
        width: 1200,
        height: 630,
        alt: 'HassanRJ Portfolio Preview',
      },
    ],
  
  },
}

export default function Home() {
  return (
    <div>
      <Header />
      <hr className="border-[#484848] border-t" />
      <Portfolio />
      <hr className="border-[#484848] border-t" />
      <About />
      <hr className="border-[#484848] border-t" />
      <div id="contact-section">
        <Contact />
      </div>
    </div>
  )
}