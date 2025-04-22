
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import BottomNav from '@/components/BottomNav';

const AccountPage = () => {
  const uid = Math.random().toString(36).substring(2, 10).toUpperCase();

  const copyUID = () => {
    navigator.clipboard.writeText(uid);
    toast.success("UID copied to clipboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-b from-purple-600 to-purple-800 p-6 text-white">
        <div className="flex flex-col items-center pt-4">
          <div className="w-20 h-20 bg-gray-300 rounded-full mb-3 overflow-hidden">
            <img 
              src="/lovable-uploads/42dbdaac-2f43-4be7-8960-25e847403cce.png" 
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <p className="text-lg">UID: {uid}</p>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={copyUID}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h3 className="text-lg font-medium">Security Center</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span>Phone Number</span>
              <span className="text-gray-500">Not bound</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Email</span>
              <span className="text-gray-500">Not bound</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Password</span>
              <span className="text-gray-500">Change</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4">
            <h3 className="text-lg font-medium mb-4">Account</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Nickname</span>
                <span className="text-gray-500">User_{uid}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Language</span>
                <span className="text-gray-500">English</span>
              </div>
            </div>
          </div>
        </div>

        <Button 
          variant="destructive" 
          className="w-full"
        >
          Sign Out
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default AccountPage;
