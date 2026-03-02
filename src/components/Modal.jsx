import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function Modal({ children, title, width = 520 }) {
    const { closeModal } = useApp()
    const overlayRef = useRef(null)

    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') closeModal() }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [closeModal])

    return (
        <div
            ref={overlayRef}
            onClick={(e) => { if (e.target === overlayRef.current) closeModal() }}
            style={{
                position: 'fixed', inset: 0, zIndex: 8888,
                background: 'rgba(7,24,69,.55)', backdropFilter: 'blur(4px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
                animation: 'fadeIn .2s ease',
            }}
        >
            <div style={{
                background: 'white', borderRadius: 20, width: '100%', maxWidth: width,
                boxShadow: '0 24px 64px rgba(7,24,69,.25)',
                animation: 'slideUp .25s cubic-bezier(.4,0,.2,1)',
                overflow: 'hidden',
            }}>
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '18px 24px', borderBottom: '1.5px solid #F1F5F9',
                    background: 'linear-gradient(135deg,#0A2463,#1034A6)',
                }}>
                    <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 16, fontWeight: 700, color: 'white' }}>{title}</span>
                    <button onClick={closeModal}
                        style={{
                            background: 'rgba(255,255,255,.15)', border: 'none', borderRadius: 8, width: 32, height: 32,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white'
                        }}>
                        <X size={16} />
                    </button>
                </div>
                <div style={{ padding: 24, maxHeight: '80vh', overflowY: 'auto' }}>
                    {children}
                </div>
            </div>
            <style>{`
        @keyframes fadeIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }
      `}</style>
        </div>
    )
}

// Form field helpers
export function Field({ label, children }) {
    return (
        <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.5px' }}>{label}</label>
            {children}
        </div>
    )
}

export function Input({ ...props }) {
    return (
        <input {...props} style={{
            width: '100%', padding: '9px 12px', border: '1.5px solid #E2E8F0',
            borderRadius: 8, fontSize: 13, color: '#0f172a', outline: 'none',
            fontFamily: 'Inter,sans-serif', transition: 'border-color .2s',
            ...props.style,
        }}
            onFocus={e => e.target.style.borderColor = '#1E50E2'}
            onBlur={e => e.target.style.borderColor = '#E2E8F0'}
        />
    )
}

export function Select({ children, ...props }) {
    return (
        <select {...props} style={{
            width: '100%', padding: '9px 12px', border: '1.5px solid #E2E8F0',
            borderRadius: 8, fontSize: 13, color: '#0f172a', outline: 'none',
            fontFamily: 'Inter,sans-serif', background: 'white',
            ...props.style,
        }}>
            {children}
        </select>
    )
}

export function Textarea({ ...props }) {
    return (
        <textarea {...props} style={{
            width: '100%', padding: '9px 12px', border: '1.5px solid #E2E8F0',
            borderRadius: 8, fontSize: 13, color: '#0f172a', outline: 'none',
            fontFamily: 'Inter,sans-serif', resize: 'vertical', minHeight: 80,
            ...props.style,
        }}
            onFocus={e => e.target.style.borderColor = '#1E50E2'}
            onBlur={e => e.target.style.borderColor = '#E2E8F0'}
        />
    )
}
