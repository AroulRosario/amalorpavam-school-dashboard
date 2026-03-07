import { useState, useRef } from 'react'
import { useApp } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Layers, Users, Plus, Trash2, MapPin, UploadCloud, X, CheckCircle } from 'lucide-react'

export default function ClassManager() {
    const { classMappings, addClassMapping, toggleTeacherInClass, deleteClassMapping, teachers, addToast } = useApp()
    const fileInputRef = useRef(null)

    const [standard, setStandard] = useState('XII')
    const [section, setSection] = useState('A')
    const [teacherId, setTeacherId] = useState('')

    const standards = ['LKG', 'UKG', ...['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']]
    const sections = ['A', 'B', 'C', 'D', 'E', 'F']

    // Add teacher to a class (create class if needed)
    const handleAdd = (e) => {
        e.preventDefault()
        if (!standard || !section || !teacherId) {
            addToast('Please select a Standard, Section, and Teacher.', 'error')
            return
        }

        const className = `${standard}-${section}`
        const existing = classMappings.find(m => m.class === className)

        if (existing) {
            const teacherIds = existing.teacherIds || []
            if (teacherIds.includes(Number(teacherId))) {
                addToast(`This teacher is already assigned to ${className}.`, 'warning')
                return
            }
            toggleTeacherInClass(existing.id, teacherId)
            addToast(`Teacher added to ${className}.`, 'success')
        } else {
            addClassMapping({ class: className, standard, section, teacherIds: [Number(teacherId)] })
            addToast(`Class ${className} created and teacher mapped.`, 'success')
        }
        setTeacherId('')
    }

    const handleCsvUpload = (e) => {
        const file = e.target.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = (evt) => {
            const lines = evt.target.result.split(/\r?\n/).filter(l => l.trim())
            let added = 0, updated = 0, errors = 0

            for (let i = 1; i < lines.length; i++) {
                const parts = lines[i].split(',').map(s => s.replace(/["']/g, '').trim())
                if (parts.length >= 2) {
                    const cls = parts[0]
                    const email = parts[1]
                    const teacher = teachers.find(t => t.email.toLowerCase() === email.toLowerCase())

                    if (!teacher) { errors++; continue }

                    const existing = classMappings.find(m => m.class === cls)
                    if (existing) {
                        if (!(existing.teacherIds || []).includes(teacher.id)) {
                            toggleTeacherInClass(existing.id, teacher.id)
                            updated++
                        }
                    } else {
                        const [std, sec] = cls.split('-')
                        if (std && sec) { addClassMapping({ class: cls, standard: std, section: sec, teacherIds: [teacher.id] }); added++ }
                        else errors++
                    }
                }
            }
            addToast(`CSV done: ${added} added, ${updated} updated, ${errors} skipped.`, added + updated > 0 ? 'success' : 'error')
        }
        reader.readAsText(file)
        e.target.value = ''
    }

    return (
        <div className="dashboard-body">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                <div>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 800, color: '#0A2463', margin: 0 }}>Class Management</h2>
                    <p style={{ color: '#64748B', fontSize: 14, marginTop: 4 }}>Map each class to one or more subject teachers. Changes sync instantly to all portals.</p>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <input type="file" accept=".csv" ref={fileInputRef} style={{ display: 'none' }} onChange={handleCsvUpload} />
                    <button className="btn btn-outline" onClick={() => fileInputRef.current?.click()} style={{ background: 'white' }}>
                        <UploadCloud size={18} /> Bulk Upload CSV
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 340px) 1fr', gap: 24 }}>
                {/* Add Teacher to Class */}
                <div className="card" style={{ alignSelf: 'start' }}>
                    <div style={{ padding: '20px 24px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <MapPin size={18} color="#1E50E2" />
                        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Add Teacher to Class</h3>
                    </div>
                    <form onSubmit={handleAdd} style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                            <div>
                                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6, color: '#475569' }}>Standard</label>
                                <select className="form-input" value={standard} onChange={e => setStandard(e.target.value)}>
                                    {standards.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6, color: '#475569' }}>Section</label>
                                <select className="form-input" value={section} onChange={e => setSection(e.target.value)}>
                                    {sections.map(s => <option key={s} value={s}>Sec {s}</option>)}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6, color: '#475569' }}>Teacher to Add</label>
                            <select className="form-input" value={teacherId} onChange={e => setTeacherId(e.target.value)}>
                                <option value="">Select a Teacher...</option>
                                {teachers.filter(t => t.active).map(t => (
                                    <option key={t.id} value={t.id}>{t.name} ({t.subjects?.join(', ')})</option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: 14 }}>
                            <Plus size={16} /> Assign to Class
                        </button>

                        <div style={{ padding: 12, background: '#F0F5FF', borderRadius: 10, fontSize: 12, color: '#475569', lineHeight: 1.6 }}>
                            💡 Each class can have multiple teachers. Click "Assign" for each teacher separately.
                        </div>
                    </form>

                    {/* CSV template download */}
                    <div style={{ padding: '0 20px 20px' }}>
                        <button className="btn btn-outline btn-sm" style={{ width: '100%', justifyContent: 'center', fontSize: 12 }}
                            onClick={() => {
                                const csv = "Class,TeacherEmail\nXII-A,anitha@amal.edu\nXII-A,rajan@amal.edu\nXI-B,priya@amal.edu"
                                const blob = new Blob([csv], { type: 'text/csv' })
                                const url = URL.createObjectURL(blob)
                                const a = document.createElement('a'); a.href = url; a.download = 'class_mapping_template.csv'; a.click()
                                addToast('Template downloaded.', 'info')
                            }}>
                            ↓ Download CSV Template
                        </button>
                    </div>
                </div>

                {/* Configured Classes */}
                <div className="card">
                    <div style={{ padding: '20px 24px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Layers size={18} color="#10B981" />
                        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Configured Classes ({classMappings.length})</h3>
                    </div>
                    {classMappings.length === 0 ? (
                        <div style={{ padding: 60, textAlign: 'center', color: '#94A3B8' }}>
                            <Layers size={48} style={{ opacity: 0.2, margin: '0 auto 16px' }} />
                            <div style={{ fontSize: 16, fontWeight: 700 }}>No Classes Configured</div>
                            <div style={{ fontSize: 14, marginTop: 4 }}>Use the form to add teacher-class mappings.</div>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16, padding: 24 }}>
                            {classMappings.map((map, i) => {
                                const assignedTeachers = (map.teacherIds || []).map(tid => teachers.find(t => t.id === tid)).filter(Boolean)
                                return (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                                        key={map.id}
                                        style={{ border: '1.5px solid #E2E8F0', borderRadius: 16, padding: 18, position: 'relative', background: 'white' }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                                            <div style={{ fontSize: 28, fontWeight: 900, color: '#0A2463', lineHeight: 1 }}>{map.class}</div>
                                            <button
                                                onClick={() => deleteClassMapping(map.id)}
                                                style={{ background: '#FEF2F2', border: 'none', borderRadius: 8, padding: '6px', color: '#EF4444', cursor: 'pointer' }}
                                                title="Delete class"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>

                                        <div style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', marginBottom: 10 }}>
                                            {assignedTeachers.length} Teacher{assignedTeachers.length !== 1 ? 's' : ''} Assigned
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                            {assignedTeachers.length === 0 && (
                                                <div style={{ fontSize: 13, color: '#94A3B8' }}>No teachers assigned yet.</div>
                                            )}
                                            {assignedTeachers.map(teacher => (
                                                <div key={teacher.id} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F8FAFC', padding: '8px 12px', borderRadius: 10, border: '1px solid #E2E8F0' }}>
                                                    <div style={{ width: 28, height: 28, borderRadius: 8, background: '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', flexShrink: 0 }}>
                                                        <Users size={13} />
                                                    </div>
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{teacher.name}</div>
                                                        <div style={{ fontSize: 11, color: '#64748B' }}>{teacher.subjects?.join(', ')}</div>
                                                    </div>
                                                    <button
                                                        onClick={() => { toggleTeacherInClass(map.id, teacher.id); addToast(`Removed ${teacher.name} from ${map.class}`, 'info') }}
                                                        style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer', padding: 2 }}
                                                        title="Remove teacher"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
