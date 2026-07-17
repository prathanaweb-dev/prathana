import ContactClient from './ContactClient';

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <ContactClient lang={lang} />;
}
