
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { format } from 'date-fns';

// We'll store deposit history in localStorage for now
// In a real app, this would come from an API/database
type DepositRecord = {
  id: string;
  amount: number;
  utr: string;
  method: string;
  timestamp: string;
  status: 'success' | 'pending' | 'failed';
};

const getDepositHistory = (): DepositRecord[] => {
  const storedHistory = localStorage.getItem('depositHistory');
  if (!storedHistory) return [];
  return JSON.parse(storedHistory);
};

const DepositHistory = () => {
  const navigate = useNavigate();
  const depositHistory = getDepositHistory();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white sticky top-0 z-10 border-b">
        <div className="flex items-center p-4 gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold flex-1">Deposit History</h1>
        </div>
      </div>

      <div className="p-4">
        {depositHistory.length === 0 ? (
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
          <div className="bg-white rounded-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>UTR</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {depositHistory.map((deposit) => (
                  <TableRow key={deposit.id}>
                    <TableCell className="font-medium">
                      {format(new Date(deposit.timestamp), 'dd/MM/yyyy HH:mm')}
                    </TableCell>
                    <TableCell>₹{deposit.amount}</TableCell>
                    <TableCell>{deposit.utr}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                        ${deposit.status === 'success' ? 'bg-green-100 text-green-800' : 
                         deposit.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                         'bg-red-100 text-red-800'}`}
                      >
                        {deposit.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepositHistory;
