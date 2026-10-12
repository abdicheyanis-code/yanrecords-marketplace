const Icon = ({ name, className = "w-5 h-5" }) => {
  const icons = {
    play: <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>,
    pause: <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>,
    upload: <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>,
    user: <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    logout: <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>,
    chevronDown: <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
  };
  return icons[name] || null;
};
