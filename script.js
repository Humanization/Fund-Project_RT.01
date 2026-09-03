/**
 * ====================================================================
 * CONFIGURASI & DATA PLACEHOLDER (BISA ANDA EDIT SESUAI KEBUTUHAN)
 * ====================================================================
 */
const CONFIG = {
    // Opsi 1: Admin 1 (Khusus Pembayaran Cash / Tunai)
    whatsapp1: {
        name: "Admin 1 - Cash (M.Aidan Mafaza)",
        number: "6282241586500", // Placeholder Nomor WA Admin 1 (Tanpa tanda +)
        method: "Cash / Tunai"
    },
    // Opsi 2: Admin 2 (Khusus Pembayaran Transfer / QRIS)
    whatsapp2: {
        name: "Admin 2 - QRIS/Transfer (M.Hanif Faiz)",
        number: "6282310586040", // Placeholder Nomor WA Admin 2 (Tanpa tanda +)
        method: "Transfer / QRIS"
    },
    groupName: "RT.01",
    projectName: "FUND PROJECT RT.01",
    projectDescription: "Dukung kelompok kami dengan membeli makanan & cemilan lezat yang kami sediakan!",
    targetAmount: 2500000, // Target dana Rp 2.500.000
    currentAmount: 1349000, // Dana terkumpul saat ini (Rp 0)
    pickupLocation: "[LOKASI_COD_STAND]",
    members: [
        "Muhammad Roffiq Musaffa",
        "Muhammad Aidan Mafaza",
        "Asykar Munadhil Syabib Irnowo",
        "Muhammad Hanif Faiz",
        "Ahsan Nafis Syazani ",
        "Azzam Al Khawarizmi Abdillah",
        "Muhammad Yusuf Mubarok",
        "Ibrahim Banna Haniyya",
        "Ahmad Fikra Musthafa al haritds",
        "Muhammad Arfan Hashif",
        "Aimar Adhyastha Pratama"
    ]
};

/**
 * ====================================================================
 * DAFTAR MENU PRODUK JUALAN
 * ====================================================================
 */
const PRODUCTS = [
    {
        id: "p1",
        name: "Siomay",
        category: "snack",
        price: 15000, // Placeholder harga (bisa diubah nanti)
        badge: "🔥 Best Seller",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR29X8dH77bXUmP1KgSi2hAPTzu-OSmLSsIu_imwbVXmg&s=10",
        description: "Siomay gurih dan lezat dipadu bumbu kacang spesial."
    },
    {
        id: "p2",
        name: "Puding Vla Vanilla",
        category: "snack",
        price: 10000, // Placeholder harga (bisa diubah nanti)
        badge: "✨ Manis & Segar",
        image: "https://i.pinimg.com/736x/6f/eb/94/6feb943073ae2d289267c97daa907712.jpg",
        description: "Puding lembut dengan siraman vla vanilla yang harum manis."
    },
    {
        id: "p3",
        name: "Seblak kering",
        category: "snack",
        price: 5000, // Placeholder harga (bisa diubah nanti)
        badge: "🍿 Renyah Gurih",
        image: "https://i.pinimg.com/1200x/8b/a7/53/8ba75310fcb06456bbbdcbf53303255e.jpg",
        description: "Cemilan pedas yang akan membuat kalian bilang 'WOW!'"
    },
    {
        id: "p4",
        name: "Fluffy Donut",
        category: "snack",
        price: 4000, // Placeholder harga (bisa diubah nanti)
        badge: "😋 Lezat dan bervariasi!",
        image: "https://image.idntimes.com/post/20250723/img_3397_455c9ac4-c833-4a4f-ad57-daced1a2b5eb.jpeg?tr=w-1200,f-webp,q-75&width=1200&format=webp&quality=75",
        description: "Donat yang lezat dan sangat lembut dengan beraneka ragam rasa yang bisa anda pilih! (Kalau ingin menu, tanya ke admin ya!😉)"
    }
];

// Global State Keranjang
let cart = [];

window.onload = function() {
    initApp();
};

function initApp() {
    // Apply Configuration to UI
    document.getElementById('nav-group-name').innerText = CONFIG.groupName;
    document.getElementById('team-group-name').innerText = CONFIG.groupName;
    document.getElementById('footer-group').innerText = CONFIG.groupName;
    document.getElementById('project-name').innerText = CONFIG.projectName;
    document.getElementById('project-description').innerText = CONFIG.projectDescription;

    // Render Labels untuk Opsi WhatsApp Bendahara
    if(document.getElementById('wa-label-1')) document.getElementById('wa-label-1').innerText = CONFIG.whatsapp1.name;
    if(document.getElementById('wa-label-2')) document.getElementById('wa-label-2').innerText = CONFIG.whatsapp2.name;

    // Render Progress Bar & Amounts
    const targetFormatted = formatRupiah('targetAmount');
    const currentFormatted = formatRupiah('currentAmount');
    const percentage = Math.min(100, Math.round((CONFIG.currentAmount / CONFIG.targetAmount) * 100));

    document.getElementById('target-amount').innerText = targetFormatted;
    document.getElementById('raised-amount').innerText = currentFormatted;
    document.getElementById('progress-bar').style.width = percentage + '%';
    document.getElementById('progress-percent').innerText = percentage + '% Tercapai';

    // Render Members
    const membersContainer = document.getElementById('members-container');
    membersContainer.innerHTML = CONFIG.members.map(member => `
        <span class="px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200">
            👤 ${member}
        </span>
    `).join('');

    // Render Product Cards
    renderProducts();
}

