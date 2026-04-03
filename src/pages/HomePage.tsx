
import HeroBanner from "@/features/home/components/HeroBanner";
import CategoryGrid from "@/features/home/components/CategoryGrid";
import DealOfTheDay from "@/features/home/components/DealOfTheDay";
import HomeLayout from "@/app/layouts/HomeLayout";

const HomePage = () => (
  <>
  <HomeLayout>
    <div className="space-y-4">
      <HeroBanner />
      <CategoryGrid />
      <DealOfTheDay />
    </div>
  </HomeLayout>
  </>

);
export default HomePage;
