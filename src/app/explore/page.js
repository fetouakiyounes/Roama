import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewListings from '@/components/NewListings';

export default function Explore() {
    return (
        <>
            <Header />
            <main style={{ paddingTop: '100px' }}>
                <div style={{ padding: '40px 20px', background: '#f9f9f9' }}>
                    <h1 style={{ textAlign: 'center', color: '#242429' }}>Toutes les Annonces</h1>
                    <p style={{ textAlign: 'center', marginBottom: '40px' }}>Explorez toutes les propriétés en vente et en location.</p>
                    {/* Reusing NewListings component for demo purposes */}
                    <NewListings />
                </div>
            </main>
            <Footer />
        </>
    );
}
