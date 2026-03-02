import { useState } from 'react'
import { useApp } from '../context/AppContext'

const monthlyData = [
    { label: 'Jun', score: 68 }, { label: 'Jul', score: 72 }, { label: 'Aug', score: 69 },
    { label: 'Sep', score: 78 }, { label: 'Oct', score: 82 }, { label: 'Nov', score: 85 },
    { label: 'Dec', score: 79 }, { label: 'Jan', score: 88 }, { label: 'Feb', score: 91 },
]
const termData = [
    { label: 'Term 1', score: 72, col: '#1E50E2' },
    { label: 'Term 2', score: 81, col: '#10B981' },
    { label: 'Term 3', score: 89, col: '#F59E0B' },
]
const classData = [
    { label: 'X-A', score: 84 }, { label: 'X-B', score: 79 },
    { label: 'XI-A', score: 88 }, { label: 'XI-B', score: 82 },
    { label: 'XII-A', score: 92 }, { label: 'XII-B', score: 87 },
]
const subjectData = [
    { label: 'Maths', score: 88, col: '#1E50E2' },
    { label: 'Physics', score: 81, col: '#8B5CF6' },
    { label: 'Chem', score: 79, col: '#10B981' },
    { label: 'Bio', score: 85, col: '#F59E0B' },
    { label: 'Eng', score: 92, col: '#EF4444' },
]
const teachers = [
    { name: 'Ms. Anitha K.', subject: 'Mathematics', score: 94, trend: 3 },
    { name: 'Mr. Rajan S.', subject: 'Physics', score: 88, trend: 2 },
    { name: 'Ms. Priya M.', subject: 'Chemistry', score: 85, trend: -1 },
    { name: 'Mr. Arun T.', subject: 'Biology', score: 91, trend: 2 },
    { name: 'Ms. Leela V.', subject: 'English', score: 96, trend: 4 },
]

function BarChart({ data, height = 140, highlight = '#1E50E2' }) {
    const max = Math.max(...data.map(d => d.score))
    return (
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height, paddingTop: 16, paddingBottom: 4 }}>
            {data.map((d, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1 }}>
                    <span style={{ fontSize: 10, color: '#64748B', fontWeight: 700 }}>{d.score}</span>
                    <div style={{ width: '100%', borderRadius: '4px 4px 0 0', background: d.col || highlight, height: `${(d.score / max) * 100}%`, minHeight: 4, transition: 'height .5s ease' }} />
                    <span style={{ fontSize: 10, color: '#94A3B8', fontWeight: 500 }}>{d.label}</span>
                </div>
            ))}
        </div>
    )
}

