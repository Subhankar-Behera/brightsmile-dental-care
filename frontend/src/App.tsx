import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  HelpCircle,
  Award,
  BookOpen,
  Eye,
  Activity,
  ClipboardCheck,
  ShieldCheck,
  ChevronRight,
  Smile,
  AlertCircle,
  Calendar as CalendarIcon
} from 'lucide-react';

// Import custom components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SectionTitle from './components/SectionTitle';
import ServiceCard from './components/ServiceCard';
import DoctorCard from './components/DoctorCard';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Gallery from './components/Gallery';
import BookingFlow from './components/BookingFlow';
import ContactForm from './components/ContactForm';
import Modal from './components/Modal';

// Import dummy data
import { 
  DOCTORS_DATA, 
  SERVICES_DATA, 
  CLINIC_STATS, 
  CLINIC_TIMELINE, 
  CLINIC_CERTIFICATIONS 
} from './data/dummyData';
import { Service } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  
  // States for pre-selections in Booking Flow
  const [preselectedServiceId, setPreselectedServiceId] = useState<string>('srv-1');
  const [preselectedDoctorId, setPreselectedDoctorId] = useState<string>('any');

  // State for Service Detail Modal
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<Service | null>(null);

  // Hook for jumping directly into Booking with prefilled slots
  const handleBookService = (serviceId: string) => {
    setPreselectedServiceId(serviceId);
    setPreselectedDoctorId('any');
    setActiveTab('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookDoctor = (doctorId: string) => {
    setPreselectedDoctorId(doctorId);
    setPreselectedServiceId('srv-1'); // default
    setActiveTab('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openServiceModal = (service: Service) => {
    setSelectedServiceForModal(service);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans selection:bg-blue-600 selection:text-white antialiased">
      
      {/* 1. Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Page Layout spacer for fixed Navbar */}
      <div className="pt-24 flex-grow">
        
        {/* =========================================================
            VIEW 1: HOME PAGE
            ========================================================= */}
        {activeTab === 'home' && (
          <div className="space-y-20 pb-20">
            
            {/* Hero Section */}
            <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                
                {/* Left Side text content */}
                <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                  <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider text-blue-600 bg-blue-50 border border-blue-100/50 uppercase shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
                    <span>Now Accepting New Patients</span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-slate-950 leading-tight">
                    Your Pathway to a <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                      Radiant, Healthy Smile
                    </span>
                  </h1>

                  <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed max-w-2xl mx-auto lg:mx-0">
                    Experience world-class, stress-free dental care at BrightSmile. Our dedicated clinical team combines advanced diagnostics, biocompatible materials, and a warm environment designed around your absolute comfort.
                  </p>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                    <button
                      onClick={() => {
                        setPreselectedDoctorId('any');
                        setPreselectedServiceId('srv-1');
                        setActiveTab('book');
                      }}
                      className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Schedule Free Consultation</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => setActiveTab('services')}
                      className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold rounded-2xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Explore Dental Treatments</span>
                    </button>
                  </div>

                  {/* Trust indicator indicators */}
                  <div className="pt-6 border-t border-slate-100 flex flex-wrap justify-center lg:justify-start items-center gap-6 text-xs text-slate-500 font-medium font-sans">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>99.8% Perfect Outcomes</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Direct Claims to Major PPOs</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>15+ Years Clinical Trust</span>
                    </div>
                  </div>
                </div>

                {/* Right Side Image Box */}
                <div className="lg:col-span-5 relative">
                  <div className="relative mx-auto max-w-md lg:max-w-none">
                    
                    {/* Background glowing gradients */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-3xl opacity-20 blur-xl"></div>
                    
                    {/* Visual Frame */}
                    <div className="relative bg-white border border-slate-100 rounded-3xl overflow-hidden p-3.5 shadow-2xl">
                      <img
                        src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80"
                        alt="Modern Dental Consultation Room"
                        referrerPolicy="no-referrer"
                        className="w-full h-80 object-cover rounded-2xl"
                      />
                    </div>

                    {/* Float cards */}
                    <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-xs border border-slate-100 rounded-2xl p-4 shadow-xl flex items-center gap-3.5 max-w-[210px]">
                      <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-sm font-extrabold text-slate-900 font-display">15,000+</span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide font-sans">Happy Patients Served</span>
                      </div>
                    </div>

                    <div className="absolute -top-6 -right-6 bg-white/95 backdrop-blur-xs border border-slate-100 rounded-2xl p-4 shadow-xl flex items-center gap-3.5 max-w-[190px]">
                      <div className="p-2 rounded-xl bg-cyan-50 text-cyan-600">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-sm font-extrabold text-slate-900 font-display">ADA Gold</span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide font-sans">Practice Standard</span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </header>

            {/* Clinic Highlights (Emergency, PPO, scans) */}
            <section className="bg-white border-y border-slate-100 py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <SectionTitle
                  badge="Clinical Highlights"
                  title="Crafted Around Patient Wellness"
                  subtitle="We strive to strip away the stress and traditional anxieties of dental clinics by delivering high-tech, welcoming practices."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {/* Item 1 */}
                  <div className="p-6 rounded-2xl border border-slate-50 bg-slate-50/20 hover:bg-slate-50/50 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 shadow-xs">
                      <Activity className="w-5 h-5 animate-pulse" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 font-display mb-2">Same-Day Emergencies</h3>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-sans">
                      Experiencing extreme toothaches or dental fractures? We hold emergency clinical slots open daily for urgent patient care.
                    </p>
                  </div>

                  {/* Item 2 */}
                  <div className="p-6 rounded-2xl border border-slate-50 bg-slate-50/20 hover:bg-slate-50/50 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 shadow-xs">
                      <ClipboardCheck className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 font-display mb-2">PPO Insurance Accepted</h3>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-sans">
                      Our financial team directly bills major PPO networks on your behalf to completely maximize your dental coverage.
                    </p>
                  </div>

                  {/* Item 3 */}
                  <div className="p-6 rounded-2xl border border-slate-50 bg-slate-50/20 hover:bg-slate-50/50 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4 shadow-xs">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 font-display mb-2">3D Digital Imaging</h3>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-sans">
                      No more uncomfortable putty molds! We utilize precision high-definition 3D scanners for orthodontic and implant maps.
                    </p>
                  </div>

                  {/* Item 4 */}
                  <div className="p-6 rounded-2xl border border-slate-50 bg-slate-50/20 hover:bg-slate-50/50 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 shadow-xs">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 font-display mb-2">Biocompatible Materials</h3>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-sans">
                      We strictly use premium mercury-free composite fillings and medical-grade titanium dental posts to support your core system.
                    </p>
                  </div>
                </div>

              </div>
            </section>

            {/* Statistics Row */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="bg-slate-950 text-white rounded-3xl p-8 md:p-12 shadow-xl grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                {CLINIC_STATS.map((stat, idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-display text-blue-400">
                      {stat.value}
                    </p>
                    <p className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest font-sans">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Why Choose Us */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                
                {/* Left Side: Images Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=400&q=80"
                    alt="Spacious treatment suite"
                    referrerPolicy="no-referrer"
                    className="rounded-2xl h-64 w-full object-cover shadow-sm border border-slate-100"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=400&q=80"
                    alt="High precision scaling instruments"
                    referrerPolicy="no-referrer"
                    className="rounded-2xl h-64 w-full object-cover shadow-sm border border-slate-100 mt-8"
                  />
                </div>

                {/* Right Side: Copy */}
                <div className="space-y-6">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full uppercase tracking-wider">
                    Our Patient Promise
                  </span>
                  
                  <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-950 tracking-tight">
                    Why Choose BrightSmile for Your Smile Transformation?
                  </h2>

                  <p className="text-slate-600 font-sans text-sm md:text-base leading-relaxed">
                    At BrightSmile Dental Care, we do not treat patients as numbers. We believe oral health is deeply connected to overall systemic wellness, which is why we spend ample time consulting, designing personalized, restorative treatments, and preserving natural enamel structure.
                  </p>

                  <ul className="space-y-3.5 text-xs md:text-sm font-semibold text-slate-700 font-sans">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                      <span>Comfortable, sedation-supported surgical setups for anxious patients.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                      <span>Highly trained Ivy League graduates and board-certified specialists.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                      <span>Completely transparent pricing frameworks with no hidden fees.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                      <span>Ultra-hygienic clinical suites exceeding OSHA guidelines.</span>
                    </li>
                  </ul>
                </div>

              </div>
            </section>

            {/* Services Preview Section */}
            <section className="bg-slate-50 border-y border-slate-100/50 py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                  <div className="max-w-2xl">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider text-blue-600 bg-blue-50 border border-blue-100/50 uppercase shadow-xs">
                      Our Specialties
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-slate-950 mt-3 mb-4">
                      Featured Dental Services
                    </h2>
                    <p className="text-sm md:text-base text-slate-600 font-sans leading-relaxed">
                      We cover everything from minor scale & polishes to advanced cosmetic makeovers and reconstructive implantology.
                    </p>
                  </div>
                  
                  <button
                    onClick={() => {
                      setActiveTab('services');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-blue-600 hover:text-blue-700 border border-slate-200 hover:border-slate-300 font-bold text-xs shadow-xs transition-colors cursor-pointer shrink-0 h-fit"
                  >
                    <span>View All Services</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Display first 3 featured services */}
                  {SERVICES_DATA.slice(0, 3).map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      onBookNow={handleBookService}
                      onViewDetails={openServiceModal}
                    />
                  ))}
                </div>

              </div>
            </section>

            {/* Doctors Preview Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="max-w-2xl">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider text-blue-600 bg-blue-50 border border-blue-100/50 uppercase shadow-xs">
                    Our Experts
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-slate-950 mt-3 mb-4">
                    Meet Our Dental Specialists
                  </h2>
                  <p className="text-sm md:text-base text-slate-600 font-sans leading-relaxed">
                    Our clinic is staffed by passionate, highly educated specialists who actively educate patients and deliver high-precision outcomes.
                  </p>
                </div>
                
                <button
                  onClick={() => {
                    setActiveTab('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-blue-600 hover:text-blue-700 border border-slate-200 hover:border-slate-300 font-bold text-xs shadow-xs transition-colors cursor-pointer shrink-0 h-fit"
                >
                  <span>About Our Practice</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {DOCTORS_DATA.map((doctor) => (
                  <DoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    onBookWithDoctor={handleBookDoctor}
                  />
                ))}
              </div>

            </section>

            {/* Testimonials */}
            <section className="bg-slate-50 border-y border-slate-100/50 py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle
                  badge="Patient Reviews"
                  title="Smiles That Speak for Themselves"
                  subtitle="We take great pride in creating amazing outcomes. Hear what our patients have to say about their BrightSmile experiences."
                />
                <Testimonials />
              </div>
            </section>

            {/* FAQs */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionTitle
                badge="Answering Your Queries"
                title="Frequently Asked Questions"
                subtitle="Got questions about scheduling, insurance coverage, or standard checkups? We have compiled detailed answers to assist you."
              />
              <FAQ />
            </section>

            {/* Direct Booking CTA Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-3xl p-8 md:p-12 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left relative overflow-hidden">
                
                {/* Visual decorations */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_40%)]"></div>
                
                <div className="relative z-10 max-w-2xl space-y-4">
                  <h3 className="text-2xl md:text-3xl font-extrabold font-display">
                    Ready to Experience Premium Dental Care?
                  </h3>
                  <p className="text-sm md:text-base text-blue-50 font-sans leading-relaxed">
                    Don’t postpone your smile. Lodge a formal appointment request today and let our clinical administrative staff book you in with your preferred doctor.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setPreselectedDoctorId('any');
                    setPreselectedServiceId('srv-1');
                    setActiveTab('book');
                  }}
                  className="relative z-10 w-full lg:w-auto px-8 py-4 bg-white hover:bg-slate-50 active:scale-95 text-blue-600 font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CalendarIcon className="w-5 h-5 text-blue-600" />
                  <span>Book Appointment Now</span>
                </button>
              </div>
            </section>

          </div>
        )}

        {/* =========================================================
            VIEW 2: SERVICES PAGE
            ========================================================= */}
        {activeTab === 'services' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16 pb-20">
            
            <SectionTitle
              badge="Clinical Catalog"
              title="Comprehensive Dental Treatments"
              subtitle="From preventative scaling to complex dental implants and cosmetic makeovers, we provide premium care backed by cutting-edge technology."
            />

            {/* Grid of All 7 Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES_DATA.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onBookNow={handleBookService}
                  onViewDetails={openServiceModal}
                />
              ))}
            </div>

            {/* Guarantee Callout Banner */}
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shrink-0">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div className="space-y-1 text-center md:text-left">
                <h4 className="text-base font-bold text-slate-900 font-display">
                  Our 100% Patient Satisfaction Guarantee
                </h4>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-sans max-w-4xl">
                  We are deeply committed to exceptional clinical results. If you experience any sensitivity, bite misalignment, or issues after composite restorations, fillings, or cleanings, contact us within 14 days and we will accommodate a priority adjustment session completely free of charge.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* =========================================================
            VIEW 3: ABOUT PAGE
            ========================================================= */}
        {activeTab === 'about' && (
          <div className="space-y-20 pb-20">
            
            {/* Story & Mission Block */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                
                {/* Copy */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider text-blue-600 bg-blue-50 border border-blue-100/50 uppercase shadow-xs">
                    <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                    <span>Our Clinical Narrative</span>
                  </div>

                  <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight text-slate-950">
                    Redefining the Dental Experience Since 2011
                  </h1>

                  <p className="text-slate-600 font-sans text-sm md:text-base leading-relaxed">
                    BrightSmile Dental Care was founded with a singular, disruptive vision: to build a dental office that patients actually enjoy visiting. We understood that standard dentistry carried historic associations of pain, clinical coldness, and heavy stress. 
                  </p>
                  
                  <p className="text-slate-600 font-sans text-sm md:text-base leading-relaxed">
                    By combining welcoming, lounge-like lobbies, gentle sedation options, and highly educational physicians, we transformed oral care into a restorative practice centered around whole-body wellness. Today, we stand as the region’s premier practice for family orthodontic, cosmetic, and implant dentistry.
                  </p>

                  {/* Mission / Vision Box */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                    <div className="space-y-2">
                      <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
                        <span>Our Mission</span>
                      </h3>
                      <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-sans">
                        To preserve and elevate oral health by combining biocompatible therapeutics, precision digital diagnostics, and an empathetic environment designed around patient safety.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-cyan-500 rounded-full"></span>
                        <span>Our Vision</span>
                      </h3>
                      <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-sans">
                        To set a nationwide dental healthcare benchmark for stress-free family experiences, transparency of clinical pricing, and state-of-the-art diagnostic innovation.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Imagery split */}
                <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <img
                      src="https://images.unsplash.com/photo-1594824813573-246434e3b96f?auto=format&fit=crop&w=350&q=80"
                      alt="Doctor Consulting"
                      referrerPolicy="no-referrer"
                      className="rounded-2xl h-48 w-full object-cover shadow-xs border border-slate-100"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&w=350&q=80"
                      alt="Staff team members"
                      referrerPolicy="no-referrer"
                      className="rounded-2xl h-64 w-full object-cover shadow-xs border border-slate-100"
                    />
                  </div>
                  <div className="space-y-4 pt-8">
                    <img
                      src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=350&q=80"
                      alt="Specialist female dentist"
                      referrerPolicy="no-referrer"
                      className="rounded-2xl h-64 w-full object-cover shadow-xs border border-slate-100"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=350&q=80"
                      alt="Precision scanning technology"
                      referrerPolicy="no-referrer"
                      className="rounded-2xl h-48 w-full object-cover shadow-xs border border-slate-100"
                    />
                  </div>
                </div>

              </div>
            </section>

            {/* Doctors Section */}
            <section className="bg-slate-50 border-y border-slate-100/50 py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle
                  badge="Medical Board"
                  title="Meet Our Board-Certified Clinicians"
                  subtitle="Our dentists are graduates from Ivy League institutions, holding specialized credentials and memberships on elite oral surgical boards."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {DOCTORS_DATA.map((doctor) => (
                    <DoctorCard
                      key={doctor.id}
                      doctor={doctor}
                      onBookWithDoctor={handleBookDoctor}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Timeline */}
            <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionTitle
                badge="Practice Heritage"
                title="Our Journey of Clinical Innovation"
                subtitle="A retrospective of how we expanded from a single chair operation to the state's most awarded family dental clinical hub."
              />

              <div className="relative border-l border-slate-200 ml-4 space-y-12">
                {CLINIC_TIMELINE.map((step, idx) => (
                  <div key={idx} className="relative pl-8">
                    {/* Floating circular dot */}
                    <div className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full border-4 border-white bg-blue-600 shadow-xs flex items-center justify-center"></div>
                    
                    <div>
                      <span className="inline-block text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md mb-2 font-display">
                        {step.year}
                      </span>
                      <h3 className="text-base md:text-lg font-bold text-slate-900 font-display">
                        {step.title}
                      </h3>
                      <p className="text-xs md:text-sm text-slate-600 font-sans mt-1.5 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Certifications & Badges */}
            <section className="bg-white border-y border-slate-100 py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle
                  badge="Safety & Compliance"
                  title="Accredited Standards & Certifications"
                  subtitle="BrightSmile strictly operates under medical-grade sterile frameworks, exceeding guidelines for optimal patient safety."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {CLINIC_CERTIFICATIONS.map((cert, idx) => (
                    <div key={idx} className="p-5 rounded-2xl border border-slate-100 bg-slate-50/20 text-center space-y-2">
                      <div className="mx-auto w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Award className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 font-display leading-tight">{cert.title}</h4>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-sans">{cert.org}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Gallery Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionTitle
                badge="Practice Gallery"
                title="Explore Our State-of-the-Art Facilities"
                subtitle="Review our calm lounges, clinical treatment suites, and high-definition scanning devices before taking a single step inside."
              />
              <Gallery />
            </section>

          </div>
        )}

        {/* =========================================================
            VIEW 4: BOOK APPOINTMENT PAGE (MAIN WIZARD)
            ========================================================= */}
        {activeTab === 'book' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-10 pb-20">
            
            <SectionTitle
              badge="Scheduling Center"
              title="Request Your Dental Appointment"
              subtitle="Lodge your preferred date, timeslot, and doctor. Our clinical administration team will review schedule availability and connect with you within 12-24 hours."
            />

            {/* Main Interactive Booking Wizard */}
            <BookingFlow 
              initialServiceId={preselectedServiceId} 
              initialDoctorId={preselectedDoctorId}
            />

          </div>
        )}

        {/* =========================================================
            VIEW 5: CONTACT PAGE
            ========================================================= */}
        {activeTab === 'contact' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16 pb-20">
            
            <SectionTitle
              badge="Support Hub"
              title="Reach Out to Our Dental Office"
              subtitle="Have questions about booking availability or urgent dental situations? Use the secure contact form below or call us directly."
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Clinic Contact Cards */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Visual Location detail cards */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-md space-y-6">
                  <h3 className="text-lg font-bold font-display text-slate-900 border-b border-slate-50 pb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <span>Clinic Directory</span>
                  </h3>

                  <ul className="space-y-4 text-xs md:text-sm font-sans">
                    <li className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="block font-bold text-slate-800 font-display">BrightSmile Dental Care</span>
                        <span className="text-slate-600 block mt-0.5">120 Wellness Blvd, Suite 300, Medical Plaza, NY 10023</span>
                      </div>
                    </li>

                    <li className="flex items-start gap-3 border-t border-slate-50 pt-4">
                      <Phone className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="block font-bold text-slate-800 font-display">Patient Hotline</span>
                        <a href="tel:5551234567" className="text-slate-600 block hover:text-blue-600 transition-colors mt-0.5">(555) 123-4567</a>
                      </div>
                    </li>

                    <li className="flex items-start gap-3 border-t border-slate-50 pt-4">
                      <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="block font-bold text-slate-800 font-display">General Inquiries</span>
                        <a href="mailto:info@brightsmiledental.com" className="text-slate-600 block hover:text-blue-600 transition-colors break-all mt-0.5">info@brightsmiledental.com</a>
                      </div>
                    </li>

                    <li className="flex items-start gap-3 border-t border-slate-50 pt-4">
                      <Clock className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="block font-bold text-rose-600 font-display flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping shrink-0"></span>
                          <span>Emergency Line</span>
                        </span>
                        <a href="tel:5559990100" className="text-rose-500 font-extrabold block mt-0.5">(555) 999-0100</a>
                        <span className="text-xs text-rose-400 mt-0.5 block">Call 24/7 for dental fractures, severe nerve trauma, or knocking.</span>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Working Hours */}
                <div className="bg-slate-900 text-slate-400 rounded-3xl p-6 md:p-8 shadow-md space-y-4">
                  <h3 className="text-base font-bold font-display text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <span>Working Hours</span>
                  </h3>

                  <div className="space-y-2.5 text-xs font-sans">
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span>Monday - Thursday</span>
                      <span className="font-semibold text-white">09:00 AM - 05:00 PM</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span>Friday</span>
                      <span className="font-semibold text-white">09:00 AM - 04:00 PM</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span>Saturday</span>
                      <span className="font-semibold text-white">09:00 AM - 01:00 PM</span>
                    </div>
                    <div className="flex justify-between text-rose-400">
                      <span>Sunday</span>
                      <span className="font-bold uppercase tracking-wider text-[10px] bg-rose-950/40 border border-rose-900/40 px-1.5 py-0.5 rounded">Closed</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Interactive Map Embed & Contact Form */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* Contact Form Component */}
                <ContactForm />

                {/* Google Map Embedded Frame */}
                <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-lg p-3.5 space-y-3">
                  <div className="flex items-center justify-between px-2 pt-1">
                    <div>
                      <h4 className="text-sm font-bold font-display text-slate-900 leading-none">Directions</h4>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans">Times Square Medical Plaza, NYC</span>
                    </div>
                    <a
                      href="https://maps.google.com/?q=Times+Square+New+York+City"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 text-[10px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-100/30 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Open on Mobile Map</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Responsive Iframe embed */}
                  <div className="h-72 w-full bg-slate-100 rounded-2xl overflow-hidden relative border border-slate-50">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968459364!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1655000000000!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Google Map Location Embed"
                    ></iframe>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>

      {/* Reusable Modal Frame for Service Benefits and detailed descriptions */}
      <Modal
        isOpen={selectedServiceForModal !== null}
        onClose={() => setSelectedServiceForModal(null)}
        title={selectedServiceForModal?.name || ''}
      >
        {selectedServiceForModal && (
          <div className="space-y-6 font-sans text-slate-700">
            {/* Visual Header image */}
            <div className="h-48 w-full rounded-2xl overflow-hidden relative">
              <img
                src={selectedServiceForModal.image}
                alt={selectedServiceForModal.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-slate-950/25"></div>
            </div>

            {/* Detailed Description */}
            <div className="space-y-3.5">
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100/50 px-2.5 py-1 rounded-md uppercase tracking-wider">
                About the Treatment
              </span>
              <p className="text-sm text-slate-600 leading-relaxed font-sans">
                {selectedServiceForModal.detailedDescription}
              </p>
            </div>

            {/* Pricing details and Duration */}
            <div className="grid grid-cols-2 gap-4 border-y border-slate-100/80 py-4 text-xs font-sans font-semibold text-slate-600">
              <div>
                <span className="text-slate-400 block uppercase tracking-wider text-[9px] mb-1">Estimated Cost Range</span>
                <span className="text-slate-900 font-extrabold text-sm font-display">{selectedServiceForModal.estimatedPrice}</span>
              </div>
              <div>
                <span className="text-slate-400 block uppercase tracking-wider text-[9px] mb-1">Standard Duration</span>
                <span className="text-slate-900 font-extrabold text-sm font-display">{selectedServiceForModal.duration}</span>
              </div>
            </div>

            {/* Benefits Check List */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100/50 px-2.5 py-1 rounded-md uppercase tracking-wider">
                Treatment Advantages
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedServiceForModal.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs font-semibold text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action booking inside modal */}
            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => setSelectedServiceForModal(null)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Close details
              </button>
              <button
                onClick={() => {
                  const serviceId = selectedServiceForModal.id;
                  setSelectedServiceForModal(null);
                  handleBookService(serviceId);
                }}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-sm hover:shadow-md cursor-pointer"
              >
                <span>Book This Treatment</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* 5. Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}
