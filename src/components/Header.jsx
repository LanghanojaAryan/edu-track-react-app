
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  
  const roleColor = user?.role === 'faculty' ? 'bg-faculty text-white' : 'bg-student text-white';
  
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 font-semibold text-lg">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
              ERP
            </div>
            <span>College ERP</span>
          </Link>
          {user && (
            <div className={`px-4 py-1 rounded-full text-sm ${roleColor}`}>
              {user.role === 'faculty' ? 'Faculty' : 'Student'}
            </div>
          )}
        </div>
        
        <nav className="flex items-center gap-4">
          {user && (
            <>
              <span className="text-sm font-medium">
                {user.name}
              </span>
              <Button variant="ghost" size="icon" onClick={logout} title="Logout">
                <LogOut className="w-5 h-5" />
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
