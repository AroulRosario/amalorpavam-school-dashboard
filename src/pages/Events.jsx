import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Plus, Trash2, CheckCircle, XCircle, Clock } from 'lucide-react'

export default function EventsPage() {
    const { events, deleteEvent, appointments, updateAppointmentStatus, openModal, addToast } = useApp()

    const typeColor = { Academic: 'blue', Sports: 'green', Cultural: 'amber', Meeting: 'blue', Exam: 'red', Holiday: 'green', Other: 'amber' }
    const statusColor = { Confirmed: 'green', Pending: 'amber', Scheduled: 'blue', Cancelled: 'red' }

    return (
        <div className="dashboard-body">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 22, fontWeight: 800, color: '#0A2463' }}>Events & Calendar</h2>
                    <p style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>{events.length} upcoming events · {appointments.length} principal appointments</p>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                    <button className="btn btn-outline" onClick={() => openModal('addAppointment')}>🏛️ Book Appointment</button>
                    <button className="btn btn-primary" onClick={() => openModal('addEvent')}><Plus size={14} /> Add Event</button>
                </div>
            </div>

            {/* Events grid */}
            <div className="card">
                <div className="card-header">
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#0A2463' }}>📅 Scheduled Events</div>
                </div>
                <div style={{ padding: 16, display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
                    {events.length === 0 && <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#94A3B8', padding: 32 }}>No events scheduled.</div>}
                    {events.map(e => (
                        <div key={e.id} style={{ border: '1.5px solid #E2E8F0', borderRadius: 14, padding: 16, display: 'flex', gap: 14, background: '#FAFAFA' }}>
                            <div style={{ background: '#E8EFFD', border: '1.5px solid #BFDBFE', borderRadius: 10, width: 52, textAlign: 'center', padding: '8px 4px', flexShrink: 0 }}>
                                <div style={{ fontSize: 22, fontWeight: 800, color: '#1034A6', lineHeight: 1, fontFamily: 'Outfit,sans-serif' }}>{e.day}</div>
                                <div style={{ fontSize: 11, color: '#1E50E2', fontWeight: 700, textTransform: 'uppercase' }}>{e.month}</div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 700, fontSize: 14, color: '#0F172A', marginBottom: 4 }}>{e.name}</div>
                                <div style={{ fontSize: 12, color: '#64748B', marginBottom: 8 }}>{e.desc || 'No description'}</div>
                                <span className={`chip chip-${typeColor[e.type] || 'blue'}`} style={{ fontSize: 10 }}>{e.type}</span>
                            </div>
                            <button onClick={() => { deleteEvent(e.id); addToast('Event removed.', 'warning') }}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', alignSelf: 'flex-start' }}>
                                <Trash2 size={15} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Appointments */}
            <div className="card">
                <div className="card-header">
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#0A2463' }}>🏛️ Principal Appointments</div>
                    <button className="btn btn-primary btn-sm" onClick={() => openModal('addAppointment')}><Plus size={12} /> Book</button>
                </div>
                <div className="table-wrap">
                    <table>
                        <thead><tr>
                            <th>Visitor</th><th>Date</th><th>Time</th><th>Type</th><th>Status</th><th>Actions</th>
                        </tr></thead>
                        <tbody>
                            {appointments.map(a => (
                                <tr key={a.id}>
                                    <td style={{ fontWeight: 600 }}>{a.name}</td>
                                    <td>{a.date}</td>
                                    <td>{a.time}</td>
                                    <td><span className="chip chip-blue" style={{ fontSize: 11 }}>{a.type}</span></td>
                                    <td><span className={`chip chip-${statusColor[a.status]}`}>{a.status}</span></td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 6 }}>
                                            {a.status === 'Pending' && <>
                                                <button className="btn btn-green btn-sm"
                                                    onClick={() => { updateAppointmentStatus(a.id, 'Confirmed'); addToast('Appointment confirmed!', 'success') }}>
                                                    <CheckCircle size={12} /> Confirm
                                                </button>
                                                <button className="btn btn-sm" style={{ background: '#FEE2E2', color: '#EF4444', border: 'none' }}
                                                    onClick={() => { updateAppointmentStatus(a.id, 'Cancelled'); addToast('Appointment cancelled.', 'warning') }}>
                                                    <XCircle size={12} /> Cancel
                                                </button>
                                            </>}
                                            {a.status === 'Scheduled' && <button className="btn btn-outline btn-sm"
                                                onClick={() => { updateAppointmentStatus(a.id, 'Confirmed'); addToast('Appointment confirmed!', 'success') }}>
                                                <Clock size={12} /> Confirm
                                            </button>}
                                            {(a.status === 'Confirmed' || a.status === 'Cancelled') && (
                                                <span style={{ fontSize: 12, color: '#94A3B8' }}>—</span>
                                            )}
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
