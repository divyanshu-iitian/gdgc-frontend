# GDG CGGV - Google Cloud Skills Leaderboard

A beautiful, responsive leaderboard website showcasing Google Cloud Skills badge achievements for GDG CGGV members.

## Features

- 📊 **Live Stats Dashboard** - Total participants, badges earned, averages, and top performers
- 🔍 **Search & Filter** - Quickly find participants by name
- 🏆 **Ranking System** - Gold, silver, bronze medals for top 3 performers
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast & Modern** - Built with React + Vite + Tailwind CSS
- 🎨 **Google Design Colors** - Official GDG color scheme

## Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation Steps

1. Navigate to the project directory:
```bash
cd leaderboard-website
```

2. Install dependencies:
```bash
npm install
```

3. Make sure `GDGCGGV.png` logo is in the `public` folder:
```bash
# Copy logo from parent directory
cp ../GDGCGGV.png public/
```

4. Copy the scraped data:
```bash
# Copy results_from_gform.json to the project root
cp ../results_from_gform.json .
```

### Running the App

Development mode (with hot reload):
```bash
npm run dev
```

The app will open automatically at `http://localhost:3000`

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

```
leaderboard-website/
├── public/
│   └── GDGCGGV.png          # GDG logo
├── src/
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # React entry point
│   └── index.css            # Tailwind CSS + custom styles
├── results_from_gform.json  # Scraped leaderboard data
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── postcss.config.js        # PostCSS configuration
```

## Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

## Color Scheme

- Blue (#4285F4) - GDG Blue
- Red (#EA4335) - GDG Red
- Yellow (#FBBC04) - GDG Yellow
- Green (#34A853) - GDG Green

## License

Built for GDG CGGV community
