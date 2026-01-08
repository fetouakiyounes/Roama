import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MonCompte() {
    return (
        <>
            <Header />
            <main style={{ padding: '150px 20px', textAlign: 'center', minHeight: '60vh' }}>
                <h1 style={{ color: '#ED6C63', marginBottom: '20px' }}>Mon Compte / S'identifier</h1>
                <p>This is a placeholder for the login/registration page.</p>
                <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ddd', maxWidth: '400px', margin: '30px auto' }}>
                    <h3>Connexion</h3>
                    <input type="text" placeholder="Email" style={{ display: 'block', margin: '10px auto', padding: '10px', width: '90%' }} />
                    <input type="password" placeholder="Mot de passe" style={{ display: 'block', margin: '10px auto', padding: '10px', width: '90%' }} />
                    <button style={{ background: '#ED6C63', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', marginTop: '10px' }}>S'identifier</button>
                </div>
            </main>
            <Footer />
        </>
    );
}
