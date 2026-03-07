import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Send, Download } from 'lucide-react'

export default function FeePage() {
    const { students, openModal, addToast } = useApp()
    const [filterFee, setFilterFee] = useState('All')
    const [search, setSearch] = useState('')

    const filtered = students.filter(s =>
        (filterFee === 'All' || s.fee === filterFee) &&
        s.name.toLowerCase().includes(search.toLowerCase())
    )

    const total = students.length * 12600
    const collected = students.filter(s => s.fee === 'Paid').length * 12600
    const pending = students.filter(s => s.fee !== 'Paid').length * 12600

    const donut = [
        { label: 'Collected', val: Math.round((collected / total) * 100), col: '#10B981' },
        { label: 'Pending', val: Math.round((pending / total) * 100), col: '#F59E0B' },
    ]

    const handleRemind = (student) => {
        addNotification({
            userId: student.id,
            userRole: 'student',
            type: 'fee',
            title: 'Fee Payment Reminder',
            msg: `Dear ${student.name}, your Term 3 fees (₹4,200) are pending. Please clear them at the earliest.`
        })
        addToast(`Official reminder sent to ${student.name}!`, 'success')
    }

    return (
        <div className="dashboard-body">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 22, fontWeight: 800, color: '#0A2463' }}>Fee Management</h2>
                    <p style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>Track, manage and send payment reminders</p>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                    <button className="btn btn-outline" onClick={() => addToast('Fee report exported!', 'success')}><Download size={14} /> Export</button>
                    <button className="btn btn-green" onClick={() => openModal('feeReminder')}><Send size={14} /> Send Reminders</button>
                </div>
            </div>

            {/* Summary cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
                {[
                    { label: 'Total Expected', val: `₹${(total / 100000).toFixed(1)}L`, col: '#1E50E2', bg: '#E8EFFD' },
                    { label: 'Collected', val: `₹${(collected / 100000).toFixed(1)}L`, col: '#10B981', bg: '#D1FAE5' },
                    { label: 'Outstanding', val: `₹${(pending / 100000).toFixed(1)}L`, col: '#EF4444', bg: '#FEE2E2' },
                ].map((s, i) => (
                    <div key={i} style={{ background: 'white', border: '1.5px solid #E2E8F0', borderRadius: 14, padding: 20 }}>
                        <div style={{ fontSize: 12, color: '#64748B', marginBottom: 6, fontWeight: 600 }}>{s.label}</div>
                        <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 30, fontWeight: 800, color: s.col }}>{s.val}</div>
                        <div className="progress-bar" style={{ marginTop: 10 }}>
                            <div className="progress-fill" style={{ width: `${(i === 0 ? 100 : i === 1 ? collected / total * 100 : pending / total * 100)}%`, background: s.col }} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters + Table */}
            <div className="card">
                <div className="card-header">
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#0A2463' }}>Fee Status — All Students</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                        {['All', 'Paid', 'Pending', 'Overdue'].map(f => (
                            <button key={f} className="btn btn-sm"
                                style={{ background: filterFee === f ? '#1E50E2' : '#F1F5F9', color: filterFee === f ? 'white' : '#475569', border: 'none' }}
                                onClick={() => setFilterFee(f)}>{f}</button>
                        ))}
                    </div>
                </div>
                <div style={{ padding: '12px 20px', borderBottom: '1px solid #F1F5F9' }}>
                    <input className="header-search" style={{ width: '100%', display: 'block' }}
                        placeholder="Search students…" value={search} onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <div className="table-wrap">
                    <table>
                        <thead><tr><th>Student</th><th>Class</th><th>Term 1</th><th>Term 2</th><th>Term 3</th><th>Status</th><th>Action</th></tr></thead>
                        <tbody>
                            {filtered.map(s => (
                                <tr key={s.id}>
                                    <td style={{ fontWeight: 700 }}>{s.name}</td>
                                    <td><span className="chip chip-blue">{s.class}</span></td>
                                    <td><span className="chip chip-green" style={{ fontSize: 11 }}>₹4,200 ✓</span></td>
                                    <td><span className="chip chip-green" style={{ fontSize: 11 }}>₹4,200 ✓</span></td>
                                    <td>
                                        <span className={`chip chip-${s.fee === 'Paid' ? 'green' : s.fee === 'Pending' ? 'amber' : 'red'}`} style={{ fontSize: 11 }}>
                                            ₹4,200 {s.fee === 'Paid' ? '✓' : '⚠'}
                                        </span>
                                    </td>
                                    <td><span className={`chip chip-${s.fee === 'Paid' ? 'green' : s.fee === 'Pending' ? 'amber' : 'red'}`}>{s.fee}</span></td>
                                    <td>
                                        {s.fee !== 'Paid' ? (
                                            <button className="btn btn-sm" style={{ background: '#1E50E2', color: 'white', border: 'none' }}
                                                onClick={() => handleRemind(s)}>
                                                <Send size={11} /> Remind
                                            </button>
                                        ) : (
                                            <span style={{ fontSize: 12, color: '#10B981', fontWeight: 700 }}>✓ Cleared</span>
                                        )}
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