function renderProducts() {
    const container = document.getElementById('product-grid');
    container.innerHTML = PRODUCTS.map(product => `
        <div class="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-rose-500/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-lg">
            <div>
                <!-- Product Image Container -->
                <div class="relative overflow-hidden h-48 bg-slate-800">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" onerror="this.onerror=null;this.src='https://placehold.co/400x300/334155/ffffff?text=Jajanan+RT.01';">
                    <span class="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-slate-900/80 border border-white/20 text-amber-300 backdrop-blur-md">
                        ${product.badge}
                    </span>
                </div>
                
                <!-- Content -->
                <div class="p-5">
                    <h3 class="font-extrabold text-lg text-white mb-1 group-hover:text-rose-400 transition">${product.name}</h3>
                    <p class="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-4">${product.description}</p>
                </div>
            </div>

            <!-- Card Footer & Action -->
            <div class="px-5 pb-5 flex items-center justify-between border-t border-slate-800/80 pt-4">
                <div>
                    <span class="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Harga</span>
                    <span class="text-lg font-extrabold text-emerald-400">${formatRupiah(product.price)}</span>
                </div>
                <button onclick="addToCart('${product.id}')" class="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition flex items-center gap-1.5">
                    <i class="fa-solid fa-plus"></i>
                    <span>Tambah</span>
                </button>
            </div>
        </div>
    `).join('');
}

function addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    // Trigger Confetti Effect
    triggerSmallConfetti();
    updateCartUI();
    showToast(`"<b>${product.name}</b>" ditambahkan ke keranjang!`);
}

function updateCartQty(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== productId);
    }
    updateCartUI();
}

function updateCartUI() {
    const badge = document.getElementById('cart-badge');
    const container = document.getElementById('cart-items-container');
    const totalPriceEl = document.getElementById('cart-total-price');

    // Total Quantity
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    badge.innerText = totalQty;

    // Total Price Calculation
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    totalPriceEl.innerText = formatRupiah(totalPrice);

    // Render Cart Items
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8 text-slate-500">
                <i class="fa-solid fa-basket-shopping text-3xl mb-2 opacity-40"></i>
                <p class="text-xs">Keranjangmu masih kosong nih.</p>
            </div>
        `;
    } else {
        container.innerHTML = cart.map(item => `
            <div class="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div class="flex-1 pr-2">
                    <h5 class="font-bold text-xs text-white">${item.name}</h5>
                    <span class="text-[11px] text-emerald-400 font-semibold">${formatRupiah(item.price)} x ${item.qty}</span>
                </div>
                <div class="flex items-center gap-2">
                    <button onclick="updateCartQty('${item.id}', -1)" class="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700 flex items-center justify-center">
                        -
                    </button>
                    <span class="text-xs font-bold w-4 text-center">${item.qty}</span>
                    <button onclick="updateCartQty('${item.id}', 1)" class="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700 flex items-center justify-center">
                        +
                    </button>
                </div>
            </div>
        `).join('');
    }
}

function sendOrderToWA() {
    // Check Cart Empty
    if (cart.length === 0) {
        showToast("Pilih setidaknya 1 menu jualan terlebih dahulu!", true);
        return;
    }

    // Get Input Values
    const buyerName = document.getElementById('buyer-name').value.trim();
    const buyerLocation = document.getElementById('buyer-location').value.trim();

    if (!buyerLocation) {
        showToast("Mohon isi Lokasi Pemberian / Pengiriman barang!", true);
        document.getElementById('buyer-location').focus();
        return;
    }

    // Cek Bendahara / Admin yang Dipilih (WA 1 = Cash, WA 2 = QRIS)
    const selectedTarget = document.querySelector('input[name="wa-target"]:checked')?.value;
    const targetObj = selectedTarget === 'wa2' ? CONFIG.whatsapp2 : CONFIG.whatsapp1;

    // Build Order List String
    const orderListText = cart.map(item => `${item.name} (${item.qty}x)`).join(', ');

    // Construct exact message format requested:
    let message = `Assalamualaikum bang! Saya ingin pesan ${orderListText} dong! Diberi nya di ${buyerLocation} yaaa! (Metode Bayar: ${targetObj.method})`;
    
    if (buyerName) {
        message += ` (Atas nama: ${buyerName})`;
    }

    // Trigger Massive Confetti
    triggerMassiveConfetti();

    // Encode for URL & Redirect to selected WhatsApp number
    const targetPhone = targetObj.number.replace(/[^0-9]/g, '');
    const encodedText = encodeURIComponent(message);
    const waUrl = `https://wa.me/${targetPhone}?text=${encodedText}`;

    setTimeout(() => {
        window.open(waUrl, '_blank');
    }, 500);
}

function toggleCartModal() {
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('hidden');
}

function formatRupiah(amount) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
}

function showToast(msg, isError = false) {
    const toast = document.getElementById('toast-message');
    toast.innerHTML = msg;
    toast.className = `p-3 rounded-xl border text-xs font-medium text-center transition-all ${
        isError ? 'bg-rose-500/20 border-rose-500/40 text-rose-300' : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
    }`;
    toast.classList.remove('hidden');

    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

function triggerSmallConfetti() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 25,
            spread: 60,
            origin: { y: 0.8 }
        });
    }
}

function triggerMassiveConfetti() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 100,
            spread: 100,
            origin: { y: 0.6 }
        });
    }
}
