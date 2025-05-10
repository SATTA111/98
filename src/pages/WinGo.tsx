
import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Number colors based on the screenshot
const getNumberColor = (num: number) => {
  if ([0, 5].includes(num)) return "bg-gradient-to-br from-violet-500 to-purple-600 text-white";
  if ([1, 3, 7, 9].includes(num)) return "bg-gradient-to-br from-green-400 to-green-600 text-white";
  return "bg-gradient-to-br from-red-400 to-red-600 text-white";
};

// Determine if a number is considered big or small
const getNumberSize = (num: number) => (num >= 5) ? "Big" : "Small";

const WinGo = () => {
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [currentPeriod, setCurrentPeriod] = useState("");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [betAmount, setBetAmount] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [multiplier, setMultiplier] = useState(1);
  const [agreed, setAgreed] = useState(false);
  const [gameMode, setGameMode] = useState("30s"); // 30s, 1Min, 3Min, 5Min
  const [betSlip, setBetSlip] = useState<{active: boolean, type: string, value: string | number | null}>({
    active: false,
    type: "",
    value: null
  });
  
  const [recentResults, setRecentResults] = useState([
    { period: "202505101000513xx", number: 3, size: "Small", color: "green" },
    { period: "202505101000513xx", number: 3, size: "Small", color: "green" },
    { period: "202505101000512xx", number: 4, size: "Small", color: "red" },
    { period: "202505101000512xx", number: 1, size: "Small", color: "green" },
    { period: "202505101000512xx", number: 7, size: "Big", color: "green" },
  ]);

  // Initialize period and timer
  useEffect(() => {
    // Generate period ID with current date + random numbers
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = Math.floor(1000000 + Math.random() * 9000000);
    setCurrentPeriod(`${year}${month}${day}${random}`);
    
    // Start countdown timer
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // Generate result when timer ends
          const result = Math.floor(Math.random() * 10);
          setRecentResults(prev => [{
            period: currentPeriod,
            number: result,
            size: getNumberSize(result),
            color: result === 0 || result === 5 ? "purple" : 
                  [1, 3, 7, 9].includes(result) ? "green" : "red"
          }, ...prev.slice(0, 9)]);
          
          // Reset timer and generate new period
          const newNow = new Date();
          const newYear = newNow.getFullYear();
          const newMonth = String(newNow.getMonth() + 1).padStart(2, '0');
          const newDay = String(newNow.getDate()).padStart(2, '0');
          const newRandom = Math.floor(1000000 + Math.random() * 9000000);
          setCurrentPeriod(`${newYear}${newMonth}${newDay}${newRandom}`);
          
          return gameMode === "30s" ? 30 : gameMode === "1Min" ? 60 : gameMode === "3Min" ? 180 : 300;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameMode, currentPeriod]);

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return { 
      minutes: String(mins).padStart(2, '0'),
      seconds: String(secs).padStart(2, '0')
    };
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setSelectedSize(null);
    setSelectedNumber(null);
    setBetSlip({
      active: true,
      type: "color",
      value: color
    });
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    setSelectedColor(null);
    setSelectedNumber(null);
    setBetSlip({
      active: true,
      type: "size",
      value: size
    });
  };

  const handleNumberSelect = (number: number) => {
    setSelectedNumber(number);
    setSelectedColor(null);
    setSelectedSize(null);
    setBetSlip({
      active: true,
      type: "number",
      value: number
    });
  };

  const placeBet = () => {
    if (!agreed) {
      toast({
        title: "Agreement Required",
        description: "Please agree to the pre-sale rules before placing a bet.",
        variant: "destructive",
      });
      return;
    }

    // Check wallet balance (simulated)
    const walletBalance = localStorage.getItem("walletBalance") ? 
      parseFloat(localStorage.getItem("walletBalance")!) : 0;
    
    const totalAmount = betAmount * quantity * multiplier;
    
    if (walletBalance < totalAmount) {
      toast({
        title: "Insufficient Balance",
        description: "Please deposit funds to place this bet.",
        variant: "destructive",
      });
      return;
    }

    // Place bet logic
    const newBalance = walletBalance - totalAmount;
    localStorage.setItem("walletBalance", newBalance.toString());
    
    toast({
      title: "Bet Placed Successfully",
      description: `₹${totalAmount} bet placed on ${betSlip.type} ${betSlip.value}`,
    });

    // Dispatch storage event to update other components with new balance
    window.dispatchEvent(new Event("storage"));
    
    // Reset bet slip
    setBetSlip({
      active: false,
      type: "",
      value: null
    });
    
    setSelectedColor(null);
    setSelectedNumber(null);
    setSelectedSize(null);
  };

  const cancelBet = () => {
    setBetSlip({
      active: false,
      type: "",
      value: null
    });
    setSelectedColor(null);
    setSelectedNumber(null);
    setSelectedSize(null);
  };

  // Format time for display
  const time = formatTime(timeRemaining);

  return (
    <div className="min-h-screen bg-red-400">
      {/* Header */}
      <header className="bg-red-400 p-4 flex justify-between items-center">
        <button onClick={() => navigate('/')} className="text-white">
          <ArrowLeft />
        </button>
        <img 
          src="/lovable-uploads/3ca1aaf6-f21e-4877-8bf1-49aca0d40e7d.png" 
          alt="91 Club" 
          className="h-8"
        />
        <div className="flex gap-2">
          <button className="w-8 h-8 text-white bg-white/20 rounded-full flex items-center justify-center">
            <span className="sr-only">Support</span>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 18v-6a9 9 0 0118 0v6" />
              <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v5z" />
              <path d="M3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v5z" />
            </svg>
          </button>
          <button className="w-8 h-8 text-white bg-white/20 rounded-full flex items-center justify-center">
            <span className="sr-only">History</span>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </button>
        </div>
      </header>

      {/* Wallet Balance */}
      <div className="p-4 bg-white rounded-xl mx-4 mb-4">
        <div className="flex items-center mb-2">
          <span className="text-red-500 mr-2">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 18v1a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v1" />
              <path d="M16 12H4" />
              <path d="M8 8l-4 4 4 4" />
            </svg>
          </span>
          <span>Wallet balance</span>
        </div>
        <div className="flex justify-between">
          <div className="text-xl font-bold">₹{localStorage.getItem("walletBalance") || "0.00"}</div>
          <div className="flex gap-2">
            <button onClick={() => navigate('/withdraw')} className="bg-red-100 text-red-500 px-4 py-1 rounded-xl text-sm">
              Withdraw
            </button>
            <button onClick={() => navigate('/deposit')} className="bg-green-500 text-white px-4 py-1 rounded-xl text-sm">
              Deposit
            </button>
          </div>
        </div>
      </div>

      {/* Game modes */}
      <div className="bg-white rounded-t-3xl p-4">
        <div className="flex justify-between mb-6 overflow-x-auto">
          <button 
            onClick={() => setGameMode("30s")}
            className={`flex flex-col items-center min-w-[4rem] ${gameMode === "30s" ? "bg-red-400 text-white" : "bg-gray-100 text-gray-500"} 
              rounded-lg p-3 transition-colors`}
          >
            <div className="rounded-full p-1">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-xs mt-1">Win Go</span>
            <span className="font-bold">30s</span>
          </button>
          
          <button 
            onClick={() => setGameMode("1Min")}
            className={`flex flex-col items-center min-w-[4rem] ${gameMode === "1Min" ? "bg-red-400 text-white" : "bg-gray-100 text-gray-500"} 
              rounded-lg p-3 transition-colors`}
          >
            <div className="rounded-full p-1">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-xs mt-1">Win Go</span>
            <span className="font-bold">1Min</span>
          </button>
          
          <button 
            onClick={() => setGameMode("3Min")}
            className={`flex flex-col items-center min-w-[4rem] ${gameMode === "3Min" ? "bg-red-400 text-white" : "bg-gray-100 text-gray-500"} 
              rounded-lg p-3 transition-colors`}
          >
            <div className="rounded-full p-1">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-xs mt-1">Win Go</span>
            <span className="font-bold">3Min</span>
          </button>
          
          <button 
            onClick={() => setGameMode("5Min")}
            className={`flex flex-col items-center min-w-[4rem] ${gameMode === "5Min" ? "bg-red-400 text-white" : "bg-gray-100 text-gray-500"} 
              rounded-lg p-3 transition-colors`}
          >
            <div className="rounded-full p-1">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-xs mt-1">Win Go</span>
            <span className="font-bold">5Min</span>
          </button>
        </div>
        
        {/* How to play & Timer */}
        <div className="flex bg-red-400 rounded-xl text-white mb-4">
          <div className="flex items-center gap-2 p-4 flex-1">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 18l6-6-6-6" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            <div>
              <div className="text-sm">How to play</div>
              <div className="font-bold">Win Go {gameMode}</div>
            </div>
          </div>
          
          <div className="p-4 flex-1 text-right">
            <div className="text-sm">Time remaining</div>
            <div className="flex justify-end gap-1 mt-1">
              <span className="inline-block bg-gray-100 text-black px-2 py-1 rounded">{time.minutes[0]}</span>
              <span className="inline-block bg-gray-100 text-black px-2 py-1 rounded">{time.minutes[1]}</span>
              <span className="text-xl">:</span>
              <span className="inline-block bg-gray-100 text-black px-2 py-1 rounded">{time.seconds[0]}</span>
              <span className="inline-block bg-gray-100 text-black px-2 py-1 rounded">{time.seconds[1]}</span>
            </div>
            <div className="text-xs mt-1">{currentPeriod}</div>
          </div>
        </div>
        
        {/* Color selection */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <Button 
            onClick={() => handleColorSelect("Green")} 
            className={`${selectedColor === "Green" ? "ring-2 ring-offset-2 ring-green-500" : ""} bg-green-500 hover:bg-green-600 h-12`}
          >
            Green
          </Button>
          <Button 
            onClick={() => handleColorSelect("Violet")} 
            className={`${selectedColor === "Violet" ? "ring-2 ring-offset-2 ring-violet-500" : ""} bg-violet-500 hover:bg-violet-600 h-12`}
          >
            Violet
          </Button>
          <Button 
            onClick={() => handleColorSelect("Red")} 
            className={`${selectedColor === "Red" ? "ring-2 ring-offset-2 ring-red-500" : ""} bg-red-500 hover:bg-red-600 h-12`}
          >
            Red
          </Button>
        </div>
        
        {/* Number selection */}
        <div className="grid grid-cols-5 gap-3 mb-6">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => (
            <Button
              key={number}
              onClick={() => handleNumberSelect(number)}
              className={`${getNumberColor(number)} rounded-full h-16 w-16 text-xl font-bold
                ${selectedNumber === number ? "ring-2 ring-offset-2 ring-gray-500" : ""}`}
            >
              {number}
            </Button>
          ))}
        </div>
        
        {/* Big/Small selection */}
        <div className="flex rounded-full overflow-hidden mb-6">
          <Button 
            onClick={() => handleSizeSelect("Big")}
            className={`flex-1 rounded-none h-12 ${selectedSize === "Big" ? "bg-orange-400" : "bg-orange-300"} hover:bg-orange-400`}
          >
            Big
          </Button>
          <Button 
            onClick={() => handleSizeSelect("Small")}
            className={`flex-1 rounded-none h-12 ${selectedSize === "Small" ? "bg-blue-400" : "bg-blue-300"} hover:bg-blue-400`}
          >
            Small
          </Button>
        </div>

        {/* Game History Tab */}
        <div className="mb-6">
          <div className="flex border-b">
            <button className="flex-1 py-3 text-center border-b-2 border-red-400 text-red-500 font-medium">
              Game history
            </button>
            <button className="flex-1 py-3 text-center text-gray-500">
              Chart
            </button>
            <button className="flex-1 py-3 text-center text-gray-500">
              My history
            </button>
          </div>
          
          <div className="mt-2">
            <div className="grid grid-cols-4 bg-red-400 text-white py-3 rounded-t-lg">
              <div className="text-center">Period</div>
              <div className="text-center">Number</div>
              <div className="text-center">Big/Small</div>
              <div className="text-center">Color</div>
            </div>
            
            {recentResults.map((result, index) => (
              <div key={index} className="grid grid-cols-4 border-b py-3">
                <div className="text-center text-xs">{result.period.substring(result.period.length - 6)}</div>
                <div className="text-center font-bold" style={{ 
                  color: result.color === "red" ? "#f87171" : 
                          result.color === "green" ? "#4ade80" : "#a78bfa" 
                }}>
                  {result.number}
                </div>
                <div className="text-center">{result.size}</div>
                <div className="text-center">
                  <div className={`w-4 h-4 mx-auto rounded-full bg-${result.color === "purple" ? "violet" : result.color}-500`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Betting slip - conditionally rendered */}
      {betSlip.active && (
        <div className="fixed bottom-0 left-0 right-0 bg-orange-300 rounded-t-3xl pt-6 pb-3 px-4 z-50">
          <div className="text-center text-xl font-bold text-white mb-3">
            Win Go {gameMode}
          </div>
          
          <div className="bg-white rounded-md p-4 mb-4">
            <div className="flex justify-between mb-2">
              <div>Select</div>
              <div className="font-bold">
                {betSlip.type === "color" && betSlip.value}
                {betSlip.type === "size" && betSlip.value}
                {betSlip.type === "number" && `Number ${betSlip.value}`}
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <div className="font-bold">Balance</div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setBetAmount(1)} 
                  className={`px-4 py-1 rounded-md ${betAmount === 1 ? 'bg-orange-400 text-white' : 'bg-gray-100'}`}
                >
                  1
                </button>
                <button 
                  onClick={() => setBetAmount(10)} 
                  className={`px-4 py-1 rounded-md ${betAmount === 10 ? 'bg-orange-400 text-white' : 'bg-gray-100'}`}
                >
                  10
                </button>
                <button 
                  onClick={() => setBetAmount(100)} 
                  className={`px-4 py-1 rounded-md ${betAmount === 100 ? 'bg-orange-400 text-white' : 'bg-gray-100'}`}
                >
                  100
                </button>
                <button 
                  onClick={() => setBetAmount(1000)} 
                  className={`px-4 py-1 rounded-md ${betAmount === 1000 ? 'bg-orange-400 text-white' : 'bg-gray-100'}`}
                >
                  1000
                </button>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <div className="font-bold">Quantity</div>
              <div className="flex items-center">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="bg-orange-400 text-white h-10 w-10 rounded-md flex items-center justify-center"
                >
                  -
                </button>
                <div className="px-4 py-1 text-xl w-12 text-center">{quantity}</div>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="bg-orange-400 text-white h-10 w-10 rounded-md flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="flex justify-between gap-2 mb-4">
              {[1, 5, 10, 20, 50, 100].map(mult => (
                <button 
                  key={mult}
                  onClick={() => setMultiplier(mult)}
                  className={`px-2 py-1 rounded-md text-sm flex-1 
                    ${multiplier === mult ? 'bg-orange-400 text-white' : 'bg-gray-100'}`}
                >
                  X{mult}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="agreement" 
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-5 h-5 accent-red-500"
                />
                <label htmlFor="agreement" className="text-sm">I agree</label>
              </div>
              <button className="text-red-400 text-sm">«Pre-sale rules»</button>
            </div>
          </div>
          
          <div className="flex">
            <button 
              onClick={cancelBet}
              className="flex-1 py-3 text-gray-700 font-medium"
            >
              Cancel
            </button>
            <button 
              onClick={placeBet}
              className="flex-1 bg-orange-400 py-3 rounded-md text-white font-medium"
            >
              Total amount ₹{(betAmount * quantity * multiplier).toFixed(2)}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WinGo;
