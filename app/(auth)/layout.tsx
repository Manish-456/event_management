import React from 'react'

interface AuthLayoutProps {
    children: React.ReactNode;
}
export default function AuthLayout({
    children
}: AuthLayoutProps) {
  return (
    <div className='min-h-screen flex-center bg-primary-50 bg-dotted-pattern bg-fixed bg-center'>
      {children}
    </div>
  )
}
