'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { translations as globalTranslations } from '@/lib/translations';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useSpring, useInView, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
  Heart, ShieldCheck, Leaf, BookOpen, Users, Globe,
  HeartHandshake, MapPin, Sparkles, ChevronLeft, ChevronRight, ArrowRight, Quote
} from 'lucide-react';

/* ─── CountUp ─────────────────────────────────────────────────────────────── */
function CountUp({ to, duration = 2 }: { to: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const ticks = 50;
    const tick = (duration * 1000) / ticks;
    const step = Math.ceil(to / ticks);
    const t = setInterval(() => {
      start += step;
      if (start >= to) { clearInterval(t); setCount(to); }
      else setCount(start);
    }, tick);
    return () => clearInterval(t);
  }, [inView, to, duration]);
  return <span ref={ref}>{count.toLocaleString()}</span>;
}

/* ─── BeforeAfterSlider ───────────────────────────────────────────────────── */
function BeforeAfterSlider({ beforeImg, afterImg, beforeLabel, afterLabel }: {
  beforeImg: string; afterImg: string; beforeLabel: string; afterLabel: string;
}) {
  const [pos, setPos] = useState(42);
  const [drag, setDrag] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const move = (cx: number) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos(Math.max(2, Math.min(98, ((cx - r.left) / r.width) * 100)));
  };
  useEffect(() => {
    const up = () => setDrag(false);
    window.addEventListener('mouseup', up);
    window.addEventListener('touchend', up);
    return () => { window.removeEventListener('mouseup', up); window.removeEventListener('touchend', up); };
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl select-none cursor-ew-resize"
      onMouseMove={e => drag && move(e.clientX)}
      onTouchMove={e => drag && move(e.touches[0].clientX)}
      onMouseDown={() => setDrag(true)}
      onTouchStart={() => setDrag(true)}
    >
      {/* BEFORE */}
      <img src={beforeImg} alt="Before" className="absolute inset-0 w-full h-full object-cover" />
      <span className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-sm text-white text-[11px] font-semibold px-3 py-1 rounded-full tracking-wide border border-white/10">
        {beforeLabel}
      </span>

      {/* AFTER — clipped */}
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={afterImg} alt="After" className="absolute inset-0 w-full h-full object-cover" style={{ width: ref.current?.getBoundingClientRect().width }} />
        <span className="absolute top-4 right-4 z-20 bg-brand-green/90 backdrop-blur-sm text-white text-[11px] font-semibold px-3 py-1 rounded-full tracking-wide border border-white/10">
          {afterLabel}
        </span>
      </div>

      {/* HANDLE */}
      <div className="absolute inset-y-0 z-30 flex items-center justify-center pointer-events-none" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 w-[2px] bg-white/80" />
        <div className="relative w-11 h-11 rounded-full bg-white shadow-2xl flex items-center justify-center border-2 border-brand-saffron/60">
          <ChevronLeft size={13} className="text-brand-charcoal -mr-0.5" />
          <ChevronRight size={13} className="text-brand-charcoal -ml-0.5" />
        </div>
      </div>
    </div>
  );
}

