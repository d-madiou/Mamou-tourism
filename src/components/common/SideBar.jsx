// components/common/Sidebar.jsx
import React from 'react'
import { LogOut, X } from "lucide-react"
import { navItems } from '../../config/navigation'

export default function Sidebar({ 
  isSidebarOpen, 
  setIsSidebarOpen, 
  activeSection, 
  setActiveSection, 
  onLogout 
}) {
  return (
    <div
      className={`bg-blue-900 text-white fixed inset-y-0 left-0 z-50 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
        isSidebarOpen ? "w-64" : "w-0 lg:w-64"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-blue-800 flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-yellow-400 flex items-center justify-center text-blue-900 font-bold text-lg mr-2">
              M
            </div>
            <span className="text-lg font-bold">Admin Mamou</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)} 
            className="text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
                  activeSection === id 
                    ? "bg-blue-800 text-white" 
                    : "text-blue-100 hover:bg-blue-800"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="ml-3">{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-blue-800">
          <button
            onClick={onLogout}
            className="flex items-center w-full px-4 py-3 rounded-lg text-blue-100 hover:bg-blue-800 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="ml-3">Déconnexion</span>
          </button>
        </div>
      </div>
    </div>
  )
}
