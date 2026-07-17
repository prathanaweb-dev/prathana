import ContactClient from './ContactClient';

export default function ContactPage({ params }: { params: { lang: string } }) {
  return <ContactClient lang={params.lang} />;
}
