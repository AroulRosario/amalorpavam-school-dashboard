import { motion } from 'framer-motion'
import { Rocket, ArrowLeft, ShieldAlert, Sparkles, Clock } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function ModuleAwaiting({ title = 'Module' }) {
    const { setActivePage } = useApp()

    return (
        <div className="dashboard-body" style={{
            height: 'calc(100vh - 120px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card"
                style={{
                    maxWidth: 480,
                    textAlign: 'center',
                    padding: '60px 40px',
                    borderRadius: 32,
                    boxShadow: '0 30px 60px rgba(0,0,0,0.1)',
                    border: '1.5px solid rgba(255,255,255,0.8)'
                }}
            >
                <div style={{
                    width: 100, height: 100, background: '#EEF2FF',
                    borderRadius: 30, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', margin: '0 auto 32px',
                    color: '#6366F1'
                }}>
                    <Rocket size={48} />
                </div>

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#E0F2FE', color: '#0369A1', padding: '6px 16px', borderRadius: 20, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', marginBottom: 20 }}>
                    <Clock size={12} /> Optimization in Progress
                </div>

                <h2 style={{ fontSize: 28, fontWeight: 900, color: '#0A2463', marginBottom: 16 }}>{title} Incoming!</h2>
                <p style={{ color: '#64748B', fontSize: 15, lineHeight: 1.6, marginBottom: 40 }}>
                    We're currently polishing this module to ensure it meets our **Ultra-Premium** standard. This feature will be live in the next production push.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <button
                        onClick={() => setActivePage('dashboard')}
                        className="btn btn-primary"
                        style={{ width: '100%', justifyContent: 'center', padding: '16px', borderRadius: 16 }}
                    >
                        <ArrowLeft size={18} /> Back to Dashboard
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 12, color: '#94A3B8', fontWeight: 600 }}>
                        <ShieldAlert size={14} /> System Protected Mode Active
                    </div>
                </div>

                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    style={{ position: 'absolute', top: -20, right: -20, opacity: 0.05, pointerEvents: 'none' }}
                >
                    <Sparkles size={120} />
                </motion.div>
            </motion.div>
        </div>
    )
}
