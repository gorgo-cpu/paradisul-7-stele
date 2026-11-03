import { useEffect, type ReactElement } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { useLenis } from 'lenis/react';
import { BRAND, CONTACT } from '../../data/content';
import { CloseIcon } from './Icons';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LUXE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps): ReactElement | null {
  const lenis = useLenis();

  useEffect(() => {
    if (!isOpen) return;

    lenis?.stop();
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      lenis?.start();
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, lenis, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="privacy-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: LUXE_EASE }}
          onClick={onClose}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-forest-950/80 p-4 backdrop-blur-2xl sm:p-6 md:p-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.45, ease: LUXE_EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[85vh] w-full max-w-2xl flex-col border border-champagne/30 bg-forest-900 p-8 shadow-2xl sm:p-10"
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-ivory/10 pb-6">
              <div>
                <p className="eyebrow mb-2 text-[0.6rem]">Legal &amp; Transparency</p>
                <h3 id="privacy-modal-title" className="font-display text-2xl font-light text-ivory sm:text-3xl">
                  Privacy Policy &amp; Data Protection
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close Privacy Policy"
                className="group flex h-10 w-10 items-center justify-center border border-ivory/15 bg-forest-950/60 text-ivory transition-colors duration-500 hover:border-champagne hover:bg-champagne hover:text-forest-950"
              >
                <CloseIcon className="h-4 w-4 transition-transform duration-500 ease-luxe group-hover:rotate-90" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="mt-6 flex-1 overflow-y-auto pr-2 text-[0.88rem] leading-[1.8] text-ivory-muted/90 space-y-5">
              <p>
                At <strong>{BRAND.legalName}</strong> (located at {CONTACT.street}, {CONTACT.locality}, {CONTACT.county}, Romania), we take the preservation of your personal privacy and confidential events with utmost discretion and in strict compliance with EU Regulation 2016/679 (General Data Protection Regulation - GDPR).
              </p>

              <div>
                <h4 className="font-display text-lg font-normal text-champagne mb-1">1. Information We Collect</h4>
                <p>
                  When you submit a private enquiry through our estate portal, we collect the details you voluntarily provide: your full name, email address, contact telephone number, preferred reservation date, occasion category, and personal event specifications.
                </p>
              </div>

              <div>
                <h4 className="font-display text-lg font-normal text-champagne mb-1">2. Purpose of Processing</h4>
                <p>
                  The data collected is processed solely to respond to your private viewing requests, arrange consultations, prepare custom hospitality and recreation proposals, and communicate regarding estate reservations. We do not sell, rent, or distribute your personal details to third parties for commercial or marketing purposes.
                </p>
              </div>

              <div>
                <h4 className="font-display text-lg font-normal text-champagne mb-1">3. Data Retention</h4>
                <p>
                  Your information is retained strictly for the duration necessary to satisfy the booking enquiry or as required by applicable Romanian legal and administrative fiscal regulations.
                </p>
              </div>

              <div>
                <h4 className="font-display text-lg font-normal text-champagne mb-1">4. Your Rights</h4>
                <p>
                  Under GDPR, you hold full rights to access, rectify, request erasure (&quot;right to be forgotten&quot;), or restrict processing of your personal data at any moment. For any inquiries regarding personal information, you may contact our estate management directly at our registered address in Moara Vlăsiei.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end border-t border-ivory/10 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="border border-champagne/60 bg-champagne/10 px-6 py-2.5 text-[0.68rem] tracking-[0.25em] text-champagne-light uppercase transition-colors duration-500 hover:bg-champagne hover:text-forest-950"
              >
                Understood &amp; Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

