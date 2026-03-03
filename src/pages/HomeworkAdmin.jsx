import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Plus, Trash2, Calendar, BookOpen, Clock, CheckCircle, AlertCircle } from 'lucide-react'

export default function HomeworkAdmin() {
    const { homework, addHomework, deleteHomework, addToast } = useApp()
    const [showAdd, setShowAdd] = useState(false)
    const [newHw, setNewHw] = useState({ sub: 'Mathematics', topic: '', deadline: '', desc: '' })

    const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Computer Science']

    const handleAdd = (e) => {
        e.preventDefault()
        if (!newHw.topic || !newHw.deadline) {
            addToast('Please fill in Topic and Deadline', 'error')
            return
        }
        addHomework(newHw)
        setNewHw({ sub: 'Mathematics', topic: '', deadline: '', desc: '' })
        setShowAdd(false)
        addToast('Homework assigned successfully!', 'success')
    }

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                    <h2 style={{ fontSize: 24, fontWeight: 900, color: '#0A2463', margin: 0 }}>Homework Manager</h2>
                    <p style={{ fontSize: 13, color: '#64748B', margin: '4px 0 0' }}>Assign and track tasks for all students</p>
                </div>
                <button
                    onClick={() => setShowAdd(!showAdd)}
                    className="btn btn-primary"
                    style={{ gap: 8, display: 'flex', alignItems: 'center' }}
                >
                    <Plus size={18} /> {showAdd ? 'Close' : 'Assign Homework'}
                </button>
            </div>

            {showAdd && (
                <div className="card" style={{ marginBottom: 24, padding: 24, animation: 'fadeIn 0.3s ease' }}>
                    <form onSubmit={handleAdd} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <label style={{ fontSize: 11, fontWeight: 800, color: '#64748B' }}>SUBJECT</label>
                            <select
                                className="input-premium"
                                style={{ width: '100%', padding: '10px 14px' }}
                                value={newHw.sub}
                                onChange={e => setNewHw({ ...newHw, sub: e.target.value })}
                            >
                                {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <label style={{ fontSize: 11, fontWeight: 800, color: '#64748B' }}>DEADLINE (E.G. MAR 15)</label>
                            <input
                                className="input-premium"
                                type="text"
                                placeholder="Mar 05"
                                value={newHw.deadline}
                                onChange={e => setNewHw({ ...newHw, deadline: e.target.value })}
                                style={{ padding: '10px 14px' }}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, gridColumn: 'span 2' }}>
                            <label style={{ fontSize: 11, fontWeight: 800, color: '#64748B' }}>HOMEWORK TOPIC/TITLE</label>
                            <input
                                className="input-premium"
                                placeholder="Exercise 4.2 - Statistics"
                                value={newHw.topic}
                                onChange={e => setNewHw({ ...newHw, topic: e.target.value })}
                                style={{ padding: '10px 14px' }}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, gridColumn: 'span 2' }}>
                            <label style={{ fontSize: 11, fontWeight: 800, color: '#64748B' }}>DESCRIPTION / INSTRUCTIONS</label>
                            <textarea
                                className="input-premium"
                                placeholder="Detailed instructions for the students..."
                                value={newHw.desc}
                                onChange={e => setNewHw({ ...newHw, desc: e.target.value })}
                                style={{ height: 80, padding: 14 }}
                            />
                        </div>
                        <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                            <button type="button" onClick={() => setShowAdd(false)} className="btn btn-outline">Cancel</button>
                            <button type="submit" className="btn btn-primary shadow-blue">Broadcast Homework</button>
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
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {homework.map(h => (
                                <tr key={h.id}>
                                    <td><span className="chip chip-blue" style={{ fontWeight: 700 }}>{h.sub}</span></td>
                                    <td style={{ fontWeight: 800, color: '#0A2463' }}>{h.topic}</td>
                                    <td><div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 700 }}><Calendar size={14} color="#64748B" /> {h.deadline}</div></td>
                                    <td style={{ fontSize: 12, color: '#64748B', maxWidth: 300 }}>{h.desc}</td>
                                    <td>
                                        <button
                                            onClick={() => deleteHomework(h.id)}
                                            style={{ border: 'none', background: 'none', color: '#EF4444', cursor: 'pointer', padding: 8 }}
                                        >
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
