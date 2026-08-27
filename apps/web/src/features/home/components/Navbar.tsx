import { NavLink } from "react-router-dom";

interface NavbarProps {
  username?: string;
}

const navItems = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Sponsor",
    path: "/sponsor",
  },
  {
    label: "Diary",
    path: "/diary",
  },
  {
    label: "Hobbies",
    path: "/hobby",
  },
  {
    label: "Meetings",
    path: "/meetings",
  },
  {
    label: "Groups",
    path: "/groups",
  },
  {
    label: "Friends",
    path: "/friend",
  },
];

export const Navbar = ({ username }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-50 border-b border-[#2A2E36] bg-[#14161B]/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-10">
        <NavLink
          to="/home"
          className="shrink-0 text-lg font-semibold tracking-[0.18em] text-[#E7E9ED]"
        >
          SOBERED
        </NavLink>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-[#252932] text-[#E7E9ED]"
                    : "text-[#9199A6] hover:bg-[#1C1F26] hover:text-[#E7E9ED]"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <NavLink
          to="/profile"
          className="flex items-center gap-3 rounded-md px-2 py-1.5 transition-colors hover:bg-[#1C1F26]"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#252932] text-sm font-medium text-[#E7E9ED]">
            {username?.charAt(0).toUpperCase() ?? "U"}
          </div>

          <span className="hidden text-sm text-[#9199A6] sm:block">
            {username ?? "Account"}
          </span>
        </NavLink>
      </nav>
    </header>
  );
};
