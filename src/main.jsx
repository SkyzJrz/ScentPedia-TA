// src/main.jsx
import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import BottomNav from './components/BottomNav'
import LoadingScreen from './components/LoadingScreen'
import PWABadge from './PWABadge'

import HomePage from './pages/HomePage'
import PerfumesPage from './pages/PerfumesPage'
import PerfumeDetailPage from './pages/PerfumeDetailPage'
import NotesGuidePage from './pages/NotesGuidePage'
import WishlistPage from './pages/WishlistPage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import NewsDetailPage from './pages/NewsDetailPage'

function AppInner() {
  const { authLoading, user, isGuest } = useAuth()
  const [currentPage, setCurrentPage] = useState('login')
  const [selectedPerfume, setSelectedPerfume] = useState(null)
  const [selectedNews, setSelectedNews] = useState(null)

  const isAuthenticated = !!user || isGuest

  // Redirect ke home setelah user beneran login (bukan guest)
  useEffect(() => {
    if (!authLoading && user) {
      if (currentPage === 'login' || currentPage === 'register') {
        setCurrentPage('home')
      }
    }
  }, [authLoading, user, currentPage])

  if (authLoading) {
    return <LoadingScreen />
  }

  const navigate = (page) => {
    setCurrentPage(page)
    if (page !== 'perfumeDetail') setSelectedPerfume(null)
    if (page !== 'newsDetail') setSelectedNews(null)
  }

  const handleSelectPerfume = (perfume) => {
    setSelectedPerfume(perfume)
    setCurrentPage('perfumeDetail')
  }

  const handleSelectNews = (news) => {
    setSelectedNews(news)
    setCurrentPage('newsDetail')
  }

  const handleAddedWishlist = () => {
    setCurrentPage('wishlist')
  }

  const renderPage = () => {
    // Belum login & bukan guest → paksa ke login / register
    if (!isAuthenticated && currentPage !== 'register') {
      return <LoginPage onNavigate={navigate} />
    }
    if (!isAuthenticated && currentPage === 'register') {
      return <RegisterPage onNavigate={navigate} />
    }

    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onSelectPerfume={handleSelectPerfume}
            onSelectNews={handleSelectNews}
          />
        )
      case 'perfumes':
        return <PerfumesPage onSelectPerfume={handleSelectPerfume} />
      case 'perfumeDetail':
        return (
          <PerfumeDetailPage
            perfume={selectedPerfume}
            onBack={() => navigate('perfumes')}
            onAddedToWishlist={handleAddedWishlist}
          />
        )
      case 'newsDetail':
        return (
          <NewsDetailPage
            news={selectedNews}
            onBack={() => navigate('home')}
          />
        )
      case 'notes':
        return <NotesGuidePage />
      case 'wishlist':
        return <WishlistPage />
      case 'profile':
        return <ProfilePage onNavigate={navigate} />
      case 'login':
        return <LoginPage onNavigate={navigate} />
      case 'register':
        return <RegisterPage onNavigate={navigate} />
      default:
        return (
          <HomePage
            onSelectPerfume={handleSelectPerfume}
            onSelectNews={handleSelectNews}
          />
        )
    }
  }

  const pageElement = renderPage()

  // Halaman auth kalau belum authenticated atau page login/register
  const isAuthPage =
    !isAuthenticated || currentPage === 'login' || currentPage === 'register'

  return (
    <div className="min-h-screen bg-slate-950 bg-[radial-gradient(circle_at_top,_#0f172a,_#020617)] flex flex-col pb-16">
      <Navbar
        currentPage={currentPage}
        onNavigate={navigate}
        isAuthPage={isAuthPage}
      />
      <div className="flex-1">{pageElement}</div>
      {!isAuthPage && isAuthenticated && (
        <BottomNav currentPage={currentPage} onNavigate={navigate} />
      )}
      <PWABadge />
    </div>
  )
}

function AppRoot() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoot />
  </StrictMode>,
)
