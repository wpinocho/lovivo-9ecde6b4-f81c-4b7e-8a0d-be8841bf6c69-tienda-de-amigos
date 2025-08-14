import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Check, Coins } from "lucide-react";
import { Friend } from "@/pages/Index";

interface FriendCardProps {
  friend: Friend;
  onAddToCart: (friend: Friend) => void;
  isInCart: boolean;
  isPurchased: boolean;
}

const rarityColors = {
  common: "bg-gray-100 text-gray-800 border-gray-300",
  rare: "bg-blue-100 text-blue-800 border-blue-300",
  epic: "bg-purple-100 text-purple-800 border-purple-300",
  legendary: "bg-yellow-100 text-yellow-800 border-yellow-300"
};

const rarityGradients = {
  common: "from-gray-50 to-gray-100",
  rare: "from-blue-50 to-blue-100",
  epic: "from-purple-50 to-purple-100",
  legendary: "from-yellow-50 to-yellow-100"
};

export const FriendCard = ({ friend, onAddToCart, isInCart, isPurchased }: FriendCardProps) => {
  console.log(`Renderizando tarjeta para ${friend.name}, en carrito: ${isInCart}, comprado: ${isPurchased}`);

  return (
    <Card className={`hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br ${rarityGradients[friend.rarity]} border-2 ${rarityColors[friend.rarity].split(' ')[2]}`}>
      <CardHeader className="text-center pb-2">
        <div className="text-6xl mb-2">{friend.image}</div>
        <div className="flex justify-between items-start mb-2">
          <Badge className={`${rarityColors[friend.rarity]} font-semibold`}>
            {friend.rarity.toUpperCase()}
          </Badge>
          <div className="flex items-center space-x-1 bg-white px-2 py-1 rounded-full border">
            <Coins className="w-4 h-4 text-yellow-600" />
            <span className="font-bold text-gray-800">{friend.price}</span>
          </div>
        </div>
        <CardTitle className="text-lg font-bold text-gray-800">{friend.name}</CardTitle>
        <CardDescription className="text-sm font-medium text-gray-600">{friend.type}</CardDescription>
      </CardHeader>
      
      <CardContent className="px-4 pb-2">
        <p className="text-sm text-gray-700 mb-3 leading-relaxed">{friend.description}</p>
        
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-800 text-sm">Personalidad:</h4>
          <div className="flex flex-wrap gap-1">
            {friend.personality.map((trait, index) => (
              <Badge key={index} variant="secondary" className="text-xs bg-white text-gray-700 border">
                {trait}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        {isPurchased ? (
          <Button disabled className="w-full bg-green-500 text-white">
            <Check className="w-4 h-4 mr-2" />
            ¡Ya es tu amigo!
          </Button>
        ) : (
          <Button
            onClick={() => onAddToCart(friend)}
            disabled={isInCart}
            className={`w-full transition-all duration-200 ${
              isInCart
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transform hover:scale-105"
            }`}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {isInCart ? "En el carrito" : "Agregar al carrito"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};