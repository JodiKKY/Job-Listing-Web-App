import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed w-full h-[7vh] top-0 left-0 bg-white z-[50]">
      <section className="max-w-[1000px] mx-auto h-full p-5 lg:p-0 flex justify-between items-center">
        {/* Logo */}
        <section>
          <Link to='/'>
            <h1 className="header text-2xl">
              W<span className="text-blue-500">D</span>WR
              <span className="text-blue-500">•</span>
            </h1>
          </Link>
        </section>
      </section>
    </nav>
  );
}

export default Navbar;