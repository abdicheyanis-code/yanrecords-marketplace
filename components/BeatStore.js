window.BeatStoreComponent = function({ beats, togglePlay, currentTrack, isPlaying, setSelectedLicenseTrack, setSelectedLicenseType, setPurchasedKey, t }) {
  return (
    <section className="animate-fade-in">
      <h3 className="text-3xl font-black mb-6 text-white border-l-4 border-goldAccent pl-4">BEATSTORE OFFICIEL</h3>
      <div className="glass-card rounded-2xl p-4">
        <div className="space-y-2">
          {beats.map(beat => (
            <div key={beat.id} className={`grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-3 rounded-xl transition ${beat.isSold ? 'opacity-50 bg-black/60' : 'hover:bg-white/5'}`}>
              <div className="col-span-5 flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden cursor-pointer" onClick={() => !beat.isSold && togglePlay(beat)}>
                  <img src={beat.cover} className="w-full h-full object-cover" />
                  {!beat.isSold && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100">
                      <Icon name={currentTrack?.id === beat.id && isPlaying ? "pause" : "play"} className="w-5 h-5 text-white fill-current" />
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-white flex items-center gap-2">
                    {beat.title}
                    {beat.isSold && <span className="bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded">SOLD</span>}
                  </h4>
                  <p className="text-xs text-goldAccent font-bold">Par {beat.producer}</p>
                </div>
              </div>
              <div className="hidden md:block col-span-2 text-sm text-gray-400">{beat.bpm} BPM • {beat.key}</div>
              <div className="hidden md:block col-span-2 text-xs text-gray-500">{beat.plays || 0} écoutes</div>
              <div className="col-span-full md:col-span-3 flex justify-end items-center gap-3">
                {beat.isSold ? (
                  <span className="text-xs font-bold text-red-500 bg-red-950/40 border border-red-800/50 px-4 py-2 rounded-xl">EXCLUSIF VENDU</span>
                ) : (
                  <button 
                    onClick={() => { setSelectedLicenseTrack(beat); setSelectedLicenseType('mp3'); setPurchasedKey(null); }} 
                    className="border border-goldAccent text-goldAccent font-bold px-4 py-2 rounded-xl text-xs hover:bg-goldAccent hover:text-black transition"
                  >
                    {t('buyBeat')} ({beat.priceMp3.toLocaleString()} DZD)
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
