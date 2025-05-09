
import { Button } from '@/components/ui/button';
import { History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HistoryActions = () => {
  const navigate = useNavigate();
  
  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      <Button variant="outline" className="h-auto p-4 flex items-start gap-3">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <History className="h-5 w-5 text-blue-500" />
        </div>
        <div className="text-left">
          <div className="font-medium">Game History</div>
          <div className="text-sm text-gray-500">My game history</div>
        </div>
      </Button>
      <Button 
        variant="outline" 
        className="h-auto p-4 flex items-start gap-3"
        onClick={() => navigate('/withdraw-history')}
      >
        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
          <History className="h-5 w-5 text-emerald-500" />
        </div>
        <div className="text-left">
          <div className="font-medium">Transaction</div>
          <div className="text-sm text-gray-500">My transaction history</div>
        </div>
      </Button>
    </div>
  );
};

export default HistoryActions;
