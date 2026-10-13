const SUPABASE_URL = 'https://xyz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJ...'; 
const supabase = (window.supabase && !SUPABASE_URL.includes('xyz.supabase.co')) ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

const Home = window.HomeComponent;
const VstStore = window.VstStoreComponent;
const BeatStore = window.BeatStoreComponent;
const Dashboard = window.DashboardComponent;
const Settings = window.SettingsComponent;
const Upload = window.UploadComponent;

const INITIAL_TRACKS = [
  { id: 'vst-1', title: 'SmartMaster V2 Pro', type: 'vst', category: 'Mastering', price: 6500, priceMp3: 6500, cover: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', desc: 'Processeur de mastering intelligent 15s avec Resonance Killer 3 Bandes', producer: 'YANrecords', isSold: false },
  { id: 'vst-2', title: 'ChopArcade V2', type: 'vst', category: 'Sampler', price: 4500, priceMp3: 4500, cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', desc: 'Auto-slicer 16 Chops Chromatique avec Mode Gate', producer: 'YANrecords', isSold: false },
  { id: 'vst-3', title: 'PunchClipper V2.1', type: 'vst', category: 'Dynamics', price: 3500, priceMp3: 3500, cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', desc: 'Soft Clipper Analogique pour Kick, 808 & Voix', producer: 'YANrecords', isSold: false },
  { id: 'beat-1', title: 'Marseille Vibes', type: 'beat', bpm: 130, key: 'Am', genre: 'Jul Type', producer: 'Slima Beatz', priceMp3: 2000, priceWav: 4000, priceStems: 8000, priceExclusive: 25000, cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', isSold: false, plays: 1240 },
  { id: 'beat-2', title: 'Algiers Drill', type: 'beat', bpm: 142, key: 'C#m', genre: 'Drill', producer: 'YANrecords', priceMp3: 2500, priceWav: 5000, priceStems: 10000, priceExclusive: 35000, cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=80', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', isSold: true, plays: 3450 }
];

const DEFAULT_USER = {
  id: 'ceo-user-1', name: 'Yanis (CEO)', email: 'yanis.records@gmail.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80', balance: 84500, plays: 18920, rip: '00799999000000000012'
};

function App() {
  const [lang, setLang] = React.useState('fr');
  const t = (key) => DICT[lang][key] || key;

  const [view, setViewState] = React.useState('home');
  const [tracks, setTracks] = React.useState(INITIAL_TRACKS);
  const [currentTrack, setCurrentTrack] = React.useState(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [selectedLicenseTrack, setSelectedLicenseTrack] = React.useState(null);
  const [selectedLicenseType, setSelectedLicenseType] = React.useState('mp3');
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(DEFAULT_USER);
  const [purchasedKey, setPurchasedKey] = React.useState(null);

  // Form Upload States
  const [uploadTitle, setUploadTitle] = React.useState('');
  const [uploadType, setUploadType] = React.useState('beat');
  const [uploadGenre, setUploadGenre] = React.useState('Drill');
  const [uploadBpm, setUploadBpm] = React.useState(140);
  const [uploadKey, setUploadKey] = React.useState('C Minor');
  const [priceMp3, setPriceMp3] = React.useState(2000);
  const [priceWav, setPriceWav] = React.useState(4000);
  const [priceStems, setPriceStems] = React.useState(8000);
  const [priceExclusive, setPriceExclusive] = React.useState(25000);
  const [coverFile, setCoverFile] = React.useState(null);
  const [audioFile, setAudioFile] = React.useState(null);

  // Form Settings States
  const [editName, setEditName] = React.useState(DEFAULT_USER.name);
  const [editAvatarFile, setEditAvatarFile] = React.useState(null);
  const [editRip, setEditRip] = React.useState(DEFAULT_USER.rip);

  const audioRef = React.useRef(new Audio());

  const setView = (newView) => {
    setViewState(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  React.useEffect(() => {
    const savedUser = localStorage.getItem('yanrecords_user');
    if (savedUser) {
      try { 
        const u = JSON.parse(savedUser);
        setCurrentUser(u); 
        setEditName(u.name);
        setEditRip(u.rip || '');
      } catch (e) {}
    }
  }, []);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    let newAvatarUrl = currentUser.avatar;
    if (editAvatarFile) newAvatarUrl = URL.createObjectURL(editAvatarFile);
    const updatedUser = { ...currentUser, name: editName, avatar: newAvatarUrl, rip: editRip };
    setCurrentUser(updatedUser);
    localStorage.setItem('yanrecords_user', JSON.stringify(updatedUser));
    alert(lang === 'fr' ? "Profil mis à jour avec succès !" : "Profile updated successfully!");
    setView('dashboard');
  };

  const togglePlay = (track) => {
    if (currentTrack?.id === track.id) {
      if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
      else { audioRef.current.play(); setIsPlaying(true); }
    } else {
      setCurrentTrack(track);
      audioRef.current.src = track.audio;
      audioRef.current.play();
      setIsPlaying(true);
      setTracks(prev => prev.map(t => t.id === track.id ? { ...t, plays: (t.plays || 0) + 1 } : t));
    }
  };

  const handlePurchase = (item) => {
    if (item.type === 'vst') {
      setPurchasedKey(generateRealVstKey());
    } else {
      if (selectedLicenseType === 'exclusive') {
        setTracks(prev => prev.map(t => t.id === item.id ? { ...t, isSold: true } : t));
        alert("LICENCE EXCLUSIVE ACHETÉE ! Le beat est maintenant VENDU.");
      } else {
        alert("Paiement confirmé ! Votre fichier audio et contrat PDF sont prêts.");
      }
      setSelectedLicenseTrack(null);
    }
  };

  const handleDeleteTrack = (id) => {
    if (confirm("Voulez-vous supprimer cette création ?")) {
      setTracks(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    const newTrack = {
      id: `track-${Date.now()}`,
      title: uploadTitle || 'Nouvelle Création',
      producer: currentUser ? currentUser.name : 'YANrecords',
      bpm: uploadBpm, key: uploadKey, genre: uploadGenre, type: uploadType,
      price: parseInt(priceMp3), priceMp3: parseInt(priceMp3), priceWav: parseInt(priceWav),
      priceStems: parseInt(priceStems), priceExclusive: parseInt(priceExclusive),
      cover: coverFile ? URL.createObjectURL(coverFile) : 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80',
      audio: audioFile ? URL.createObjectURL(audioFile) : 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      desc: uploadType === 'vst' ? 'Plugin VST3 officiel' : `Beat ${uploadGenre}`,
      isSold: false, plays: 0
    };
    setTracks(prev => [newTrack, ...prev]);
    alert("Publié en direct !");
    setView('dashboard');
  };

  return (
    <div className="relative">
      <Navbar view={view} setView={setView} currentUser={currentUser} setCurrentUser={setCurrentUser} defaultUser={DEFAULT_USER} lang={lang} setLang={setLang} t={t} />
      
      <div className="pt-28 pb-10 px-6 max-w-7xl mx-auto">
        {view !== 'home' && (
          <button onClick={() => setView('home')} className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition text-sm font-bold">
            <Icon name="arrowLeft" className="w-4 h-4" /> <span>{t('back')}</span>
          </button>
        )}

        {view === 'home' && <Home setView={setView} t={t} currentUser={currentUser} setShowAuthModal={setShowAuthModal} />}
        {view === 'vsts' && <VstStore vsts={tracks.filter(t => t.type === 'vst')} setSelectedLicenseTrack={setSelectedLicenseTrack} setPurchasedKey={setPurchasedKey} t={t} />}
        {view === 'beats' && <BeatStore beats={tracks.filter(t => t.type === 'beat')} togglePlay={togglePlay} currentTrack={currentTrack} isPlaying={isPlaying} setSelectedLicenseTrack={setSelectedLicenseTrack} setSelectedLicenseType={setSelectedLicenseType} setPurchasedKey={setPurchasedKey} t={t} />}
        {view === 'dashboard' && <Dashboard currentUser={currentUser} tracks={tracks} setView={setView} handleDeleteTrack={handleDeleteTrack} setShowAuthModal={setShowAuthModal} />}
        {view === 'settings' && <Settings currentUser={currentUser} editName={editName} setEditName={setEditName} editAvatarFile={editAvatarFile} setEditAvatarFile={setEditAvatarFile} editRip={editRip} setEditRip={setEditRip} handleSaveSettings={handleSaveSettings} t={t} />}
        {view === 'upload' && <Upload setView={setView} uploadTitle={uploadTitle} setUploadTitle={setUploadTitle} uploadType={uploadType} setUploadType={setUploadType} uploadGenre={uploadGenre} setUploadGenre={setUploadGenre} uploadBpm={uploadBpm} setUploadBpm={setUploadBpm} uploadKey={uploadKey} setUploadKey={setUploadKey} priceMp3={priceMp3} setPriceMp3={setPriceMp3} priceWav={priceWav} setPriceWav={setPriceWav} priceStems={priceStems} setPriceStems={setPriceStems} priceExclusive={priceExclusive} setPriceExclusive={setPriceExclusive} setCoverFile={setCoverFile} setAudioFile={setAudioFile} handleUploadSubmit={handleUploadSubmit} />}
      </div>

      {/* MODAL ACHAT & PLAYER */}
      {selectedLicenseTrack && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl max-w-lg w-full p-6 relative">
            <button onClick={() => setSelectedLicenseTrack(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><Icon name="x" className="w-5 h-5" /></button>
            <h3 className="text-xl font-black text-white mb-4">Achat : {selectedLicenseTrack.title}</h3>
            {selectedLicenseTrack.type === 'vst' && !purchasedKey && (
              <div><div className="p-4 rounded-xl border border-cyanNeon bg-cyanNeon/10 mb-6"><h4 className="font-bold text-white">Licence Complète VST3</h4><span className="text-xl font-black text-goldAccent block mt-2">{selectedLicenseTrack.priceMp3.toLocaleString()} DZD</span></div><button onClick={() => handlePurchase(selectedLicenseTrack)} className="w-full bg-cyanNeon text-black font-black py-3 rounded-xl hover:opacity-90">Payer & Générer la Clé VST</button></div>
            )}
            {selectedLicenseTrack.type === 'vst' && purchasedKey && (
              <div className="bg-black/80 border border-greenPro rounded-xl p-4 text-center"><span className="text-xs font-bold text-greenPro block mb-2">VOTRE CLÉ VST3 CONFIRMÉE :</span><input type="text" readOnly value={purchasedKey} className="w-full text-center font-mono text-lg font-bold bg-cardDark border border-greenPro text-white p-2 rounded-lg" /></div>
            )}
            {selectedLicenseTrack.type === 'beat' && (
              <div className="space-y-3 mb-6">
                <div onClick={() => setSelectedLicenseType('mp3')} className={`p-3 rounded-xl border cursor-pointer ${selectedLicenseType === 'mp3' ? 'border-goldAccent bg-goldAccent/10' : 'border-borderDark'}`}><div className="flex justify-between font-bold text-white"><span>MP3 Lease</span><span className="text-goldAccent">{selectedLicenseTrack.priceMp3.toLocaleString()} DZD</span></div></div>
                <div onClick={() => setSelectedLicenseType('exclusive')} className={`p-3 rounded-xl border cursor-pointer ${selectedLicenseType === 'exclusive' ? 'border-red-500 bg-red-500/10' : 'border-borderDark'}`}><div className="flex justify-between font-bold text-white"><span className="text-red-400">🔥 LICENCE EXCLUSIVE</span><span className="text-goldAccent">{selectedLicenseTrack.priceExclusive.toLocaleString()} DZD</span></div></div>
                <button onClick={() => handlePurchase(selectedLicenseTrack)} className="w-full bg-goldAccent text-black font-black py-3 rounded-xl mt-4">Payer {selectedLicenseType === 'exclusive' ? selectedLicenseTrack.priceExclusive.toLocaleString() : selectedLicenseTrack.priceMp3.toLocaleString()} DZD</button>
              </div>
            )}
          </div>
        </div>
      )}

      {currentTrack && currentTrack.type === 'beat' && (
        <div className="fixed bottom-0 inset-x-0 z-50 glass border-t border-goldAccent/30 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4 w-1/4"><img src={currentTrack.cover} className="w-12 h-12 rounded-lg" /><div className="hidden md:block"><h4 className="font-bold text-sm text-white">{currentTrack.title}</h4><p className="text-xs text-goldAccent font-bold">{currentTrack.producer}</p></div></div>
          <div className="flex-1 flex justify-center"><button onClick={() => togglePlay(currentTrack)} className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center"><Icon name={isPlaying ? "pause" : "play"} className="w-5 h-5" /></button></div>
          <div className="w-1/4 flex justify-end"><button onClick={() => { setSelectedLicenseTrack(currentTrack); setSelectedLicenseType('mp3'); }} className="bg-goldAccent text-black font-bold px-4 py-2 rounded-xl text-xs">Acheter</button></div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
