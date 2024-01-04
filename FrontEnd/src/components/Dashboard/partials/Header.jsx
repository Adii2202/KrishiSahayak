import React, { useState } from "react";
// import SearchModal from './header/SearchModal';
// import Notifications from './header/Notifications';
// import Help from './header/Help';
import UserMenu from "./header/UserMenu";

function Header({ sidebarOpen, setSidebarOpen }) {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <header className="sticky top-0 bg-stone-500 border-b border-slate-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side (Site Title) */}
          <div className="flex items-center">
            {/* Site Title */}
            <h1 className="text-white text-xl font-semibold">KrishiSahayak</h1>

            {/* Link to Scroll */}
            <button
              className="text-white ml-4 cursor-pointer"
              onClick={() => scrollToSection("weather")}
            >
              Weather
            </button>

            <button
              className="text-white ml-4 cursor-pointer"
              onClick={() => scrollToSection("calendar")}
            >
              Calendar
            </button>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center">
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
