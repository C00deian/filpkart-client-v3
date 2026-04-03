import Footer from "@/widgets/footer";
import Navbar from "@/widgets/header/Navbar";
import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col bg-bg-light">
    <Navbar />
    <main className="flex-1 max-w-[1248px] mx-auto w-full px-4 py-4">
      {children}
    </main>
    <Footer />
  </div>
);

export default HomeLayout;
