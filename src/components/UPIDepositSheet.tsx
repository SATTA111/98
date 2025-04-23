
import React, { useState, useRef, useEffect } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { BookText, Timer } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const UPI_CHANNELS = [
  { key: "rujia", label: "RuJia-QR", limit: "200 - 50K" },
  { key: "7day", label: "7Day-QR", limit: "200 - 50K" },
  { key: "ffpay", label: "FFPay", limit: "200 - 50K" },
  { key: "umoney", label: "Umoney-QR", limit: "100 - 2K" },
  { key: "wpay", label: "WPay-QR", limit: "200 - 50K" },
  { key: "iceqr", label: "ICE-QR", limit: "200 - 50K" },
  { key: "yayapay", label: "YayaPay-QR", limit: "300 - 50K" },
  { key: "superqr", label: "Super-QR", limit: "100 - 50K" },
];

const AMOUNTS = [
  200, 500, 800,
  1000, 2000, 3000,
  5000, 10000, 20000,
  30000, 40000, 50000,
];

const instructions = [
  "If the transfer time is up, please fill out the deposit form again.",
  "The transfer amount must match the order you created, otherwise the money cannot be credited successfully.",
  "If you transfer the wrong amount, our company will not be responsible for the lost amount!",
  "Note: do not cancel the deposit order after the money has been transferred.",
];

type UPIProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  methodLabel: string;
};

const isValidUTR = (utr: string) => /^[0-9]{12}[a-zA-Z]{3}$/.test(utr);

const QrPaymentSection: React.FC<{
  amount: number;
  onBack: () => void;
  onSuccess: () => void;
}> = ({ amount, onBack, onSuccess }) => {
  // 2 minute countdown
  const [secondsLeft, setSecondsLeft] = useState(120);
  const [utr, setUtr] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((sec) => {
        if (sec === 1 && intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        return sec - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [secondsLeft]);

  const minutes = Math.floor(Math.max(0, secondsLeft) / 60);
  const seconds = Math.max(0, secondsLeft) % 60;

  // New: handle submit
  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Only enable if valid
    if (isValidUTR(utr)) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        toast({
          title: "Deposit saved!",
          description: `UTR: ${utr}`,
          duration: 3000,
        });
        onSuccess();
      }, 1000);
    }
  };

  return (
    <div className="px-4 pt-1 pb-4">
      {/* Deposit top header (custom icon) */}
      <div className="flex items-center gap-2 mb-3">
        <img
          src="/lovable-uploads/03a02263-2f03-40f1-8a7c-dd17b6cf8735.png"
          alt="Deposit"
          className="w-8 h-8 object-contain"
        />
        <span className="text-lg font-semibold">Deposit Payment</span>
        <Button
          variant="ghost"
          className="ml-auto text-xs text-gray-500 underline"
          onClick={onBack}
        >
          Change
        </Button>
      </div>
      {/* QR Code */}
      <div className="flex flex-col items-center my-4">
        <img
          src="/lovable-uploads/03a02263-2f03-40f1-8a7c-dd17b6cf8735.png"
          alt="UPI QR"
          className="w-44 h-44 rounded-lg border"
          style={{ objectFit: "contain" }}
        />
        <div className="font-semibold mt-2 text-lg text-red-500">
          Pay ₹{amount < 1000 ? amount : `${amount / 1000}K`} via UPI
        </div>
      </div>
      {/* UTR Input & timer */}
      <div className="flex items-center gap-2 mb-3">
        <input
          className="flex-1 border rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
          placeholder="Enter UTR number (12 digits + 3 letters)"
          value={utr}
          onChange={(e) => {
            // Only allow max 15 chars, first 0-12: number, last 13-15: letter
            let val = e.target.value.replace(/[^0-9a-zA-Z]/g, "").slice(0, 15);
            // Only allow numbers in first 12, rest must be letters
            if (val.length > 12) {
              val =
                val.slice(0, 12).replace(/[^0-9]/g, "") +
                val.slice(12, 15).replace(/[^a-zA-Z]/g, "");
            } else {
              val = val.replace(/[^0-9]/g, "");
            }
            setUtr(val);
          }}
          maxLength={15}
        />
        <div className="flex items-center gap-1 px-3 py-2 rounded bg-gray-100 text-red-500 font-medium">
          <Timer className="w-4 h-4 mr-1" />
          {minutes}:{seconds.toString().padStart(2, "0")}
        </div>
      </div>
      <Button
        className="w-full bg-gradient-to-r from-red-400 to-red-500 text-white"
        disabled={!isValidUTR(utr) || secondsLeft === 0 || loading}
        onClick={handleSubmit}
      >
        {loading ? "Processing..." : "Submit"}
      </Button>
      <div className="mt-2 text-center text-xs text-gray-500">
        QR will expire once timer reaches 0. After expiry, you can restart the payment process.
      </div>
    </div>
  );
};

