import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Plus, Minus } from 'lucide-react'

const CANTEEN_ITEMS = {
    morning: [
        { name: 'Idli & Sambar', icon: '🍽️', count: 82, max: 150 },
        { name: 'Bread & Butter', icon: '🍞', count: 48, max: 100 },
        { name: 'Tea / Coffee', icon: '☕', count: 110, max: 150 },
        { name: 'Upma', icon: '🥣', count: 34, max: 100 },
    ],
    lunch: [
        { name: 'Rice Meals', icon: '🍛', count: 206, max: 300 },
        { name: 'Veg Biryani', icon: '🍲', count: 64, max: 150 },
        { name: 'Chapati Set', icon: '🫓', count: 42, max: 100 },
        { name: 'Curd Rice', icon: '🥗', count: 38, max: 100 },
    ]
}

export default function CanteenPage() {
    const { addToast } = useApp()
    const [orders, setOrders] = useState(CANTEEN_ITEMS)
    const [tab, setTab] = useState('morning')

    const adjust = (slot, idx, delta) => {
        setOrders(prev => {
            const updated = [...prev[slot]]
            updated[idx] = { ...updated[idx], count: Math.max(0, Math.min(updated[idx].max, updated[idx].count + delta)) }
            return { ...prev, [slot]: updated }
        })
    }

    const save = () => addToast('Canteen orders updated!', 'success')
    const items = orders[tab]
    const total = items.reduce((s, i) => s + i.count, 0)

    return (
        <div className="dashboard-body">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 22, fontWeight: 800, color: '#0A2463' }}>Canteen Management</h2>
                    <p style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>Today's orders — adjust counts and confirm</p>
                </div>
                <button className="btn btn-green" onClick={save}>💾 Save Orders</button>
            </div>

            {/* Tab */}
            <div style={{ display: 'flex', gap: 8 }}>
                {['morning', 'lunch'].map(t => (
                    <button key={t} className="btn"
                        style={{
                            background: tab === t ? '#1E50E2' : 'white', color: tab === t ? 'white' : '#475569',
                            border: '1.5px solid ' + (tab === t ? '#1E50E2' : '#E2E8F0'), textTransform: 'capitalize'
                        }}
                        onClick={() => setTab(t)}>
                        {t === 'morning' ? '☀️ Morning' : '🌤️ Lunch'}
                    </button>
                ))}
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 700, color: '#1E50E2' }}>
                    Total Orders: <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 22 }}>{total}</span>
                </div>
            </div>

            {/* Orders */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }}>
                {items.map((item, idx) => (
                    <div key={item.name} style={{ background: 'white', border: '1.5px solid #E2E8F0', borderRadius: 16, padding: 20 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                            <span style={{ fontSize: 32 }}>{item.icon}</span>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 700, fontSize: 15, color: '#0F172A' }}>{item.name}</div>
                                <div style={{ fontSize: 11, color: '#94A3B8' }}>Max capacity: {item.max}</div>
                            </div>
                            <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 32, fontWeight: 800, color: '#1E50E2' }}>{item.count}</div>
                        </div>
                        <div className="progress-bar" style={{ marginBottom: 16, height: 8 }}>
                            <div className="progress-fill" style={{
                                width: `${(item.count / item.max) * 100}%`,
                                background: item.count / item.max > .8 ? '#EF4444' : item.count / item.max > .5 ? '#F59E0B' : '#10B981'
                            }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <button onClick={() => adjust(tab, idx, -10)} className="btn btn-outline btn-sm"
                                style={{ width: 36, padding: 0, justifyContent: 'center' }}><Minus size={14} /></button>
                            <button onClick={() => adjust(tab, idx, -1)} className="btn btn-outline btn-sm"
                                style={{ width: 36, padding: 0, justifyContent: 'center' }}>–1</button>
                            <div style={{ flex: 1 }} />
                            <button onClick={() => adjust(tab, idx, 1)} className="btn btn-primary btn-sm"
                                style={{ width: 36, padding: 0, justifyContent: 'center' }}>+1</button>
                            <button onClick={() => adjust(tab, idx, 10)} className="btn btn-primary btn-sm"
                                style={{ width: 36, padding: 0, justifyContent: 'center' }}><Plus size={14} /></button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary row */}
            <div className="card" style={{ padding: 20 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#0A2463', marginBottom: 12 }}>📊 Order Summary</div>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    {[...orders.morning, ...orders.lunch].map(item => (
                        <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F8FAFC', padding: '8px 14px', borderRadius: 10, border: '1.5px solid #E2E8F0' }}>
                            <span>{item.icon}</span>
                            <span style={{ fontSize: 12, fontWeight: 600, color: '#334155' }}>{item.name}</span>
                            <span style={{ fontWeight: 800, color: '#1E50E2', fontSize: 14 }}>{item.count}</span>
                        </div>
                    ))}
                </div>
                <div style={{ marginTop: 12, fontSize: 13, color: '#64748B' }}>
                    Total meals today: <strong style={{ color: '#0A2463' }}>{[...orders.morning, ...orders.lunch].reduce((s, i) => s + i.count, 0)}</strong> servings
                </div>
            </div>
        </div>
    )
}
