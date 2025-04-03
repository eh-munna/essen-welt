import { Link } from 'react-router';
export default function Hero() {
  return (
    // TODO: // Replace with actual image path

    <>
      <div className="relative min-h-screen flex items-center justify-center text-white">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-[url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center bg-no-repeat z-0">
          <div className="absolute inset-0 bg-black/40 backdrop-brightness-75"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
              Welcome to <span className="text-orange-400">Essen Welt</span>
            </h1>

            {/* Subheading */}
            <p className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl text-orange-200 font-medium max-w-2xl mx-auto leading-relaxed">
              Experience the finest flavors, fresh ingredients, and warm
              hospitality.
            </p>

            {/* CTA Button */}
            <div className="mt-8 sm:mt-10">
              <Link
                to="/menu"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 sm:px-10 sm:py-4 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 text-lg sm:text-xl"
              >
                Explore Menu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
