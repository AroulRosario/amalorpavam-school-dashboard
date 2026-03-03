import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Plus, X, Clock, User, BookOpen, ChevronDown } from 'lucide-react'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const CLASSES = ['LKG', 'UKG', ...Array.from({ length: 12 }, (_, i) => `${i + 1}`)]
const CLASS_SECTIONS = []
CLASSES.forEach(c => { ['A', 'B'].forEach(s => CLASS_SECTIONS.push(`${c}-${s}`)) })
// Also allow plain class names
CLASSES.forEach(c => CLASS_SECTIONS.push(c))

const DEFAULT_PERIODS = [
    '08:30 – 09:15', '09:15 – 10:00', '10:15 – 11:00',
    '11:00 – 11:45', '12:30 – 01:15', '01:15 – 02:00'
]

export default function TimetableManager() {
    const { timetable, addTimetableEntry, updateTimetableEntry, deleteTimetableEntry, teachers, addToast } = useApp()
    const [selectedClass, setSelectedClass] = useState('XII-A')
    const [selectedDay, setSelectedDay] = useState('Monday')
    const [showAdd, setShowAdd] = useState(false)
    const [editPeriod, setEditPeriod] = useState(null)

    const entry = timetable.find(t => t.class === selectedClass && t.day === selectedDay)
    const periods = entry?.periods || []

    const [form, setForm] = useState({ time: DEFAULT_PERIODS[0], subject: '', teacherId: '' })

    const handleSavePeriod = () => {
        if (!form.subject) return
        if (entry) {
            const updated = editPeriod !== null
                ? periods.map((p, i) => i === editPeriod ? form : p)
                : [...periods, form]
            updateTimetableEntry(entry.id, { periods: updated })
        } else {
            addTimetableEntry({ class: selectedClass, day: selectedDay, periods: [form] })
        }
        addToast(editPeriod !== null ? 'Period updated!' : 'Period added!', 'success')
        setShowAdd(false)
        setEditPeriod(null)
        setForm({ time: DEFAULT_PERIODS[0], subject: '', teacherId: '' })
    }

    const handleDeletePeriod = (idx) => {
        if (!entry) return
        const updated = periods.filter((_, i) => i !== idx)
        updateTimetableEntry(entry.id, { periods: updated })
        addToast('Period removed.', 'warning')
    }

    return (
        <div className="dashboard-body">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                    <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 24, fontWeight: 800, color: '#0A2463', margin: 0 }}>Timetable Manager</h2>
                    <p style={{ fontSize: 14, color: '#64748B', margin: '4px 0 0' }}>Create and manage class schedules (LKG–12) · Assign teachers to periods</p>
                </div>
                <button className="btn btn-primary" onClick={() => { setEditPeriod(null); setForm({ time: DEFAULT_PERIODS[periods.length] || '02:00 – 02:45', subject: '', teacherId: '' }); setShowAdd(true) }}>
                    <Plus size={18} /> Add Period
                </button>
            </header>

            {/* Class + Day Selectors */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
                <div style={{ position: 'relative' }}>
                    <label style={{ fontSize: 11, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Class</label>
                    <select className="form-input" style={{ minWidth: 140 }} value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
                        {[...new Set([...CLASS_SECTIONS, ...timetable.map(t => t.class)])].sort().map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div>
                    <label style={{ fontSize: 11, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Day</label>
                    <div style={{ display: 'flex', gap: 4 }}>
                        {DAYS.map(d => (
                            <button key={d} onClick={() => setSelectedDay(d)} className="btn btn-sm" style={{
                                background: selectedDay === d ? '#1034A6' : '#F1F5F9',
                                color: selectedDay === d ? 'white' : '#64748B',
                                border: 'none', borderRadius: 8, padding: '8px 14px', fontWeight: 700, fontSize: 12, cursor: 'pointer'
                            }}>{d.slice(0, 3)}</button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Period Grid */}
            <div className="card" style={{ overflow: 'hidden' }}>
                <div className="card-header" style={{ borderBottom: '2px solid #F1F5F9' }}>
                    <div style={{ fontWeight: 800, fontSize: 16, color: '#0A2463' }}>
                        <Calendar size={18} style={{ verticalAlign: 'middle', marginRight: 8 }} />
                        {selectedClass} — {selectedDay}
                    </div>
                    <span style={{ fontSize: 12, color: '#64748B' }}>{periods.length} periods</span>
                </div>

                {periods.length === 0 ? (
                    <div style={{ padding: 48, textAlign: 'center', color: '#94A3B8' }}>
                        <Calendar size={48} style={{ marginBottom: 16, opacity: 0.3 }} />
                        <div style={{ fontWeight: 700 }}>No periods scheduled</div>
                        <div style={{ fontSize: 13, marginTop: 4 }}>Click "Add Period" to create the schedule for this day.</div>
                    </div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#F8FAFC' }}>
                                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Period</th>
                                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Time</th>
                                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Subject</th>
                                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Teacher</th>
                                <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: 11, fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {periods.map((p, i) => {
                                const teacher = teachers.find(t => t.id === Number(p.teacherId))
                                return (
                                    <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                                        <td style={{ padding: '16px', fontWeight: 800, color: '#1034A6' }}>{i + 1}</td>
                                        <td style={{ padding: '16px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <Clock size={14} color="#64748B" />
                                                <span style={{ fontWeight: 600, fontSize: 13 }}>{p.time}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '16px' }}>
                                            <span style={{ fontWeight: 800, background: '#E8EFFD', color: '#1034A6', padding: '4px 12px', borderRadius: 8, fontSize: 13 }}>{p.subject}</span>
                                        </td>
                                        <td style={{ padding: '16px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <User size={14} color="#64748B" />
                                                <span style={{ fontWeight: 600, fontSize: 13 }}>{teacher?.name || '—'}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '16px', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                                                <button className="btn btn-outline btn-sm" onClick={() => { setEditPeriod(i); setForm(p); setShowAdd(true) }}>Edit</button>
                                                <button className="btn btn-sm" style={{ background: '#FEE2E2', color: '#EF4444', border: 'none' }} onClick={() => handleDeletePeriod(i)}>Del</button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {showAdd && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-overlay">
                        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="modal-content" style={{ maxWidth: 420 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                                <h3 style={{ margin: 0 }}>{editPeriod !== null ? 'Edit Period' : 'Add Period'}</h3>
                                <button onClick={() => { setShowAdd(false); setEditPeriod(null) }} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Time Slot</label>
                                    <select className="form-input" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })}>
                                        {DEFAULT_PERIODS.map(t => <option key={t} value={t}>{t}</option>)}
                                        <option value="02:00 – 02:45">02:00 – 02:45</option>
                                        <option value="02:45 – 03:30">02:45 – 03:30</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Subject</label>
                                    <input className="form-input" placeholder="e.g. Mathematics" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Assign Teacher</label>
                                    <select className="form-input" value={form.teacherId} onChange={e => setForm({ ...form, teacherId: e.target.value })}>
                                        <option value="">— No Teacher —</option>
                                        {teachers.filter(t => t.active).map(t => <option key={t.id} value={t.id}>{t.name} ({t.subjects.join(', ')})</option>)}
                                    </select>
                                </div>
                                <button className="btn btn-primary" style={{ marginTop: 8 }} onClick={handleSavePeriod}>
                                    {editPeriod !== null ? 'Update Period' : 'Save Period'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
