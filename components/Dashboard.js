window.DashboardComponent = function({ currentUser, tracks, setView, handleDeleteTrack, setShowAuthModal }) {
  if (!currentUser) {
    return (
      <div className="glass-card max-w-md mx-auto p-8 rounded-2xl text-center border-cyanNeon/40 animate-fade-in">
        <Icon name="user" className="w-12 h-12 text-cyanNeon mx-auto mb-4" />
        <h3 className="text-2xl font-black text-white mb-2">Espace Vendeur Protégé</h3>
        <p className="text-xs text-gray-400 mb-6">Connectez-vous avec votre compte Gmail pour accéder à votre Dashboard et uploader vos prods.</p>
        <button onClick={() => setShowAuthModal(true)} className="w-full bg-white text-black font-bold py-3 px-4 rounded-xl flex justify-center items-center gap-3 shadow-lg text-sm">
          <span>Connexion avec Google (Gmail)</span>
        </button>
      </div>
    );
  }

  const myTracks = tracks.filter(t => t.producer === currentUser.name || t.producer === 'YANrecords');

  return (
    <div className="space-y-8 animate-fade-in">
      {/* HEADER USER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-cardDark border border-borderDark p-6 rounded-2xl">
        <div className="flex items-center gap-4">
          <img src={currentUser.avatar} className="w-16 h-16 rounded-full object-cover border-2 border-goldAccent" />
          <div>
            <h2 className="text-2xl font-black text-white">{currentUser.name}</h2>
            <p className="text-xs text-gray-400">{currentUser.email} • Beatmaker Certifié 🇩🇿</p>
          </div>
        </div>
        <button onClick={() => setView('upload')} className="bg-gradient-to-r from-cyanNeon to-blue-600 text-black font-black px-6 py-3 rounded-xl flex items-center gap-2 cyan-glow">
          <Icon name="upload" className="w-4 h-4" />
          <span>Uploader un Beat / VST</span>
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl border-cyanNeon/30">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-gray-400">REVENUS TOTAUX</span>
            <Icon name="dollar" className="w-5 h-5 text-cyanNeon" />
          </div>
          <span className="text-3xl font-black text-cyanNeon">{(currentUser.balance || 84500).toLocaleString()} DZD</span>
        </div>

        <div className="glass-card p-6 rounded-2xl border-goldAccent/30">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-gray-400">ÉCOUTES TOTALES</span>
            <Icon name="activity" className="w-5 h-5 text-goldAccent" />
          </div>
          <span className="text-3xl font-black text-goldAccent">{(currentUser.plays || 18920).toLocaleString()}</span>
        </div>

        <div className="glass-card p-6 rounded-2xl border-pinkNeon/30">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-gray-400">MES CRÉATIONS</span>
            <Icon name="dashboard" className="w-5 h-5 text-pinkNeon" />
          </div>
          <span className="text-3xl font-black text-pinkNeon">{myTracks.length}</span>
        </div>
      </div>

      {/* MES TRACKS */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Gérer mes beats et VSTs</h3>
        <div className="space-y-3">
          {myTracks.map(track => (
            <div key={track.id} className="flex justify-between items-center p-3 rounded-xl bg-obsidian/60 border border-borderDark">
              <div className="flex items-center gap-4">
                <img src={track.cover} className="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <h4 className="font-bold text-white text-sm flex items-center gap-2">
                    {track.title}
                    {track.isSold && <span className="bg-red-600 text-white text-[9px] px-1.5 py-0.5 rounded">SOLD</span>}
                  </h4>
                  <p className="text-xs text-gray-400">{track.type.toUpperCase()} • {track.genre}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-goldAccent">{(track.priceMp3 || track.price || 2000).toLocaleString()} DZD</span>
                <button onClick={() => handleDeleteTrack(track.id)} className="p-2 bg-red-950/60 border border-red-800 text-red-400 hover:bg-red-600 hover:text-white rounded-lg transition">
                  <Icon name="trash" className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
