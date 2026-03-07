import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { motion } from 'framer-motion'
import { Layers, Users, Plus, Trash2, CheckCircle, MapPin } from 'lucide-react'

export default function ClassManager() {
    const { classMappings, addClassMapping, deleteClassMapping, teachers, addToast } = useApp()

    // Form state
    const [standard, setStandard] = useState('X')
    const [section, setSection] = useState('A')
    const [teacherId, setTeacherId] = useState('')

    const standards = ['LKG', 'UKG', ...Array.from({ length: 12 }, (_, i) => `${i + 1}`).map(n => {
        // Convert to Roman Numerals for 1-12
        const roman = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI', 7: 'VII', 8: 'VIII', 9: 'IX', 10: 'X', 11: 'XI', 12: 'XII' }
        return roman[n]
    })]
    const sections = ['A', 'B', 'C', 'D', 'E', 'F']

    const handleAdd = (e) => {
        e.preventDefault()
        if (!standard || !section || !teacherId) return

        const className = `${standard}-${section}`
        if (classMappings.find(m => m.class === className)) {
            addToast(`${className} already exists!`, 'error')
            return
        }

        addClassMapping({
            class: className,
            standard,
            section,
            teacherId: Number(teacherId)
        })
        addToast(`Class ${className} mapped successfully.`, 'success')
        setTeacherId('') // reset
    }

    return (
        <div className="dashboard-body">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                <div>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 800, color: '#0A2463', margin: 0 }}>Class Management</h2>
                    <p style={{ color: '#64748B', fontSize: 14, marginTop: 4 }}>Map standards and sections to class teachers for automatic roster routing.</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 350px) 1fr', gap: 24 }}>
                {/* Creation Form */}
                <div className="card" style={{ alignSelf: 'start' }}>
                    <div className="card-header" style={{ padding: 20, borderBottom: '1px solid #F1F5F9' }}>
                        <h3 style={{ margin: 0, fontSize: 16, display: 'flex', alignItems: 'center', gap: 8 }}><MapPin size={18} color="#1E50E2" /> Create Class Mapping</h3>
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
                            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6, color: '#475569' }}>Class Teacher</label>
                            <select className="form-input" value={teacherId} onChange={e => setTeacherId(e.target.value)}>
                                <option value="">Select a Teacher...</option>
                                {teachers.filter(t => t.active).map(t => (
                                    <option key={t.id} value={t.id}>{t.name}</option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: 14, marginTop: 8 }}>
                            <Plus size={16} /> Map Teacher to Class
                        </button>
                    </form>
                </div>

                {/* Exsting Mappings */}
                <div className="card">
                    <div className="card-header" style={{ padding: '20px 24px', borderBottom: '1px solid #F1F5F9' }}>
                        <h3 style={{ margin: 0, fontSize: 16, display: 'flex', alignItems: 'center', gap: 8 }}><Layers size={18} color="#10B981" /> Configured Classes ({classMappings.length})</h3>
                    </div>
                    {classMappings.length === 0 ? (
                        <div style={{ padding: 60, textAlign: 'center', color: '#94A3B8' }}>
                            <Layers size={48} style={{ opacity: 0.2, margin: '0 auto 16px' }} />
                            <div style={{ fontSize: 16, fontWeight: 700 }}>No Maps Configured</div>
                            <div style={{ fontSize: 14, marginTop: 4 }}>Add a mapping on the left to start assigning teachers.</div>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16, padding: 24 }}>
                            {classMappings.map((map, i) => {
                                const teacher = teachers.find(t => t.id === map.teacherId)
                                return (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                                        key={map.id}
                                        style={{ border: '1px solid #E2E8F0', borderRadius: 16, padding: 16, position: 'relative', background: '#F8FAFC' }}
                                    >
                                        <button
                                            onClick={() => deleteClassMapping(map.id)}
                                            style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
                                        >
                                            <Trash2 size={16} className="hover-red" />
                                        </button>

                                        <div style={{ fontSize: 28, fontWeight: 900, color: '#0A2463', lineHeight: 1, marginBottom: 16 }}>
                                            {map.class}
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#475569', background: 'white', padding: '8px 12px', borderRadius: 8, border: '1px solid #E2E8F0' }}>
                                            <div style={{ width: 24, height: 24, borderRadius: 6, background: '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
                                                <Users size={12} />
                                            </div>
                                            <div style={{ fontWeight: 700 }}>{teacher?.name || 'Unknown'}</div>
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
