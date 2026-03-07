import { useState, useRef } from 'react'
import { useApp } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Plus, X, Clock, User, BookOpen, ChevronDown, UploadCloud, Download, FileText } from 'lucide-react'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const DEFAULT_PERIODS = [
    '08:30 – 09:15', '09:15 – 10:00', '10:15 – 11:00',
    '11:00 – 11:45', '12:30 – 01:15', '01:15 – 02:00'
]

export default function TimetableManager() {
    const { timetable, addTimetableEntry, updateTimetableEntry, deleteTimetableEntry, teachers, classMappings, addToast } = useApp()
    const fileInputRef = useRef(null)

    const [selectedClass, setSelectedClass] = useState('XII-A')
    const [selectedDay, setSelectedDay] = useState('Monday')
    const [showAdd, setShowAdd] = useState(false)
    const [editPeriod, setEditPeriod] = useState(null)

    const entry = timetable.find(t => t.class === selectedClass && t.day === selectedDay)
    const periods = entry?.periods || []

    const [form, setForm] = useState({ time: DEFAULT_PERIODS[0], subject: '', teacherId: '' })

    // Auto-allot teacher when subject changes
    const handleSubjectChange = (val) => {
        const mapping = classMappings.find(m => m.class === selectedClass)
        const subMap = mapping?.subjects?.find(s => s.name.toLowerCase() === val.trim().toLowerCase())
        setForm({ ...form, subject: val, teacherId: subMap ? String(subMap.teacherId) : '' })
    }

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
        setForm({ time: DEFAULT_PERIODS[periods.length] || '02:00 – 02:45', subject: '', teacherId: '' })
    }

    const handleDeletePeriod = (idx) => {
        if (!entry) return
        const updated = periods.filter((_, i) => i !== idx)
        updateTimetableEntry(entry.id, { periods: updated })
        addToast('Period removed.', 'warning')
    }

    const handleCsvUpload = (e) => {
        const file = e.target.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = (evt) => {
            const lines = evt.target.result.split(/\r?\n/).filter(l => l.trim())
            let count = 0, errors = 0

            // Expected Format: Class,Day,Time,Subject
            for (let i = 1; i < lines.length; i++) {
                const parts = lines[i].split(',').map(s => s.replace(/["']/g, '').trim())
                if (parts.length >= 4) {
                    const cls = parts[0]
                    const day = parts[1]
                    const time = parts[2]
                    const sub = parts[3]

                    if (!DAYS.includes(day)) { errors++; continue }

                    // Find teacher for this subject in this class
                    const mapping = classMappings.find(m => m.class === cls)
                    const subMap = mapping?.subjects?.find(s => s.name.toLowerCase() === sub.toLowerCase())
                    const tId = subMap ? String(subMap.teacherId) : ''

                    const existing = timetable.find(t => t.class === cls && t.day === day)
                    const newPeriod = { time, subject: sub, teacherId: tId }

                    if (existing) {
                        const updated = [...existing.periods, newPeriod]
                        updateTimetableEntry(existing.id, { periods: updated })
                    } else {
                        addTimetableEntry({ class: cls, day, periods: [newPeriod] })
                    }
                    count++
                } else { errors++; }
            }
            addToast(`Timetable CSV: ${count} entries processed.`, 'success')
        }
        reader.readAsText(file)
        e.target.value = ''
    }

    return (
        <div className="dashboard-body">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                <div>
                    <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 24, fontWeight: 800, color: '#0A2463', margin: 0 }}>Timetable Console</h2>
                    <p style={{ fontSize: 14, color: '#64748B', margin: '4px 0 0' }}>Manage daily class schedules and auto-map teachers from subject assignments.</p>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <input type="file" accept=".csv" ref={fileInputRef} style={{ display: 'none' }} onChange={handleCsvUpload} />
                    <button className="btn btn-outline" onClick={() => fileInputRef.current?.click()} style={{ background: 'white' }}>
                        <UploadCloud size={18} /> Bulk Import CSV
                    </button>
                    <button className="btn btn-primary" onClick={() => { setEditPeriod(null); setForm({ time: DEFAULT_PERIODS[periods.length] || '02:00 – 02:45', subject: '', teacherId: '' }); setShowAdd(true) }}>
                        <Plus size={18} /> Add Period
                    </button>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 320px) 1fr', gap: 24 }}>
                {/* Selectors Card */}
                <div className="card" style={{ alignSelf: 'start', padding: 24 }}>
                    <div style={{ marginBottom: 24 }}>
                        <label style={{ fontSize: 12, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>Select Class</label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                            {classMappings.map(m => (
                                <button key={m.id} onClick={() => setSelectedClass(m.class)} style={{
                                    padding: '10px', borderRadius: 10, border: '2px solid',
                                    borderColor: selectedClass === m.class ? '#1E50E2' : '#F1F5F9',
                                    background: selectedClass === m.class ? '#E8EFFD' : 'white',
                                    color: selectedClass === m.class ? '#1E50E2' : '#475569',
                                    fontWeight: 800, fontSize: 13, cursor: 'pointer', transition: '0.2s'
                                }}>{m.class}</button>
                            ))}
                            {classMappings.length === 0 && <div style={{ gridColumn: 'span 2', fontSize: 12, color: '#94A3B8' }}>No classes mapped yet.</div>}
                        </div>
                    </div>

                    <div style={{ marginBottom: 24 }}>
                        <label style={{ fontSize: 12, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>Select Day</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            {DAYS.map(d => (
                                <button key={d} onClick={() => setSelectedDay(d)} style={{
                                    textAlign: 'left', padding: '12px 16px', borderRadius: 10, border: 'none',
                                    background: selectedDay === d ? '#0A2463' : 'transparent',
                                    color: selectedDay === d ? 'white' : '#64748B',
                                    fontWeight: 700, fontSize: 13, cursor: 'pointer', transition: '0.2s'
                                }}>{d}</button>
                            ))}
                        </div>
                    </div>

                    <button className="btn btn-outline btn-sm" style={{ width: '100%', justifyContent: 'center' }}
                        onClick={() => {
                            const csv = "Class,Day,Time,Subject\nXII-A,Monday,08:30 – 09:15,Mathematics\nXII-A,Monday,09:15 – 10:00,Physics\nXII-A,Tuesday,08:30 – 09:15,Chemistry"
                            const blob = new Blob([csv], { type: 'text/csv' })
                            const url = URL.createObjectURL(blob)
                            const a = document.createElement('a'); a.href = url; a.download = 'timetable_template.csv'; a.click()
                        }}>
                        <Download size={14} /> Template
                    </button>
                </div>

                {/* Timetable View */}
                <div className="card" style={{ minHeight: 400 }}>
                    <div className="card-header" style={{ padding: '20px 24px', borderBottom: '2px solid #F1F5F9' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 32, height: 32, borderRadius: 10, background: '#E8EFFD', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Calendar size={18} color="#1E50E2" />
                            </div>
                            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: '#0A2463' }}>{selectedClass} schedule for {selectedDay}</h3>
                        </div>
                    </div>

                    {periods.length === 0 ? (
                        <div style={{ padding: 80, textAlign: 'center', color: '#94A3B8' }}>
                            <FileText size={48} style={{ opacity: 0.1, margin: '0 auto 16px' }} />
                            <div style={{ fontSize: 18, fontWeight: 800 }}>No Schedule Defined</div>
                            <p style={{ fontSize: 14 }}>Create the schedule manually or import via CSV.</p>
                        </div>
                    ) : (
                        <div style={{ padding: 24 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {periods.map((p, i) => {
                                    const teacher = teachers.find(t => t.id === Number(p.teacherId))
                                    return (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: 18, border: '2px solid #F1F5F9', borderRadius: 16, background: 'white' }}>
                                            <div style={{ width: 40, height: 40, borderRadius: 12, background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 900, color: '#1034A6', border: '1px solid #E2E8F0' }}>{i + 1}</div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                                    <Clock size={14} color="#64748B" />
                                                    <span style={{ fontSize: 13, fontWeight: 800, color: '#64748B' }}>{p.time}</span>
                                                </div>
                                                <div style={{ fontSize: 16, fontWeight: 900, color: '#0A2463' }}>{p.subject}</div>
                                            </div>
                                            <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: 20 }}>
                                                <div style={{ textAlign: 'right' }}>
                                                    <div style={{ fontSize: 13, fontWeight: 800, color: '#0F172A' }}>{teacher?.name || '—'}</div>
                                                    <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>{teacher ? 'Assigned' : 'Unassigned'}</div>
                                                </div>
                                                <div style={{ display: 'flex', gap: 8 }}>
                                                    <button onClick={() => { setEditPeriod(i); setForm(p); setShowAdd(true) }} style={{ height: 34, width: 34, borderRadius: 10, border: 'none', background: '#F1F5F9', color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={14} /></button>
                                                    <button onClick={() => handleDeletePeriod(i)} style={{ height: 34, width: 34, borderRadius: 10, border: 'none', background: '#FEE2E2', color: '#EF4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Trash2 size={14} /></button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {showAdd && (
                    <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card" style={{ width: 400, padding: 32 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900 }}>{editPeriod !== null ? 'Edit Period' : 'Add New Period'}</h3>
                                <button onClick={() => setShowAdd(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                                <div>
                                    <label style={{ fontSize: 12, fontWeight: 800, color: '#64748B', display: 'block', marginBottom: 6 }}>TIME SLOT</label>
                                    <select className="form-input" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })}>
                                        {DEFAULT_PERIODS.map(t => <option key={t} value={t}>{t}</option>)}
                                        <option value="02:00 – 02:45">02:00 – 02:45</option>
                                        <option value="02:45 – 03:30">02:45 – 03:30</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ fontSize: 12, fontWeight: 800, color: '#64748B', display: 'block', marginBottom: 6 }}>SUBJECT</label>
                                    <input className="form-input" placeholder="e.g. Mathematics" value={form.subject} onChange={e => handleSubjectChange(e.target.value)} />
                                    <p style={{ fontSize: 10, color: '#94A3B8', marginTop: 4 }}>Teacher will be auto-allotted based on assignment.</p>
                                </div>
                                <div>
                                    <label style={{ fontSize: 12, fontWeight: 800, color: '#64748B', display: 'block', marginBottom: 6 }}>TEACHER</label>
                                    <select className="form-input" value={form.teacherId} onChange={e => setForm({ ...form, teacherId: e.target.value })}>
                                        <option value="">— Select Teacher —</option>
                                        {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                    </select>
                                </div>
                                <button className="btn btn-primary" style={{ marginTop: 8, height: 48, justifyContent: 'center' }} onClick={handleSavePeriod}>
                                    {editPeriod !== null ? 'Update Schedule' : 'Allot Period'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}

function Trash2(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6" /></svg>
    )
}
