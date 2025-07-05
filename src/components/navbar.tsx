import { Link, NavLink } from "react-router";

const Navbar = () => {
    const navItems = [
        { name: "All Books", path: "/books"},
        { name: "Add Book", path: "/create-book"},
        { name: "Borrow Summary", path: "/borrow-summary"},
    ]

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col lg:flex-row items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600 mb-4 lg:mb-0">
          📚 BookStack
        </Link>

        {/* Navigation Links */}
        <ul className="flex gap-6">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                    : "text-gray-600 hover:text-blue-600 transition"
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
};

export default Navbar;
