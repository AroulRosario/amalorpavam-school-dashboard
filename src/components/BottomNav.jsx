import { Home, BookOpen, Clock, User } from 'lucide-react'
import { useApp } from '../context/AppContext'

const navItems = [
    { id: 'mobile-home', icon: Home, label: 'Home' },
    { id: 'mobile-learning', icon: BookOpen, label: 'Learning' },
    { id: 'mobile-schedule', icon: Clock, label: 'Schedule' },
    { id: 'mobile-profile', icon: User, label: 'Profile' }
]

export default function BottomNav() {
    const { activePage, setActivePage } = useApp()

    return (
        <nav className="bottom-nav">
            {navItems.map((item) => (
                <button
                    key={item.id}
                    className={`bottom-nav-item ${activePage === item.id ? 'active' : ''}`}
                    onClick={() => setActivePage(item.id)}
                >
                    <item.icon className="nav-icon" size={24} />
                    <span>{item.label}</span>
                </button>
            ))}
        </nav>
    )
}
