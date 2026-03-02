import { useState } from 'react'
import { useApp } from '../context/AppContext'
import Modal, { Field, Input, Select } from '../components/Modal'

// ── Add Student Modal ────────────────────────────────────────
export function AddStudentModal() {
    const { closeModal, addStudent, addToast } = useApp()
    const [form, setForm] = useState({ name: '', class: 'XII-A', roll: '', gender: 'Female', phone: '', fee: 'Paid' })
    const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
    const submit = (e) => {
        e.preventDefault()
        if (!form.name || !form.roll) return addToast('Name and Roll No. are required', 'error')
        addStudent(form)
        addToast(`Student "${form.name}" added successfully!`, 'success')
        closeModal()
    }
    return (
        <Modal title="➕ Add New Student">
            <form onSubmit={submit}>
                <Field label="Full Name"><Input value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Ravi Shankar" required /></Field>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <Field label="Class">
                        <Select value={form.class} onChange={e => set('class', e.target.value)}>
                            {['X-A', 'X-B', 'XI-A', 'XI-B', 'XII-A', 'XII-B'].map(c => <option key={c}>{c}</option>)}
                        </Select>
                    </Field>
                    <Field label="Roll No."><Input value={form.roll} onChange={e => set('roll', e.target.value)} placeholder="01" /></Field>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <Field label="Gender">
                        <Select value={form.gender} onChange={e => set('gender', e.target.value)}>
                            <option>Female</option><option>Male</option>
                        </Select>
                    </Field>
                    <Field label="Fee Status">
                        <Select value={form.fee} onChange={e => set('fee', e.target.value)}>
                            <option>Paid</option><option>Pending</option><option>Overdue</option>
                        </Select>
                    </Field>
                </div>
                <Field label="Phone / Parent Contact"><Input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="98400-XXXXX" /></Field>
                <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                    <button type="button" onClick={closeModal} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                    <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>Add Student</button>
                </div>
            </form>
        </Modal>
    )
}

// ── Add Event Modal ──────────────────────────────────────────
export function AddEventModal() {
    const { closeModal, addEvent, addToast } = useApp()
    const [form, setForm] = useState({ day: '', month: 'Mar', year: 2026, name: '', desc: '', type: 'Academic' })
    const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
    const submit = (e) => {
        e.preventDefault()
        if (!form.name || !form.day) return addToast('Event name and date are required', 'error')
        addEvent(form)
        addToast(`Event "${form.name}" scheduled!`, 'success')
        closeModal()
    }
    return (
        <Modal title="📅 Schedule New Event">
            <form onSubmit={submit}>
                <Field label="Event Name"><Input value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Annual Day Celebration" required /></Field>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                    <Field label="Day"><Input type="number" min="1" max="31" value={form.day} onChange={e => set('day', e.target.value.padStart(2, '0'))} placeholder="08" /></Field>
                    <Field label="Month">
                        <Select value={form.month} onChange={e => set('month', e.target.value)}>
                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => <option key={m}>{m}</option>)}
                        </Select>
                    </Field>
                    <Field label="Year"><Input value={form.year} onChange={e => set('year', e.target.value)} /></Field>
                </div>
                <Field label="Type">
                    <Select value={form.type} onChange={e => set('type', e.target.value)}>
                        {['Academic', 'Sports', 'Cultural', 'Meeting', 'Exam', 'Holiday', 'Other'].map(t => <option key={t}>{t}</option>)}
                    </Select>
                </Field>
                <Field label="Description / Notes"><Input value={form.desc} onChange={e => set('desc', e.target.value)} placeholder="Ground A — All students" /></Field>
                <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                    <button type="button" onClick={closeModal} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                    <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>Schedule Event</button>
                </div>
            </form>
        </Modal>
    )
}

