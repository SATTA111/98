import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from "@/hooks/use-toast";
import UPIDepositSheet from '@/components/UPIDepositSheet';

const depositMethods = [
  {
    key: "qr-upi",
    label: "QR UPI",
    emoji: "💳",
    enabled: true,
  },
  {
    key: "upi-qr-pay",
    label: "UPI-QR PAY",
    emoji: "📱",
    enabled: true,
  },
  {
    key: "arpay",
    label: "ARPay",
    emoji: "🅰️",
    badge: "+1%",
    badgeColor: "text-red-500",
    enabled: false,
  },
  {
    key: "expert-paytm",
    label: "Expert Paytm-QR",
    emoji: "🔄",
    enabled: false,
  },
  {
    key: "usdt",
    label: "USDT",
    emoji: "💲",
    badge: "+2%",
    badgeColor: "text-green-500",
    enabled: false,
  },
];

const UPI_METHODS = ["qr-upi", "upi-qr-pay"];

const Deposit = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0.51);
  const [upiSheetOpen, setUPISheetOpen] = useState(false);
  const [upiMethodLabel, setUPIMethodLabel] = useState("");

  useEffect(() => {
    const updateBalance = () => {
      const storedBalance = localStorage.getItem('walletBalance');
      setBalance(storedBalance ? parseFloat(storedBalance) : 0);
    };
    updateBalance();

    window.addEventListener("storage", updateBalance);
    return () => {
      window.removeEventListener("storage", updateBalance);
    };
  }, [upiSheetOpen]);

  const updatedDepositMethods = depositMethods.map((method) => ({
    ...method,
    enabled: UPI_METHODS.includes(method.key),
  }));

  const handleDepositMethodClick = (enabled: boolean, method: string, label: string) => {
    if (!enabled) {
      toast({
        title: "Not available",
        description: "This deposit method is not available yet.",
        variant: "destructive",
      });
      return;
    }
    if (UPI_METHODS.includes(method)) {
      setUPIMethodLabel(label);
      setUPISheetOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <UPIDepositSheet
        open={upiSheetOpen}
        onOpenChange={setUPISheetOpen}
        methodLabel={upiMethodLabel}
      />
      <div className="bg-white sticky top-0 z-10 border-b">
        <div className="flex items-center p-4 gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold flex-1">Deposit</h1>
          <Button variant="ghost" className="text-gray-600" onClick={() => navigate('/deposit-history')}>
            Deposit history
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <Card className="bg-gradient-to-r from-red-400 to-red-500 p-4 text-white rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm opacity-90">💰 Balance</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">₹{balance.toFixed(2)}</span>
                <img
                  src="/lovable-uploads/ee23f973-1a50-4f55-9c73-26e91c2d26a2.png"
                  alt="VIP Icon"
                  className="w-7 h-7"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
            <img
              src="/lovable-uploads/ac524e01-6057-4b93-a412-38eb33dee467.png"
              alt="Wallet Icon"
              className="w-12 h-12"
            />
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          {updatedDepositMethods.map((method) => (
            <Card
              key={method.key}
              className={
                "p-4 flex flex-col items-center text-center transition-opacity relative select-none " +
                (!method.enabled
                  ? "opacity-50 pointer-events-none"
                  : "cursor-pointer hover:shadow-lg hover:bg-red-50")
              }
              onClick={() =>
                handleDepositMethodClick(method.enabled, method.key, method.label)
              }
            >
              <div className="text-2xl mb-1">{method.emoji}</div>
              <div className="text-sm font-medium">{method.label}</div>
              {method.badge && (
                <div className={`text-xs ${method.badgeColor}`}>{method.badge}</div>
              )}
              {!method.enabled && (
                <span className="absolute inset-0 rounded-xl z-10"></span>
              )}
            </Card>
          ))}
        </div>

        <Button variant="outline" className="w-full justify-between py-6">
          <div className="flex gap-2 items-center">
            <span className="text-red-500">📜</span>
            <span>AR Pay transaction rules</span>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </Button>

        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <img
                  src="/lovable-uploads/8c319a46-a577-4aff-8fc2-23cda0867d02.png"
                  alt="Wallet Icon"
                  className="w-8 h-8"
                />
                <h3 className="text-lg font-medium">AR Wallet</h3>
              </div>
              <Button variant="secondary" className="bg-red-500 hover:bg-red-600 text-white">
                activate AR wallet
              </Button>
            </div>
            <p className="text-gray-600 mb-4">
              AR Wallet is a third-party payment service platform that facilitates fast payments on the platform using ARB (digital currency)
            </p>
            <h4 className="font-medium mb-2">Safe, stable and fast</h4>
            <Button variant="ghost" className="w-full justify-between py-4 px-0">
              <span>How to activate AR wallet</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Button>
          </div>

          <div className="bg-white rounded-xl p-4">
            <h3 className="text-lg font-medium mb-4">AR wallet features</h3>
            <div className="space-y-4 text-gray-600">
              <p>You only need 91club to withdraw the balance to AR Wallet</p>
              <p>
                When you want to play games, you can quickly recharge to the 91club platform through AR Pay, with the recharge process taking only 5 seconds to complete
              </p>
              <p>
                When you need to withdraw money to your bank card, you can quickly sell ARB through UPI in your AR wallet to get rupees, and you can also get additional rewards!
              </p>
              <p>
                This method reduces your bank transaction issues while you are playing, so you don't need to worry about bank limits. You just need to sell to UPI when you need to use the funds.
              </p>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
          <Button 
            className="w-full bg-gradient-to-r from-red-400 to-red-500 text-white h-12"
            onClick={() => setUPISheetOpen(true)}
          >
            Deposit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
