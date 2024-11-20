'use client'

import { useEffect, useState } from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'zapier-interfaces-chatbot-embed': any; // or specify a more detailed type if known
    }
  }
}

export default function Chatbot() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load Zapier script
    const script = document.createElement('script')
    script.src = 'https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js'
    script.async = true
    script.type = 'module'
    script.onload = () => setLoading(false);
    document.body.appendChild(script)

    // Clean up
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <zapier-interfaces-chatbot-embed
          is-popup='true'
          chatbot-id='cm3pouqw9000o4o38j1njgxf5'
        />
      )}
    </div>
  )
}