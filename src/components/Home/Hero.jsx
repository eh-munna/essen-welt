import { Link } from 'react-router';
export default function Hero() {
  return (
    // TODO: // Replace with actual image path

    <>
      <div className="relative min-h-[90vh] flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-[url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-center bg-cover z-0 after:content-[''] after:absolute after:inset-0 after:bg-black after:opacity-20"></div>
        <div className="container mx-auto relative text-center px-6">
          <h1 className="text-5xl sm:text-5xl font-bold">
            Welcome to <span className="text-orange-500">Essen Welt</span>
          </h1>
          <p className="mt-4 text-xl text-orange-300">
            Experience the finest flavors, fresh ingredients, and warm
            hospitality.
          </p>
          <Link
            to="/menu"
            className="mt-6 inline-block bg-orange-500 text-white text-lg font-semibold px-6 py-3 rounded-full hover:bg-orange-600 transition"
          >
            Explore Menu
          </Link>
        </div>
      </div>
    </>
  );
}
