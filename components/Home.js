function Home({ setView }) {
  return (
    <div className="space-y-24 animate-fade-in">
      <div className="relative glass-card rounded-[2.5rem] p-12 md:p-20 overflow-hidden border-cyanNeon/30 mt-4 flex flex-col md:flex-row items-center justify-between">
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/85 to-transparent"></div>
        <div className="relative z-10 max-w-2xl text-center md:text-left">
          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
            LE SON DES <br/><span className="text-gradient-cyan">PRODUCTEURS PRO</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <button onClick={() => setView('vsts')} className="bg-cyanNeon text-black font-black px-8 py-4 rounded-xl text-lg hover:scale-105 transition cyan-glow">DÉCOUVRIR LES VSTS</button>
          </div>
        </div>
      </div>
    </div>
  );
}