/* ─── Translations ────────────────────────────────────────────────────────── */
const content = {
  en: {
    hero: {
      eyebrow: 'Our Cinematic Narrative',
      tag: "One Family's Tragedy.\nHundreds of Lives Transformed.",
      sub: "In 2006, a farmer's suicide changed one boy's life forever. That boy grew up to build a home for children who had nowhere to go.",
      flow: [
        { year: '2006', label: 'Father Lost' },
        { year: 'Promise', label: 'A Vow Made' },
        { year: '2018', label: 'Foundation Born' },
        { year: 'Today', label: '70+ Lives Sheltered' },
      ],
    },
    chapters: {
      eyebrow: 'The Chronicle',
      title: 'Our Story, Chapter by Chapter',
      c1: { num: 'Chapter 01', year: '2006', title: 'When Everything Changed.', text: 'Prasad Mohite lost his father to farmer suicide caused by overwhelming agricultural debt — a tragedy that thousands of rural Maharashtra families continue to face. The weight of that day never left him.' },
      c2: { num: 'Chapter 02', title: 'A Promise', quote: 'No child should ever experience what I did.', text: 'That grief became a compass. Prasad dedicated his life to ensuring other children would never know the destitution and helplessness he had felt at such a young age.' },
      c3: { num: 'Chapter 03', title: 'The Journey', nodes: [
        { label: '2006', desc: 'Tragedy — Loss of Father' },
        { label: 'MSW Studies', desc: 'Master of Social Work' },
        { label: 'Met Anu', desc: 'Soulmate & Co-Founder' },
        { label: 'Street Outreach', desc: 'Working with Street Children' },
        { label: 'Married', desc: 'A Shared, Sacred Mission' },
        { label: '2018', desc: 'Prathana Foundation Born' },
      ]},
    },
    prathana: {
      eyebrow: 'The Name Behind the Foundation',
      quote: '"We had already chosen her name."',
      name: 'Prathana',
      desc1: 'Their daughter passed away shortly after birth. They donated her body to medical science.',
      desc2: 'Instead of letting grief consume them…',
      desc3: 'They named their foundation after her — so that her memory would live in every child who found shelter here.',
      end: 'Every child who smiles here carries her legacy.',
    },
    stats: [
      { num: 45, suffix: '', label: 'Children Living Safely' },
      { num: 25, suffix: '', label: 'Senior Citizens Cared For' },
      { num: 60, suffix: '+', label: 'Dignified Last Rites Performed' },
      { num: 110, suffix: '+', label: 'Children Mainstreamed into Schools' },
      { num: 4500, suffix: '+', label: 'Students Supported with Kits' },
      { num: 300, suffix: '+', label: 'Youth Empowered' },
      { num: 45000, suffix: '+', label: 'Relief Meals Served' },
      { num: 10000, suffix: '+', label: 'Families Provided Grocery Kits' },
      { num: 11, suffix: '', label: 'Flood-Damaged Homes Rebuilt' },
      { num: 16, suffix: '+', label: 'Vegetables Grown Organically' },
      { num: 2018, suffix: '', label: 'Serving Since' },
    ],
    timeline: {
      eyebrow: 'Chronological Map',
      title: 'Interactive Journey',
      sub: 'From a street school under the open sky to a thriving permanent sanctuary — click any milestone to explore.',
      nodes: [
        { year: '2006', title: 'Seeds of Purpose', desc: "Following his father's death, a promise was made to build a platform of hope for rural families in crisis.", img: '/awards/Awards/DSC_0350.JPG' },
        { year: '2018', title: 'Foundation Inception', desc: 'Prathana Foundation was officially registered, serving hot meals to street children under bridge platforms.', img: '/vanchitanchishala/Vanchitanchi Shala/20181109_092926.jpg' },
        { year: 'Street School', title: 'Vanchitanchi Shala', desc: 'Regular informal classes started for street children, helping them gain legal identities and enter mainstream schooling.', img: '/vanchitanchishala/Vanchitanchi Shala/20161022_094216.jpg' },
        { year: 'Balgram', title: 'Prathana Balgram', desc: 'A permanent home established in Morvanchi for orphaned children and those from farmer suicide families.', img: '/balgram/Balgram/481252295_4027096254187163_273174834482280391_n.jpg' },
        { year: 'Old Age Home', title: 'Prathana Old Age Home', desc: 'A shelter built for abandoned and destitute seniors — creating an intergenerational home on campus.', img: '/Vrudhashram/Vrudhashram/476569459_4004469246449864_4548442253041631_n.jpg' },
        { year: 'Natural Farming', title: 'Morvanchi Green Campus', desc: 'Chemical-free agriculture pioneered on campus to grow organic food for children and seniors.', img: '/naturalfarming/Natural Farming/IMG-20260329-WA0129.jpg' },
        { year: 'Youth Dev', title: 'Empowering Next Gen', desc: 'Skill development and digital literacy programs initiated for rural youth in Mohol taluka.', img: '/awards/Awards/DSC_0595.JPG' },
        { year: 'Disaster Relief', title: 'Standing Tall in Crises', desc: 'Thousands of ration kits and medical packets distributed during droughts, floods, and lockdowns.', img: '/awards/Awards/20200420_084411.jpg' },
        { year: 'Today', title: 'A Growing Family', desc: '45 children and 25 senior citizens under one roof — 100% transparent public accounting.', img: '/balgram/Balgram/WhatsApp Image 2026-06-22 at 1.09.36 PM.jpeg' },
      ],
    },
    founders: {
      eyebrow: 'Leadership Spotlight',
      title: "Founders' Message",
      prasad: { name: 'Prasad Mohite', role: 'Founder & President', quote: 'Pain can either break you or become someone else\'s hope.' },
      anu: { name: 'Anu Mohite', role: 'Co-Founder & Secretary', quote: 'Compassion becomes powerful when two people choose the same purpose.' },
    },
    sacrifice: {
      eyebrow: 'Their Sacrifice',
      title: 'They sold their own farmland.',
      text: "To give orphaned children and abandoned seniors a permanent home, Prasad Mohite sold his family's ancestral agricultural land and purchased land in Morvanchi village, Mohol. That earth now shelters dozens of lives.",
      before: 'Before — Temporary Street Classes',
      after: 'Today — Permanent Green Sanctuary',
    },
    gallery: {
      eyebrow: 'Photo Gallery',
      title: 'Where Hope Lives',
      sub: 'A visual record of smiles, resilience, and growth at Prathana Balgram and the Old Age Home.',
      filters: { all: 'All Glimpses', studying: 'Children', farming: 'Farming', seniors: 'Seniors', celebrations: 'Celebrations', volunteers: 'Volunteers' },
    },
    values: {
      eyebrow: 'Principles',
      title: 'Our Core Values',
      list: [
        { title: 'Compassion', desc: 'Every action led with deep empathy and heart-centered service.' },
        { title: 'Integrity', desc: 'Absolute transparency in donations, operations, and community trust.' },
        { title: 'Sustainability', desc: 'Self-reliance through natural farming and life-skills education.' },
        { title: 'Learning', desc: 'Character-building and interactive learning for youth and children.' },
        { title: 'Inclusion', desc: 'An open family that leaves no child or senior citizen behind.' },
        { title: 'Dignity', desc: "Honoring every individual's right to live with self-worth." },
      ],
    },
    vm: {
      vision: { title: 'Our Vision', desc: 'A compassionate, inclusive society where every vulnerable child, elderly person, and marginalized individual lives with dignity, opportunity, and self-reliance.' },
      mission: { title: 'Our Mission', desc: 'Empowering vulnerable children, elderly persons, and underserved communities through care, education, sustainable livelihoods, youth development, environmental stewardship, and disaster response.' },
    },
    cta: {
      eyebrow: 'Become Part of the Story',
      title: 'Every child deserves a home.',
      subtitle: 'Every elder deserves dignity.',
      desc: 'Prathana Foundation runs on public trust. 100% of contributions go directly to campus operations. Join us in carrying this legacy forward.',
      donate: 'Donate Now',
      volunteer: 'Volunteer with Us',
      visit: 'Visit Us in Morvanchi',
    },
  },

  mr: {
    hero: {
      eyebrow: 'आमची सत्यकथा',
      tag: 'एका दुःखातून जन्मलेला संकल्प.\nशेकडो निराधारांसाठी आशेचा किरण.',
      sub: '२००६ मध्ये, शेतकरी असलेल्या वडिलांच्या अकाली निधनाने एका मुलाचे आयुष्य कायमचे बदलले. पण त्या दुःखातूनच एक ध्येय जन्मले—ज्यांना कोणीही नाही, अशा मुलांसाठी हक्काचे घर निर्माण करण्याचे.',
      flow: [
        { year: '२००६', label: 'वडिलांचे छत्र हरवले' },
        { year: 'शपथ', label: 'एक दृढ निश्चय' },
        { year: '२०१८', label: 'संस्थापना' },
        { year: 'आज', label: '७०+ जीव सुरक्षित' },
      ],
    },
    chapters: {
      eyebrow: 'कथा अध्याय',
      title: 'प्रार्थना फाउंडेशनची जीवनकथा',
      c1: { num: 'भाग ०१', year: '२००६', title: 'जेव्हा सर्व काही बदलले.', text: 'कर्जाच्या डोंगरामुळे प्रसाद मोहिते यांच्या वडिलांनी आत्महत्या केली, ज्याने त्यांच्या जीवनाला आणि ध्येयाला नवी दिशा दिली.' },
      c2: { num: 'भाग ०२', title: 'घेतलेली शपथ', quote: 'जे दुःख मी भोगले, ते इतर कोणत्याही मुलाच्या नशिबी येऊ नये.', text: 'त्या दुःखाने प्रसाद यांना दिशा दिली. त्यांनी आपले संपूर्ण आयुष्य रस्त्यावरील अनाथ मुलांचे अश्रू पुसण्यासाठी समर्पित केले.' },
      c3: { num: 'भाग ०३', title: 'प्रवासाचे टप्पे', nodes: [
        { label: '२००६', desc: 'वडिलांचे छत्र हरवले' },
        { label: 'MSW शिक्षण', desc: 'समाजकार्याची पदवी' },
        { label: 'अनू यांची साथ', desc: 'सहचारिणी आणि सह-संस्थापक' },
        { label: 'रस्त्यावरील मुले', desc: 'सोलापूरमध्ये थेट सेवाकार्य' },
        { label: 'विवाह', desc: 'ध्येयवादी सहजीवन' },
        { label: '२०१८', desc: 'प्रार्थना फाउंडेशनची स्थापना' },
      ]},
    },
    prathana: {
      eyebrow: 'संस्थेच्या नावामागील कथा',
      quote: '"आम्ही आधीच तिचे नाव ठरवले होते."',
      name: 'प्रार्थना',
      desc1: 'त्यांच्या मुलीचे जन्मानंतर लगेचच दुःखद निधन झाले. त्यांनी तिचे देहदान केले.',
      desc2: 'स्वतःच्या दुःखात वाहून जाण्याऐवजी…',
      desc3: "त्यांनी तिच्या स्मरणार्थ संस्थेचे नाव 'प्रार्थना फाउंडेशन' ठेवले.",
      end: 'येथे हसणारे प्रत्येक मूल तिचा वारसा पुढे नेत आहे.',
    },
    stats: [
      { num: 45, suffix: '', label: 'सुरक्षित राहणारी मुले' },
      { num: 25, suffix: '', label: 'आश्रित वृद्ध व्यक्ती' },
      { num: 60, suffix: '+', label: 'निराधारांवर केलेले अंत्यसंस्कार' },
      { num: 110, suffix: '+', label: 'शिक्षणाच्या प्रवाहात आणलेली मुले' },
      { num: 4500, suffix: '+', label: 'शैक्षणिक मदत मिळालेले विद्यार्थी' },
      { num: 300, suffix: '+', label: 'सक्षम केलेले तरुण' },
      { num: 45000, suffix: '+', label: 'गरजूंना दिलेले जेवण' },
      { num: 10000, suffix: '+', label: 'कुटुंबांना दिलेले रेशन किट' },
      { num: 11, suffix: '', label: 'पूरग्रस्तांची पुनर्बांधणी केलेली घरे' },
      { num: 16, suffix: '+', label: 'नैसर्गिक सेंद्रिय भाज्या' },
      { num: 2018, suffix: '', label: 'पासून अविरत सेवा' },
    ],
    timeline: {
      eyebrow: 'यशस्वी टप्पे',
      title: 'प्रवासाचा नकाशा',
      sub: 'एका छोट्या वंचितांच्या शाळेपासून सुरू झालेली आमची यशोगाथा. कोणत्याही टप्प्यावर क्लिक करा.',
      nodes: [
        { year: '२००६', title: 'आघातातून ध्येयाची निर्मिती', desc: 'वडिलांच्या आत्महत्येनंतर, वंचितांना आधार देण्याचे स्वप्न पाहिले गेले.', img: '/awards/Awards/DSC_0350.JPG' },
        { year: '२०१८', title: 'फाउंडेशनची नोंदणी', desc: 'प्रार्थना फाउंडेशनची अधिकृत नोंदणी झाली आणि रस्त्यावरील बालकांना जेवण देण्यास सुरुवात झाली.', img: '/vanchitanchishala/Vanchitanchi Shala/20181109_092926.jpg' },
        { year: 'वंचितांची शाळा', title: 'वंचितांची शाळा', desc: 'रस्त्यावरील मुलांसाठी अभ्यास वर्ग सुरू केले.', img: '/vanchitanchishala/Vanchitanchi Shala/20161022_094216.jpg' },
        { year: 'बालग्राम', title: 'प्रार्थना बालग्राम', desc: 'अनाथ मुलांसाठी मोरवंची येथे हक्काच्या घराची पायाभरणी झाली.', img: '/balgram/Balgram/481252295_4027096254187163_273174834482280391_n.jpg' },
        { year: 'वृद्धाश्रम', title: 'प्रार्थना वृद्धाश्रम', desc: 'निराधार वृद्ध व्यक्तींसाठी हक्काचा निवारा बनवला गेला.', img: '/Vrudhashram/Vrudhashram/476569459_4004469246449864_4548442253041631_n.jpg' },
        { year: 'नैसर्गिक शेती', title: 'सेंद्रिय हरित कॅम्पस', desc: 'बालग्रामच्या जमिनीवर नैसर्गिक विषमुक्त शेती सुरू झाली.', img: '/naturalfarming/Natural Farming/IMG-20260329-WA0129.jpg' },
        { year: 'युवा विकास', title: 'युवा सक्षमीकरण', desc: 'ग्रामीण तरुणांसाठी कौशल्य विकास उपक्रम सुरू झाले.', img: '/awards/Awards/DSC_0595.JPG' },
        { year: 'आपत्ती व्यवस्थापन', title: 'संकटात धावून जाणारी प्रार्थना', desc: 'दुष्काळ, पूर आणि टाळेबंदीत हजारो गरजूंना मदत केली.', img: '/awards/Awards/20200420_084411.jpg' },
        { year: 'आज', title: 'एक मोठा परिवार', desc: '४५ मुले आणि २५ वृद्ध एकाच छताखाली.', img: '/balgram/Balgram/WhatsApp Image 2026-06-22 at 1.09.36 PM.jpeg' },
      ],
    },
    founders: {
      eyebrow: 'संस्थापक जोडपे',
      title: 'संस्थापकांचे विचार',
      prasad: { name: 'प्रसाद मोहिते', role: 'संस्थापक आणि अध्यक्ष', quote: 'दुःख एकतर तुम्हाला संपवू शकते किंवा दुसऱ्याच्या आशेचा किरण बनू शकते.' },
      anu: { name: 'अनू मोहिते', role: 'सह-संस्थापक आणि सचिव', quote: 'जेव्हा दोन व्यक्ती एकाच ध्येयाची निवड करतात, तेव्हा करुणेला प्रचंड ताकद मिळते.' },
    },
    sacrifice: {
      eyebrow: 'त्यांचा त्याग',
      title: 'त्यांनी स्वतःची शेतजमीन विकली.',
      text: 'निराधार बालके आणि वृद्धांना हक्काचे छप्पर देण्यासाठी, प्रसाद मोहिते यांनी वडिलोपार्जित शेतजमीन विकली आणि मोरवंची येथे जागा घेतली. आज हीच जमीन शेकडो मुलांचे हक्काचे घर बनली आहे.',
      before: 'पूर्वी — रस्त्यावरील तात्पुरती शाळा',
      after: 'आज — हक्काचे हरित संकुल',
    },
    gallery: {
      eyebrow: 'चित्रांतून काम',
      title: 'जिथे आशा जिवंत राहते',
      sub: 'प्रार्थना बालग्राम आणि वृद्धाश्रमातील हसू, संघर्ष आणि प्रगतीची छायाचित्रे.',
      filters: { all: 'सर्व', studying: 'मुले', farming: 'शेती', seniors: 'वृद्ध', celebrations: 'सण', volunteers: 'स्वयंसेवक' },
    },
    values: {
      eyebrow: 'तत्वे',
      title: 'आमची जीवनमूल्ये',
      list: [
        { title: 'करुणा', desc: 'उपेक्षित व्यक्तींसाठी सहानुभूतीने काम करणे.' },
        { title: 'प्रामाणिकपणा', desc: 'देणगी आणि कारभारामध्ये पूर्ण पारदर्शकता.' },
        { title: 'शाश्वतता', desc: 'नैसर्गिक शेतीद्वारे स्वावलंबन वाढवणे.' },
        { title: 'ज्ञानार्जन', desc: 'मुलांमध्ये चारित्र्यनिर्मिती आणि शिक्षणाला प्रोत्साहन.' },
        { title: 'समावेशकता', desc: 'कोणालाही मागे न सोडणारे कौटुंबिक वातावरण.' },
        { title: 'सन्मान', desc: 'प्रत्येकाला स्वाभिमानाने जगण्याचा अधिकार.' },
      ],
    },
    vm: {
      vision: { title: 'आमचे ध्येय', desc: 'एक संवेदनशील समाज जिथे प्रत्येक वंचित बालक, वृद्ध आणि उपेक्षित व्यक्ती सन्मानाने जगू शकेल.' },
      mission: { title: 'आमचे उद्दिष्ट', desc: 'काळजी, शिक्षण, शाश्वत उपजीविका, युवा विकास आणि आपत्ती व्यवस्थापनाद्वारे वंचित घटकांना सक्षम करणे.' },
    },
    cta: {
      eyebrow: 'प्रार्थनेचा भाग बना',
      title: 'प्रत्येक मुलाला घर मिळायला हवे.',
      subtitle: 'प्रत्येक वृद्धाला सन्मान मिळायला हवा.',
      desc: 'देणगीचा १००% भाग थेट बालग्राम आणि वृद्धाश्रमाच्या व्यवस्थापनासाठी वापरला जातो.',
      donate: 'देणगी द्या',
      volunteer: 'स्वयंसेवक व्हा',
      visit: 'कॅम्पसला भेट द्या',
    },
  },
};

