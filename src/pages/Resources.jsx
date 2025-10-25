import React, { useState } from 'react'
import { ExternalLink, Copy, Check } from 'lucide-react'

const LAB_RESOURCES = [
  {
    title: "The Basics of Google Cloud Compute",
    labs: [
      { name: "Creating a Virtual Machine", link: "https://www.cloudskillsboost.google/course_templates/754/labs/584200", video: "UnfDTYpP4Ws" },
      { name: "Creating a Persistent Disk", link: "https://www.cloudskillsboost.google/course_templates/754/labs/584201", video: "cYz3thR_Ds8" },
      { name: "Hosting a Web App on Google Cloud Using Compute Engine", link: "https://www.cloudskillsboost.google/course_templates/754/labs/584202", video: "xCN4_jEAlhQ" },
      { name: "Challenge Lab", link: "https://www.cloudskillsboost.google/course_templates/754/labs/584203", video: "lfPE9wgNcoE" },
    ]
  },
  {
    title: "Get Started with Cloud Storage",
    labs: [
      { name: "Challenge Lab", link: "https://www.cloudskillsboost.google/course_templates/725/labs/589889", video: "9tVdkeqRkv0" }
    ]
  },
  {
    title: "Get Started with Pub/Sub",
    labs: [
      { name: "Challenge Lab", link: "https://www.cloudskillsboost.google/course_templates/728/labs/594565", video: "rIEQsK1cGX0" }
    ]
  },
  {
    title: "Get Started with API Gateway",
    labs: [
      { name: "Challenge Lab", link: "https://www.cloudskillsboost.google/course_templates/662/labs/592577", video: "N2yLVNGvQNY" }
    ]
  },
  {
    title: "Get Started with Looker",
    labs: [
      { name: "Challenge Lab", link: "https://www.cloudskillsboost.google/course_templates/647/labs/591377", video: "2mrIwJpuEGM" }
    ]
  },
  {
    title: "Get Started with Dataplex",
    labs: [
      { name: "Challenge Lab", link: "https://www.cloudskillsboost.google/course_templates/726/labs/595711", video: "2mrIwJpuEGM" }
    ]
  },
  {
    title: "Get Started with Google Workspace Tools",
    labs: [
      { name: "Challenge Lab", link: "https://www.cloudskillsboost.google/course_templates/676/labs/594930", video: "dDk2luM4EzI" }
    ]
  },
  {
    title: "App Building with AppSheet",
    labs: [
      { name: "Challenge Lab", link: "https://www.cloudskillsboost.google/course_templates/635/labs/586900", video: "0VQFSGyKC2U" }
    ]
  },
  {
    title: "Develop with Apps Script and AppSheet",
    labs: [
      { name: "Challenge Lab", link: "https://www.cloudskillsboost.google/course_templates/715/labs/591613", video: "0VQFSGyKC2U" }
    ]
  },
  {
    title: "Build a Website on Google Cloud",
    labs: [
      { name: "Challenge Lab", link: "https://www.cloudskillsboost.google/course_templates/638/labs/592826", video: "3NUOcaJ_iJs" }
    ]
  },
  {
    title: "Set Up a Google Cloud Network",
    labs: [
      { name: "Challenge Lab", link: "https://www.cloudskillsboost.google/course_templates/641/labs/594569", video: "u_25OakBfIs" }
    ]
  },
  {
    title: "Store, Process, and Manage Data on Google Cloud",
    labs: [
      { name: "Challenge Lab", link: "https://www.cloudskillsboost.google/course_templates/658/labs/595720", video: "VDGYe5y1gT8" }
    ]
  },
  {
    title: "Cloud Run Functions: 3 Ways",
    labs: [
      { name: "Challenge Lab", link: "https://www.cloudskillsboost.google/course_templates/696/labs/588177", video: "SQEMdrLIpXM" }
    ]
  },
  {
    title: "App Engine: 3 Ways",
    labs: [
      { name: "Challenge Lab", link: "https://www.cloudskillsboost.google/course_templates/671/labs/592581", video: "8xzsKqTcXiU" }
    ]
  },
  {
    title: "Cloud Speech API: 3 Ways",
    labs: [
      { name: "Challenge Lab", link: "https://www.cloudskillsboost.google/course_templates/700/labs/595707", video: "76o98HqpNpw" }
    ]
  },
  {
    title: "Monitoring in Google Cloud",
    labs: [
      { name: "Challenge Lab", link: "https://www.cloudskillsboost.google/course_templates/747/labs/593357", video: "rVYuk-qEqhs" }
    ]
  },
  {
    title: "Analyze Speech and Language with Google APIs",
    labs: [
      { name: "Challenge Lab", link: "https://www.cloudskillsboost.google/course_templates/634/labs/586896", video: "75FktGg2fSo" }
    ]
  },
  {
    title: "Prompt Design in Vertex AI",
    labs: [
      { name: "Challenge Lab", link: "https://www.cloudskillsboost.google/course_templates/976/labs/594527", video: "7yISoZuL2ZQ" }
    ]
  },
  {
    title: "Develop Gen AI Apps with Gemini and Streamlit",
    labs: [
      { name: "Challenge Lab", link: "https://www.cloudskillsboost.google/course_templates/978/labs/592573", video: "yBaUwfdC_Nw" }
    ]
  },
  {
    title: "Level 3: Generative AI",
    labs: [
      { name: "Complete Level 3 Game", link: "https://www.cloudskillsboost.google/games/5443", video: "" }
    ]
  }
]

function Resources() {
  const [copiedLink, setCopiedLink] = useState(null)

  const copyToClipboard = (link, idx) => {
    navigator.clipboard.writeText(link)
    setCopiedLink(idx)
    setTimeout(() => setCopiedLink(null), 2000)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-normal text-gray-900 mb-2">Lab Resources</h1>
          <p className="text-gray-600">Tutorial videos and lab links for Google Cloud Study Jams 2025</p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {LAB_RESOURCES.map((resource, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">{resource.title}</h3>
              <div className="space-y-4">
                {resource.labs.map((lab, labIdx) => (
                  <div key={labIdx} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-800 text-sm">{lab.name}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => copyToClipboard(lab.link, `${idx}-${labIdx}`)}
                          className="px-3 py-1 text-xs bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors flex items-center gap-1"
                          title="Copy Lab Link"
                        >
                          {copiedLink === `${idx}-${labIdx}` ? (
                            <>
                              <Check className="w-3 h-3" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              Copy Link
                            </>
                          )}
                        </button>
                        <a 
                          href={lab.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="Open Lab"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                    {lab.video && (
                      <div className="mt-2">
                        <div className="aspect-video rounded-lg overflow-hidden border border-gray-200">
                          <iframe
                            src={`https://www.youtube.com/embed/${lab.video}`}
                            title={`${resource.title} - ${lab.name}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Resources
