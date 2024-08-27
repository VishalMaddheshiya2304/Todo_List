import React from 'react';
import './Navbar.css';  // Import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar"> {/* Use the class name defined in the CSS */}
      <div className="flex items-center brand">
        <span>iTask</span>
      </div>
      <ul className="flex gap-8 mx-4">
        {/* Use <a> or React Router's <Link> for navigation */}
        <li><a href="#home" className="hover:font-bold transition-all">Home</a></li>
        <li><a href="#tasks" className="hover:font-bold transition-all">Your Tasks</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
