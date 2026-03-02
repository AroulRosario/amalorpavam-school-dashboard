import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
    // --- Existing State ---
    const [students, setStudents] = useState([
        { id: 1, name: 'Kavya Nair', class: 'XII-A', roll: '04', fee: 'Paid', status: 'Active' },
        { id: 2, name: 'Rahul Verma', class: 'XII-A', roll: '12', fee: 'Pending', status: 'Active' },
        { id: 3, name: 'Aditi Rao', class: 'XI-B', roll: '07', fee: 'Overdue', status: 'Active' },
        { id: 4, name: 'Sanjay Kumar', class: 'X-A', roll: '22', fee: 'Paid', status: 'Inactive' },
    ])

    const [events, setEvents] = useState([
        { id: 1, day: '08', month: 'Mar', year: 2026, name: 'Annual Sports Meet', desc: 'Main Ground · 9:00 AM', type: 'Sports' },
        { id: 2, day: '15', month: 'Mar', year: 2026, name: 'Term 2 Examinations', desc: 'All Classes', type: 'Exam' },
        { id: 3, day: '22', month: 'Mar', year: 2026, name: 'Science Exhibition', desc: 'Auditorium', type: 'Academic' },
    ])

    const [appointments, setAppointments] = useState([
        { id: 1, name: 'Mr. Rajesh (Parent)', date: '2026-03-05', time: '10:30', type: 'Parent Meet', status: 'Confirmed' },
        { id: 2, name: 'Ms. Sunitha (Teacher)', date: '2026-03-05', time: '11:45', type: 'Staff Review', status: 'Pending' },
    ])

    const [inventory, setInventory] = useState([
        { id: 1, name: 'School Tie', stock: 45, price: 150, min: 20 },
        { id: 2, name: 'Notebook (Long size)', stock: 120, price: 65, min: 50 },
        { id: 3, name: 'White Shirt (Size 36)', stock: 12, price: 450, min: 15 },
    ])

    const [content, setContent] = useState([
        { id: 1, title: 'Integration Basics', sub: 'Mathematics', type: 'PDF', date: 'Feb 20', teacher: 'Ms. Anitha K.' },
        { id: 2, title: 'Optics Lecture', sub: 'Physics', type: 'Video', date: 'Feb 22', teacher: 'Mr. Rajan S.' },
        { id: 3, title: 'Organic Chem PPT', sub: 'Chemistry', type: 'PPT', date: 'Feb 18', teacher: 'Ms. Priya M.' },
    ])

    const [homework, setHomework] = useState([
        { id: 1, sub: 'Mathematics', topic: 'Exercise 8.2', deadline: 'Mar 04', done: false },
        { id: 2, sub: 'Physics', topic: 'Ray Diagrams', deadline: 'Mar 05', done: true },
        { id: 3, sub: 'English', topic: 'Essay on AI', deadline: 'Mar 06', done: false },
    ])

    const [attendance, setAttendance] = useState({
        'XII-A': { '1': true, '2': false, '3': true, '4': true }
    })

    const [gradebook, setGradebook] = useState({})

    // --- NEW Advanced State ---
    const [news, setNews] = useState([
        { id: 1, title: 'School Reopens after Holidays', date: 'Mar 01, 2026', type: 'General', content: 'We welcome all students back for the new term! Please ensure uniforms are strictly followed.', urgent: true },
        { id: 2, title: 'Volleyball District Champions!', date: 'Feb 28, 2026', type: 'Sports', content: 'Our senior boys team has clinced the district trophy. Celebration on Monday.', image: true },
        { id: 3, title: 'Inter-School Debate RSVP', date: 'Mar 02, 2026', type: 'Event', content: 'Register your names with the humanities department by EOD.', urgent: false }
    ])

    const [liveClasses, setLiveClasses] = useState([
        { id: 1, subject: 'Mathematics', teacher: 'Ms. Anitha K.', time: '09:30 AM', status: 'Live', link: '#' },
        { id: 2, subject: 'Physics', teacher: 'Mr. Rajan S.', time: '11:00 AM', status: 'Scheduled', link: '#' }
    ])

    const [appConfig, setAppConfig] = useState({
        smsEnabled: true,
        emailEnabled: true,
        gpsEnabled: true,
        studentAppBroadcast: 'Stay safe and keep learning!'
    })

    // --- UI State ---
    const [activePage, setActivePage] = useState('dashboard')
    const [toasts, setToasts] = useState([])
    const [modal, setModal] = useState(null)
    const [chartPeriod, setChartPeriod] = useState('Monthly')

    // --- System Helpers ---
    const addToast = (msg, type = 'success') => {
        const id = Date.now()
        setToasts(t => [...t, { id, msg, type }])
        setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000)
    }

    const openModal = (type, data = null) => setModal({ type, data })
    const closeModal = () => setModal(null)

    // --- Data Handlers ---
    const addStudent = (s) => setStudents(prev => [...prev, { ...s, id: Date.now(), status: 'Active' }])
    const deleteStudent = (id) => setStudents(prev => prev.filter(s => s.id !== id))

    const addEvent = (e) => setEvents(prev => [...prev, { ...e, id: Date.now() }])
    const deleteEvent = (id) => setEvents(prev => prev.filter(e => e.id !== id))

    const addAppointment = (a) => setAppointments(prev => [...prev, { ...a, id: Date.now(), status: 'Pending' }])
    const updateAppointment = (id, status) => setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a))

    const updateInventory = (id, delta) => setInventory(prev => prev.map(inv => inv.id === id ? { ...inv, stock: Math.max(0, inv.stock + delta) } : inv))

    const addContent = (c) => setContent(prev => [{ ...c, id: Date.now(), date: 'Today' }, ...prev])

    const toggleHomework = (id) => setHomework(prev => prev.map(h => h.id === id ? { ...h, done: !h.done } : h))

    const toggleAttendance = (cls, sid) => setAttendance(prev => {
        const clsAtt = { ...prev[cls] }
        clsAtt[sid] = !clsAtt[sid]
        return { ...prev, [cls]: clsAtt }
    })

    const saveGrades = (cls, grades) => setGradebook(prev => ({ ...prev, [cls]: grades }))

    // --- NEWS & LIVE CLASS HANDLERS ---
    const addNews = (n) => setNews(prev => [{ ...n, id: Date.now(), date: new Date().toLocaleDateString() }, ...prev])
    const updateLiveClass = (id, status) => setLiveClasses(prev => prev.map(c => c.id === id ? { ...c, status } : c))
    const broadcastMsg = (msg) => setAppConfig(prev => ({ ...prev, studentAppBroadcast: msg }))

    return (
        <AppContext.Provider value={{
            students, addStudent, deleteStudent,
            events, addEvent, deleteEvent,
            appointments, addAppointment, updateAppointment,
            inventory, updateInventory,
            content, addContent,
            homework, toggleHomework,
            attendance, toggleAttendance,
            gradebook, saveGrades,
            news, addNews,
            liveClasses, updateLiveClass,
            appConfig, setAppConfig, broadcastMsg,
            activePage, setActivePage,
            toasts, addToast,
            modal, openModal, closeModal,
            chartPeriod, setChartPeriod
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useApp = () => useContext(AppContext)
