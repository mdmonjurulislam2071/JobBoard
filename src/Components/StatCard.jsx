// components/StatCard.jsx
import React from 'react';

const StatCard = ({ title, value, icon, color, onClick }) => {
  // color based classes
  let borderColorClass = 'border-gray-500';
  let textColorClass = 'text-gray-500';
  
  if (color === 'yellow') {
    borderColorClass = 'border-yellow-500';
    textColorClass = 'text-yellow-500';
  } else if (color === 'blue') {
    borderColorClass = 'border-blue-500';
    textColorClass = 'text-blue-500';
  } else if (color === 'green') {
    borderColorClass = 'border-green-500';
    textColorClass = 'text-green-500';
  } else if (color === 'red') {
    borderColorClass = 'border-red-500';
    textColorClass = 'text-red-500';
  } else if (color === 'purple') {
    borderColorClass = 'border-purple-500';
    textColorClass = 'text-purple-500';
  }

  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${borderColorClass} ${onClick ? 'cursor-pointer hover:shadow-xl' : ''} transition`}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className={`${textColorClass} text-3xl`}>{icon}</div>
      </div>
    </div>
  );
};

export default StatCard;