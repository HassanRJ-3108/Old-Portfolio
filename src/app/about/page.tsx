import About1 from '@/components/About1'
import Capabilities from '@/components/Capabilities'
import Contact from '@/components/Contact'
import Experience from '@/components/Experience'
import { Metadata } from 'next'
import Image from 'next/image'
import React from 'react'


export const metadata: Metadata = {
    title: 'About HassanRJ - Full Stack Developer & AI Enthusiast',
    description: 'Learn about HassanRJ, a passionate full stack developer with expertise in AI integration. Discover my journey, skills, and experiences in the world of web development and artificial intelligence.',
    keywords: 'HassanRJ, about Hassan, full stack developer, AI integration, web development, software engineer, portfolio',
    robots: 'index, follow',
    authors: [{ name: 'HassanRJ' }],
    openGraph: {
      title: 'About HassanRJ - Full Stack Developer & AI Enthusiast',
      description: 'Learn about HassanRJ, a passionate full stack developer with expertise in AI integration.',
      images: [
        {
          url: '/images/pic.jpg',
          width: 800,
          height: 800,
          alt: 'HassanRJ - Full Stack Developer',
        },
      ],
    },
  }

const About = () => {
    return (
        <div className="w-full overflow-hidden">
            <About1 />
            <div className="w-full max-w-7xl mx-auto px-4 flex justify-center mb-20">
                <Image
                    src={'/images/pic.jpg'}
                    layout="responsive"
                    width={800}
                    height={800}
                    alt="Developer Pic"
                />
            </div>
            <Capabilities />
            <hr className="border-[#484848] border-t" />
            <Experience />
            <hr className="border-[#484848] border-t" />
            <div id="contact-section">
                <Contact />
            </div>
        </div>
    )
}

export default About
