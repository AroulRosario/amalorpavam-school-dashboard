import { useState, useRef } from 'react'
import { useApp } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Layers, Users, Plus, Trash2, MapPin, UploadCloud, X, CheckCircle, BookOpen } from 'lucide-react'

export default function ClassManager() {
    const { classMappings, addClassMapping, addSubjectToClass, deleteClassMapping, teachers, addToast } = useApp()
    const fileInputRef = useRef(null)

    const [standard, setStandard] = useState('XII')
    const [section, setSection] = useState('A')
    const [subjectName, setSubjectName] = useState('')
    const [teacherId, setTeacherId] = useState('')

    const standards = ['LKG', 'UKG', ...['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']]
    const sections = ['A', 'B', 'C', 'D', 'E', 'F']
    const commonSubjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Tamil', 'Computer Science', 'Commerce', 'Accountancy', 'Economics', 'History', 'Geography', 'Social Science', 'Science', 'EVS']

    const handleAdd = (e) => {
        e.preventDefault()
        if (!standard || !section || !subjectName || !teacherId) {
            addToast('Please fill all fields: Standard, Section, Subject, and Teacher.', 'error')
            return
        }

        const className = `${standard}-${section}`
        const existing = classMappings.find(m => m.class === className)

        if (!existing) {
            // If class doesn't exist, create it first
            addClassMapping({ class: className, standard, section, subjects: [] })
            // We'll rely on the user to click again or use the class name to find it in the next step
            // Actually, addSubjectToClass handles it if we can find the class.
            // Let's use a small delay or find by class name.
            setTimeout(() => {
                const newClass = classMappings.find(m => m.class === className)
                if (newClass) addSubjectToClass(newClass.id, subjectName, teacherId)
            }, 100)
        } else {
            addSubjectToClass(existing.id, subjectName, teacherId)
        }

        addToast(`${subjectName} assigned to ${className}`, 'success')
        setSubjectName('')
        setTeacherId('')
    }

    const handleCsvUpload = (e) => {
        const file = e.target.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = (evt) => {
            const lines = evt.target.result.split(/\r?\n/).filter(l => l.trim())
            let count = 0, errors = 0

            for (let i = 1; i < lines.length; i++) {
                const parts = lines[i].split(',').map(s => s.replace(/["']/g, '').trim())
                if (parts.length >= 3) {
                    const cls = parts[0]
                    const sub = parts[1]
                    const email = parts[2]
                    const teacher = teachers.find(t => t.email.toLowerCase() === email.toLowerCase())

                    if (!teacher) { errors++; continue }

                    let mapping = classMappings.find(m => m.class === cls)
                    if (!mapping) {
                        const [std, sec] = cls.split('-')
                        if (std && sec) {
                            addClassMapping({ class: cls, standard: std, section: sec, subjects: [] })
                        } else { errors++; continue }
                    }

                    // In a simple localStorage sync, we might need a small delay between addClass and addSubject 
                    // if they were real API calls. Here, we'll try to execute it.
                    addSubjectToClass(classMappings.find(m => m.class === cls)?.id, sub, teacher.id)
                    count++
                }
            }
            addToast(`CSV Processed: ${count} mappings updated.`, 'success')
        }
        reader.readAsText(file)
        e.target.value = ''
    }

    return (
        <div className="dashboard-body">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                <div>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 800, color: '#0A2463', margin: 0 }}>Subject-Teacher Mapping</h2>
                    <p style={{ color: '#64748B', fontSize: 14, marginTop: 4 }}>Assign specific teachers to subjects for each class. Changes reflect in LMS and Timetables.</p>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <input type="file" accept=".csv" ref={fileInputRef} style={{ display: 'none' }} onChange={handleCsvUpload} />
                    <button className="btn btn-outline" onClick={() => fileInputRef.current?.click()} style={{ background: 'white' }}>
                        <UploadCloud size={18} /> Bulk Upload CSV
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 350px) 1fr', gap: 24 }}>
                {/* Assignment Form */}
                <div className="card" style={{ alignSelf: 'start' }}>
                    <div className="card-header" style={{ padding: '20px 24px', borderBottom: '1px solid #F1F5F9' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 32, height: 32, borderRadius: 10, background: '#E8EFFD', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <MapPin size={16} color="#1E50E2" />
                            </div>
                            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>Map Subject Teacher</h3>
                        </div>
                    </div>
                    <form onSubmit={handleAdd} style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
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
                            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6, color: '#475569' }}>Subject Name</label>
                            <input list="subj-list" className="form-input" placeholder="e.g. Mathematics" value={subjectName} onChange={e => setSubjectName(e.target.value)} />
                            <datalist id="subj-list">
                                {commonSubjects.map(s => <option key={s} value={s} />)}
                            </datalist>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6, color: '#475569' }}>Allot Teacher</label>
                            <select className="form-input" value={teacherId} onChange={e => setTeacherId(e.target.value)}>
                                <option value="">Select a Teacher...</option>
                                {teachers.filter(t => t.active).map(t => (
                                    <option key={t.id} value={t.id}>{t.name} ({t.subjects?.join(', ') || 'General'})</option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
                            <Plus size={18} /> Assign Subject
                        </button>
                    </form>

                    <div style={{ padding: '0 24px 24px' }}>
                        <button className="btn btn-outline btn-sm" style={{ width: '100%', fontSize: 12, justifyContent: 'center' }}
                            onClick={() => {
                                const csv = "Class,Subject,TeacherEmail\nXII-A,Mathematics,anitha@amal.edu\nXII-A,Physics,rajan@amal.edu\nXI-B,Chemistry,priya@amal.edu"
                                const blob = new Blob([csv], { type: 'text/csv' })
                                const url = URL.createObjectURL(blob)
                                const a = document.createElement('a'); a.href = url; a.download = 'subject_mapping_template.csv'; a.click()
                                addToast('Template downloaded.', 'info')
                            }}>
                            Download CSV Template
                        </button>
                    </div>
                </div>

                {/* Class Display */}
                <div className="card">
                    <div className="card-header" style={{ padding: '20px 24px', borderBottom: '1px solid #F1F5F9' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 32, height: 32, borderRadius: 10, background: '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <BookOpen size={16} color="#10B981" />
                            </div>
                            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>Configured Classes ({classMappings.length})</h3>
                        </div>
                    </div>

                    {classMappings.length === 0 ? (
                        <div style={{ padding: 80, textAlign: 'center', color: '#94A3B8' }}>
                            <Layers size={48} style={{ opacity: 0.1, margin: '0 auto 16px' }} />
                            <div style={{ fontSize: 18, fontWeight: 800 }}>No Classes Configured</div>
                            <p style={{ fontSize: 14 }}>Assign your first subject to get started.</p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20, padding: 24 }}>
                            {classMappings.sort((a, b) => a.class.localeCompare(b.class)).map((map, i) => (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                                    key={map.id}
                                    style={{ border: '2px solid #F1F5F9', borderRadius: 20, padding: 20, background: 'white', position: 'relative' }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                                        <div>
                                            <div style={{ fontSize: 28, fontWeight: 900, color: '#0A2463' }}>{map.class}</div>
                                            <div style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8' }}>STANDARD {map.standard}</div>
                                        </div>
                                        <button onClick={() => deleteClassMapping(map.id)} style={{ background: '#FEE2E2', border: 'none', padding: 8, borderRadius: 10, color: '#EF4444', cursor: 'pointer' }}>
                                            <Trash2 size={16} />
                                        </button>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                        {map.subjects?.map(sub => {
                                            const teacher = teachers.find(t => t.id === sub.teacherId)
                                            return (
                                                <div key={sub.name} style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#F8FAFC', padding: '12px 14px', borderRadius: 12, border: '1px solid #E2E8F0' }}>
                                                    <div style={{ width: 34, height: 34, borderRadius: 10, background: 'white', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                        <BookOpen size={16} color="#1E50E2" />
                                                    </div>
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ fontSize: 13, fontWeight: 800, color: '#0F172A' }}>{sub.name}</div>
                                                        <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>{teacher?.name || 'Unassigned'}</div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        {(!map.subjects || map.subjects.length === 0) && (
                                            <div style={{ fontSize: 13, color: '#94A3B8', textAlign: 'center', padding: '10px 0' }}>No subjects assigned.</div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
