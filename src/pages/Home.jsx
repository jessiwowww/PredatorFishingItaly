import { Link } from 'react-router-dom';
import { useLang } from '../i18n';
import { useBooking } from '../App';
import { SPECIES, TOURS } from '../data';

function Diamond() {
  return <div className="w-2 h-2 bg-gold rotate-45 flex-none relative -top-px" />;
}

export default function Home() {
  const { t } = useLang();
  const { openBooking } = useBooking();

  const why = [1, 2, 3, 4].map((i) => (
    <div key={i} className={`flex items-baseline gap-4 ${i <= 2 ? 'border-b divider pb-[18px]' : ''}`}>
      <Diamond />
      <div className="font-barlow font-medium text-[20px] leading-[1.3] text-cream">
        <span className="text-gold font-bold">{t(`home.why.${i}a`)}</span>
        {t(`home.why.${i}b`)}
      </div>
    </div>
  ));

  return (
    <main>
      {/* HERO */}
      <section className="relative h-[560px] md:h-[640px]">
        <img src="/images/hero.jpg" alt="Bass boat at dawn" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg,#13221b 8%,rgba(15,26,20,.1) 50%,rgba(15,26,20,.6))' }} />
        <div className="absolute left-6 right-6 md:left-12 md:right-12 bottom-16">
          <div className="eyebrow tracking-[0.3em] text-[13px] mb-5">{t('home.eyebrow')}</div>
          <h1 className="font-archivo font-black text-[52px] md:text-[80px] leading-[0.95] tracking-[-0.01em] text-cream max-w-[820px]">
            {t('home.h1')}
          </h1>
          <p className="font-barlow text-[20px] md:text-[23px] leading-[1.45] text-cream/85 max-w-[600px] mt-5">{t('home.sub')}</p>
          <Link to="/tours" className="btn-gold px-8 py-4 text-[16px] mt-8">{t('home.cta')}</Link>
        </div>
      </section>

      {/* WHY */}
      <section className="px-6 md:px-16 py-13 md:py-[52px] border-b divider">
        <div className="eyebrow text-[11px] mb-6">{t('home.why')}</div>
        <div className="grid md:grid-cols-2 gap-y-[22px] gap-x-[72px]">{why}</div>
      </section>

      {/* GUIDE TEASER */}
      <section className="grid md:grid-cols-2">
        <img src="/images/roberto.jpg" alt="Roberto Bertoncello" className="w-full h-[360px] md:h-[520px] object-cover" />
        <div className="px-6 md:px-16 py-12 md:py-[72px] flex flex-col justify-center gap-5">
          <div className="eyebrow">{t('home.guide.eyebrow')}</div>
          <div className="font-archivo font-black text-[32px] md:text-[38px] leading-[1.05]">Roberto Bertoncello</div>
          <p className="font-barlow text-[20px] leading-[1.55] text-cream/70 max-w-[460px]">{t('home.guide.blurb')}</p>
          <Link to="/guide" className="font-barlow font-semibold text-[15px] uppercase tracking-[0.05em] text-gold mt-2">
            {t('home.guide.cta')}
          </Link>
        </div>
      </section>

      {/* SPECIES */}
      <section className="px-6 md:px-16 py-12 border-t divider">
        <div className="eyebrow mb-[18px]">{t('home.species')}</div>
        <div className="flex gap-2.5 flex-wrap">
          {SPECIES.filter((s) => s !== 'asp').map((s) => (
            <div key={s} className="chip">{t(`sp.${s}`)}</div>
          ))}
        </div>
      </section>

      {/* WATERS TEASER */}
      <section className="px-6 md:px-16 py-12 border-t divider flex flex-col md:flex-row justify-between md:items-center gap-4">
        <p className="font-barlow text-[19px] leading-[1.5] text-cream/70">{t('home.waters.teaser')}</p>
        <Link to="/tours" className="font-barlow font-semibold text-[15px] uppercase tracking-[0.05em] text-gold whitespace-nowrap">
          {t('home.waters.cta')}
        </Link>
      </section>

      {/* HALF-DAY PUSH */}
      <section className="px-6 md:px-16 py-14 border-t divider grid md:grid-cols-[1fr_auto] items-center gap-8">
        <div>
          <div className="eyebrow mb-3">{t('home.halfday.eyebrow')}</div>
          <div className="font-archivo font-black text-[28px] md:text-[34px] leading-[1.05]">{t('home.halfday.title')}</div>
          <p className="font-barlow text-[19px] leading-[1.5] text-cream/70 max-w-[560px] mt-4">{t('home.halfday.text')}</p>
        </div>
        <button onClick={() => openBooking('half')} className="btn-gold px-8 py-4 text-[15px] justify-self-start md:justify-self-end">
          {t('home.halfday.cta')}
        </button>
      </section>

      {/* TOURS TEASER */}
      <section className="px-6 md:px-16 py-16 border-t divider">
        <div className="flex justify-between items-baseline mb-8">
          <div className="font-archivo font-black text-[30px]">{t('home.tours')}</div>
          <Link to="/tours" className="font-barlow font-semibold text-[15px] uppercase tracking-[0.05em] text-gold">
            {t('home.tours.cta')}
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {TOURS.map((tour) => (
            <Link to="/tours" key={tour.id} className="group">
              <img src={tour.img} alt={t(`tour.${tour.id}.name`)} className="w-full h-[200px] object-cover group-hover:opacity-90 transition-opacity" />
              <div className="pt-4 font-barlow font-bold text-[22px] leading-[1.15]">{t(`tour.${tour.id}.name`)}</div>
              <div className="font-barlow text-[16px] text-cream/60 mt-1.5">
                {t(`tour.${tour.id}.duration`)} · {t(`tour.${tour.id}.tagline`)}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
