import React from 'react';
import { motion } from 'framer-motion';
import ContactForm from '../components/ui/ContactForm';
import ContactInfo from '../components/ui/ContactInfo';
import Map from '../components/ui/Map';
import BackButton from './ui/BackButton';
const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-amber-50 py-12 px-4 sm:px-6 lg:px-8">
         <BackButton to="/" /> 
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center text-teal-600 mb-12">Contact EcoClean</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ContactForm />
          <div>
            <ContactInfo />
            <Map />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;

