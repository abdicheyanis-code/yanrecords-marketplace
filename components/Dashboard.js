function Dashboard({ currentUser, tracks, setView }) {
  if (!currentUser) return null;

  return (
    <div className="space-y-8 animate-fade-in">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl border-cyanNeon/30">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-gray-400">REVENUS TOTAUX</span>
          </div>
          <span className="text-3xl font-black text-cyanNeon">{(currentUser.balance || 0).toLocaleString()} DZD</span>
        </div>
        <div className="glass-card p-6 rounded-2xl border-pinkNeon/30">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-gray-400">MES CRÉATIONS</span>
          </div>
          <span className="text-3xl font-black text-pinkNeon">{tracks.filter(t => t.producer === currentUser.name || t.producer === 'YANrecords').length}</span>
        </div>
      </div>
    </div>
  );
}
