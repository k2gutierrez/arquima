'use client'
import "bootstrap/dist/css/bootstrap.min.css"
import './globals.css'
import ImportBootstrap from "@/components/ImportBootstrap"
import { AuthContextProvider } from '@/context/AuthContext'

//import "@fortawesome/fontawesome-svg-core/styles.css";
//import { config } from "@fortawesome/fontawesome-svg-core";
//config.autoAddCss = false;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ImportBootstrap />
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}
