import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewListings from '@/components/NewListings';

export default function Acheter() {
    return (
        <>
            <Header />
            <main style={{ paddingTop: '100px' }}>
                <div style={{ padding: '40px 20px', background: '#f9f9f9' }}>
                    <h1 style={{ textAlign: 'center', color: '#242429' }}>Acheter un bien</h1>
                    <NewListings />
                </div>
            </main>
            <Footer />
        </>
    );
}
