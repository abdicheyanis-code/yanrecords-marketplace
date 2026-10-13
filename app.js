const SUPABASE_URL = 'https://xyz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJ...'; 
const supabase = (window.supabase && !SUPABASE_URL.includes('xyz.supabase.co')) ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

// L'import magique du fichier Home.js
const Home = window.HomeComponent;

const DICT = {
    fr: {
    home: "Accueil", vsts: "Plugins VST", beats: "Beatstore", dashboard: "Dashboard Vendeur", uploadBtn: "Poster Beat / VST", login: "Connexion / Gmail", lang: "English", settings: "Paramètres", logout: "Déconnexion", back: "Retour à l'accueil",
    heroTitle1: "LE SON DES", heroTitle2: "PRODUCTEURS PRO", heroSub: "La 1ère Marketplace de Beatmaking en Algérie",
    heroDesc: "Propulsez votre carrière musicale. Accédez à des VSTs exclusifs codés en C++ natif et à des instrumentales uniques réservables en direct avec contrats de licences officiels.",
    btnVst: "DÉCOUVRIR LES VSTS", btnBeats: "ÉCOUTER LE BEATSTORE",
    q1Title: "VOUS ÊTES BEATMAKER / PRODUCTEUR ?", q1Desc: "Rejoignez la 1ère plateforme d'Algérie. Publiez vos instrumentales et VSTs, fixez vos prix et encaissez via BaridiMob, Edahabia & PayPal.", q1Btn: "REJOINDRE & VENDRE VOS PRODS",
    q2Title: "TU ES UN(E) ARTISTE / RAPPEUR(SE) ?", q2Desc: "Déniche les meilleures pépites pour tes projets. Réserve des licences exclusives (verrouillage immédiat) ou utilise nos VSTs pro pour le studio.", q2Btn: "DÉNICHER DES PÉPITES",
    arg1: "Plugins VST3 Négatifs", arg1Desc: "C++ natif pour FL Studio. Zéro latence.", arg2: "Licences Verrouillées", arg2Desc: "Les beats exclusifs sont retirés automatiquement.", arg3: "Paiement Local & Global", arg3Desc: "Edahabia, CIB, BaridiMob et PayPal sécurisés.",
    settingsTitle: "Paramètres du Profil", settingsSub: "Gérez vos informations publiques et de paiement", saveChanges: "Enregistrer les modifications", buyLicense: "Acheter Clé VST", buyBeat: "Acheter"
    },
    en: {
    home: "Home", vsts: "VST Plugins", beats: "Beatstore", dashboard: "Seller Dashboard", uploadBtn: "Upload Beat / VST", login: "Login / Gmail", lang: "Français", settings: "Settings", logout: "Logout", back: "Back to Home",
    heroTitle1: "THE SOUND OF", heroTitle2: "PRO PRODUCERS", heroSub: "The #1 Beatmaking Marketplace in Algeria",
    heroDesc: "Elevate your music career. Get access to exclusive native C++ VSTs and unique instrumentals with official license contracts directly.",
    btnVst: "DISCOVER VSTS", btnBeats: "LISTEN TO BEATSTORE",
    q1Title: "ARE YOU A BEATMAKER / PRODUCER?", q1Desc: "Join the #1 platform in Algeria. Upload beats and VSTs, set your prices, and get paid directly via BaridiMob, Edahabia & PayPal.", q1Btn: "JOIN & SELL YOUR BEATS",
    q2Title: "ARE YOU AN ARTIST / RAPPER?", q2Desc: "Find the best gems for your projects. Secure exclusive licenses (instant lock) or use our pro VSTs for your studio sessions.", q2Btn: "FIND EXCLUSIVE BEATS",
    arg1: "Native VST3 Plugins", arg1Desc: "Built in pure C++ for FL Studio. Zero latency.", arg2: "Locked Licenses", arg2Desc: "Exclusive beats are instantly removed from the store.", arg3: "Local & Global Payments", arg3Desc: "Edahabia, CIB, BaridiMob and PayPal secured.",
    settingsTitle: "Profile Settings", settingsSub: "Manage your public information and payment details", saveChanges: "Save Changes", buyLicense: "Buy VST Key", buyBeat: "Purchase"
    }
};

