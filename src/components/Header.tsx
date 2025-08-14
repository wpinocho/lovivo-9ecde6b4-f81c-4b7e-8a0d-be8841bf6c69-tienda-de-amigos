import { Button } from "@/components/ui/button";
import { Coins, Gift } from "lucide-react";

interface HeaderProps {
  coins: number;
  onEarnCoins: () => void;
}

export const Header = ({ coins, onEarnCoins }: HeaderProps) => {
  return (
    <header className="bg-white shadow-lg border-b-4 border-gradient-to-r from-purple-500 to-pink-500">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">👥</span>
            <h1 className="text-2xl font-bold text-gray-800">Tienda de Amigos</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-yellow-100 px-4 py-2 rounded-full border-2 border-yellow-300">
              <Coins className="w-5 h-5 text-yellow-600" />
              <span className="font-bold text-yellow-800">{coins}</span>
            </div>
            
            <Button
              onClick={onEarnCoins}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold px-4 py-2 rounded-full transition-all duration-200 transform hover:scale-105"
            >
              <Gift className="w-4 h-4 mr-2" />
              Ganar Monedas
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};