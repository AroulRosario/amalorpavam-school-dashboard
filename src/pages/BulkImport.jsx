import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Database, Upload, FileText, CheckCircle, AlertCircle, X, Download, ShieldCheck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function BulkImport() {
    const { importStudents, addToast, classMappings } = useApp()
    const [dragging, setDragging] = useState(false)
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState([])
    const [view, setView] = useState('upload') // upload, preview, success

    const handleFile = (f) => {
        if (!f.name.endsWith('.csv')) {
            addToast('Please upload a valid CSV file.', 'error')
            return
        }
        setFile(f)
        // Simulate CSV parsing
        const reader = new FileReader()
        reader.onload = (e) => {
            const lines = e.target.result.split('\n')
            const data = lines.slice(1).filter(l => l.trim()).map(line => {
                const parts = line.split(',')
                const studentClass = parts[1]?.trim() || 'XII-A'
                // Lookup mapping for this class
                const mapping = classMappings.find(m => m.class === studentClass)

                return {
                    name: parts[0]?.trim(),
                    class: studentClass,
                    roll: parts[2]?.trim() || '00',
                    email: parts[3]?.trim() || '',
                    phone: parts[4]?.trim() || '',
                    avg: parseInt(parts[5]) || 70,
                    teacherId: mapping ? (mapping.teacherIds?.[0] ?? null) : null // Auto assign primary teacher
                }
            })
            setPreview(data)
            setView('preview')
        }
        reader.readAsText(f)
    }

    const handleConfirm = () => {
        importStudents(preview)
        setView('success')
    }

    const downloadTemplate = () => {
        const csv = "Name,Class,Roll,Email,Phone,AverageScore\nJohn Doe,XII-A,01,john@student.edu,9876543210,85\nJane Smith,X-B,22,jane@student.edu,9000000000,92"
        const blob = new Blob([csv], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'amal_student_import_template.csv'
        a.click()
    }

    return (
        <div className="dashboard-body">
            <div style={{ marginBottom: 32 }}>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 800, color: '#0A2463', margin: 0 }}>Bulk Data Import</h2>
                <p style={{ color: '#64748B', fontSize: 14, marginTop: 4 }}>Ingest large datasets into the school management system</p>
            </div>

            <div style={{ maxWidth: 800, margin: '0 auto' }}>
                <AnimatePresence mode="wait">
                    {view === 'upload' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            key="upload"
                        >
                            <div
                                onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                                onDragLeave={() => setDragging(false)}
                                onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]) }}
                                style={{
                                    border: `3px dashed ${dragging ? '#1E50E2' : '#E2E8F0'}`,
                                    background: dragging ? '#E8EFFD' : 'white',
                                    borderRadius: 32,
                                    padding: 80,
                                    textAlign: 'center',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                onClick={() => document.getElementById('file-input').click()}
                            >
                                <input id="file-input" type="file" hidden onChange={(e) => handleFile(e.target.files[0])} accept=".csv" />
                                <div style={{ width: 80, height: 80, borderRadius: 24, background: '#F1F5F9', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Upload size={32} color="#64748B" />
                                </div>
                                <h3 style={{ fontSize: 20, color: '#0A2463', fontWeight: 800 }}>Upload Student CSV</h3>
                                <p style={{ color: '#64748B', fontSize: 15, marginTop: 12 }}>Drag and drop your spreadsheet here, or click to browse</p>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 32 }}>
                                    <div style={{ padding: '8px 16px', background: '#F1F5F9', borderRadius: 12, fontSize: 12, fontWeight: 700, color: '#64748B' }}>MAX 10MB</div>
                                    <div style={{ padding: '8px 16px', background: '#F1F5F9', borderRadius: 12, fontSize: 12, fontWeight: 700, color: '#64748B' }}>CSV FORMAT</div>
                                </div>
                            </div>

                            <div className="card" style={{ marginTop: 24, padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                                    <div style={{ width: 44, height: 44, borderRadius: 12, background: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <FileText size={20} color="#0EA5E9" />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 800, fontSize: 14 }}>Need a template?</div>
                                        <div style={{ fontSize: 12, color: '#64748B' }}>Download our pre-formatted CSV template</div>
                                    </div>
                                </div>
                                <button className="btn btn-outline btn-sm" onClick={downloadTemplate}><Download size={14} /> Download Template</button>
                            </div>
                        </motion.div>
                    )}

                    {view === 'preview' && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            key="preview"
                        >
                            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                                <div className="card-header" style={{ padding: '20px 24px' }}>
                                    <h3 style={{ margin: 0, fontSize: 16 }}>Preview Import ({preview.length} rows)</h3>
                                    <button className="btn btn-ghost btn-sm" onClick={() => setView('upload')}><X size={16} /> Cancel</button>
                                </div>
                                <div style={{ maxHeight: 400, overflowY: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr style={{ background: '#F8FAFC', textAlign: 'left' }}>
                                                <th style={{ padding: '12px 24px', fontSize: 11, fontWeight: 800, color: '#64748B' }}>NAME</th>
                                                <th style={{ padding: '12px 24px', fontSize: 11, fontWeight: 800, color: '#64748B' }}>CLASS</th>
                                                <th style={{ padding: '12px 24px', fontSize: 11, fontWeight: 800, color: '#64748B' }}>ROLL</th>
                                                <th style={{ padding: '12px 24px', fontSize: 11, fontWeight: 800, color: '#64748B' }}>STATUS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {preview.map((row, i) => (
                                                <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                                                    <td style={{ padding: '14px 24px', fontWeight: 700 }}>{row.name}</td>
                                                    <td style={{ padding: '14px 24px' }}>{row.class}</td>
                                                    <td style={{ padding: '14px 24px' }}>{row.roll}</td>
                                                    <td style={{ padding: '14px 24px' }}>
                                                        <span style={{ fontSize: 10, fontWeight: 900, color: '#10B981', background: '#D1FAE5', padding: '3px 8px', borderRadius: 6 }}>READY</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div style={{ padding: 24, background: '#F8FAFC', borderTop: '1px solid #F1F5F9', textAlign: 'right' }}>
                                    <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: 16 }} onClick={handleConfirm}>
                                        <Database size={18} /> Confirm Import {preview.length} Students
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {view === 'success' && (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            key="success"
                            style={{ textAlign: 'center', padding: 40 }}
                        >
                            <div style={{ width: 100, height: 100, borderRadius: 32, background: '#D1FAE5', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <ShieldCheck size={48} color="#10B981" />
                            </div>
                            <h2 style={{ fontSize: 24, color: '#0A2463', fontWeight: 800 }}>Import Complete!</h2>
                            <p style={{ color: '#64748B', fontSize: 16, marginTop: 12 }}>{preview.length} student records have been successfully added to the database.</p>
                            <button className="btn btn-primary" style={{ marginTop: 32, padding: '12px 32px' }} onClick={() => setView('upload')}>Done</button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
