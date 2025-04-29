
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const NavBar = () => {
  const { user } = useAuth();
  
  const navLinkClass = ({ isActive }) => 
    `px-4 py-2 transition-colors hover:bg-gray-100 rounded-md ${isActive ? 'bg-gray-100 font-medium' : ''}`;

  const studentLinks = [
    { to: "/student/dashboard", text: "Dashboard" },
    { to: "/student/courses", text: "My Courses" },
    { to: "/student/browse-courses", text: "Browse Courses" },
    { to: "/student/assignments", text: "Assignments" },
  ];

  const facultyLinks = [
    { to: "/faculty/dashboard", text: "Dashboard" },
    { to: "/faculty/courses", text: "My Courses" },
    { to: "/faculty/create-course", text: "Create Course" },
    { to: "/faculty/assignments", text: "Manage Assignments" },
  ];

  const links = user?.role === 'faculty' ? facultyLinks : studentLinks;

  return (
    <nav className="p-4 w-64 border-r h-[calc(100vh-64px)] bg-gray-50">
      <div className="flex flex-col gap-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={navLinkClass}
          >
            {link.text}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
