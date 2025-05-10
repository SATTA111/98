
import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent 
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import BottomNav from "@/components/BottomNav";

const GameStats = () => {
  const navigate = useNavigate();
  
  // Example data - in a real app this would come from your backend
  const gameHistory = [
    { id: 1, game: "WIN GO", result: "Won", amount: 350, date: "2025-05-09" },
    { id: 2, game: "K3", result: "Lost", amount: -200, date: "2025-05-08" },
    { id: 3, game: "5D", result: "Won", amount: 500, date: "2025-05-07" },
    { id: 4, game: "WIN GO", result: "Lost", amount: -150, date: "2025-05-06" },
    { id: 5, game: "TRY WINGO", result: "Won", amount: 275, date: "2025-05-05" },
  ];
  
  // Data for the chart
  const chartData = [
    { name: "WIN GO", wins: 12, losses: 8 },
    { name: "K3", wins: 9, losses: 6 },
    { name: "5D", wins: 15, losses: 7 },
    { name: "TRY WINGO", wins: 5, losses: 3 },
  ];
  
  // Calculate overall statistics
  const totalGames = gameHistory.length;
  const totalWins = gameHistory.filter(game => game.result === "Won").length;
  const winRate = (totalWins / totalGames) * 100;
  const netProfit = gameHistory.reduce((sum, game) => sum + game.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white p-4 flex items-center gap-4 shadow-sm">
        <button onClick={() => navigate(-1)} className="text-gray-500">
          <ArrowLeft />
        </button>
        <h1 className="text-xl font-semibold">Game Statistics</h1>
      </div>
      
      {/* Dashboard Summary */}
      <div className="p-4 grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm text-gray-500">Win Rate</h3>
          <p className="text-2xl font-bold">{winRate.toFixed(1)}%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm text-gray-500">Net Profit</h3>
          <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            ₹{netProfit.toFixed(2)}
          </p>
        </div>
      </div>
      
      {/* Chart */}
      <div className="p-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Game Performance</h2>
          <ChartContainer className="h-64" config={{ 
            wins: { label: "Wins", color: "#22c55e" },
            losses: { label: "Losses", color: "#ef4444" }
          }}>
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <ChartTooltip
                content={<ChartTooltipContent />}
              />
              <Bar dataKey="wins" fill="#22c55e" barSize={15} />
              <Bar dataKey="losses" fill="#ef4444" barSize={15} />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
      
      {/* Game History */}
      <div className="p-4">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <h2 className="text-lg font-semibold p-4 border-b">Recent Games</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Game</TableHead>
                <TableHead>Result</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gameHistory.map((game) => (
                <TableRow key={game.id}>
                  <TableCell>{game.game}</TableCell>
                  <TableCell>
                    <span className={game.result === "Won" ? "text-green-500" : "text-red-500"}>
                      {game.result}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={game.amount >= 0 ? "text-green-500" : "text-red-500"}>
                      {game.amount >= 0 ? `+₹${game.amount}` : `-₹${Math.abs(game.amount)}`}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default GameStats;
