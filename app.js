// ===== DONNÉES GLOBALES =====
const DEFAULT_USER = {
  id: 'ceo-user-1', name: 'Yanis (CEO)', email: 'yanis.records@gmail.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80', balance: 84500, plays: 18920, rip: '00799999000000000012'
};

function generateRealVstKey() {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let p1 = ''; for (let i = 0; i < 4; i++) p1 += chars.charAt(Math.floor(Math.random() * chars.length));
    let hash = 0; for (let i = 0; i < p1.length; i++) hash += p1.charCodeAt(i) * (i + 5);
    return `SM2-${p1}-${hash.toString(16).toUpperCase().padStart(4, '0').slice(-4)}`;
}

// Composant Principal
function App() {
  const [view, setViewState] = React.useState('home');
  const [currentUser, setCurrentUser] = React.useState(null);
  
  // Fonction de navigation qui remonte en haut
  const setView = (newView) => {
    setViewState(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  React.useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
    const saved = localStorage.getItem('yanrecords_user');
    if (saved) try { setCurrentUser(JSON.parse(saved)); } catch(e) {}
  }, [view]);

  return (
    <div className="relative">
      <Navbar 
        view={view} 
        setView={setView} 
        currentUser={currentUser} 
        setCurrentUser={setCurrentUser} 
        defaultUser={DEFAULT_USER} 
      />
      
      <div className="pt-28 pb-10 px-6 max-w-7xl mx-auto">
        {view === 'home' && <Home setView={setView} />}
        
        {/* Les autres pages viendront s'ajouter ici dans les prochaines étapes ! */}
        {view === 'vsts' && <h2 className="text-white text-3xl font-bold">Page VSTs (Bientôt)</h2>}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
