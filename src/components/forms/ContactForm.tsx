'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Input, Label, Textarea, Button, Spinner } from '@/components/ui';
import { CheckIcon } from '@/components/icons';
import { cn } from '@/lib/utils';
import { text } from '@/config';
import {
  validateContactForm,
  toErrorMap,
  type ContactFormData,
} from '@/lib/validation';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  preferredDate?: string;
  message?: string;
  form?: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const inquiryTypes = text.form.inquiryTypes;

const passwordManagerIgnoreProps = {
  'data-np-ignore': 'true',
  'data-lpignore': 'true',
  suppressHydrationWarning: true,
} as const;

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  inquiryType: '',
  preferredDate: '',
  message: '',
};

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const preferredDateInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!preferredDateInputRef.current) return;
    preferredDateInputRef.current.min = new Date().toISOString().split('T')[0];
  }, []);

  const validateForm = useCallback((): boolean => {
    const result = validateContactForm(formData);
    const newErrors = toErrorMap(result) as FormErrors;
    setErrors(newErrors);
    return result.isValid;
  }, [formData]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
      if (errors.form) {
        setErrors((prev) => ({ ...prev, form: undefined }));
      }
    },
    [errors]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) return;

      setStatus('submitting');

      try {
        const formBody = new URLSearchParams({
          'form-name': 'contact',
          ...formData,
        }).toString();

        const res = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formBody,
        });

        if (!res.ok) {
          setErrors((prev) => ({
            ...prev,
            form: text.form.errors.submitFailed,
          }));
          setStatus('error');
          return;
        }

        setStatus('success');
        setFormData(initialFormData);
      } catch {
        setErrors((prev) => ({
          ...prev,
          form: text.form.errors.networkFailed,
        }));
        setStatus('error');
      }
    },
    [formData, validateForm]
  );

  if (status === 'success') {
    return (
      <div
        className="animate-in fade-in slide-in-from-bottom-4 rounded-lg bg-white p-8 text-center duration-500"
        role="alert"
        aria-live="polite"
      >
        <div className="animate-in zoom-in mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-success delay-200 duration-300">
          <CheckIcon className="h-6 w-6 text-success-dark" />
        </div>
        <h3 className="animate-in fade-in text-lg font-medium text-text delay-300 duration-500">
          {text.form.success.title}
        </h3>
        <p className="animate-in fade-in mt-2 text-text-light delay-400 duration-500">
          <span className="whitespace-pre-line">{text.form.success.message}</span>
        </p>
        <Button
          type="button"
          variant="outline"
          className="animate-in fade-in mt-6 delay-500 duration-500"
          onClick={() => setStatus('idle')}
        >
          {text.form.success.newInquiry}
        </Button>
      </div>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      onSubmit={handleSubmit}
      className="rounded-lg bg-white p-6 md:p-8"
      noValidate
      suppressHydrationWarning
      data-np-ignore="true"
      data-lpignore="true"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          {text.form.honeypot.label}{' '}
          <input name="bot-field" {...passwordManagerIgnoreProps} />
        </label>
      </p>
      <div className="space-y-6" suppressHydrationWarning>
        <div className="space-y-2" suppressHydrationWarning>
          <Label htmlFor="name" className="text-text">
            <span>{text.form.fields.name.label}</span>
            <span className="ml-1 text-error">{text.form.fields.name.requiredMark}</span>
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder={text.form.fields.name.placeholder}
            autoComplete="name"
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={cn(errors.name && 'border-error focus-visible:ring-error')}
            {...passwordManagerIgnoreProps}
          />
          {errors.name && (
            <p id="name-error" className="text-sm text-error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-2" suppressHydrationWarning>
          <Label htmlFor="email" className="text-text">
            <span>{text.form.fields.email.label}</span>
            <span className="ml-1 text-error">{text.form.fields.email.requiredMark}</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={text.form.fields.email.placeholder}
            autoComplete="email"
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={cn(errors.email && 'border-error focus-visible:ring-error')}
            {...passwordManagerIgnoreProps}
          />
          {errors.email && (
            <p id="email-error" className="text-sm text-error" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div className="space-y-2" suppressHydrationWarning>
          <Label htmlFor="phone" className="text-text">
            {text.form.fields.phone.label}
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder={text.form.fields.phone.placeholder}
            autoComplete="tel"
            {...passwordManagerIgnoreProps}
          />
        </div>

        <div className="space-y-2" suppressHydrationWarning>
          <Label htmlFor="inquiryType" className="text-text">
            {text.form.fields.inquiryType.label}
          </Label>
          <select
            id="inquiryType"
            name="inquiryType"
            aria-label={text.form.fields.inquiryType.ariaLabel}
            value={formData.inquiryType}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            suppressHydrationWarning
          >
            {inquiryTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2" suppressHydrationWarning>
          <Label htmlFor="preferredDate" className="text-text">
            {text.form.fields.preferredDate.label}
          </Label>
          <Input
            id="preferredDate"
            name="preferredDate"
            type="date"
            ref={preferredDateInputRef}
            value={formData.preferredDate}
            onChange={handleChange}
            autoComplete="off"
            aria-invalid={!!errors.preferredDate}
            aria-describedby={errors.preferredDate ? 'preferredDate-error' : undefined}
            className={cn(
              errors.preferredDate && 'border-error focus-visible:ring-error'
            )}
            {...passwordManagerIgnoreProps}
          />
          {errors.preferredDate && (
            <p id="preferredDate-error" className="text-sm text-error" role="alert">
              {errors.preferredDate}
            </p>
          )}
        </div>

        <div className="space-y-2" suppressHydrationWarning>
          <Label htmlFor="message" className="text-text">
            <span>{text.form.fields.message.label}</span>
            <span className="ml-1 text-error">{text.form.fields.message.requiredMark}</span>
          </Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={text.form.fields.message.placeholder}
            rows={5}
            autoComplete="off"
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={cn(errors.message && 'border-error focus-visible:ring-error')}
            {...passwordManagerIgnoreProps}
          />
          {errors.message && (
            <p id="message-error" className="text-sm text-error" role="alert">
              {errors.message}
            </p>
          )}
        </div>

        {status === 'error' && (
          <div
            className="animate-in fade-in slide-in-from-top-2 rounded-md bg-error-light p-4 duration-300"
            role="alert"
          >
            <p className="text-sm text-error-dark">
              {errors.form ?? text.form.errors.generic}
            </p>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={status === 'submitting'}
          aria-busy={status === 'submitting'}
        >
          {status === 'submitting' ? (
            <span className="flex items-center justify-center gap-2">
              <Spinner className="text-cream" />
              {text.form.buttons.submitting}
            </span>
          ) : (
            text.form.buttons.submit
          )}
        </Button>
      </div>
    </form>
  );
}
