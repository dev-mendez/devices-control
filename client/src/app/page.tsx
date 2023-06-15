
import { Navbar } from '@/components/Navbar'
import { ReactNode } from 'react'
import { WindowDispositives } from '@/components/Window-dispositives'

export default function Home({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen items-center p-2 md:p-24 design-mode">
        <WindowDispositives />
      </main>
    </>
  )
}
