export default function MenuItem({ item }) {
  const { name, price, category } = item;
  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-300">
      <div>
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600">{category}</p>
      </div>
      <div>
        <span className="text-lg font-semibold text-gray-800">
          ${price.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
