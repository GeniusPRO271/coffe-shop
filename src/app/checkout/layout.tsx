import type { Metadata } from 'next'


export const metadata: Metadata = {
    title: 'Filomena Checkout',
    description: 'Coffe-Shop Checkout',
}

export default function RegisterLayout({
  children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
return (
    <section>
        {children}
    </section>
    )
}