/* ─── HorizontalTimeline ─────────────────────────────────────────────────── */
type TimelineNode = { year: string; title: string; desc: string; img: string };

function HorizontalTimeline({
  nodes, eyebrow, title, sub, lang
}: {
  nodes: TimelineNode[]; eyebrow: string; title: string; sub: string; lang: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Each card is 340px wide + 24px gap on desktop
  const CARD_W = 364; // card width + gap
  const totalScroll = CARD_W * (nodes.length - 1);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -totalScroll]);
  const xSpring = useSpring(x, { stiffness: 80, damping: 20 });

  // Progress bar
  const progress = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      // tall container to create scroll room — hidden on mobile
      className="relative bg-[#0d1a14]"
      style={{ height: `calc(100vh + ${totalScroll}px)` }}
    >
      {/* ── sticky wrapper ── */}
      <div className="sticky top-0 h-screen flex flex-col justify-center" style={{ overflow: 'clip' }}>

        {/* Header */}
        <div className="px-6 md:px-16 mb-10 max-w-2xl">
          <span className="inline-flex items-center gap-2 text-brand-yellow text-[11px] font-bold tracking-[0.3em] uppercase mb-4">
            <span className="w-5 h-px bg-brand-yellow/60" />
            {eyebrow}
          </span>
          <h2 className="font-serif-display text-4xl md:text-5xl font-bold text-white leading-tight mb-3">
            {title}
          </h2>
          <p className="text-white/40 text-[14px] font-light leading-relaxed">{sub}</p>
        </div>

        {/* Progress bar */}
        <div className="px-6 md:px-16 mb-8">
          <div className="w-full max-w-xs h-0.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div className="h-full bg-brand-yellow rounded-full" style={{ width: progress }} />
          </div>
        </div>

        {/* Horizontal card strip */}
        <div className="pl-6 md:pl-16">
          <motion.div
            ref={trackRef}
            className="flex gap-6 will-change-transform"
            style={{ x: xSpring }}
          >
            {nodes.map((node, i) => (
              <div
                key={i}
                className="flex-none w-[300px] md:w-[340px] bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-brand-yellow/30 transition-colors duration-300 group"
              >
                {/* Image */}
                <div className="relative h-44 md:h-52 overflow-hidden">
                  <img
                    src={node.img}
                    alt={node.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {/* Year badge */}
                  <span className="absolute bottom-3 left-4 text-[11px] font-bold text-brand-yellow tracking-[0.2em] uppercase">
                    {node.year}
                  </span>
                  {/* Step number */}
                  <span className="absolute top-3 right-4 w-7 h-7 rounded-full bg-white/10 border border-white/20 text-white text-[11px] font-bold flex items-center justify-center backdrop-blur-sm">
                    {i + 1}
                  </span>
                </div>
                {/* Content */}
                <div className="p-5 space-y-3">
                  <div className="w-6 h-0.5 bg-brand-yellow rounded-full" />
                  <h3 className="font-serif-display text-base font-bold text-white leading-snug">
                    {node.title}
                  </h3>
                  <p className="text-white/50 text-[13px] font-light leading-relaxed line-clamp-3">
                    {node.desc}
                  </p>
                </div>
              </div>
            ))}
            {/* Trailing space */}
            <div className="flex-none w-6 md:w-16" />
          </motion.div>
        </div>

        {/* Scroll hint */}
        <div className="px-6 md:px-16 mt-8 flex items-center gap-3">
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="flex items-center gap-1 text-white/25 text-[11px] font-mono tracking-widest uppercase"
          >
            <span>Scroll to explore</span>
            <ArrowRight size={12} />
          </motion.div>
        </div>

      </div>
    </section>
  );
}

