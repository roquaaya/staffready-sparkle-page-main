import { Children, useEffect, useState } from "react";
import { Car, GraduationCap, Globe, Diamond, CalendarDays } from 'lucide-react';
import { color, motion, type Variants } from "framer-motion";
import {
  Bus,
  Moon,
  Sun,
  MessageCircle,
  Users,
  Route as RouteIcon,
  Shield,
  Award,
  Mail,
  Phone,
  MapPin,
  Send,
  Menu,
  X,
  Languages,
  ArrowRight,
  Contact,
  CheckCircle,
} from "lucide-react";
import { set } from "date-fns";

const logo = "images/logo.jpg";
const heroBg = "images/bus9.jpg";

const WHATSAPP_NUMBER = "+201116226300";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`;

type Lang = "en" | "ar";

const t = {
  en: {
    nav: { home: "Home", services: "Services", fleet: "Fleet", contact: "Contact Us",Contact:"About US" },
    bookNow: "Book Now",
    heroTitle: "We move your team safely,",
    heroTitle2: "with unstoppable efficiency.",
    statsLabels: ["Daily clients", "Successful trips", "Modern buses", "Years of experience"],
    fleetTitle: "Our Fleet",
    fleetDesc: "Modern vehicles built to the highest safety and comfort standards.",
    features: [
      { title: "Guaranteed Safety", desc: "Live tracking and trained drivers ensuring the highest safety standards." },
      { title: "Full Coverage", desc: "We reach every governorate with flexible routes 7 days a week." },
      { title: "Premium Service", desc: "Outstanding experience from booking to arrival." },
    ],
    contactTitle: "Contact Us",
    contactDesc: "Our team is available to answer your questions and offer the best solutions for your business.",
    location: "Cairo, Arab Republic of Egypt",
    whatsappChat: "Chat instantly on WhatsApp",
    whatsappBtn: "Contact via WhatsApp",
    quoteBtn: "Request a Quote",
    form: { name: "Name", phone: "Phone", email: "Email", message: "Message", namePh: "Your full name", emailPh: "email@example.com", messagePh: "Tell us about your needs...", submit: "Send Message", thanks: "Thank you! We'll get in touch soon." },
    rights: "All rights reserved.",
    badge: "Leaders in corporate & tourism transport",
  },
  ar: {
    nav: { home: "الرئيسية", services: "الخدمات", fleet: "الأسطول", contact: "تواصل معنا" },
    bookNow: "احجز الآن",
    heroTitle: "ننقل فريقك بأمان،",
    heroTitle2: "بكفاءة لا تتوقف.",
    statsLabels: ["عميل يومياً", "رحلة ناجحة", "حافلة حديثة", "سنة خبرة"],
    fleetTitle: "أسطولنا",
    fleetDesc: "مركبات حديثة مجهزة بأعلى معايير الأمان والراحة لخدمة عملائنا.",
    features: [
      { title: "أمان مضمون", desc: "تتبع لحظي وسائقون مدربون لضمان أعلى مستويات السلامة." },
      { title: "تغطية شاملة", desc: "نصل لكل المحافظات بمسارات مرنة على مدار الأسبوع." },
      { title: "خدمة مميزة", desc: "تجربة عملاء متفوقة من الحجز وحتى الوصول لوجهتك." },
    ],
    contactTitle: "تواصل معنا",
    contactDesc: "فريقنا متاح للرد على استفساراتك وتقديم أفضل الحلول لاحتياجات مؤسستك.",
    location: "القاهرة، جمهورية مصر العربية",
    whatsappChat: "محادثة فورية على واتساب",
    whatsappBtn: "تواصل عبر واتساب",
    quoteBtn: "اطلب عرض سعر",
    form: { name: "الاسم", phone: "رقم الجوال", email: "البريد الإلكتروني", message: "رسالتك", namePh: "اسمك الكامل", emailPh: "email@example.com", messagePh: "أخبرنا عن احتياجاتك...", submit: "إرسال الرسالة", thanks: "شكراً! سنتواصل معك قريباً." },
    rights: "جميع الحقوق محفوظة.",
    badge: "رواد النقل المؤسسي والسياحي",
  },
} as const;
   



const myServices = [
  { id: 1, icon: <Car size={32} />, title: { ar: "نقل الموظفين", en: "Employee Transport" }, desc: { ar: "عقود يومية وشهرية للشركات والمصانع.", en: "Daily and monthly contracts for companies and factories." } },
  { id: 2, icon: <GraduationCap size={32} />, title: { ar: "خدمة المدارس والجامعات", en: "School & University Services" }, desc: { ar: "وسيلة آمنة ومريحة للطلاب.", en: "Safe and comfortable transport for students." } },
  { id: 3, icon: <Globe size={32} />, title: { ar: "رحلات سياحية", en: "Tourism Trips" }, desc: { ar: "رحلات داخلية وخارجية للمجموعات والشركات والمدارس.", en: "Domestic and international trips for groups, companies, and schools." } },
  { id: 4, icon: <Diamond size={32} />, title: { ar: "خدمة كبار الشخصيات", en: "VIP Services" }, desc: { ar: "نقل رجال الأعمال بسيارات فاخرة.", en: "VIP transportation for business professionals in luxury cars." } },
  { id: 5, icon: <CalendarDays size={32} />, title: { ar: "خدمة المناسبات", en: "Event Services" }, desc: { ar: "حفلات، مؤتمرات، سفر.. هنوصلك بكل راحة وأمان وأناقة.", en: "Conferences, events, and travel.. reaching you with comfort, safety, and style." } }
];


const fleetImages = [
  { 
    src: "images/bus1.jpg", 
    name: { ar: "حافلة سياحية فاخرة", en: "Luxury Tourism Bus" }, 
    desc: { ar: "حافلة مجهزة بأعلى معايير الراحة والرفاهية لرحلاتكم السياحية.", en: "A bus equipped with the highest standards of comfort and luxury for your tourist trips." } 
  },
  { 
    src: "images/bus2.jpg", 
    name: { ar: "حافلة عصرية", en: "Modern Coach" }, 
    desc: { ar: "تصميم حديث يجمع بين الأناقة والأمان في كل تنقلاتكم.", en: "Modern design combining elegance and safety in all your movements." } 
  },
  { 
    src: "images/bus3.jpg", 
    name: { ar: "ميني فان مميز", en: "Premium Minivan" }, 
    desc: { ar: "مثالية للمجموعات الصغيرة، توفر مساحة واسعة وخدمة متميزة.", en: "Ideal for small groups, offering ample space and premium service." } 
  },
  { 
    src: "images/bus4.jpg", 
    name: { ar: "حافلة النقل المؤسسي", en: "Corporate Transport" }, 
    desc: { ar: "الحل الأمثل لنقل الموظفين والوفود في مواعيد دقيقة.", en: "The perfect solution for transporting employees and delegations on time." } 
  },
  { 
    src: "images/bus6.jpg", 
    name: { ar: "حافلة للرحلات السياحية", en: "Tourism Trips" }, 
    desc: { ar: "رحلات سياحية ممتعة مع حافلات مجهزة بكل وسائل الترفيه.", en: "Enjoyable tourist trips with buses equipped with all entertainment amenities." } 
  },
  { 
    src: "images/bus7.jpg", 
    name: { ar: "أسطول النقل الفاخر", en: "Luxury Fleet" }, 
    desc: { ar: "نقدم لكم تجربة نقل فاخرة تليق بتطلعاتكم واحتياجاتكم.", en: "We offer a luxurious transport experience that matches your expectations." } 
  },
  { 
    src: "images/bus8.jpg", 
    name: { ar: "أسطول حديث", en: "Modern Fleet" }, 
    desc: { ar: "أحدث طرازات الحافلات لضمان تجربة نقل متطورة وآمنة.", en: "The latest bus models to ensure an advanced and safe transport experience." } 
  },
  { 
    src: "images/bus9.jpg", 
    name: { ar: "نقل آمن", en: "Safe Transport" }, 
    desc: { ar: "سلامتكم أولويتنا القصوى مع سائقين محترفين وحافلات معقمة.", en: "Your safety is our top priority with professional drivers and sterilized buses." } 
  }
];


const luxuryFleetImages = [
  { src: "images/car1.jpg", name: { ar: "هيونداي فان عائلية", en: "Hyundai Family Van" }, desc: { ar: "استمتع بمساحة رحبة تتسع لجميع أفراد العائلة، مع نظام تكييف مركزي يضمن أجواءً منعشة وراحة لا تُضاهى في الرحلات الطويلة.", en: "Enjoy spacious seating for the whole family, with a central AC system ensuring refreshing comfort on long trips." } },
  { src: "images/car2.jpg", name: { ar: "هيونداي توسان", en: "Hyundai Tucson" }, desc: { ar: "تجمع هذه السيارة بين الأناقة العصرية والرفاهية العالية، ومجهزة بأنظمة تكييف ذكية تمنحك تحكماً كاملاً لضمان برودة مثالية في كل ركن.", en: "Combining modern elegance with superior luxury, equipped with smart cooling systems for perfect cabin temperature." } },
  { src: "images/car3.jpg", name: { ar: "كيا سبورتاج", en: "Kia Sportage" }, desc: { ar: "تصميم جريء يخطف الأنظار مع مقصورة داخلية مبردة بالكامل، مصممة خصيصاً لتوفير أعلى مستويات الراحة والاسترخاء أثناء تنقلك.", en: "Bold, eye-catching design with a fully climate-controlled cabin, specifically crafted for ultimate relaxation." } },
  { src: "images/car4.jpg", name: { ar: "كيا سبورتاج", en: "Kia Sportage" }, desc: { ar: "اختيار مثالي لمحبي القيادة السلسة؛ توفر تجربة تنقل استثنائية مع نظام تبريد فائق السرعة يتحدى حرارة الصيف القاسية بكل كفاءة.", en: "The perfect choice for smooth driving, offering an exceptional experience with a high-performance AC system." } },
  { src: "images/car5.jpg", name: { ar: "أسطول تويوتا الفاخر", en: "Toyota Elite Fleet" }, desc: { ar: "نخبة من سيارات تويوتا التي تعكس معايير الجودة العالمية، مجهزة بأنظمة تبريد وتكييف متطورة تضمن لك تجربة سفر هادئة ومنعشة.", en: "Elite Toyota vehicles reflecting global quality standards, featuring advanced climate control for a peaceful, refreshing journey." } },
  { src: "images/car6.jpg", name: { ar: "تويوتا كورولا", en: "Toyota Corolla" }, desc: { ar: "تجمع بين الاعتمادية العالية واللمسات الفاخرة، مع نظام تكييف قوي يضمن توزيعاً متوازناً للهواء البارد لجميع الركاب داخل المقصورة.", en: "Combining reliability with luxury touches, featuring a powerful AC system that ensures balanced airflow for all passengers." } },
  { src: "images/car7.jpg", name: { ar: "تويوتا فورتشنر", en: "Toyota Fortuner" }, desc: { ar: "سيارة قوية تتحمل أصعب الطرق، مع مقصورة داخلية واسعة ونظام تكييف متكامل يغطي جميع المقاعد لضمان رفاهية مطلقة لجميع المسافرين.", en: "A powerful vehicle for tough roads, featuring a spacious interior and a comprehensive AC system covering all seats." } },
  { src: "images/car8.jpg", name: { ar: "هيونداي توسان بيضاء", en: "White Hyundai Tucson" }, desc: { ar: "إطلالة بيضاء مميزة تعبر عن الرقي، مع تجهيزات داخلية مريحة ونظام تكييف فائق القوة يجعلك في واحة من البرودة وسط حرارة الصيف.", en: "Distinctive white elegance reflecting sophistication, with comfort features and a powerful AC to keep you cool." } },
  { src: "images/car10.jpg", name: { ar: "هيونداي توسان داكنة", en: "Dark Hyundai Tucson" }, desc: { ar: "تصميم عصري وجذاب يجمع بين الجرأة والفخامة، مع تكنولوجيا تبريد فورية تمنحك انتعاشاً دائماً بمجرد ركوبك للسيارة.", en: "Modern, attractive design combining boldness with luxury, featuring instant cooling technology for constant freshness." } },
];


const statsIcons = [Users, RouteIcon, Bus, Award];
// const statsValues = ["15K+", "50K+", "120", "15"];
const featureIcons = [Shield, RouteIcon, Award];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};
const JourneyStep = ({ number, title, desc, icon, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -10 }}
    className="flex flex-col items-center text-center group"
  >
    <div className="relative mb-6">
      {/* تأثير التوهج عند الوقوف بالماوس */}
      <div className="absolute -inset-4 bg-sky-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 active:opacity-100 transition-opacity duration-500" />
      
      {/* حاوية الأيقونة */}
      <div className="relative w-20 h-20 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-sky-600 shadow-sm group-hover:border-sky-500/50 transition-all">
        {icon}
        <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-sky-600 text-white text-xs flex items-center justify-center font-bold shadow-lg">
          {number}
        </span>
      </div>
    </div>

    {/* العناوين - عدلت الألوان لـ slate-900 عشان تظهر بوضوح على الخلفية البيضاء */}
    <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-500 text-sm max-w-[200px] leading-relaxed">
      {desc}
    </p>
  </motion.div>
);
  



interface Client {
  name: string;
  logo: string;
  feedback: { [key: string]: string }; 
}
const CLIENTS: Client[] = [
  { 
    name: "شركة تبكو (TEPCO)", 
    logo: "images/tepco.jpg", 
    feedback: { 
      ar: "نحن سعداء جداً بمستوى الخدمة الاحترافية التي قدمتها شركة Staff Ready. كانوا حريصين على أدق التفاصيل في النقل والتنظيم، مما جعل تجربة العمل معهم مريحة ومثمرة للغاية. نوصي بهم بشدة لكل من يبحث عن الجودة والدقة.", 
      en: "We are extremely satisfied with the professional service provided by Staff Ready. They were meticulous in every detail regarding transportation and coordination, making our collaboration comfortable and highly productive. We highly recommend them to anyone seeking quality and precision." 
    } 
  },
  { 
    name: "مدرسة الفسيلة الإسلامية", 
    logo: "images/fis.jpg", 
    feedback: { 
      ar: "كان التعاون مع فريق Staff Ready تجربة استثنائية بكل المقاييس. التزامهم بالمواعيد والاحترافية في التعامل جعلنا نعتمد عليهم كشريك أساسي في جميع رحلاتنا وتنقلاتنا. شكراً لفريق العمل المتميز على جهودهم الدائمة.", 
      en: "Collaborating with the Staff Ready team was an exceptional experience by all standards. Their commitment to punctuality and professional conduct has made them our go-to partner for all our trips and logistics. Thanks to the dedicated team for their constant efforts." 
    } 
  },
  { 
    name: "مدرسة غرين هيلز", 
    logo: "images/Gh.jpg", 
    feedback: { 
      ar: "أكثر ما يميز Staff Ready هو المرونة في التعامل والقدرة على إدارة الأزمات بذكاء. لقد وفروا لنا تغطية كاملة واحترافية لم نكن لنجدها في مكان آخر. تجربة عمل نفخر بها ونتطلع لاستمرارها لسنوات قادمة.", 
      en: "What sets Staff Ready apart is their flexibility and their ability to handle crises intelligently. They provided us with comprehensive and professional coverage that we couldn't find anywhere else. We are proud of this partnership and look forward to continuing it for years to come." 
    } 
  },
  { 
    name: "مدرسة العظمة (Greatness)", 
    logo: "images/Gls.jpg", 
    feedback: { 
      ar: "الاحترافية التي لمسناها في Staff Ready تجاوزت توقعاتنا. فريق العمل يتمتع بخبرة واسعة وأدوات متطورة تجعل عملية النقل والخدمات اللوجستية تمر بسلاسة تامة. شكراً لكم على هذا المستوى المشرف من الخدمات.", 
      en: "The professionalism we experienced at Staff Ready exceeded our expectations. The team possesses vast experience and advanced tools that make transportation and logistics run seamlessly. Thank you for this commendable level of service." 
    } 
  },
  { 
    name: "مجموعة داود (DAOUD)", 
    logo: "images/DAOUD.jpg", 
    feedback: { 
      ar: "لا نتردد أبداً في ترشيح Staff Ready لأي جهة تطلب خدمات النقل السياحي واللوجستي. الخدمة دائماً في موعدها، والمركبات مجهزة على أعلى مستوى، والأهم من ذلك هو التعامل الراقي من قبل السائقين وفريق الدعم.", 
      en: "We never hesitate to recommend Staff Ready to any entity looking for tourism and logistics services. The service is always on time, vehicles are equipped to the highest standard, and most importantly, the interaction from the drivers and the support team is top-notch." 
    } 
  },
  { 
    name: "شركة ناسيتا (NACITA)", 
    logo: "images/Ncls.jpg", 
    feedback: { 
      ar: "لقد كانت تجربة عمل ناجحة وموفقة جداً. Staff Ready أثبتوا أنهم ليسوا مجرد مقدم خدمة، بل شركاء نجاح يهتمون بتقديم أفضل النتائج لعملائهم. الالتزام والجودة هي العنوان الحقيقي لتعاملاتهم معنا.", 
      en: "It has been a very successful and rewarding business experience. Staff Ready have proven they are not just a service provider, but partners in success who care about delivering the best results for their clients. Commitment and quality are the true hallmarks of their dealings with us." 
    } 
  },
  { 
    name: "شركة النصر للمرافق", 
    logo: "images/EL NASR.jpg", 
    feedback: { 
      ar: "شكراً على الدعم المستمر والحلول اللوجستية الذكية التي قدمتموها. التعامل معكم اتسم بالوضوح والشفافية التامة، وهو ما نبحث عنه دائماً في أي شراكة عمل. نبارك لكم هذا المستوى المتميز.",
      en: "Thank you for the continuous support and the smart logistical solutions you provided. Dealing with you has been characterized by clarity and total transparency, which is what we always look for in any business partnership. We congratulate you on this outstanding level." 
    } 
  },
];
export default function StaffReadyLanding( ) {
const CONTACT_PERSONS = [
    { name: "أ/ عربي العزازي", phone: "01095225309" },
    { name: "أ/ جمال القاضي", phone: "01004831005" },
    { name: "أ/ ادهم فتحي", phone: "01146950677" },
    { name: "أ/ علاء معوض", phone: "01116226300" },
];


  const SOCIAL_LINKS = [
    { name: "واتساب", url: "https://wa.me/201095225309", color: "#2f3b86" },
    { name: "فيسبوك", url: "https://www.facebook.com/share/17ZLoodYBo/ ", color: "#1877F2" },
    { name: "تيك توك", url: "https://www.tiktok.com/@staffready0?_r=1&_t=ZS-97Gjk1ZGB9N ", color: "#40435e" },
    { name: "إنستجرام", url: " https://www.instagram.com/staff_ready?igsh=ZDM1M3FuemY1N21w", color: "#3330ca" },
  ];
// تهيئة القيم الافتراضية لمنع تعارض حالة العرض بين السيرفر والمتصفح
  const [dark, setDark] = useState<boolean>(true);
  const [lang, setLang] = useState<Lang>("ar");
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
// جلب إعدادات الثيم واللغة من ذاكرة المتصفح بعد تحميل المكون
  useEffect(() => {
    const savedTheme = window.localStorage.getItem("sr-theme");
    if (savedTheme === "light") setDark(false);
    else if (savedTheme === "dark") setDark(true);
    else setDark(window.matchMedia("(prefers-color-scheme: dark)").matches);

    const savedLang = window.localStorage.getItem("sr-lang") as Lang | null;
    if (savedLang === "en" || savedLang === "ar") setLang(savedLang);

    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
    window.localStorage.setItem("sr-theme", dark ? "dark" : "light");
  }, [dark, mounted]);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    window.localStorage.setItem("sr-lang", lang);
  }, [lang, mounted]);

  const L = t[lang];
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <div dir={dir} className="min-h-screen bg-background text-foreground antialiased">

{/* Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-2xl bg-background/60 border-b border-border/60 shadow-lg shadow-primary/5"
            : "backdrop-blur-md bg-background/30 border-b border-transparent"
        }`}
      >
        <nav className="w-full px-5 h-20 flex items-center justify-between">
          <motion.a
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0, rotate: [0, -8, 7, -5, 4, -2, 0] }}
            transition={{
              opacity: { delay: 0.3 },
              x: { duration: 0.5 },
              rotate: { duration: 1.1, delay: 0.4, ease: "easeInOut" },
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 group"
          >
            <div className="relative h-12 md:h-14 w-12 md:w-14 rounded-2xl overflow-hidden bg-white ring-1 ring-primary/30 shadow-md shadow-primary/20 transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-primary/40">
              <img 
  src="images/logo.jpg" 
  alt="STAFF READY logo" 
  className="h-full w-full object-contain" 
  loading="eager" 
/>
            </div>
            <span className="hidden sm:inline font-extrabold tracking-tight text-lg leading-none" dir="ltr">
              STAFF <span className="text-primary">READY</span>
            </span>
          </motion.a>

          {/* Center nav links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            
            {[
              { href: "#", label: L.nav.home },
              { href: "#services", label: L.nav.services },
              { href: "#fleet", label: L.nav.fleet },
              { href: "#luxury-fleet", label: lang === 'ar' ? 'الأسطول الفاخر' : 'Luxury Fleet' },
              { href: "#about", label: lang === 'ar' ? 'من نحن' : 'About Us' },
              { href: "#features", label: lang === 'ar' ? 'لماذا تختارنا' : 'Why Us' },
              { href: "#testimonials", label: lang === 'ar' ? 'تجارب عملائنا' : 'Our Experience' },
              { href: "#contact", label: L.nav.contact },
                        ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="relative py-1 transition-colors hover:text-primary active:text-primary after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-full after:bg-primary after:origin-right after:scale-x-0 hover:after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold shadow-lg shadow-primary/30 hover:scale-[1.05] hover:shadow-primary/50 transition-all duration-300"
            >
              {L.bookNow}
            </a>

            {/* Language switcher  زر تبديل اللغه*/}
            <button
              aria-label="Toggle language"
              onClick={() => setLang((l) => (l === "ar" ? "en" : "ar"))}
              className="inline-flex items-center gap-1.5 h-10 px-3 rounded-full border border-border hover:bg-accent active:bg-accent transition text-xs font-semibold"
            >
              <Languages className="h-4 w-4" />
              {lang === "ar" ? "EN" : "ع"}
            </button>
            <button
              aria-label="Toggle theme"
              onClick={() => setDark((d) => !d)}
              className="h-10 w-10 grid place-items-center rounded-full border border-border hover:bg-accent active:bg-accent transition"
            >
              {/* عرض عنصر فارغ قبل تحميل المكون لضمان توافق */}
              {!mounted ? (
                <span className="h-5 w-5" />
              ) : dark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <button
              aria-label="Menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden h-10 w-10 grid place-items-center rounded-full border border-border"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur px-5 py-4 flex flex-col gap-3 text-sm font-medium">
            <a href="#" onClick={() => setMenuOpen(false)}>{L.nav.home}</a>
            <a 
           href="#services" 
       onClick={() => setMenuOpen(false)} 
     className="nav-link hover:text-sky-500 active:text-sky-600 transition-colors duration-300"
      >
     {lang === 'ar' ? 'الخدمات' : 'Services'}
     </a>
            <a href="#fleet" onClick={() => setMenuOpen(false)}>{L.nav.fleet}</a>
           <a href="#luxury-fleet" onClick={() => setMenuOpen(false)} className="py-2 hover:text-sky-400 active:text-sky-500 transition-colors">
          {lang === 'ar' ? 'الأسطول الفاخر' : 'Luxury Fleet'}
           </a>
            <a href="#testimonials" onClick={() => setMenuOpen(false)} className="py-2 hover:text-sky-400 active:text-sky-500  transition-colors">
            {lang === 'ar' ? 'تجارب عملائنا' : 'Our Experience'}
            </a>
<a href="#about" onClick={() => setMenuOpen(false)} className="hover:text-sky-400 active:text-sky-500 transition-colors duration-300 font-bold">
            {lang === 'ar' ? "من نحن" : "About Us"}
            </a>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="inline-flex w-fit items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 font-semibold">
              {L.bookNow}
            </a>
          </div>
        )}
      </header>
      {/* Hero — minimal, image-first, hover reveals text */}
      <section className="group/hero relative isolate overflow-hidden min-h-[88vh] flex items-center justify-center cursor-default">
        {/* Background image with fade-in */}
        <motion.div
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          aria-hidden
          className="absolute inset-0 -z-20 bg-center bg-cover"
          style={{ backgroundImage: `url('${heroBg}')` }}
        />
        {/* Overlay — light by default, darker on hover */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-black/20 group-hover/hero:bg-black/65 group-active/hero:bg-black/65 transition-colors duration-700 ease-out"
        />
        {/* Single minimal heading: faint by default, bold + slide-up on hover */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="relative z-10 px-6 text-center text-center  text-white  text-4x1 md:text-7x1 font-black tracking-tighter
                     "
        >
          {L.heroTitle}
          <br />
          <span className="block mt-2 bg-gradient-to-l from-primary to-sky-300 bg-clip-text text-transparent text-3x1 md:text-6x1">
            {L.heroTitle2}
          </span>
        </motion.h1>
      </section>
{/* my services */}

<section id="services" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-500 scroll-mt-20">
  <div className="max-w-7xl mx-auto px-6">
    {/* العنوان مع أنيميشن */}
    <motion.h2 
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-bold text-center mb-16 text-slate-900 dark:text-white"
    >
      {lang === 'ar' ? 'خدماتنا' : 'Our Services'}
    </motion.h2>

    {/* الشبكة */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {myServices.map((service, index) => (
        <motion.div 
          key={service.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -10, scale: 1.02 }}          // تأثير الزوم والحركة عند الهوفر
          whileTap={{y: 0, scale: 0.98 }}
          
          className="group p-8 rounded-3xl bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 hover:shadow-2xl active:shadow-2x1 hover:shadow-sky-500/10  active:shadow-sky-500/10 transition-all duration-500"
        >
          {/* حاوية الأيقونة - يتم استدعاؤها من المصفوفة مباشرة */}
          <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg shadow-sky-500/20 group-hover:scale-110 group-active:scale-110 transition-transform duration-300">
            {service.icon}
          </div>
          
          {/* العنوان - يتغير لونه عند الـ Hover */}
          <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-sky-500  active:text-sky-500 transition-colors duration-300">
            {lang === 'ar' ? service.title.ar : service.title.en}
          </h3>
          
          {/* الوصف */}
          <p className="text-slate-600 dark:text-gray-400 leading-relaxed transition-colors duration-300">
            {lang === 'ar' ? service.desc.ar : service.desc.en}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</section>
{/* Fleet Gallery */}
<section id="fleet" className="mx-auto max-w-full px-5 py-24 scroll-mt-32">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-center mb-12"
  >
    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight dark:text-white">
      {lang === 'ar' ? 'أسطولنا' : 'Our Fleet'}
    </h2>
  </motion.div>

  <motion.div
    variants={stagger}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.1 }}
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
  >
    {fleetImages.map((img, i) => (
      <motion.div
        key={i}
        variants={fadeUp}
        whileHover={{ y: -10 }}
        whileTap={{ scale: 0.95 }}
        className="group relative overflow-hidden rounded-[2rem] bg-white dark:bg-slate-900 border border-sky-100 dark:border-slate-800 p-4 shadow-lg transition-all duration-300 cursor-pointer"
      >
        {/* الصورة مع الـ Overlay التفاعلي */}
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src={img.src}
            alt={img.name[lang]}
            loading="lazy"
            className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* الـ Overlay يظهر عند الهوفر أو الأكتف */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-center">
            <span className="text-white text-xl font-bold tracking-wide">
              {img.name[lang]}
            </span>
          </div>
        </div>

        {/* النص والوصف */}
        <div className="mt-4 p-2 transition-colors duration-300">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-sky-600 group-active:text-sky-700 transition-colors duration-300">
            {img.name[lang]}
          </h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-gray-400 group-hover:text-slate-800 dark:group-hover:text-sky-400 transition-colors duration-300">
            {img.desc[lang]}
          </p>
        </div>
      </motion.div>
    ))}
  </motion.div>
</section>
{/* luxury-fleet */}
<section id="luxury-fleet" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-500 scroll-mt-20">
  <div className="max-w-full mx-auto px-6">
    <motion.h2 
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-4xl md:text-5xl font-bold text-center mb-16 text-slate-900 dark:text-white"
    >
      {lang === 'ar' ? 'أسطولنا الفاخر والمكيف' : 'Our Luxury Climate-Controlled Fleet'}
    </motion.h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {luxuryFleetImages.map((car, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 1.10 }}

          viewport={{ once: true }}
          className="group relative rounded-3xl overflow-hidden shadow-lg bg-gray-50 dark:bg-slate-900 shadow-lg border border-gray-100 dark:border-slate-800 transition-all duration-300 hover:shadow-2xl  active:shadow-2x1 cursor-pointer"
        >
          {/* الصورة مع Overlay والاسم في المنتصف */}
          <div className="relative overflow-hidden rounded-t-3xl">
            <motion.img
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 1.10 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              src={car.src}
              alt={car.name.en}
              className="w-full h-72 object-cover"
            />
            {/* طبقة الضباب الأسود (Overlay) */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100  group-active:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white text-2xl font-bold tracking-wider">{car.name.en}</span>
            </div>
          </div>

          {/* الكلام: العنوان والوصف يتغير لونهم عند الهوفر */}
          <div className="p-6 transition-colors duration-300">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-sky-600 group-active:text-sky-700 transition-colors duration-300">
              {car.name[lang]}
            </h3>
            <p className="mt-3 text-sm text-slate-600 dark:text-gray-400 group-hover:text-slate-800 group-active:text-slate-800 dark:group-hover:text-sky-400  active:text-sky-500 transition-colors duration-300">
              {car.desc[lang]}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>
{/* About Us Section - من نحن */}
   
<section id="about" className="py-20 px-6 max-w-7xl mx-auto scroll-mt-32">
  <div className="grid md:grid-cols-2 gap-12 items-center">
    
    {/* قسم النص */}
    <div className="space-y-6">
      {/* العنوان */}
      <div className="text-3xl md:text-5xl font-black mb-6 cursor-pointer text-gray-900 dark:text-gray-100 hover:text-sky-500 active:text-sky-500 transition-colors duration-300">
        {lang === 'ar' ? 'من نحن ' : 'Who we are '}
        <span className="text-sky-500">Staff Ready</span>
      </div>
      
      {/* الفقرة */}
      <p className="text-gray-900 dark:text-gray-100 text-lg leading-relaxed font-medium cursor-pointer hover:text-sky-500 active:text-sky-500 transition-colors duration-300">
        {lang === 'ar' 
          ? 'Staff Ready هي شركة متخصصة في خدمات النقل الجماعي والفردي، من خلال أسطول متنوع من العربات الملاكي، الميكروباص، الميني باص، والأتوبيسات المكيفة.' 
          : 'Staff Ready is a specialized company in group and individual transport services, providing smart and flexible transport solutions for companies, schools, businesses, through a diverse fleet of cars, microbuses, minibuses, and air-conditioned buses.'}
      </p>
    </div>

    {/* قسم الصورة مع التأثيرات */}
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1.05 }} 
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 group cursor-pointer"
    >
      <img src="images/bus7.jpg" alt="Staff Ready Fleet" className="w-full h-full object-cover" />
      {/* الطبقة السوداء تظهر عند الهوفر أو الضغط */}
      <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-40 group-active:opacity-40" />
    </motion.div>
  </div>
</section>

      {/* Why Choose Us Section - لماذا تختارنا */}
<section id="features" className="py-24 bg-slate-50/5 dark:bg-white/5 backdrop-blur-sm scroll-mt-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-6xl font-black text-foreground italic">
              {lang === 'ar' ? "لماذا تختارنا؟" : "Why Choose Us?"}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { ar: "أسطول متنوع وحديث", en: "Modern Fleet" },
              { ar: "عربيات مكيفة بالكامل", en: "Full AC Vehicles" },
              { ar: "سائقين محترفين", en: "Professional Drivers" },
              { ar: "التزام كامل بالمواعيد", en: "Full Commitment" },
              { ar: "خدمة عملاء 24/7", en: "24/7 Support" },
              { ar: "أسعار تنافسية", en: "Competitive Prices" },
              { ar: "متابعة إدارية يومية", en: "Daily Management" },
              { ar: "راحة بالك مضمونة", en: "Peace of Mind" }
            ].map((feature, idx) => (


              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                whileHover={{ y: -12, scale: 1.02 }}
                whileTap={{ y: 0, scale: 1.02 }}
                className="p-8 rounded-[2rem] transition-all duration-300 shadow-xl
                           /* الألوان في الوضع العادي */
                           bg-white border-slate-200 
                           /* الألوان في الدارك مود - تعديل جذري للوضوح */
                           dark:bg-slate-900/80 dark:border-sky-500/10 dark:backdrop-blur-xl dark:shadow-sky-500/5
                           border flex flex-col items-center text-center gap-5 group"
              >
                {/* أيقونة "صح" واضحة جداً */}
                <div className="h-14 w-14 rounded-full bg-sky-500/15 dark:bg-sky-500/20 flex items-center justify-center text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300 font-bold">
                  ✓
                </div>
                
                {/* النص - تعديل لون الخط ليصبح أبيض صريح في الدارك مود */}
                <p className="font-extrabold text-xl leading-tight transition-colors duration-300
                             /* لون النص في الوضع العادي */
                             text-slate-800
                             /* لون النص في الدارك مود - أبيض واضح جداً */
                             dark:text-white 
                             group-hover:text-sky-500  active:text-sky-500 group-hover:dark:text-sky-400 active:dark:text-sky-400">
                  {lang === 'ar' ? feature.ar : feature.en}
                </p>
              </motion.div>
            ))}
          </div>
        
        </div>
      </section>
{/*  our Experince */}
<section id="testimonials" className="py-24 bg-gray-50 dark:bg-slate-900 transition-colors duration-500 scroll-mt-20">
  <div className="max-w-7xl mx-auto px-6">
    {/* العنوان */}
    <motion.h2 
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-bold text-center mb-16 text-slate-900 dark:text-white"
    >
      {lang === 'ar' ? 'آراء شركائنا في تجربتهم معنا' : 'What Our Partners Say About Us'}
    </motion.h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {CLIENTS.map((partner, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
          /* هنا دمجنا الأنيميشن مع التفاعل */
          className="group bg-white dark:bg-slate-950 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-slate-800 transition-all duration-500 hover:scale-105 active:scale-105 hover:shadow-2xl active:shadow-2xl"
        >
          {/* هوية الشركة */}
          <div className="flex items-center gap-4 mb-6">
            <img 
              src={partner.logo} 
              alt={partner.name} 
              className="w-14 h-14 object-contain rounded-full border border-gray-100 dark:border-slate-700 transition-transform duration-500 group-hover: rotate-12 active:rotate-12" 
            />
            <h3 className="font-bold text-lg text-slate-900 dark:text-white transition-colors duration-300 group-hover:text-sky-500  active:text-sky-600 dark:group-hover:text-sky-400  active:text-sky-400">
              {partner.name}
            </h3>
          </div>
          
          {/* نص الوصف */}
          <p className="text-slate-600 dark:text-gray-400 leading-relaxed italic transition-colors duration-300 group-hover:text-slate-900 dark:group-hover:text-gray-100">
            "{partner.feedback[lang]}"
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</section>
{/* Contact Section */}
        <section id="contact" className="scroll-mt-28 py-32 mx-auto max-w-7xl px-5 pb-24 text-right">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-card/60 backdrop-blur-xl p-8 rounded-3xl border border-border shadow-2xl">
            
            {/* يمين: أرقام التواصل */}
            <div>
              <h2 className="text-2xl font-bold mb-8 text-primary border-r-4 border-primary pr-4">للتواصل والاستفسار</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CONTACT_PERSONS.map((person, index) => (
                  <div key={index} className="p-4 rounded-2xl bg-secondary/20 border border-border/40 hover:border-primary/50  active:border-primary/50 transition-all">
                    <p className="text-sm text-muted-foreground mb-1 font-medium">{person.name}</p>
                    
     <a href={'tel:${person.phone}:'} className="text-md font-extrabold hover:text-primary  active:text-primary transition-colors block">
  {person.phone}
    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* شمال: روابط السوشيال ميديا */}
            <div className="flex flex-col justify-center">
              <h3 className="text-xl font-bold mb-6 text-center lg:text-right">تابعونا على منصاتنا</h3>
              <div className="grid grid-cols-2 gap-4">
                {SOCIAL_LINKS.map((link, index) => (
                  <a 
                    key={index} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
className="flex items-center justify-center gap-3 p-4 rounded-2xl border border-white/10 backdrop-blur-md font-semibold transition-all duration-300 hover:bg-white/10 hover:border-white/25 acti active:scale-95 group shadow-[0-0-15px-rgba(0,0,0,0.1)]lg hover:scale-95 active:scale-90 "
                    style={{ backgroundColor: link.color + '1A' , color: link.color}}
                  >

                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
<footer className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <img src="images/logo.jpg" alt="STAFF READY" className="h-7 w-7 object-contain rounded" />
            <span className="font-semibold text-foreground">STAFF READY</span>
          </div>
          <div>© {new Date().getFullYear()} كل الحقوق محفوظة</div>
        </div>
      </footer>
    </div>
  );
}