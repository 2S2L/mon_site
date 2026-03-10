// Panier functionality
class Panier {
    constructor() {
        this.items = [];
        this.loadFromLocalStorage();
    }

    addItem(equipment) {
        const existingItem = this.items.find(item => item.id === equipment.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.items.push({ ...equipment, quantity: 1 });
        }
        this.saveToLocalStorage();
        this.updateUI();
    }

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.saveToLocalStorage();
        this.updateUI();
    }

    updateQuantity(id, quantity) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeItem(id);
            }
            this.saveToLocalStorage();
            this.updateUI();
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getItems() {
        return this.items;
    }

    clear() {
        this.items = [];
        this.saveToLocalStorage();
        this.updateUI();
    }

    saveToLocalStorage() {
        localStorage.setItem('panier', JSON.stringify(this.items));
    }

    loadFromLocalStorage() {
        const saved = localStorage.getItem('panier');
        if (saved) {
            this.items = JSON.parse(saved);
        }
    }

    updateUI() {
        const panierCount = document.getElementById('panier-count');
        if (panierCount) {
            panierCount.textContent = this.items.length;
        }
    }
}

// Initialize panier
const panier = new Panier();