// ── Upload Content Modal ─────────────────────────────────────
export function UploadContentModal() {
    const { closeModal, addContent, addToast } = useApp()
    const [form, setForm] = useState({ title: '', subject: 'Mathematics', class: 'XII-A', type: 'PDF', teacher: 'Ms. Anitha K.' })
    const [uploading, setUploading] = useState(false)
    const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
    const submit = (e) => {
        e.preventDefault()
        if (!form.title) return addToast('Title is required', 'error')
        setUploading(true)
        setTimeout(() => {
            addContent(form)
            addToast(`"${form.title}" uploaded to Content Portal!`, 'success')
            setUploading(false)
            closeModal()
        }, 1500)
    }
    return (
        <Modal title="📤 Upload Class Content">
            <form onSubmit={submit}>
                <Field label="Content Title"><Input value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Integration Techniques — Part 2" required /></Field>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <Field label="Subject">
                        <Select value={form.subject} onChange={e => set('subject', e.target.value)}>
                            {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Tamil', 'Computer Science'].map(s => <option key={s}>{s}</option>)}
                        </Select>
                    </Field>
                    <Field label="Class">
                        <Select value={form.class} onChange={e => set('class', e.target.value)}>
                            {['X-A', 'X-B', 'XI-A', 'XI-B', 'XII-A', 'XII-B'].map(c => <option key={c}>{c}</option>)}
                        </Select>
                    </Field>
                </div>
                <Field label="Content Type">
                    <div style={{ display: 'flex', gap: 8 }}>
                        {['PDF', 'PPT', 'Video', 'Audio', 'Flash'].map(t => (
                            <button key={t} type="button" onClick={() => set('type', t)}
                                className="btn btn-sm"
                                style={{ background: form.type === t ? '#1E50E2' : '#F1F5F9', color: form.type === t ? 'white' : '#475569', border: 'none' }}>
                                {t}
                            </button>
                        ))}
                    </div>
                </Field>
                <div style={{ border: '2px dashed #CBD5E1', borderRadius: 12, padding: 24, textAlign: 'center', background: '#F8FAFC', marginBottom: 16 }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>📁</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>Click or drag file here</div>
                    <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>Supports PDF, PPT, MP4, MOV (max 200MB)</div>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                    <button type="button" onClick={closeModal} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                    <button type="submit" className="btn btn-primary" style={{ flex: 2 }} disabled={uploading}>
                        {uploading ? '⏳ Uploading…' : '📤 Upload Content'}
                    </button>
                </div>
            </form>
        </Modal>
    )
}

// ── Bulk CSV Modal ───────────────────────────────────────────
export function BulkCSVModal() {
    const { closeModal, addToast } = useApp()
    const [type, setType] = useState('Students')
    const [progress, setProgress] = useState(0)
    const [importing, setImporting] = useState(false)
    const startImport = () => {
        setImporting(true)
        let p = 0
        const iv = setInterval(() => {
            p += 10
            setProgress(p)
            if (p >= 100) {
                clearInterval(iv)
                addToast(`${type} CSV imported successfully!`, 'success')
                closeModal()
            }
        }, 120)
    }
    return (
        <Modal title="📊 Bulk CSV Import">
            <Field label="Import Type">
                <div style={{ display: 'flex', gap: 8 }}>
                    {['Students', 'Staff', 'Marks'].map(t => (
                        <button key={t} type="button" onClick={() => setType(t)}
                            className="btn btn-sm"
                            style={{ background: type === t ? '#1E50E2' : '#F1F5F9', color: type === t ? 'white' : '#475569', border: 'none' }}>
                            {t}
                        </button>
                    ))}
                </div>
            </Field>
            <div style={{ border: '2px dashed #CBD5E1', borderRadius: 12, padding: 28, textAlign: 'center', background: '#F8FAFC', marginBottom: 16 }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>📂</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>Upload {type}.csv</div>
                <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>Download template below before importing</div>
                <button className="btn btn-outline btn-sm" style={{ marginTop: 10 }} onClick={() => addToast(`${type} template downloaded!`, 'info')}>
                    ⬇ Download Template
                </button>
            </div>
            {importing && (
                <div style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6, color: '#475569', fontWeight: 600 }}>
                        <span>Importing…</span><span>{progress}%</span>
                    </div>
                    <div className="progress-bar" style={{ height: 10 }}>
                        <div className="progress-fill" style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#1E50E2,#10B981)', transition: 'width .1s' }} />
                    </div>
                </div>
            )}
            <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={closeModal} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                <button onClick={startImport} className="btn btn-primary" style={{ flex: 2 }} disabled={importing}>
                    {importing ? 'Importing…' : `Import ${type}`}
                </button>
            </div>
        </Modal>
    )
}

// ── Fee Reminder Modal ───────────────────────────────────────
export function FeeReminderModal() {
    const { closeModal, students, addToast } = useApp()
    const pending = students.filter(s => s.fee !== 'Paid')
    const [selected, setSelected] = useState(pending.map(s => s.id))
    const toggle = (id) => setSelected(sel => sel.includes(id) ? sel.filter(x => x !== id) : [...sel, id])
    const send = () => {
        addToast(`Reminders sent to ${selected.length} student(s)!`, 'success')
        closeModal()
    }
    return (
        <Modal title="💌 Send Fee Reminders">
            <p style={{ fontSize: 13, color: '#64748B', marginBottom: 16 }}>
                Select students to send payment reminders via SMS & email.
            </p>
            {pending.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 24, color: '#10B981', fontWeight: 700 }}>✅ All fees are paid!</div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                    {pending.map(s => (
                        <label key={s.id} style={{
                            display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px',
                            background: selected.includes(s.id) ? '#EFF6FF' : '#F8FAFC',
                            border: `1.5px solid ${selected.includes(s.id) ? '#BFDBFE' : '#E2E8F0'}`,
                            borderRadius: 10, cursor: 'pointer', transition: 'all .15s'
                        }}>
                            <input type="checkbox" checked={selected.includes(s.id)} onChange={() => toggle(s.id)} style={{ width: 16, height: 16, accentColor: '#1E50E2' }} />
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 700, fontSize: 13 }}>{s.name}</div>
                                <div style={{ fontSize: 11, color: '#64748B' }}>{s.class} · Roll {s.roll}</div>
                            </div>
                            <span className={`chip ${s.fee === 'Overdue' ? 'chip-red' : 'chip-amber'}`}>{s.fee}</span>
                        </label>
                    ))}
                </div>
            )}
            <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={closeModal} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                <button onClick={send} className="btn btn-green" style={{ flex: 2 }} disabled={selected.length === 0}>
                    📨 Send to {selected.length} Students
                </button>
            </div>
        </Modal>
    )
}