export default function AnalyticsPage() {
    const { chartPeriod, setChartPeriod, addToast } = useApp()

    return (
        <div className="dashboard-body">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 22, fontWeight: 800, color: '#0A2463' }}>Analytics & Performance</h2>
                    <p style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>Academic performance across classes, subjects and teachers</p>
                </div>
                <button className="btn btn-outline" onClick={() => addToast('Analytics report exported!', 'success')}>⬇ Export Report</button>
            </div>

            {/* Period toggle */}
            <div style={{ display: 'flex', gap: 8 }}>
                {['Monthly', 'Term', 'Class'].map(p => (
                    <button key={p} className="btn"
                        style={{
                            background: chartPeriod === p ? '#0A2463' : 'white', color: chartPeriod === p ? 'white' : '#475569',
                            border: '1.5px solid ' + (chartPeriod === p ? '#0A2463' : '#E2E8F0')
                        }}
                        onClick={() => setChartPeriod(p)}>
                        {p}
                    </button>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
                {/* Main chart */}
                <div className="card">
                    <div className="card-header">
                        <div style={{ fontWeight: 700, fontSize: 14, color: '#0A2463' }}>
                            {chartPeriod === 'Monthly' ? '📈 Monthly Performance Trend' :
                                chartPeriod === 'Term' ? '📊 Term-wise Performance' :
                                    '🏫 Class-wise Performance'}
                        </div>
                        <div style={{ display: 'flex', gap: 12, fontSize: 12 }}>
                            <span style={{ color: '#10B981', fontWeight: 700 }}>↑ Highest: {
                                (chartPeriod === 'Monthly' ? monthlyData : chartPeriod === 'Term' ? termData : classData).reduce((a, b) => a.score > b.score ? a : b).score
                            }%</span>
                            <span style={{ color: '#64748B' }}>Avg: {
                                Math.round((chartPeriod === 'Monthly' ? monthlyData : chartPeriod === 'Term' ? termData : classData).reduce((s, d) => s + d.score, 0) /
                                    (chartPeriod === 'Monthly' ? monthlyData : chartPeriod === 'Term' ? termData : classData).length)
                            }%</span>
                        </div>
                    </div>
                    <div className="card-body">
                        <BarChart
                            data={chartPeriod === 'Monthly' ? monthlyData : chartPeriod === 'Term' ? termData : classData}
                            height={180}
                        />
                    </div>
                </div>

                {/* Subject breakdown */}
                <div className="card">
                    <div className="card-header">
                        <div style={{ fontWeight: 700, fontSize: 14, color: '#0A2463' }}>📚 Subject Avg</div>
                    </div>
                    <div className="card-body">
                        {subjectData.map((s, i) => (
                            <div key={i} style={{ marginBottom: 14 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 12 }}>
                                    <span style={{ fontWeight: 700, color: '#334155' }}>{s.label}</span>
                                    <span style={{ fontWeight: 800, color: s.col }}>{s.score}%</span>
                                </div>
                                <div className="progress-bar" style={{ height: 8 }}>
                                    <div className="progress-fill" style={{ width: `${s.score}%`, background: s.col }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Teacher performance */}
            <div className="card">
                <div className="card-header">
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#0A2463' }}>👨‍🏫 Teacher Performance (based on student results)</div>
                    <span className="chip chip-blue">Academic Year 2025-26</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 16, padding: 20 }}>
                    {teachers.map((t, i) => (
                        <div key={i} style={{ textAlign: 'center', padding: 16, background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: 14 }}>
                            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,#1034A6,#4F83EE)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 15, margin: '0 auto 10px' }}>
                                {t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                            <div style={{ fontWeight: 800, fontSize: 13, color: '#0F172A', marginBottom: 2 }}>{t.name}</div>
                            <div style={{ fontSize: 11, color: '#64748B', marginBottom: 10 }}>{t.subject}</div>
                            <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 26, fontWeight: 800, color: t.score >= 90 ? '#10B981' : '#1E50E2' }}>{t.score}</div>
                            <div style={{ fontSize: 11, color: t.trend > 0 ? '#10B981' : '#EF4444', fontWeight: 700, marginTop: 4 }}>
                                {t.trend > 0 ? `↑ +${t.trend}` : `↓ ${t.trend}`} pts
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Attendance summary */}
            <div className="card">
                <div className="card-header">
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#0A2463' }}>📋 Attendance Summary</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 0 }}>
                    {[
                        { label: 'Overall Attendance', val: '91.4%', sub: 'School-wide average', col: '#10B981' },
                        { label: 'Above 90%', val: '892', sub: 'Students well-attended', col: '#1E50E2' },
                        { label: 'Below 75%', val: '23', sub: 'At-risk students', col: '#EF4444' },
                    ].map((s, i) => (
                        <div key={i} style={{ padding: 20, textAlign: 'center', borderRight: i < 2 ? '1px solid #F1F5F9' : 'none' }}>
                            <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 30, fontWeight: 800, color: s.col, marginBottom: 4 }}>{s.val}</div>
                            <div style={{ fontWeight: 700, fontSize: 13, color: '#334155' }}>{s.label}</div>
                            <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>{s.sub}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