const Icon = ({ name, className = "w-5 h-5" }) => {
    // Liste des SVG raccourcie pour l'exemple
    return <i data-lucide={name} className={className}></i>;
};

const INITIAL_TRACKS = [
    { id: 'vst-1', title: 'SmartMaster V2 Pro', type: 'vst', category: 'Mastering', price: 6500, priceMp3: 6500, cover: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80', audio: '', desc: 'Processeur de mastering intelligent', producer: 'YANrecords', isSold: false },
    { id: 'beat-1', title: 'Marseille Vibes', type: 'beat', bpm: 130, key: 'Am', genre: 'Jul Type', producer: 'Slima Beatz', priceMp3: 2000, priceExclusive: 25000, cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', isSold: false }
];

const DEFAULT_USER = {
    id: 'ceo-user-1', name: 'Yanis (CEO)', email: 'yanis.records@gmail.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80', balance: 84500, plays: 18920, rip: '00799999000000000012'
};

function App() {
    const [lang, setLang] = React.useState('fr');
    const t = (key) => DICT[lang][key] || key;

    const [view, setViewState] = React.useState('home');
    const [tracks, setTracks] = React.useState(INITIAL_TRACKS);
    const [currentUser, setCurrentUser] = React.useState(DEFAULT_USER);
    const [showProfileMenu, setShowProfileMenu] = React.useState(false);
    
    React.useEffect(() => {
        if (window.lucide) window.lucide.createIcons();
    });

    const setView = (newView) => {
        setViewState(newView);
        setShowProfileMenu(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="relative">
            {showProfileMenu && <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)}></div>}
            
            <nav className="glass fixed top-0 w-full z-50 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4 cursor-pointer" onClick={() => setView('home')}>
                    <div className="w-10 h-10 rounded-lg bg-black border border-goldAccent/50 flex items-center justify-center font-black text-xl text-goldAccent shadow-lg">Y</div>
                    <h1 className="text-2xl font-black tracking-widest text-white hidden sm:block">YAN<span className="text-gradient-gold">RECORDS</span></h1>
                </div>

                <div className="hidden md:flex bg-black/40 border border-borderDark rounded-full p-1">
                    <button onClick={() => setView('home')} className={`px-5 py-2 rounded-full text-sm font-bold transition ${view === 'home' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}>{t('home')}</button>
                    <button onClick={() => setView('vsts')} className={`px-5 py-2 rounded-full text-sm font-bold transition ${view === 'vsts' ? 'bg-cyanNeon text-black' : 'text-gray-400 hover:text-white'}`}>{t('vsts')}</button>
                </div>

                <div className="flex items-center gap-3 relative z-50">
                    <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center gap-2 bg-cardDark border border-borderDark px-2 py-1.5 rounded-xl cursor-pointer hover:border-cyanNeon transition">
                        <img src={currentUser.avatar} className="w-7 h-7 rounded-full object-cover" />
                        <span className="text-xs font-bold text-white hidden md:block">{currentUser.name}</span>
                    </button>

                    {showProfileMenu && (
                        <div className="absolute right-0 top-12 mt-2 w-56 glass-card rounded-xl border-borderDark shadow-2xl p-2 dropdown-anim flex flex-col gap-1">
                            <button onClick={() => setView('dashboard')} className="px-3 py-2.5 rounded-lg text-sm font-bold text-gray-300 hover:bg-white/10 text-left">{t('dashboard')}</button>
                            <button onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')} className="px-3 py-2.5 rounded-lg text-sm font-bold text-gray-300 hover:bg-white/10 text-left">{t('lang')}</button>
                        </div>
                    )}
                </div>
            </nav>

            <div className="pt-28 pb-10 px-6 max-w-7xl mx-auto">
                {view === 'home' && <Home setView={setView} t={t} />}
                
                {view === 'vsts' && (
                    <div className="text-white text-3xl font-bold">Boutique VST (En construction dans VstStore.js)</div>
                )}
            </div>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
