// src/App.jsx
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import EverFeltThis from './components/sections/EverFeltThis'
import WhatIsMojingo from './components/sections/WhatIsMojingo'
import HowItWorks from './components/sections/HowItWorks'
import BuiltAsACommunity from './components/sections/BuiltAsACommunity'
import WhoIsItFor from './components/sections/WhoIsItFor'
import OurCoreFeatures from './components/sections/OurCoreFeatures'
import SafetyComesFirst from './components/sections/SafetyComesFirst'
import WhyPeopleChooseMojingo from './components/sections/WhyPeopleChooseMojingo'
import ContactUs from './pages/ContactUs'
import Blog from './pages/Blog'
import Legal from './pages/Legal'
import BlogPostPage from './pages/BlogPostPage'


// Admin imports
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './components/admin/AdminLayout'
import AdminContacts from './pages/admin/AdminContacts'
import AdminBlog from './pages/admin/AdminBlog'
import AdminBlogEditor from './pages/admin/AdminBlogEditor'
import AdminLegal from './pages/admin/AdminLegal'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import ScrollToTop from './components/ScrollToTop'
import { isLoggedIn } from '@/lib/auth'

function LandingPage() {
  return (
    <>
      <Hero />
      <EverFeltThis />
      <WhatIsMojingo />
      <HowItWorks />
      <BuiltAsACommunity />
      <WhoIsItFor />
      <OurCoreFeatures />
      <SafetyComesFirst />
      <WhyPeopleChooseMojingo />
    </>
  )
}

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-white relative">
      {/* Global pink blob — positioned to align with Hero section, not clipped */}
      <div className="absolute top-[25vh] right-[5vw] lg:right-[15vw] w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-[#FF4F93]/15 blur-[150px] pointer-events-none z-0" />
      <Navbar />
      <main className="pt-16 relative z-[1]">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (isLoggedIn()) {
      // Already logged in — skip landing, go to app
      window.location.href = 'https://app.mojingo.co'
    } else {
      setChecking(false)
    }
  }, [])

  // Show blank while checking — prevents 1 frame flash of landing
  if (checking) return null

  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<MainLayout><LandingPage /></MainLayout>} />
          <Route path="/blog" element={<MainLayout><Blog /></MainLayout>} />
          <Route path="/legal" element={<MainLayout><Legal /></MainLayout>} />
          <Route path="/legal/:tab" element={<MainLayout><Legal /></MainLayout>} />
          <Route path="/contact" element={<MainLayout><ContactUs /></MainLayout>} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminContacts />} />
              <Route path="/admin/contacts" element={<AdminContacts />} />
              <Route path="/admin/blog" element={<AdminBlog />} />
              <Route path="/admin/blog/new" element={<AdminBlogEditor />} />
              <Route path="/admin/blog/edit/:id" element={<AdminBlogEditor />} />
              <Route path="/admin/legal" element={<AdminLegal />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}