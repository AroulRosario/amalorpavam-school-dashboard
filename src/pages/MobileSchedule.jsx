import { Clock, MapPin, User } from 'lucide-react'

export default function MobileSchedule() {
    const timetable = [
        { time: '08:00 AM', sub: 'Physics', teacher: 'Mr. Rajan S.', room: 'Lab 2', active: false },
        { time: '09:30 AM', sub: 'Mathematics', teacher: 'Ms. Anitha K.', room: 'Room 12', active: true },
        { time: '11:00 AM', sub: 'Chemistry', teacher: 'Ms. Priya M.', room: 'Lab 1', active: false },
        { time: '01:30 PM', sub: 'English', teacher: 'Ms. Leela V.', room: 'Room 8', active: false }
    ]

    return (
        <div className="mobile-content">
            <div className="mobile-header">
                <div className="mobile-title">Today's Schedule</div>
                <div style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>Mar 02, 2026</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {timetable.map((item, i) => (
                    <div
                        key={i}
                        className="mobile-card"
                        style={{
                            padding: 16,
                            borderLeft: item.active ? '4px solid #1E50E2' : '1px solid #F1F5F9',
                            background: item.active ? '#F0F7FF' : 'white'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: item.active ? '#1E50E2' : '#64748B' }}>
                                <Clock size={14} />
                                <span style={{ fontSize: 12, fontWeight: 700 }}>{item.time}</span>
                            </div>
                            {item.active && (
                                <span style={{ background: '#1E50E2', color: 'white', fontSize: 9, fontWeight: 800, padding: '2px 8px', borderRadius: 99, textTransform: 'uppercase' }}>Now</span>
                            )}
                        </div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>{item.sub}</div>
                        <div style={{ display: 'flex', gap: 12 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#64748B' }}>
                                <User size={12} />
                                {item.teacher}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#64748B' }}>
                                <MapPin size={12} />
                                {item.room}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mobile-card" style={{ marginTop: 8, background: '#F8FAFC' }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>Upcoming Exams</div>
                <div style={{ fontSize: 11, color: '#64748B' }}>Mid-Term Assessment starts on March 15th.</div>
            </div>
        </div>
    )
}
