import React from 'react';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { user, signIn, signOut } = useAuth();

  return (
    <nav className="bg-paper border-b-2 border-ink shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <img src="/moworks-logo.svg" alt="Moworks Logo" className="h-8 w-auto" />
            <span className="text-xl font-playful font-semibold text-ink">
              Moworks.AI
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm">
                  <p className="text-ink font-outfit">{user.email}</p>
                  <p className="text-ink/70 text-xs font-outfit">Pro Account</p>
                </div>
                <button
                  onClick={signOut}
                  className="button-handdrawn px-4 py-2 text-sm font-playful text-white 
                           hover:bg-coral-400 transition-colors duration-200 rounded-lg"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={signIn}
                className="button-handdrawn px-4 py-2 text-sm font-playful text-white 
                         hover:bg-coral-400 transition-colors duration-200 rounded-lg"
              >
                Sign In with Google
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;