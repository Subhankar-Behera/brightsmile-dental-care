import { Doctor, Service } from "../types";

export const DOCTORS_DATA: Doctor[] = [
  {
    id: "doc-1",
    name: "Dr. Ananya Sharma",
    specialty: "General & Cosmetic Dentist",
    qualification: "BDS, MDS – AIIMS New Delhi",
    experience: "12 Years",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&h=600&fit=crop&crop=faces",
    rating: 4.9,
    reviewsCount: 148,
    bio: "Dr. Ananya Sharma specializes in restorative and cosmetic dentistry with a strong focus on preventive oral healthcare and smile enhancement.",
    availableDays: [1, 2, 3, 4],
    availableTimes: [
      "09:00 AM",
      "10:00 AM",
      "11:00 AM",
      "01:00 PM",
      "02:00 PM",
      "03:00 PM",
      "04:00 PM",
    ],
  },
  {
    id: "doc-2",
    name: "Dr. Rahul Verma",
    specialty: "Orthodontist",
    qualification: "BDS, MDS Orthodontics – Manipal University",
    experience: "15 Years",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=600&h=600&fit=crop&crop=faces",
    rating: 4.8,
    reviewsCount: 204,
    bio: "Dr. Rahul Verma specializes in braces, clear aligners, and smile correction for children and adults.",
    availableDays: [1, 3, 5],
    availableTimes: [
      "09:30 AM",
      "10:30 AM",
      "11:30 AM",
      "02:00 PM",
      "03:00 PM",
      "04:00 PM",
    ],
  },
  {
    id: "doc-3",
    name: "Dr. Priya Nair",
    specialty: "Pediatric Dentist",
    qualification: "BDS, MDS Pediatric Dentistry – KMC Manipal",
    experience: "8 Years",
    image:
      "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=600&h=600&fit=crop&crop=faces",
    rating: 4.9,
    reviewsCount: 112,
    bio: "Dr. Priya Nair provides gentle and child-friendly dental care, helping young patients feel comfortable during every visit.",
    availableDays: [2, 4, 5],
    availableTimes: [
      "09:00 AM",
      "10:00 AM",
      "11:00 AM",
      "01:30 PM",
      "02:30 PM",
      "03:30 PM",
    ],
  },
  {
    id: "doc-4",
    name: "Dr. Arjun Patel",
    specialty: "Oral & Maxillofacial Surgeon",
    qualification: "BDS, MDS Oral Surgery – Saveetha University",
    experience: "18 Years",
    image:
      "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=600&h=600&fit=crop&crop=faces",
    rating: 5.0,
    reviewsCount: 310,
    bio: "Dr. Arjun Patel specializes in dental implants, wisdom tooth removal, oral surgery, and full-mouth rehabilitation.",
    availableDays: [1, 2, 4],
    availableTimes: [
      "09:00 AM",
      "10:30 AM",
      "11:30 AM",
      "01:00 PM",
      "02:30 PM",
      "04:00 PM",
    ],
  },
];

