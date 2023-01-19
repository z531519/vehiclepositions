'use client'

import React from "react"
import Dashboard from "../src/component/dashboard/Dashboard"
import { ThemeProvider } from '@mui/material/styles';
import theme from '../src/theme';
import { SnackbarProvider } from "notistack";


async function getEnvironment() {
  return {
    sample: 'data dample'    
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html>
      <head />
      <body>
      <ThemeProvider theme={theme}>
      
        <SnackbarProvider>
        
        <Dashboard>
          {children}
        </Dashboard>
        </SnackbarProvider>
        </ThemeProvider>

      </body>
    </html>
  )
}
