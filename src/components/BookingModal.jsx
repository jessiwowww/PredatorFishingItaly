import { useEffect, useMemo, useState } from 'react';
import { useLang } from '../i18n';
import { TOURS, WATERS, watersForTour } from '../data';
import {
  CURRENCY, PRICE_BANDS, MAX_ANGLERS, DEPOSIT_PERCENT,
  FULL_REFUND_DAYS, DEPOSIT_RETAINED_DAYS, perPersonPrice,
} from '../config';

const iso = (y, m, d) => `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

export default function BookingModal({ tourId, waterId, onClose }) {
  const { t, lang } = useLang();
  const today = useMemo(() => new Date(), []);
  const tour = TOURS.find((x) => x.id === tourId);
  const waters = watersForTour(tour);

  const [water, setWater] = useState(
    waters.find((w) => w.id === waterId) || waters.find((w) => w.id === tour.defaultWater) || waters[0]
  );
  const [calY, setCalY] = useState(today.getFullYear());
  const [calM, setCalM] = useState(today.getMonth());
  const [selDate, setSelDate] = useState(null);
  const [party, setParty] = useState(2);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [busy, setBusy] = useState({}); // { 'YYYY-MM': ['YYYY-MM-DD', ...] }
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  // close on Escape
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // fetch busy days for the visible month (Google Calendar via /api/availability)
  const monthKey = `${calY}-${String(calM + 1).padStart(2, '0')}`;
  useEffect(() => {
    if (busy[monthKey]) return;
    fetch(`/api/availability?month=${monthKey}`)
      .then((r) => (r.ok ? r.json() : { busy: [] }))
      .then((d) => setBusy((b) => ({ ...b, [monthKey]: d.busy || [] })))
      .catch(() => setBusy((b) => ({ ...b, [monthKey]: [] })));
  }, [monthKey, busy]);
  const busyDays = busy[monthKey] || [];

  const base = PRICE_BANDS[water.band][tour.priceKey];
  const perPerson = perPersonPrice(base, party);
  const total = perPerson * party;
  const deposit = Math.round((total * DEPOSIT_PERCENT) / 100);

  const prevMonth = () => { if (calM === 0) { setCalM(11); setCalY(calY - 1); } else setCalM(calM - 1); };
  const nextMonth = () => { if (calM === 11) { setCalM(0); setCalY(calY + 1); } else setCalM(calM + 1); };

  const calLabel = new Date(calY, calM, 1).toLocaleString(lang === 'it' ? 'it-IT' : 'en-US', { month: 'long', year: 'numeric' });
  const startOffset = (new Date(calY, calM, 1).getDay() + 6) % 7;
  const nDays = new Date(calY, calM + 1, 0).getDate();
  const todayMid = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const selPretty = selDate
    ? new Date(selDate + 'T00:00:00').toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  const canSubmit = selDate && name.trim() && /.+@.+\..+/.test(email) && status !== 'sending';

  async function submit() {
    if (!canSubmit) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourId: tour.id,
          tourName: t(`tour.${tour.id}.name`),
          waterId: water.id,
          waterName: water.name,
          date: selDate,
          party,
          name: name.trim(),
          email: email.trim(),
          notes: notes.trim(),
          perPerson,
          total,
          deposit,
          currency: CURRENCY,
          lang,
        }),
      });
      if (!res.ok) throw new Error('request failed');
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  const dayLetters = lang === 'it' ? ['L', 'M', 'M', 'G', 'V', 'S', 'D'] : ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-5 py-10 overflow-auto" style={{ background: 'rgba(6,12,9,.72)' }} onClick={onClose}>
      <div
        className="relative w-full max-w-[920px] rounded-md overflow-hidden border"
        style={{ background: '#182a20', borderColor: 'rgba(243,234,217,.14)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-[18px] z-10 w-[34px] h-[34px] rounded-full text-cream flex items-center justify-center text-[22px]"
          style={{ background: 'rgba(243,234,217,.12)' }}
          aria-label="Close"
        >
          ×
        </button>

        {status === 'sent' ? (
          <div className="px-8 md:px-14 py-16 text-center flex flex-col items-center gap-[18px]">
            <div className="w-14 h-14 rounded-full border-2 border-gold text-gold flex items-center justify-center text-[26px]">✓</div>
            <div className="font-archivo font-black text-[30px]">{t('bk.sent.title')}</div>
            <p className="font-barlow text-[18px] leading-[1.55] text-cream/75 max-w-[520px]">
              {t('bk.sent.body', `${t(`tour.${tour.id}.name`)} — ${water.name}`, selPretty, `${party} ${t('bk.anglersWord', party)}`)}
            </p>
            <div className="p-[18px] rounded-md font-barlow text-[16px] leading-[1.5] max-w-[520px] border" style={{ background: 'rgba(201,162,39,.1)', borderColor: 'rgba(201,162,39,.35)' }}>
              {t('bk.sent.warning')}
            </div>
            <button onClick={onClose} className="btn-gold mt-2.5 px-8 py-[13px] text-[15px]">{t('bk.done')}</button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2">
            {/* LEFT — tour info */}
            <div className="flex flex-col">
              <img src={tour.img} alt={t(`tour.${tour.id}.name`)} className="w-full h-[180px] object-cover" />
              <div className="px-7 py-6 flex flex-col gap-[13px]">
                <div className="font-archivo font-black text-[23px]">{t(`tour.${tour.id}.name`)}</div>
                <p className="font-barlow text-[16px] leading-[1.5] text-cream/70">{t(`tour.${tour.id}.desc`)}</p>
                <div className="flex items-baseline gap-2">
                  <div className="font-archivo font-black text-[30px] text-gold">{CURRENCY}{perPerson}</div>
                  <div className="font-barlow font-medium text-[15px] text-cream/60">{t('bk.perPerson')} · {t(`tour.${tour.id}.duration`)}</div>
                </div>
                <div className="h-px" style={{ background: 'rgba(243,234,217,.12)' }} />
                <div className="eyebrow !text-[11px] !tracking-[0.2em]">{t('bk.includedTitle')}</div>
                <div className="flex flex-col gap-2 font-barlow text-[14px] leading-[1.4] text-cream/[.82]">
                  {['licence', 'boat', 'rental'].map((k) => (
                    <div key={k} className="flex items-baseline gap-2.5">
                      <span className="text-gold flex-none">✓</span>
                      <span>{t(`bk.inc.${k}`)}</span>
                    </div>
                  ))}
                </div>
                <div className="h-px" style={{ background: 'rgba(243,234,217,.12)' }} />
                <div className="eyebrow !text-[11px] !tracking-[0.2em]">{t('bk.payTitle')}</div>
                <div className="flex flex-col gap-2 font-barlow text-[14px] leading-[1.4] text-cream/[.72]">
                  <div>· {t('bk.pay1')}</div>
                  <div>· {t('bk.pay2', DEPOSIT_PERCENT)}</div>
                  <div>· {t('bk.pay3', FULL_REFUND_DAYS)}</div>
                  <div>· {t('bk.pay4', DEPOSIT_RETAINED_DAYS)}</div>
                </div>
              </div>
            </div>

            {/* RIGHT — request form */}
            <div className="px-7 py-6 md:border-l divider flex flex-col gap-4">
              <div className="font-archivo font-black text-[20px]">{t('bk.title')}</div>

              {/* where */}
              {waters.length > 1 && (
                <div>
                  <label className="font-barlow font-medium text-[15px] text-cream/75 block mb-1.5">{t('bk.where')}</label>
                  <select
                    value={water.id}
                    onChange={(e) => setWater(waters.find((w) => w.id === e.target.value))}
                    className="input-dark appearance-none"
                    style={{ background: '#182a20' }}
                  >
                    {waters.map((w) => (
                      <option key={w.id} value={w.id}>{w.name} — {w.region[lang]}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* calendar */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <button onClick={prevMonth} className="w-[30px] h-[30px] rounded-md border divider text-cream text-[17px]">‹</button>
                  <div className="font-barlow font-semibold text-[16px] capitalize">{calLabel}</div>
                  <button onClick={nextMonth} className="w-[30px] h-[30px] rounded-md border divider text-cream text-[17px]">›</button>
                </div>
                <div className="grid grid-cols-7 gap-1 mb-1 text-center font-barlow font-semibold text-[11px] text-cream/40">
                  {dayLetters.map((d, i) => <div key={i}>{d}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: startOffset }).map((_, i) => <div key={'b' + i} className="h-9" />)}
                  {Array.from({ length: nDays }).map((_, i) => {
                    const d = i + 1;
                    const dIso = iso(calY, calM, d);
                    const past = new Date(calY, calM, d) < todayMid;
                    const taken = busyDays.includes(dIso);
                    const sel = dIso === selDate;
                    const cls = past
                      ? 'text-cream/20'
                      : taken
                        ? 'text-cream/25 line-through cursor-not-allowed'
                        : sel
                          ? 'bg-gold text-pine font-bold'
                          : 'text-cream border divider hover:border-gold/50 cursor-pointer';
                    return (
                      <button
                        key={dIso}
                        disabled={past || taken}
                        onClick={() => setSelDate(dIso)}
                        title={taken ? t('bk.dateTaken') : undefined}
                        className={`h-9 flex items-center justify-center font-barlow font-medium text-[15px] rounded-md ${cls}`}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* anglers */}
              <div className="flex items-center justify-between">
                <div className="font-barlow font-medium text-[15px] text-cream/75">{t('bk.anglers')}</div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setParty(Math.max(1, party - 1))} className="w-[30px] h-[30px] rounded-md border divider text-cream text-[18px]">–</button>
                  <div className="font-barlow font-semibold text-[17px] min-w-[20px] text-center">{party}</div>
                  <button onClick={() => setParty(Math.min(MAX_ANGLERS, party + 1))} className="w-[30px] h-[30px] rounded-md border divider text-cream text-[18px]">+</button>
                </div>
              </div>
              <div className="font-barlow text-[13px] leading-[1.4] -mt-2" style={{ color: 'rgba(201,162,39,.9)' }}>{t('bk.groupHint')}</div>

              {/* contact */}
              <div className="grid grid-cols-2 gap-2.5">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t('bk.name')} className="input-dark" />
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('bk.email')} type="email" className="input-dark" />
              </div>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={t('bk.notes')} rows={2} className="input-dark resize-none" />

              {/* summary */}
              <div className="rounded-md px-4 py-3.5 flex flex-col gap-1.5 font-barlow font-medium text-[14px] text-cream/70" style={{ background: 'rgba(243,234,217,.05)' }}>
                <div className="flex justify-between"><span>{CURRENCY}{perPerson} × {party} {t('bk.anglersWord', party)}</span><span className="text-cream">{CURRENCY}{total}</span></div>
                <div className="flex justify-between"><span>{t('bk.deposit')} ({DEPOSIT_PERCENT}%)</span><span className="text-cream">{CURRENCY}{deposit}</span></div>
              </div>

              {status === 'error' && (
                <div className="font-barlow text-[14px] text-red-300">{t('bk.error')}</div>
              )}

              <button onClick={submit} disabled={!canSubmit} className="btn-gold px-4 py-[15px] text-[15px]" style={{ opacity: canSubmit ? 1 : 0.4 }}>
                {status === 'sending' ? t('bk.submitting') : t('bk.submit')}
              </button>
              <div className="font-barlow text-[12.5px] leading-[1.4] text-cream/45 text-center">{t('bk.disclaimer')}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
