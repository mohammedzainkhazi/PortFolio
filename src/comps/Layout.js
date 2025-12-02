import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  CodeIcon,
  AcademicCapIcon,
  ChatIcon,
  LightningBoltIcon,
  MailIcon,
  DocumentTextIcon
} from '@heroicons/react/outline';

const Layout = ({ children }) => {
  const navItems = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Projects', path: '/projects', icon: CodeIcon },
    { name: 'Skills', path: '/skills', icon: LightningBoltIcon },
    { name: 'Education', path: '/education', icon: AcademicCapIcon },
    { name: 'Resume', path: '/resume', icon: DocumentTextIcon },
    { name: 'Contact', path: '/contact', icon: MailIcon },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="fixed md:relative z-50 bottom-0 w-full md:w-64 md:h-screen glass border-t md:border-t-0 md:border-r border-slate-800 flex flex-col justify-between">

        {/* Logo / Brand */}
        <div className="hidden md:flex items-center justify-center h-20 border-b border-slate-800">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            RootZain
          </h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-2 py-4 space-y-2 flex md:block justify-around md:justify-start overflow-x-auto md:overflow-visible">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-400'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                }`
              }
            >
              <item.icon className="w-6 h-6 mr-0 md:mr-3" />
              <span className="hidden md:block font-medium">{item.name}</span>
            </NavLink>
          ))}

           {/* AI Chat Button Mobile/Desktop */}
           <NavLink
              to="/aichat"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-purple-600/20 text-purple-400'
                    : 'text-purple-400 hover:bg-purple-600/10'
                }`
              }
            >
              <ChatIcon className="w-6 h-6 mr-0 md:mr-3" />
              <span className="hidden md:block font-medium">AI Chat</span>
            </NavLink>
        </nav>

        {/* Footer / Socials (Hidden on mobile for space) */}
        <div className="hidden md:block p-4 border-t border-slate-800">
          <div className="flex justify-center space-x-4">
            <a href="https://github.com/mohammedzainkhazi/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <i className="fab fa-github text-xl"></i>
            </a>
            <a href="https://www.linkedin.com/in/rootzain/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <i className="fab fa-linkedin text-xl"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <i className="fab fa-twitter text-xl"></i>
            </a>
          </div>
          <p className="text-xs text-slate-500 text-center mt-4">© 2023 RootZain</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto h-screen relative pb-20 md:pb-0">
         {/* Top bar for mobile brand */}
         <div className="md:hidden flex items-center justify-between p-4 glass sticky top-0 z-40">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              RootZain
            </h1>
         </div>

         <div className="p-4 md:p-8 max-w-7xl mx-auto">
           {children}
         </div>
      </main>
    </div>
  );
};

export default Layout;
