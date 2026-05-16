import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Trash2, Mail, MailOpen, X, RefreshCw, User } from 'lucide-react'
import api from '@/lib/api'

function formatDate(str) {
    return new Date(str).toLocaleString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit',
    })
}

// ── Slide-over detail panel ──────────────────────────────────────
function MessagePanel({ contact, onClose, onMarkRead }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex"
        >
            {/* Backdrop */}
            <div
                className="flex-1 bg-black/20 backdrop-blur-sm cursor-pointer"
                onClick={onClose}
            />

            {/* Panel */}
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="w-full max-w-lg bg-white shadow-2xl flex flex-col"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-5 border-b border-[rgba(190,190,190,0.2)]">
                    <h3 className="font-extrabold text-[#3D3D3D]">Message detail</h3>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-auto px-8 py-6 flex flex-col gap-6">

                    {/* Sender */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-[#FF4F93]/10 flex items-center justify-center text-[#FF4F93] font-bold text-base flex-shrink-0">
                                {contact.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="font-bold text-[#3D3D3D]">{contact.name}</p>
                                <p className="text-sm text-[#3D3D3D]/50">{contact.email}</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-[#3D3D3D]/40">
                            <span>{formatDate(contact.createdAt)}</span>
                            {!contact.read && (
                                <span className="bg-[#FF4F93]/10 text-[#FF4F93] font-semibold px-2.5 py-0.5 rounded-full">
                                    Unread
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Subject */}
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-[#3D3D3D]/40 mb-1">Subject</p>
                        <p className="text-sm font-semibold text-[#3D3D3D]">
                            {contact.subject || 'No subject'}
                        </p>
                    </div>

                    {/* Message */}
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-[#3D3D3D]/40 mb-2">Message</p>
                        <p className="text-sm text-[#3D3D3D]/80 leading-relaxed whitespace-pre-wrap bg-gray-50 rounded-[14px] p-5">
                            {contact.message}
                        </p>
                    </div>
                </div>

                {/* Footer action */}
                {!contact.read && (
                    <div className="px-8 py-5 border-t border-[rgba(190,190,190,0.2)]">
                        <button
                            onClick={() => onMarkRead(contact.id)}
                            className="flex items-center gap-2 text-sm font-semibold text-[#FF4F93] hover:underline"
                        >
                            <MailOpen size={16} />
                            Mark as read
                        </button>
                    </div>
                )}
            </motion.div>
        </motion.div>
    )
}

// ── Delete confirm modal ─────────────────────────────────────────
function DeleteModal({ onConfirm, onCancel }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm px-4"
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-[24px] p-8 max-w-sm w-full shadow-2xl"
            >
                <h3 className="text-lg font-bold text-[#3D3D3D] mb-2">Delete submission?</h3>
                <p className="text-sm text-[#3D3D3D]/60 mb-6">This action cannot be undone.</p>
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 py-3 rounded-full border border-[rgba(190,190,190,0.4)] text-sm font-semibold text-[#3D3D3D] hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 py-3 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}

// ── Main page ────────────────────────────────────────────────────
export default function AdminContacts() {
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [debouncedSearch, setDebounced] = useState('')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [total, setTotal] = useState(0)
    const [unreadCount, setUnreadCount] = useState(0)
    const [selected, setSelected] = useState(null)
    const [deleteId, setDeleteId] = useState(null)
    const [fetchError, setFetchError] = useState('')

    // Debounce search input 400ms
    useEffect(() => {
        const t = setTimeout(() => setDebounced(search), 400)
        return () => clearTimeout(t)
    }, [search])

    // Reset to page 1 on new search
    useEffect(() => { setPage(1) }, [debouncedSearch])

    const fetchContacts = useCallback(async () => {
        setLoading(true)
        setFetchError('')
        try {
            const res = await api.get('/contacts', {
                params: { search: debouncedSearch, page, limit: 20 },
            })
            setContacts(res.data.contacts)
            setTotalPages(res.data.totalPages)
            setTotal(res.data.total)
            setUnreadCount(res.data.unreadCount)
        } catch {
            setFetchError('Failed to load contacts. Please refresh.')
        } finally {
            setLoading(false)
        }
    }, [debouncedSearch, page])

    useEffect(() => { fetchContacts() }, [fetchContacts])

    async function handleMarkRead(id) {
        try {
            await api.patch(`/contacts/${id}/read`)
            setContacts(prev => prev.map(c => c.id === id ? { ...c, read: true } : c))
            setUnreadCount(prev => Math.max(0, prev - 1))
            if (selected?.id === id) setSelected(prev => ({ ...prev, read: true }))
        } catch {
            // silently fail — not critical
        }
    }

    async function handleDelete(id) {
        try {
            await api.delete(`/contacts/${id}`)
            setContacts(prev => prev.filter(c => c.id !== id))
            setTotal(prev => prev - 1)
            setDeleteId(null)
            if (selected?.id === id) setSelected(null)
        } catch {
            setDeleteId(null)
        }
    }

    return (
        <div className="p-8 max-w-6xl mx-auto">

            {/* Page header */}
            <div className="flex items-start justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-extrabold text-[#3D3D3D]">Contact Submissions</h1>
                    <p className="text-sm text-[#3D3D3D]/50 mt-1">
                        {unreadCount > 0
                            ? `${unreadCount} unread · ${total} total`
                            : `${total} total submissions`
                        }
                    </p>
                </div>
                <button
                    onClick={fetchContacts}
                    className="flex items-center gap-2 text-sm text-[#3D3D3D]/50 hover:text-[#FF4F93] transition-colors mt-1"
                >
                    <RefreshCw size={15} />
                    Refresh
                </button>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3D3D3D]/30 pointer-events-none" />
                <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search by name, email or subject..."
                    className="w-full pl-10 pr-10 py-3 rounded-[14px] border border-[rgba(190,190,190,0.4)] text-sm text-[#3D3D3D] outline-none focus:border-[#FF4F93] transition-colors"
                />
                {search && (
                    <button
                        onClick={() => setSearch('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3D3D3D]/30 hover:text-[#3D3D3D] transition-colors"
                    >
                        <X size={14} />
                    </button>
                )}
            </div>

            {/* Fetch error */}
            {fetchError && (
                <p className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-[12px] mb-6">{fetchError}</p>
            )}

            {/* Table */}
            <div className="bg-white rounded-[24px] border border-[rgba(190,190,190,0.2)] overflow-hidden shadow-sm">

                {/* Table header */}
                <div className="hidden md:grid grid-cols-[2fr_2fr_2fr_1.5fr_auto] gap-4 px-6 py-4 bg-gray-50 border-b border-[rgba(190,190,190,0.2)]">
                    {['Name', 'Email', 'Subject', 'Date', 'Actions'].map(h => (
                        <p key={h} className="text-xs font-semibold uppercase tracking-widest text-[#3D3D3D]/40">{h}</p>
                    ))}
                </div>

                {/* Loading skeleton */}
                {loading && (
                    <div className="flex flex-col divide-y divide-[rgba(190,190,190,0.1)]">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="grid grid-cols-[2fr_2fr_2fr_1.5fr_auto] gap-4 px-6 py-4 animate-pulse">
                                <div className="h-4 bg-gray-100 rounded-full w-3/4" />
                                <div className="h-4 bg-gray-100 rounded-full w-full" />
                                <div className="h-4 bg-gray-100 rounded-full w-2/3" />
                                <div className="h-4 bg-gray-100 rounded-full w-full" />
                                <div className="h-4 bg-gray-100 rounded-full w-8" />
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {!loading && contacts.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 gap-3">
                        <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                            <Mail size={24} className="text-[#3D3D3D]/20" />
                        </div>
                        <p className="text-sm text-[#3D3D3D]/40">
                            {search ? 'No results match your search' : 'No contact submissions yet'}
                        </p>
                    </div>
                )}

                {/* Rows */}
                {!loading && contacts.length > 0 && (
                    <div className="flex flex-col divide-y divide-[rgba(190,190,190,0.1)]">
                        {contacts.map(contact => (
                            <div
                                key={contact.id}
                                onClick={() => setSelected(contact)}
                                className={`grid grid-cols-[2fr_2fr_2fr_1.5fr_auto] gap-4 px-6 py-4 items-center cursor-pointer hover:bg-gray-50 transition-colors group
                  ${!contact.read ? 'bg-[#FF4F93]/[0.02]' : ''}`}
                            >
                                {/* Name with unread dot */}
                                <div className="flex items-center gap-2.5 min-w-0">
                                    {!contact.read && (
                                        <span className="w-2 h-2 rounded-full bg-[#FF4F93] flex-shrink-0" />
                                    )}
                                    <span className={`text-sm truncate ${!contact.read ? 'font-semibold text-[#3D3D3D]' : 'text-[#3D3D3D]/70'}`}>
                                        {contact.name}
                                    </span>
                                </div>

                                {/* Email */}
                                <p className="text-sm text-[#3D3D3D]/60 truncate">{contact.email}</p>

                                {/* Subject */}
                                <p className="text-sm text-[#3D3D3D]/60 truncate">
                                    {contact.subject || '—'}
                                </p>

                                {/* Date */}
                                <p className="text-xs text-[#3D3D3D]/40 whitespace-nowrap">
                                    {formatDate(contact.createdAt)}
                                </p>

                                {/* Actions — stop propagation so row click doesn't also fire */}
                                <div
                                    className="flex items-center gap-1"
                                    onClick={e => e.stopPropagation()}
                                >
                                    {!contact.read && (
                                        <button
                                            title="Mark as read"
                                            onClick={() => handleMarkRead(contact.id)}
                                            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#FF4F93]/10 text-[#FF4F93] transition-colors"
                                        >
                                            <MailOpen size={15} />
                                        </button>
                                    )}
                                    <button
                                        title="Delete"
                                        onClick={() => setDeleteId(contact.id)}
                                        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-50 text-red-400 transition-colors"
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 mt-6">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-5 py-2.5 text-sm rounded-full border border-[rgba(190,190,190,0.4)] disabled:opacity-40 hover:border-[#FF4F93] hover:text-[#FF4F93] transition-colors"
                    >
                        Previous
                    </button>
                    <span className="text-sm text-[#3D3D3D]/50">
                        Page {page} of {totalPages}
                    </span>
                    <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="px-5 py-2.5 text-sm rounded-full border border-[rgba(190,190,190,0.4)] disabled:opacity-40 hover:border-[#FF4F93] hover:text-[#FF4F93] transition-colors"
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Modals */}
            <AnimatePresence>
                {deleteId && (
                    <DeleteModal
                        onConfirm={() => handleDelete(deleteId)}
                        onCancel={() => setDeleteId(null)}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {selected && (
                    <MessagePanel
                        contact={selected}
                        onClose={() => setSelected(null)}
                        onMarkRead={handleMarkRead}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}