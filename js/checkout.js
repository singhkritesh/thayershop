const coupons = {
    'THAYER10': 0.1,
    'WELCOME20': 0.2,
    'FREESHIP': 0 // Flag for logic
};

const checkout = {
    discount: 0,
    appliedCoupon: null,

    init() {
        this.renderSummary();
        this.setupListeners();
    },

    renderSummary() {
        const items = thayerCart.items;
        const summaryContainer = document.getElementById('order-summary-items');
        if (!summaryContainer) return;

        summaryContainer.innerHTML = items.map(item => `
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.8rem; font-size: 0.9rem;">
                <span>${item.quantity}x ${item.name} ${item.size ? `(${item.size})` : ''}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('');

        this.updateTotals();
    },

    updateTotals() {
        const subtotal = thayerCart.getTotal();
        const discountAmount = subtotal * this.discount;
        const total = subtotal - discountAmount;

        document.getElementById('subtotal-val').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('discount-val').textContent = `-$${discountAmount.toFixed(2)}`;
        document.getElementById('total-val').textContent = `$${total.toFixed(2)}`;
    },

    setupListeners() {
        const couponBtn = document.getElementById('apply-coupon');
        if (couponBtn) {
            couponBtn.addEventListener('click', () => {
                const code = document.getElementById('coupon-code').value.toUpperCase();
                if (coupons[code] !== undefined) {
                    this.discount = coupons[code];
                    this.appliedCoupon = code;
                    this.updateTotals();
                    thayerCart.showToast(`Coupon ${code} applied!`);
                } else {
                    thayerCart.showToast(`Invalid coupon code.`);
                }
            });
        }

        const form = document.getElementById('checkout-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.processPayment();
            });
        }
    },

    processPayment() {
        // Show loading state
        const btn = document.querySelector('.btn-primary');
        const originalText = btn.textContent;
        btn.disabled = true;
        btn.textContent = 'Processing...';

        // Simulate network delay
        setTimeout(async () => {
            const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
            const cardHolder = document.getElementById('card-holder').value;
            const billingAddress = document.getElementById('billing-address').value;

            const last4 = cardNumber.slice(-4);
            const maskedCard = `**** **** **** ${last4}`;

            // Mask Name on Card (e.g. "John Doe" -> "J*** D***")
            const maskedName = cardHolder.split(' ').map(part =>
                part[0] + '*'.repeat(Math.max(0, part.length - 1))
            ).join(' ');

            const orderId = `THY-2026-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
            const total = thayerCart.getTotal() * (1 - this.discount);

            // Generate a simple verification hash (deterministic for the demo)
            const msgBuffer = new TextEncoder().encode(`${orderId}:${total.toFixed(2)}:SECRET_SALT`);
            const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
            const verificationHash = Array.from(new Uint8Array(hashBuffer))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('').substr(0, 16).toUpperCase();

            const orderData = {
                id: orderId,
                items: thayerCart.items,
                total: total,
                date: new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                maskedCard: maskedCard,
                maskedName: maskedName,
                billingAddress: billingAddress,
                authHash: verificationHash,
                shipping: {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    address: document.getElementById('address').value
                },
                // Advanced Receipt Data
                invoiceNumber: `INV-${Math.floor(100000 + Math.random() * 900000)}`,
                referenceDate: new Date().toLocaleDateString(),
                invoiceDate: new Date().toLocaleDateString(),
                amountDue: 0.00, // Assuming paid in full
                customerNumber: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
                webOrderNumber: `WEB-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
                salesOrderNumber: `SO-${Math.floor(500000 + Math.random() * 500000)}`,
                salesStatus: 'Completed'
            };

            // Store last order for confirmation page
            localStorage.setItem('last_order', JSON.stringify(orderData));

            // Clear cart
            thayerCart.clear();

            // Redirect
            window.location.href = 'confirmation.html';
        }, 2000);
    }
};

window.thayerCheckout = checkout;
document.addEventListener('DOMContentLoaded', () => checkout.init());
