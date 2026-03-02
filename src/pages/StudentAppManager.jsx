import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Send, Plus, Trash2, Video, Megaphone, Smartphone, ExternalLink, ShieldCheck } from 'lucide-react'

export default function StudentAppManager() {
    const { news, addNews, liveClasses, updateLiveClass, appConfig, setAppConfig, addToast } = useApp()
    const [newsForm, setNewsForm] = useState({ title: '', content: '', type: 'General', urgent: false })
    const [broadcast, setBroadcast] = useState(appConfig.studentAppBroadcast)

    const handleAddNews = (e) => {
        e.preventDefault()
        if (!newsForm.title || !newsForm.content) return addToast('Title and content are required', 'error')
        addNews(newsForm)
        setNewsForm({ title: '', content: '', type: 'General', urgent: false })
        addToast('News broadcasted to Student App!', 'success')
    }

    const updateBroadcast = () => {
        setAppConfig({ ...appConfig, studentAppBroadcast: broadcast })
        addToast('Broadcast message updated!', 'success')
    }

    return (
        <div className="dashboard-body">
            <div className="admin-ctrl-bar" style={{ background: 'linear-gradient(90deg, #6366F1, #8B5CF6)' }}>
                <Smartphone size={16} color="white" />
                <span className="admin-ctrl-label" style={{ color: 'white' }}>Student App Controller</span>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
                    <span className="tag tag-blue" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none' }}>Version 2.4.0</span>
                    <span className="tag tag-green" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none' }}>Live Sync: ON</span>
                </div>
            </div>

            <div className="two-col">
                {/* News Feed Manager */}
                <div className="card">
                    <div className="card-header">
                        <div style={{ fontWeight: 700, fontSize: 14, color: '#0A2463' }}>📢 News & Announcement Feed</div>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleAddNews} style={{ marginBottom: 20 }}>
                            <div style={{ display: 'grid', gap: 12 }}>
                                <input
                                    className="input"
                                    placeholder="Announcement Title"
                                    value={newsForm.title}
                                    onChange={e => setNewsForm({ ...newsForm, title: e.target.value })}
                                    style={{ width: '100%', padding: '10px', borderRadius: 8, border: '1.5px solid #E2E8F0' }}
                                />
                                <textarea
                                    className="input"
                                    placeholder="Content details..."
                                    rows="3"
                                    value={newsForm.content}
                                    onChange={e => setNewsForm({ ...newsForm, content: e.target.value })}
                                    style={{ width: '100%', padding: '10px', borderRadius: 8, border: '1.5px solid #E2E8F0', fontFamily: 'inherit' }}
                                />
                                <div style={{ display: 'flex', gap: 10 }}>
                                    <select
                                        className="input"
                                        value={newsForm.type}
                                        onChange={e => setNewsForm({ ...newsForm, type: e.target.value })}
                                        style={{ flex: 1, padding: '10px', borderRadius: 8, border: '1.5px solid #E2E8F0' }}
                                    >
                                        <option>General</option>
                                        <option>Academic</option>
                                        <option>Sports</option>
                                        <option>Event</option>
                                    </select>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                                        <input type="checkbox" checked={newsForm.urgent} onChange={e => setNewsForm({ ...newsForm, urgent: e.target.checked })} />
                                        Urgent
                                    </label>
                                    <button type="submit" className="btn btn-primary" style={{ padding: '0 24px' }}>
                                        <Send size={14} /> Post
                                    </button>
                                </div>
                            </div>
                        </form>

                        <div style={{ maxHeight: 300, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {news.map(n => (
                                <div key={n.id} style={{ padding: 12, background: '#F8FAFC', borderRadius: 10, border: '1px solid #E2E8F0' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                        <span className={`tag ${n.urgent ? 'tag-red' : 'tag-blue'}`} style={{ fontSize: 10 }}>{n.type}</span>
                                        <span style={{ fontSize: 10, color: '#94A3B8' }}>{n.date}</span>
                                    </div>
                                    <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{n.title}</div>
                                    <div style={{ fontSize: 11, color: '#64748B' }}>{n.content}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Live Classes & Broadcast */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div className="card">
                        <div className="card-header">
                            <div style={{ fontWeight: 700, fontSize: 14, color: '#0A2463' }}>📽️ Live Class Management</div>
                        </div>
                        <div className="card-body">
                            {liveClasses.map(c => (
                                <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid #F1F5F9' }}>
                                    <div style={{ width: 40, height: 40, borderRadius: 10, background: c.status === 'Live' ? '#FEE2E2' : '#E8EFFD', display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.status === 'Live' ? '#EF4444' : '#1E50E2' }}>
                                        <Video size={20} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 700, fontSize: 13 }}>{c.subject}</div>
                                        <div style={{ fontSize: 11, color: '#64748B' }}>{c.teacher} · {c.time}</div>
                                    </div>
                                    <select
                                        value={c.status}
                                        onChange={(e) => updateLiveClass(c.id, e.target.value)}
                                        style={{ fontSize: 11, padding: '4px 8px', borderRadius: 6, border: '1.5px solid #E2E8F0' }}
                                    >
                                        <option>Scheduled</option>
                                        <option>Live</option>
                                        <option>Ended</option>
                                    </select>
                                </div>
                            ))}
                            <button className="btn btn-outline btn-sm" style={{ width: '100%', marginTop: 12, justifyContent: 'center' }}>
                                <Plus size={14} /> Add Session
                            </button>
                        </div>
                    </div>

                    <div className="card" style={{ background: '#FFF7ED', border: '1.5px solid #FFEDD5' }}>
                        <div className="card-header">
                            <div style={{ fontWeight: 700, fontSize: 14, color: '#9A3412' }}>⚡ Instant App Broadcast</div>
                        </div>
                        <div className="card-body">
                            <p style={{ fontSize: 11, color: '#C2410C', marginBottom: 12 }}>This message appears as a ticker on all student home screens.</p>
                            <div style={{ display: 'flex', gap: 8 }}>
                                <input
                                    className="input"
                                    value={broadcast}
                                    onChange={e => setBroadcast(e.target.value)}
                                    style={{ flex: 1, padding: '10px', borderRadius: 8, border: '1.5px solid #FED7AA' }}
                                />
                                <button className="btn btn-primary" style={{ background: '#EA580C', border: 'none' }} onClick={updateBroadcast}>
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card" style={{ marginTop: 20 }}>
                <div className="card-header">
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#0A2463' }}>📱 App Preview & Connectivity</div>
                </div>
                <div className="card-body" style={{ display: 'flex', gap: 24 }}>
                    <div style={{ flex: 1, padding: 20, background: '#F8FAFC', borderRadius: 16, border: '1.5px solid #E2E8F0', textAlign: 'center' }}>
                        <Smartphone size={32} color="#64748B" style={{ marginBottom: 12 }} />
                        <div style={{ fontWeight: 700, fontSize: 15 }}>amalorpavam-student-app</div>
                        <div style={{ fontSize: 12, color: '#64748B', marginBottom: 16 }}>Last Sync: 2 minutes ago</div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                            <button className="btn btn-outline btn-sm"><ExternalLink size={12} /> Open App</button>
                            <button className="btn btn-outline btn-sm"><ShieldCheck size={12} /> Health Check</button>
                        </div>
                    </div>
                    <div style={{ flex: 2 }}>
                        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12 }}>Active App Tokens</div>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr><th>Device ID</th><th>Student</th><th>Last Active</th><th>Status</th></tr>
                                </thead>
                                <tbody>
                                    <tr><td>#AM-9921</td><td>Kavya Nair</td><td>Just now</td><td><span className="chip chip-green">Online</span></td></tr>
                                    <tr><td>#AM-4412</td><td>Rahul Verma</td><td>5m ago</td><td><span className="chip chip-green">Online</span></td></tr>
                                    <tr><td>#AM-0012</td><td>Aditi Rao</td><td>2h ago</td><td><span className="chip chip-amber">Idle</span></td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