export const SERVICES_DATA: Service[] = [
  {
    id: "srv-1",
    name: "General Checkup",
    iconName: "ClipboardCheck",
    image:
      "https://images.pexels.com/photos/3845625/pexels-photo-3845625.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Comprehensive evaluation of teeth, gums, digital X-rays, and customized preventative hygiene advice.",
    detailedDescription:
      "Our signature clinical checkup includes a professional cleaning, thorough charting of existing and potential dental issues, digital low-radiation X-rays, visual oral cancer screening, and personalized preventative care instruction to keep your smile healthy and bright.",
    duration: "30-45 mins",
    estimatedPrice: "₹500 - ₹1,000",
    benefits: [
      "Prevent tooth decay and cavities",
      "Comprehensive gum disease assessment",
      "Detailed professional scale & polish",
      "Actionable treatment roadmap",
    ],
  },
  {
    id: "srv-2",
    name: "Root Canal Therapy",
    iconName: "Activity",
    image:
      "https://images.pexels.com/photos/4269694/pexels-photo-4269694.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Painless, highly advanced treatment designed to save severely decayed, damaged, or infected teeth.",
    detailedDescription:
      "Root canal therapy is a highly successful treatment designed to preserve your natural teeth and prevent the need for extraction. Using state-of-the-art rotary instruments and gentle anesthesia, we clear out deep infections and seal the inner canals painlessly.",
    duration: "60-90 mins",
    estimatedPrice: "₹4,000 - ₹8,000",
    benefits: [
      "Relieves persistent dental pain",
      "Saves the natural tooth from extraction",
      "Stops the spread of jawbone infection",
      "Fully restores normal biting force",
    ],
  },
  {
    id: "srv-3",
    name: "Teeth Whitening",
    iconName: "Sparkles",
    image:
      "https://images.pexels.com/photos/6812565/pexels-photo-6812565.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Professional in-office laser whitening designed to lift stubborn stains and brighten teeth by up to 8 shades.",
    detailedDescription:
      "Brighten your smile in a single session with our clinically tested, enamel-safe professional whitening treatment. We combine premium hydrogen peroxide whitening gels with active blue-light laser technology to give you stunning results in just under an hour.",
    duration: "45-60 mins",
    estimatedPrice: "₹6,000 - ₹15,000",
    benefits: [
      "Immediate, professional-grade results",
      "Enamel-safe, custom sensitivity barriers",
      "Lifts stubborn coffee, wine, and smoke stains",
      "Long-lasting brilliance with home support",
    ],
  },
  {
    id: "srv-4",
    name: "Braces & Clear Aligners",
    iconName: "Layers",
    image:
      "https://images.pexels.com/photos/6627563/pexels-photo-6627563.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Modern orthodontic treatments including custom clear aligners and sleek ceramic brackets.",
    detailedDescription:
      "Align your teeth and perfect your bite using our advanced invisible aligners or premium ceramic brackets. Customized 3D imaging allows you to preview your projected straight smile before even starting the treatment plan.",
    duration: "Multi-session plans",
    estimatedPrice: "₹29,999 - ₹54,999",
    benefits: [
      "Nearly invisible modern clear aligners",
      "Easier chewing and improved oral hygiene",
      "Fixes crossbites, overbites, and overcrowding",
      "Customized digital teeth tracking systems",
    ],
  },
  {
    id: "srv-5",
    name: "Dental Implants",
    iconName: "ShieldAlert",
    image:
      "https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Lifetime permanent tooth replacement option using premium biocompatible titanium root implants.",
    detailedDescription:
      "Dental implants are the gold standard for tooth replacement. A bio-friendly titanium post is securely integrated into the jawbone, acting as a natural root, and capped with a custom-milled premium zirconia crown that perfectly mimics natural teeth.",
    duration: "Surgical phase + healing",
    estimatedPrice: "₹25,000 - ₹50,000",
    benefits: [
      "Looks, feels, and functions like a real tooth",
      "Prevents bone loss and facial sagging",
      "Extremely durable (can last a lifetime)",
      "No slipping or movement during eating",
    ],
  },
  {
    id: "srv-6",
    name: "Pediatric Dentistry",
    iconName: "Smile",
    image:
      "https://images.pexels.com/photos/3779705/pexels-photo-3779705.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Gentle, friendly, and protective oral healthcare designed specifically for toddlers, children, and teens.",
    detailedDescription:
      "We focus on positive reinforcement, interactive dental games, and fun explanations to eliminate dental anxiety for our youngest patients. Treatments cover cavity preventative sealants, fluorides, gentle cleanings, and space maintainers.",
    duration: "30 mins",
    estimatedPrice: "₹600 - ₹1,500",
    benefits: [
      "Develops strong lifetime oral hygiene habits",
      "Fun, playful, anxiety-free atmosphere",
      "Cavity-repellent protective clear sealants",
      "Customized developmental monitoring",
    ],
  },
  {
    id: "srv-7",
    name: "Cosmetic Dentistry",
    iconName: "Heart",
    image:
      "https://images.pexels.com/photos/6812468/pexels-photo-6812468.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Premium composite fillings, porcelain veneers, and full-smile makeovers to create your dream aesthetic.",
    detailedDescription:
      "Our aesthetic porcelain veneers and composite bondings are custom-crafted to mask discolorations, fill gaps, correct chips, and resize teeth. Get a perfectly symmetrical, radiant, and custom-styled smile that boosts your self-confidence.",
    duration: "45-90 mins",
    estimatedPrice: "Varies on case",
    benefits: [
      "Hides chips, gaps, and severe stains",
      "Super thin, natural-looking porcelain shells",
      "Restores proportional smile symmetry",
      "Individually hand-crafted smile styles",
    ],
  },
];

export const TESTIMONIALS_DATA = [
  {
    id: "test-1",
    name: "Ishita Malhotra",
    role: "Clear Aligner Patient",
    content:
      "The care and precision at BrightSmile is absolutely unmatched! Dr. Rahul Verma and his team explained every detail of my orthodontic plan. Now my teeth are perfectly straight and I can't stop smiling!",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    id: "test-2",
    name: "Rohan Kapoor",
    role: "Dental Implant Patient",
    content:
      "I had deep dental anxiety, but Dr. Arjun Patel was incredibly reassuring. The dental implant procedure was completely painless, and the recovery was quick. The final crown looks just like my original tooth!",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    id: "test-3",
    name: "Sneha Reddy",
    role: "Mother of 2 Patient",
    content:
      "My kids actually look forward to visiting the dentist now! Dr. Priya Nair is amazing. She sings, jokes, and explains the instruments like toys. She is the absolute best pediatric dentist in town.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80",
  },
];

