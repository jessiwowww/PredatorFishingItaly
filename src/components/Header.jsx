import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useLang } from '../i18n';

export default function Header() {
  const { lang, setLang, t } = useLang();
  const navigate = useNavigate();

  const navCls = ({ isActive }) => (isActive ? 'opacity-100' : 'opacity-55 hover:opacity-80');

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-6 md:px-12 py-5 bg-pine border-b divider">
      <Link to="/" className="font-archivo font-black text-[17px] md:text-[19px] tracking-[0.02em] text-cream whitespace-nowrap">
        ITALIAN BASS FISHING
      </Link>
      <nav className="flex items-center gap-4 md:gap-8 font-barlow font-semibold text-[14px] md:text-[15px] uppercase tracking-[0.05em] text-cream">
        <NavLink to="/" className={navCls} end>{t('nav.home')}</NavLink>
        <NavLink to="/tours" className={navCls}>{t('nav.tours')}</NavLink>
        <NavLink to="/guide" className={navCls}>{t('nav.guide')}</NavLink>
        <div className="flex gap-1.5 text-[12px] text-cream/45 select-none">
          <button onClick={() => setLang('en')} className={lang === 'en' ? 'text-cream' : 'hover:text-cream/70'}>EN</button>
          <span>/</span>
          <button onClick={() => setLang('it')} className={lang === 'it' ? 'text-cream' : 'hover:text-cream/70'}>IT</button>
        </div>
        <button onClick={() => navigate('/tours')} className="btn-gold px-5 py-2.5 text-[14px] hidden sm:block">
          {t('nav.book')}
        </button>
      </nav>
    </header>
  );
}
