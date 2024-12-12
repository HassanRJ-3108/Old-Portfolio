import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientRootLayout from "./ClientRootLayout";
import { ProjectProvider } from './contexts/ProjectContext'
import { Toaster } from "@/components/ui/toaster"
import Chatbot from "@/components/ChatBot";
import { poppins } from "./ui/font";
// Load your local fonts
const manRope = localFont({
  src: "./fonts/manrope.ttf", // Manrope font file
  variable: "--font-manrope",
  weight: "100 900",
});
const geistSans = localFont({
  src: "./fonts/GeistVF.woff", // Geist Sans font file
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff", // Geist Mono font file
  variable: "--font-geist-mono",
  weight: "100 900",
});
const inter = localFont({
  src: "./fonts/Inter.ttf", // Ensure you have the correct Inter font file
  variable: "--font-inter",
  weight: "100 900",
});

const bebasNeue = localFont({
  src: "./fonts/BebasNeue-Regular.ttf", // Make sure this path is correct
  variable: "--font-bebas-neue",
});

// Metadata for the page
export const metadata: Metadata = {
  metadataBase: new URL('https://hassanrj.vercel.app'), // Replace with your actual domain
  title: {
    default: "HassanRJ - Full Stack Developer Portfolio",
    template: "%s | HassanRJ"
  },
  description: "HassanRJ's personal full stack portfolio showcasing web development expertise and AI integration projects.",
  applicationName: 'HassanRJ Portfolio',
  referrer: 'origin-when-cross-origin',
  keywords: ['Full Stack', 'Web Development', 'AI', 'Portfolio', 'HassanRJ'],
  authors: [{ name: 'HassanRJ' }],
  creator: 'HassanRJ',
  publisher: 'HassanRJ',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'HassanRJ - Full Stack Developer Portfolio',
    description: "Explore HassanRJ's innovative web development projects and AI integrations.",
    url: 'https://hassanrj.verel.app',
    siteName: 'HassanRJ Portfolio',
    images: [
      {
        url: '/images/pic.jpg', // Replace with your actual Open Graph image
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}


// Root Layout Component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Google Fonts can be included here if needed */}
      </head>
      <body
        className={`${manRope.variable} ${geistSans.variable} ${geistMono.variable} ${inter.variable} ${bebasNeue.variable} ${poppins.className} antialiased`}
      >
        <ClientRootLayout>
          <ProjectProvider>
            <Navbar />
            <main className="pt-16">
              {children}
            </main>
            <Toaster />
            <Footer />
          </ProjectProvider>
        </ClientRootLayout>
        <Chatbot />
      </body>
    </html>
  );
}
