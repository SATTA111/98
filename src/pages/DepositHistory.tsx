
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';

type DepositRecord = {
  id: string;
  amount: number;
  utr: string;
  method: string;
  timestamp: string;
  status: 'success' | 'pending' | 'failed';
  type?: string;
};

type FilterType = 'All' | 'AR Pay' | 'Local Bank' | 'QR';

const getDepositHistory = (): DepositRecord[] => {
  const storedHistory = localStorage.getItem('depositHistory');
  if (!storedHistory) return [];
  return JSON.parse(storedHistory);
};

const DepositHistory = () => {
  const navigate = useNavigate();
  const [depositHistory, setDepositHistory] = useState<DepositRecord[]>([]);
  const [balance, setBalance] = useState(0);
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [dateFilter, setDateFilter] = useState<string>("All");

  useEffect(() => {
    // Add some sample data for demonstration
    if (!localStorage.getItem('depositHistory')) {
      const sampleData: DepositRecord[] = [
        {
          id: "1",
          amount: 500,
          utr: "RC20250508223415834050",
          method: "upi",
          timestamp: "2025-05-08T22:34:15",
          status: "success",
          type: "Paile-QR"
        },
        {
          id: "2",
          amount: 200,
          utr: "RC2025050822135735621153",
          method: "bank",
          timestamp: "2025-05-08T22:13:57",
          status: "success",
          type: "7Day-QR"
        },
        {
          id: "3",
          amount: 500,
          utr: "RC202505082205467712970",
          method: "upi",
          timestamp: "2025-05-08T22:05:46",
          status: "success",
          type: "Paile-QR"
        }
      ];
      localStorage.setItem('depositHistory', JSON.stringify(sampleData));
    }

    setDepositHistory(getDepositHistory());
    const bal = localStorage.getItem('walletBalance');
    setBalance(bal ? parseFloat(bal) : 0);

    // Listen for deposit or storage changes (for live updating)
    const updateHistory = () => {
      setDepositHistory(getDepositHistory());
      const nb = localStorage.getItem('walletBalance');
      setBalance(nb ? parseFloat(nb) : 0);
    };
    window.addEventListener('storage', updateHistory);
    return () => window.removeEventListener('storage', updateHistory);
  }, []);

  const filteredHistory = depositHistory.filter(deposit => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'AR Pay') return deposit.method === 'ar_pay';
    if (activeFilter === 'Local Bank') return deposit.method === 'bank';
    if (activeFilter === 'QR') return deposit.method === 'upi';
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white sticky top-0 z-10 border-b">
        <div className="flex items-center p-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-4">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold flex-1 text-center">Deposit history</h1>
        </div>
      </div>

      <div className="p-4">
        {/* Filter tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          <Button 
            variant={activeFilter === 'All' ? 'default' : 'outline'} 
            onClick={() => setActiveFilter('All')}
            className={`rounded-full flex items-center ${activeFilter === 'All' ? 'bg-red-400 hover:bg-red-500' : 'bg-white'}`}
          >
            <div className="grid grid-cols-2 gap-0.5 mr-1">
              <div className="w-2 h-2 bg-current"></div>
              <div className="w-2 h-2 bg-current"></div>
              <div className="w-2 h-2 bg-current"></div>
              <div className="w-2 h-2 bg-current"></div>
            </div>
            All
          </Button>
          <Button 
            variant={activeFilter === 'AR Pay' ? 'default' : 'outline'} 
            onClick={() => setActiveFilter('AR Pay')}
            className={`rounded-full ${activeFilter === 'AR Pay' ? 'bg-yellow-400 hover:bg-yellow-500' : 'bg-white'}`}
          >
            <div className="mr-1 text-yellow-500">△</div>
            AR Pay
          </Button>
          <Button 
            variant={activeFilter === 'Local Bank' ? 'default' : 'outline'} 
            onClick={() => setActiveFilter('Local Bank')}
            className={`rounded-full ${activeFilter === 'Local Bank' ? 'bg-red-400 hover:bg-red-500' : 'bg-white'}`}
          >
            <div className="mr-1 text-red-500">■</div>
            Local Bank
          </Button>
          <Button 
            variant={activeFilter === 'QR' ? 'default' : 'outline'} 
            onClick={() => setActiveFilter('QR')}
            className={`rounded-full ${activeFilter === 'QR' ? 'bg-blue-400 hover:bg-blue-500' : 'bg-white'}`}
          >
            <div className="mr-1">📱</div>
            QR
          </Button>
        </div>

        {/* Filter dropdowns */}
        <div className="flex gap-2 mb-4">
          <Button 
            variant="outline" 
            className="flex-1 bg-white justify-between"
          >
            <span>All</span>
            <span className="opacity-70">▼</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 bg-white justify-between"
          >
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Choose a date
            </span>
            <span className="opacity-70">▼</span>
          </Button>
        </div>

        {/* Deposit cards */}
        {filteredHistory.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">No deposit history found</div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/deposit')}
            >
              Make your first deposit
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredHistory.map((deposit) => (
              <Card key={deposit.id} className="bg-white shadow-sm">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div className="bg-green-500 text-white px-4 py-1 rounded-md">
                      Deposit
                    </div>
                    <div className="text-green-500 font-medium">Complete</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <div className="text-gray-600">Balance</div>
                      <div className="text-amber-500 font-semibold">₹{deposit.amount.toFixed(2)}</div>
                    </div>
                    
                    <div className="flex justify-between">
                      <div className="text-gray-600">Type</div>
                      <div>{deposit.type || "UPI"}</div>
                    </div>
                    
                    <div className="flex justify-between">
                      <div className="text-gray-600">Time</div>
                      <div>{format(new Date(deposit.timestamp), 'yyyy-MM-dd HH:mm:ss')}</div>
                    </div>
                    
                    <div className="flex justify-between">
                      <div className="text-gray-600">Order number</div>
                      <div className="flex items-center">
                        <span className="truncate max-w-[160px]">{deposit.utr}</span>
                        <span className="ml-2 text-gray-400">📋</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DepositHistory;
