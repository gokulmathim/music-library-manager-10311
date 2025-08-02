"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaMusic, FaListUl, FaUser, FaHeart, FaUpload } from "react-icons/fa";

const navSections = [
  { href: "/", icon: <FaHome />, label: "Home" },
  { href: "/library", icon: <FaMusic />, label: "Library" },
  { href: "/playlists", icon: <FaListUl />, label: "Playlists" },
  { href: "/favorites", icon: <FaHeart />, label: "Favorites" },
  { href: "/upload", icon: <FaUpload />, label: "Upload" },
  { href: "/account", icon: <FaUser />, label: "Account" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <nav className="bg-secondary text-white flex flex-col space-y-2 px-4 py-6 h-full min-w-[170px]">
      <div className="font-bold text-2xl mb-6 text-primary" style={{ letterSpacing: "1px" }}>
        🎵 MyMusic
      </div>
      <ul className="flex-1 space-y-1">
        {navSections.map(({ href, icon, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded transition-colors
                ${
                  pathname === href
                    ? "bg-accent text-white font-semibold"
                    : "hover:bg-accent hover:text-white text-gray-300"
                }`}
            >
              <span className="text-lg">{icon}</span>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
