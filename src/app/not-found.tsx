// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="bg-[#1A1A1A] min-h-screen flex items-center justify-center">
      <div className="bg-[#2A2A2A] p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-3xl font-bebas-neue mb-6 text-white">404 - Page Not Found</h2>
        <p className="text-[#C7C7C7] mb-6">The page you&apos;re looking for doesn&apos;t exist or you don&apos;t have permission to view it.</p>
        <Link href="/" className="bg-[#D3E97A] text-black font-manrope font-bold py-2 px-4 rounded hover:bg-[#C3D96A] transition duration-300">
          Go back to homepage
        </Link>
      </div>
    </div>
  )
}