import React from 'react';
import { motion } from 'framer-motion';

const plans = [
  { name: 'Basic', price: 49, features: ['1 Cleaning Session', 'Basic Equipment', 'Standard Cleaning'] },
  { name: 'Standard', price: 99, features: ['3 Cleaning Sessions', 'Advanced Equipment', 'Deep Cleaning'] },
  { name: 'Premium', price: 149, features: ['5 Cleaning Sessions', 'Premium Equipment', 'Deep Cleaning + Sanitization'] },
];

const PricingPlans = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-xl rounded-lg p-6 mb-8"
    >
      <h2 className="text-2xl font-semibold text-teal-600 mb-6">Choose Your Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-gray-200 rounded-lg p-4 text-center"
          >
            <h3 className="text-lg font-semibold text-teal-600 mb-2">{plan.name}</h3>
            <p className="text-3xl font-bold text-amber-500 mb-4">${plan.price}</p>
            <ul className="text-sm text-gray-600">
              {plan.features.map((feature, i) => (
                <li key={i} className="mb-2">{feature}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PricingPlans;

