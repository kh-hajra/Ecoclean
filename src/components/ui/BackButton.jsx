import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function BackButton({ to }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => (to ? navigate(to) : navigate(-1))}
      className="absolute top-6 left-6 flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 shadow-md hover:bg-gray-200 transition"
      aria-label="Go back"
    >
      <ArrowLeft className="h-6 w-6 text-gray-700" aria-hidden="true" />
    </button>
  );
}

export default BackButton;
