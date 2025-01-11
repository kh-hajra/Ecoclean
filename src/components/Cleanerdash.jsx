import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaBell,
  FaEnvelope,
  FaCog,
  FaCalendar,
  FaCheckCircle,
  FaComments,
  FaStar,
  FaBriefcase,
  FaUsers,
  FaCheck,
  FaPlus,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const Dashboard = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Buy cleaning supplies', completed: false },
    { id: 2, text: "Schedule next week's appointments", completed: false },
    { id: 3, text: 'Send invoices to clients', completed: true },
  ]);

  const toggleTodo = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const appointments = [
    { type: 'Upcoming', icon: FaCalendar, details: 'House Cleaning - 123 Main St, 2:00 PM' },
    { type: 'Completed', icon: FaCheckCircle, details: 'Office Cleaning - 456 Elm St, Yesterday' },
    { type: 'Review', icon: FaComments, details: '"Great job! Very thorough." - John S.' },
  ];

  const stats = [
    { icon: FaStar, value: '4.9', label: 'Rating' },
    { icon: FaBriefcase, value: '152', label: 'Jobs Completed' },
    { icon: FaUsers, value: '98', label: 'Repeat Clients' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 p-4 md:p-8">
      {/* Header */}
      <header className="bg-indigo-600 text-white p-4 flex justify-between items-center rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold">CleanPro Dashboard</h1>
        <div className="flex space-x-4">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <FaBell className="text-xl" />
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <FaEnvelope className="text-xl" />
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <FaCog className="text-xl" />
          </motion.button>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* Profile Section */}
        <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-xl shadow-lg p-6 col-span-1 md:col-span-2 lg:col-span-1">
          <div className="flex items-center space-x-4">
            <img
              src="/placeholder.svg?height=80&width=80"
              alt="Profile"
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h2 className="text-2xl font-semibold">Jane Doe</h2>
              <p className="text-gray-600">Professional Cleaner</p>
              <div className="flex items-center mt-2">
                <FaStar className="text-yellow-400" />
                <span className="ml-1 font-semibold">4.9</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Appointments Carousel */}
        <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-xl shadow-lg p-6 col-span-1 md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Appointments & Updates</h2>
          <div className="space-y-4">
            {appointments.map((appointment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <appointment.icon className="text-3xl text-indigo-600" />
                  <div>
                    <h3 className="text-xl font-semibold">{appointment.type}</h3>
                    <p className="text-gray-600">{appointment.details}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Performance Stats */}
        <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Performance Stats</h2>
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center"
              >
                <stat.icon className="text-3xl text-indigo-600 mb-2" />
                <span className="text-2xl font-bold">{stat.value}</span>
                <span className="text-sm text-gray-600">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Todo List */}
        <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">To-Do List</h2>
          <ul className="space-y-2">
            {todos.map((todo) => (
              <motion.li
                key={todo.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center space-x-2"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleTodo(todo.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                  }`}
                >
                  {todo.completed && <FaCheck className="text-white text-xs" />}
                </motion.button>
                <span className={todo.completed ? 'line-through text-gray-400' : ''}>
                  {todo.text}
                </span>
              </motion.li>
            ))}
          </ul>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 flex items-center space-x-2 text-indigo-600 font-semibold"
          >
            <FaPlus />
            <span>Add New Task</span>
          </motion.button>
        </motion.div>

        {/* Interactive Map */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl shadow-lg p-6 col-span-1 md:col-span-2 lg:col-span-3"
        >
          <h2 className="text-2xl font-semibold mb-4">Today's Cleaning Locations</h2>
          <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Map placeholder - Integration required</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
