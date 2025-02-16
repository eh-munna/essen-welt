import { Button } from './ui/button';

const FoodCard = ({ item }) => {
  return (
    <div className="bg-[#F1F1F1] p-4 rounded-2xl shadow-lg hover:shadow-xl transition max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-40 object-cover rounded-lg"
      />
      <h3 className="text-lg font-semibold text-[#2D6A4F] mt-3">{item.name}</h3>
      <p className="text-sm text-[#3D5A6E]">{item.description}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-[#E63946] font-bold">${item.price}</span>
        <Button className="cursor-pointer bg-[#2D6A4F] text-white px-4 py-2 rounded-md hover:bg-[#1B4D38] transition">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default FoodCard;
