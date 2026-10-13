window.SettingsComponent = function({ currentUser, editName, setEditName, editAvatarFile, setEditAvatarFile, editRip, setEditRip, handleSaveSettings, t }) {
  if (!currentUser) return null;

  return (
    <div className="max-w-2xl mx-auto glass-card p-8 rounded-3xl border-gray-700/50 animate-fade-in">
      <div className="flex items-center gap-4 mb-8 border-b border-borderDark pb-6">
        <div className="w-16 h-16 rounded-full bg-borderDark flex items-center justify-center">
          <Icon name="settings" className="w-8 h-8 text-gray-400" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-white">{t('settingsTitle')}</h2>
          <p className="text-sm text-gray-400">{t('settingsSub')}</p>
        </div>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-obsidian rounded-2xl border border-borderDark">
          <img 
            src={editAvatarFile ? URL.createObjectURL(editAvatarFile) : currentUser.avatar} 
            className="w-24 h-24 rounded-full object-cover border-4 border-cyanNeon" 
          />
          <div className="flex-1 w-full">
            <label className="text-xs font-bold text-gray-400 block mb-2">Changer la Photo (Fichier PC)</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={e => { if (e.target.files[0]) setEditAvatarFile(e.target.files[0]); }} 
              className="w-full text-sm text-gray-400 file:bg-cyanNeon file:text-black file:border-0 file:rounded-xl file:px-4 file:py-2 file:mr-4 file:font-bold hover:file:opacity-90 transition cursor-pointer" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-bold text-gray-400 block mb-1">Nom d'Artiste / Surnom</label>
            <input type="text" required value={editName} onChange={e => setEditName(e.target.value)} className="w-full bg-obsidian border border-borderDark rounded-xl p-3 text-sm text-white focus:border-cyanNeon outline-none" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 block mb-1">Email (Non modifiable)</label>
            <input type="email" disabled value={currentUser.email} className="w-full bg-obsidian/50 border border-borderDark/50 rounded-xl p-3 text-sm text-gray-500 outline-none cursor-not-allowed" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-goldAccent/5 border border-goldAccent/30">
          <label className="text-xs font-bold text-goldAccent block mb-1 uppercase tracking-widest flex items-center gap-2">
            <Icon name="dollar" className="w-4 h-4"/> Paiement (RIB / RIP)
          </label>
          <p className="text-[10px] text-gray-400 mb-3">Votre compte BaridiMob ou CCP pour recevoir vos paiements DZD.</p>
          <input type="text" value={editRip} onChange={e => setEditRip(e.target.value)} placeholder="00799999000000000012" className="w-full bg-obsidian border border-goldAccent/40 rounded-xl p-3 text-sm text-white focus:border-goldAccent outline-none font-mono" />
        </div>

        <button type="submit" className="w-full bg-white text-black font-black py-4 rounded-xl hover:bg-gray-200 transition mt-4 shadow-lg">
          {t('saveChanges')}
        </button>
      </form>
    </div>
  );
};
