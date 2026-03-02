import { useState } from 'react'
import { useApp } from '../context/AppContext'

const roles = [
    { name: 'Super Admin', tag: 'super-admin', users: [{ name: 'Fr. Joseph A.', email: 'principal@amal.edu', active: true }], color: '#1E50E2', perms: ['All access'] },
    {
        name: 'Admin', tag: 'admin', users: [
            { name: 'Mrs. Selvi R.', email: 'selvi@amal.edu', active: true },
            { name: 'Mr. Kumar P.', email: 'kumar@amal.edu', active: true },
        ], color: '#8B5CF6', perms: ['Dashboard', 'Reports', 'Circulars']
    },
    {
        name: 'Teacher', tag: 'teacher', users: [
            { name: 'Ms. Anitha K.', email: 'anitha@amal.edu', active: true },
            { name: 'Mr. Rajan S.', email: 'rajan@amal.edu', active: true },
            { name: 'Ms. Priya M.', email: 'priya@amal.edu', active: false },
        ], color: '#10B981', perms: ['Attendance', 'Gradebook', 'Content']
    },
]

export default function UserManagementPage() {
    const { addToast, openModal } = useApp()
    const [tab, setTab] = useState('super-admin')
    const current = roles.find(r => r.tag === tab)

    return (
        <div className="dashboard-body">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 22, fontWeight: 800, color: '#0A2463' }}>User Management</h2>
                    <p style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>Manage admin, teacher and staff accounts</p>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                    <button className="btn btn-outline" onClick={() => openModal('roleManagement')}>🔑 Role Permissions</button>
                    <button className="btn btn-primary" onClick={() => addToast('New user invite sent!', 'success')}>+ Invite User</button>
                </div>
            </div>

            {/* Role tabs */}
            <div style={{ display: 'flex', gap: 8 }}>
                {roles.map(r => (
                    <button key={r.tag} className="btn"
                        style={{
                            background: tab === r.tag ? r.color : 'white', color: tab === r.tag ? 'white' : '#475569',
                            border: '1.5px solid ' + (tab === r.tag ? r.color : '#E2E8F0')
                        }}
                        onClick={() => setTab(r.tag)}>
                        {r.name} <span style={{ marginLeft: 6, background: tab === r.tag ? 'rgba(255,255,255,.25)' : '#F1F5F9', color: tab === r.tag ? 'white' : '#64748B', borderRadius: 99, padding: '0 7px', fontSize: 11, fontWeight: 700 }}>{r.users.length}</span>
                    </button>
                ))}
            </div>

            {current && (
                <>
                    {/* Permissions */}
                    <div className="card" style={{ padding: 16 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.5px' }}>Permissions for {current.name}</div>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {current.perms.map(p => <span key={p} className="tag tag-blue" style={{ fontSize: 12, padding: '4px 12px' }}>{p}</span>)}
                            <button className="btn btn-outline btn-sm" onClick={() => openModal('roleManagement')}>Edit Permissions</button>
                        </div>
                    </div>

                    {/* Users table */}
                    <div className="card">
                        <div className="card-header">
                            <div style={{ fontWeight: 700, fontSize: 14, color: '#0A2463' }}>{current.name} Accounts ({current.users.length})</div>
                            <button className="btn btn-primary btn-sm" onClick={() => addToast(`New ${current.name} user added!`, 'success')}>+ Add</button>
                        </div>
                        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {current.users.map((u, i) => (
                                <div key={i} style={{
                                    display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px',
                                    border: '1.5px solid #E2E8F0', borderRadius: 12, background: '#FAFAFA'
                                }}>
                                    <div style={{
                                        width: 40, height: 40, borderRadius: '50%', background: `${current.color}20`,
                                        border: `1.5px solid ${current.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontWeight: 800, color: current.color, fontSize: 15
                                    }}>
                                        {u.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 700, fontSize: 14, color: '#0F172A' }}>{u.name}</div>
                                        <div style={{ fontSize: 12, color: '#64748B' }}>{u.email}</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: u.active ? '#10B981' : '#94A3B8', display: 'inline-block' }} />
                                        <span style={{ fontSize: 12, color: u.active ? '#10B981' : '#94A3B8', fontWeight: 600 }}>{u.active ? 'Active' : 'Inactive'}</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: 6 }}>
                                        <button className="btn btn-outline btn-sm" onClick={() => addToast(`Editing ${u.name}…`, 'info')}>Edit</button>
                                        <button className="btn btn-sm" style={{ background: '#FEE2E2', color: '#EF4444', border: 'none' }}
                                            onClick={() => addToast(`${u.name} deactivated.`, 'warning')}>Disable</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
