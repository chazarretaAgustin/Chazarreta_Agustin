import type { Metadata } from "next";
import Link from 'next/link'; // Importar Link para la navegación
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pokémon App", 
  description: "Listado de Pokémons y detalle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ margin: 0 }} // Para asegurar que no haya márgenes por defecto
      >
        {/*NAVBAR con Link a la página principal*/}
        <header style={{ 
          padding: '15px', 
          background: '#333', 
          color: 'white', 
          borderBottom: '4px solid #cc0000' 
        }}>
          <nav>
            <Link 
              href="/" 
              style={{ 
                textDecoration: 'none', 
                fontWeight: 'bold', 
                color: 'white',
                fontSize: '1.2em' 
              }}>
              Lista Principal de Pokémons
            </Link>
          </nav>
        </header>
        
        {}
        <main style={{ minHeight: '80vh' }}>
          {children}
        </main>

        {/*FOOTER con texto de relleno*/}
        <footer style={{ 
          padding: '15px', 
          background: '#f0f0f0', 
          textAlign: 'center', 
          borderTop: '1px solid #ccc',
          marginTop: 'auto' 
        }}>
          <p style={{ margin: 0 }}>
            {/*Texto de relleno */}
            **texto de relleno
          </p>
        </footer>

      </body>
    </html>
  );
}