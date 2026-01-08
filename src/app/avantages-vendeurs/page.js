import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SellerHero from '@/components/SellerHero';
import BenefitCards from '@/components/BenefitCards';
import EngagementSection from '@/components/EngagementSection';
import SellerHelp from '@/components/SellerHelp';
import OwnerCTA from '@/components/OwnerCTA';

export default function Vendre() {
    return (
        <>
            <Header />
            <main>
                <SellerHero />
                <BenefitCards />
                <EngagementSection />
                <SellerHelp />
                <OwnerCTA />
            </main>
            <Footer />
        </>
    );
}
