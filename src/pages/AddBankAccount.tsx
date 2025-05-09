
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { 
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Bank {
  id: string;
  name: string;
}

const banks: Bank[] = [
  { id: 'sbi', name: 'State Bank of India' },
  { id: 'hdfc', name: 'HDFC Bank' },
  { id: 'icici', name: 'ICICI Bank' },
  { id: 'axis', name: 'Axis Bank' },
  { id: 'pnb', name: 'Punjab National Bank' },
  { id: 'bob', name: 'Bank of Baroda' },
  { id: 'canara', name: 'Canara Bank' },
  { id: 'indpost', name: 'India Post Bank' },
];

const AddBankAccount = () => {
  const navigate = useNavigate();
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [recipientName, setRecipientName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [showBankDialog, setShowBankDialog] = useState(false);

  const handleSave = () => {
    if (!selectedBank) {
      toast.error("Please select a bank");
      return;
    }
    if (!recipientName) {
      toast.error("Please enter recipient's name");
      return;
    }
    if (!accountNumber) {
      toast.error("Please enter account number");
      return;
    }
    if (!phoneNumber) {
      toast.error("Please enter phone number");
      return;
    }
    if (!ifscCode) {
      toast.error("Please enter IFSC code");
      return;
    }

    const bankAccount = {
      bank: selectedBank,
      recipientName,
      accountNumber,
      phoneNumber,
      ifscCode,
      id: Date.now().toString()
    };

    const existingAccounts = JSON.parse(localStorage.getItem('bankAccounts') || '[]');
    localStorage.setItem('bankAccounts', JSON.stringify([...existingAccounts, bankAccount]));
    
    toast.success("Bank account added successfully");
    navigate('/withdraw');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white sticky top-0 z-10 border-b">
        <div className="flex items-center p-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold flex-1 text-center">Add a bank account number</h1>
        </div>
      </div>
      
      <div className="p-4 space-y-6">
        {/* Bank Selection */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="text-red-500 text-xl">🏛️</div>
            <div className="font-medium">Choose a bank</div>
          </div>
          
          <Dialog open={showBankDialog} onOpenChange={setShowBankDialog}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-between bg-red-100 text-left p-4 h-auto border-none rounded-xl"
              >
                <span className="text-gray-500">{selectedBank ? selectedBank.name : 'Please select a bank'}</span>
                <span>›</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[70vh] overflow-y-auto">
              <div className="space-y-2 py-2">
                {banks.map(bank => (
                  <Button 
                    key={bank.id} 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => {
                      setSelectedBank(bank);
                      setShowBankDialog(false);
                    }}
                  >
                    {bank.name}
                  </Button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Recipient Name */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="text-red-500 text-xl">👤</div>
            <div className="font-medium">Full recipient's name</div>
          </div>
          <Input 
            placeholder="Please enter the recipient's name" 
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            className="bg-white p-4 h-14"
          />
        </div>
        
        {/* Bank Account Number */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="text-red-500 text-xl">💳</div>
            <div className="font-medium">Bank account number</div>
          </div>
          <Input 
            placeholder="Please enter your bank account number" 
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="bg-white p-4 h-14"
          />
        </div>
        
        {/* Phone Number */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="text-red-500 text-xl">📱</div>
            <div className="font-medium">Phone number</div>
          </div>
          <Input 
            placeholder="Please enter your phone number" 
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="bg-white p-4 h-14"
          />
        </div>
        
        {/* IFSC Code */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="text-red-500 text-xl">🔍</div>
            <div className="font-medium">IFSC code</div>
          </div>
          <Input 
            placeholder="Please enter IFSC code" 
            value={ifscCode}
            onChange={(e) => setIfscCode(e.target.value)}
            className="bg-white p-4 h-14"
          />
        </div>
        
        {/* Save Button */}
        <Button 
          className="w-full py-6 bg-gray-300 text-white text-lg font-medium rounded-xl mt-8"
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default AddBankAccount;
