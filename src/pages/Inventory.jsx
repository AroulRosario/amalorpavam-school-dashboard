import { useApp } from '../context/AppContext'
import { Plus, Minus } from 'lucide-react'

export default function InventoryPage() {
    const { inventory, updateInventoryStock, addToast, openModal } = useApp()

    return (
        <div className="dashboard-body">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 22, fontWeight: 800, color: '#0A2463' }}>Inventory Store</h2>
                    <p style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>Uniforms, Notebooks, Books & Stationery</p>
                </div>
                <button className="btn btn-primary" onClick={() => addToast('Add item form coming soon!', 'info')}>
                    <span>+</span> Add Item
                </button>
            </div>

            {/* Summary cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
                {[
                    { label: 'Total Items', val: inventory.length, col: '#1E50E2', bg: '#E8EFFD' },
                    { label: 'Total Stock', val: inventory.reduce((s, i) => s + i.stock, 0), col: '#10B981', bg: '#D1FAE5' },
                    { label: 'Total Orders', val: inventory.reduce((s, i) => s + i.orders, 0), col: '#F59E0B', bg: '#FEF3C7' },
                    { label: 'Low Stock (<50)', val: inventory.filter(i => i.stock < 50).length, col: '#EF4444', bg: '#FEE2E2' },
                ].map((s, i) => (
                    <div key={i} style={{ background: 'white', border: '1.5px solid #E2E8F0', borderRadius: 14, padding: 18 }}>
                        <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600, marginBottom: 6 }}>{s.label}</div>
                        <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 28, fontWeight: 800, color: s.col }}>{s.val}</div>
                    </div>
                ))}
            </div>

            {/* Inventory cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }}>
                {inventory.map(item => (
                    <div key={item.id} style={{ background: 'white', border: '1.5px solid #E2E8F0', borderRadius: 16, padding: 22, display: 'flex', gap: 16 }}>
                        <div style={{ fontSize: 40 }}>{item.icon}</div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                                <div>
                                    <div style={{ fontWeight: 800, fontSize: 16, color: '#0F172A' }}>{item.name}</div>
                                    <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>₹{item.price.toLocaleString()} per unit · {item.orders} orders placed</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 28, fontWeight: 800, color: item.stock < 50 ? '#EF4444' : '#10B981' }}>{item.stock}</div>
                                    <div style={{ fontSize: 10, color: '#94A3B8' }}>IN STOCK</div>
                                </div>
                            </div>
                            <div className="progress-bar" style={{ marginBottom: 14, height: 8 }}>
                                <div className="progress-fill" style={{
                                    width: `${Math.min(100, (item.stock / 500) * 100)}%`,
                                    background: item.stock < 50 ? '#EF4444' : item.stock < 150 ? '#F59E0B' : '#10B981'
                                }} />
                            </div>
                            {item.stock < 50 && (
                                <div style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: 8, padding: '6px 10px', fontSize: 11, color: '#DC2626', fontWeight: 600, marginBottom: 10 }}>
                                    ⚠️ Low stock! Consider restocking.
                                </div>
                            )}
                            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                <button className="btn btn-outline btn-sm" onClick={() => { updateInventoryStock(item.id, -1); addToast(`1 ${item.name} sold!`, 'success') }}>
                                    <Minus size={12} /> Sell 1
                                </button>
                                <button className="btn btn-outline btn-sm" onClick={() => { updateInventoryStock(item.id, -10); addToast(`10 × ${item.name} sold!`, 'success') }}>
                                    Sell 10
                                </button>
                                <button className="btn btn-primary btn-sm" onClick={() => { updateInventoryStock(item.id, 50); addToast(`Restocked 50 × ${item.name}!`, 'success') }}>
                                    <Plus size={12} /> Restock +50
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
