
import React, { useEffect, useState } from "react";
import { Phone, Lock, MessageSquare, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

const TAB_PHONE = "phone";
const TAB_EMAIL = "email";

const LoginRegister = ({ onAuth }: { onAuth: () => void }) => {
  const [tab, setTab] = useState(TAB_PHONE);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [remember, setRemember] = useState(true);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Autofocus fields
    if (tab === TAB_PHONE) {
      setEmail("");
    } else {
      setPhone("");
    }
    setPwd("");
  }, [tab, mode]);

  // Just simple local "users" for demo
  const getUsers = () =>
    JSON.parse(localStorage.getItem("users") || "{}") as Record<string, { pwd: string, method: string }>;

  const saveUser = (id: string, data: { pwd: string, method: string }) => {
    const users = getUsers();
    users[id] = data;
    localStorage.setItem("users", JSON.stringify(users));
  };

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      const users = getUsers();
      const id = tab === TAB_PHONE ? phone : email;
      if (id && pwd && users[id] && users[id].pwd === pwd) {
        localStorage.setItem("loggedIn", "1");
        localStorage.setItem("loginMethod", tab);
        localStorage.setItem("loginId", id);
        // Don't set default balance if already registered
        onAuth();
      } else {
        toast("Login error", {
          description: "Invalid credentials",
        });
      }
      setLoading(false);
    }, 300);
  };

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      const id = tab === TAB_PHONE ? phone : email;
      if (!id || !pwd) {
        toast("Please fill all fields");
        setLoading(false);
        return;
      }
      const users = getUsers();
      if (users[id]) {
        toast("Already registered", { description: "Use login instead." });
        setLoading(false);
        return;
      }
      saveUser(id, { pwd, method: tab });
      // Set user as loggedIn
      localStorage.setItem("loggedIn", "1");
      localStorage.setItem("loginMethod", tab);
      localStorage.setItem("loginId", id);
      // Default balance ₹50 for new
      if (!localStorage.getItem("walletBalance")) {
        localStorage.setItem("walletBalance", "50");
        window.dispatchEvent(new Event("storage"));
      }
      toast("Registered successfully", { description: "Welcome! ₹50 added to your balance."});
      onAuth();
      setLoading(false);
    }, 400);
  };

  const handleLogout = () => {
    // Utility: call from devtools if needed
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("loginMethod");
    localStorage.removeItem("loginId");
    //window.location.reload();
  };

  return (
    <div className="fixed z-50 bg-white top-0 left-0 w-full h-full flex items-center justify-center" style={{ minHeight: "100dvh" }}>
      <div className="w-full h-full max-w-md mx-auto flex flex-col justify-center relative" style={{ background: "linear-gradient(0deg,#fff 60%,#f4b7b6 100%)" }}>
        {/* Top bar */}
        <div className="py-6 px-4 bg-gradient-to-b from-[#eb4755] to-[#fbb3a6] flex items-center rounded-b-2xl">
          <ArrowLeft className="text-white opacity-0" />
          <img src="/lovable-uploads/9a49d124-2d32-4dff-b607-047267542de0.png" alt="logo" className="h-8 mx-auto" />
          <div className="ml-auto flex items-center gap-2">
            {/* Language/Flag can be improved */}
            <img src="https://flagcdn.com/us.svg" className="h-5 w-7 rounded shadow" alt="EN" />
            <span className="text-sm text-white/80 font-semibold">EN</span>
          </div>
        </div>
        {/* Body */}
        <div className="px-6 pt-6 pb-4 bg-white flex-1 flex flex-col rounded-2xl shadow-lg -mt-4 z-10 ">
          <div className="mb-0">
            <div className="text-lg font-semibold text-[#eb4755]">Log in</div>
            <div className="text-xs text-red-500 mt-1 mb-2">Please log in with your phone number or email<br/>If you forget your password, please contact customer service</div>
          </div>
          {/* Tabs */}
          <div className="flex pb-2 border-b mb-4 mt-2 gap-4">
            <button
              className={`flex-1 flex flex-col items-center border-b-2 pb-2 ${tab === TAB_PHONE ? "border-[#eb4755] text-[#eb4755] font-semibold" : "border-transparent text-gray-400"}`}
              onClick={() => setTab(TAB_PHONE)}
            >
              <Phone className="h-5 w-5 mb-0" />
              <span className="text-xs">phone number</span>
            </button>
            <button
              className={`flex-1 flex flex-col items-center border-b-2 pb-2 ${tab === TAB_EMAIL ? "border-[#eb4755] text-[#eb4755] font-semibold" : "border-transparent text-gray-400"}`}
              onClick={() => setTab(TAB_EMAIL)}
            >
              <MessageSquare className="h-5 w-5 mb-0" />
              <span className="text-xs">Email Login</span>
            </button>
          </div>
          {/* Forms */}
          <form
            className="flex flex-col gap-3"
            onSubmit={e => {
              e.preventDefault();
              if (mode === "login") {
                handleLogin();
              } else {
                handleRegister();
              }
            }}
          >
            {tab === TAB_PHONE ? (
              <>
                <label className="flex items-center text-xs text-gray-500 gap-1">
                  <Phone className="h-4 w-4 mr-1" />
                  Phone number
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex items-center border rounded-md bg-gray-100 px-2">
                    <span className="text-sm text-gray-700">+91</span>
                  </div>
                  <Input
                    placeholder="Please enter the phone number"
                    type="tel"
                    maxLength={10}
                    value={phone}
                    pattern="\d*"
                    onChange={e => setPhone(e.target.value.replace(/\D+/g,''))}
                    className="flex-1"
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <label className="flex items-center text-xs text-gray-500 gap-1">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Email
                </label>
                <Input
                  placeholder="Please enter your email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </>
            )}
            {/* Password */}
            <label className="flex items-center text-xs text-gray-500 gap-1">
              <Lock className="h-4 w-4 mr-1" />
              Password
            </label>
            <Input
              type="password"
              value={pwd}
              required
              placeholder="Password"
              autoComplete={remember ? "on" : "off"}
              onChange={e => setPwd(e.target.value)}
            />
            {/* Remember password */}
            <div className="flex items-center pt-0">
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                className="rounded border-2 border-red-400 text-[#eb4755] focus:ring-[#eb4755] mr-2 h-4 w-4"
                id="remember"
              />
              <label htmlFor="remember" className="text-sm text-[#eb4755] select-none font-medium">
                Remember password
              </label>
            </div>
            <Button
              className="rounded-full mt-2 text-lg w-full"
              type="submit"
              disabled={loading}
              style={{
                background: mode === "login"
                  ? "#c4c4c4"
                  : "linear-gradient(90deg, #eb4755 0%, #fbb3a6 100%)",
                color: mode === "login" ? "#fff" : "#fff",
                letterSpacing: "0.04em"
              }}
            >
              {loading ? (mode === "login" ? "Logging in..." : "Registering...") : (mode === "login" ? "Log in" : "Register")}
            </Button>
          </form>
          <div className="flex flex-col items-center gap-2 mt-4">
            <button
              className="text-[#eb4755] text-base font-bold py-1"
              tabIndex={-1}
              style={{ letterSpacing: "0.03em" }}
              onClick={() => setMode(mode === "login" ? "register" : "login")}
            >
              {mode === "login" ? "Register" : "Back to Login"}
            </button>
            <div className="flex items-center justify-between w-full mt-2">
              <button className="flex gap-2 items-center text-xs text-gray-400 font-semibold">
                <Lock className="h-5 w-5" />
                Forgot password
              </button>
              <button
                className="flex gap-2 items-center text-[#eb4755] font-semibold text-xs"
                onClick={() =>
                  toast("Customer Service", {
                    description: "Contact our hotline at 1800-XXXX.",
                  })
                }
              >
                <img src="/lovable-uploads/9a49d124-2d32-4dff-b607-047267542de0.png" className="h-6 w-6 rounded-full" />
                Customer Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;

