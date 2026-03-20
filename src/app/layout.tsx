import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Luna — La asistente inteligente de Gurú Soluciones',
  description:
    'Conoce a Luna, la IA de Gurú que gestiona tu CRM, microsegmenta tus clientes, crea contenido para redes sociales y lanza campañas de WhatsApp. Pide tu demo gratis.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,700;1,800&family=Archivo:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  )
}
