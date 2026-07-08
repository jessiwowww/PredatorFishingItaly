import { useLang } from '../i18n';
import { INSTAGRAM } from '../config';

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="flex justify-between items-center px-6 md:px-12 py-6 font-barlow text-[13px] text-cream/50 border-t divider">
      <div>{t('footer.copy')}</div>
      <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="hover:text-gold">#PredatorFishing</a>
    </footer>
  );
}