const UPIDepositSheet: React.FC<UPIProps> = ({
  open,
  onOpenChange,
  methodLabel,
}) => {
  const [selectedChannel, setSelectedChannel] = useState(UPI_CHANNELS[0].key);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [showQRSection, setShowQRSection] = useState(false);

  // Reset all on close
  useEffect(() => {
    if (!open) {
      setSelectedChannel(UPI_CHANNELS[0].key);
      setSelectedAmount(null);
      setShowQRSection(false);
    }
  }, [open]);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="max-w-md mx-auto w-full pt-2 pb-1 px-0">
          {!showQRSection ? (
            <>
              <DrawerHeader>
                <div className="flex items-center gap-2">
                  {/* Custom Deposit Icon */}
                  <img
                    src="/lovable-uploads/03a02263-2f03-40f1-8a7c-dd17b6cf8735.png"
                    alt="Deposit icon"
                    className="w-6 h-6 object-contain"
                  />
                  <DrawerTitle className="text-lg font-semibold flex-1">
                    Deposit
                  </DrawerTitle>
                  <DrawerClose>
                    <Button variant="ghost" size="icon"><span className="sr-only">Close</span>✕</Button>
                  </DrawerClose>
                  <Button variant="ghost" className="text-red-400 font-medium text-sm px-0" disabled>
                    Deposit history
                  </Button>
                </div>
              </DrawerHeader>
              {/* Channel */}
              <div className="px-4 mt-4 mb-2">
                <div className="flex items-center gap-2 mb-2">
                  <BookText className="h-5 w-5 text-red-500" />
                  <span className="font-medium text-base">Select channel</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {UPI_CHANNELS.map((c) => (
                    <button
                      key={c.key}
                      className={
                        "rounded-lg p-3 text-left border bg-white " +
                        (selectedChannel === c.key
                          ? "bg-gradient-to-r from-red-400 to-red-300 text-white font-semibold border-red-400"
                          : "text-gray-700 border-gray-200 hover:border-red-300")
                      }
                      onClick={() => setSelectedChannel(c.key)}
                      type="button"
                    >
                      <div className="text-xs">{c.label}</div>
                      <div className="text-[11px] opacity-80">
                        Balance:{c.limit}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              {/* Amount */}
              <div className="px-4 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  {/* Custom Amount Icon */}
                  <img
                    src="/lovable-uploads/03a02263-2f03-40f1-8a7c-dd17b6cf8735.png"
                    alt="amount"
                    className="w-6 h-6 object-contain"
                  />
                  <span className="font-medium text-base">Deposit amount</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {AMOUNTS.map((amt) => (
                    <button
                      key={amt}
                      className={
                        "rounded-md py-2 text-center border " +
                        (selectedAmount === amt
                          ? "border-red-500 bg-red-50 text-red-500 font-semibold"
                          : "border-gray-200 text-red-500 hover:bg-red-50")
                      }
                      onClick={() => setSelectedAmount(amt)}
                      type="button"
                    >
                      ₹{amt < 1000 ? amt : `${amt / 1000}K`}
                    </button>
                  ))}
                </div>
                <div className="flex items-center rounded-lg mt-3 bg-gray-100 px-3 py-2">
                  <img
                    src="/lovable-uploads/03a02263-2f03-40f1-8a7c-dd17b6cf8735.png"
                    className="h-5 w-5 object-contain"
                    alt="Amount"
                  />
                  <input
                    className="ml-2 bg-transparent outline-none w-full font-medium"
                    type="text"
                    value={
                      selectedAmount ? `₹${selectedAmount < 1000 ? selectedAmount : `${selectedAmount / 1000}K`}` : ""
                    }
                    readOnly
                    placeholder="₹200.00 - ₹50,000.00"
                  />
                  {selectedAmount && (
                    <button
                      onClick={() => setSelectedAmount(null)}
                      type="button"
                      className="ml-2 text-gray-400 hover:text-red-500"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
              {/* Instructions */}
              <div className="px-4 mt-5">
                <div className="flex items-center gap-2 mb-2">
                  <BookText className="h-5 w-5 text-red-500" />
                  <span className="font-medium text-base">Recharge instructions</span>
                </div>
                <div className="rounded-lg border border-gray-100 bg-gray-50 mb-2 p-3 text-[13px] text-gray-600">
                  <ul className="space-y-1">
                    {instructions.map((ins, i) => (
                      <li className="flex items-start gap-2" key={i}>
                        <span className="text-red-500 mt-1">•</span>
                        <span>{ins}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Recharge method & Deposit button */}
              <div className="fixed left-0 right-0 bottom-0 p-3 border-t bg-white z-20 max-w-md mx-auto">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-xs text-gray-500">Recharge Method:</span>
                    <div className="text-base font-medium text-gray-900">
                      {
                        UPI_CHANNELS.find((c) => c.key === selectedChannel)?.label || ""
                      }
                    </div>
                  </div>
                  <Button
                    className="bg-gradient-to-r from-red-400 to-red-500 text-white px-8"
                    disabled={!selectedAmount}
                    onClick={() => {
                      if (selectedAmount) setShowQRSection(true);
                    }}
                  >
                    Deposit
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <QrPaymentSection
              amount={selectedAmount || 0}
              onBack={() => setShowQRSection(false)}
              onSuccess={() => onOpenChange(false)}
            />
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default UPIDepositSheet;
