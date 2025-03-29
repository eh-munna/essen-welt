import { Link } from 'react-router';

export default function MenuItem({ item }) {
  const { name, price, category, _id } = item;
  return (
    <div
      data-aos="fade-up"
      data-aos-anchor-placement="center-bottom"
      data-aos-duration="2000"
      data-aos-delay="100"
      className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="p-4">
        <img src="https://i.ibb.co/99j4k1g/class-7.jpg" alt="food" />
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600 mb-4">{category}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-800">
            €{price.toFixed(2)}
          </span>
          <Link
            to={`/menu/${_id}`}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
