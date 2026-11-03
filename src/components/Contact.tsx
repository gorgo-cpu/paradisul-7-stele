import { useId, useState, type ChangeEvent, type FormEvent, type ReactElement } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import SectionHeading from './ui/SectionHeading';
import StarMark from './ui/StarMark';
import { ArrowIcon, PinIcon } from './ui/Icons';
import { CONTACT, OCCASIONS } from '../data/content';
import { submitEnquiry, validateEnquiry, type Enquiry, type EnquiryErrors } from '../lib/enquiry';

type Status = 'idle' | 'submitting' | 'sent' | 'error';

const EMPTY: Enquiry = { name: '', email: '', phone: '', occasion: '', date: '', message: '' };
const LUXE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ------------------------------------------------------------------ */
/*  Field primitives                                                   */
/* ------------------------------------------------------------------ */

interface FieldShellProps {
  id: string;
  label: string;
  error: string | undefined;
  children: ReactElement;
  floating?: boolean;
  className?: string;
}

function FieldShell({ id, label, error, children, floating = true, className = '' }: FieldShellProps): ReactElement {
  return (
    <div className={`relative ${className}`}>
      {children}
      <label
        htmlFor={id}
        className={
          floating
            ? 'field-label'
            : 'pointer-events-none absolute top-0 left-0 text-[0.6rem] tracking-[0.3em] text-champagne uppercase'
        }
      >
        {label}
      </label>
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-2 text-[0.72rem] text-[#d9a38f]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

export default function Contact(): ReactElement {
  const uid = useId();
  const [form, setForm] = useState<Enquiry>(EMPTY);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>('idle');

  const fieldId = (name: keyof Enquiry): string => `${uid}-${name}`;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const name = e.target.name as keyof Enquiry;
    setForm((prev) => ({ ...prev, [name]: e.target.value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const nextErrors = validateEnquiry(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('submitting');
    try {
      await submitEnquiry(form);
      setStatus('sent');
      setForm(EMPTY);
    } catch {
      setStatus('error');
    }
  };

  const a11y = (name: keyof Enquiry) => ({
    id: fieldId(name),
    name,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${fieldId(name)}-error` : undefined,
  });

  return (
    <section id="contact" aria-label="Location and contact" className="relative bg-forest-900 py-32 md:py-44">
      <div className="container-luxe grid gap-20 lg:grid-cols-12 lg:gap-16">
        {/* ---- Location -------------------------------------------------- */}
        <div className="lg:col-span-5">
          <SectionHeading eyebrow="IV — Location & Contact" title="Visit the estate" />

          <address className="mt-14 not-italic">
            <p className="eyebrow mb-5 text-[0.6rem] text-stone">The Address</p>
            <p className="font-display text-[clamp(1.9rem,3vw,2.6rem)] leading-[1.15] font-light text-ivory">
              {CONTACT.street}
              <br />
              <span className="text-ivory/70">
                {CONTACT.locality}, {CONTACT.county}
              </span>
            </p>
            <p className="mt-3 text-[0.72rem] tracking-[0.36em] text-champagne/70 uppercase">{CONTACT.country}</p>

            <dl className="mt-12 grid grid-cols-2 gap-8 border-t border-ivory/[0.08] pt-10 text-[0.88rem]">
              <div>
                <dt className="eyebrow mb-3 text-[0.58rem] text-stone">Viewings</dt>
                <dd className="leading-relaxed text-ivory-muted">By private appointment</dd>
              </div>
              <div>
                <dt className="eyebrow mb-3 text-[0.58rem] text-stone">Access</dt>
                <dd className="leading-relaxed text-ivory-muted">A short drive north of Bucharest</dd>
              </div>
              {CONTACT.phone && (
                <div>
                  <dt className="eyebrow mb-3 text-[0.58rem] text-stone">Telephone</dt>
                  <dd>
                    <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="text-ivory hover:text-champagne">
                      {CONTACT.phone}
                    </a>
                  </dd>
                </div>
              )}
              {CONTACT.email && (
                <div>
                  <dt className="eyebrow mb-3 text-[0.58rem] text-stone">Email</dt>
                  <dd>
                    <a href={`mailto:${CONTACT.email}`} className="text-ivory hover:text-champagne">
                      {CONTACT.email}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </address>

          {/* Map placeholder — swap for an embedded map when a provider is chosen. */}
          <div className="group relative mt-14 aspect-[16/10] overflow-hidden border border-ivory/[0.08] bg-forest-950">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(200,176,122,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(200,176,122,0.08)_1px,transparent_1px)] [background-size:44px_44px]"
            />
            <svg aria-hidden="true" viewBox="0 0 400 250" className="absolute inset-0 h-full w-full text-ivory/10" fill="none">
              <path d="M-10 190 C 80 150, 140 210, 230 160 S 360 90, 420 120" stroke="currentColor" strokeWidth="1" />
              <path d="M120 -10 C 140 60, 110 120, 170 180 S 210 240, 230 270" stroke="currentColor" strokeWidth="1" />
              <path d="M-10 70 C 60 90, 150 40, 260 70 S 380 60, 420 30" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 5" />
            </svg>
            <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
              <span className="relative flex h-14 w-14 items-center justify-center">
                <span className="absolute inset-0 animate-ping rounded-full bg-champagne/10 [animation-duration:3s]" />
                <span className="absolute inset-2 rounded-full border border-champagne/40 bg-forest-950" />
                <StarMark className="relative h-6 w-6 text-champagne" strokeWidth={3} />
              </span>
              <span className="mt-4 bg-forest-950/80 px-3 py-1 text-[0.58rem] tracking-[0.36em] text-ivory/70 uppercase backdrop-blur">
                Paradisul 7 Stele
              </span>
            </div>
            <a
              href={CONTACT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-5 bottom-5 inline-flex items-center gap-3 border border-ivory/15 bg-forest-950/70 px-4 py-2.5 text-[0.6rem] tracking-[0.3em] text-ivory/80 uppercase backdrop-blur-md transition-colors duration-500 hover:border-champagne hover:text-champagne"
            >
              <PinIcon className="h-3.5 w-3.5" />
              Open in Maps
            </a>
          </div>
        </div>

        {/* ---- Enquiry form ---------------------------------------------- */}
        <div className="lg:col-span-6 lg:col-start-7">
          <div className="relative border border-ivory/[0.08] bg-forest-950/50 p-8 sm:p-12 lg:mt-36">
            <span aria-hidden="true" className="absolute -top-px left-12 h-px w-24 bg-champagne" />
            <h3 className="font-display text-3xl font-light text-ivory">Request a private consultation</h3>
            <p className="mt-4 max-w-md text-[0.9rem] leading-[1.8] text-stone">
              Share a few details and a member of our events team will be in touch personally to arrange a viewing.
            </p>

            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: LUXE_EASE }}
                  className="mt-14 flex flex-col items-start gap-6 border-t border-ivory/[0.08] pt-12"
                  role="status"
                >
                  <StarMark className="h-9 w-9 text-champagne" strokeWidth={2} />
                  <p className="font-display text-2xl font-light text-ivory">Thank you. Your enquiry has been received.</p>
                  <p className="text-[0.9rem] leading-[1.8] text-stone">
                    We will respond personally, with discretion, at the earliest opportunity.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="text-[0.66rem] tracking-[0.3em] text-champagne uppercase underline underline-offset-8 hover:text-champagne-light"
                  >
                    Send another enquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={(e) => void handleSubmit(e)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mt-12 grid gap-x-8 gap-y-9 sm:grid-cols-2"
                >
                  <FieldShell id={fieldId('name')} label="Full name" error={errors.name}>
                    <input
                      {...a11y('name')}
                      type="text"
                      autoComplete="name"
                      placeholder=" "
                      value={form.name}
                      onChange={handleChange}
                      className="field"
                    />
                  </FieldShell>

                  <FieldShell id={fieldId('email')} label="Email" error={errors.email}>
                    <input
                      {...a11y('email')}
                      type="email"
                      autoComplete="email"
                      placeholder=" "
                      value={form.email}
                      onChange={handleChange}
                      className="field"
                    />
                  </FieldShell>

                  <FieldShell id={fieldId('phone')} label="Telephone (optional)" error={errors.phone}>
                    <input
                      {...a11y('phone')}
                      type="tel"
                      autoComplete="tel"
                      placeholder=" "
                      value={form.phone}
                      onChange={handleChange}
                      className="field"
                    />
                  </FieldShell>

                  <FieldShell id={fieldId('date')} label="Preferred date" error={errors.date} floating={false}>
                    <input
                      {...a11y('date')}
                      type="date"
                      value={form.date}
                      onChange={handleChange}
                      className="field [color-scheme:dark]"
                    />
                  </FieldShell>

                  <FieldShell
                    id={fieldId('occasion')}
                    label="Nature of the occasion"
                    error={errors.occasion}
                    floating={false}
                    className="sm:col-span-2"
                  >
                    <select
                      {...a11y('occasion')}
                      value={form.occasion}
                      onChange={handleChange}
                      className="field cursor-pointer appearance-none [&>option]:bg-forest-900"
                    >
                      <option value="" disabled>
                        Please select
                      </option>
                      {OCCASIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </FieldShell>

                  <FieldShell id={fieldId('message')} label="Your plans" error={errors.message} className="sm:col-span-2">
                    <textarea
                      {...a11y('message')}
                      rows={4}
                      placeholder=" "
                      value={form.message}
                      onChange={handleChange}
                      className="field resize-none"
                    />
                  </FieldShell>

                  <div className="flex flex-col gap-6 pt-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-xs text-[0.72rem] leading-relaxed text-stone">
                      Your details are used solely to respond to this enquiry, in accordance with GDPR.
                    </p>
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="group relative isolate inline-flex items-center justify-center gap-4 overflow-hidden bg-champagne px-9 py-5 text-[0.68rem] font-medium tracking-[0.32em] text-forest-950 uppercase transition-colors duration-700 ease-luxe hover:text-ivory disabled:cursor-wait disabled:opacity-70"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 origin-left scale-x-0 bg-forest-700 transition-transform duration-700 ease-luxe group-hover:scale-x-100"
                      />
                      {status === 'submitting' ? 'Sending…' : 'Send Enquiry'}
                      <ArrowIcon className="h-4 w-4 transition-transform duration-700 ease-luxe group-hover:translate-x-1" />
                    </button>
                  </div>

                  {status === 'error' && (
                    <p role="alert" className="text-[0.8rem] text-[#d9a38f] sm:col-span-2">
                      We were unable to send your enquiry. Please try again in a moment.
                    </p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
