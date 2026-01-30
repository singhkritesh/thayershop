const CART_STORAGE_KEY = 'thayer_shop_cart';

const cart = {
    items: [],

    init() {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
            try {
                this.items = JSON.parse(stored);
            } catch (e) {
                console.error("Cart data corrupted", e);
                this.items = [];
            }
        }
        this.updateBadge();
    },

    save() {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.items));
        this.updateBadge();
    },

    addItem(product, size = null, quantity = 1) {
        const existing = this.items.find(item =>
            item.id === product.id && item.size === size
        );

        if (existing) {
            existing.quantity += quantity;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                size: size,
                quantity: quantity
            });
        }
        this.save();
        this.showToast(`${product.name} added to cart!`);
    },

    removeItem(productId, size = null) {
        this.items = this.items.filter(item =>
            !(item.id === productId && item.size === size)
        );
        this.save();
    },

    updateQuantity(productId, size, quantity) {
        const item = this.items.find(item =>
            item.id === productId && item.size === size
        );
        if (item) {
            item.quantity = parseInt(quantity);
            if (item.quantity <= 0) {
                this.removeItem(productId, size);
            } else {
                this.save();
            }
        }
    },

    clear() {
        this.items = [];
        this.save();
    },

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    getCount() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    },

    updateBadge() {
        const badges = document.querySelectorAll('.cart-count');
        const count = this.getCount();
        badges.forEach(badge => {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        });
    },

    showToast(message) {
        // Create toast element if it doesn't exist
        let toast = document.getElementById('toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast';
            toast.style.cssText = `
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                background: var(--color-primary);
                color: white;
                padding: 1rem 2rem;
                border-radius: var(--radius-sm);
                box-shadow: var(--shadow-md);
                z-index: 2000;
                transform: translateY(100px);
                transition: transform 0.3s ease;
                font-weight: 600;
            `;
            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.style.transform = 'translateY(0)';

        setTimeout(() => {
            toast.style.transform = 'translateY(150px)';
        }, 3000);
    }
};

// Initialize cart on load
window.thayerCart = cart;
document.addEventListener('DOMContentLoaded', () => cart.init());