// ── Add Appointment Modal ────────────────────────────────────
export function AppointmentModal() {
    const { closeModal, addAppointment, addToast } = useApp()
    const [form, setForm] = useState({ name: '', time: '', date: '', type: 'Parent Meet' })
    const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
    const submit = (e) => {
        e.preventDefault()
        if (!form.name || !form.time || !form.date) return addToast('All fields required', 'error')
        addAppointment(form)
        addToast('Appointment booked!', 'success')
        closeModal()
    }
    return (
        <Modal title="🏛️ Book Principal Appointment">
            <form onSubmit={submit}>
                <Field label="Visitor Name"><Input value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Mr. Ravi Shankar (Parent)" required /></Field>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <Field label="Date"><Input type="date" value={form.date} onChange={e => set('date', e.target.value)} /></Field>
                    <Field label="Time"><Input type="time" value={form.time} onChange={e => set('time', e.target.value)} /></Field>
                </div>
                <Field label="Purpose">
                    <Select value={form.type} onChange={e => set('type', e.target.value)}>
                        {['Parent Meet', 'Academic', 'Staff Review', 'Inspection', 'Other'].map(t => <option key={t}>{t}</option>)}
                    </Select>
                </Field>
                <div style={{ display: 'flex', gap: 10 }}>
                    <button type="button" onClick={closeModal} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                    <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>Book Appointment</button>
                </div>
            </form>
        </Modal>
    )
}

// ── System Settings Modal ────────────────────────────────────
export function SystemSettingsModal() {
    const { closeModal, addToast } = useApp()
    const [settings, setSettings] = useState({ schoolName: 'Amalorpavam Higher Secondary School', board: 'State Board', session: '2025-2026', smsEnabled: true, emailEnabled: true, gpsEnabled: true })
    const save = () => {
        addToast('System settings saved!', 'success')
        closeModal()
    }
    const set = (k, v) => setSettings(s => ({ ...s, [k]: v }))
    const Toggle = ({ label, val, k }) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F1F5F9' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>{label}</span>
            <div onClick={() => set(k, !val)} style={{
                width: 44, height: 24, borderRadius: 99, background: val ? '#1E50E2' : '#CBD5E1',
                cursor: 'pointer', position: 'relative', transition: 'background .2s',
            }}>
                <div style={{
                    width: 18, height: 18, background: 'white', borderRadius: '50%', position: 'absolute',
                    top: 3, left: val ? 23 : 3, transition: 'left .2s', boxShadow: '0 1px 4px rgba(0,0,0,.2)'
                }} />
            </div>
        </div>
    )
    return (
        <Modal title="⚙️ System Settings">
            <Field label="School Name"><Input value={settings.schoolName} onChange={e => set('schoolName', e.target.value)} /></Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <Field label="Board"><Select value={settings.board} onChange={e => set('board', e.target.value)}><option>State Board</option><option>CBSE</option><option>ICSE</option></Select></Field>
                <Field label="Academic Session"><Input value={settings.session} onChange={e => set('session', e.target.value)} /></Field>
            </div>
            <div style={{ background: '#F8FAFC', borderRadius: 10, padding: '4px 12px', marginBottom: 16 }}>
                <Toggle label="SMS Notifications" val={settings.smsEnabled} k="smsEnabled" />
                <Toggle label="Email Notifications" val={settings.emailEnabled} k="emailEnabled" />
                <Toggle label="GPS Tracking" val={settings.gpsEnabled} k="gpsEnabled" />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={closeModal} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                <button onClick={save} className="btn btn-primary" style={{ flex: 2 }}>Save Settings</button>
            </div>
        </Modal>
    )
}

