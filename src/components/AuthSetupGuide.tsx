import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { AuthError } from 'firebase/auth';

type AuthSetupGuideProps = {
  error: AuthError;
  onClose: () => void;
};

function AuthSetupGuide({ error, onClose }: AuthSetupGuideProps) {
  const getErrorMessage = (error: AuthError) => {
    switch (error.code) {
      case 'auth/unauthorized-domain':
        return {
          title: 'Domain Not Authorized',
          message: 'This domain is not authorized for authentication. Please contact support or try using an authorized domain.',
          action: 'Use an authorized domain or contact support for assistance.'
        };
      case 'auth/popup-blocked':
        return {
          title: 'Popup Blocked',
          message: 'The sign-in popup was blocked by your browser.',
          action: 'Please allow popups for this site and try again.'
        };
      case 'auth/cancelled-popup-request':
        return {
          title: 'Authentication Cancelled',
          message: 'The sign-in process was cancelled.',
          action: 'Please try signing in again.'
        };
      case 'auth/network-request-failed':
        return {
          title: 'Network Error',
          message: 'A network error occurred during authentication.',
          action: 'Please check your internet connection and try again.'
        };
      default:
        return {
          title: 'Authentication Error',
          message: error.message || 'An error occurred during authentication.',
          action: 'Please try again or contact support if the problem persists.'
        };
    }
  };

  const errorDetails = getErrorMessage(error);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {errorDetails.title}
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              {errorDetails.message}
            </p>
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm font-medium text-yellow-800">
                Recommended Action:
              </p>
              <p className="mt-1 text-sm text-yellow-700">
                {errorDetails.action}
              </p>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthSetupGuide;