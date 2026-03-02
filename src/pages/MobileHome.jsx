import { useApp } from '../context/AppContext'
import { Bell, Trophy, BookOpen, Clock, Zap } from 'lucide-react'

export default function MobileHome() {
    const { students, homework, addToast } = useApp()
    const student = { name: 'Kavya Nair', class: 'XII-A', rank: '#1' }

    return (
        <div className="mobile-content">
            <div className="mobile-header">
                <div>
                    <div style={{ fontSize: 13, color: '#64748B' }}>Welcome back,</div>
                    <div className="mobile-title">{student.name} 👋</div>
                </div>
                <button className="header-btn" onClick={() => addToast('Notifications', 'info')}>
                    <Bell size={20} />
                    <div className="notif-dot" />
                </button>
            </div>

            {/* Quick Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                <div className="mobile-card" style={{ padding: 16, background: 'linear-gradient(135deg, #1E50E2, #4F83EE)', color: 'white' }}>
                    <div style={{ fontSize: 11, opacity: 0.8 }}>Current Rank</div>
                    <div style={{ fontSize: 24, fontWeight: 800 }}>{student.rank}</div>
                    <div style={{ fontSize: 10, marginTop: 4 }}>Top 1% of class</div>
                </div>
                <div className="mobile-card" style={{ padding: 16, background: 'linear-gradient(135deg, #10B981, #34D399)', color: 'white' }}>
                    <div style={{ fontSize: 11, opacity: 0.8 }}>Attendance</div>
                    <div style={{ fontSize: 24, fontWeight: 800 }}>98.4%</div>
                    <div style={{ fontSize: 10, marginTop: 4 }}>Excellent progress</div>
                </div>
            </div>

            {/* Homework Quick View */}
            <div className="mobile-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>✏️ Pending Tasks</div>
                    <span style={{ fontSize: 11, color: '#1E50E2', fontWeight: 600 }}>View all</span>
                </div>
                {homework.slice(0, 2).map(task => (
                    <div key={task.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid #F1F5F9' }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: task.done ? '#10B981' : '#1E50E2' }} />
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, fontWeight: 600 }}>{task.sub}</div>
                            <div style={{ fontSize: 11, color: '#64748B' }}>{task.topic}</div>
                        </div>
                        {!task.done && <span style={{ fontSize: 10, background: '#E8EFFD', color: '#1E50E2', padding: '2px 8px', borderRadius: 6, fontWeight: 700 }}>Due</span>}
                    </div>
                ))}
            </div>

            {/* Announcements */}
            <div className="mobile-card" style={{ background: '#F0F9FF', border: '1px solid #BAE6FD' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <Zap size={16} color="#0369A1" />
                    <span style={{ fontWeight: 700, fontSize: 13, color: '#0369A1' }}>Next Period</span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 800, color: '#0C4A6E' }}>Physics — Chapter 8</div>
                <div style={{ fontSize: 11, color: '#0369A1', marginTop: 4 }}>Starts in 15 minutes · Lab 2</div>
            </div>
        </div>
    )
}
