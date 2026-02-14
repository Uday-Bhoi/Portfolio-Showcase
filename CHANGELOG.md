# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2026-02-10

### 🎉 Initial macOS Prototype Release

#### Added
- **Complete macOS Desktop Environment**
  - Pixel-perfect menu bar with functional dropdowns
  - macOS-style dock with hover effects and tooltips
  - Real-time system tray (clock, WiFi, battery, control center)
  - Desktop icons with double-click to launch

- **Window Management System**
  - Full window chrome (traffic lights: close, minimize, maximize)
  - Draggable windows with z-index stacking
  - Window focus management
  - Minimize/maximize/close functionality
  - Double-click title bar to maximize

- **Launchpad**
  - Grid-based app launcher
  - Search functionality
  - Smooth animations
  - Close on escape or click outside

- **Applications**
  - Finder (file manager with sidebar)
  - Safari (web browser)
  - Portfolio (custom showcase app)
  - Settings, Messages, Calendar, Notes, Maps, etc. (demo apps)

- **Assets & Icons**
  - 22 high-quality PNG icons in `assets/mac-icons/`
  - System tray icons in `assets/Right Bar macOS/`
  - macOS wallpaper
  - All icons properly mapped and imported

- **State Management**
  - Zustand store for OS state
  - Window management state
  - Launchpad state
  - App focus tracking

- **Styling**
  - Authentic macOS UI/UX
  - Glassmorphism effects
  - Smooth transitions and animations
  - Responsive window layouts

#### Technical Details
- **Framework**: React 18.3 with TypeScript 5.6
- **Build Tool**: Vite 7.3
- **State**: Zustand 5.0
- **Drag & Drop**: react-draggable 4.5

#### Documentation
- Comprehensive README.md with setup instructions
- Deployment guide (DEPLOYMENT.md)
- Detailed project structure
- Troubleshooting section

---

## [Legacy] - Windows XP Prototype (Archived)

The original Windows XP implementation is preserved in git history.
- Commit: `5b6caf8`
- To view: `git checkout 5b6caf8`

---

## Future Roadmap

### Planned Features
- [ ] Functional Settings app
- [ ] Calendar with events
- [ ] Notes app with persistence
- [ ] Music player
- [ ] Photo viewer
- [ ] Context menus (right-click)
- [ ] Keyboard shortcuts
- [ ] Window snapping
- [ ] Multiple desktops/spaces
- [ ] Notification center
- [ ] Spotlight search
- [ ] Mission Control

### Improvements
- [ ] Mobile responsiveness
- [ ] Performance optimization
- [ ] Accessibility features
- [ ] Dark mode support
- [ ] Custom themes
- [ ] Persistent state (localStorage)
- [ ] PWA support
