import React from "react";
import HeroComponent from "../components/HeroComponent";
import SideComponent from "../components/SideComponent";
import Calendar from "../components/Calendar";
import TaskChatBot from "../components/TaskChatBot";
import TaskManager from "../components/TaskManager";
import Footer from "../components/Footer";

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
      <div className="max-w-6xl mx-auto my-10 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TaskManager />
          <TaskChatBot />
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default LandingPage;