export const GALLERY_DATA = [
  {
    id: "gal-1",
    title: "Modern Clinic Lobby",
    image:
      "https://images.pexels.com/photos/3845625/pexels-photo-3845625.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Interior",
  },
  {
    id: "gal-2",
    title: "Advanced Treatment Room",
    image:
      "https://images.pexels.com/photos/4269694/pexels-photo-4269694.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Equipment",
  },
  {
    id: "gal-3",
    title: "Doctor Consultation",
    image:
      "https://images.pexels.com/photos/6812468/pexels-photo-6812468.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Team",
  },
  {
    id: "gal-4",
    title: "Comfortable Patient Chair",
    image:
      "https://images.pexels.com/photos/6812565/pexels-photo-6812565.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Interior",
  },
  {
    id: "gal-5",
    title: "3D Teeth Scanning Technology",
    image:
      "https://images.pexels.com/photos/6627563/pexels-photo-6627563.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Equipment",
  },
  {
    id: "gal-6",
    title: "Staff Team Members",
    image:
      "https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Team",
  },
];

export const FAQ_DATA = [
  {
    id: "faq-1",
    question: "How often should I visit BrightSmile for a standard checkup?",
    answer:
      "We highly recommend visiting us every six months for a routine dental cleaning and comprehensive checkup. This allows our clinical team to inspect early indicators of decay, clean hardened tartar, and secure preventative barriers before problems escalate.",
  },
  {
    id: "faq-2",
    question: "Are dental implants painful to get?",
    answer:
      "Not at all. The procedure is performed under high-quality local anesthesia, ensuring you feel zero pain during surgery. Post-surgical discomfort is typically mild and highly manageable with standard over-the-counter pain relievers for a few days.",
  },
  {
    id: "faq-3",
    question: "Does your clinic accept health insurance?",
    answer:
      "Yes! BrightSmile Dental Care works with most major health insurance providers in India, including cashless network partners. Our dedicated billing staff will directly handle all pre-authorizations and submit claims on your behalf to ensure your coverage benefits are fully maximized.",
  },
  {
    id: "faq-4",
    question: "What is the best teeth-straightening treatment for adults?",
    answer:
      "Clear aligners are highly popular among adults due to their high transparency and removable nature. They allow you to maintain natural dietary and brushing habits. However, ceramic braces are also a fantastic option for more complex bite alignments.",
  },
  {
    id: "faq-5",
    question: "What should I do in case of a sudden dental emergency?",
    answer:
      "Please call our emergency line immediately at +91 98765 43210. We reserve dedicated emergency slots every single day to provide same-day urgent care for teeth fractures, severe toothaches, or knocked-out teeth.",
  },
];

export const CLINIC_STATS = [
  { value: "15k+", label: "Happy Patients" },
  { value: "15+", label: "Years Experience" },
  { value: "99.8%", label: "Satisfaction Rate" },
  { value: "25+", label: "Awards Won" },
];

export const CLINIC_TIMELINE = [
  {
    year: "2011",
    title: "Clinic Founded",
    desc: "BrightSmile opened its doors in Bengaluru with 1 dentist, 1 chair, and a big vision for patient-first care.",
  },
  {
    year: "2015",
    title: "Expansion and Technology",
    desc: "Added 2 state-of-the-art treatment suites and imported advanced 3D scanning equipment.",
  },
  {
    year: "2019",
    title: "Award for Pediatric Dental Care",
    desc: "Named the best family dental practice in the region for our child-friendly clinic environment.",
  },
  {
    year: "2023",
    title: "Dr. Arjun Patel Joins",
    desc: "Established full surgical suite for advanced dental implantology and restorative dentistry.",
  },
];

export const CLINIC_CERTIFICATIONS = [
  {
    title: "Dental Council of India (DCI)",
    org: "Registered Practice Member",
  },
  {
    title: "Indian Dental Association (IDA)",
    org: "Accredited Member Clinic",
  },
  {
    title: "NABH Accredited Clinic",
    org: "National Accreditation Board for Hospitals & Healthcare Providers",
  },
  {
    title: "ISO 9001 Healthcare Quality",
    org: "Global Standard for Clinical Hygiene",
  },
];
