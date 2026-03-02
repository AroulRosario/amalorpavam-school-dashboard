import { createContext, useContext, useState, useCallback } from 'react'

const AppContext = createContext(null)

// ── Initial Data ─────────────────────────────────────────────
const initialStudents = [
    { id: 1, name: 'Kavya Nair', class: 'XII-A', roll: '04', gender: 'Female', phone: '98400-11111', fee: 'Paid', avg: 98.4, attendance: 97 },
    { id: 2, name: 'Arjun Mehta', class: 'XII-A', roll: '07', gender: 'Male', phone: '98400-22222', fee: 'Paid', avg: 97.1, attendance: 94 },
    { id: 3, name: 'Sneha Pillai', class: 'XII-B', roll: '12', gender: 'Female', phone: '98400-33333', fee: 'Pending', avg: 96.8, attendance: 91 },
    { id: 4, name: 'Rohan Das', class: 'XI-A', roll: '02', gender: 'Male', phone: '98400-44444', fee: 'Paid', avg: 95.2, attendance: 89 },
    { id: 5, name: 'Priya Kumar', class: 'XI-B', roll: '09', gender: 'Female', phone: '98400-55555', fee: 'Overdue', avg: 91.0, attendance: 85 },
    { id: 6, name: 'Aditya Rajan', class: 'X-A', roll: '01', gender: 'Male', phone: '98400-66666', fee: 'Paid', avg: 88.5, attendance: 92 },
]

const initialEvents = [
    { id: 1, day: '08', month: 'Mar', year: 2026, name: 'Annual Sports Day', desc: 'Ground A — All students', type: 'Sports' },
    { id: 2, day: '15', month: 'Mar', year: 2026, name: 'Science Exhibition', desc: 'Main Hall — Classes IX-XII', type: 'Academic' },
    { id: 3, day: '22', month: 'Mar', year: 2026, name: 'Parent-Teacher Meet', desc: 'Conference Hall', type: 'Meeting' },
    { id: 4, day: '28', month: 'Mar', year: 2026, name: 'Board Exam Prep Test', desc: 'Class XII — All subjects', type: 'Exam' },
]

const initialAppointments = [
    { id: 1, name: 'Mr. Senthil (Parent)', time: '9:30 AM', date: 'Today', type: 'Parent Meet', status: 'Confirmed' },
    { id: 2, name: 'Ms. Rekha T. (Staff)', time: '11:00 AM', date: 'Today', type: 'Staff Review', status: 'Confirmed' },
    { id: 3, name: 'Parent — Arjun M.', time: '2:30 PM', date: 'Tomorrow', type: 'Academic', status: 'Pending' },
    { id: 4, name: 'Govt. Inspector', time: '10:00 AM', date: 'Mar 5', type: 'Inspection', status: 'Scheduled' },
]

const initialInventory = [
    { id: 1, icon: '👕', name: 'School Uniform', stock: 148, orders: 12, price: 850 },
    { id: 2, icon: '📓', name: 'Notebooks (Set)', stock: 312, orders: 28, price: 120 },
    { id: 3, icon: '📚', name: 'Textbooks', stock: 200, orders: 45, price: 460 },
    { id: 4, icon: '🖊️', name: 'Stationery Kit', stock: 400, orders: 8, price: 85 },
]

const initialContent = [
    { id: 1, type: 'PDF', title: 'Wave Optics — Complete Notes', subject: 'Physics', class: 'XII-A', teacher: 'Mr. Rajan S.', date: '2026-03-01', downloads: 38 },
    { id: 2, type: 'PPT', title: 'Integration Techniques', subject: 'Maths', class: 'XII-A', teacher: 'Ms. Anitha K.', date: '2026-02-28', downloads: 42 },
    { id: 3, type: 'Video', title: 'Aldehyde Reactions Explained', subject: 'Chemistry', class: 'XII-B', teacher: 'Ms. Priya M.', date: '2026-02-27', downloads: 29 },
    { id: 4, type: 'PDF', title: 'Cell Division — Diagrams', subject: 'Biology', class: 'XI-A', teacher: 'Mr. Arun T.', date: '2026-02-25', downloads: 21 },
]

