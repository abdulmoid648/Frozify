import axios from './api';

export const createPaymentIntent = async (orderData) => {
    try {
        const response = await axios.post('/payment/create-intent', orderData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { error: 'Payment service error' };
    }
};

export const createOrder = async (orderData) => {
    try {
        const response = await axios.post('/orders', orderData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { error: 'Order creation error' };
    }
};

export const getStripeKey = async () => {
    try {
        const response = await axios.get('/payment/stripekey');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { error: 'Stripe key error' };
    }
};
