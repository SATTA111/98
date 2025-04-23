
import React, { useState, useEffect } from "react";
import { ArrowLeft, Gift as GiftIcon, wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

type GiftHistory = {
  id: string;
  code: string;
  amount: number;
  date: string;
};

const GIFT_CODE = "SHJDHAJSJDHEUIWSZN";
const GIFT_AMOUNT = 1000;

const GiftPage = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<GiftHistory[]>([]);
  const [successTime, setSuccessTime] = useState<string | null>(null);

  useEffect(() => {
    const hist = localStorage.getItem("giftHistory");
    if (hist) setHistory(JSON.parse(hist));
  }, []);

  const handleReceive = () => {
    if (loading) return;
    setLoading(true);

    setTimeout(() => {
      if (code.trim() === GIFT_CODE) {
        // Check: Code already redeemed?
        const already = history.find((h) => h.code === GIFT_CODE);
        if (already) {
          toast({
            title: "Already Redeemed",
            description: "You have already used this gift code.",
            variant: "destructive",
          });
        } else {
          // Add amount to balance
          let balance = Number(localStorage.getItem("walletBalance") || 0);
          balance += GIFT_AMOUNT;
          localStorage.setItem("walletBalance", balance.toString());
          window.dispatchEvent(new Event("storage")); // update account etc.

          // Add to gift history
          const now = new Date();
          const newHistory: GiftHistory = {
            id: now.getTime().toString(),
            code,
            amount: GIFT_AMOUNT,
            date: now.toISOString(),
          };
          const nextHistory = [newHistory, ...history];
          setHistory(nextHistory);
          localStorage.setItem("giftHistory", JSON.stringify(nextHistory));
          setSuccessTime(now.toISOString());

          toast({
            title: "Successfully received",
            description: `₹${GIFT_AMOUNT} has been added to your balance.`,
            variant: "default",
          });
        }
        setCode("");
      } else {
        toast({
          title: "Invalid Code",
          description: "Please enter a valid gift code.",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-8">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 border-b flex items-center p-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="flex-1 text-lg text-center font-semibold">Gift</h1>
        <div className="w-10" /> {/* spacer for symmetry */}
      </div>

      {/* Gift Image + Form */}
      <div className="flex flex-col items-center mt-2 bg-white rounded-b-2xl pb-4">
        <img
          src="/lovable-uploads/836bf02c-60c4-4423-9dc3-adbfadf5236b.png"
          alt="Gift"
          className="w-64 mb-0 mt-2"
        />
        <div className="w-full px-6">
          <div className="bg-gray-50 rounded-2xl p-4 text-center mt-2">
            <div className="mb-1 text-gray-800 font-semibold">Hi</div>
            <div className="mb-2 text-gray-500">We have a gift for you</div>
            <div className="mb-2 text-sm text-gray-500">
              Please enter the gift code below
            </div>
            <Input
              className="mb-4 text-base"
              placeholder="Please enter gift code"
              value={code}
              onChange={e => setCode(e.target.value)}
              disabled={loading}
            />
            <Button
              className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white text-lg rounded-full py-2 mt-0"
              onClick={handleReceive}
              disabled={loading || !code}
            >
              {loading ? "Receiving..." : "Receive"}
            </Button>
          </div>

          {/* Gift History */}
          <div className="mt-6 bg-white rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2 text-gray-700 font-medium">
              <GiftIcon className="h-5 w-5 text-orange-400" />
              History
            </div>
            <div>
              {history.length === 0 ? (
                <div className="py-5 text-gray-400 text-center text-base">No history yet.</div>
              ) : (
                <div className="space-y-2">
                  {history.map(h => (
                    <div
                      key={h.id}
                      className="flex items-center justify-between bg-orange-50 rounded-lg px-3 py-2"
                    >
                      <div>
                        <div className="text-green-600 text-base font-medium">
                          Successfully received
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(h.date).toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-orange-400">
                        <span>
                          <svg
                            className="inline h-6 w-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="2" y="7" width="20" height="14" rx="2" />
                            <path d="M16 3v4" />
                            <path d="M8 3v4" />
                          </svg>
                        </span>
                        <span className="font-bold text-sm">₹{h.amount}</span>
                      </div>
                    </div>
                  ))}
                  <div className="text-center text-gray-400 text-xs mt-3">No more</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftPage;

