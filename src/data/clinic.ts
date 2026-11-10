import {
  HeartHandshake,
  House,
  Microscope,
  ShieldCheck,
  Stethoscope,
  UserRoundCheck,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type Language = 'ar' | 'en'
export type Localized = Record<Language, string>

type Service = {
  id: string
  icon: LucideIcon
  title: Localized
  description: Localized
}

// Fictional demonstration data. Replace these details before using for a real clinic.
const coordinates = { latitude: 31.9539, longitude: 35.9106 }

export const clinic = {
  name: { ar: 'عيادة نواة', en: 'Nawa Clinic' },
  wordmark: 'NAWA',
  tagline: { ar: 'رعاية تبدأ بك', en: 'Care that starts with you' },
  about: {
    ar: 'نؤمن أن الرعاية الجيدة تبدأ بالإنصات. في نواة، نمنحك الوقت والاهتمام لتفهم صحتك، وتختار خطوتك التالية بثقة واطمئنان.',
    en: 'Good care starts with listening. At Nawa, we give you the time and attention to understand your health and take your next step with confidence.',
  },
  story: {
    ar: 'مساحة هادئة، وفريق يهتم بالتفاصيل، ورعاية ترافقك من الاستشارة الأولى إلى المتابعة. نجمع الخبرة الطبية والاهتمام الإنساني في مكان واحد، لتكون تجربتك أبسط وأكثر راحة.',
    en: 'A welcoming space, a thoughtful team, and support from your first conversation to your follow-up. We bring clinical experience and human connection together, making your care feel simpler.',
  },
  stats: [
    { id: 'experience', value: { ar: '+١٢', en: '12+' } },
    { id: 'patients', value: { ar: '+٨٬٠٠٠', en: '8,000+' } },
    { id: 'specialists', value: { ar: '+١٥', en: '15+' } },
  ],
  brand: { primary: '#184d43', accent: '#edbc91' },
  copyright: {
    name: { ar: 'عمر المومني', en: 'Omar Momani' },
    url: 'https://omarmomani.is-a.dev',
  },
  contact: {
    phone: '+962 6 000 0000',
    phoneHref: '+96260000000',
    email: 'hello@nawa.example',
    address: {
      ar: 'شارع العافية ١٢، عمّان، الأردن',
      en: '12 Al Afiyah Street, Amman, Jordan',
    },
    city: { ar: 'عمّان، الأردن', en: 'Amman, Jordan' },
    workingHours: {
      ar: 'السبت – الخميس: ٩ صباحًا – ٨ مساءً',
      en: 'Sat–Thu: 9:00 AM – 8:00 PM',
    },
    closed: { ar: 'الجمعة: عطلة', en: 'Friday: closed' },
  },
  whatsapp: {
    number: '962790000000',
    message: {
      ar: 'مرحبًا، أود الاستفسار عن حجز موعد في عيادتكم.',
      en: 'Hello, I would like to ask about booking an appointment at your clinic.',
    },
  },
  map: {
    coordinates,
    embedUrl: `https://maps.google.com/maps?q=${coordinates.latitude},${coordinates.longitude}&z=15&output=embed`,
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${coordinates.latitude},${coordinates.longitude}`,
  },
  // Social destinations are placeholders for this demo.
  social: {
    instagram: 'https://www.instagram.com/',
    facebook: 'https://www.facebook.com/',
  },
  services: [
    {
      id: 'consultation',
      icon: Stethoscope,
      title: { ar: 'الاستشارات الطبية', en: 'Medical consultations' },
      description: {
        ar: 'نستمع إليك بعناية، ونقيّم حالتك، ونرشدك إلى الخطوة الأنسب لصحتك.',
        en: 'Time to talk, a thoughtful assessment, and clear guidance on your next step.',
      },
    },
    {
      id: 'specialist',
      icon: UserRoundCheck,
      title: { ar: 'الرعاية التخصصية', en: 'Specialist care' },
      description: {
        ar: 'خبرات متنوعة تتكامل لتقديم رعاية مدروسة تناسب احتياجاتك الفردية.',
        en: 'Connected expertise and a considered approach shaped around your individual needs.',
      },
    },
    {
      id: 'laboratory',
      icon: Microscope,
      title: { ar: 'الفحوصات المخبرية', en: 'Lab tests & diagnostics' },
      description: {
        ar: 'فحوصات تساعد على فهم صحتك بصورة أوضح، مع شرح النتائج والخطوات التالية.',
        en: 'A clearer picture of your health, with results explained and next steps discussed.',
      },
    },
    {
      id: 'preventive',
      icon: ShieldCheck,
      title: { ar: 'الفحوصات الوقائية', en: 'Preventive checkups' },
      description: {
        ar: 'اطمئن على صحتك بفحوصات دورية ونصائح عملية تلائم عمرك ونمط حياتك.',
        en: 'Stay a step ahead with routine checks and practical advice for your stage of life.',
      },
    },
    {
      id: 'followup',
      icon: HeartHandshake,
      title: { ar: 'المتابعة المستمرة', en: 'Ongoing follow-up' },
      description: {
        ar: 'نبقى إلى جانبك لمتابعة تطور حالتك ومراجعة خطة الرعاية كلما احتجت.',
        en: 'Support beyond your visit, with progress reviews and a care plan that evolves with you.',
      },
    },
    {
      id: 'home',
      icon: House,
      title: { ar: 'الزيارات المنزلية', en: 'Care at home' },
      description: {
        ar: 'رعاية أقرب إليك في راحة منزلك، وفق احتياجاتك وتوافر الخدمة.',
        en: 'Thoughtful care in the comfort of your home, tailored to your needs and availability.',
      },
    },
  ] satisfies Service[],
}

export function getWhatsAppUrl(
  language: Language,
  message = clinic.whatsapp.message[language],
) {
  return `https://wa.me/${clinic.whatsapp.number}?text=${encodeURIComponent(message)}`
}
