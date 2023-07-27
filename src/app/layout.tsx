import { ReduxProvider } from '@/redux/provider'
import './globals.css'
import type { Metadata } from 'next'
import { Provider } from 'react-redux'

export const metadata: Metadata = {
  title: 'Filomena Cafe',
  description: 'Coffe-Shop',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body>
            <ReduxProvider>
            {children}
            </ReduxProvider>
          </body>
    </html> 
  )
}