// ── Gradebook Modal ──────────────────────────────────────────
export function GradebookModal() {
    const { closeModal, students, saveGrades, gradebook, addToast } = useApp()
    const cls = 'XII-A'
    const classStudents = students.filter(s => s.class === cls)
    const [grades, setGrades] = useState(() => {
        const existing = gradebook[cls] || {}
        return classStudents.reduce((acc, s) => ({
            ...acc,
            [s.id]: existing[s.id] || { maths: '', physics: '', chemistry: '', biology: '', english: '' }
        }), {})
    })
    const setGrade = (sid, sub, val) => {
        if (val !== '' && (isNaN(val) || +val < 0 || +val > 100)) return
        setGrades(g => ({ ...g, [sid]: { ...g[sid], [sub]: val } }))
    }
    const submit = () => {
        saveGrades(cls, grades)
        addToast('Grades saved for XII-A!', 'success')
        closeModal()
    }
    const subjects = ['maths', 'physics', 'chemistry']
    return (
        <Modal title="📝 Gradebook Entry — XII-A" width={680}>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'left', padding: '8px 10px', background: '#F8FAFC', borderBottom: '2px solid #E2E8F0', fontWeight: 700, color: '#475569' }}>Student</th>
                            {subjects.map(s => <th key={s} style={{ padding: '8px 10px', background: '#F8FAFC', borderBottom: '2px solid #E2E8F0', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '.5px' }}>{s.charAt(0).toUpperCase() + s.slice(1)}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {classStudents.map(s => (
                            <tr key={s.id}>
                                <td style={{ padding: '8px 10px', borderBottom: '1px solid #F1F5F9', fontWeight: 600 }}>{s.name}</td>
                                {subjects.map(sub => (
                                    <td key={sub} style={{ padding: '4px 6px', borderBottom: '1px solid #F1F5F9' }}>
                                        <input type="number" min="0" max="100"
                                            value={grades[s.id]?.[sub] ?? ''}
                                            onChange={e => setGrade(s.id, sub, e.target.value)}
                                            style={{ width: 60, padding: '5px 8px', border: '1.5px solid #E2E8F0', borderRadius: 6, fontSize: 12, textAlign: 'center', outline: 'none' }}
                                            placeholder="—"
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                <button onClick={closeModal} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                <button onClick={submit} className="btn btn-green" style={{ flex: 2 }}>💾 Save Grades</button>
            </div>
        </Modal>
    )
}

// ── Role Management Modal ────────────────────────────────────
export function RoleManagementModal() {
    const { closeModal, addToast } = useApp()
    const roles = [
        { name: 'Super Admin', perms: ['All access', 'System settings', 'User management'], color: '#1E50E2', users: 1 },
        { name: 'Admin', perms: ['Dashboard', 'Reports', 'Content upload'], color: '#8B5CF6', users: 3 },
        { name: 'Teacher', perms: ['Attendance', 'Gradebook', 'Content upload'], color: '#10B981', users: 84 },
        { name: 'Student', perms: ['View content', 'Chat', 'Fee payment'], color: '#F59E0B', users: 1248 },
    ]
    return (
        <Modal title="👤 User Role Management">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
                {roles.map(r => (
                    <div key={r.name} style={{ border: '1.5px solid #E2E8F0', borderRadius: 12, padding: 14, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: `${r.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `1.5px solid ${r.color}40` }}>
                            <span style={{ fontSize: 18 }}>👤</span>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                                <span style={{ fontWeight: 700, fontSize: 14, color: '#0F172A' }}>{r.name}</span>
                                <span style={{ fontSize: 11, color: '#64748B' }}>{r.users} user{r.users > 1 ? 's' : ''}</span>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                                {r.perms.map(p => <span key={p} className="tag tag-blue" style={{ fontSize: 10 }}>{p}</span>)}
                            </div>
                        </div>
                        <button className="btn btn-outline btn-sm" onClick={() => addToast(`Editing "${r.name}" role permissions…`, 'info')}>Edit</button>
                    </div>
                ))}
            </div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => addToast('New role creation coming soon!', 'info')}>
                ➕ Create New Role
            </button>
        </Modal>
    )
}
