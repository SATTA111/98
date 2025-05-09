
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface WithdrawalRecord {
  id: string;
  amount: string;
  timestamp: string;
  status: string;
  type: string;
  upiId?: string;
  bankName?: string;
  mobileNumber?: string;
}

export default function WithdrawHistoryPage() {
  const [history, setHistory] = useState<WithdrawalRecord[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const withdrawHistory = JSON.parse(localStorage.getItem("withdrawHistory") || "[]");
    setHistory(withdrawHistory);

    const handleStorage = () => {
      const updatedHistory = JSON.parse(localStorage.getItem("withdrawHistory") || "[]");
      setHistory(updatedHistory);
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Order number copied to clipboard");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white sticky top-0 z-10 border-b">
        <div className="flex items-center p-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold flex-1 text-center">Withdraw</h1>
          <Button 
            variant="ghost" 
            className="text-primary font-medium"
            onClick={() => navigate('/withdraw')}
          >
            Withdrawal history
          </Button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 my-4 text-lg">
          <div className="text-red-500">📋</div>
          <div className="font-medium">Withdrawal history</div>
        </div>

        {history.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">No withdrawal history found</div>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((record) => (
              <div key={record.id} className="bg-white rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white rounded-md py-1 px-3 text-xs">
                    Withdraw
                  </Button>
                  <div className="text-green-500 font-medium">Completed</div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <div className="text-gray-500">Balance</div>
                    <div className="text-orange-500 font-medium">₹{record.amount}</div>
                  </div>
                  
                  <div className="flex justify-between">
                    <div className="text-gray-500">Type</div>
                    <div>{record.type || record.bankName}</div>
                  </div>
                  
                  <div className="flex justify-between">
                    <div className="text-gray-500">Time</div>
                    <div>{new Date(record.timestamp).toLocaleString()}</div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-gray-500">Order number</div>
                    <div className="flex items-center gap-1 text-blue-500">
                      <span className="text-xs">{record.id}</span>
                      <button onClick={() => copyToClipboard(record.id)}>
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
