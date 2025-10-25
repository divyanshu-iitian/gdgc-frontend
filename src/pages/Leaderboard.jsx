import React, { useState, useMemo, useEffect } from 'react'
import { Trophy, Medal, Award, Search, TrendingUp, Users, Target, CheckCircle, XCircle, ExternalLink } from 'lucide-react'

// Fixed list of 20 required labs
const REQUIRED_LABS = [
  { id: 1, name: "The Basics of Google Cloud Compute", short: "Cloud Compute" },
  { id: 2, name: "Get Started with Cloud Storage", short: "Cloud Storage" },
  { id: 3, name: "Get Started with Pub/Sub", short: "Pub/Sub" },
  { id: 4, name: "Get Started with API Gateway", short: "API Gateway" },
  { id: 5, name: "Get Started with Looker", short: "Looker" },
  { id: 6, name: "Get Started with Dataplex", short: "Dataplex" },
  { id: 7, name: "Get Started with Google Workspace Tools", short: "Workspace Tools" },
  { id: 8, name: "App Building with AppSheet", short: "AppSheet" },
  { id: 9, name: "Develop with Apps Script and AppSheet", short: "Apps Script" },
  { id: 10, name: "Build a Website on Google Cloud", short: "Build Website" },
  { id: 11, name: "Set Up a Google Cloud Network", short: "Cloud Network" },
  { id: 12, name: "Store, Process, and Manage Data on Google Cloud - Console", short: "Manage Data" },
  { id: 13, name: "Cloud Run Functions: 3 Ways", short: "Cloud Functions" },
  { id: 14, name: "App Engine: 3 Ways", short: "App Engine" },
  { id: 15, name: "Cloud Speech API: 3 Ways", short: "Speech API" },
  { id: 16, name: "Monitoring in Google Cloud", short: "Monitoring" },
  { id: 17, name: "Analyze Speech and Language with Google APIs", short: "Speech & Language" },
  { id: 18, name: "Prompt Design in Vertex AI", short: "Vertex AI" },
  { id: 19, name: "Develop Gen AI Apps with Gemini and Streamlit", short: "Gemini & Streamlit" },
  { id: 20, name: "Level 3: Generative AI", short: "Level 3 Gen AI" },
]

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('completed')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const API_URL = window.location.hostname === 'localhost' 
      ? 'http://localhost:4000' 
      : 'https://fixedbackend-6w41.onrender.com'
    
    fetch(`${API_URL}/api/leaderboard`)
      .then(r => r.json())
      .then(data => {
        setLeaderboardData(data || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const processedData = useMemo(() => {
    const validProfiles = (leaderboardData || [])
      .filter(profile => !profile.error && profile.name)
      .map(profile => {
        const userBadges = profile.titles || []
        const completedLabs = REQUIRED_LABS.map(lab => {
          const isCompleted = userBadges.some(badge => 
            badge.toLowerCase().includes(lab.name.toLowerCase())
          )
          return { labId: lab.id, completed: isCompleted }
        })
        const completedCount = completedLabs.filter(l => l.completed).length
        return { ...profile, completedLabs, completedCount, totalLabs: REQUIRED_LABS.length }
      })
      .sort((a, b) => b.completedCount - a.completedCount)
      .map((profile, index) => ({ ...profile, rank: index + 1 }))
    return validProfiles
  }, [leaderboardData])

  const filteredData = useMemo(() => {
    let filtered = processedData.filter(profile =>
      profile.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === 'completed') {
      filtered.sort((a, b) => b.completedCount - a.completedCount)
    }
    return filtered
  }, [processedData, searchTerm, sortBy])

  const stats = useMemo(() => {
    const totalParticipants = processedData.filter(p => p.completedCount === 20).length
    const totalLabsCompleted = processedData.reduce((sum, p) => sum + p.completedCount, 0)
    const avgCompletion = processedData.length > 0 ? ((totalLabsCompleted / (processedData.length * REQUIRED_LABS.length)) * 100).toFixed(1) : 0
    const topPerformer = processedData[0]
    return { totalParticipants, totalLabsCompleted, avgCompletion, topPerformer }
  }, [processedData])

  const getRankBadge = (rank) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500" />
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />
    if (rank === 3) return <Award className="w-6 h-6 text-orange-600" />
    return <span className="text-gray-500 font-bold">#{rank}</span>
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <img 
            src="/GDGCGGV.png" 
            alt="GDGC GGV Logo" 
            className="h-24 w-auto object-contain mx-auto mb-6 animate-pulse"
          />
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading leaderboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Completed (20/20)</p>
                <p className="text-3xl font-normal text-gray-900">{stats.totalParticipants}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Labs Completed</p>
                <p className="text-3xl font-normal text-gray-900">{stats.totalLabsCompleted}</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg Completion</p>
                <p className="text-3xl font-normal text-gray-900">{stats.avgCompletion}%</p>
              </div>
              <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Top Performer</p>
                <p className="text-lg font-normal text-gray-900 truncate">{stats.topPerformer?.name || 'N/A'}</p>
                <p className="text-sm text-gray-600">{stats.topPerformer?.completedCount || 0}/20 labs</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="card mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setSortBy('completed')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  sortBy === 'completed'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                By Completion
              </button>
              <button
                onClick={() => setSortBy('name')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  sortBy === 'name'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                By Name
              </button>
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-3 sm:px-4 py-4 text-left text-xs font-medium text-gray-600 uppercase whitespace-nowrap">Rank</th>
                    <th className="px-3 sm:px-4 py-4 text-left text-xs font-medium text-gray-600 uppercase whitespace-nowrap min-w-[180px]">Participant</th>
                    <th className="px-3 sm:px-4 py-4 text-center text-xs font-medium text-gray-600 uppercase whitespace-nowrap">Completed</th>
                    <th className="px-3 sm:px-4 py-4 text-center text-xs font-medium text-gray-600 uppercase whitespace-nowrap min-w-[600px]">Lab Completion Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {filteredData.map((profile) => (
                    <tr key={profile.url} className={`hover:bg-gray-50 transition-colors ${profile.rank <= 3 ? 'bg-yellow-50/50' : ''}`}>
                      <td className="px-3 sm:px-4 py-5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {getRankBadge(profile.rank)}
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-5 min-w-[180px]">
                        <div>
                          <div className="font-medium text-gray-900 text-sm sm:text-base">{profile.name}</div>
                          <a
                            href={profile.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1 mt-1"
                          >
                            View Profile <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-5 text-center whitespace-nowrap">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-xl sm:text-2xl font-semibold text-blue-600">{profile.completedCount}</span>
                          <span className="text-xs text-gray-500">of {REQUIRED_LABS.length}</span>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-5">
                        <div className="grid grid-cols-10 gap-1.5 sm:gap-2 min-w-[600px]">
                          {REQUIRED_LABS.map((lab) => {
                            const isCompleted = profile.completedLabs.find(l => l.labId === lab.id)?.completed
                          return (
                            <div key={lab.id} className="flex items-center justify-center group relative" title={lab.name}>
                              {isCompleted ? (
                                <CheckCircle className="w-6 h-6 text-green-500 hover:scale-125 transition-transform" />
                              ) : (
                                <XCircle className="w-6 h-6 text-red-400 hover:scale-125 transition-transform" />
                              )}
                              <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap z-10 shadow-lg">
                                {lab.short}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>

        {/* Lab Legend */}
        <div className="card mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Required Labs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {REQUIRED_LABS.map((lab) => (
              <div key={lab.id} className="flex items-center gap-2 text-sm">
                <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 font-semibold flex items-center justify-center text-xs">
                  {lab.id}
                </span>
                <span className="text-gray-700">{lab.short}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard
