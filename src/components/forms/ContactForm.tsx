'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Input, Label, Textarea, Button, Spinner } from '@/components/ui';
import { cn } from '@/lib/utils';
import {
  validateContactForm,
  toErrorMap,
  type ContactFormData,
} from '@/lib/validation';

type FormData = ContactFormData;

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  preferredDate?: string;
  message?: string;
  form?: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const inquiryTypes = [
  { value: '', label: '選択してください' },
  { value: 'location', label: 'ロケーション前撮り' },
  { value: 'opening', label: 'オープニングムービー' },
  { value: 'both', label: '前撮り＋ムービー' },
  { value: 'other', label: 'その他' },
] as const;

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  inquiryType: '',
  preferredDate: '',
  message: '',
};

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const preferredDateInputRef = useRef<HTMLInputElement | null>(null);

  // SSRとクライアントで日付がズレる可能性があるため、minはhydration後にセットする
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
      // Clear error when user starts typing
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
        // Netlify Forms用のURLエンコードデータを作成
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
            form: '送信に失敗しました。時間をおいて再度お試しください。',
          }));
          setStatus('error');
          return;
        }

        setStatus('success');
        setFormData(initialFormData);
      } catch {
        setErrors((prev) => ({
          ...prev,
          form: '通信に失敗しました。ネットワーク状況をご確認ください。',
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
          <svg
            className="h-6 w-6 text-success-dark"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="animate-in fade-in text-lg font-medium text-text delay-300 duration-500">
          送信完了
        </h3>
        <p className="animate-in fade-in mt-2 text-text-light delay-400 duration-500">
          予約のご相談ありがとうございます。
          <br />
          内容を確認の上、2〜3営業日以内にご連絡いたします。
        </p>
        <Button
          type="button"
          variant="outline"
          className="animate-in fade-in mt-6 delay-500 duration-500"
          onClick={() => setStatus('idle')}
        >
          新しいお問い合わせ
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
      // ブラウザ拡張（NordPass等）が入力欄DOMを注入しても、hydrationエラーを出しにくくする
      suppressHydrationWarning
      data-np-ignore="true"
      data-lpignore="true"
    >
      {/* Netlify Forms用の隠しフィールド */}
      <input type="hidden" name="form-name" value="contact" />
      {/* Honeypot field for spam protection */}
      <p className="hidden">
        <label>
          Don&apos;t fill this out if you&apos;re human:{' '}
          <input name="bot-field" suppressHydrationWarning />
        </label>
      </p>
      <div className="space-y-6" suppressHydrationWarning>
        {/* Name */}
        <div className="space-y-2" suppressHydrationWarning>
          <Label htmlFor="name" className="text-text">
            お名前 <span className="text-error">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="山田 太郎"
            autoComplete="name"
            data-np-ignore="true"
            data-lpignore="true"
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={cn(errors.name && 'border-error focus-visible:ring-error')}
          />
          {errors.name && (
            <p id="name-error" className="text-sm text-error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2" suppressHydrationWarning>
          <Label htmlFor="email" className="text-text">
            メールアドレス <span className="text-error">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
            autoComplete="email"
            data-np-ignore="true"
            data-lpignore="true"
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={cn(errors.email && 'border-error focus-visible:ring-error')}
          />
          {errors.email && (
            <p id="email-error" className="text-sm text-error" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2" suppressHydrationWarning>
          <Label htmlFor="phone" className="text-text">
            電話番号
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="090-1234-5678"
            autoComplete="tel"
            data-np-ignore="true"
            data-lpignore="true"
          />
        </div>

        {/* Inquiry Type */}
        <div className="space-y-2" suppressHydrationWarning>
          <Label htmlFor="inquiryType" className="text-text">
            お問い合わせ種別
          </Label>
          <select
            id="inquiryType"
            name="inquiryType"
            aria-label="お問い合わせ種別"
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

        {/* Preferred Date */}
        <div className="space-y-2" suppressHydrationWarning>
          <Label htmlFor="preferredDate" className="text-text">
            撮影希望日
          </Label>
          <Input
            id="preferredDate"
            name="preferredDate"
            type="date"
            ref={preferredDateInputRef}
            value={formData.preferredDate}
            onChange={handleChange}
            autoComplete="off"
            data-np-ignore="true"
            data-lpignore="true"
            aria-invalid={!!errors.preferredDate}
            aria-describedby={errors.preferredDate ? 'preferredDate-error' : undefined}
            className={cn(
              errors.preferredDate && 'border-error focus-visible:ring-error'
            )}
          />
          {errors.preferredDate && (
            <p id="preferredDate-error" className="text-sm text-error" role="alert">
              {errors.preferredDate}
            </p>
          )}
        </div>

        {/* Message */}
        <div className="space-y-2" suppressHydrationWarning>
          <Label htmlFor="message" className="text-text">
            お問い合わせ内容 <span className="text-error">*</span>
          </Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="ご希望のロケーション、撮影イメージなどをお聞かせください"
            rows={5}
            autoComplete="off"
            data-np-ignore="true"
            data-lpignore="true"
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={cn(errors.message && 'border-error focus-visible:ring-error')}
          />
          {errors.message && (
            <p id="message-error" className="text-sm text-error" role="alert">
              {errors.message}
            </p>
          )}
        </div>

        {/* Error Message */}
        {status === 'error' && (
          <div
            className="animate-in fade-in slide-in-from-top-2 rounded-md bg-error-light p-4 duration-300"
            role="alert"
          >
            <p className="text-sm text-error-dark">
              {errors.form ?? '送信中にエラーが発生しました。時間をおいて再度お試しください。'}
            </p>
          </div>
        )}

        {/* Submit Button */}
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
              送信中...
            </span>
          ) : (
            '送信する'
          )}
        </Button>
      </div>
    </form>
  );
}
