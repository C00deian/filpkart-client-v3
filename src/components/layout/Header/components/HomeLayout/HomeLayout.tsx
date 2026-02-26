import HeaderTop from "@/components/layout/Header/components/HomeLayout/HeaderTop";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/Navbar/Navbar";

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
