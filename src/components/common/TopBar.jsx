// components/common/TopBar.jsx
import React from 'react'
import { Menu, MessageSquare } from "lucide-react"

export default function TopBar({ 
  isSidebarOpen, 
  setIsSidebarOpen, 
  unreadMessages = 0, 
  onMessagesClick 
}) {
  return (
    <header className="bg-white shadow-sm p-4 flex items-center justify-between">
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
        className="text-gray-600 lg:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>

      <div className="flex items-center space-x-4">
        {/* Messages */}
        <div className="relative">
          {unreadMessages > 0 && (
            <span className="bg-blue-700 text-white text-xs absolute -top-1 -right-1 h-4 w-4 rounded-full flex items-center justify-center">
              {unreadMessages}
            </span>
          )}
          <button 
            className="text-gray-600" 
            onClick={onMessagesClick}
          >
            <MessageSquare className="h-6 w-6" />
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold mr-2">
            A
          </div>
          <span className="text-gray-800 font-medium">Admin</span>
        </div>
      </div>
    </header>
  )
}