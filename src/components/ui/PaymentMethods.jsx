import React from 'react';
import { motion } from 'framer-motion';
import { FaCreditCard, FaPaypal, FaApplePay, FaGooglePay } from 'react-icons/fa';

const paymentMethods = [
  { name: 'Credit Card', icon: FaCreditCard },
  { name: 'PayPal', icon: FaPaypal },
  { name: 'Apple Pay', icon: FaApplePay },
  { name: 'Google Pay', icon: FaGooglePay },
];

const PaymentMethods = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white shadow-xl rounded-lg p-6"
    >
      <h2 className="text-2xl font-semibold text-teal-600 mb-6">Accepted Payment Methods</h2>
      <div className="flex justify-around">
        {paymentMethods.map((method, index) => (
          <motion.div
            key={method.name}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="text-center"
          >
            <method.icon className="text-4xl text-amber-500 mb-2" />
            <p className="text-sm text-gray-600">{method.name}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PaymentMethods;

