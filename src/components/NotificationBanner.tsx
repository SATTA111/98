
import React from 'react';
import { Mail } from 'lucide-react';

const NotificationBanner = () => {
  return (
    <div className="bg-gray-100 px-4 py-3 flex items-start justify-between">
      <div className="flex items-start gap-3">
        <span className="text-gray-500 text-lg mt-1">🔊</span>
        <p className="text-sm text-gray-700 flex-1">
          If you have not received your withdrawal within 3 days, please contact our self-service center with your bank statement (PDF/VIDEO) and PDF password
        </p>
      </div>
      <Mail className="text-gray-500 h-6 w-6 flex-shrink-0 ml-2" />
    </div>
  );
};

export default NotificationBanner;
