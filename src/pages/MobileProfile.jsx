import { useApp } from '../context/AppContext'
import { Settings, CreditCard, Shield, LogOut, ChevronRight } from 'lucide-react'

export default function MobileProfile() {
    const { addToast } = useApp()
    const student = { name: 'Kavya Nair', class: 'XII-A', roll: '04', email: 'kavya@amal.edu' }

    const menu = [
        { icon: CreditCard, label: 'Fee Payments', color: '#1E50E2' },
        { icon: Shield, label: 'Security & Privacy', color: '#10B981' },
        { icon: Settings, label: 'App Settings', color: '#64748B' }
    ]

    return (
        <div className="mobile-content">
            <div className="mobile-header">
                <div className="mobile-title">Profile</div>
            </div>

            <div className="mobile-card" style={{ textAlign: 'center', padding: 24 }}>
                <div
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: 50,
                        background: 'linear-gradient(135deg, #1E50E2, #4F83EE)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 28,
                        fontWeight: 800,
                        margin: '0 auto 16px',
                        border: '4px solid white',
                        boxShadow: '0 4px 12px rgba(30, 80, 226, 0.2)'
                    }}
                >
                    KN
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#0F172A' }}>{student.name}</div>
                <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>
                    Class {student.class} · Roll No. {student.roll}
                </div>
                <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>{student.email}</div>
            </div>

            <div className="mobile-card" style={{ padding: 0, overflow: 'hidden' }}>
                {menu.map((item, i) => (
                    <button
                        key={i}
                        onClick={() => addToast(`Opening ${item.label}...`, 'info')}
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            padding: '16px 20px',
                            background: 'none',
                            border: 'none',
                            borderBottom: i < menu.length - 1 ? '1px solid #F1F5F9' : 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <item.icon size={20} color={item.color} />
                        <span style={{ flex: 1, textAlign: 'left', fontWeight: 600, fontSize: 14 }}>{item.label}</span>
                        <ChevronRight size={16} color="#94A3B8" />
                    </button>
                ))}
            </div>

            <button
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    padding: 16,
                    background: '#FEE2E2',
                    color: '#DC2626',
                    border: 'none',
                    borderRadius: 14,
                    fontWeight: 700,
                    fontSize: 14,
                    marginTop: 8
                }}
                onClick={() => addToast('Signing out...', 'warning')}
            >
                <LogOut size={18} />
                Sign Out
            </button>

            <div style={{ textAlign: 'center', color: '#94A3B8', fontSize: 10, marginTop: 24 }}>
                Version 2.1.0 (Build 861f)
            </div>
        </div>
    )
}
