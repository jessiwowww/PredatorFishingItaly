import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useLang } from '../i18n';
import Logo from './Logo';

export default function Header() {
  const { lang, setLang, t } = useLang();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navCls = ({ isActive }) =>
    `link-gold !text-cream ${isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`;

  const links = (
    <>
      <NavLink to="/" className={navCls} end onClick={() => setOpen(false)}>{t('nav.home')}</NavLink>
      <NavLink to="/tours" className={navCls} onClick={() => setOpen(false)}>{t('nav.tours')}</NavLink>
      <NavLink to="/guide" className={navCls} onClick={() => setOpen(false)}>{t('nav.guide')}</NavLink>
    </>
  );

  return (
    <header
      className="sticky top-0 z-40 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(19,34,27,0.82)' : 'rgba(19,34,27,1)',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: `1px solid rgba(243,234,217,${scrolled ? 0.14 : 0.1})`,
      }}
    >
      <div className={`flex items-center justify-between px-5 md:px-12 transition-all duration-300 ${scrolled ? 'py-3' : 'py-4 md:py-5'}`}>
        <Link to="/" aria-label="Predator Fishing Italy — home">
          <Logo compact={scrolled} />
        </Link>

        {/* desktop nav */}
        <nav className="hidden md:flex items-center gap-8 font-barlow font-semibold text-[15px] uppercase tracking-[0.05em] text-cream">
          {links}
          <div className="flex gap-1.5 text-[12px] text-cream/45 select-none">
            <button onClick={() => setLang('en')} className={lang === 'en' ? 'text-cream' : 'hover:text-cream/70'}>EN</button>
            <span>/</span>
            <button onClick={() => setLang('it')} className={lang === 'it' ? 'text-cream' : 'hover:text-cream/70'}>IT</button>
          </div>
          <button onClick={() => navigate('/tours')} className="btn-gold px-5 py-2.5 text-[14px]">
            {t('nav.book')}
          </button>
        </nav>

        {/* mobile controls */}
        <div className="flex md:hidden items-center gap-4">
          <div className="flex gap-1.5 text-[12px] text-cream/45 select-none">
            <button onClick={() => setLang('en')} className={lang === 'en' ? 'text-cream' : ''}>EN</button>
            <span>/</span>
            <button onClick={() => setLang('it')} className={lang === 'it' ? 'text-cream' : ''}>IT</button>
          </div>
          <button onClick={() => setOpen((v) => !v)} aria-label="Menu" className="w-9 h-9 flex flex-col items-center justify-center gap-[5px]">
            <span className={`block w-6 h-[2px] bg-cream transition-transform ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`block w-6 h-[2px] bg-cream transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-[2px] bg-cream transition-transform ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      {open && (
        <nav className="md:hidden flex flex-col gap-5 px-5 pb-6 pt-2 border-t divider font-barlow font-semibold text-[18px] uppercase tracking-[0.05em]">
          {links}
          <button onClick={() => { setOpen(false); navigate('/tours'); }} className="btn-gold px-5 py-3 text-[15px] mt-1">
            {t('nav.book')}
          </button>
        </nav>
      )}
    </header>
  );
}
