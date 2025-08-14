import { useState } from "react";
import { FriendCard } from "@/components/FriendCard";
import { ShoppingCart } from "@/components/ShoppingCart";
import { Header } from "@/components/Header";
import { toast } from "sonner";

export interface Friend {
  id: number;
  name: string;
  type: string;
  price: number;
  description: string;
  personality: string[];
  image: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

const friends: Friend[] = [
  {
    id: 1,
    name: "Alex el Aventurero",
    type: "Compañero de Aventuras",
    price: 150,
    description: "Siempre listo para una nueva aventura. Le encanta explorar lugares nuevos y probar comidas exóticas.",
    personality: ["Valiente", "Curioso", "Optimista"],
    image: "🧗‍♂️",
    rarity: "common"
  },
  {
    id: 2,
    name: "Luna la Artista",
    type: "Alma Creativa",
    price: 200,
    description: "Una artista apasionada que ve belleza en todo. Perfecta para tardes de creatividad y inspiración.",
    personality: ["Creativa", "Sensible", "Inspiradora"],
    image: "🎨",
    rarity: "rare"
  },
  {
    id: 3,
    name: "Max el Cocinero",
    type: "Chef Personal",
    price: 300,
    description: "Un chef extraordinario que puede preparar cualquier platillo. Ideal para los amantes de la buena comida.",
    personality: ["Generoso", "Perfeccionista", "Divertido"],
    image: "👨‍🍳",
    rarity: "epic"
  },
  {
    id: 4,
    name: "Sage el Sabio",
    type: "Consejero Filosófico",
    price: 500,
    description: "Un amigo sabio que siempre tiene los mejores consejos. Perfecto para conversaciones profundas.",
    personality: ["Sabio", "Paciente", "Comprensivo"],
    image: "🧙‍♂️",
    rarity: "legendary"
  },
  {
    id: 5,
    name: "Zoe la Deportista",
    type: "Compañera de Ejercicio",
    price: 180,
    description: "Energética y motivadora. Te ayudará a mantenerte en forma y alcanzar tus metas fitness.",
    personality: ["Energética", "Motivadora", "Disciplinada"],
    image: "🏃‍♀️",
    rarity: "common"
  },
  {
    id: 6,
    name: "Neo el Gamer",
    type: "Compañero de Juegos",
    price: 250,
    description: "El mejor compañero para maratones de videojuegos. Conoce todos los trucos y secretos.",
    personality: ["Competitivo", "Estratégico", "Leal"],
    image: "🎮",
    rarity: "rare"
  },
  {
    id: 7,
    name: "Aria la Música",
    type: "Alma Musical",
    price: 220,
    description: "Una virtuosa de la música que puede tocar cualquier instrumento. Perfecta para jam sessions.",
    personality: ["Armoniosa", "Expresiva", "Rítmica"],
    image: "🎵",
    rarity: "rare"
  },
  {
    id: 8,
    name: "Phoenix el Místico",
    type: "Guía Espiritual",
    price: 800,
    description: "Un ser místico con poderes especiales. Puede predecir el futuro y ofrecer protección espiritual.",
    personality: ["Místico", "Protector", "Visionario"],
    image: "🔮",
    rarity: "legendary"
  }
];

const Index = () => {
  const [coins, setCoins] = useState(1000);
  const [cart, setCart] = useState<Friend[]>([]);
  const [purchasedFriends, setPurchasedFriends] = useState<Friend[]>([]);

  console.log("Tienda de Amigos cargada con", friends.length, "amigos disponibles");
  console.log("Monedas actuales:", coins);

  const addToCart = (friend: Friend) => {
    console.log("Agregando al carrito:", friend.name);
    setCart(prev => [...prev, friend]);
    toast.success(`${friend.name} agregado al carrito! 🛒`);
  };

  const removeFromCart = (friendId: number) => {
    console.log("Removiendo del carrito ID:", friendId);
    setCart(prev => prev.filter(friend => friend.id !== friendId));
    toast.info("Amigo removido del carrito");
  };

  const purchaseCart = () => {
    const totalCost = cart.reduce((sum, friend) => sum + friend.price, 0);
    console.log("Intentando comprar carrito. Costo total:", totalCost, "Monedas disponibles:", coins);
    
    if (totalCost > coins) {
      toast.error("¡No tienes suficientes monedas! 💰");
      return;
    }

    setCoins(prev => prev - totalCost);
    setPurchasedFriends(prev => [...prev, ...cart]);
    setCart([]);
    
    toast.success(`¡Felicidades! Has comprado ${cart.length} nuevo${cart.length > 1 ? 's' : ''} amigo${cart.length > 1 ? 's' : ''}! 🎉`);
    console.log("Compra exitosa. Nuevas monedas:", coins - totalCost);
  };

  const earnCoins = () => {
    const earned = Math.floor(Math.random() * 100) + 50;
    setCoins(prev => prev + earned);
    toast.success(`¡Ganaste ${earned} monedas! 💰`);
    console.log("Monedas ganadas:", earned);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <Header coins={coins} onEarnCoins={earnCoins} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            🌟 Tienda de Amigos 🌟
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ¡Encuentra tu compañero perfecto! Cada amigo tiene personalidades únicas y habilidades especiales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {friends.map((friend) => (
            <FriendCard
              key={friend.id}
              friend={friend}
              onAddToCart={addToCart}
              isInCart={cart.some(f => f.id === friend.id)}
              isPurchased={purchasedFriends.some(f => f.id === friend.id)}
            />
          ))}
        </div>

        <ShoppingCart
          cart={cart}
          onRemoveFromCart={removeFromCart}
          onPurchase={purchaseCart}
          coins={coins}
        />

        {purchasedFriends.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-green-600">
              🎉 Tus Amigos Comprados 🎉
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {purchasedFriends.map((friend, index) => (
                <div key={`${friend.id}-${index}`} className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                  <div className="text-4xl text-center mb-2">{friend.image}</div>
                  <h3 className="font-bold text-center text-green-800">{friend.name}</h3>
                  <p className="text-sm text-center text-green-600">¡Ya es tu amigo!</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;