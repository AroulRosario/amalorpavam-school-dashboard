import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

// Shared keys for cross-app "database" simulation
const STUDENT_DB_KEY = 'amal_student_db'
const TEACHER_DB_KEY = 'amal_teacher_db'
const HOMEWORK_DB_KEY = 'amal_homework_db'
const NEWS_DB_KEY = 'amal_news_db'
const LIVE_CLASSES_DB_KEY = 'amal_live_classes_db'
const APP_CONFIG_DB_KEY = 'amal_app_config_db'
const EXAM_DB_KEY = 'amal_exam_db'
const TIMETABLE_DB_KEY = 'amal_timetable_db'
const TEACHER_PERMS_DB_KEY = 'amal_teacher_perms_db'

// Default permission set for new teachers
const DEFAULT_PERMS = { homework: true, markEntry: true, attendance: true, contentUpload: false, timetableView: true, studentPerformance: true }

export function AppProvider({ children }) {
    // ── Students ──────────────────────────────────
    const [students, setStudents] = useState(() => {
        const saved = localStorage.getItem(STUDENT_DB_KEY)
        if (saved) return JSON.parse(saved)
        return [
            { id: 1, name: 'Kavya Nair', class: 'XII-A', roll: '04', gender: 'Female', phone: '9876543210', avg: 94, attendance: 98, fee: 'Paid', status: 'Active', email: 'kavya@student.ahss.edu', password: 'password123', teacherId: 1 },
            { id: 2, name: 'Rahul Verma', class: 'XII-A', roll: '12', gender: 'Male', phone: '9876543211', avg: 82, attendance: 85, fee: 'Pending', status: 'Active', email: 'rahul@student.ahss.edu', password: 'password123', teacherId: 1 },
            { id: 3, name: 'Aditi Rao', class: 'XI-B', roll: '07', gender: 'Female', phone: '9876543212', avg: 75, attendance: 90, fee: 'Overdue', status: 'Active', email: 'aditi@student.ahss.edu', password: 'password123', teacherId: 2 },
            { id: 4, name: 'Sanjay Kumar', class: 'X-A', roll: '22', gender: 'Male', phone: '9876543213', avg: 68, attendance: 72, fee: 'Paid', status: 'Inactive', email: 'sanjay@student.ahss.edu', password: 'password123', teacherId: null },
        ]
    })
    useEffect(() => { localStorage.setItem(STUDENT_DB_KEY, JSON.stringify(students)) }, [students])

    // ── Teachers ──────────────────────────────────
    const [teachers, setTeachers] = useState(() => {
        const saved = localStorage.getItem(TEACHER_DB_KEY)
        if (saved) return JSON.parse(saved)
        return [
            { id: 1, name: 'Ms. Anitha K.', email: 'anitha@amal.edu', password: 'teacher123', subjects: ['Mathematics'], classes: ['XII-A', 'X-B'], active: true },
            { id: 2, name: 'Mr. Rajan S.', email: 'rajan@amal.edu', password: 'teacher123', subjects: ['Physics'], classes: ['XI-B', 'XII-A'], active: true },
            { id: 3, name: 'Ms. Priya M.', email: 'priya@amal.edu', password: 'teacher123', subjects: ['Chemistry'], classes: ['XII-A'], active: false },
        ]
    })
    useEffect(() => { localStorage.setItem(TEACHER_DB_KEY, JSON.stringify(teachers)) }, [teachers])

    // ── Teacher Permissions ──────────────────────
    const [teacherPerms, setTeacherPerms] = useState(() => {
        const saved = localStorage.getItem(TEACHER_PERMS_DB_KEY)
        if (saved) return JSON.parse(saved)
        return { 1: { ...DEFAULT_PERMS }, 2: { ...DEFAULT_PERMS }, 3: { ...DEFAULT_PERMS } }
    })
    useEffect(() => { localStorage.setItem(TEACHER_PERMS_DB_KEY, JSON.stringify(teacherPerms)) }, [teacherPerms])

    // ── Timetable ────────────────────────────────
    const [timetable, setTimetable] = useState(() => {
        const saved = localStorage.getItem(TIMETABLE_DB_KEY)
        if (saved) return JSON.parse(saved)
        return [
            {
                id: 1, class: 'XII-A', day: 'Monday', periods: [
                    { time: '08:30 – 09:15', subject: 'Mathematics', teacherId: 1 },
                    { time: '09:15 – 10:00', subject: 'Physics', teacherId: 2 },
                    { time: '10:15 – 11:00', subject: 'Chemistry', teacherId: 3 },
                    { time: '11:00 – 11:45', subject: 'English', teacherId: null },
                    { time: '12:30 – 01:15', subject: 'Computer Science', teacherId: null },
                    { time: '01:15 – 02:00', subject: 'Physical Education', teacherId: null },
                ]
            },
            {
                id: 2, class: 'XII-A', day: 'Tuesday', periods: [
                    { time: '08:30 – 09:15', subject: 'Physics', teacherId: 2 },
                    { time: '09:15 – 10:00', subject: 'Mathematics', teacherId: 1 },
                    { time: '10:15 – 11:00', subject: 'English', teacherId: null },
                    { time: '11:00 – 11:45', subject: 'Chemistry', teacherId: 3 },
                    { time: '12:30 – 01:15', subject: 'Tamil', teacherId: null },
                    { time: '01:15 – 02:00', subject: 'Mathematics', teacherId: 1 },
                ]
            },
        ]
    })
    useEffect(() => { localStorage.setItem(TIMETABLE_DB_KEY, JSON.stringify(timetable)) }, [timetable])

    // ── Events ───────────────────────────────────
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

    // ── Homework (per-student assignment) ────────
    const [homework, setHomework] = useState(() => {
        const saved = localStorage.getItem(HOMEWORK_DB_KEY)
        if (saved) return JSON.parse(saved)
        return [
            { id: 1, sub: 'Mathematics', topic: 'Exercise 8.2 - Integrals', deadline: 'Mar 04', done: false, desc: 'Complete all problems from Q1 to Q10.', teacherId: 1, assignedTo: [1, 2], class: 'XII-A' },
            { id: 2, sub: 'Physics', topic: 'Ray Diagrams & Lens Formula', deadline: 'Mar 05', done: true, desc: 'Draw diagrams for concave and convex lenses.', teacherId: 2, assignedTo: [1, 2, 3], class: 'XII-A' },
            { id: 3, sub: 'English', topic: 'Essay on Future of AI', deadline: 'Mar 06', done: false, desc: 'Write a 500-word essay on AI in education.', teacherId: null, assignedTo: [], class: 'XII-A' },
        ]
    })
    useEffect(() => { localStorage.setItem(HOMEWORK_DB_KEY, JSON.stringify(homework)) }, [homework])

    const [attendance, setAttendance] = useState({ 'XII-A': { '1': true, '2': false, '3': true, '4': true } })
    const [gradebook, setGradebook] = useState({})

    // ── Exams ────────────────────────────────────
    const [exams, setExams] = useState(() => {
        const saved = localStorage.getItem(EXAM_DB_KEY)
        if (saved) return JSON.parse(saved)
        return []
    })
    useEffect(() => { localStorage.setItem(EXAM_DB_KEY, JSON.stringify(exams)) }, [exams])

    // ── News ─────────────────────────────────────
    const [news, setNews] = useState(() => {
        const saved = localStorage.getItem(NEWS_DB_KEY)
        if (saved) return JSON.parse(saved)
        return [
            { id: 1, title: 'School Reopens after Holidays', date: 'Mar 01, 2026', type: 'General', content: 'We welcome all students back for the new term!', urgent: true },
            { id: 2, title: 'Volleyball District Champions!', date: 'Feb 28, 2026', type: 'Sports', content: 'Our senior boys team clinched the district trophy.', image: true },
            { id: 3, title: 'Inter-School Debate RSVP', date: 'Mar 02, 2026', type: 'Event', content: 'Register your names with the humanities department by EOD.', urgent: false }
        ]
    })
    useEffect(() => { localStorage.setItem(NEWS_DB_KEY, JSON.stringify(news)) }, [news])

    // ── Live Classes ─────────────────────────────
    const [liveClasses, setLiveClasses] = useState(() => {
        const saved = localStorage.getItem(LIVE_CLASSES_DB_KEY)
        if (saved) return JSON.parse(saved)
        return [
            { id: 1, subject: 'Mathematics', teacher: 'Ms. Anitha K.', time: '09:30 AM', status: 'Live', link: '#' },
            { id: 2, subject: 'Physics', teacher: 'Mr. Rajan S.', time: '11:00 AM', status: 'Scheduled', link: '#' }
        ]
    })
    useEffect(() => { localStorage.setItem(LIVE_CLASSES_DB_KEY, JSON.stringify(liveClasses)) }, [liveClasses])

    // ── App Config ───────────────────────────────
    const [appConfig, setAppConfig] = useState(() => {
        const saved = localStorage.getItem(APP_CONFIG_DB_KEY)
        if (saved) return JSON.parse(saved)
        return { smsEnabled: true, emailEnabled: true, gpsEnabled: true, studentAppBroadcast: 'Stay safe and keep learning!' }
    })
    useEffect(() => { localStorage.setItem(APP_CONFIG_DB_KEY, JSON.stringify(appConfig)) }, [appConfig])

    // ── UI State ─────────────────────────────────
    const [activePage, setActivePage] = useState('dashboard')
    const [toasts, setToasts] = useState([])
    const [modal, setModal] = useState(null)
    const [chartPeriod, setChartPeriod] = useState('Monthly')

    // ── Actions ──────────────────────────────────
    const addToast = (msg, type = 'success') => {
        const id = Date.now()
        setToasts(t => [...t, { id, msg, type }])
        setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000)
    }
    const openModal = (type, data = null) => setModal({ type, data })
    const closeModal = () => setModal(null)

    // Students
    const addStudent = (s) => setStudents(prev => [...prev, { ...s, id: Date.now(), status: 'Active' }])
    const deleteStudent = (id) => setStudents(prev => prev.filter(s => s.id !== id))
    const updateStudent = (id, updates) => setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s))
    const importStudents = (list) => {
        setStudents(list.map((s, i) => ({ ...s, id: Date.now() + i, status: 'Active', avg: s.avg || 0, attendance: s.attendance || 0, fee: s.fee || 'Paid' })))
        addToast(`${list.length} students imported successfully.`, 'success')
    }

    // Teachers
    const addTeacher = (t) => {
        const newId = Date.now()
        setTeachers(prev => [{ ...t, id: newId, active: true }, ...prev])
        setTeacherPerms(prev => ({ ...prev, [newId]: { ...DEFAULT_PERMS } }))
    }
    const updateTeacher = (id, updates) => setTeachers(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t))
    const deleteTeacher = (id) => {
        setTeachers(prev => prev.filter(t => t.id !== id))
        setTeacherPerms(prev => { const copy = { ...prev }; delete copy[id]; return copy })
    }
    const updateTeacherPerms = (teacherId, perms) => setTeacherPerms(prev => ({ ...prev, [teacherId]: { ...prev[teacherId], ...perms } }))

    // Timetable
    const addTimetableEntry = (entry) => setTimetable(prev => [...prev, { ...entry, id: Date.now() }])
    const updateTimetableEntry = (id, updates) => setTimetable(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t))
    const deleteTimetableEntry = (id) => setTimetable(prev => prev.filter(t => t.id !== id))

    // Exams
    const allotExam = (exam) => setExams(prev => [{ ...exam, id: Date.now() }, ...prev])

    // Homework (per-student)
    const addHomework = (h) => setHomework(prev => [{ ...h, id: Date.now(), done: false }, ...prev])
    const toggleHomework = (id) => setHomework(prev => prev.map(h => h.id === id ? { ...h, done: !h.done } : h))
    const deleteHomework = (id) => setHomework(prev => prev.filter(h => h.id !== id))

    // Events
    const addEvent = (e) => setEvents(prev => [...prev, { ...e, id: Date.now() }])
    const deleteEvent = (id) => setEvents(prev => prev.filter(e => e.id !== id))

    // Appointments
    const addAppointment = (a) => setAppointments(prev => [...prev, { ...a, id: Date.now(), status: 'Pending' }])
    const updateAppointment = (id, status) => setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a))

    // Misc
    const updateInventory = (id, delta) => setInventory(prev => prev.map(inv => inv.id === id ? { ...inv, stock: Math.max(0, inv.stock + delta) } : inv))
    const addContent = (c) => setContent(prev => [{ ...c, id: Date.now(), date: 'Today' }, ...prev])
    const toggleAttendance = (cls, sid) => setAttendance(prev => { const a = { ...prev[cls] }; a[sid] = !a[sid]; return { ...prev, [cls]: a } })
    const saveGrades = (cls, grades) => setGradebook(prev => ({ ...prev, [cls]: grades }))
    const addNews = (n) => setNews(prev => [{ ...n, id: Date.now(), date: new Date().toLocaleDateString() }, ...prev])
    const updateLiveClass = (id, status) => setLiveClasses(prev => prev.map(c => c.id === id ? { ...c, status } : c))
    const broadcastMsg = (msg) => setAppConfig(prev => ({ ...prev, studentAppBroadcast: msg }))

    return (
        <AppContext.Provider value={{
            students, addStudent, deleteStudent, updateStudent, importStudents,
            teachers, addTeacher, updateTeacher, deleteTeacher,
            teacherPerms, updateTeacherPerms, DEFAULT_PERMS,
            timetable, addTimetableEntry, updateTimetableEntry, deleteTimetableEntry,
            exams, allotExam,
            homework, toggleHomework, addHomework, deleteHomework,
            events, addEvent, deleteEvent,
            appointments, addAppointment, updateAppointment,
            inventory, updateInventory,
            content, addContent,
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
