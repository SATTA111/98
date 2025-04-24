
import { Button } from '@/components/ui/button';
import { Wallet, History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      <Button variant="ghost" className="flex flex-col items-center gap-2 h-auto py-2">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
          <Wallet className="h-6 w-6 text-red-500" />
        </div>
        <span className="text-xs">ARWallet</span>
      </Button>
      <Button
        variant="ghost"
        className="flex flex-col items-center gap-2 h-auto py-2"
        onClick={() => navigate('/deposit')}
      >
        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
          <svg className="h-6 w-6 text-orange-500" viewBox="0 0 24 24">
            <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <span className="text-xs">Deposit</span>
      </Button>
      <Button variant="ghost" className="flex flex-col items-center gap-2 h-auto py-2">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <svg className="h-6 w-6 text-blue-500" viewBox="0 0 24 24">
            <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <span className="text-xs">Withdraw</span>
      </Button>
      <Button variant="ghost" className="flex flex-col items-center gap-2 h-auto py-2">
        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-2xl">
          V
        </div>
        <span className="text-xs">VIP</span>
      </Button>
    </div>
  );
};

export default QuickActions;
