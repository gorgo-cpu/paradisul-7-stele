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
  return errors;
}

export async function submitEnquiry(data: Enquiry): Promise<void> {
  const endpoint = import.meta.env.VITE_ENQUIRY_ENDPOINT as string | undefined;

  if (!endpoint) {
    await new Promise<void>((resolve) => setTimeout(resolve, 1100));
    return;
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Enquiry failed with status ${response.status}`);
  }
}

