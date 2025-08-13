// components/common/StatCard.jsx
import React from 'react'

export default function StatCard({ title, value, icon, bgColor }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
        </div>
        <div className={`${bgColor} p-3 rounded-full`}>
          {icon}
        </div>
      </div>
    </div>
  )
}