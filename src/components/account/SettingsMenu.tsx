
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Gift, BarChart3, Languages } from 'lucide-react';

const SettingsMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <Button
        variant="outline"
        className="w-full justify-between h-auto py-4"
        onClick={() => navigate("/gift")}
      >
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <Gift className="h-5 w-5 text-red-500" />
          </div>
          <span>Gifts</span>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </Button>

      <Button 
        variant="outline" 
        className="w-full justify-between h-auto py-4"
        onClick={() => navigate("/game-stats")}
      >
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <BarChart3 className="h-5 w-5 text-red-500" />
          </div>
          <span>Game statistics</span>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </Button>

      <Button variant="outline" className="w-full justify-between h-auto py-4">
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <Languages className="h-5 w-5 text-red-500" />
          </div>
          <span>Language</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-500">English</span>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </div>
      </Button>
    </div>
  );
};

export default SettingsMenu;
