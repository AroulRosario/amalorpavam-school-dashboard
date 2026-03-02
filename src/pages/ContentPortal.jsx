import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Upload, Trash2, Download, Play, FileText, Zap } from 'lucide-react'

const typeIcon = { PDF: '📄', PPT: '📊', Video: '🎬', Audio: '🎙️', Flash: '⚡' }
const typeColor = { PDF: '#EF4444', PPT: '#F59E0B', Video: '#8B5CF6', Audio: '#10B981', Flash: '#1E50E2' }

export default function ContentPage() {
    const { content, openModal, addToast } = useApp()
    const [filterType, setFilterType] = useState('All')
    const [filterSubject, setFilterSubject] = useState('All')

    const subjects = ['All', ...new Set(content.map(c => c.subject))]
    const types = ['All', 'PDF', 'PPT', 'Video', 'Audio']

    const filtered = content.filter(c =>
        (filterType === 'All' || c.type === filterType) &&
        (filterSubject === 'All' || c.subject === filterSubject)
    )

    return (
        <div className="dashboard-body">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 22, fontWeight: 800, color: '#0A2463' }}>Content Portal</h2>
                    <p style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>{content.length} resources · PPTs, PDFs, Videos & more</p>
                </div>
                <button className="btn btn-primary" onClick={() => openModal('uploadContent')}>
                    <Upload size={14} /> Upload Content
                </button>
            </div>

            {/* Type filter tabs */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {types.map(t => (
                    <button key={t} className="btn btn-sm"
                        style={{
                            background: filterType === t ? '#1E50E2' : 'white', color: filterType === t ? 'white' : '#475569',
                            border: '1.5px solid ' + (filterType === t ? '#1E50E2' : '#E2E8F0')
                        }}
                        onClick={() => setFilterType(t)}>
                        {t !== 'All' && <span>{typeIcon[t]} </span>}{t}
                    </button>
                ))}
                <select className="btn btn-outline btn-sm"
                    value={filterSubject} onChange={e => setFilterSubject(e.target.value)}
                    style={{ padding: '5px 12px', fontSize: 12 }}>
                    {subjects.map(s => <option key={s}>{s}</option>)}
                </select>
            </div>

            {/* Content grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }}>
                {filtered.length === 0 && (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#94A3B8', padding: 40, background: 'white', borderRadius: 16, border: '1.5px solid #E2E8F0' }}>
                        No content found for these filters.
                    </div>
                )}
                {filtered.map(c => (
                    <div key={c.id} style={{ background: 'white', border: '1.5px solid #E2E8F0', borderRadius: 16, padding: 18, display: 'flex', gap: 14 }}>
                        <div style={{
                            width: 52, height: 52, borderRadius: 12, background: `${typeColor[c.type]}18`,
                            border: `1.5px solid ${typeColor[c.type]}40`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 22, flexShrink: 0
                        }}>
                            {typeIcon[c.type]}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: 700, fontSize: 14, color: '#0F172A', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.title}</div>
                            <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
                                <span className="chip chip-blue" style={{ fontSize: 10 }}>{c.subject}</span>
                                <span className="chip chip-green" style={{ fontSize: 10 }}>{c.class}</span>
                                <span style={{ fontSize: 10, color: '#94A3B8' }}>by {c.teacher}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: 11, color: '#94A3B8' }}>{c.date} · {c.downloads} downloads</span>
                                <div style={{ display: 'flex', gap: 6 }}>
                                    <button className="btn btn-sm" style={{ background: '#E8EFFD', color: '#1E50E2', border: 'none' }}
                                        onClick={() => addToast(`Opening "${c.title}"…`, 'info')}>
                                        <Play size={11} /> View
                                    </button>
                                    <button className="btn btn-sm" style={{ background: '#D1FAE5', color: '#059669', border: 'none' }}
                                        onClick={() => addToast(`Downloading "${c.title}"…`, 'success')}>
                                        <Download size={11} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Upload more CTA */}
            <div style={{ border: '2px dashed #CBD5E1', borderRadius: 16, padding: 28, textAlign: 'center', cursor: 'pointer', background: '#FAFAFA', transition: 'all .2s' }}
                onClick={() => openModal('uploadContent')}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#1E50E2'; e.currentTarget.style.background = '#F0F5FF' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#CBD5E1'; e.currentTarget.style.background = '#FAFAFA' }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>📤</div>
                <div style={{ fontWeight: 700, color: '#475569', fontSize: 14, marginBottom: 4 }}>Upload New Resource</div>
                <div style={{ fontSize: 12, color: '#94A3B8' }}>PPT · PDF · Video · Audio · Microlearning modules</div>
            </div>
        </div>
    )
}
