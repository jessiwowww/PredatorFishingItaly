import { Link } from 'react-router-dom';
import { useLang } from '../i18n';
import { useBooking } from '../App';
import { SPECIES, TOURS } from '../data';
import Reveal from '../components/Reveal';

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
      <section className="relative h-[88vh] min-h-[560px] max-h-[880px] overflow-hidden">
        <img src="/images/hero.jpg" alt="Bass boat at dawn" className="absolute inset-0 w-full h-full object-cover kenburns" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg,#13221b 6%,rgba(15,26,20,.15) 48%,rgba(15,26,20,.55))' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(120% 90% at 50% 120%, rgba(201,162,39,.12), transparent 60%)' }} />
        <div className="absolute left-6 right-6 md:left-12 md:right-12 bottom-20 md:bottom-24">
          <div className="eyebrow tracking-[0.3em] text-[13px] mb-5 reveal is-visible">{t('home.eyebrow')}</div>
          <h1 className="font-archivo font-black text-[52px] md:text-[86px] leading-[0.94] tracking-[-0.015em] text-cream max-w-[880px]">
            {t('home.h1')}
          </h1>
          <p className="font-barlow text-[20px] md:text-[24px] leading-[1.45] text-cream/85 max-w-[620px] mt-6">{t('home.sub')}</p>
          <Link to="/tours" className="btn-gold px-8 py-4 text-[16px] mt-9">{t('home.cta')} <span aria-hidden>→</span></Link>
        </div>
        <div className="scroll-cue absolute bottom-7 left-1/2 -translate-x-1/2 text-gold text-[22px]" aria-hidden>↓</div>
      </section>

      {/* WHY */}
      <Reveal as="section" className="px-6 md:px-16 py-16 border-b divider">
        <div className="eyebrow text-[11px] mb-7">{t('home.why')}</div>
        <div className="grid md:grid-cols-2 gap-y-[22px] gap-x-[72px]">{why}</div>
      </Reveal>

      {/* GUIDE TEASER */}
      <section className="grid md:grid-cols-2 group">
        <div className="overflow-hidden h-[360px] md:h-[560px]">
          <img src="/images/roberto.jpg" alt="Roberto Bertoncello" className="zoom-img" />
        </div>
        <Reveal className="px-6 md:px-16 py-12 md:py-[80px] flex flex-col justify-center gap-5">
          <div className="eyebrow">{t('home.guide.eyebrow')}</div>
          <div className="font-archivo font-black text-[32px] md:text-[42px] leading-[1.05]">Roberto Bertoncello</div>
          <p className="font-barlow text-[20px] leading-[1.55] text-cream/70 max-w-[460px]">{t('home.guide.blurb')}</p>
          <Link to="/guide" className="link-gold text-[15px] mt-2 self-start">{t('home.guide.cta')}</Link>
        </Reveal>
      </section>

      {/* SPECIES */}
      <Reveal as="section" className="px-6 md:px-16 py-14 border-t divider">
        <div className="eyebrow mb-5">{t('home.species')}</div>
        <div className="flex gap-2.5 flex-wrap">
          {SPECIES.filter((s) => s !== 'asp').map((s) => (
            <div key={s} className="chip">{t(`sp.${s}`)}</div>
          ))}
        </div>
      </Reveal>

      {/* WATERS TEASER */}
      <Reveal as="section" className="px-6 md:px-16 py-14 border-t divider flex flex-col md:flex-row justify-between md:items-center gap-4">
        <p className="font-barlow text-[19px] md:text-[22px] leading-[1.5] text-cream/70 max-w-[640px]">{t('home.waters.teaser')}</p>
        <Link to="/tours" className="link-gold text-[15px] whitespace-nowrap self-start">{t('home.waters.cta')}</Link>
      </Reveal>

      {/* HALF-DAY PUSH */}
      <Reveal as="section" className="mx-6 md:mx-16 my-4 rounded-lg overflow-hidden border" style={{ borderColor: 'rgba(201,162,39,.3)', background: 'linear-gradient(120deg, #182a20, #13221b)' }}>
        <div className="px-7 md:px-14 py-12 grid md:grid-cols-[1fr_auto] items-center gap-8">
          <div>
            <div className="eyebrow mb-3">{t('home.halfday.eyebrow')}</div>
            <div className="font-archivo font-black text-[28px] md:text-[36px] leading-[1.05]">{t('home.halfday.title')}</div>
            <p className="font-barlow text-[19px] leading-[1.5] text-cream/70 max-w-[560px] mt-4">{t('home.halfday.text')}</p>
          </div>
          <button onClick={() => openBooking('half')} className="btn-gold px-8 py-4 text-[15px] justify-self-start md:justify-self-end">
            {t('home.halfday.cta')} <span aria-hidden>→</span>
          </button>
        </div>
      </Reveal>

      {/* TOURS TEASER */}
      <Reveal as="section" className="px-6 md:px-16 py-16 border-t divider">
        <div className="flex justify-between items-baseline mb-9">
          <div className="font-archivo font-black text-[30px] md:text-[34px]">{t('home.tours')}</div>
          <Link to="/tours" className="link-gold text-[15px]">{t('home.tours.cta')}</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {TOURS.map((tour) => (
            <Link to="/tours" key={tour.id} className="group">
              <div className="overflow-hidden h-[220px] rounded-[2px]">
                <img src={tour.img} alt={t(`tour.${tour.id}.name`)} className="zoom-img" />
              </div>
              <div className="pt-4 font-barlow font-bold text-[22px] leading-[1.15] group-hover:text-gold transition-colors">{t(`tour.${tour.id}.name`)}</div>
              <div className="font-barlow text-[16px] text-cream/60 mt-1.5">
                {t(`tour.${tour.id}.duration`)} · {t(`tour.${tour.id}.tagline`)}
              </div>
            </Link>
          ))}
        </div>
      </Reveal>
    </main>
  );
}
