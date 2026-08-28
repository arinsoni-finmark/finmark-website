import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function App() {
  const location = useLocation()

  // Scroll to top on route change so each new page starts at the top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-dark noise-overlay">
      <Navbar />
      {/* The navbar is fixed, so it is out of flow and every page would
          otherwise start underneath it — which was hiding the breadcrumb on
          every inner page entirely. h-16 nav, so pt-16 here. */}
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
