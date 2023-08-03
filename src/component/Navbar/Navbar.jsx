import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [pathname, setPathname] = useState(location.pathname);
  const user = JSON.parse(localStorage.getItem("user"));

  // You can update the pathname whenever it changes
  useEffect(() => {
    setPathname(location.pathname);
  }, [location.pathname]);

  function logOut() {
    navigate("/");
    localStorage.removeItem("user");
  }

  return (
    <nav className="fixed w-full h-[7vh] top-0 left-0 bg-white z-[50]">
      <section className="max-w-[1000px] mx-auto h-full p-5 lg:p-0 flex justify-between items-center">
        {/* Logo */}
        <section>
          <Link to="/">
            <h1 className="header text-2xl">
              Employ<span className="text-blue-500">Nexa</span>
              <span className="text-grey-500">•</span>
            </h1>
          </Link>
        </section>
        {/* Sign-In */}
        {pathname === "/app/jobs" || pathname === "/app/jobs/:id" ? (
          <section className="flex items-center gap-5">
            <button
              className="bg-red-500 text-white px-4 py-2 my-3 rounded-md"
              onClick={logOut}
            >
              <p>Log Out</p>
            </button>
            <img
              src={`https://avatars.dicebear.com/api/initials/${user?.email}.svg`}
              alt="user"
              className="w-[50px] h-[50px] rounded-full"
            />
          </section>
        ) : pathname === "/sign-in" || pathname === "/sign-up" ? (
          <></>
        ) : (
          <Link to={`/signup`}>
            <button className="bg-blue-500 text-white px-4 py-2 my-3 rounded-md">
              <p>Sign Up</p>
            </button>
          </Link>
        )}
      </section>
    </nav>
  );
}

export default Navbar;
