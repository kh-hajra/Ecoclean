import React from 'react';
import { motion } from 'framer-motion';
import PaymentForm from '../components/ui/PaymentForm';
import PricingPlans from '../components/ui/PricingPlans';
import PaymentMethods from '../components/ui/PaymentMethods';
import BackButton from './ui/BackButton';
const Payment = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-amber-50 py-12 px-4 sm:px-6 lg:px-8">
         <BackButton to="/" /> 
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center text-teal-600 mb-12">EcoClean Payment</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <PricingPlans />
            <PaymentMethods />
          </div>
          <PaymentForm />
        </div>
      </motion.div>
    </div>
  );
};

export default Payment;

