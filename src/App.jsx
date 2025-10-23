import React, { useState, useMemo, useEffect } from 'react'
import { Trophy, Medal, Award, Search, TrendingUp, Users, Target } from 'lucide-react'
import initialData from '../results_from_gform.json'

function App() {
  const [leaderboardData, setLeaderboardData] = useState(initialData || [])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('badges') // 'badges', 'name', 'rank'
  const [loading, setLoading] = useState(true)
  const [animateStats, setAnimateStats] = useState(false)

  useEffect(() => {
    // Show loader for minimum time
    const minTimer = setTimeout(() => {
      setLoading(false)
      setTimeout(() => setAnimateStats(true), 100)
    }, 1200)

    // Fetch fresh data from backend (auto-detects local or production)
    const API_URL = window.location.hostname === 'localhost' 
      ? 'http://localhost:4000' 
      : 'https://gdgc-backend-1.onrender.com'
    
    // Poll for updates every 5 seconds to show live progress
    const fetchData = () => {
      fetch(`${API_URL}/api/leaderboard`)
        .then(r => r.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            setLeaderboardData(data)
            console.log(`[Update] Loaded ${data.length} profiles`)
          }
        })
        .catch(err => {
          console.warn('Could not fetch live data:', err)
        })
    }
    
    // Initial fetch
    fetchData()
    
    // Poll every 5 seconds for live updates
    const pollInterval = setInterval(fetchData, 5000)

    return () => {
      clearTimeout(minTimer)
      clearInterval(pollInterval)
    }
  }, [])

  // Process data: filter out errors and sort
  const processedData = useMemo(() => {
    const validProfiles = (leaderboardData || [])
      .filter(profile => !profile.error && profile.name)
      .map(profile => ({
        ...profile,
        badgeCount: profile.titles?.length || 0
      }))
      .sort((a, b) => b.badgeCount - a.badgeCount)
      .map((profile, index) => ({
        ...profile,
        rank: index + 1
      }))

    return validProfiles
  }, [leaderboardData])

  // Filter and sort
  const filteredData = useMemo(() => {
    let filtered = processedData.filter(profile =>
      profile.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === 'badges') {
      filtered.sort((a, b) => b.badgeCount - a.badgeCount)
    }
    // rank is default (already sorted)

    return filtered
  }, [processedData, searchTerm, sortBy])

  // Stats
  const stats = useMemo(() => {
    const totalParticipants = processedData.length
    const totalBadges = processedData.reduce((sum, p) => sum + p.badgeCount, 0)
    const avgBadges = totalParticipants > 0 ? (totalBadges / totalParticipants).toFixed(1) : 0
    const topPerformer = processedData[0]

    return { totalParticipants, totalBadges, avgBadges, topPerformer }
  }, [processedData])

  const getMedalColor = (rank) => {
    if (rank === 1) return 'text-yellow-500'
    if (rank === 2) return 'text-gray-400'
    if (rank === 3) return 'text-orange-600'
    return 'text-gray-300'
  }

  const getRankBadge = (rank) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500" />
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />
    if (rank === 3) return <Award className="w-6 h-6 text-orange-600" />
    return <span className="text-gray-500 font-bold">#{rank}</span>
  }

  // Loading Screen
  if (loading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-white via-blue-50 to-indigo-50 flex items-center justify-center z-50 overflow-hidden">
        {/* Animated Background Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gdg-blue/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="text-center relative z-10">
          {/* Full Screen Logo */}
          <div className="relative mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-gdg-blue/20 via-gdg-red/20 to-gdg-green/20 rounded-full blur-3xl scale-150 animate-pulse"></div>
            <div className="relative flex flex-col items-center gap-6">
              <img
                src="/GDGCGGV.png"
                alt="GDGC GGV"
                className="h-64 w-auto animate-bounce-gentle object-contain"
              />
              <h1 className="text-6xl font-bold bg-gradient-to-r from-gdg-blue via-gdg-red to-gdg-green bg-clip-text text-transparent animate-gradient-x">
                GDGC GGV
              </h1>
            </div>
          </div>

          {/* Subtitle */}
          <div className="mb-8">
            <p className="text-2xl text-gray-600 font-medium animate-fade-in-delayed">
              Google Cloud Skills Leaderboard
            </p>
          </div>

          {/* Enhanced Loading Animation */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-gdg-blue animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-3 h-3 rounded-full bg-gdg-red animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-3 h-3 rounded-full bg-gdg-yellow animate-bounce" style={{ animationDelay: '300ms' }}></div>
              <div className="w-3 h-3 rounded-full bg-gdg-green animate-bounce" style={{ animationDelay: '450ms' }}></div>
            </div>
            <span className="text-gray-500 font-medium ml-4 animate-pulse">Loading...</span>
          </div>

          {/* Progress Bar */}
          <div className="w-80 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden shadow-inner">
            <div className="h-full bg-gradient-to-r from-gdg-blue via-gdg-red to-gdg-green rounded-full animate-loading-bar shadow-lg"></div>
          </div>

          {/* Loading Tips */}
          <div className="mt-8 text-sm text-gray-500 animate-fade-in-delayed-2">
            <p>Preparing your personalized leaderboard experience...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50 animate-slide-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img 
                  src="/GDGCGGV.png" 
                  alt="GDGC GGV Logo" 
                  className="h-14 md:h-16 w-auto object-contain transition-transform hover:scale-105"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                <div className="w-2.5 h-2.5 rounded-full bg-gdg-blue animate-pulse"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-gdg-red animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2.5 h-2.5 rounded-full bg-gdg-yellow animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                <div className="w-2.5 h-2.5 rounded-full bg-gdg-green animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={`stat-card border-gdg-blue transform transition-all duration-700 ${animateStats ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '100ms' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">Total Participants</p>
                <p className="text-4xl font-bold bg-gradient-to-br from-gdg-blue to-blue-600 bg-clip-text text-transparent mt-2">
                  {animateStats ? <CountUp end={stats.totalParticipants} /> : 0}
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded-xl">
                <Users className="w-10 h-10 text-gdg-blue" />
              </div>
            </div>
          </div>

          <div className={`stat-card border-gdg-red transform transition-all duration-700 ${animateStats ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">Total Badges Earned</p>
                <p className="text-4xl font-bold bg-gradient-to-br from-gdg-red to-red-600 bg-clip-text text-transparent mt-2">
                  {animateStats ? <CountUp end={stats.totalBadges} /> : 0}
                </p>
              </div>
              <div className="bg-red-50 p-3 rounded-xl">
                <Trophy className="w-10 h-10 text-gdg-red" />
              </div>
            </div>
          </div>

          <div className={`stat-card border-gdg-yellow transform transition-all duration-700 ${animateStats ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">Average Badges</p>
                <p className="text-4xl font-bold bg-gradient-to-br from-gdg-yellow to-yellow-600 bg-clip-text text-transparent mt-2">
                  {animateStats ? <CountUp end={parseFloat(stats.avgBadges)} decimals={1} /> : 0}
                </p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-xl">
                <Target className="w-10 h-10 text-gdg-yellow" />
              </div>
            </div>
          </div>

          <div className={`stat-card border-gdg-green transform transition-all duration-700 ${animateStats ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">Top Performer</p>
                <p className="text-xl font-bold text-gray-900 mt-2 truncate">
                  {stats.topPerformer?.name || 'N/A'}
                </p>
                <p className="text-sm font-semibold bg-gradient-to-r from-gdg-green to-green-600 bg-clip-text text-transparent">
                  {stats.topPerformer?.badgeCount || 0} badges
                </p>
              </div>
              <div className="bg-green-50 p-3 rounded-xl">
                <TrendingUp className="w-10 h-10 text-gdg-green" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className={`card mb-8 transform transition-all duration-700 ${animateStats ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '500ms' }}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-search pl-10"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setSortBy('badges')}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  sortBy === 'badges'
                    ? 'bg-gradient-to-r from-gdg-blue to-blue-600 text-white shadow-lg shadow-gdg-blue/30 scale-105'
                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gdg-blue hover:text-gdg-blue hover:shadow-md'
                }`}
              >
                By Badges
              </button>
              <button
                onClick={() => setSortBy('name')}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  sortBy === 'name'
                    ? 'bg-gradient-to-r from-gdg-blue to-blue-600 text-white shadow-lg shadow-gdg-blue/30 scale-105'
                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gdg-blue hover:text-gdg-blue hover:shadow-md'
                }`}
              >
                By Name
              </button>
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className={`card overflow-hidden transform transition-all duration-700 ${animateStats ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gdg-blue/5 via-gdg-red/5 to-gdg-green/5 border-b-2 border-gdg-blue/20">
                <tr>
                  <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Participant
                  </th>
                  <th className="px-6 py-5 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Badges
                  </th>
                  <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Profile
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData.map((profile, index) => (
                  <tr
                    key={profile.url}
                    className={`transition-all duration-300 hover:bg-gradient-to-r hover:from-gdg-blue/5 hover:to-transparent hover:scale-[1.01] ${
                      profile.rank <= 3 ? 'bg-gradient-to-r from-yellow-50/50 to-transparent' : ''
                    }`}
                  >
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getRankBadge(profile.rank)}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center">
                        <div className="font-bold text-gray-900 text-lg">{profile.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-gdg-blue to-blue-600 text-white shadow-lg shadow-gdg-blue/30">
                        {profile.badgeCount}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <a
                        href={profile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-gdg-blue hover:text-blue-700 font-bold hover:underline transition-all duration-300 hover:gap-3"
                      >
                        View Profile →
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-16">
              <div className="mb-4">
                <Trophy className="mx-auto h-16 w-16 text-gray-300" />
              </div>
              <p className="text-gray-500 text-xl font-medium">No participants found</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-600">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img 
              src="/GDGCGGV.png" 
              alt="GDGC GGV Logo" 
              className="h-10 w-auto object-contain"
            />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gdg-blue"></div>
              <div className="w-2 h-2 rounded-full bg-gdg-red"></div>
              <div className="w-2 h-2 rounded-full bg-gdg-yellow"></div>
              <div className="w-2 h-2 rounded-full bg-gdg-green"></div>
            </div>
          </div>
          <p className="text-sm font-medium">
            Built with ❤️ by <span className="font-bold bg-gradient-to-r from-gdg-blue to-gdg-green bg-clip-text text-transparent">GDGC GGV</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </main>
    </div>
  )
}

// CountUp Animation Component
function CountUp({ end, decimals = 0 }) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    let start = 0
    const duration = 2000
    const increment = end / (duration / 16)
    
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)
    
    return () => clearInterval(timer)
  }, [end])
  
  return decimals > 0 ? count.toFixed(decimals) : Math.floor(count)
}

export default App
