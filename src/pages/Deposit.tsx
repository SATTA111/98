import React from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Deposit = () => {
  const navigate = useNavigate();
  const balance = 0.51;

  return (
    <div className="min-h-screen bg-gray-50">
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
              <div className="text-2xl font-bold">₹{balance}</div>
            </div>
            <img src="/lovable-uploads/42dbdaac-2f43-4be7-8960-25e847403cce.png" alt="AR Logo" className="w-12 h-12" />
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 flex flex-col items-center text-center bg-gradient-to-br from-red-50 to-red-100">
            <div className="text-2xl mb-1">🅰️</div>
            <div className="text-sm font-medium">ARPay</div>
            <div className="text-xs text-red-500">+1%</div>
          </Card>
          <Card className="p-4 flex flex-col items-center text-center">
            <div className="text-2xl mb-1">💳</div>
            <div className="text-sm font-medium">Innate UPI-QR</div>
          </Card>
          <Card className="p-4 flex flex-col items-center text-center">
            <div className="text-2xl mb-1">🔄</div>
            <div className="text-sm font-medium">Expert Paytm-QR</div>
          </Card>
          <Card className="p-4 flex flex-col items-center text-center">
            <div className="text-2xl mb-1">📱</div>
            <div className="text-sm font-medium">UPI-QR PAY</div>
          </Card>
          <Card className="p-4 flex flex-col items-center text-center bg-gradient-to-br from-green-50 to-green-100">
            <div className="text-2xl mb-1">💲</div>
            <div className="text-sm font-medium">USDT</div>
            <div className="text-xs text-green-500">+2%</div>
          </Card>
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
          <Button className="w-full bg-gradient-to-r from-red-400 to-red-500 text-white h-12">
            Deposit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
