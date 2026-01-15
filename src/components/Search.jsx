import { useState } from "react";
import { fetchUserData } from "../services/githubService";
import { IoSearchSharp, IoSadOutline } from "react-icons/io5";

const Search = () => {
  const [username, setUsername] = useState("");
  const [location, setLocatiion] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setResults([]);
    setPage(1);

    try {
      const data = await fetchUserData(username, location, minRepos, 1);
      if (data.total_count === 0) {
        setError(true);
      } else {
        setResults(data.items);
        setTotalCount(data.total_count);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    setLoading(true);
    try {
      const data = await fetchUserData(username, location, minRepos, nextPage);
      setResults((prev) => [...prev, ...data.items]);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-2xl p-8 shadow-2xl">
        <form method="post" onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">
                GitHub Username
              </label>
              <input
                type="text"
                placeholder="Enter username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-dark-900/50 border border-dark-600 rounded-lg text-dark-50 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">
                Location (optional)
              </label>
              <input
                type="text"
                placeholder="Location..."
                value={location}
                onChange={(e) => setLocatiion(e.target.value)}
                className="w-full px-4 py-3 bg-dark-900/50 border border-dark-600 rounded-lg text-dark-50 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">
                Minimum Repositories (optional)
              </label>
              <input
                type="number"
                placeholder="Min Repos..."
                value={minRepos}
                onChange={(e) => setMinRepos(e.target.value)}
                className="w-full px-4 py-3 bg-dark-900/50 border border-dark-600 rounded-lg text-dark-50 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <IoSearchSharp className="w-5 h-5" />
            Search Users
          </button>
        </form>

        {loading && (
          <div className="mt-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-dark-300">Searching GitHub...</p>
          </div>
        )}

        {error && (
          <div className="mt-8 p-6 bg-red-900/20 border border-red-700 rounded-lg">
            <div className="flex items-center">
              <IoSadOutline className="w-8 h-8 mr-3 text-red-400" />
              <div>
                <h3 className="text-red-400 font-semibold">No users found</h3>
                <p className="text-dark-300 mt-1">
                  Try adjusting your search criteria
                </p>
              </div>
            </div>
          </div>
        )}

        {results.length > 0 && (
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-dark-50">
                Found {totalCount} user{totalCount !== 1 ? "s" : ""}
              </h2>
              <span className="text-sm text-dark-400">
                Showing {results.length} of {totalCount}
              </span>
            </div>

            {results.map((user) => (
              <div
                key={user.login}
                className="bg-dark-800/70 backdrop-blur-sm border border-dark-700 rounded-xl p-6 hover:border-dark-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="flex-shrink-0">
                    <img
                      src={user.avatar_url}
                      alt={`${user.login} avatar`}
                      className="w-20 h-20 rounded-full border-2 border-dark-600 shadow-lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <h3 className="text-xl font-bold text-dark-50 truncate">
                        {user.name || user.login}
                      </h3>
                      <span className="text-sm text-dark-400 font-mono">
                        @{user.login}
                      </span>
                    </div>

                    {user.bio && (
                      <p className="text-dark-200 mb-3 leading-relaxed">
                        {user.bio}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-4 text-sm text-dark-400 mb-4">
                      {user.location && (
                        <div className="flex items-center">
                          <span className="mr-1">📍</span>
                          <span>{user.location}</span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <span className="mr-1">📊</span>
                        <span>{user.public_repos} repos</span>
                      </div>
                      {user.followers !== undefined && (
                        <div className="flex items-center">
                          <span className="mr-1">👥</span>
                          <span>{user.followers} followers</span>
                        </div>
                      )}
                    </div>

                    <a
                      href={user.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
                    >
                      <span>View Profile</span>
                      <span className="ml-2">→</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!error && results.length > 0 && results.length < totalCount && (
          <div className="mt-8 text-center">
            <button
              onClick={handleLoadMore}
              className="bg-gradient-to-r from-dark-700 to-dark-600 hover:from-dark-600 hover:to-dark-500 text-dark-50 font-semibold py-3 px-8 rounded-lg border border-dark-600 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <span className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-dark-50 mr-2"></div>
                  Loading...
                </span>
              ) : (
                "Load More Users"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
