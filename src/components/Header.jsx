const Header = () => {
  return (
    <header className="bg-gradient-to-r from-dark-800 to-dark-900 border-b border-dark-700 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          GitHub User Search
        </h1>
        <p className="text-center text-dark-300 mt-2 text-lg">
          Find and explore GitHub users with ease
        </p>
      </div>
    </header>
  );
};

export default Header;
