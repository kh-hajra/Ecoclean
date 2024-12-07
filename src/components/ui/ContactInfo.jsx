import React from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactInfo = () => {
  const contactItems = [
    { icon: FaPhone, text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { icon: FaEnvelope, text: 'contact@ecoclean.com', href: 'mailto:contact@ecoclean.com' },
    { icon: FaMapMarkerAlt, text: '123 Green Street, Eco City, EC 12345', href: 'https://maps.google.com' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-xl rounded-lg p-6 mb-8"
    >
      <h2 className="text-2xl font-semibold text-teal-600 mb-6">Contact Information</h2>
      <ul className="space-y-4">
        {contactItems.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center"
          >
            <item.icon className="text-amber-500 mr-4" />
            <a
              href={item.href}
              className="text-gray-600 hover:text-teal-500 transition-colors"
            >
              {item.text}
            </a>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default ContactInfo;

