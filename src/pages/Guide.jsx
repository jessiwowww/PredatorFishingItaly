import { useLang } from '../i18n';
import { useBooking } from '../App';

export default function Guide() {
  const { t } = useLang();
  const { openBooking } = useBooking();

  return (
    <main>
      {/* HERO */}
      <section className="relative h-[420px] md:h-[520px]">
        <img src="/images/roberto.jpg" alt="Roberto Bertoncello" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg,#13221b 15%,rgba(15,26,20,.05) 55%,rgba(15,26,20,.45))' }} />
        <div className="absolute left-6 right-6 md:left-16 md:right-16 bottom-14">
          <div className="eyebrow tracking-[0.3em] text-[13px] mb-4">{t('guide.eyebrow')}</div>
          <h1 className="font-archivo font-black text-[44px] md:text-[60px] leading-none">Roberto Bertoncello</h1>
        </div>
      </section>

      {/* BIO */}
      <section className="px-6 md:px-16 py-16 max-w-[820px]">
        <p className="font-barlow text-[21px] leading-[1.6] text-cream/[.78]">{t('guide.bio1')}</p>
        <p className="font-barlow text-[21px] leading-[1.6] text-cream/[.78] mt-5">{t('guide.bio2')}</p>
      </section>

      {/* CREDENTIALS */}
      <section className="px-6 md:px-16 pb-7 pt-2 flex gap-3 flex-wrap">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="chip">{t(`guide.chip.${i}`)}</div>
        ))}
      </section>

      {/* GALLERY */}
      <section className="px-6 md:px-16 py-16">
        <div className="eyebrow mb-5">{t('guide.gallery')}</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="group overflow-hidden h-[220px] rounded-[2px]">
              <img src={`/images/gallery-${i}.jpg`} alt="On the water" className="zoom-img" />
            </div>
          ))}
        </div>
      </section>

      {/* BEYOND FISHING */}
      <section className="px-6 md:px-16 py-14 border-t divider">
        <div className="eyebrow mb-2">{t('guide.beyond')}</div>
        <p className="font-barlow text-[19px] leading-[1.5] text-cream/70 max-w-[560px]">{t('guide.beyond.text')}</p>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-16 py-14 border-t divider flex flex-col md:flex-row justify-between md:items-center gap-6">
        <div>
          <div className="eyebrow mb-2">{t('guide.cta.eyebrow')}</div>
          <div className="font-archivo font-black text-[28px] md:text-[32px]">{t('guide.cta.title')}</div>
        </div>
        <button onClick={() => openBooking('full')} className="btn-gold px-8 py-4 text-[15px] self-start md:self-auto">
          {t('guide.cta.button')}
        </button>
      </section>
    </main>
  );
}
