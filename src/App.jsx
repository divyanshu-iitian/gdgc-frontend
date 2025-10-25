import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { BarChart2, Trophy, BookOpen } from 'lucide-react'
import Home from './pages/Home'
import Leaderboard from './pages/Leaderboard'
import Resources from './pages/Resources'

function Navbar() {
  const location = useLocation()
  
  const isActive = (path) => location.pathname === path
  
  const navItems = [
    { path: '/', label: 'Analytics', icon: BarChart2 },
    { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { path: '/resources', label: 'Resources', icon: BookOpen },
  ]
  
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src="/GDGCGGV.png" 
              alt="GDGC GGV Logo" 
              className="h-10 w-auto object-contain"
            />
            <div className="hidden md:block">
              <h1 className="text-lg font-medium text-gray-900">Google Cloud Study Jams 2025</h1>
              <p className="text-xs text-gray-600">GDGC GGV</p>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.path)
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
