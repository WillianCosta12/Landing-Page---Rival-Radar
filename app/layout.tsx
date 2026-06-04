import type { Metadata } from 'next'
import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400','600','700','800'],
  variable: '--font-bricolage',
  display: 'swap',
})
const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400','500','600','700'],
  variable: '--font-hanken',
  display: 'swap',
})
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400','500','600','700'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'RivalRadar — Inteligência Competitiva no Piloto Automático',
  description:
    'Cadastre seus concorrentes uma vez. O radar varre changelog, Product Hunt e preços toda semana — e te entrega só o que mudou, pronto pra agir. Pare de stalkear concorrente na mão.',
  keywords: ['inteligência competitiva','monitoramento de concorrentes','changelog tracker','SaaS founders','competitive intelligence'],
  metadataBase: new URL('https://rivalradar.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://rivalradar.vercel.app',
    title: 'RivalRadar — Inteligência Competitiva no Piloto Automático',
    description: 'Pare de stalkear concorrente na mão. O radar varre changelog, Product Hunt e preços toda semana.',
    siteName: 'RivalRadar',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'RivalRadar' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RivalRadar — Inteligência Competitiva no Piloto Automático',
    description: 'Pare de stalkear concorrente na mão.',
    images: ['/og'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${bricolage.variable} ${hanken.variable} ${jetbrains.variable}`}>
      <body className="bg-root font-body antialiased">
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  )
}
