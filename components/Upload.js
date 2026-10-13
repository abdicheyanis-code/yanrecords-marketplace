window.UploadComponent = function({ setView, uploadTitle, setUploadTitle, uploadType, setUploadType, uploadGenre, setUploadGenre, uploadBpm, setUploadBpm, uploadKey, setUploadKey, priceMp3, setPriceMp3, priceWav, setPriceWav, priceStems, setPriceStems, priceExclusive, setPriceExclusive, setCoverFile, setAudioFile, handleUploadSubmit }) {
  return (
    <div className="max-w-2xl mx-auto glass-card p-8 rounded-2xl border-goldAccent/40 animate-fade-in">
      <button onClick={() => setView('dashboard')} className="mb-4 flex items-center gap-2 text-gray-400 hover:text-white text-xs font-bold">
        <Icon name="arrowLeft" className="w-4 h-4" />
        <span>Retour au Dashboard</span>
      </button>

      <h2 className="text-2xl font-black text-white mb-2">Poster une nouvelle création</h2>
      <p className="text-xs text-gray-400 mb-6">Remplissez les détails et fixez vos prix pour l'Algérie</p>

      <form onSubmit={handleUploadSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-bold text-gray-300 block mb-1">Titre de la prod ou du VST</label>
          <input type="text" required value={uploadTitle} onChange={(e) => setUploadTitle(e.target.value)} placeholder="ex: Drill Algiers / SmartClipper" className="w-full bg-obsidian border border-borderDark rounded-xl p-3 text-sm text-white outline-none focus:border-cyanNeon" />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-bold text-gray-300 block mb-1">Type</label>
            <select value={uploadType} onChange={(e) => setUploadType(e.target.value)} className="w-full bg-obsidian border border-borderDark rounded-xl p-3 text-sm text-white outline-none">
              <option value="beat">Beat Instrumentale</option>
              <option value="vst">Plugin VST3 (.exe)</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-300 block mb-1">BPM</label>
            <input type="number" value={uploadBpm} onChange={(e) => setUploadBpm(e.target.value)} className="w-full bg-obsidian border border-borderDark rounded-xl p-3 text-sm text-white outline-none" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-300 block mb-1">Gamme (Key)</label>
            <input type="text" value={uploadKey} onChange={(e) => setUploadKey(e.target.value)} className="w-full bg-obsidian border border-borderDark rounded-xl p-3 text-sm text-white outline-none" />
          </div>
        </div>

        {uploadType === 'beat' ? (
          <div className="p-4 rounded-xl bg-obsidian/60 border border-borderDark space-y-3">
            <span className="text-xs font-bold text-goldAccent block uppercase">Configuration des Prix (DZD)</span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-gray-400 block">Prix MP3 Lease</label>
                <input type="number" value={priceMp3} onChange={(e) => setPriceMp3(e.target.value)} className="w-full bg-cardDark border border-borderDark rounded-lg p-2 text-xs text-white" />
              </div>
              <div>
                <label className="text-[11px] text-gray-400 block">Prix WAV Lease</label>
                <input type="number" value={priceWav} onChange={(e) => setPriceWav(e.target.value)} className="w-full bg-cardDark border border-borderDark rounded-lg p-2 text-xs text-white" />
              </div>
              <div>
                <label className="text-[11px] text-gray-400 block">Prix Stems (Pistes)</label>
                <input type="number" value={priceStems} onChange={(e) => setPriceStems(e.target.value)} className="w-full bg-cardDark border border-borderDark rounded-lg p-2 text-xs text-white" />
              </div>
              <div>
                <label className="text-[11px] text-gray-400 block">Prix Exclusif (SOLD)</label>
                <input type="number" value={priceExclusive} onChange={(e) => setPriceExclusive(e.target.value)} className="w-full bg-cardDark border border-borderDark rounded-lg p-2 text-xs text-white" />
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-cyanNeon/10 border border-cyanNeon/30">
            <label className="text-xs font-bold text-cyanNeon block mb-1">Prix Logiciel (DZD)</label>
            <input type="number" value={priceMp3} onChange={(e) => setPriceMp3(e.target.value)} className="w-full bg-cardDark border border-cyanNeon/50 rounded-lg p-2 text-xs text-white" />
          </div>
        )}

        <div>
          <label className="text-xs font-bold text-gray-300 block mb-1">Pochette (JPG / PNG)</label>
          <input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files[0])} className="w-full text-xs text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-cyanNeon file:text-black" />
        </div>

        <div>
          <label className="text-xs font-bold text-gray-300 block mb-1">Fichier Audio (MP3/WAV) ou Installeur VST (.exe)</label>
          <input type="file" onChange={(e) => setAudioFile(e.target.files[0])} className="w-full text-xs text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-goldAccent file:text-black" />
        </div>

        <button type="submit" className="w-full bg-goldAccent text-black font-black py-4 rounded-xl gold-glow hover:opacity-90 transition mt-4">
          PUBLIER EN DIRECT SUR YANRECORDS
        </button>
      </form>
    </div>
  );
};
