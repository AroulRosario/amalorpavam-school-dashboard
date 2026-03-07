import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Calendar, Users, ClipboardCheck, Plus, X } from 'lucide-react'

export default function ExamAllotment() {
    const { exams, allotExam, teachers, classMappings, addToast } = useApp()
    const [showAllot, setShowAllot] = useState(false)
    const [expandedStd, setExpandedStd] = useState(null)
    const [expandedSec, setExpandedSec] = useState(null)

    const [formData, setFormData] = useState({
        title: '',
        class: '',
        subject: '',
        teacherId: '',
        date: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.title || !formData.teacherId || !formData.class) return
        allotExam(formData)
        addToast('Exam allotted successfully!', 'success')
        setShowAllot(false)
    }

    // Grouping Logic
    const groupedExams = {}
    exams.forEach(ex => {
        // e.g. "XII-A"
        const [std, sec] = ex.class.includes('-') ? ex.class.split('-') : [ex.class, 'General']
        if (!groupedExams[std]) groupedExams[std] = {}
        if (!groupedExams[std][sec]) groupedExams[std][sec] = []
        groupedExams[std][sec].push(ex)
    })

    return (
        <div className="dashboard-body">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                    <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 24, fontWeight: 800, color: '#0A2463', margin: 0 }}>Exam Allotment Console</h2>
                    <p style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>Manage and assign mark-entry responsibilities class-wise</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowAllot(true)}>
                    <Plus size={18} /> Assign New Exam
                </button>
            </header>

            {/* Hierarchical View */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {Object.keys(groupedExams).length === 0 && (
                    <div style={{ padding: 40, textAlign: 'center', background: 'white', borderRadius: 24, border: '1px dashed #CBD5E1' }}>
                        <div style={{ width: 64, height: 64, borderRadius: 20, background: '#F1F5F9', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <BookOpen size={32} color="#94A3B8" />
                        </div>
                        <h3 style={{ fontSize: 18, color: '#0F172A', margin: '0 0 8px' }}>No Exams Allotted</h3>
                        <p style={{ color: '#64748B', fontSize: 14, margin: 0 }}>Click Assign New Exam to start scheduling.</p>
                    </div>
                )}

                {Object.keys(groupedExams).sort().map(std => (
                    <div key={std} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                        {/* Standard Header */}
                        <div
                            style={{ padding: '20px 24px', background: expandedStd === std ? '#0A2463' : 'white', color: expandedStd === std ? 'white' : '#0A2463', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'all 0.3s ease' }}
                            onClick={() => setExpandedStd(expandedStd === std ? null : std)}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ width: 40, height: 40, borderRadius: 12, background: expandedStd === std ? 'rgba(255,255,255,0.1)' : '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 18 }}>
                                    {std}
                                </div>
                                <div>
                                    <div style={{ fontSize: 18, fontWeight: 800 }}>Standard {std}</div>
                                    <div style={{ fontSize: 13, opacity: 0.8 }}>{Object.keys(groupedExams[std]).length} Sections Active</div>
                                </div>
                            </div>
                            <div style={{ width: 32, height: 32, borderRadius: '50%', background: expandedStd === std ? 'rgba(255,255,255,0.2)' : '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {/* Plus/Minus Icon visual mock */}
                                <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1 }}>{expandedStd === std ? '-' : '+'}</div>
                            </div>
                        </div>

                        {/* Sections Container */}
                        <AnimatePresence>
                            {expandedStd === std && (
                                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} style={{ overflow: 'hidden' }}>
                                    <div style={{ padding: 24, background: '#F8FAFC', display: 'flex', flexDirection: 'column', gap: 16 }}>
                                        {Object.keys(groupedExams[std]).sort().map(sec => (
                                            <div key={sec} style={{ background: 'white', borderRadius: 16, border: '1px solid #E2E8F0', overflow: 'hidden' }}>

                                                <div
                                                    style={{ padding: '16px 20px', borderBottom: expandedSec === `${std}-${sec}` ? '1px solid #F1F5F9' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                                                    onClick={() => setExpandedSec(expandedSec === `${std}-${sec}` ? null : `${std}-${sec}`)}
                                                >
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                        <div style={{ padding: '6px 12px', background: '#E8EFFD', color: '#1E50E2', borderRadius: 8, fontWeight: 800, fontSize: 14 }}>
                                                            Section {sec}
                                                        </div>
                                                        <div style={{ fontSize: 14, color: '#64748B', fontWeight: 600 }}>{groupedExams[std][sec].length} Exams Scheduled</div>
                                                    </div>
                                                </div>

                                                {/* Exams Grid */}
                                                <AnimatePresence>
                                                    {expandedSec === `${std}-${sec}` && (
                                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                                            <div style={{ padding: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                                                                {groupedExams[std][sec].map(exam => {
                                                                    const teacher = teachers.find(t => t.id === Number(exam.teacherId))
                                                                    return (
                                                                        <div key={exam.id} style={{ padding: 16, borderRadius: 12, border: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                                                                            <div style={{ fontWeight: 800, fontSize: 15, color: '#0F172A', marginBottom: 4 }}>{exam.title}</div>
                                                                            <div style={{ fontSize: 13, color: '#64748B', fontWeight: 600, marginBottom: 16 }}>{exam.subject}</div>

                                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#475569' }}>
                                                                                    <div style={{ padding: 6, background: '#D1FAE5', color: '#10B981', borderRadius: 6 }}><Users size={12} /></div>
                                                                                    <span>Evaluator: <strong>{teacher?.name || 'Unassigned'}</strong></span>
                                                                                </div>
                                                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#475569' }}>
                                                                                    <div style={{ padding: 6, background: '#FEF3C7', color: '#F59E0B', borderRadius: 6 }}><Calendar size={12} /></div>
                                                                                    <span>Date: <strong>{exam.date}</strong></span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>

                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>

            {/* Allotment Modal */}
            <AnimatePresence>
                {showAllot && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-overlay">
                        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="modal-content" style={{ maxWidth: 500 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: 20, color: '#0A2463' }}>Assign Exam</h3>
                                    <p style={{ margin: '4px 0 0', fontSize: 13, color: '#64748B' }}>Schedule evaluation duties for staff</p>
                                </div>
                                <button onClick={() => setShowAllot(false)} style={{ background: '#F1F5F9', border: 'none', width: 32, height: 32, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={16} /></button>
                            </div>

                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: 12, fontWeight: 800, color: '#475569', marginBottom: 6 }}>EXAM TITLE</label>
                                    <input className="form-input" placeholder="e.g., Mid-Term Assessment" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: 12, fontWeight: 800, color: '#475569', marginBottom: 6 }}>TARGET CLASS</label>
                                        <select className="form-input" value={formData.class} onChange={e => setFormData({ ...formData, class: e.target.value })}>
                                            <option value="">Select Class...</option>
                                            {classMappings.map(m => <option key={m.id} value={m.class}>{m.class}</option>)}
                                            {classMappings.length === 0 && <option disabled>No classes configured in Manager</option>}
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: 12, fontWeight: 800, color: '#475569', marginBottom: 6 }}>SUBJECT</label>
                                        <input className="form-input" placeholder="e.g., Biology" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: 12, fontWeight: 800, color: '#475569', marginBottom: 6 }}>EVALUATING TEACHER</label>
                                    <select className="form-input" value={formData.teacherId} onChange={e => setFormData({ ...formData, teacherId: e.target.value })}>
                                        <option value="">Select Teacher...</option>
                                        {teachers.filter(t => t.active).map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: 12, fontWeight: 800, color: '#475569', marginBottom: 6 }}>EXAM DATE</label>
                                    <input type="date" className="form-input" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                                </div>

                                <div style={{ background: '#F8FAFC', padding: 16, marginTop: 8, borderRadius: 16, border: '1px solid #E2E8F0', display: 'flex', gap: 12 }}>
                                    <ClipboardCheck size={20} color="#1E50E2" style={{ flexShrink: 0 }} />
                                    <div style={{ fontSize: 12, color: '#64748B', lineHeight: 1.5 }}>
                                        Assigned teachers will instantly see this exam in their portal and receive permissions to enter marks once the date passes.
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-primary" style={{ padding: 16, fontSize: 15, width: '100%', justifyContent: 'center' }}>
                                    Confirmed Allotment
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
