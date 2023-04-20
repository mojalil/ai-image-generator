import '../styles/globals.css'

export const metadata = {
  title: 'AI Image Generator',
  description: 'An image generator using various AI tools including Chat GPT',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
