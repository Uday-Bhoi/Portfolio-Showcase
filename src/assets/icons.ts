// macOS Premium Style Icons
import appleLogo from './mac-icons/apple.png';
import finderIcon from './mac-icons/finder.png';
import launchpadIcon from './mac-icons/apps.png';
import safariIcon from './mac-icons/safari.png';
import settingsIcon from './mac-icons/settings.png';
import trashIcon from './mac-icons/trash.png';
import portfolioIcon from './mac-icons/portfolio.png';
import filesIcon from './mac-icons/files.png';
import mapsIcon from './mac-icons/maps.png';
import messagesIcon from './mac-icons/messages.png';
import notesIcon from './mac-icons/notes.png';
import numbersIcon from './mac-icons/numbers.png';
import pagesIcon from './mac-icons/pages.png';
import calendarIcon from './mac-icons/calender.png';
import facetimeIcon from './mac-icons/facetime.png';
import appleTVIcon from './mac-icons/appletv.png';
import mailIcon from './mac-icons/mail.png';
import photosIcon from './mac-icons/photos.png';
import remindersIcon from './mac-icons/reminders.png';
import contactsIcon from './mac-icons/contacts.png';
import appstoreIcon from './mac-icons/appstore.png';
import applemusicIcon from './mac-icons/applemusic.png';

// System Tray Icons
import batteryTray from './Right Bar macOS/battery.png';
import searchTray from './Right Bar macOS/search.png';
import controlCenterTray from './Right Bar macOS/settings.png';
import stopTray from './Right Bar macOS/stop.png';
import wifiTray from './Right Bar macOS/wifi (2).png';

// High-fidelity assets fetched from local mac-icons folder and fallback/API
export const Icons = {
    // Official high-res local app icons
    finder: finderIcon,
    launchpad: launchpadIcon,
    safari: safariIcon,
    settings: settingsIcon,
    trash: trashIcon,
    apple: appleLogo,
    portfolio: portfolioIcon,
    folder: filesIcon,
    maps: mapsIcon,
    messages: messagesIcon,
    notes: notesIcon,
    numbers: numbersIcon,
    pages: pagesIcon,
    calendar: calendarIcon,
    facetime: facetimeIcon,
    appletv: appleTVIcon,
    mail: mailIcon,
    photos: photosIcon,
    reminders: remindersIcon,
    contacts: contactsIcon,
    appstore: appstoreIcon,
    music: applemusicIcon,

    // Others still use high-res API/CDN until local files are provided
    terminal: 'https://s3.macosicons.com/macosicons/icons/pqhtMOGG97/iOSFile_6c12f9b5e1e8feb34f97208dbb68ca9c_pqhtMOGG97.png',

    // System Tray Icons matched to reference image
    stop: stopTray,
    airplay: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB4PSI1IiB5PSI1IiB3aWR0aD0iMTQiIGhlaWdodD0iMTAiIHJ4PSIyIi8+PHBhdGggZD0iTTEyIDE5bC00IDRoOHoiIGZpbGw9ImJsYWNrIi8+PC9zdmc+',
    nowPlaying: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjxwYXRoIGQ9Ik0xMCA4bDYgNHYtOHoiIGZpbGw9ImJsYWNrIi8+PC9zdmc+',
    wifi: wifiTray,
    battery: batteryTray,
    search: searchTray,
    controlCenter: controlCenterTray,
}
