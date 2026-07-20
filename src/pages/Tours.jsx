import { useState } from 'react';
import { useLang } from '../i18n';
import { useBooking } from '../App';
import { TOURS, WATERS, tourForWater } from '../data';
import { CURRENCY, PRICE_BANDS, MAX_ANGLERS, perPersonPrice } from '../config';
import ItalyMap from '../components/ItalyMap';

export default function Tours() {
  const { t, lang } = useLang();
  const { openBooking } = useBooking();
  const [selectedId, setSelectedId] = useState('lagoon');
  const selected = WATERS.find((w) => w.id === selectedId);

  return (
    <main>
      {/* HEADER */}
      <section className="px-6 md:px-16 pt-[76px] pb-14">
        <div className="eyebrow tracking-[0.3em] text-[13px] mb-[18px]">{t('tours.eyebrow')}</div>
        <h1 className="font-archivo font-black text-[38px] md:text-[52px] leading-[1.02] max-w-[760px]">{t('tours.h1')}</h1>
        <p className="font-barlow text-[20px] leading-[1.5] text-cream/75 max-w-[620px] mt-5">{t('tours.sub')}</p>
      </section>

      {/* TOUR CARDS — internal dividers only, no outer frame */}
      <section className="mx-6 md:mx-16 grid md:grid-cols-3">
        {TOURS.map((tour, i) => {
          const fromBase = Math.min(...tour.bands.map((b) => PRICE_BANDS[b][tour.priceKey]).filter(Boolean));
          const from = perPersonPrice(fromBase, MAX_ANGLERS);
          return (
            <div key={tour.id} className={`group p-9 flex flex-col gap-4 transition-colors hover:bg-white/[0.02] ${i < 2 ? 'md:border-r divider' : ''} ${i > 0 ? 'border-t md:border-t-0 divider' : ''}`}>
              <div className="overflow-hidden h-[180px] rounded-[2px]">
                <img src={tour.img} alt={t(`tour.${tour.id}.name`)} className="zoom-img" />
              </div>
              <div className="font-archivo font-black text-[24px] group-hover:text-gold transition-colors">{t(`tour.${tour.id}.name`)}</div>
              <p className="font-barlow text-[17px] leading-[1.5] text-cream/70">{t(`tour.${tour.id}.desc`)}</p>
              <div className="flex flex-col gap-1.5 font-barlow font-medium text-[15px] leading-[1.4] text-cream/60 mt-1.5">
                <div>{t('tours.duration')}: {t(`tour.${tour.id}.duration`)}</div>
                <div>{t('tours.group')}: {t(`tour.${tour.id}.group`)}</div>
                <div>{t('tours.species')}: {t(`tour.${tour.id}.tagline`)}</div>
              </div>
              <div className="font-barlow text-[15px] text-cream/60">
                {t('tours.from')} <span className="font-archivo font-black text-[22px] text-gold">{CURRENCY}{from}</span> {t('tours.perPerson')}
              </div>
              <button onClick={() => openBooking(tour.id)} className="btn-gold mt-auto px-6 py-[13px] text-[14px]">
                {t('tours.enquire')}
              </button>
            </div>
          );
        })}
      </section>

      {/* HOW BOOKING WORKS */}
      <section className="mx-6 md:mx-16 px-6 md:px-0 pt-11 pb-[60px]">
        <div className="eyebrow mb-10 md:pl-16">{t('tours.how')}</div>
        <div className="relative grid md:grid-cols-3 gap-10 md:gap-0">
          <div className="absolute top-[23px] left-[16.666%] right-[16.666%] h-0.5 hidden md:block" style={{ background: 'rgba(243,234,217,.22)' }} />
          {[1, 2, 3].map((n) => (
            <div key={n} className="relative z-10 flex flex-col items-center text-center gap-3.5 px-7">
              <div className="w-[46px] h-[46px] rounded-full border-2 border-gold bg-pine text-gold flex items-center justify-center font-archivo font-black text-[17px]">
                0{n}
              </div>
              <div className="font-barlow font-semibold text-[19px] leading-[1.3]">{t(`tours.how.${n}`)}</div>
              <div className="font-barlow text-[16px] leading-[1.45] text-cream/65 max-w-[260px]">{t(`tours.how.${n}t`)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WATERS INDEX + MAP */}
      <section className="px-6 md:px-16 py-16 border-t divider">
        <div className="eyebrow mb-2.5">{t('tours.where')}</div>
        <div className="font-archivo font-black text-[32px] mb-9">{t('tours.watersIndex')}</div>
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
          <div>
            <ItalyMap selectedId={selectedId} onSelect={setSelectedId} />
            <div className="font-barlow text-[13px] text-cream/40 mt-4">{t('tours.mapNote')}</div>
          </div>
          <div className="flex flex-col">
            {/* index list */}
            <div className="grid grid-cols-2 gap-x-8">
              {WATERS.map((w) => (
                <button
                  key={w.id}
                  onClick={() => setSelectedId(w.id)}
                  className={`flex items-baseline gap-3 py-2.5 border-b divider text-left ${w.id === selectedId ? '' : 'opacity-70 hover:opacity-100'}`}
                >
                  <span className="font-archivo font-black text-[14px] text-gold w-[20px] flex-none">{w.n}</span>
                  <span className={`font-barlow text-[17px] leading-[1.3] ${w.id === selectedId ? 'font-semibold text-gold' : 'font-medium'}`}>{w.name}</span>
                </button>
              ))}
            </div>

            {/* spot card */}
            {selected ? (
              <div className="mt-8 p-7 rounded-md border" style={{ background: '#182a20', borderColor: 'rgba(201,162,39,.35)' }}>
                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                  <div className="font-archivo font-black text-[26px]">{selected.name}</div>
                  <div className="font-barlow font-semibold text-[13px] uppercase tracking-[0.15em] text-gold">{selected.region[lang]}</div>
                </div>
                <div className="font-barlow text-[15px] text-cream/55 mt-1">{selected.type[lang]}</div>
                <p className="font-barlow text-[17px] leading-[1.55] text-cream/75 mt-4">{selected.blurb[lang]}</p>

                <div className="flex gap-2 flex-wrap mt-5">
                  {selected.species.map((s) => (
                    <span key={s} className="chip !text-[12px] !px-3.5 !py-2">{t(`sp.${s}`)}</span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 mt-5 font-barlow text-[15px]">
                  <div>
                    <div className="text-cream/45 uppercase text-[11px] tracking-[0.2em] font-bold mb-1">{t('tours.spot.season')}</div>
                    <div className="text-cream/80">{selected.season[lang]}</div>
                  </div>
                  <div>
                    <div className="text-cream/45 uppercase text-[11px] tracking-[0.2em] font-bold mb-1">{t('tours.spot.price')}</div>
                    <div className="text-cream/80">
                      {PRICE_BANDS[selected.band].halfDay && (
                        <div>{t('tours.spot.half')} <span className="text-gold font-semibold">{CURRENCY}{perPersonPrice(PRICE_BANDS[selected.band].halfDay, MAX_ANGLERS)}</span> {t('tours.spot.pp')}</div>
                      )}
                      <div>{t('tours.spot.full')} <span className="text-gold font-semibold">{CURRENCY}{perPersonPrice(PRICE_BANDS[selected.band].fullDay, MAX_ANGLERS)}</span> {t('tours.spot.pp')}</div>
                    </div>
                  </div>
                </div>

                {selected.minAnglers > 1 && (
                  <div className="mt-4 inline-flex items-center gap-2 font-barlow font-semibold text-[13px] uppercase tracking-[0.08em] text-gold self-start px-3.5 py-2 rounded-full" style={{ background: 'rgba(201,162,39,.12)', border: '1px solid rgba(201,162,39,.4)' }}>
                    {t('tours.spot.min', selected.minAnglers)}
                  </div>
                )}

                <button
                  onClick={() => openBooking(tourForWater(selected).id, selected.id)}
                  className="btn-gold w-full mt-6 px-6 py-[14px] text-[15px]"
                >
                  {t('tours.spot.cta')}
                </button>
              </div>
            ) : (
              <div className="mt-8 font-barlow text-cream/50">{t('tours.spot.hint')}</div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
