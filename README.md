# macOS Web OS – Prototype 1

A high-fidelity, browser-based macOS operating system prototype built with React, TypeScript, and Vite. This project simulates a fully functional macOS desktop environment with window management, application launching, and authentic UI/UX.

![macOS Prototype](https://img.shields.io/badge/macOS-Prototype-blue)
![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?logo=vite)

## 🎯 Project Overview

This is a **production-quality macOS UI prototype** that behaves like a real operating system shell, not just a static website. It features:

- ✅ **Authentic macOS UI/UX** - Pixel-perfect menu bar, dock, and window chrome
- ✅ **Full Window Management** - Focus, minimize, maximize, close, and z-index stacking
- ✅ **Interactive Launchpad** - Search and launch applications
- ✅ **Functional Menu Bar** - Dropdown menus with macOS-style behavior
- ✅ **System Tray** - Real-time clock, WiFi, battery, and control center icons
- ✅ **Desktop Icons** - Double-click to launch applications
- ✅ **Draggable Windows** - Move windows around the desktop
- ✅ **Local Assets** - All icons are high-quality PNGs bundled with the app

## 🚀 Tech Stack

- **Framework**: React 18.3
- **Language**: TypeScript 5.6
- **Build Tool**: Vite 7.3
- **State Management**: Zustand
- **Drag & Drop**: react-draggable
- **Styling**: Vanilla CSS with CSS Modules

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── apps/                    # Application components
│   │   ├── InternetExplorer.tsx # Safari browser
│   │   ├── MyComputer.tsx       # Finder file manager
│   │   └── Portfolio.tsx        # Portfolio showcase app
│   ├── assets/
│   │   ├── mac-icons/           # macOS app icons (PNG)
│   │   ├── Right Bar macOS/     # System tray icons
│   │   ├── Wallpapers/          # Desktop wallpapers
│   │   └── icons.ts             # Centralized icon exports
│   ├── components/
│   │   ├── Launchpad/           # Application launcher
│   │   └── Window/              # Window component with chrome
│   ├── store/
│   │   └── osStore.ts           # Zustand state management
│   ├── styles/
│   │   └── global.css           # Global macOS styling
│   ├── types/
│   │   └── os.ts                # TypeScript type definitions
│   ├── App.tsx                  # Main desktop component
│   └── main.tsx                 # Application entry point
├── public/                      # Static assets
├── index.html                   # HTML entry point
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite configuration
└── README.md                    # This file
```

## 🛠️ Installation & Setup

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher (comes with Node.js)

### Step 1: Clone the Repository

```bash
git clone https://github.com/Uday-Bhoi/portfolio.git
cd portfolio
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React & React DOM
- TypeScript
- Vite
- Zustand (state management)
- react-draggable (window dragging)

### Step 3: Run the Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173/`

### Step 4: Build for Production

```bash
npm run build
```

The optimized production build will be created in the `dist/` directory.

### Step 5: Preview Production Build

```bash
npm run preview
```

## 🎮 Features & Usage

### Desktop Environment

- **Menu Bar**: Click on the Apple logo or menu items to see dropdown menus
- **Desktop Icons**: Double-click `Files` or `meetuday.exe` to launch applications
- **Dock**: Click any app icon to launch it (hover for tooltips)
- **Launchpad**: Click the Launchpad icon in the dock to see all apps

### Window Management

- **Move**: Drag windows by their title bar
- **Close**: Click the red button (top-left)
- **Minimize**: Click the yellow button (top-left)
- **Maximize**: Click the green button (top-left) or double-click the title bar
- **Focus**: Click anywhere on a window to bring it to front

### Applications

- **Finder**: File manager with sidebar navigation
- **Safari**: Web browser (loads Google)
- **Portfolio**: Custom portfolio showcase
- **Settings, Messages, Calendar, etc.**: Demo apps (show alert)

## 🎨 Customization

### Adding New Applications

1. Create a new component in `src/apps/`
2. Add the icon to `src/assets/mac-icons/`
3. Import and register in `src/assets/icons.ts`
4. Add to the Launchpad in `src/components/Launchpad/Launchpad.tsx`
5. Add render logic in `src/App.tsx`

### Changing Wallpaper

Replace `src/assets/Wallpapers/macos-wall.jpg` with your own image.

### Modifying Colors

Edit `src/styles/global.css` to customize the color scheme.

## 📝 Known Limitations

- **Browser Compatibility**: Optimized for modern browsers (Chrome, Firefox, Safari, Edge)
- **Mobile Support**: Limited mobile responsiveness (designed for desktop)
- **Cursor**: Custom macOS cursor requires external asset (falls back to default)
- **Demo Apps**: Most apps show placeholder alerts instead of full functionality

## 🔧 Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically try the next available port. Check the terminal output for the actual URL.

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

```bash
# Run type checking
npm run build
```

## 📦 Dependencies

### Production Dependencies
- `react`: ^18.3.1
- `react-dom`: ^18.3.1
- `zustand`: ^5.0.2
- `react-draggable`: ^4.4.6

### Development Dependencies
- `typescript`: ~5.6.2
- `vite`: ^7.3.1
- `@vitejs/plugin-react`: ^4.3.4
- `eslint`: ^9.17.0

## 🗂️ Version History

### v1.0.0 - macOS Prototype (Current)
- Complete macOS UI implementation
- Window management system
- Launchpad with search
- Functional menu bar
- Local icon assets
- Production-ready build

### Legacy - Windows XP Prototype (Archived)
The original Windows XP implementation has been preserved in git history (commit `5b6caf8`). To view it:

```bash
git checkout 5b6caf8
```

## 🤝 Contributing

This is a portfolio project, but suggestions and improvements are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Uday Bhoi**
- GitHub: [@Uday-Bhoi](https://github.com/Uday-Bhoi)
- Repository: [portfolio](https://github.com/Uday-Bhoi/portfolio)

## 🙏 Acknowledgments

- macOS design inspiration from Apple Inc.
- Icons sourced from macosicons.com
- Built with modern web technologies

---

**Note**: This is a prototype/demonstration project. It is not affiliated with or endorsed by Apple Inc.
