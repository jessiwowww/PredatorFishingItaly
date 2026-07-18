import { Link } from 'react-router-dom';
import { useLang } from '../i18n';
import { INSTAGRAM } from '../config';
import Logo from './Logo';

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="px-6 md:px-12 pt-14 pb-8 border-t divider">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-[360px]">
          <Logo />
          <p className="font-barlow text-[16px] leading-[1.5] text-cream/55 mt-4">{t('footer.tagline')}</p>
        </div>
        <nav className="flex flex-col gap-2.5 font-barlow font-semibold text-[15px] uppercase tracking-[0.05em]">
          <Link to="/" className="link-gold !text-cream/70 hover:!text-cream">{t('nav.home')}</Link>
          <Link to="/tours" className="link-gold !text-cream/70 hover:!text-cream">{t('nav.tours')}</Link>
          <Link to="/guide" className="link-gold !text-cream/70 hover:!text-cream">{t('nav.guide')}</Link>
          <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="link-gold !text-cream/70 hover:!text-cream">Instagram</a>
        </nav>
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-2 mt-12 pt-6 border-t divider font-barlow text-[13px] text-cream/45">
        <div>{t('footer.copy')}</div>
        <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="hover:text-gold">#PredatorFishing</a>
      </div>
    </footer>
  );
}
