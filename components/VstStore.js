function VstStore({ vsts }) {
  return (
    <section className="mb-16 animate-fade-in">
      <h3 className="text-3xl font-black mb-6 text-white border-l-4 border-cyanNeon pl-4">PLUGINS VST3 OFFICIELS</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {vsts.map(vst => (
          <div key={vst.id} className="glass-card rounded-2xl p-5 flex flex-col justify-between border-cyanNeon/30">
            <span className="absolute top-3 right-3 bg-cyanNeon text-black text-[10px] font-black px-2 py-1 rounded">VST3 WINDOWS</span>
            <img src={vst.cover} className="w-full h-44 object-cover rounded-xl mb-4" />
            <h4 className="text-xl font-black text-white">{vst.title}</h4>
            <p className="text-xs text-goldAccent font-bold mt-1">Par {vst.producer}</p>
            <p className="text-xs text-gray-400 my-2 flex-grow">{vst.desc}</p>
            <div className="flex items-center justify-between pt-4 border-t border-borderDark mt-2">
              <span className="text-lg font-black text-goldAccent">{vst.price.toLocaleString()} DZD</span>
              <button onClick={() => alert("Achat VST: " + vst.title)} className="bg-cyanNeon text-black font-bold px-4 py-2 rounded-xl text-xs hover:opacity-90 transition">
                Acheter Clé VST
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
