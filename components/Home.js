// On attache le composant à "window" pour pouvoir le lire depuis app.js sans aucun logiciel compliqué.
window.HomeComponent = function({ setView, t }) {
  return (
    <div className="space-y-24 animate-fade-in">
      
      {/* HERO BANNER VITRINE */}
      <div className="relative glass-card rounded-[2.5rem] p-12 md:p-20 overflow-hidden border-cyanNeon/30 mt-4 flex flex-col md:flex-row items-center justify-between">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/85 to-transparent"></div>
        
        <div className="relative z-10 max-w-2xl text-center md:text-left">
          <span className="inline-block bg-cyanNeon/20 border border-cyanNeon/50 text-cyanNeon text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase">
            {t('heroSub')}
          </span>
          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
            {t('heroTitle1')} <br/><span className="text-gradient-cyan">{t('heroTitle2')}</span>
          </h2>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">{t('heroDesc')}</p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <button onClick={() => { setView('vsts'); window.scrollTo(0,0); }} className="w-full sm:w-auto bg-cyanNeon text-black font-black px-8 py-4 rounded-xl text-lg hover:scale-105 transition cyan-glow">
              {t('btnVst')}
            </button>
            <button onClick={() => { setView('beats'); window.scrollTo(0,0); }} className="w-full sm:w-auto bg-transparent border-2 border-goldAccent text-goldAccent font-black px-8 py-4 rounded-xl text-lg hover:bg-goldAccent/10 transition">
              {t('btnBeats')}
            </button>
          </div>
        </div>

        <div className="hidden md:block relative z-10">
          <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80" className="w-80 h-80 object-cover rounded-full border-4 border-cyanNeon shadow-[0_0_50px_rgba(0,240,255,0.4)]" />
        </div>
      </div>

      {/* SECTION 1 : POUR LES BEATMAKERS */}
      <div className="glass-card p-8 md:p-12 rounded-3xl border-goldAccent/50 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-2xl text-center md:text-left z-10">
          <h3 className="text-3xl font-black text-white mb-4">{t('q1Title')}</h3>
          <p className="text-gray-300 mb-6">{t('q1Desc')}</p>
        </div>
        <button onClick={() => setView('upload')} className="bg-goldAccent text-black font-black px-8 py-5 rounded-2xl whitespace-nowrap hover:scale-105 transition gold-glow z-10">
          {t('q1Btn')}
        </button>
      </div>

      {/* SECTION 2 : POUR LES ARTISTES */}
      <div className="glass-card p-8 md:p-12 rounded-3xl border-cyanNeon/50 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-2xl text-center md:text-left z-10">
          <h3 className="text-3xl font-black text-white mb-4">{t('q2Title')}</h3>
          <p className="text-gray-300 mb-6">{t('q2Desc')}</p>
        </div>
        <button onClick={() => { setView('beats'); window.scrollTo(0,0); }} className="bg-cyanNeon text-black font-black px-8 py-5 rounded-2xl whitespace-nowrap hover:scale-105 transition cyan-glow z-10">
          {t('q2Btn')}
        </button>
      </div>

      {/* ARGUMENTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-card p-8 rounded-2xl border-cyanNeon/30 text-center hover:border-cyanNeon transition">
          <h3 className="text-xl font-bold text-white mb-2">{t('arg1')}</h3>
          <p className="text-sm text-gray-400">{t('arg1Desc')}</p>
        </div>
        <div className="glass-card p-8 rounded-2xl border-goldAccent/30 text-center hover:border-goldAccent transition">
          <h3 className="text-xl font-bold text-white mb-2">{t('arg2')}</h3>
          <p className="text-sm text-gray-400">{t('arg2Desc')}</p>
        </div>
        <div className="glass-card p-8 rounded-2xl border-pinkNeon/30 text-center hover:border-pinkNeon transition">
          <h3 className="text-xl font-bold text-white mb-2">{t('arg3')}</h3>
          <p className="text-sm text-gray-400">{t('arg3Desc')}</p>
        </div>
      </div>
    </div>
  );
};