const initialHomework = [
    { id: 1, done: true, sub: 'Mathematics', topic: 'Ch.7 Integration – Ex 7.3' },
    { id: 2, done: false, sub: 'Physics', topic: 'Wave Optics – 5 numericals' },
    { id: 3, done: false, sub: 'Chemistry', topic: 'Aldehyde reactions summary' },
    { id: 4, done: true, sub: 'English', topic: 'Essay — Climate Change' },
]

const initialAttendance = {
    'Kavya Nair': { present: true, roll: '04' },
    'Arjun Mehta': { present: true, roll: '07' },
    'Sneha Pillai': { present: false, roll: '12' },
    'Rohan Das': { present: true, roll: '02' },
    'Priya Kumar': { present: false, roll: '09' },
    'Aditya Rajan': { present: true, roll: '01' },
}

export function AppProvider({ children }) {
    const [activePage, setActivePage] = useState('dashboard')
    const [toasts, setToasts] = useState([])
    const [modal, setModal] = useState(null)   // { type, data }
    const [students, setStudents] = useState(initialStudents)
    const [events, setEvents] = useState(initialEvents)
    const [appointments, setAppointments] = useState(initialAppointments)
    const [inventory, setInventory] = useState(initialInventory)
    const [content, setContent] = useState(initialContent)
    const [homework, setHomework] = useState(initialHomework)
    const [attendance, setAttendance] = useState(initialAttendance)
    const [chartPeriod, setChartPeriod] = useState('Monthly')
    const [gradebook, setGradebook] = useState({})

    const addToast = useCallback((message, type = 'success', duration = 3500) => {
        const id = Date.now()
        setToasts(t => [...t, { id, message, type }])
        setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), duration)
    }, [])

    const openModal = useCallback((type, data = {}) => setModal({ type, data }), [])
    const closeModal = useCallback(() => setModal(null), [])

    const addStudent = useCallback((s) => {
        setStudents(prev => [...prev, { ...s, id: Date.now(), avg: 0, attendance: 100 }])
    }, [])

    const deleteStudent = useCallback((id) => {
        setStudents(prev => prev.filter(s => s.id !== id))
    }, [])

    const addEvent = useCallback((e) => {
        setEvents(prev => [...prev, { ...e, id: Date.now() }])
    }, [])

    const deleteEvent = useCallback((id) => {
        setEvents(prev => prev.filter(e => e.id !== id))
    }, [])

    const addAppointment = useCallback((a) => {
        setAppointments(prev => [...prev, { ...a, id: Date.now(), status: 'Pending' }])
    }, [])

    const updateAppointmentStatus = useCallback((id, status) => {
        setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a))
    }, [])

    const updateInventoryStock = useCallback((id, delta) => {
        setInventory(prev => prev.map(item => item.id === id
            ? { ...item, stock: Math.max(0, item.stock + delta), orders: item.orders + (delta < 0 ? 1 : 0) }
            : item))
    }, [])

    const addContent = useCallback((c) => {
        setContent(prev => [{ ...c, id: Date.now(), downloads: 0, date: new Date().toISOString().slice(0, 10) }, ...prev])
    }, [])

    const toggleHomework = useCallback((id) => {
        setHomework(prev => prev.map(h => h.id === id ? { ...h, done: !h.done } : h))
    }, [])

    const toggleAttendance = useCallback((name) => {
        setAttendance(prev => ({ ...prev, [name]: { ...prev[name], present: !prev[name].present } }))
    }, [])

    const saveGrades = useCallback((classId, grades) => {
        setGradebook(prev => ({ ...prev, [classId]: grades }))
    }, [])

    return (
        <AppContext.Provider value={{
            activePage, setActivePage,
            toasts, addToast,
            modal, openModal, closeModal,
            students, addStudent, deleteStudent,
            events, addEvent, deleteEvent,
            appointments, addAppointment, updateAppointmentStatus,
            inventory, updateInventoryStock,
            content, addContent,
            homework, toggleHomework,
            attendance, toggleAttendance,
            chartPeriod, setChartPeriod,
            gradebook, saveGrades,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export function useApp() {
    const ctx = useContext(AppContext)
    if (!ctx) throw new Error('useApp must be inside AppProvider')
    return ctx
}
