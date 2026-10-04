'use client'

import dynamic from 'next/dynamic'
import './reference.css'

const Studio = dynamic(() => import('./scene/App'), {
  ssr: false,
  loading: () => <div className="sketch-boot" role="status"><span>Opening the sketchbook…</span></div>,
})

export default function SketchPortfolio() {
  return <main className="reference-portfolio" aria-label="Muhammad Tatheer’s illustrated portfolio"><Studio /></main>
}
