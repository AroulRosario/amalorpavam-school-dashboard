import { useApp } from '../context/AppContext'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'

const iconMap = {
    success: <CheckCircle size={16} color="#10B981" />,
    error: <XCircle size={16} color="#EF4444" />,
    warning: <AlertTriangle size={16} color="#F59E0B" />,
    info: <Info size={16} color="#1E50E2" />,
}

const bgMap = {
    success: '#F0FDF4',
    error: '#FEF2F2',
    warning: '#FFFBEB',
    info: '#EFF6FF',
}

const borderMap = {
    success: '#6EE7B7',
    error: '#FCA5A5',
    warning: '#FDE68A',
    info: '#BFDBFE',
}

export default function Toast() {
    const { toasts, setToasts } = useApp()

    return (
        <div style={{
            position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
            display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 360,
        }}>
            {toasts.map(t => (
                <div key={t.id} style={{
                    background: bgMap[t.type] || bgMap.success,
                    border: `1.5px solid ${borderMap[t.type] || borderMap.success}`,
                    borderRadius: 12, padding: '12px 14px',
                    display: 'flex', alignItems: 'center', gap: 10,
                    boxShadow: '0 8px 24px rgba(0,0,0,.12)',
                    animation: 'slideInRight .3s cubic-bezier(.4,0,.2,1)',
                    minWidth: 260,
                }}>
                    {iconMap[t.type]}
                    <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: '#1e293b' }}>{t.message}</span>
                    <button onClick={() => { }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 2 }}>
                        <X size={14} />
                    </button>
                </div>
            ))}
            <style>{`
        @keyframes slideInRight {
          from { opacity:0; transform: translateX(40px); }
          to   { opacity:1; transform: translateX(0); }
        }
      `}</style>
        </div>
    )
}
