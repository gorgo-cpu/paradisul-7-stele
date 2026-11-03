/**
 * Enquiry submission.
 *
 * Set VITE_ENQUIRY_ENDPOINT (e.g. a Formspree / serverless URL) in `.env` to
 * deliver enquiries. Without it, submission is simulated so the interface can
 * be reviewed end-to-end in development.
 */
export interface Enquiry {
  name: string;
  email: string;
  phone: string;
  occasion: string;
  date: string;
  message: string;
  privacyConsent: boolean;
}

export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEnquiry(data: Enquiry): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (data.name.trim().length < 2) errors.name = 'Please share your full name.';
  if (!EMAIL_PATTERN.test(data.email.trim())) errors.email = 'Please provide a valid email address.';
  if (data.phone.trim() && !/^[+\d][\d\s().-]{6,}$/.test(data.phone.trim())) {
    errors.phone = 'Please provide a valid telephone number.';
  }
  if (!data.occasion) errors.occasion = 'Please select the nature of your occasion.';
  if (data.message.trim().length < 10) errors.message = 'Please tell us a little more about your plans.';
  if (!data.privacyConsent) {
    errors.privacyConsent = 'You must agree to the Privacy Policy to submit your request.';
  }
  return errors;
}

export async function submitEnquiry(data: Enquiry): Promise<void> {
  const recipient = (import.meta.env.VITE_CONTACT_EMAIL as string | undefined) || 'contact@paradisul7stele.ro';

  const subject = encodeURIComponent(`Private Viewing Enquiry: ${data.occasion} - ${data.name}`);
  const bodyText = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    `Occasion: ${data.occasion}`,
    data.date ? `Preferred Date: ${data.date}` : null,
    '',
    'Message / Event Plans:',
    data.message,
    '',
    '---',
    'Submitted via Paradisul 7 Stele Private Estate Portal',
  ]
    .filter((line) => line !== null)
    .join('\n');

  const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${encodeURIComponent(bodyText)}`;

  // Open device's default email client
  window.location.href = mailtoUrl;

  // Give short delay so UI state smoothly acknowledges action
  await new Promise<void>((resolve) => setTimeout(resolve, 800));
}

