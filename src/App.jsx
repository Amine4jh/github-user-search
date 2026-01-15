import "./App.css";
import Search from "./components/Search";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="min-h-screen bg-dark-950 text-dark-50 dark">
      <Header />
      <div className="px-4 py-8">
        <Search />
      </div>
    </div>
  );
};

export default App;
