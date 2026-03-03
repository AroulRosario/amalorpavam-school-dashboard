import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Plus, Trash2, Calendar, BookOpen, Clock, CheckCircle, AlertCircle, Users, ChevronDown } from 'lucide-react'

export default function HomeworkAdmin() {
    const { homework, addHomework, deleteHomework, students, teachers, addToast } = useApp()
    const [showAdd, setShowAdd] = useState(false)
    const [newHw, setNewHw] = useState({ sub: 'Mathematics', topic: '', deadline: '', desc: '', class: 'XII-A', teacherId: '', assignedTo: [] })
    const [showStudentPicker, setShowStudentPicker] = useState(false)

    const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Computer Science', 'Tamil', 'Hindi', 'Social Science']
    const classes = ['LKG-A', 'UKG-A', ...Array.from({ length: 12 }, (_, i) => `${i + 1}-A`), 'XII-A', 'XI-B', 'X-A']

    const classStudents = students.filter(s => s.class === newHw.class)

    const toggleStudent = (id) => {
        setNewHw(prev => ({
            ...prev,
            assignedTo: prev.assignedTo.includes(id) ? prev.assignedTo.filter(x => x !== id) : [...prev.assignedTo, id]
        }))
    }

    const selectAll = () => setNewHw(prev => ({ ...prev, assignedTo: classStudents.map(s => s.id) }))
    const deselectAll = () => setNewHw(prev => ({ ...prev, assignedTo: [] }))

    const handleAdd = (e) => {
        e.preventDefault()
        if (!newHw.topic || !newHw.deadline) { addToast('Please fill Topic and Deadline', 'error'); return }
        if (newHw.assignedTo.length === 0) { addToast('Please select at least one student', 'error'); return }
        addHomework(newHw)
        setNewHw({ sub: 'Mathematics', topic: '', deadline: '', desc: '', class: 'XII-A', teacherId: '', assignedTo: [] })
        setShowAdd(false)
        addToast(`Homework assigned to ${newHw.assignedTo.length} student(s)!`, 'success')
    }

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                    <h2 style={{ fontSize: 24, fontWeight: 900, color: '#0A2463', margin: 0 }}>Homework Manager</h2>
                    <p style={{ fontSize: 13, color: '#64748B', margin: '4px 0 0' }}>Assign homework to individual students</p>
                </div>
                <button onClick={() => setShowAdd(!showAdd)} className="btn btn-primary" style={{ gap: 8, display: 'flex', alignItems: 'center' }}>
                    <Plus size={18} /> {showAdd ? 'Close' : 'Assign Homework'}
                </button>
            </div>

            {showAdd && (
                <div className="card" style={{ marginBottom: 24, padding: 24, animation: 'fadeIn 0.3s ease' }}>
                    <form onSubmit={handleAdd} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <label style={{ fontSize: 11, fontWeight: 800, color: '#64748B' }}>SUBJECT</label>
                            <select className="input-premium" style={{ padding: '10px 14px' }} value={newHw.sub} onChange={e => setNewHw({ ...newHw, sub: e.target.value })}>
                                {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <label style={{ fontSize: 11, fontWeight: 800, color: '#64748B' }}>DEADLINE</label>
                            <input className="input-premium" type="text" placeholder="Mar 05" value={newHw.deadline} onChange={e => setNewHw({ ...newHw, deadline: e.target.value })} style={{ padding: '10px 14px' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <label style={{ fontSize: 11, fontWeight: 800, color: '#64748B' }}>CLASS</label>
                            <select className="input-premium" style={{ padding: '10px 14px' }} value={newHw.class} onChange={e => setNewHw({ ...newHw, class: e.target.value, assignedTo: [] })}>
                                {[...new Set([...classes, ...students.map(s => s.class)])].sort().map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <label style={{ fontSize: 11, fontWeight: 800, color: '#64748B' }}>ASSIGN TEACHER (OPTIONAL)</label>
                            <select className="input-premium" style={{ padding: '10px 14px' }} value={newHw.teacherId} onChange={e => setNewHw({ ...newHw, teacherId: e.target.value ? Number(e.target.value) : '' })}>
                                <option value="">— Admin Assigned —</option>
                                {teachers.filter(t => t.active).map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                            </select>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, gridColumn: 'span 2' }}>
                            <label style={{ fontSize: 11, fontWeight: 800, color: '#64748B' }}>TOPIC</label>
                            <input className="input-premium" placeholder="Exercise 4.2 - Statistics" value={newHw.topic} onChange={e => setNewHw({ ...newHw, topic: e.target.value })} style={{ padding: '10px 14px' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, gridColumn: 'span 2' }}>
                            <label style={{ fontSize: 11, fontWeight: 800, color: '#64748B' }}>DESCRIPTION</label>
                            <textarea className="input-premium" placeholder="Detailed instructions..." value={newHw.desc} onChange={e => setNewHw({ ...newHw, desc: e.target.value })} style={{ height: 80, padding: 14 }} />
                        </div>

                        {/* Student Picker */}
                        <div style={{ gridColumn: 'span 2' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                <label style={{ fontSize: 11, fontWeight: 800, color: '#64748B' }}>
                                    <Users size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                                    ASSIGN TO STUDENTS ({newHw.assignedTo.length} selected)
                                </label>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <button type="button" onClick={selectAll} style={{ fontSize: 11, fontWeight: 800, color: '#1034A6', background: 'none', border: 'none', cursor: 'pointer' }}>Select All</button>
                                    <button type="button" onClick={deselectAll} style={{ fontSize: 11, fontWeight: 800, color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer' }}>Clear</button>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', padding: 12, border: '1.5px solid #E2E8F0', borderRadius: 12, maxHeight: 160, overflowY: 'auto', background: '#FAFAFA' }}>
                                {classStudents.length === 0 ? (
                                    <div style={{ padding: 16, width: '100%', textAlign: 'center', color: '#94A3B8', fontSize: 13 }}>No students in class {newHw.class}</div>
                                ) : classStudents.map(s => (
                                    <button type="button" key={s.id} onClick={() => toggleStudent(s.id)} style={{
                                        padding: '6px 14px', borderRadius: 10, fontSize: 12, fontWeight: 700, border: '1.5px solid',
                                        borderColor: newHw.assignedTo.includes(s.id) ? '#1034A6' : '#E2E8F0',
                                        background: newHw.assignedTo.includes(s.id) ? '#E8EFFD' : 'white',
                                        color: newHw.assignedTo.includes(s.id) ? '#1034A6' : '#64748B',
                                        cursor: 'pointer', transition: 'all 0.15s'
                                    }}>
                                        {newHw.assignedTo.includes(s.id) ? '✓ ' : ''}{s.name} ({s.roll})
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                            <button type="button" onClick={() => setShowAdd(false)} className="btn btn-outline">Cancel</button>
                            <button type="submit" className="btn btn-primary shadow-blue">Assign Homework</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="card">
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Topic</th>
                                <th>Deadline</th>
                                <th>Assigned To</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {homework.map(h => (
                                <tr key={h.id}>
                                    <td><span className="chip chip-blue" style={{ fontWeight: 700 }}>{h.sub}</span></td>
                                    <td style={{ fontWeight: 800, color: '#0A2463' }}>{h.topic}</td>
                                    <td><div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 700 }}><Calendar size={14} color="#64748B" /> {h.deadline}</div></td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                                            {(h.assignedTo || []).length > 0 ? (
                                                (h.assignedTo || []).slice(0, 3).map(sid => {
                                                    const st = students.find(s => s.id === sid)
                                                    return st ? <span key={sid} style={{ fontSize: 10, fontWeight: 700, background: '#F1F5F9', padding: '2px 8px', borderRadius: 6 }}>{st.name.split(' ')[0]}</span> : null
                                                })
                                            ) : <span style={{ fontSize: 11, color: '#94A3B8' }}>All</span>}
                                            {(h.assignedTo || []).length > 3 && <span style={{ fontSize: 10, fontWeight: 800, color: '#1034A6' }}>+{h.assignedTo.length - 3}</span>}
                                        </div>
                                    </td>
                                    <td>
                                        <button onClick={() => deleteHomework(h.id)} style={{ border: 'none', background: 'none', color: '#EF4444', cursor: 'pointer', padding: 8 }}>
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
