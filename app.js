const DEFAULT_USER = {
  id: 'ceo-user-1', name: 'Yanis (CEO)', email: 'yanis.records@gmail.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80', balance: 84500
};

const INITIAL_TRACKS = [
  { id: 'vst-1', title: 'SmartMaster V2 Pro', type: 'vst', price: 6500, cover: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80', producer: 'YANrecords', isSold: false },
  { id: 'beat-1', title: 'Marseille Vibes', type: 'beat', bpm: 130, key: 'Am', genre: 'Jul Type', producer: 'Slima Beatz', priceMp3: 2000, priceWav: 4000, priceStems: 8000, priceExclusive: 25000, cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', isSold: false }
];

function App() {
  const [view, setViewState] = React.useState('home');
  const [currentUser, setCurrentUser] = React.useState(null);
  
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
      <Navbar view={view} setView={setView} currentUser={currentUser} setCurrentUser={setCurrentUser} defaultUser={DEFAULT_USER} />
      
      <div className="pt-28 pb-10 px-6 max-w-7xl mx-auto">
        {view === 'home' && <Home setView={setView} />}
        {view === 'vsts' && <VstStore vsts={INITIAL_TRACKS.filter(t => t.type === 'vst')} />}
        {view === 'beats' && <BeatStore beats={INITIAL_TRACKS.filter(t => t.type === 'beat')} togglePlay={() => {}} currentTrack={null} isPlaying={false} />}
        {view === 'dashboard' && <Dashboard currentUser={currentUser} tracks={INITIAL_TRACKS} setView={setView} />}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
