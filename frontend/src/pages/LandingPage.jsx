import React from "react";
import HeroComponent from "../components/HeroComponent";
import SideComponent from "../components/SideComponent";
import Calendar from "../components/Calendar";

const LandingPage = () => {
  return (
    <main>
      <div>
        <HeroComponent />
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-10">
        <SideComponent />
        <Calendar />
      </div>
      <div>

      </div>
    </main>
  );
};

export default LandingPage;
