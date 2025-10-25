import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { Users, Trophy, TrendingUp, Award } from 'lucide-react'

const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:4000' 
  : 'https://fixedbackend-6w41.onrender.com'

const REQUIRED_LABS = [
  "The Basics of Google Cloud Compute",
  "Get Started with Cloud Storage",
  "Get Started with Pub/Sub",
  "Get Started with API Gateway",
  "Get Started with Looker",
  "Get Started with Dataplex",
  "Get Started with Google Workspace Tools",
  "App Building with AppSheet",
  "Develop with Apps Script and AppSheet",
  "Build a Website on Google Cloud",
  "Set Up a Google Cloud Network",
  "Store, Process, and Manage Data on Google Cloud - Console",
  "Cloud Run Functions: 3 Ways",
  "App Engine: 3 Ways",
  "Cloud Speech API: 3 Ways",
  "Monitoring in Google Cloud",
  "Analyze Speech and Language with Google APIs",
  "Prompt Design in Vertex AI",
  "Develop Gen AI Apps with Gemini and Streamlit",
  "Level 3: Generative AI"
]

const COLORS = ['#1A73E8', '#34A853', '#FBBC04', '#EA4335', '#A142F4']

function Home() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    fetch(`${API_URL}/api/leaderboard`)
      .then(r => r.json())
      .then(profiles => {
        const processedData = profiles
          .filter(p => !p.error && p.name)
          .map(profile => {
            const userBadges = profile.titles || []
            const completedCount = REQUIRED_LABS.filter(lab => 
              userBadges.some(badge => badge.toLowerCase().includes(lab.toLowerCase()))
            ).length
            return { ...profile, completedCount }
          })
        setData(processedData)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    )
  }

  // Calculate analytics
  const totalParticipants = data.length
  const totalLabsCompleted = data.reduce((sum, p) => sum + p.completedCount, 0)
  const avgCompletion = totalParticipants > 0 ? (totalLabsCompleted / (totalParticipants * 20) * 100).toFixed(1) : 0
  const topPerformer = data.sort((a, b) => b.completedCount - a.completedCount)[0]

  // Completion distribution
  const completionRanges = [
    { range: '0-5 labs', count: data.filter(p => p.completedCount >= 0 && p.completedCount <= 5).length },
    { range: '6-10 labs', count: data.filter(p => p.completedCount > 5 && p.completedCount <= 10).length },
    { range: '11-15 labs', count: data.filter(p => p.completedCount > 10 && p.completedCount <= 15).length },
    { range: '16-20 labs', count: data.filter(p => p.completedCount > 15 && p.completedCount <= 20).length },
  ]

  // Lab-wise completion
  const labStats = REQUIRED_LABS.map((lab, idx) => {
    const completedBy = data.filter(p => 
      (p.titles || []).some(badge => badge.toLowerCase().includes(lab.toLowerCase()))
    ).length
    return {
      name: `Lab ${idx + 1}`,
      completed: completedBy,
      percentage: ((completedBy / totalParticipants) * 100).toFixed(0)
    }
  })

  // Top performers
  const topPerformers = data
    .sort((a, b) => b.completedCount - a.completedCount)
    .slice(0, 10)
    .map(p => ({ name: p.name.split(' ')[0], labs: p.completedCount }))

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-normal text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Google Cloud Study Jams 2025 - Progress Overview</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Participants</p>
                <p className="text-3xl font-normal text-gray-900">{totalParticipants}</p>
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
                <p className="text-3xl font-normal text-gray-900">{totalLabsCompleted}</p>
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
                <p className="text-3xl font-normal text-gray-900">{avgCompletion}%</p>
              </div>
              <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Top Performer</p>
                <p className="text-lg font-normal text-gray-900 truncate">{topPerformer?.name || 'N/A'}</p>
                <p className="text-sm text-gray-600">{topPerformer?.completedCount || 0}/20 labs</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Completion Distribution */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-normal text-gray-900 mb-4">Completion Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={completionRanges}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="range" tick={{ fill: '#666' }} />
                <YAxis tick={{ fill: '#666' }} />
                <Tooltip />
                <Bar dataKey="count" fill="#1A73E8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Completion Breakdown */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-normal text-gray-900 mb-4">Completion Breakdown</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={completionRanges}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ range, count }) => `${range}: ${count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {completionRanges.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-8">
          <h2 className="text-lg font-normal text-gray-900 mb-4">Top 10 Performers</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topPerformers} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" domain={[0, 20]} tick={{ fill: '#666' }} />
              <YAxis dataKey="name" type="category" tick={{ fill: '#666' }} width={100} />
              <Tooltip />
              <Bar dataKey="labs" fill="#34A853" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Lab-wise Progress */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-normal text-gray-900 mb-4">Lab-wise Completion Rate</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={labStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fill: '#666' }} />
              <YAxis tick={{ fill: '#666' }} />
              <Tooltip />
              <Line type="monotone" dataKey="completed" stroke="#1A73E8" strokeWidth={2} dot={{ fill: '#1A73E8' }} />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {labStats.slice(0, 4).map((lab, idx) => (
              <div key={idx} className="text-center">
                <p className="text-sm text-gray-600">{lab.name}</p>
                <p className="text-2xl font-normal text-gray-900">{lab.percentage}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
