import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart as CartIcon, Trash2, CreditCard, Coins } from "lucide-react";
import { Friend } from "@/pages/Index";

interface ShoppingCartProps {
  cart: Friend[];
  onRemoveFromCart: (friendId: number) => void;
  onPurchase: () => void;
  coins: number;
}

export const ShoppingCart = ({ cart, onRemoveFromCart, onPurchase, coins }: ShoppingCartProps) => {
  const totalCost = cart.reduce((sum, friend) => sum + friend.price, 0);
  const canAfford = totalCost <= coins;

  console.log("Carrito actualizado:", cart.length, "amigos, costo total:", totalCost);

  if (cart.length === 0) {
    return (
      <Card className="max-w-md mx-auto bg-gray-50 border-2 border-dashed border-gray-300">
        <CardContent className="text-center py-8">
          <CartIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
          <p className="text-gray-400 text-sm">¡Agrega algunos amigos para comenzar!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto bg-white shadow-lg border-2 border-purple-200">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <CardTitle className="flex items-center space-x-2">
          <CartIcon className="w-6 h-6" />
          <span>Carrito de Compras ({cart.length})</span>
        </CardTitle>
        <CardDescription className="text-purple-100">
          Revisa tus amigos seleccionados antes de comprar
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-4 mb-6">
          {cart.map((friend, index) => (
            <div key={`${friend.id}-${index}`} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-center space-x-4">
                <span className="text-3xl">{friend.image}</span>
                <div>
                  <h4 className="font-semibold text-gray-800">{friend.name}</h4>
                  <p className="text-sm text-gray-600">{friend.type}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 bg-yellow-100 px-2 py-1 rounded-full">
                  <Coins className="w-4 h-4 text-yellow-600" />
                  <span className="font-bold text-yellow-800">{friend.price}</span>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onRemoveFromCart(friend.id)}
                  className="bg-red-500 hover:bg-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold text-gray-800">Total:</span>
            <div className="flex items-center space-x-2">
              <Coins className="w-6 h-6 text-yellow-600" />
              <span className="text-2xl font-bold text-gray-800">{totalCost}</span>
            </div>
          </div>
          
          {!canAfford && (
            <Badge variant="destructive" className="mb-4">
              ¡Necesitas {totalCost - coins} monedas más!
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button
          onClick={onPurchase}
          disabled={!canAfford}
          className={`w-full text-lg py-3 transition-all duration-200 ${
            canAfford
              ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white transform hover:scale-105"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
        >
          <CreditCard className="w-5 h-5 mr-2" />
          {canAfford ? "¡Comprar Amigos!" : "Monedas Insuficientes"}
        </Button>
      </CardFooter>
    </Card>
  );
};