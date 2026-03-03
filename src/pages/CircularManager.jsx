import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Bell, Plus, Trash2, Send, Filter, Calendar as CalIcon, Users, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CircularManager() {
    const { circulars, addCircular, deleteCircular, addToast } = useApp()
    const [showAdd, setShowAdd] = useState(false)
    const [form, setForm] = useState({ title: '', category: 'General', content: '', target: 'All' })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!form.title || !form.content) return
        addCircular({ ...form, date: new Date().toISOString().split('T')[0] })
        addToast('Circular published successfully!', 'success')
        setShowAdd(false)
        setForm({ title: '', category: 'General', content: '', target: 'All' })
    }

    return (
        <div className="dashboard-body">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 800, color: '#0A2463', margin: 0 }}>Circular Distribution</h2>
                    <p style={{ color: '#64748B', fontSize: 14, marginTop: 4 }}>Broadcast announcements and official notices</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
                    <Plus size={18} /> New Circular
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: 24 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {circulars.map((c, i) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            key={c.id}
                            className="card"
                            style={{ padding: 24 }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                                        <span style={{ fontSize: 10, fontWeight: 900, background: '#E8EFFD', color: '#1034A6', padding: '4px 12px', borderRadius: 20, textTransform: 'uppercase' }}>{c.category}</span>
                                        <span style={{ fontSize: 10, fontWeight: 900, background: '#F1F5F9', color: '#64748B', padding: '4px 12px', borderRadius: 20, textTransform: 'uppercase' }}>To: {c.target}</span>
                                    </div>
                                    <h3 style={{ margin: '0 0 8px', fontSize: 18, color: '#0A2463' }}>{c.title}</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 13, color: '#64748B', marginBottom: 16 }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><CalIcon size={14} /> {c.date}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Users size={14} /> Sent to {c.target === 'All' ? '540' : '280'} recipients</span>
                                    </div>
                                    <p style={{ margin: 0, fontSize: 14, color: '#334155', lineHeight: 1.6 }}>{c.content}</p>
                                </div>
                                <button
                                    onClick={() => { if (confirm('Delete circular?')) deleteCircular(c.id) }}
                                    style={{ background: '#FEE2E2', color: '#EF4444', border: 'none', width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                    {circulars.length === 0 && (
                        <div style={{ padding: 60, textAlign: 'center', color: '#94A3B8' }}>
                            <Bell size={48} style={{ opacity: 0.2, marginBottom: 16 }} />
                            <p>No circulars published yet</p>
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    <div className="card" style={{ padding: 20 }}>
                        <h4 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 800, color: '#0A2463' }}>Distribution Stats</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: 13, color: '#64748B' }}>Total Sent</span>
                                <span style={{ fontWeight: 800 }}>1,240</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: 13, color: '#64748B' }}>Open Rate</span>
                                <span style={{ fontWeight: 800, color: '#10B981' }}>88%</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: 13, color: '#64748B' }}>Active Today</span>
                                <span style={{ fontWeight: 800 }}>4 Circulars</span>
                            </div>
                        </div>
                    </div>

                    <div className="card" style={{ padding: 20, background: 'linear-gradient(135deg, #1034A6, #1E50E2)', color: 'white' }}>
                        <h4 style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 800 }}>Broadcast Tip</h4>
                        <p style={{ margin: 0, fontSize: 13, opacity: 0.8, lineHeight: 1.5 }}>Setting the target to 'All' will send a push notification to both Student and Staff apps instantly.</p>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {showAdd && (
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(7, 24, 69, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="card"
                            style={{ width: 500, padding: 32 }}
                        >
                            <h2 style={{ margin: '0 0 24px', fontSize: 22, color: '#0A2463' }}>Create Circular</h2>
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: 12, fontWeight: 900, color: '#64748B', marginBottom: 8 }}>TITLE</label>
                                    <input
                                        className="form-input"
                                        placeholder="Enter circular title..."
                                        value={form.title}
                                        onChange={e => setForm({ ...form, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: 12, fontWeight: 900, color: '#64748B', marginBottom: 8 }}>CATEGORY</label>
                                        <select className="form-input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                                            <option>General</option>
                                            <option>Exam</option>
                                            <option>Event</option>
                                            <option>Holiday</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: 12, fontWeight: 900, color: '#64748B', marginBottom: 8 }}>TARGET AUDIENCE</label>
                                        <select className="form-input" value={form.target} onChange={e => setForm({ ...form, target: e.target.value })}>
                                            <option>All</option>
                                            <option>Students</option>
                                            <option>Staff</option>
                                            <option>Parents</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: 12, fontWeight: 900, color: '#64748B', marginBottom: 8 }}>CONTENT</label>
                                    <textarea
                                        className="form-input"
                                        style={{ height: 120, resize: 'none', padding: '12px 16px' }}
                                        placeholder="Type the message here..."
                                        value={form.content}
                                        onChange={e => setForm({ ...form, content: e.target.value })}
                                        required
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                                    <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowAdd(false)}>Cancel</button>
                                    <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                                        <Send size={18} /> Publish Notice
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
