
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WithdrawalRecord {
  id: string;
  upiId: string;
  bankName: string;
  mobileNumber: string;
  amount: string;
  timestamp: string;
  status: string;
}

export default function WithdrawHistoryPage() {
  const [history, setHistory] = useState<WithdrawalRecord[]>([]);

  useEffect(() => {
    const withdrawHistory = JSON.parse(localStorage.getItem("withdrawHistory") || "[]");
    setHistory(withdrawHistory);
  }, []);

  return (
    <div className="container max-w-xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">Withdrawal History</h1>
      <div className="space-y-4">
        {history.length === 0 ? (
          <p className="text-center text-gray-500">No withdrawal history found</p>
        ) : (
          history.map((record) => (
            <Card key={record.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>₹{record.amount}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(record.timestamp).toLocaleDateString()}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">UPI ID</p>
                    <p>{record.upiId}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Bank</p>
                    <p>{record.bankName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Mobile</p>
                    <p>{record.mobileNumber}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Status</p>
                    <p className="capitalize">{record.status}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
