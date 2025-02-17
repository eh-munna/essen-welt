import { Link } from 'react-router';
export default function Hero() {
  return (
    // TODO: // Replace with actual image path

    <section
      className="relative bg-cover bg-center h-[50vh] flex items-center justify-center text-white mb-2"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/fotos-premium/italienische-lebensmittelkomposition-mit-grossem-raum-in-der-mitte_23-2147686550.jpg?w=1380')",
      }}
    >
      <div className="absolute inset-0 bg-[#2D6A4F] bg-opacity-60"></div>

      <div className="relative text-center px-6">
        <h1 className="text-4xl sm:text-5xl font-bold">
          Welcome to <span className="text-[#F4A261]">Essen Welt</span>
        </h1>
        <p className="mt-4 text-lg text-[#E9CBA7]">
          Experience the finest flavors, fresh ingredients, and warm
          hospitality.
        </p>
        <Link
          to="/menu"
          className="mt-6 inline-block bg-[#F4A261] text-white text-lg font-semibold px-6 py-3 rounded-lg hover:bg-[#e38b41] transition"
        >
          Explore Menu
        </Link>
      </div>
    </section>
  );
}
