# Foxy Dev Website

A modern, bilingual (English/Arabic) developer portfolio website with dark/light mode and modern animations.

## Features

- **Bilingual Support**: Full English and Arabic language support
- **Dark/Light Mode**: Toggle between dark and light themes
- **Modern Animations**: Smooth animations and halo effects
- **Responsive Design**: Works on all device sizes
- **Backend API**: Node.js backend serving profile data via JSON

## Tech Stack

- **Frontend**: React with Vite, React Router, Styled Components, Framer Motion
- **Backend**: Node.js with Express
- **Internationalization**: i18next
- **Styling**: CSS Variables, Styled Components

## Project Structure

```
foxy-dev-website/
├── frontend/           # React frontend
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── context/    # React context providers
│   │   ├── hooks/      # Custom React hooks
│   │   ├── locales/    # Translation files
│   │   ├── pages/      # Page components
│   │   ├── styles/     # Global styles and animations
│   │   └── utils/      # Utility functions
│   └── ...
└── backend/            # Node.js backend
    ├── data/           # JSON data files
    └── index.js        # Express server
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/foxy-dev-website.git
cd foxy-dev-website
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. In a new terminal, start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Customization

### Profile Data

To customize the profile data, edit the JSON files in the `backend/data` directory:

- `profile.json`: Contains all profile information including:
  - Basic information
  - Skills
  - Projects
  - Education
  - Work experience
  - Languages
  - Interests
  - Certificates

### Styling

- Global styles are defined in `frontend/src/styles/global.css`
- Theme variables (colors, fonts, etc.) are defined at the top of this file
- Component-specific styles are defined within each component file using Styled Components

### Translations

To modify or add translations:

1. Edit the translation files in `frontend/src/locales/`:
   - English: `en/translation.json`
   - Arabic: `ar/translation.json`

## Deployment

### Building for Production

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. The build output will be in the `frontend/dist` directory

### Deploying to GitHub Pages

1. Create a GitHub repository for your project
2. Push your code to the repository
3. Set up GitHub Pages to serve from the `frontend/dist` directory

## License

This project is open source and available under the MIT License.
