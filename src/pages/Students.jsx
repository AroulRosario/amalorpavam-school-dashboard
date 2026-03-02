import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Plus, Trash2, Search, Users } from 'lucide-react'

export default function StudentsPage() {
    const { students, deleteStudent, openModal, addToast } = useApp()
    const [search, setSearch] = useState('')
    const [filterClass, setFilterClass] = useState('All')
    const [filterFee, setFilterFee] = useState('All')

    const classes = ['All', ...new Set(students.map(s => s.class))]
    const filtered = students.filter(s =>
        (filterClass === 'All' || s.class === filterClass) &&
        (filterFee === 'All' || s.fee === filterFee) &&
        (s.name.toLowerCase().includes(search.toLowerCase()) || s.roll.includes(search))
    )

    const feeColor = { Paid: 'green', Pending: 'amber', Overdue: 'red' }

    return (
        <div className="dashboard-body">
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 22, fontWeight: 800, color: '#0A2463' }}>Students</h2>
                    <p style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>{students.length} enrolled students across all classes</p>
                </div>
                <button className="btn btn-primary" onClick={() => openModal('addStudent')}>
                    <Plus size={14} /> Add Student
                </button>
            </div>

            {/* Filters */}
            <div className="card" style={{ padding: 16 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                    <div className="header-search" style={{ flex: 1, minWidth: 220 }}>
                        <Search size={14} color="var(--gray-400)" />
                        <input placeholder="Search by name or roll no…" value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                    <select className="btn btn-outline" value={filterClass} onChange={e => setFilterClass(e.target.value)}
                        style={{ padding: '7px 14px', fontSize: 13 }}>
                        {classes.map(c => <option key={c}>{c}</option>)}
                    </select>
                    <select className="btn btn-outline" value={filterFee} onChange={e => setFilterFee(e.target.value)}
                        style={{ padding: '7px 14px', fontSize: 13 }}>
                        <option>All</option><option>Paid</option><option>Pending</option><option>Overdue</option>
                    </select>
                    <button className="btn btn-outline" onClick={() => { setSearch(''); setFilterClass('All'); setFilterFee('All') }}>
                        Clear
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
                {[
                    { label: 'Total Students', val: students.length, col: '#1E50E2', bg: '#E8EFFD' },
                    { label: 'Fee Paid', val: students.filter(s => s.fee === 'Paid').length, col: '#10B981', bg: '#D1FAE5' },
                    { label: 'Fee Pending', val: students.filter(s => s.fee === 'Pending').length, col: '#F59E0B', bg: '#FEF3C7' },
                    { label: 'Overdue', val: students.filter(s => s.fee === 'Overdue').length, col: '#EF4444', bg: '#FEE2E2' },
                ].map((s, i) => (
                    <div key={i} style={{ background: 'white', border: '1.5px solid #E2E8F0', borderRadius: 14, padding: 18, display: 'flex', gap: 14 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 12, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Users size={22} color={s.col} />
                        </div>
                        <div>
                            <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 26, fontWeight: 800, lineHeight: 1 }}>{s.val}</div>
                            <div style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>{s.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Table */}
            <div className="card">
                <div className="card-header">
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#0A2463' }}>
                        Student List <span style={{ color: '#94A3B8', fontWeight: 400 }}>({filtered.length})</span>
                    </div>
                    <button className="btn btn-outline btn-sm" onClick={() => addToast('Export CSV downloading…', 'info')}>
                        ⬇ Export CSV
                    </button>
                </div>
                <div className="table-wrap">
                    <table>
                        <thead><tr>
                            <th>Name</th><th>Class</th><th>Roll</th><th>Gender</th>
                            <th>Phone</th><th>Avg %</th><th>Attendance</th><th>Fee</th><th>Actions</th>
                        </tr></thead>
                        <tbody>
                            {filtered.length === 0 && (
                                <tr><td colSpan={9} style={{ textAlign: 'center', color: '#94A3B8', padding: 32 }}>No students found.</td></tr>
                            )}
                            {filtered.map(s => (
                                <tr key={s.id}>
                                    <td><div style={{ fontWeight: 700 }}>{s.name}</div></td>
                                    <td><span className="chip chip-blue">{s.class}</span></td>
                                    <td style={{ fontWeight: 600 }}>{s.roll}</td>
                                    <td>{s.gender}</td>
                                    <td style={{ fontSize: 12, color: '#64748B' }}>{s.phone || '—'}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <div className="progress-bar" style={{ width: 50 }}>
                                                <div className="progress-fill" style={{ width: `${s.avg}%`, background: 'linear-gradient(90deg,#1034A6,#4F83EE)' }} />
                                            </div>
                                            <span style={{ fontWeight: 700, fontSize: 12 }}>{s.avg}%</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <div className="progress-bar" style={{ width: 40 }}>
                                                <div className="progress-fill" style={{ width: `${s.attendance}%`, background: '#10B981' }} />
                                            </div>
                                            <span style={{ fontSize: 12, fontWeight: 600 }}>{s.attendance}%</span>
                                        </div>
                                    </td>
                                    <td><span className={`chip chip-${feeColor[s.fee]}`}>{s.fee}</span></td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 6 }}>
                                            <button className="btn btn-ghost btn-sm"
                                                onClick={() => addToast(`Viewing ${s.name}'s profile…`, 'info')}>View</button>
                                            <button className="btn btn-ghost btn-sm" style={{ color: '#EF4444' }}
                                                onClick={() => { deleteStudent(s.id); addToast(`${s.name} removed.`, 'warning') }}>
                                                <Trash2 size={12} />
                                            </button>
                                        </div>
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
