import { useApp } from '../context/AppContext'
import { Play, FileText, Zap, Bot, Search } from 'lucide-react'

export default function MobileLearning() {
    const { addToast } = useApp()

    const resources = [
        { icon: Play, label: 'Video Lectures', color: '#EF4444', count: 24, bg: '#FEE2E2' },
        { icon: FileText, label: 'Subject Notes', color: '#1E50E2', count: 18, bg: '#E8EFFD' },
        { icon: Zap, label: 'Flashcards', color: '#F59E0B', count: 150, bg: '#FEF3C7' },
        { icon: Bot, label: 'AI Tutor', color: '#8B5CF6', count: 'Online', bg: '#EDE9FE' }
    ]

    return (
        <div className="mobile-content">
            <div className="mobile-header">
                <div className="mobile-title">Learning Center</div>
            </div>

            <div className="header-search" style={{ marginBottom: 20 }}>
                <Search size={16} color="#64748B" />
                <input placeholder="Search subjects, topics..." style={{ width: '100%' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                {resources.map((item, i) => (
                    <div
                        key={i}
                        className="mobile-card"
                        style={{ textAlign: 'center', cursor: 'pointer' }}
                        onClick={() => addToast(`Opening ${item.label}...`, 'info')}
                    >
                        <div
                            style={{
                                width: 48,
                                height: 48,
                                borderRadius: 14,
                                background: item.bg,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 12px',
                                color: item.color
                            }}
                        >
                            <item.icon size={24} />
                        </div>
                        <div style={{ fontWeight: 700, fontSize: 13 }}>{item.label}</div>
                        <div style={{ fontSize: 10, color: '#64748B', marginTop: 4 }}>{item.count} items</div>
                    </div>
                ))}
            </div>

            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Recently Viewed</div>
            <div className="mobile-card" style={{ padding: 12 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 8, background: '#E8EFFD', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>📄</div>
                    <div>
                        <div style={{ fontSize: 13, fontWeight: 700 }}>Integration Techniques.pdf</div>
                        <div style={{ fontSize: 11, color: '#64748B' }}>Mathematics · 2 days ago</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
