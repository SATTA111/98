
import React, { useState } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { IndianRupee, BookText } from "lucide-react";

const UPI_CHANNELS = [
  { key: "rujia", label: "RuJia-QR", limit: "200 - 50K" },
  { key: "7day", label: "7Day-QR", limit: "200 - 50K" },
  { key: "ffpay", label: "FFPay", limit: "200 - 50K" },
  { key: "umoney", label: "Umoney-QR", limit: "100 - 2K" },
  { key: "wpay", label: "WPay-QR", limit: "200 - 50K" },
  { key: "iceqr", label: "ICE-QR", limit: "200 - 50K" },
  { key: "yayapay", label: "YayaPay-QR", limit: "300 - 50K" },
  { key: "superqr", label: "Super-QR", limit: "100 - 50K" },
  { key: "paile", label: "Paile-QR", limit: "200 - 50K" },
  { key: "wepay", label: "WePay-QR", limit: "100 - 50K" },
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

const UPIDepositSheet: React.FC<UPIProps> = ({
  open,
  onOpenChange,
  methodLabel,
}) => {
  const [selectedChannel, setSelectedChannel] = useState(UPI_CHANNELS[0].key);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="max-w-md mx-auto w-full pt-2 pb-1 px-0">
          <DrawerHeader>
            <div className="flex items-center gap-2">
              {/* Custom Deposit Icon */}
              <img
                src="/lovable-uploads/19271910-ffa5-4ade-b2e5-0f205e27c360.png"
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
                src="/lovable-uploads/3228c377-b647-4185-a168-bb6876d1b82b.png"
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
                src="/lovable-uploads/3228c377-b647-4185-a168-bb6876d1b82b.png"
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
              >
                Deposit
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default UPIDepositSheet;

