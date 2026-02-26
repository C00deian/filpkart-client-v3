import PageWrapper from '@/components/layout/PageWrapper'
import HeroBanner from '@/features/home/components/HeroBanner'
import CategoryGrid from '@/features/home/components/CategoryGrid'
import DealOfTheDay from '@/features/home/components/DealOfTheDay'

const HomePage = () => (
  <PageWrapper>
    <div className="space-y-4">
      <HeroBanner />
      <CategoryGrid />
      <DealOfTheDay />
    </div>
  </PageWrapper>
)
export default HomePage
