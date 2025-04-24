import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Account from "./pages/Account";
import Deposit from "./pages/Deposit";
import DepositHistory from "./pages/DepositHistory";
import NotFound from "./pages/NotFound";
import Gift from "./pages/Gift";
import Withdraw from "./pages/Withdraw";
import WithdrawHistory from "./pages/WithdrawHistory";
import React, { useEffect, useState } from "react";
import LoginRegister from "@/components/LoginRegister";

// Helper: check localStorage for login
function checkLogin() {
  return !!localStorage.getItem("loggedIn");
}

const queryClient = new QueryClient();

const App = () => {
  const [authed, setAuthed] = useState(checkLogin());

  // Listen to login/logout
  useEffect(() => {
    const listener = () => setAuthed(checkLogin());
    window.addEventListener("storage", listener);
    return () => window.removeEventListener("storage", listener);
  }, []);

  // Hide app behind login if not authenticated
  if (!authed) {
    return (
      <>
        <LoginRegister onAuth={() => { setAuthed(true); window.dispatchEvent(new Event("storage")); }} />
        <Toaster />
        <Sonner />
      </>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/account" element={<Account />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/deposit-history" element={<DepositHistory />} />
            <Route path="/gift" element={<Gift />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/withdraw-history" element={<WithdrawHistory />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
