import axios from './api';

export const createOrder = async (orderData) => {
    try {
        const response = await axios.post('/orders', orderData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { error: 'Order creation error' };
    }
};
