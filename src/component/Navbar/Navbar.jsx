import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [pathname, setPathname] = useState(location.pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setPathname(location.pathname);
    setMenuOpen(false); // close menu on route change
    setAvatarError(false); // reset avatar error on route change
  }, [location.pathname]);

  function logOut() {
    localStorage.removeItem("user");
    navigate("/");
  }

 
  const isAppRoute = pathname.startsWith("/app/jobs");

  // Compute avatar URL or fallback
const avatarUrl = user && !avatarError
? `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(user.email || "U")}`
: "/default-avatar.svg"; // Provide your own default avatar image path here


  return (
    <nav className="fixed w-full top-0 left-0 bg-white shadow-md z-50">
      <div className="max-w-[1000px] mx-auto flex items-center justify-between px-5 h-[7vh]">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold flex items-center">
          Employ
          <span className="text-blue-500 ml-1">Nexa</span>
          <span className="text-gray-400 ml-1">•</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-5">
          {isAppRoute && user ? (
            <>
              <button
                onClick={logOut}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
              >
                Log Out
              </button>
              <img
                src={avatarUrl}
                alt="User avatar"
                className="w-10 h-10 rounded-full"
                onError={() => setAvatarError(true)} // fallback if image fails to load
              />
            </>
          ) : pathname === "/sign-in" || pathname === "/sign-up" ? null : (
            <Link to="/signup">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition">
                Sign Up
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen((open) => !open)}
          className="md:hidden focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-5 py-3 border-t border-gray-200">
          {isAppRoute && user ? (
            <div className="flex flex-col gap-3">
              <button
                onClick={logOut}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
              >
                Log Out
              </button>
              <img
                src={avatarUrl}
                alt="User avatar"
                className="w-10 h-10 rounded-full"
                onError={() => setAvatarError(true)}
              />
            </div>
          ) : pathname === "/sign-in" || pathname === "/sign-up" ? null : (
            <Link to="/signup">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition w-full text-center">
                Sign Up
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
