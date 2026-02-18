import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/constants';
import { ContactForm } from './ContactForm';

export const metadata: Metadata = {
  title: `お問い合わせ | ${SITE_NAME}`,
  description: `${SITE_NAME}へのお問い合わせページです。ご意見・ご要望・バグ報告などお気軽にご連絡ください。`,
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">お問い合わせ</h1>
      <p className="text-gray-600 mb-8">
        ご意見・ご要望・バグ報告など、お気軽にお問い合わせください。
        内容を確認の上、必要に応じてご返信いたします。
      </p>

      <ContactForm />
    </div>
  );
}