const valueIcons = [
  <Heart key="h" size={24} />,
  <ShieldCheck key="s" size={24} />,
  <Leaf key="l" size={24} />,
  <BookOpen key="b" size={24} />,
  <Users key="u" size={24} />,
  <Sparkles key="sp" size={24} />,
];

const valueColors = [
  'from-rose-500/10 to-orange-400/10 border-rose-200 text-rose-600',
  'from-emerald-500/10 to-teal-400/10 border-emerald-200 text-emerald-700',
  'from-lime-500/10 to-green-400/10 border-lime-200 text-lime-700',
  'from-sky-500/10 to-blue-400/10 border-sky-200 text-sky-700',
  'from-violet-500/10 to-purple-400/10 border-violet-200 text-violet-700',
  'from-amber-500/10 to-yellow-400/10 border-amber-200 text-amber-700',
];

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function AboutPage() {
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const local = content[lang === 'mr' ? 'mr' : 'en'];

  const [activeSection, setActiveSection] = useState('hero');
  const [timelineIdx, setTimelineIdx] = useState(0);
  const [galleryFilter, setGalleryFilter] = useState('all');

  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start center', 'end center'] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  const navItems = [
    { id: 'hero', label: lang === 'mr' ? 'आरंभ' : 'Hero' },
    { id: 'chapters', label: lang === 'mr' ? 'अध्याय' : 'Chapters' },
    { id: 'prathana', label: lang === 'mr' ? 'प्रार्थना' : 'Prathana' },
    { id: 'stats', label: lang === 'mr' ? 'प्रभाव' : 'Impact' },
    { id: 'timeline', label: lang === 'mr' ? 'प्रवास' : 'Journey' },
    { id: 'founders', label: lang === 'mr' ? 'संस्थापक' : 'Founders' },
    { id: 'sacrifice', label: lang === 'mr' ? 'त्याग' : 'Sacrifice' },
    { id: 'gallery', label: lang === 'mr' ? 'दालन' : 'Gallery' },
    { id: 'values', label: lang === 'mr' ? 'मूल्ये' : 'Values' },
    { id: 'vision', label: lang === 'mr' ? 'ध्येय' : 'Vision' },
  ];

  useEffect(() => {
    const onScroll = () => {
      let cur = 'hero';
      for (const n of navItems) {
        const el = document.getElementById(n.id);
        if (el && el.getBoundingClientRect().top <= 260) cur = n.id;
      }
      setActiveSection(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const galleryItems = [
    { img: '/vanchitanchishala/Vanchitanchi Shala/20181111_205214.jpg', category: 'studying', caption: lang === 'mr' ? 'अभ्यास करणारी मुले' : 'Children studying at the centre' },
    { img: '/vanchitanchishala/Vanchitanchi Shala/20191029_092615.jpg', category: 'studying', caption: lang === 'mr' ? 'वंचितांच्या शाळेतील वर्ग' : 'Vanchitanchi Shala classrooms' },
    { img: '/naturalfarming/Natural Farming/_MG_0169.JPG', category: 'farming', caption: lang === 'mr' ? 'नैसर्गिक शेती' : 'Natural farming in action' },
    { img: '/naturalfarming/Natural Farming/IMG_9727.JPG', category: 'farming', caption: lang === 'mr' ? 'ताज्या भाज्या' : 'Fresh organic harvest on campus' },
    { img: '/Vrudhashram/Vrudhashram/WhatsApp Image 2026-06-22 at 1.06.49 PM.jpeg', category: 'seniors', caption: lang === 'mr' ? 'वृद्धाश्रमातील सहजीवन' : 'Living in harmony at Old Age Home' },
    { img: '/Vrudhashram/Vrudhashram/476569459_4004469246449864_4548442253041631_n.jpg', category: 'seniors', caption: lang === 'mr' ? 'आजी-आजोबांचे स्मित' : 'Dignified care for elderly citizens' },
    { img: '/balgram/Balgram/WhatsApp Image 2026-06-22 at 1.09.36 PM.jpeg', category: 'celebrations', caption: lang === 'mr' ? 'आनंदाने सण' : 'Celebrating festivals as a family' },
    { img: '/balgram/Balgram/486262788_4051383418425113_5954660625716303688_n.jpg', category: 'celebrations', caption: lang === 'mr' ? 'सांस्कृतिक कार्यक्रम' : 'Cultural events at Prathana Balgram' },
    { img: '/awards/Awards/DSC_0595.JPG', category: 'volunteers', caption: lang === 'mr' ? 'समर्पित स्वयंसेवक' : 'Dedicated volunteers supporting the cause' },
    { img: '/awards/Awards/DSC_0432.JPG', category: 'volunteers', caption: lang === 'mr' ? 'पोषण आहार वितरण' : 'Community meals outreach' },
  ];
  const filtered = galleryFilter === 'all' ? galleryItems : galleryItems.filter(i => i.category === galleryFilter);

  return (
    <div className="relative min-h-screen bg-brand-paper flex flex-col font-sans antialiased text-brand-charcoal">

      {/* Page-level glow blobs */}
      <div className="fixed top-[15%] right-[-8%] w-[480px] h-[480px] bg-brand-saffron/6 rounded-full blur-[130px] pointer-events-none animate-drift -z-10" />
      <div className="fixed bottom-[20%] left-[-8%] w-[560px] h-[560px] bg-brand-green/5 rounded-full blur-[140px] pointer-events-none animate-drift -z-10" style={{ animationDelay: '-4s' }} />

      <Header lang={lang} />

      {/* ── Floating sidebar nav ────────────────────────────────────────── */}
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-3 bg-white/80 backdrop-blur-lg p-3 rounded-2xl border border-brand-clay/30 shadow-xl shadow-brand-charcoal/5">
        {navItems.map(n => (
          <button key={n.id} onClick={() => scrollTo(n.id)}
            className="group flex items-center justify-end gap-2.5 cursor-pointer focus:outline-none">
            <span className={`text-[10px] font-mono font-bold tracking-wider transition-all duration-300 whitespace-nowrap
              ${activeSection === n.id ? 'text-brand-saffron opacity-100' : 'text-brand-muted opacity-0 group-hover:opacity-100'}`}>
              {n.label}
            </span>
            <div className={`rounded-full border transition-all duration-300
              ${activeSection === n.id
                ? 'w-3.5 h-3.5 bg-brand-saffron border-brand-saffron shadow-[0_0_8px_rgba(217,119,6,0.5)]'
                : 'w-2.5 h-2.5 bg-transparent border-brand-clay/70 group-hover:border-brand-saffron/60 group-hover:bg-brand-saffron/20'}`} />
          </button>
        ))}
      </nav>

      <main className="flex-1 w-full">

        {/* ════════════════════════════════════════
            HERO
        ════════════════════════════════════════ */}
        <section id="hero" className="relative min-h-screen flex items-end justify-center overflow-hidden bg-[#0d1a14]">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: "url('/awards/Awards/FB_IMG_1782107660649.jpg.jpeg')" }}
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a130d] via-[#0d1a14]/70 to-[#0d1a14]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a130d]/50 via-transparent to-[#0a130d]/30" />

          {/* Grain texture */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />

          <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pb-20 pt-48">
            {/* Eyebrow */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 text-brand-yellow text-[11px] font-bold tracking-[0.3em] uppercase mb-6">
                <span className="w-6 h-px bg-brand-yellow" />
                {local.hero.eyebrow}
                <span className="w-6 h-px bg-brand-yellow" />
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight max-w-4xl whitespace-pre-line mb-8"
            >
              {local.hero.tag}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}
              className="text-base md:text-lg text-white/60 font-light max-w-2xl leading-relaxed mb-16"
            >
              {local.hero.sub}
            </motion.p>

            {/* Flow timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-3 items-center mb-16"
            >
              {local.hero.flow.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl px-5 py-3 hover:border-brand-yellow/30 transition-colors duration-300">
                    <div className="text-brand-yellow font-serif-display font-bold text-base">{f.year}</div>
                    <div className="text-white/50 text-[11px] font-sans uppercase tracking-wider mt-0.5">{f.label}</div>
                  </div>
                  {i < local.hero.flow.length - 1 && <ArrowRight size={14} className="text-white/20 flex-shrink-0" />}
                </div>
              ))}
            </motion.div>

            {/* Scroll cue */}
            <motion.button
              animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              onClick={() => scrollTo('chapters')}
              className="flex flex-col items-start gap-2 cursor-pointer group"
            >
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-white/30 uppercase group-hover:text-white/60 transition-colors">
                Scroll to begin
              </span>
              <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent ml-2" />
            </motion.button>
          </div>
        </section>

        {/* ════════════════════════════════════════
            CHAPTERS
        ════════════════════════════════════════ */}
        <section id="chapters" className="py-28 md:py-40 bg-brand-paper">
          <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-36">

            {/* Header */}
            <div className="max-w-2xl">
              <span className="section-label">{local.chapters.eyebrow}</span>
              <h2 className="font-serif-display text-4xl md:text-6xl font-bold text-brand-charcoal mt-3 leading-tight">
                {local.chapters.title}
              </h2>
              <div className="w-12 h-1 bg-brand-yellow rounded-full mt-6" />
            </div>

            {/* Chapter 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl"
              >
                <img src="/vanchitanchishala/Vanchitanchi Shala/20161022_094159.jpg" alt="2006"
                  className="w-full h-[440px] object-cover editorial-img" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <span className="font-serif-display text-5xl font-bold text-white/20 select-none leading-none">
                    {local.chapters.c1.year}
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
                className="space-y-6"
              >
                <span className="inline-block text-[11px] font-bold text-brand-saffron tracking-[0.2em] uppercase bg-brand-saffron/8 px-3 py-1 rounded-full border border-brand-saffron/20">
                  {local.chapters.c1.num}
                </span>
                <h3 className="font-serif-display text-3xl md:text-4xl font-bold leading-tight">
                  {local.chapters.c1.title}
                </h3>
                <div className="w-8 h-0.5 bg-brand-yellow rounded-full" />
                <p className="text-brand-muted font-light leading-relaxed text-[15px]">
                  {local.chapters.c1.text}
                </p>
              </motion.div>
            </div>

            {/* Chapter 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7 }}
                className="lg:order-2 relative rounded-2xl overflow-hidden shadow-2xl"
              >
                <img src="/vanchitanchishala/Vanchitanchi Shala/20181111_205243.jpg" alt="Promise"
                  className="w-full h-[440px] object-cover editorial-img" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
                className="lg:order-1 space-y-6"
              >
                <span className="inline-block text-[11px] font-bold text-brand-green tracking-[0.2em] uppercase bg-brand-green/8 px-3 py-1 rounded-full border border-brand-green/20">
                  {local.chapters.c2.num}
                </span>
                <h3 className="font-serif-display text-3xl md:text-4xl font-bold leading-tight">
                  {local.chapters.c2.title}
                </h3>
                <div className="w-8 h-0.5 bg-brand-yellow rounded-full" />

                {/* Pull quote */}
                <div className="relative pl-6 border-l-4 border-brand-yellow py-2">
                  <Quote size={20} className="absolute -top-1 -left-2 text-brand-yellow fill-brand-yellow/20" />
                  <p className="font-serif-display text-xl md:text-2xl italic text-brand-charcoal leading-snug">
                    {local.chapters.c2.quote}
                  </p>
                </div>

                <p className="text-brand-muted font-light leading-relaxed text-[15px]">
                  {local.chapters.c2.text}
                </p>
              </motion.div>
            </div>

            {/* Chapter 3 – vertical scroll timeline */}
            <div className="max-w-xl mx-auto">
              <div className="text-center mb-14">
                <span className="inline-block text-[11px] font-bold text-brand-saffron tracking-[0.2em] uppercase bg-brand-saffron/8 px-3 py-1 rounded-full border border-brand-saffron/20 mb-4">
                  {local.chapters.c3.num}
                </span>
                <h3 className="font-serif-display text-3xl font-bold">{local.chapters.c3.title}</h3>
              </div>

              <div ref={timelineRef} className="relative">
                {/* Rail */}
                <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-brand-clay/50 rounded-full">
                  <motion.div className="absolute top-0 left-0 w-full bg-gradient-to-b from-brand-saffron to-brand-green origin-top rounded-full"
                    style={{ scaleY: lineScale, height: '100%' }} />
                </div>

                <div className="space-y-6">
                  {local.chapters.c3.nodes.map((node, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.45, delay: i * 0.07 }}
                      className="flex items-start gap-5 pl-2"
                    >
                      {/* Dot */}
                      <div className="relative flex-shrink-0 mt-0.5">
                        <div className="w-8 h-8 rounded-full bg-white border-2 border-brand-saffron flex items-center justify-center shadow-md z-10">
                          <div className="w-2 h-2 rounded-full bg-brand-saffron" />
                        </div>
                      </div>
                      {/* Card */}
                      <div className="flex-1 bg-white border border-brand-clay/40 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-brand-saffron/30 transition-all duration-300">
                        <div className="font-serif-display text-base font-bold text-brand-charcoal">{node.label}</div>
                        <div className="text-[12px] text-brand-muted mt-0.5">{node.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════
            PRATHANA
        ════════════════════════════════════════ */}
        <section id="prathana" className="relative py-36 bg-[#0d1a14] overflow-hidden">
          {/* Bokeh glows */}
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-brand-green/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-saffron/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">

            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 text-brand-yellow text-[11px] font-bold tracking-[0.3em] uppercase mb-10">
              <span className="w-6 h-px bg-brand-yellow/60" />
              {local.prathana.eyebrow}
              <span className="w-6 h-px bg-brand-yellow/60" />
            </motion.span>

            <motion.blockquote initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1 }}
              className="font-serif-display text-2xl md:text-4xl text-white/80 italic font-light leading-relaxed mb-14">
              {local.prathana.quote}
            </motion.blockquote>

            {/* Giant name — fluid & contained */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}
              className="relative mb-14 w-full">
              <span
                className="font-serif-display font-bold text-white uppercase block leading-[1] select-none tracking-normal"
                style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', letterSpacing: '0.04em' }}
              >
                {local.prathana.name}
              </span>
              {/* Underline glow */}
              <div className="mt-3 mx-auto w-24 h-1 bg-brand-yellow rounded-full blur-sm" />
              <div className="-mt-1 mx-auto w-16 h-0.5 bg-brand-yellow rounded-full" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-5 text-base md:text-lg text-white/50 font-light leading-relaxed max-w-2xl mx-auto mb-12">
              <p>{local.prathana.desc1}</p>
              <p className="text-brand-yellow/80 text-xl font-medium">{local.prathana.desc2}</p>
              <p>{local.prathana.desc3}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}>
              <span className="inline-block border border-brand-green/40 text-brand-green text-sm md:text-base font-medium px-8 py-4 rounded-full backdrop-blur-sm bg-brand-green/5">
                {local.prathana.end}
              </span>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            STATS
        ════════════════════════════════════════ */}
        <section id="stats" className="py-20 bg-brand-charcoal relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="relative max-w-6xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 border-l border-t border-white/10">
              {local.stats.map((s, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="text-center px-4 py-12 group border-r border-b border-white/10"
                >
                  <div className="font-serif-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 group-hover:text-brand-yellow transition-colors duration-500">
                    <CountUp to={s.num} />{s.suffix}
                  </div>
                  <div className="w-8 h-0.5 bg-brand-yellow/50 rounded-full mx-auto mb-3 group-hover:w-16 transition-all duration-500" />
                  <p className="text-white/40 text-[10px] md:text-xs font-sans font-semibold uppercase tracking-widest">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            HORIZONTAL SCROLL JOURNEY
        ════════════════════════════════════════ */}
        <HorizontalTimeline nodes={local.timeline.nodes} eyebrow={local.timeline.eyebrow} title={local.timeline.title} sub={local.timeline.sub} lang={lang} />

        {/* ════════════════════════════════════════
            FOUNDERS
        ════════════════════════════════════════ */}
        <section id="founders" className="py-28 md:py-40 bg-brand-sand/20 border-y border-brand-clay/30">
          <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-16">

            <div className="text-center space-y-4">
              <span className="section-label">{local.founders.eyebrow}</span>
              <h2 className="font-serif-display text-4xl md:text-5xl font-bold">{local.founders.title}</h2>
              <div className="w-12 h-1 bg-brand-yellow rounded-full mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { data: local.founders.prasad, img: '/team/Team/Prasad Mohite (Founder & President)).jpg', delay: 0 },
                { data: local.founders.anu, img: '/team/Team/Anu Mohite (Secretary).jpg', delay: 0.1 },
              ].map(({ data, img, delay }) => (
                <motion.div key={data.name}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6, delay }}
                  className="group bg-white rounded-2xl p-8 border border-brand-clay/40 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col gap-6"
                >
                  <div className="flex items-center gap-5">
                    {/* Portrait with gradient ring */}
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand-saffron to-brand-green opacity-30 blur-[6px] scale-105" />
                      <img src={img} alt={data.name}
                        className="relative w-20 h-20 rounded-xl object-cover object-top border-2 border-white shadow-lg" />
                    </div>
                    <div>
                      <h3 className="font-serif-display text-lg font-bold text-brand-charcoal">{data.name}</h3>
                      <span className="text-[10px] font-mono text-brand-forest uppercase tracking-widest font-bold">{data.role}</span>
                    </div>
                  </div>

                  <div className="h-px bg-brand-clay/40" />

                  <div className="relative pl-5 border-l-2 border-brand-yellow/60">
                    <Quote size={16} className="absolute -top-1 -left-2 text-brand-yellow fill-brand-yellow/30" />
                    <p className="font-serif-display text-lg italic text-brand-muted leading-relaxed">
                      "{data.quote}"
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            SACRIFICE + BEFORE/AFTER
        ════════════════════════════════════════ */}
        <section id="sacrifice" className="py-28 md:py-40 bg-[#0d1a14] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-green/15 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

              <div className="lg:col-span-5 space-y-7">
                <span className="inline-flex items-center gap-2 text-brand-yellow text-[11px] font-bold tracking-[0.25em] uppercase">
                  <span className="w-5 h-px bg-brand-yellow/60" />
                  {local.sacrifice.eyebrow}
                </span>
                <h2 className="font-serif-display text-4xl md:text-5xl font-bold text-white leading-tight">
                  {local.sacrifice.title}
                </h2>
                <div className="w-10 h-0.5 bg-brand-yellow rounded-full" />
                <p className="text-white/55 font-light leading-relaxed text-[15px]">
                  {local.sacrifice.text}
                </p>
              </div>

              <div className="lg:col-span-7">
                <BeforeAfterSlider
                  beforeImg="/vanchitanchishala/Vanchitanchi Shala/20160913_094207.jpg"
                  afterImg="/balgram/Balgram/WhatsApp Image 2026-06-22 at 1.09.36 PM.jpeg"
                  beforeLabel={local.sacrifice.before}
                  afterLabel={local.sacrifice.after}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            GALLERY
        ════════════════════════════════════════ */}
        <section id="gallery" className="py-28 md:py-40 bg-brand-paper">
          <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-12">

            <div className="text-center space-y-4">
              <span className="section-label">{local.gallery.eyebrow}</span>
              <h2 className="font-serif-display text-4xl md:text-5xl font-bold">{local.gallery.title}</h2>
              <p className="text-brand-muted font-light text-[15px] max-w-xl mx-auto leading-relaxed">{local.gallery.sub}</p>
              <div className="w-12 h-1 bg-brand-yellow rounded-full mx-auto" />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              {Object.entries(local.gallery.filters).map(([key, label]) => (
                <button key={key} onClick={() => setGalleryFilter(key)}
                  className={`text-xs font-semibold px-5 py-2 rounded-full cursor-pointer transition-all duration-300 border
                    ${galleryFilter === key
                      ? 'bg-brand-charcoal border-brand-charcoal text-white shadow-md'
                      : 'bg-white border-brand-clay/60 text-brand-muted hover:border-brand-charcoal/40 hover:text-brand-charcoal'}`}>
                  {label}
                </button>
              ))}
            </div>

            {/* Masonry */}
            <motion.div layout className="columns-1 sm:columns-2 md:columns-3 gap-5 space-y-5">
              <AnimatePresence>
                {filtered.map((item) => (
                  <motion.div key={item.img} layout
                    initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.35 }}
                    className="break-inside-avoid relative group rounded-xl overflow-hidden shadow-md border border-brand-clay/30 bg-white"
                  >
                    <img src={item.img} alt={item.caption}
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-4">
                      <span className="text-xs text-white font-medium leading-snug">{item.caption}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            VALUES
        ════════════════════════════════════════ */}
        <section id="values" className="py-28 md:py-40 bg-brand-sand/20 border-y border-brand-clay/30">
          <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-16">

            <div className="text-center space-y-4">
              <span className="section-label">{local.values.eyebrow}</span>
              <h2 className="font-serif-display text-4xl md:text-5xl font-bold">{local.values.title}</h2>
              <div className="w-12 h-1 bg-brand-yellow rounded-full mx-auto" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {local.values.list.map((v, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.06 }}
                  className={`group relative p-7 rounded-2xl border bg-gradient-to-br ${valueColors[i]} hover:-translate-y-1 hover:shadow-xl transition-all duration-400 overflow-hidden`}
                >
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-white/60 backdrop-blur-sm ${valueColors[i].split(' ').pop()}`}>
                    {valueIcons[i]}
                  </div>
                  <h3 className="font-serif-display text-xl font-bold text-brand-charcoal mb-2">{v.title}</h3>
                  <p className="text-brand-muted text-[13px] font-light leading-relaxed">{v.desc}</p>

                  {/* Subtle corner accent */}
                  <div className="absolute bottom-0 right-0 w-16 h-16 opacity-10 rounded-tl-full bg-current" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            VISION & MISSION
        ════════════════════════════════════════ */}
        <section id="vision" className="py-28 md:py-40 bg-brand-paper">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

              {[
                { icon: <Globe size={22} />, colorClass: 'text-brand-saffron bg-brand-saffron/10', data: local.vm.vision, delay: 0 },
                { icon: <HeartHandshake size={22} />, colorClass: 'text-brand-green bg-brand-green/10', data: local.vm.mission, delay: 0.1 },
              ].map(({ icon, colorClass, data, delay }) => (
                <motion.div key={data.title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6, delay }}
                  className="space-y-6"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${colorClass}`}>
                    {icon}
                  </div>
                  <h2 className="font-serif-display text-3xl md:text-4xl font-bold text-brand-charcoal">{data.title}</h2>
                  <div className="w-8 h-0.5 bg-brand-yellow rounded-full" />
                  <p className="font-serif-display text-lg md:text-xl text-brand-muted font-light leading-relaxed">
                    "{data.desc}"
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            CTA
        ════════════════════════════════════════ */}
        <section className="py-32 md:py-48 bg-brand-green relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-saffron/10 rounded-full blur-[120px] pointer-events-none animate-drift" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[140px] pointer-events-none animate-drift" style={{ animationDelay: '-3s' }} />
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />

          <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center space-y-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="space-y-5">
              <span className="inline-flex items-center gap-2 text-brand-yellow text-[11px] font-bold tracking-[0.3em] uppercase">
                <span className="w-6 h-px bg-brand-yellow/60" />
                {local.cta.eyebrow}
                <span className="w-6 h-px bg-brand-yellow/60" />
              </span>
              <h2 className="font-serif-display text-5xl md:text-7xl font-bold text-white leading-tight">
                {local.cta.title}
              </h2>
              <p className="font-serif-display text-2xl md:text-3xl text-brand-yellow font-light">
                {local.cta.subtitle}
              </p>
              <p className="text-white/50 text-[15px] font-light max-w-xl mx-auto leading-relaxed">
                {local.cta.desc}
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href={`/${lang}/donation`}
                className="group w-full sm:w-auto bg-brand-yellow hover:bg-amber-400 text-brand-charcoal font-bold px-9 py-4 rounded-full text-sm shadow-xl shadow-brand-yellow/20 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2">
                {local.cta.donate}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href={`/${lang}/volunteer`}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 font-semibold px-9 py-4 rounded-full text-sm transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2">
                {local.cta.volunteer}
              </a>
              <a href="https://maps.google.com/?q=Morvanchi+Solapur" target="_blank" rel="noopener noreferrer"
                className="w-full sm:w-auto text-white/50 hover:text-brand-yellow font-medium px-6 py-4 text-sm transition-colors duration-300 flex items-center justify-center gap-2">
                <MapPin size={15} />
                {local.cta.visit}
              </a>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer lang={lang} />
    </div>
  );
}
