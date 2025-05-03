import React, { useEffect, useState } from 'react'
import { FaBars, FaChevronDown, FaMapMarkedAlt, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed w-full top-0 left-0 right-0 flex justify-around items-center hover:bg-blue-700 p-6 z-50 transition-colors duration-500
        ${isScrolled ? 'bg-blue-700' : ' bg-blue-700'} text-white`}>      

      <div className=' flex items-start justify-start mr-30 md:text-2xl font-bold'>
        Mamou Ville
      </div>

      <ul className='hidden md:flex space-x-6' style={{ fontFamily: 'var(--font)' }}>
        <li><Link to='/' className='hover:text-yellow-500 transition-colors'>Home</Link></li>
        <li><Link to='/about' className='hover:text-yellow-500 transition-colors'>About Us</Link></li>
        <li className='flex items-center relative group'>
          <div className='flex items-center gap-1 cursor-pointer group-hover:text-yellow-500 transition-colors duration-300'>
            <Link to='/'>Explore</Link>
            <FaChevronDown className='text-xs mt-0.5 transition-transform group-hover:rotate-180 duration-300'/>
          </div>
          <ul className="dropdown-menu absolute top-full left-0 hidden text-start group-hover:block bg-white text-black rounded mt-1 min-w-[170px] z-50 ">
            <li><a href="#" className="block px-4 py-2 focus:outline-none hover:text-yellow-500">Nourriture</a></li>
            <li><a href="#" className="block px-4 py-2 focus:outline-none hover:text-yellow-500">Hotels</a></li>
            <li><a href="#" className="block px-4 py-2 focus:outline-none hover:text-yellow-500">Places à visiter</a></li>
          </ul>
        </li>
        <li className='flex items-center relative group'>
          <div className='flex items-center gap-1 cursor-pointer group-hover:text-yellow-500 transition-colors duration-300'>
            <Link to='/'>Articles</Link>
            <FaChevronDown className='text-xs mt-0.5 transition-transform group-hover:rotate-180 duration-300'/>
          </div>
          <ul className="dropdown-menu absolute top-full left-0 hidden text-start group-hover:block bg-white text-black rounded mt-1 min-w-[150px]">
            <li><a href="#" className="block px-4 py-2 focus:outline-none hover:text-yellow-500">Sport</a></li>
            <li><a href="#" className="block px-4 py-2 focus:outline-none hover:text-yellow-500">Cultures</a></li>
            <li><a href="#" className="block px-4 py-2 focus:outline-none hover:text-yellow-500">Politiques</a></li>
            <li><a href="#" className="block px-4 py-2 focus:outline-none hover:text-yellow-500">Citoyens</a></li>
          </ul>
        </li>
        <li><Link to='/' className='hover:text-yellow-500 transition-colors'>Contact</Link></li>
        <li><Link to='/education' className='hover:text-yellow-500 transition-colors'>Education</Link></li>
      </ul>

      <button className="md:hidden text-2xl focus:outline-none ml-10"
        onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-blue-600 text-white p-6 flex flex-col space-y-4 transition-transform duration-500 ease-in-out transform translate-x-0 md:hidden motion-preset-slide-down">
          <Link to='/' className='hover:text-yellow-500' onClick={() => setIsOpen(false)}>Home</Link>
          <Link to='/about' className='hover:text-yellow-500' onClick={() => setIsOpen(false)}>About Us</Link>
          <Link to='/' className='hover:text-yellow-500' onClick={() => setIsOpen(false)}>Explore</Link>
          <Link to='/' className='hover:text-yellow-500' onClick={() => setIsOpen(false)}>Articles</Link>
          <Link to='/' className='hover:text-yellow-500' onClick={() => setIsOpen(false)}>Contact</Link>
          <Link to='/education' className='hover:text-yellow-500' onClick={() => setIsOpen(false)}>Education</Link>
        </div>
      )}

      <div className='hidden md:flex items-center space-x-2 text-white'>
        <FaMapMarkedAlt />
        <span>Mamou, République de Guinée</span>
      </div>

    </nav>
  )
}

export default NavBar
