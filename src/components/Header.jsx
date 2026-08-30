import { Container, Logo, LogoutBtn } from "./index";
import { useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  const isActive = (slug) => location.pathname === slug;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-glass-border">
      <Container>
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <Logo width="120px" />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                        ${
                          isActive(item.slug)
                            ? "text-accent-400 bg-accent-500/10"
                            : "text-neutral-300 hover:text-neutral-100 hover:bg-black/5"
                        }`}
                    >
                      {item.name}
                    </button>
                  </li>
                ),
            )}
            {authStatus && (
              <li className="ml-2">
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-black/5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-0.5 bg-neutral-300 transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-neutral-300 transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-neutral-300 transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 animate-slide-down">
            <ul className="flex flex-col gap-1">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        onClick={() => {
                          navigate(item.slug);
                          setMobileOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                          ${
                            isActive(item.slug)
                              ? "text-accent-400 bg-accent-500/10"
                              : "text-neutral-300 hover:text-neutral-100 hover:bg-black/5"
                          }`}
                      >
                        {item.name}
                      </button>
                    </li>
                  ),
              )}
              {authStatus && (
                <li className="mt-1">
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;
