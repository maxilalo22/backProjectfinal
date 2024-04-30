import fs from 'fs/promises';

export class OrdersDaoFiles {
    constructor(path) {
        this.path = path;
    }

    async getAllOrders() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error reading file:', error);
            return [];
        }
    }

    async addOrder(order) {
        try {
            const orders = await this.getAllOrders();
            orders.push(order);
            await fs.writeFile(this.path, JSON.stringify(orders, null, 2));
        } catch (error) {
            console.error('Error adding order:', error);
        }
    }

    async getOrderById(id) {
        try {
            const orders = await this.getAllOrders();
            return orders.find(order => order._id === id);
        } catch (error) {
            console.error('Error getting order by ID:', error);
            return null;
        }
    }

    async updateOrder(id, updatedOrder) {
        try {
            const orders = await this.getAllOrders();
            const index = orders.findIndex(order => order._id === id);
            if (index !== -1) {
                orders[index] = { ...orders[index], ...updatedOrder };
                await fs.writeFile(this.path, JSON.stringify(orders, null, 2));
                return true;
            } else {
                console.error('Order not found.');
                return false;
            }
        } catch (error) {
            console.error('Error updating order:', error);
            return false;
        }
    }

    async deleteOrder(id) {
        try {
            let orders = await this.getAllOrders();
            const filteredOrders = orders.filter(order => order._id !== id);
            if (orders.length !== filteredOrders.length) {
                await fs.writeFile(this.path, JSON.stringify(filteredOrders, null, 2));
                return true;
            } else {
                console.error('Order not found.');
                return false;
            }
        } catch (error) {
            console.error('Error deleting order:', error);
            return false;
        }
    }
}
