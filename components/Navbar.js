function Navbar({ view, setView, currentUser, setCurrentUser, defaultUser }) {
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);

  const handleLogin = () => {
    localStorage.setItem('yanrecords_user', JSON.stringify(defaultUser));
    setCurrentUser(defaultUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('yanrecords_user');
    setCurrentUser(null);
    setShowProfileMenu(false);
    setView('home');
  };

  return (
    <>
      {showProfileMenu && <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)}></div>}
      
      <nav className="glass fixed top-0 w-full z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setView('home')}>
          <div className="w-10 h-10 rounded-lg bg-black border border-goldAccent/50 flex items-center justify-center font-black text-xl text-goldAccent shadow-lg">Y</div>
          <h1 className="text-2xl font-black tracking-widest text-white hidden sm:block">YAN<span className="text-gradient-gold">RECORDS</span></h1>
        </div>

        <div className="hidden md:flex bg-black/40 border border-borderDark rounded-full p-1">
          <button onClick={() => setView('home')} className={`px-5 py-2 rounded-full text-sm font-bold transition ${view === 'home' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}>Accueil</button>
          <button onClick={() => setView('vsts')} className={`px-5 py-2 rounded-full text-sm font-bold transition ${view === 'vsts' ? 'bg-cyanNeon text-black' : 'text-gray-400 hover:text-white'}`}>Plugins VST</button>
          <button onClick={() => setView('beats')} className={`px-5 py-2 rounded-full text-sm font-bold transition ${view === 'beats' ? 'bg-goldAccent text-black' : 'text-gray-400 hover:text-white'}`}>Beatstore</button>
        </div>

        <div className="flex items-center gap-3 relative z-50">
          {currentUser ? (
            <div className="relative">
              <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center gap-2 bg-cardDark border border-borderDark px-2 py-1.5 rounded-xl cursor-pointer hover:border-cyanNeon transition">
                <img src={currentUser.avatar} className="w-7 h-7 rounded-full object-cover" />
                <span className="text-xs font-bold text-white hidden md:block">{currentUser.name}</span>
                <Icon name="chevronDown" className="w-4 h-4 text-gray-400" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-3 w-48 glass-card rounded-xl border-borderDark shadow-2xl p-2 dropdown-anim flex flex-col gap-1">
                  <div className="px-3 py-2 border-b border-borderDark/50 mb-1">
                    <p className="text-sm font-bold text-white truncate">{currentUser.name}</p>
                  </div>
                  <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition w-full text-left">
                    <Icon name="logout" className="w-4 h-4" /> Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={handleLogin} className="bg-cardDark border border-borderDark text-white hover:border-cyanNeon px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2">
              <Icon name="user" className="w-4 h-4" /> <span>Connexion</span>
            </button>
          )}
        </div>
      </nav>
    </>
  );
}
