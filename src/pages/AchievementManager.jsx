import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Award, Plus, Trash2, Search, Filter, Star, Trophy, Users, GraduationCap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AchievementManager() {
    const { achievements, addAchievement, deleteAchievement, addToast, students } = useApp()
    const [showAdd, setShowAdd] = useState(false)
    const [form, setForm] = useState({ studentName: '', award: '', date: '', desc: '' })
    const [searchTerm, setSearchTerm] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!form.studentName || !form.award) return
        addAchievement(form)
        addToast('Achievement recorded!', 'success')
        setShowAdd(false)
        setForm({ studentName: '', award: '', date: '', desc: '' })
    }

    const filtered = achievements.filter(a =>
        a.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.award.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="dashboard-body">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 800, color: '#0A2463', margin: 0 }}>Hall of Fame</h2>
                    <p style={{ color: '#64748B', fontSize: 14, marginTop: 4 }}>Record and showcase student & staff excellence</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
                    <Plus size={18} /> Add Achievement
                </button>
            </div>

            <div className="card" style={{ marginBottom: 24, padding: '16px 24px', display: 'flex', gap: 16, alignItems: 'center' }}>
                <Search size={18} color="#64748B" />
                <input
                    placeholder="Search by student name or award..."
                    style={{ flex: 1, border: 'none', background: 'none', outline: 'none', fontSize: 15 }}
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-outline btn-sm"><Filter size={14} /> Filter</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
                {filtered.map((a, i) => (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        key={a.id}
                        className="card"
                        style={{ padding: 24, position: 'relative', overflow: 'hidden' }}
                    >
                        <div style={{ position: 'absolute', top: -10, right: -10, opacity: 0.05 }}>
                            <Trophy size={100} color="#1E50E2" />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                            <div style={{ width: 48, height: 48, borderRadius: 14, background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Award size={24} color="#D97706" />
                            </div>
                            <button
                                onClick={() => { if (confirm('Remove achievement?')) deleteAchievement(a.id) }}
                                style={{ background: '#FEE2E2', color: '#EF4444', border: 'none', width: 28, height: 28, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>

                        <h3 style={{ margin: '0 0 4px', fontSize: 18, color: '#0A2463', fontWeight: 800 }}>{a.award}</h3>
                        <div style={{ color: '#1E50E2', fontWeight: 700, fontSize: 14, marginBottom: 12 }}>{a.studentName}</div>

                        <p style={{ margin: '0 0 16px', fontSize: 13, color: '#64748B', lineHeight: 1.5 }}>{a.desc}</p>

                        <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: 12, display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#94A3B8' }}>
                            <span style={{ fontWeight: 600 }}>Recorded on {a.date}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Star size={12} fill="#F59E0B" color="#F59E0B" /> Verified</span>
                        </div>
                    </motion.div>
                ))}
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
                            <h2 style={{ margin: '0 0 24px', fontSize: 22, color: '#0A2463' }}>New Achievement</h2>
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: 12, fontWeight: 900, color: '#64748B', marginBottom: 8 }}>STUDENT / STAFF NAME</label>
                                    <input
                                        className="form-input"
                                        placeholder="Enter name..."
                                        value={form.studentName}
                                        onChange={e => setForm({ ...form, studentName: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: 12, fontWeight: 900, color: '#64748B', marginBottom: 8 }}>AWARD / RECOGNITION</label>
                                    <input
                                        className="form-input"
                                        placeholder="e.g. Science Fair Gold Medal"
                                        value={form.award}
                                        onChange={e => setForm({ ...form, award: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: 12, fontWeight: 900, color: '#64748B', marginBottom: 8 }}>DATE</label>
                                    <input
                                        className="form-input"
                                        type="date"
                                        value={form.date}
                                        onChange={e => setForm({ ...form, date: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: 12, fontWeight: 900, color: '#64748B', marginBottom: 8 }}>DESCRIPTION</label>
                                    <textarea
                                        className="form-input"
                                        style={{ height: 100, resize: 'none' }}
                                        placeholder="Details about the achievement..."
                                        value={form.desc}
                                        onChange={e => setForm({ ...form, desc: e.target.value })}
                                        required
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                                    <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowAdd(false)}>Cancel</button>
                                    <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                                        Save Achievement
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
