'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, Sliders, ChevronDown, Check, X, ShieldAlert,
  Flame, HelpCircle, Eye, Disc, Wind, Settings, ArrowRight,
  Info, CheckCircle, Calculator, Calendar, Landmark, MapPin, 
  Car, RefreshCw, Star
} from 'lucide-react';
import { submitLeaseRequest } from '../actions/submitForms';

// ==========================================
// 1. DYNAMIC SVG VEHICLE ILLUSTRATIONS
// ==========================================

interface SvgProps {
  color: string;
  className?: string;
}

const HatchbackSVG: React.FC<SvgProps> = ({ color, className }) => (
  <svg viewBox="0 0 400 220" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Shadow */}
    <ellipse cx="200" cy="195" rx="140" ry="12" fill="rgba(0, 0, 0, 0.15)" filter="blur(6px)" />
    
    {/* Body Fill */}
    <path 
      d="M50 145 C45 145 40 140 40 130 C40 115 50 110 65 105 L95 95 L145 55 C160 42 195 40 230 45 L300 65 L320 85 C345 95 365 110 365 125 C365 140 350 145 340 145 H300 C290 145 280 130 270 130 C260 130 250 145 240 145 H160 C150 145 140 130 130 130 C120 130 110 145 100 145 H50Z" 
      fill={color} 
      style={{ transition: 'fill 0.4s ease' }}
    />
    
    {/* Roof and Windows (Black trim) */}
    <path d="M140 92 L145 57 C155 45 185 43 220 48 L285 66 L298 92 H140Z" fill="#1e293b" />
    {/* Windshield highlights */}
    <path d="M250 51 L282 67 L280 90 L240 90 Z" fill="#64748b" opacity="0.6" />
    <path d="M152 90 L150 59 L195 55 L210 90 Z" fill="#64748b" opacity="0.6" />
    
    {/* Details (Headlights, Grille, Door lines) */}
    <path d="M35 120 C35 120 42 115 50 120 C58 125 50 135 50 135 Z" fill="#fbbf24" /> {/* Headlight */}
    <path d="M358 115 C360 115 365 120 365 125 C365 130 358 132 358 132 Z" fill="#ef4444" /> {/* Taillight */}
    
    {/* Door Lines */}
    <path d="M215 48 L215 145" stroke="#0f172a" strokeWidth="1.5" opacity="0.3" />
    <path d="M142 92 C180 92 280 95 315 105" stroke="#ffffff" strokeWidth="1.5" opacity="0.4" />
    
    {/* Wheels */}
    <circle cx="115" cy="145" r="32" fill="#0f172a" stroke="#ffffff" strokeWidth="2" />
    <circle cx="115" cy="145" r="22" fill="#64748b" />
    <circle cx="115" cy="145" r="12" fill="#cbd5e1" />
    
    <circle cx="285" cy="145" r="32" fill="#0f172a" stroke="#ffffff" strokeWidth="2" />
    <circle cx="285" cy="145" r="22" fill="#64748b" />
    <circle cx="285" cy="145" r="12" fill="#cbd5e1" />
  </svg>
);

const MpvSVG: React.FC<SvgProps> = ({ color, className }) => (
  <svg viewBox="0 0 400 220" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="200" cy="195" rx="145" ry="12" fill="rgba(0, 0, 0, 0.15)" filter="blur(6px)" />
    
    {/* Body Fill - taller, sloped hood */}
    <path 
      d="M45 145 C38 145 35 138 35 128 C35 110 45 102 60 98 L110 82 L160 45 C175 32 210 30 250 35 L315 58 L330 85 C355 95 370 110 370 125 C370 138 355 145 345 145 H305 C295 145 285 130 275 130 C265 130 255 145 245 145 H155 C145 145 135 130 125 130 C115 130 105 145 95 145 H45Z" 
      fill={color} 
      style={{ transition: 'fill 0.4s ease' }}
    />
    
    {/* Roof and Windows */}
    <path d="M150 82 L158 48 C168 37 200 34 240 38 L308 58 L315 82 H150Z" fill="#1e293b" />
    {/* Window splits */}
    <path d="M245 42 L298 59 L296 80 L238 80 Z" fill="#64748b" opacity="0.6" />
    <path d="M165 80 L163 51 L205 45 L218 80 Z" fill="#64748b" opacity="0.6" />
    
    {/* Front light */}
    <path d="M30 112 C30 112 38 107 46 112 C54 117 46 128 46 128 Z" fill="#fbbf24" />
    {/* Tail light */}
    <path d="M362 112 C365 112 370 117 370 122 C370 128 362 130 362 130 Z" fill="#ef4444" />
    
    {/* Side lines */}
    <path d="M225 38 L225 145" stroke="#0f172a" strokeWidth="1.5" opacity="0.3" />
    <path d="M130 82 C170 82 280 85 325 95" stroke="#ffffff" strokeWidth="1.5" opacity="0.4" />
    
    {/* Wheels */}
    <circle cx="110" cy="145" r="32" fill="#0f172a" stroke="#ffffff" strokeWidth="2" />
    <circle cx="110" cy="145" r="22" fill="#475569" />
    <circle cx="110" cy="145" r="12" fill="#cbd5e1" />
    
    <circle cx="290" cy="145" r="32" fill="#0f172a" stroke="#ffffff" strokeWidth="2" />
    <circle cx="290" cy="145" r="22" fill="#475569" />
    <circle cx="290" cy="145" r="12" fill="#cbd5e1" />
  </svg>
);

const SuvSVG: React.FC<SvgProps> = ({ color, className }) => (
  <svg viewBox="0 0 400 220" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="200" cy="198" rx="150" ry="12" fill="rgba(0, 0, 0, 0.18)" filter="blur(6px)" />
    
    {/* Ground clearance bottom panel (Rugged look) */}
    <path d="M40 148 H360 L350 160 H50 Z" fill="#334155" />
    
    {/* SUV Body - high, boxy structure */}
    <path 
      d="M50 148 C42 148 38 140 38 125 C38 102 52 92 68 88 L125 75 L180 38 C198 25 240 24 285 28 L345 52 L358 82 C372 90 378 108 378 122 C378 138 368 148 355 148 H310 C300 148 290 132 278 132 C266 132 256 148 246 148 H154 C144 148 134 132 122 132 C110 132 100 148 90 148 H50Z" 
      fill={color} 
      style={{ transition: 'fill 0.4s ease' }}
    />
    
    {/* Roof rails */}
    <path d="M195 28 L285 25" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
    
    {/* Windows & Roof */}
    <path d="M172 75 L182 41 C192 31 230 28 275 32 L335 53 L342 75 H172Z" fill="#1e293b" />
    {/* Glass Details */}
    <path d="M270 36 L325 54 L323 72 L266 72 Z" fill="#64748b" opacity="0.6" />
    <path d="M185 72 L183 45 L225 39 L240 72 Z" fill="#64748b" opacity="0.6" />
    
    {/* Headlights */}
    <path d="M32 100 C32 100 40 95 48 100 C56 105 48 118 48 118 Z" fill="#fbbf24" />
    <path d="M370 100 C373 100 378 105 378 110 C378 118 370 120 370 120 Z" fill="#ef4444" />
    
    {/* Door and trim details */}
    <path d="M255 32 L255 148" stroke="#0f172a" strokeWidth="1.5" opacity="0.3" />
    <path d="M140 75 C185 75 300 78 350 88" stroke="#ffffff" strokeWidth="1.5" opacity="0.4" />
    
    {/* Wheels - Big, rugged arches */}
    <circle cx="106" cy="148" r="35" fill="#0f172a" stroke="#e2e8f0" strokeWidth="3" />
    <circle cx="106" cy="148" r="24" fill="#1e293b" />
    <circle cx="106" cy="148" r="14" fill="#cbd5e1" />
    
    <circle cx="294" cy="148" r="35" fill="#0f172a" stroke="#e2e8f0" strokeWidth="3" />
    <circle cx="294" cy="148" r="24" fill="#1e293b" />
    <circle cx="294" cy="148" r="14" fill="#cbd5e1" />
  </svg>
);

const SedanSVG: React.FC<SvgProps> = ({ color, className }) => (
  <svg viewBox="0 0 400 220" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="200" cy="195" rx="145" ry="10" fill="rgba(0, 0, 0, 0.15)" filter="blur(6px)" />
    
    {/* Sedan Body - sleek low stance, 3-box profile */}
    <path 
      d="M40 145 C35 145 32 138 32 130 C32 118 42 110 60 108 L105 105 L155 60 C170 45 205 40 245 45 L320 62 L350 92 C362 95 380 102 380 115 C380 130 368 145 355 145 H305 C295 145 285 130 275 130 C265 130 255 145 245 145 H155 C145 145 135 130 125 130 C115 130 105 145 95 145 H40Z" 
      fill={color} 
      style={{ transition: 'fill 0.4s ease' }}
    />
    
    {/* Windows & Roof line */}
    <path d="M148 102 L156 63 C166 48 198 43 238 48 L312 63 L325 102 H148Z" fill="#1e293b" />
    {/* Highlights */}
    <path d="M242 52 L302 65 L298 95 L236 95 Z" fill="#64748b" opacity="0.6" />
    <path d="M162 95 L160 67 L200 58 L215 95 Z" fill="#64748b" opacity="0.6" />
    
    {/* Lights */}
    <path d="M28 120 C28 120 35 115 42 120 C50 125 42 135 42 135 Z" fill="#fbbf24" />
    <path d="M372 110 C375 110 380 115 380 120 C380 128 372 132 372 132 Z" fill="#ef4444" />
    
    {/* Details */}
    <path d="M225 48 L225 145" stroke="#0f172a" strokeWidth="1.5" opacity="0.3" />
    <path d="M110 102 C150 102 280 105 330 112" stroke="#ffffff" strokeWidth="1.5" opacity="0.4" />
    
    {/* Wheels */}
    <circle cx="110" cy="145" r="32" fill="#0f172a" stroke="#ffffff" strokeWidth="2" />
    <circle cx="110" cy="145" r="22" fill="#334155" />
    <circle cx="110" cy="145" r="12" fill="#cbd5e1" />
    
    <circle cx="290" cy="145" r="32" fill="#0f172a" stroke="#ffffff" strokeWidth="2" />
    <circle cx="290" cy="145" r="22" fill="#334155" />
    <circle cx="290" cy="145" r="12" fill="#cbd5e1" />
  </svg>
);

// Helper component to render proper SVG by body type
const VehicleSvgRenderer: React.FC<{ type: string; color: string; className?: string }> = ({ type, color, className }) => {
  switch (type) {
    case 'Hatchback':
      return <HatchbackSVG color={color} className={className} />;
    case 'MPV':
      return <MpvSVG color={color} className={className} />;
    case 'SUV':
      return <SuvSVG color={color} className={className} />;
    case 'Sedan':
    default:
      return <SedanSVG color={color} className={className} />;
  }
};

// ==========================================
// 2. VEHICLE & MOCK DATA STRUCTURES
// ==========================================

interface TrimOption {
  name: string;
  price: number;
  monthlyFinance: number;
  engine: string;
  horsepower: number;
}

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  basePrice: number;
  baseMonthlyFinance: number;
  bodyType: 'Hatchback' | 'MPV' | 'SUV' | 'Sedan';
  condition: 'Nieuw' | 'Occasion';
  fuelType: 'Benzine' | 'Diesel' | 'Hybride' | 'Elektrisch';
  transmission: 'Handgeschakeld' | 'Automaat';
  character: 'Familie' | 'Comfort' | 'Avontuur' | 'Discreet';
  dealer: string;
  distance: number; // mock distance in km
  tags: string[];
  colors: { name: string; hex: string }[];
  specs: {
    seats: number;
    rims: string;
    climate: string;
    airbags: string;
    radar: string;
  };
  trims: TrimOption[];
}

const MOCK_VEHICLES: Vehicle[] = [
  {
    id: 'fiesta-1',
    make: 'Ford',
    model: 'Fiesta',
    year: 2020,
    basePrice: 13950,
    baseMonthlyFinance: 130,
    bodyType: 'Hatchback',
    condition: 'Nieuw',
    fuelType: 'Benzine',
    transmission: 'Automaat',
    character: 'Comfort',
    dealer: 'Vestiging Amsterdam',
    distance: 45,
    tags: ['Nieuw', 'Petits prix'],
    colors: [
      { name: 'Pure White', hex: '#f8fafc' },
      { name: 'Race Red', hex: '#dc2626' },
      { name: 'Deep Blue', hex: '#1e3a8a' },
      { name: 'Shadow Black', hex: '#0f172a' }
    ],
    specs: {
      seats: 5,
      rims: '19 inch Lichtmetalen Velgen',
      climate: 'Automatische Climate Control',
      airbags: 'Bestuurder + Passagier + Gordijn Airbags',
      radar: 'Parkeersensoren voor & achter'
    },
    trims: [
      { name: '1.2L Special Edition 2020', price: 13950, monthlyFinance: 130, engine: 'Benzine 1.2L', horsepower: 110 },
      { name: '1.0 EcoBoost ST-Line Sport', price: 16450, monthlyFinance: 155, engine: 'Benzine 1.0L Turbo', horsepower: 125 }
    ]
  },
  {
    id: 'cmax-1',
    make: 'Ford',
    model: 'C-Max',
    year: 2019,
    basePrice: 18950,
    baseMonthlyFinance: 180,
    bodyType: 'MPV',
    condition: 'Occasion',
    fuelType: 'Benzine',
    transmission: 'Handgeschakeld',
    character: 'Familie',
    dealer: 'Vestiging Rotterdam',
    distance: 82,
    tags: ['Beste deals'],
    colors: [
      { name: 'Deep Blue', hex: '#1e3a8a' },
      { name: 'Race Red', hex: '#dc2626' },
      { name: 'Shadow Black', hex: '#0f172a' },
      { name: 'Metallic Grey', hex: '#64748b' }
    ],
    specs: {
      seats: 5,
      rims: '18 inch Sportvelgen',
      climate: 'Airconditioning met pollenfilter',
      airbags: 'Bestuurder + Zijdelingse Airbags',
      radar: 'Parkeersensoren achter'
    },
    trims: [
      { name: '1.5 TDCI Trend 5P', price: 18950, monthlyFinance: 180, engine: 'Benzine 1.5L', horsepower: 95 },
      { name: '2.0 TDCI Titanium Lux', price: 21850, monthlyFinance: 210, engine: 'Benzine 2.0L', horsepower: 120 }
    ]
  },
  {
    id: 'kuga-1',
    make: 'Ford',
    model: 'Kuga',
    year: 2021,
    basePrice: 23043,
    baseMonthlyFinance: 230,
    bodyType: 'SUV',
    condition: 'Nieuw',
    fuelType: 'Diesel',
    transmission: 'Handgeschakeld',
    character: 'Avontuur',
    dealer: 'Vestiging Brussel',
    distance: 140,
    tags: ['Prijsdalingen'],
    colors: [
      { name: 'Silver Storm', hex: '#94a3b8' },
      { name: 'Shadow Black', hex: '#0f172a' },
      { name: 'Pure White', hex: '#f8fafc' }
    ],
    specs: {
      seats: 5,
      rims: '19 inch Rugged Velgen',
      climate: 'Dual-Zone Automatische Airco',
      airbags: 'Rondom Airbags + Knie-airbag',
      radar: '360 Graden Parkeerradar & Camera'
    },
    trims: [
      { name: '1.5 TDCI Trend 4X2', price: 23043, monthlyFinance: 230, engine: 'Diesel 1.5L', horsepower: 120 },
      { name: '2.0 EcoBlue Titanium 4x4', price: 27950, monthlyFinance: 275, engine: 'Diesel 2.0L AWD', horsepower: 150 }
    ]
  },
  {
    id: 'ecosport-1',
    make: 'Ford',
    model: 'Ecosport',
    year: 2020,
    basePrice: 21933,
    baseMonthlyFinance: 215,
    bodyType: 'SUV',
    condition: 'Nieuw',
    fuelType: 'Benzine',
    transmission: 'Handgeschakeld',
    character: 'Avontuur',
    dealer: 'Vestiging Antwerpen',
    distance: 195,
    tags: ['Nieuw'],
    colors: [
      { name: 'Copper Glow', hex: '#c2410c' },
      { name: 'Shadow Black', hex: '#0f172a' },
      { name: 'Metallic Grey', hex: '#64748b' }
    ],
    specs: {
      seats: 5,
      rims: '17 inch Compact Velgen',
      climate: 'Semi-automatische Airco',
      airbags: 'Bestuurder + Passagier + Gordijn',
      radar: 'Parkeersensoren achter'
    },
    trims: [
      { name: '1.0 EcoBoost Titanium', price: 21933, monthlyFinance: 215, engine: 'Benzine 1.0L', horsepower: 125 },
      { name: '1.5 TDCi Connected', price: 23450, monthlyFinance: 230, engine: 'Diesel 1.5L', horsepower: 100 }
    ]
  },
  {
    id: 'fusion-1',
    make: 'Ford',
    model: 'Fusion',
    year: 2021,
    basePrice: 36540,
    baseMonthlyFinance: 360,
    bodyType: 'Sedan',
    condition: 'Nieuw',
    fuelType: 'Hybride',
    transmission: 'Automaat',
    character: 'Discreet',
    dealer: 'Vestiging Amsterdam',
    distance: 12,
    tags: ['Beste deals'],
    colors: [
      { name: 'Metallic Grey', hex: '#64748b' },
      { name: 'Shadow Black', hex: '#0f172a' },
      { name: 'Deep Blue', hex: '#1e3a8a' }
    ],
    specs: {
      seats: 5,
      rims: '19 inch Premium Velgen',
      climate: 'Full Active Cabin Climate Control',
      airbags: 'Intelligente Gordel Airbags + Rondom',
      radar: 'Actieve Park Assist & Sensoren'
    },
    trims: [
      { name: '2.0 EcoBoost Titanium', price: 36540, monthlyFinance: 360, engine: 'Hybride 2.0L', horsepower: 187 },
      { name: '2.5 iVCT Hybrid Executive', price: 41200, monthlyFinance: 405, engine: 'Hybride 2.5L Executive', horsepower: 210 }
    ]
  },
  {
    id: 'nissan-qashqai',
    make: 'Nissan',
    model: 'Qashqai',
    year: 2021,
    basePrice: 28950,
    baseMonthlyFinance: 280,
    bodyType: 'SUV',
    condition: 'Nieuw',
    fuelType: 'Hybride',
    transmission: 'Automaat',
    character: 'Familie',
    dealer: 'Vestiging Rotterdam',
    distance: 55,
    tags: ['Nieuw'],
    colors: [
      { name: 'Pure White', hex: '#f8fafc' },
      { name: 'Metallic Grey', hex: '#64748b' },
      { name: 'Deep Blue', hex: '#1e3a8a' }
    ],
    specs: {
      seats: 5,
      rims: '19 inch Dynamic Velgen',
      climate: 'Dual-Zone Airconditioning',
      airbags: 'Rondom SRS Airbags',
      radar: 'ProPILOT Parkeerassistent'
    },
    trims: [
      { name: '1.3 DIG-T MHEV N-Connecta', price: 28950, monthlyFinance: 280, engine: 'MHEV Benzine 1.3L', horsepower: 140 },
      { name: '1.5 e-POWER Tekna Plus', price: 34500, monthlyFinance: 335, engine: 'Hybride e-POWER 1.5L', horsepower: 190 }
    ]
  },
  {
    id: 'mitsubishi-outlander',
    make: 'Mitsubishi',
    model: 'Outlander',
    year: 2021,
    basePrice: 38950,
    baseMonthlyFinance: 380,
    bodyType: 'SUV',
    condition: 'Nieuw',
    fuelType: 'Hybride',
    transmission: 'Automaat',
    character: 'Avontuur',
    dealer: 'Vestiging Brussel',
    distance: 165,
    tags: ['Beste deals'],
    colors: [
      { name: 'Race Red', hex: '#dc2626' },
      { name: 'Pure White', hex: '#f8fafc' },
      { name: 'Shadow Black', hex: '#0f172a' }
    ],
    specs: {
      seats: 7,
      rims: '20 inch Sport Velgen',
      climate: 'Triple-Zone Klimaatbeheersing',
      airbags: '7 Airbags inclusief Knie-airbag',
      radar: 'Super All Wheel Control & Sensoren'
    },
    trims: [
      { name: '2.4 PHEV Intense 4WD', price: 38950, monthlyFinance: 380, engine: 'PHEV Benzine/Electro 2.4L', horsepower: 188 },
      { name: '2.4 PHEV Instyle Executive', price: 44950, monthlyFinance: 435, engine: 'PHEV Executive 4WD', horsepower: 224 }
    ]
  },
  {
    id: 'opel-insignia',
    make: 'Opel',
    model: 'Insignia',
    year: 2020,
    basePrice: 29950,
    baseMonthlyFinance: 290,
    bodyType: 'Sedan',
    condition: 'Occasion',
    fuelType: 'Diesel',
    transmission: 'Automaat',
    character: 'Discreet',
    dealer: 'Vestiging Amsterdam',
    distance: 28,
    tags: ['Prijsdalingen'],
    colors: [
      { name: 'Shadow Black', hex: '#0f172a' },
      { name: 'Metallic Grey', hex: '#64748b' },
      { name: 'Pure White', hex: '#f8fafc' }
    ],
    specs: {
      seats: 5,
      rims: '18 inch Premium Rims',
      climate: 'Automatische Multi-Zone Climate Control',
      airbags: 'Volledig Airbagsysteem + Actieve Motorkap',
      radar: 'Achteruitrijcamera & Sensoren'
    },
    trims: [
      { name: '2.0 CDTi Business Edition', price: 29950, monthlyFinance: 290, engine: 'Diesel 2.0L', horsepower: 174 },
      { name: '2.0 Turbo Petrol GS Line', price: 35450, monthlyFinance: 340, engine: 'Benzine 2.0L Turbo', horsepower: 200 }
    ]
  }
];

interface ShowroomClientProps {
  initialVehicles?: any[];
}

export default function ShowroomClient({ initialVehicles = [] }: ShowroomClientProps) {
  // Merge initial vehicles from Payload CMS if available, otherwise use mock
  const vehicles = useMemo(() => {
    if (initialVehicles && initialVehicles.length > 0) {
      // Map payload documents into our rich dynamic model
      return initialVehicles.map((v: any, index: number) => {
        const mockFallback = MOCK_VEHICLES[index % MOCK_VEHICLES.length];
        return {
          id: v.id || `payload-${index}`,
          make: v.make || 'Briskala',
          model: v.model || `Model ${index}`,
          year: v.year || mockFallback.year,
          basePrice: v.price || mockFallback.basePrice,
          baseMonthlyFinance: Math.round((v.price || mockFallback.basePrice) * 0.01),
          bodyType: mockFallback.bodyType,
          condition: mockFallback.condition,
          fuelType: mockFallback.fuelType,
          transmission: mockFallback.transmission,
          character: mockFallback.character,
          dealer: mockFallback.dealer,
          distance: mockFallback.distance,
          tags: mockFallback.tags,
          colors: mockFallback.colors,
          specs: mockFallback.specs,
          trims: [
            { 
              name: `${v.make || 'Briskala'} ${v.model || 'Model'} Base`, 
              price: v.price || mockFallback.basePrice, 
              monthlyFinance: Math.round((v.price || mockFallback.basePrice) * 0.01),
              engine: 'Hybride 2.0L',
              horsepower: 150
            },
            ...mockFallback.trims.slice(1)
          ]
        } as Vehicle;
      });
    }
    return MOCK_VEHICLES;
  }, [initialVehicles]);

  // ==========================================
  // 3. REACT STATE FOR FILTERS AND INTERACTION
  // ==========================================

  // Sidebar search & filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('ALLE MERKEN');
  const [sortBy, setSortBy] = useState('price-asc');
  
  const [distanceRadius, setDistanceRadius] = useState(200);
  const [selectedConcession, setSelectedConcession] = useState('Tout');
  const [vehicleCondition, setVehicleCondition] = useState<'All' | 'Nieuw' | 'Occasion'>('All');
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState('Tous tags');
  const [selectedTransmission, setSelectedTransmission] = useState<'All' | 'Handgeschakeld' | 'Automaat'>('All');
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);

  // Per-vehicle customized states
  // Key: vehicleId, Value: selected hex color code
  const [carColors, setCarColors] = useState<Record<string, string>>({});
  
  // Key: vehicleId, Value: index of selected Trim Option
  const [carTrims, setCarTrims] = useState<Record<string, number>>({});

  // Finance Calculator state
  const [selectedCalculatorCar, setSelectedCalculatorCar] = useState<Vehicle | null>(null);
  const [downPayment, setDownPayment] = useState<number>(3000);
  const [termMonths, setTermMonths] = useState<number>(48);
  const [residualValue, setResidualValue] = useState<number>(2000);
  const [interestRate, setInterestRate] = useState<number>(4.9);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [formInputs, setFormInputs] = useState({ name: '', email: '', phone: '', note: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Toggle dynamic fuel selection
  const handleFuelToggle = (fuel: string) => {
    setSelectedFuelTypes(prev => 
      prev.includes(fuel) ? prev.filter(f => f !== fuel) : [...prev, fuel]
    );
  };

  // Toggle character style selection
  const handleCharacterToggle = (char: string) => {
    setSelectedCharacters(prev => 
      prev.includes(char) ? prev.filter(c => c !== char) : [...prev, char]
    );
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedBrand('ALLE MERKEN');
    setDistanceRadius(200);
    setSelectedConcession('Tout');
    setVehicleCondition('All');
    setSelectedFuelTypes([]);
    setSelectedTags('Tous tags');
    setSelectedTransmission('All');
    setSelectedCharacters([]);
  };

  // ==========================================
  // 4. FILTERING & SORTING LOGIC
  // ==========================================

  const filteredVehicles = useMemo(() => {
    let result = [...vehicles];

    // Filter by Brand Tabs
    if (selectedBrand !== 'ALLE MERKEN') {
      result = result.filter(v => v.make.toLowerCase() === selectedBrand.toLowerCase());
    }

    // Filter by Search text
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      result = result.filter(v => 
        v.make.toLowerCase().includes(q) || 
        v.model.toLowerCase().includes(q) ||
        v.year.toString().includes(q)
      );
    }

    // Filter by Proximity
    result = result.filter(v => v.distance <= distanceRadius);

    // Filter by Concession (Dealer location)
    if (selectedConcession !== 'Tout') {
      result = result.filter(v => v.dealer.includes(selectedConcession));
    }

    // Filter by Vehicle Condition
    if (vehicleCondition !== 'All') {
      result = result.filter(v => v.condition === vehicleCondition);
    }

    // Filter by Fuel Type
    if (selectedFuelTypes.length > 0) {
      result = result.filter(v => selectedFuelTypes.includes(v.fuelType));
    }

    // Filter by Tag
    if (selectedTags !== 'Tous tags') {
      const tagMap: Record<string, string> = {
        'Pépites': 'Beste deals',
        'Nouveautés': 'Nieuw',
        'Petits prix': 'Petits prix',
        'Prix en baisse': 'Prijsdalingen'
      };
      const DutchTag = tagMap[selectedTags];
      if (DutchTag) {
        result = result.filter(v => v.tags.includes(DutchTag));
      }
    }

    // Filter by Transmission
    if (selectedTransmission !== 'All') {
      result = result.filter(v => v.transmission === selectedTransmission);
    }

    // Filter by Character/Esprit
    if (selectedCharacters.length > 0) {
      result = result.filter(v => selectedCharacters.includes(v.character));
    }

    // Sorting
    result.sort((a, b) => {
      const activeTrimA = a.trims[carTrims[a.id] || 0];
      const activeTrimB = b.trims[carTrims[b.id] || 0];
      
      if (sortBy === 'price-asc') {
        return activeTrimA.price - activeTrimB.price;
      } else if (sortBy === 'price-desc') {
        return activeTrimB.price - activeTrimA.price;
      } else if (sortBy === 'hp-desc') {
        return activeTrimB.horsepower - activeTrimA.horsepower;
      } else if (sortBy === 'year-desc') {
        return b.year - a.year;
      }
      return 0;
    });

    return result;
  }, [
    vehicles, selectedBrand, searchTerm, distanceRadius, selectedConcession, 
    vehicleCondition, selectedFuelTypes, selectedTags, selectedTransmission, 
    selectedCharacters, sortBy, carTrims
  ]);

  // ==========================================
  // 5. CALCULATOR MATHEMATICS ENGINE
  // ==========================================

  // Open calculator for a specific car and pre-fill its parameters
  const handleOpenCalculator = (car: Vehicle) => {
    setSelectedCalculatorCar(car);
    const activeTrimIdx = carTrims[car.id] || 0;
    const activeTrim = car.trims[activeTrimIdx];
    
    // Sensible defaults based on vehicle price
    const defaultDown = Math.round(activeTrim.price * 0.2);
    const defaultResidual = Math.round(activeTrim.price * 0.15);
    
    setDownPayment(defaultDown);
    setResidualValue(defaultResidual);
    setTermMonths(48);
    setInterestRate(4.9);
  };

  const calculatedFinance = useMemo(() => {
    if (!selectedCalculatorCar) return { monthlyPayment: 0, totalPayment: 0, totalInterest: 0, loanAmount: 0 };
    
    const activeTrimIdx = carTrims[selectedCalculatorCar.id] || 0;
    const activeTrim = selectedCalculatorCar.trims[activeTrimIdx];
    
    const carPrice = activeTrim.price;
    const principal = carPrice - downPayment - residualValue;
    
    if (principal <= 0) {
      return { monthlyPayment: 0, totalPayment: downPayment, totalInterest: 0, loanAmount: 0 };
    }
    
    // Standard amortization loan calculation with interest & residual value
    const annualRate = interestRate / 100;
    const monthlyRate = annualRate / 12;
    const months = termMonths;
    
    let monthlyPayment = 0;
    if (monthlyRate === 0) {
      monthlyPayment = principal / months;
    } else {
      monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    }
    
    // Include monthly interest on residual value
    const monthlyResidualInterest = residualValue * monthlyRate;
    const finalMonthlyPayment = Math.round(monthlyPayment + monthlyResidualInterest);
    
    const totalPayment = (finalMonthlyPayment * months) + downPayment + residualValue;
    const totalInterest = Math.max(0, totalPayment - carPrice);
    
    return {
      monthlyPayment: finalMonthlyPayment,
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      loanAmount: principal
    };
  }, [selectedCalculatorCar, downPayment, termMonths, residualValue, interestRate, carTrims]);

  const handleApplyFinance = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCalculatorCar) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const activeTrimIdx = carTrims[selectedCalculatorCar.id] || 0;
    const activeTrim = selectedCalculatorCar.trims[activeTrimIdx];
    const selectedHex = carColors[selectedCalculatorCar.id] || selectedCalculatorCar.colors[0]?.hex;
    const activeColorObj = selectedCalculatorCar.colors.find(c => c.hex === selectedHex) || selectedCalculatorCar.colors[0];
    const colorStr = activeColorObj ? `${activeColorObj.name} (${selectedHex})` : selectedHex || 'Standaard';

    try {
      const res = await submitLeaseRequest({
        name: formInputs.name,
        email: formInputs.email,
        phone: formInputs.phone,
        vehicleName: `${selectedCalculatorCar.make} ${selectedCalculatorCar.model} - ${activeTrim.name}`,
        downPayment: downPayment,
        termMonths: termMonths,
        residualValue: residualValue,
        interestRate: interestRate,
        monthlyPayment: calculatedFinance.monthlyPayment,
        totalPayment: calculatedFinance.totalPayment,
        notes: `Geselecteerde kleur: ${colorStr}`
      });

      if (res.success) {
        setShowSuccessToast(true);
        setTimeout(() => {
          setShowSuccessToast(false);
          setSelectedCalculatorCar(null);
          setFormInputs({ name: '', email: '', phone: '', note: '' });
        }, 3000);
      } else {
        setSubmitError(res.error || 'Er is iets misgegaan.');
      }
    } catch (err) {
      console.error(err);
      setSubmitError('Er is een onverwachte fout opgetreden.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Brand Options from the reference
  const BRANDS = ['ALLE MERKEN', 'FORD', 'NISSAN', 'MITSUBISHI', 'OPEL'];

  // Dealer Locations for Concession dropdown
  const DEALER_LOCATIONS = [
    { value: 'Tout', label: 'Alle vestigingen' },
    { value: 'Amsterdam', label: 'Vestiging Amsterdam' },
    { value: 'Rotterdam', label: 'Vestiging Rotterdam' },
    { value: 'Brussel', label: 'Vestiging Brussel' },
    { value: 'Antwerpen', label: 'Vestiging Antwerpen' }
  ];

  return (
    <div style={{ backgroundColor: '#ffffff', borderRadius: '24px', border: '1px solid #e2e8f0', padding: '32px', fontFamily: "'Open Sans', sans-serif", boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.02)' }}>
      <div className="container-fluid" style={{ padding: 0 }}>
        
        {/* ==========================================
            A. TOP SHOWROOM NAVIGATION BAR & HEADER
            ========================================== */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 pb-3 border-bottom border-light-subtle">
          <div>
            <p style={{ margin: 0, color: '#64748b', fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
              Vind uw droomvoertuig en bereken direct uw lease. 
              <span style={{ 
                fontSize: '11px', 
                fontWeight: 800, 
                color: '#0d9488', 
                marginLeft: '12px', 
                background: '#ccfbf1', 
                padding: '4px 12px', 
                borderRadius: '20px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Premium Finance v1.1
              </span>
            </p>
          </div>
          
          {/* Brand selection tabs matching Reference Image layout */}
          <div className="d-flex flex-wrap gap-2 mt-3 mt-md-0">
            {BRANDS.map(brand => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '30px',
                  fontWeight: 700,
                  fontSize: '12px',
                  border: '1px solid',
                  borderColor: selectedBrand === brand ? 'transparent' : '#cbd5e1',
                  backgroundColor: selectedBrand === brand ? '#1e3a8a' : '#ffffff',
                  color: selectedBrand === brand ? '#ffffff' : '#475569',
                  boxShadow: selectedBrand === brand ? '0 4px 12px rgba(30, 58, 138, 0.15)' : 'none',
                  transition: 'all 0.2s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
                onMouseEnter={e => {
                  if (selectedBrand !== brand) {
                    e.currentTarget.style.borderColor = '#94a3b8';
                    e.currentTarget.style.backgroundColor = '#f8fafc';
                  }
                }}
                onMouseLeave={e => {
                  if (selectedBrand !== brand) {
                    e.currentTarget.style.borderColor = '#cbd5e1';
                    e.currentTarget.style.backgroundColor = '#ffffff';
                  }
                }}
              >
                {brand === 'FORD' && <Car size={13} />}
                {brand === 'NISSAN' && <Car size={13} />}
                {brand === 'MITSUBISHI' && <Car size={13} />}
                {brand === 'OPEL' && <Car size={13} />}
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Search & Fast Sort Options */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-8 col-lg-9">
            <div style={{ position: 'relative', width: '100%' }}>
              <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>
                <Search size={18} />
              </span>
              <input
                type="text"
                placeholder="Zoeken op merk, model, type of trefwoord..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 48px',
                  borderRadius: '12px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  fontSize: '14px',
                  color: '#1e293b',
                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)',
                  outline: 'none',
                  transition: 'all 0.2s ease'
                }}
                onFocus={e => {
                  e.currentTarget.style.borderColor = '#1e3a8a';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(30, 58, 138, 0.1)';
                }}
                onBlur={e => {
                  e.currentTarget.style.borderColor = '#cbd5e1';
                  e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(0,0,0,0.02)';
                }}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')} 
                  style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'transparent', color: '#64748b', cursor: 'pointer' }}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
          <div className="col-12 col-md-4 col-lg-3">
            <div style={{ position: 'relative' }}>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  fontSize: '14px',
                  color: '#1e293b',
                  fontWeight: 700,
                  appearance: 'none',
                  cursor: 'pointer',
                  outline: 'none',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                  transition: 'all 0.2s ease'
                }}
                onFocus={e => e.currentTarget.style.borderColor = '#1e3a8a'}
                onBlur={e => e.currentTarget.style.borderColor = '#cbd5e1'}
              >
                <option value="price-asc">Prijs: minder duur naar duurder ▾</option>
                <option value="price-desc">Prijs: duurder naar minder duur ▴</option>
                <option value="hp-desc">Vermogen: hoogste PK's ⚡</option>
                <option value="year-desc">Bouwjaar: nieuwste eerst 📅</option>
              </select>
              <span style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#475569', pointerEvents: 'none', display: 'flex', alignItems: 'center' }}>
                <ChevronDown size={16} strokeWidth={2.5} />
              </span>
            </div>
          </div>
        </div>

        <div className="row g-4">
          
          {/* ==========================================
              B. SIDEBAR FILTER PANEL (1.1 Design Copy)
              ========================================== */}
          <div className="col-12 col-lg-3">
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              border: '1px solid rgba(226, 232, 240, 0.8)',
              padding: '24px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.03), 0 4px 6px -4px rgba(0, 0, 0, 0.03)',
              position: 'sticky',
              top: '20px'
            }}>
              
              {/* Header of Filters */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center gap-2">
                  <Sliders size={18} style={{ color: '#1a5276' }} />
                  <span style={{ fontWeight: 800, fontSize: '16px', color: '#1e293b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Filters & Opties
                  </span>
                </div>
                <button
                  onClick={handleResetFilters}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: '#006b99',
                    fontSize: '13px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: 0
                  }}
                >
                  <RefreshCw size={12} />
                  Reset
                </button>
              </div>

              {/* 1. Proximité (Search Radius) */}
              <div className="mb-4">
                <label className="d-flex justify-content-between mb-2" style={{ fontSize: '13px', fontWeight: 700, color: '#475569' }}>
                  <span>Proximité (Afstand):</span>
                  <span style={{ color: '#1a5276', fontWeight: 800 }}>{distanceRadius} km</span>
                </label>
                <input
                  type="range"
                  min="20"
                  max="500"
                  step="10"
                  value={distanceRadius}
                  onChange={e => setDistanceRadius(Number(e.target.value))}
                  style={{
                    width: '100%',
                    accentColor: '#1a5276',
                    cursor: 'pointer'
                  }}
                />
              </div>

              {/* 2. Choix de concession */}
              <div className="mb-4">
                <label className="d-block mb-2" style={{ fontSize: '13px', fontWeight: 700, color: '#475569' }}>
                  Choix de concession (Dealer):
                </label>
                <div style={{ position: 'relative' }}>
                  <select
                    value={selectedConcession}
                    onChange={e => setSelectedConcession(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      backgroundColor: '#f8fafc',
                      fontSize: '13px',
                      color: '#1e293b',
                      outline: 'none',
                      appearance: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {DEALER_LOCATIONS.map(loc => (
                      <option key={loc.value} value={loc.value}>{loc.label}</option>
                    ))}
                  </select>
                  <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', pointerEvents: 'none' }}>
                    <ChevronDown size={14} />
                  </span>
                </div>
              </div>

              {/* 3. Type de véhicule (Condition) */}
              <div className="mb-4">
                <label className="d-block mb-2" style={{ fontSize: '13px', fontWeight: 700, color: '#475569' }}>
                  Type de véhicule:
                </label>
                <div className="d-flex flex-column gap-2">
                  <label className="d-flex align-items-center gap-2" style={{ fontSize: '13px', color: '#1e293b', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="condition"
                      checked={vehicleCondition === 'All'}
                      onChange={() => setVehicleCondition('All')}
                      style={{ accentColor: '#1a5276', width: '16px', height: '16px' }}
                    />
                    <span>Alle typen</span>
                  </label>
                  <label className="d-flex align-items-center gap-2" style={{ fontSize: '13px', color: '#1e293b', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="condition"
                      checked={vehicleCondition === 'Nieuw'}
                      onChange={() => setVehicleCondition('Nieuw')}
                      style={{ accentColor: '#1a5276', width: '16px', height: '16px' }}
                    />
                    <span>Nieuw (Neuf)</span>
                  </label>
                  <label className="d-flex align-items-center gap-2" style={{ fontSize: '13px', color: '#1e293b', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="condition"
                      checked={vehicleCondition === 'Occasion'}
                      onChange={() => setVehicleCondition('Occasion')}
                      style={{ accentColor: '#1a5276', width: '16px', height: '16px' }}
                    />
                    <span>Occasion (Tweedehands)</span>
                  </label>
                </div>
              </div>

              {/* 4. Type de carburant (Fuel Type) */}
              <div className="mb-4">
                <label className="d-block mb-2" style={{ fontSize: '13px', fontWeight: 700, color: '#475569' }}>
                  Type de carburant (Brandstof):
                </label>
                <div className="d-flex flex-wrap gap-2">
                  {['Benzine', 'Diesel', 'Hybride', 'Elektrisch'].map(fuel => {
                    const isSelected = selectedFuelTypes.includes(fuel);
                    return (
                      <button
                        key={fuel}
                        onClick={() => handleFuelToggle(fuel)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 600,
                          border: `1px solid ${isSelected ? '#1a5276' : '#cbd5e1'}`,
                          backgroundColor: isSelected ? '#e0f2fe' : '#ffffff',
                          color: isSelected ? '#1a5276' : '#475569',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {fuel}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 5. Tags (Matching screenshot categories) */}
              <div className="mb-4">
                <label className="d-block mb-2" style={{ fontSize: '13px', fontWeight: 700, color: '#475569' }}>
                  Labels & Tags:
                </label>
                <div className="d-flex flex-column gap-2">
                  {['Tous tags', 'Pépites', 'Nouveautés', 'Petits prix', 'Prix en baisse'].map(tag => (
                    <label key={tag} className="d-flex align-items-center gap-2" style={{ fontSize: '13px', color: '#1e293b', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="tag"
                        checked={selectedTags === tag}
                        onChange={() => setSelectedTags(tag)}
                        style={{ accentColor: '#1a5276', width: '16px', height: '16px' }}
                      />
                      <span>
                        {tag === 'Tous tags' && 'Alle labels'}
                        {tag === 'Pépites' && 'Beste deals (Pépites)'}
                        {tag === 'Nouveautés' && 'Nieuw binnengekomen'}
                        {tag === 'Petits prix' && 'Budget deals'}
                        {tag === 'Prix en baisse' && 'Prijsdalingen'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 6. Transmission */}
              <div className="mb-4">
                <label className="d-block mb-2" style={{ fontSize: '13px', fontWeight: 700, color: '#475569' }}>
                  Transmission (Versnellingsbak):
                </label>
                <div className="d-flex flex-column gap-2">
                  <label className="d-flex align-items-center gap-2" style={{ fontSize: '13px', color: '#1e293b', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="transmission"
                      checked={selectedTransmission === 'All'}
                      onChange={() => setSelectedTransmission('All')}
                      style={{ accentColor: '#1a5276', width: '16px', height: '16px' }}
                    />
                    <span>Alle transmissies</span>
                  </label>
                  <label className="d-flex align-items-center gap-2" style={{ fontSize: '13px', color: '#1e293b', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="transmission"
                      checked={selectedTransmission === 'Handgeschakeld'}
                      onChange={() => setSelectedTransmission('Handgeschakeld')}
                      style={{ accentColor: '#1a5276', width: '16px', height: '16px' }}
                    />
                    <span>Handgeschakeld (Manuelle)</span>
                  </label>
                  <label className="d-flex align-items-center gap-2" style={{ fontSize: '13px', color: '#1e293b', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="transmission"
                      checked={selectedTransmission === 'Automaat'}
                      onChange={() => setSelectedTransmission('Automaat')}
                      style={{ accentColor: '#1a5276', width: '16px', height: '16px' }}
                    />
                    <span>Automaat (Automatique)</span>
                  </label>
                </div>
              </div>

              {/* 7. Esprit du véhicule (Car Character) */}
              <div className="mb-1">
                <label className="d-block mb-2" style={{ fontSize: '13px', fontWeight: 700, color: '#475569' }}>
                  Esprit du véhicule (Karakter):
                </label>
                <div className="d-flex flex-column gap-2">
                  {['Familie', 'Comfort', 'Avontuur', 'Discreet'].map(char => {
                    const isChecked = selectedCharacters.includes(char);
                    return (
                      <label key={char} className="d-flex align-items-center gap-2" style={{ fontSize: '13px', color: '#1e293b', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleCharacterToggle(char)}
                          style={{ accentColor: '#1a5276', width: '16px', height: '16px', borderRadius: '4px' }}
                        />
                        <span>
                          {char === 'Familie' && 'Familie (Familial)'}
                          {char === 'Comfort' && 'Comfortabel (Comfort)'}
                          {char === 'Avontuur' && 'Avontuurlijk (Aventure)'}
                          {char === 'Discreet' && 'Discreet / Zakelijk'}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

          {/* ==========================================
              C. VEHICLE CARD GRID (Aesthetic 1.1 Copy)
              ========================================== */}
          <div className="col-12 col-lg-9">
            
            {/* Filter state indicator */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span style={{ fontSize: '13px', color: '#64748b' }}>
                Weergegeven: <strong>{filteredVehicles.length}</strong> van de <strong>{vehicles.length}</strong> voertuigen
              </span>
              
              {/* Active filters summary */}
              {(searchTerm || selectedBrand !== 'ALLE MERKEN' || vehicleCondition !== 'All' || selectedFuelTypes.length > 0 || selectedTransmission !== 'All' || selectedCharacters.length > 0) && (
                <button
                  onClick={handleResetFilters}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    fontSize: '12px',
                    color: '#ef4444',
                    fontWeight: 600
                  }}
                >
                  Filters wissen ×
                </button>
              )}
            </div>

            {filteredVehicles.length === 0 ? (
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '60px 40px',
                textAlign: 'center',
                border: '1px dashed #cbd5e1'
              }}>
                <Car size={48} style={{ color: '#94a3b8', marginBottom: '16px' }} />
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>
                  Geen voertuigen gevonden
                </h3>
                <p style={{ color: '#64748b', fontSize: '14px', maxWidth: '400px', margin: '0 auto' }}>
                  Probeer uw filters aan te passen of zoek op een ander merk om ons aanbod te verkennen.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="btn mt-3"
                  style={{
                    backgroundColor: '#1a5276',
                    color: '#ffffff',
                    fontWeight: 700,
                    borderRadius: '8px',
                    padding: '8px 20px',
                    fontSize: '13px'
                  }}
                >
                  Alle filters wissen
                </button>
              </div>
            ) : (
              <div className="row g-4">
                <style>{`
                  @keyframes pulse-ring {
                    0% { transform: scale(0.33); opacity: 0.6; }
                    80%, 100% { opacity: 0; }
                  }
                  @keyframes pulse-dot {
                    0%, 100% { transform: scale(0.8); }
                    50% { transform: scale(1.2); }
                  }
                `}</style>
                {filteredVehicles.map(vehicle => {
                  // Active state for this specific card
                  const activeTrimIndex = carTrims[vehicle.id] || 0;
                  const activeTrim = vehicle.trims[activeTrimIndex] || vehicle.trims[0];
                  
                  const selectedHex = carColors[vehicle.id] || vehicle.colors[0].hex;
                  const activeColorObj = vehicle.colors.find(c => c.hex === selectedHex) || vehicle.colors[0];
                  
                  // Setup condition tag
                  const isNew = vehicle.condition === 'Nieuw';
                  const isPromo = vehicle.tags.includes('Prijsdalingen');

                  return (
                    <div key={vehicle.id} className="col-12 col-md-6 col-xxl-4">
                      <div 
                        className="h-100 d-flex flex-column"
                        style={{
                          backgroundColor: '#ffffff',
                          borderRadius: '24px',
                          border: '1px solid rgba(226, 232, 240, 0.8)',
                          boxShadow: '0 10px 30px -10px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.02)',
                          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-6px)';
                          e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(15, 23, 42, 0.12), 0 12px 24px -10px rgba(15, 23, 42, 0.08)';
                          e.currentTarget.style.borderColor = '#cbd5e1';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'none';
                          e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.02)';
                          e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.8)';
                        }}
                      >
                        
                        {/* ==========================================
                            CARD HEADER: Title, Badge, Price, Lease
                            ========================================== */}
                        <div style={{ padding: '24px 24px 16px 24px' }}>
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <span style={{ 
                                fontSize: '11px', 
                                fontWeight: 800, 
                                color: '#1e3a8a', 
                                letterSpacing: '1px', 
                                textTransform: 'uppercase', 
                                display: 'block', 
                                marginBottom: '4px',
                                opacity: 0.8
                              }}>
                                {vehicle.make}
                              </span>
                              <h2 style={{ 
                                fontSize: '22px', 
                                fontWeight: 800, 
                                color: '#0f172a', 
                                margin: 0, 
                                display: 'flex', 
                                alignItems: 'center', 
                                flexWrap: 'wrap',
                                gap: '8px',
                                lineHeight: '1.2'
                              }}>
                                {vehicle.model}
                                {isNew && (
                                  <span style={{ 
                                    fontSize: '9px', 
                                    fontWeight: 800, 
                                    background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)', 
                                    color: '#ffffff', 
                                    padding: '3px 10px', 
                                    borderRadius: '30px', 
                                    textTransform: 'uppercase',
                                    boxShadow: '0 2px 4px rgba(30, 58, 138, 0.15)'
                                  }}>
                                    Nieuw
                                  </span>
                                )}
                                {isPromo && (
                                  <span style={{ 
                                    fontSize: '9px', 
                                    fontWeight: 800, 
                                    background: 'linear-gradient(135deg, #ea580c, #f97316)', 
                                    color: '#ffffff', 
                                    padding: '3px 10px', 
                                    borderRadius: '30px', 
                                    textTransform: 'uppercase',
                                    boxShadow: '0 2px 4px rgba(234, 88, 12, 0.15)'
                                  }}>
                                    Prijsdaling
                                  </span>
                                )}
                              </h2>
                              
                              {/* Availability dot and message */}
                              <div className="d-flex align-items-center gap-2 mt-2" style={{ fontSize: '12px' }}>
                                <span style={{ position: 'relative', display: 'flex', height: '8px', width: '8px' }}>
                                  <span style={{
                                    position: 'absolute',
                                    display: 'inline-flex',
                                    height: '100%',
                                    width: '100%',
                                    borderRadius: '50%',
                                    backgroundColor: vehicle.tags.includes('Nieuw') ? '#94a3b8' : '#22c55e',
                                    opacity: 0.6,
                                    transform: 'scale(1.8)',
                                    animation: 'pulse-ring 1.5s cubic-bezier(0.215, 0.610, 0.355, 1) infinite'
                                  }} />
                                  <span style={{ 
                                    position: 'relative',
                                    display: 'inline-flex',
                                    width: '8px', 
                                    height: '8px', 
                                    borderRadius: '50%', 
                                    backgroundColor: vehicle.tags.includes('Nieuw') ? '#94a3b8' : '#22c55e',
                                    animation: 'pulse-dot 1.5s cubic-bezier(0.215, 0.610, 0.355, 1) infinite'
                                  }} />
                                </span>
                                <span style={{ color: '#475569', fontWeight: 600 }}>
                                  {vehicle.tags.includes('Nieuw') ? 'Binnenkort beschikbaar' : 'Model direct beschikbaar'}
                                </span>
                              </div>
                            </div>

                            {/* Price details right aligned */}
                            <div className="text-end">
                              <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px' }}>
                                € {activeTrim.price.toLocaleString('nl-NL')}
                              </div>
                              <div style={{ fontSize: '12px', color: '#0d9488', fontWeight: 700, marginTop: '2px' }}>
                                Lease vanaf € {activeTrim.monthlyFinance}/mnd
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* ==========================================
                            CARD IMAGE SECTION: Dynamic Color Selector
                            ========================================== */}
                        <div style={{ 
                          padding: '0 24px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          position: 'relative'
                        }}>
                          {/* Inner Studio Container */}
                          <div style={{
                            width: '100%',
                            background: 'radial-gradient(circle at center, rgba(241, 245, 249, 0.8) 0%, rgba(226, 232, 240, 0.3) 100%)',
                            borderRadius: '16px',
                            border: '1px solid rgba(226, 232, 240, 0.5)',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            position: 'relative',
                            overflow: 'hidden'
                          }}>
                            {/* Color swatch rings absolutely placed in a glassy floating pill */}
                            <div style={{
                              position: 'absolute',
                              left: '12px',
                              top: '12px',
                              backgroundColor: 'rgba(255, 255, 255, 0.75)',
                              backdropFilter: 'blur(8px)',
                              padding: '5px 8px',
                              borderRadius: '30px',
                              border: '1px solid rgba(255, 255, 255, 0.6)',
                              boxShadow: '0 4px 12px rgba(15, 23, 42, 0.05)',
                              display: 'flex',
                              gap: '6px',
                              zIndex: 10
                            }}>
                              {vehicle.colors.map(color => {
                                const isSelected = selectedHex === color.hex;
                                return (
                                  <button
                                    key={color.hex}
                                    onClick={() => setCarColors(prev => ({ ...prev, [vehicle.id]: color.hex }))}
                                    title={color.name}
                                    style={{
                                      width: '16px',
                                      height: '16px',
                                      borderRadius: '50%',
                                      backgroundColor: color.hex,
                                      border: isSelected ? '2px solid #ffffff' : '1px solid rgba(15, 23, 42, 0.1)',
                                      boxShadow: isSelected ? '0 0 0 2px #0f172a, 0 4px 6px rgba(0,0,0,0.1)' : '0 1px 2px rgba(0,0,0,0.05)',
                                      cursor: 'pointer',
                                      transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                                      transition: 'all 0.2s ease'
                                    }}
                                  />
                                );
                              })}
                            </div>

                            {/* Dynamic SVG vehicle image */}
                            <div style={{ width: '100%', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <VehicleSvgRenderer 
                                type={vehicle.bodyType} 
                                color={selectedHex} 
                                className="w-100 h-100" 
                              />
                            </div>

                            {/* Refined Color Name Badge */}
                            <div style={{
                              fontSize: '11px',
                              color: '#475569',
                              fontWeight: 600,
                              backgroundColor: '#ffffff',
                              padding: '4px 12px',
                              borderRadius: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              border: '1px solid #e2e8f0',
                              boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
                            }}>
                              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: selectedHex, border: '1px solid rgba(15, 23, 42, 0.1)' }} />
                              <span>Kleur: <strong>{activeColorObj.name}</strong></span>
                            </div>
                          </div>
                        </div>

                        {/* ==========================================
                            CARD INFO & DETAILS: Specs and Trims
                            ========================================== */}
                        <div style={{ padding: '24px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                          
                          {/* 1. Trim Dropdown Selector */}
                          <div className="mb-3">
                            <label style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>
                              Uitvoering & Motorisering:
                            </label>
                            <div style={{ position: 'relative' }}>
                              <select
                                value={activeTrimIndex}
                                onChange={e => setCarTrims(prev => ({ ...prev, [vehicle.id]: Number(e.target.value) }))}
                                style={{
                                  width: '100%',
                                  padding: '10px 16px',
                                  fontSize: '13px',
                                  fontWeight: 600,
                                  color: '#0f172a',
                                  backgroundColor: '#f8fafc',
                                  border: '1px solid #cbd5e1',
                                  borderRadius: '12px',
                                  cursor: 'pointer',
                                  outline: 'none',
                                  appearance: 'none',
                                  transition: 'all 0.2s ease',
                                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)'
                                }}
                                onFocus={e => {
                                  e.currentTarget.style.borderColor = '#1e3a8a';
                                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(30, 58, 138, 0.08)';
                                }}
                                onBlur={e => {
                                  e.currentTarget.style.borderColor = '#cbd5e1';
                                  e.currentTarget.style.boxShadow = 'none';
                                }}
                              >
                                {vehicle.trims.map((trim, idx) => (
                                  <option key={trim.name} value={idx}>
                                    {trim.name}
                                  </option>
                                ))}
                              </select>
                              <span style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', pointerEvents: 'none', display: 'flex', alignItems: 'center' }}>
                                <ChevronDown size={14} strokeWidth={2.5} />
                              </span>
                            </div>
                          </div>

                          {/* 2. Specs Strip with premium capsules */}
                          <div className="d-flex justify-content-between gap-2 mb-4 mt-1" style={{ fontSize: '12px' }}>
                            <div style={{
                              flex: 1,
                              backgroundColor: '#f8fafc',
                              border: '1px solid #e2e8f0',
                              borderRadius: '12px',
                              padding: '8px',
                              textAlign: 'center'
                            }}>
                              <span style={{ color: '#0f172a', fontWeight: 800, fontSize: '13px', display: 'block' }}>
                                {vehicle.fuelType}
                              </span>
                              <span style={{ color: '#64748b', fontSize: '10px', fontWeight: 600, display: 'block', marginTop: '2px' }}>
                                {activeTrim.engine.split(' ')[1] || '1.2L'}
                              </span>
                            </div>
                            <div style={{
                              flex: 1,
                              backgroundColor: '#f8fafc',
                              border: '1px solid #e2e8f0',
                              borderRadius: '12px',
                              padding: '8px',
                              textAlign: 'center'
                            }}>
                              <span style={{ color: '#0f172a', fontWeight: 800, fontSize: '13px', display: 'block' }}>
                                {activeTrim.horsepower} PK
                              </span>
                              <span style={{ color: '#64748b', fontSize: '10px', fontWeight: 600, display: 'block', marginTop: '2px' }}>
                                Vermogen
                              </span>
                            </div>
                            <div style={{
                              flex: 1,
                              backgroundColor: '#f8fafc',
                              border: '1px solid #e2e8f0',
                              borderRadius: '12px',
                              padding: '8px',
                              textAlign: 'center'
                            }}>
                              <span style={{ color: '#0f172a', fontWeight: 800, fontSize: '13px', display: 'block' }}>
                                {vehicle.specs.seats}
                              </span>
                              <span style={{ color: '#64748b', fontSize: '10px', fontWeight: 600, display: 'block', marginTop: '2px' }}>
                                Zitplaatsen
                              </span>
                            </div>
                          </div>

                          {/* 3. Advanced Checklist Spec Bullets (Premium styled with circular blue-tinted wrappers) */}
                          <div className="d-flex flex-column gap-2.5 mb-4" style={{ fontSize: '13px', color: '#334155' }}>
                            <div className="d-flex align-items-center gap-3">
                              <div style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                backgroundColor: '#eff6ff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#3b82f6',
                                flexShrink: 0
                              }}>
                                <Settings size={14} strokeWidth={2.5} />
                              </div>
                              <span style={{ fontWeight: 500 }}>{vehicle.transmission === 'Automaat' ? 'Automatische transmissie' : 'Handgeschakelde 6-bak'}</span>
                            </div>

                            <div className="d-flex align-items-center gap-3">
                              <div style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                backgroundColor: '#eff6ff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#3b82f6',
                                flexShrink: 0
                              }}>
                                <Wind size={14} strokeWidth={2.5} />
                              </div>
                              <span style={{ fontWeight: 500 }}>{vehicle.specs.climate}</span>
                            </div>

                            <div className="d-flex align-items-center gap-3">
                              <div style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                backgroundColor: '#eff6ff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#3b82f6',
                                flexShrink: 0
                              }}>
                                <Disc size={14} strokeWidth={2.5} />
                              </div>
                              <span style={{ fontWeight: 500 }}>{vehicle.specs.rims}</span>
                            </div>

                            <div className="d-flex align-items-center gap-3">
                              <div style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                backgroundColor: '#eff6ff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#3b82f6',
                                flexShrink: 0
                              }}>
                                <ShieldAlert size={14} strokeWidth={2.5} />
                              </div>
                              <span style={{ fontWeight: 500 }}>{vehicle.specs.airbags}</span>
                            </div>

                            <div className="d-flex align-items-center gap-3">
                              <div style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                backgroundColor: '#eff6ff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#3b82f6',
                                flexShrink: 0
                              }}>
                                <Eye size={14} strokeWidth={2.5} />
                              </div>
                              <span style={{ fontWeight: 500 }}>{vehicle.specs.radar}</span>
                            </div>
                          </div>

                          {/* 4. Action button "Financiering Berekenen" with luxurious linear gradient */}
                          <button
                            onClick={() => handleOpenCalculator(vehicle)}
                            className="btn w-100 mt-auto d-flex align-items-center justify-content-center gap-2"
                            style={{
                              background: 'linear-gradient(135deg, #1e3a8a 0%, #0d9488 100%)',
                              color: '#ffffff',
                              fontWeight: 700,
                              fontSize: '14px',
                              borderRadius: '12px',
                              padding: '12px 20px',
                              border: 'none',
                              boxShadow: '0 4px 14px rgba(13, 148, 136, 0.3)',
                              transition: 'all 0.3s ease',
                              cursor: 'pointer'
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.transform = 'translateY(-1px)';
                              e.currentTarget.style.boxShadow = '0 6px 20px rgba(13, 148, 136, 0.4)';
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.transform = 'none';
                              e.currentTarget.style.boxShadow = '0 4px 14px rgba(13, 148, 136, 0.3)';
                            }}
                          >
                            <Calculator size={18} />
                            Financiering Berekenen
                          </button>

                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            
          </div>

        </div>

      </div>

      {/* ==========================================
          D. INTERACTIVE FINANCING CALCULATOR DIALOG/MODAL
          ========================================== */}
      {selectedCalculatorCar && (() => {
        const activeTrimIndex = carTrims[selectedCalculatorCar.id] || 0;
        const activeTrim = selectedCalculatorCar.trims[activeTrimIndex];
        const carPrice = activeTrim.price;

        return (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}>
            <div 
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                width: '100%',
                maxWidth: '900px',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                border: '1px solid #e2e8f0',
                position: 'relative',
                animation: 'scaleUp 0.3s ease-out'
              }}
            >
              
              {/* Modal Close Button */}
              <button
                onClick={() => setSelectedCalculatorCar(null)}
                style={{
                  position: 'absolute',
                  right: '20px',
                  top: '20px',
                  border: 'none',
                  background: '#f1f5f9',
                  color: '#64748b',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10
                }}
              >
                <X size={18} />
              </button>

              <div className="row g-0">
                
                {/* Modal Left Column: Calculator Sliders */}
                <div className="col-12 col-md-7 p-4 p-lg-5" style={{ borderRight: '1px solid #f1f5f9' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#1a5276', marginBottom: '8px' }}>
                    Lease & Financiering Berekenen
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '24px' }}>
                    Pas de schuifregelaars aan om uw gewenste maandelijks termijnbedrag te berekenen voor de <strong>{selectedCalculatorCar.make} {selectedCalculatorCar.model}</strong>.
                  </p>

                  <div className="d-flex flex-column gap-4">
                    
                    {/* Slider 1: Down Payment (Aanbetaling) */}
                    <div>
                      <div className="d-flex justify-content-between mb-2" style={{ fontSize: '13px', fontWeight: 700, color: '#475569' }}>
                        <span>Aanbetaling:</span>
                        <span style={{ color: '#1a5276', fontWeight: 800 }}>
                          € {downPayment.toLocaleString('nl-NL')}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max={Math.round(carPrice * 0.5)}
                        step="250"
                        value={downPayment}
                        onChange={e => setDownPayment(Number(e.target.value))}
                        style={{ width: '100%', accentColor: '#1a5276', cursor: 'pointer' }}
                      />
                      <div className="d-flex justify-content-between mt-1" style={{ fontSize: '10px', color: '#94a3b8' }}>
                        <span>€ 0 (Geen)</span>
                        <span>Max 50%: € {Math.round(carPrice * 0.5).toLocaleString('nl-NL')}</span>
                      </div>
                    </div>

                    {/* Slider 2: Term (Looptijd in maanden) */}
                    <div>
                      <div className="d-flex justify-content-between mb-2" style={{ fontSize: '13px', fontWeight: 700, color: '#475569' }}>
                        <span>Looptijd:</span>
                        <span style={{ color: '#1a5276', fontWeight: 800 }}>{termMonths} maanden</span>
                      </div>
                      <div className="d-flex gap-2">
                        {[12, 24, 36, 48, 60, 72].map(m => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setTermMonths(m)}
                            style={{
                              flex: 1,
                              padding: '8px 0',
                              borderRadius: '8px',
                              fontSize: '12px',
                              fontWeight: 700,
                              border: `1px solid ${termMonths === m ? '#1a5276' : '#cbd5e1'}`,
                              backgroundColor: termMonths === m ? '#1a5276' : '#ffffff',
                              color: termMonths === m ? '#ffffff' : '#475569',
                              cursor: 'pointer',
                              transition: 'all 0.15s'
                            }}
                          >
                            {m} mnd
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Slider 3: Residual Value (Slottermijn) */}
                    <div>
                      <div className="d-flex justify-content-between mb-2" style={{ fontSize: '13px', fontWeight: 700, color: '#475569' }}>
                        <span>Slottermijn (Eindbetaling):</span>
                        <span style={{ color: '#1a5276', fontWeight: 800 }}>
                          € {residualValue.toLocaleString('nl-NL')}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max={Math.round(carPrice * 0.3)}
                        step="250"
                        value={residualValue}
                        onChange={e => setResidualValue(Number(e.target.value))}
                        style={{ width: '100%', accentColor: '#1a5276', cursor: 'pointer' }}
                      />
                      <div className="d-flex justify-content-between mt-1" style={{ fontSize: '10px', color: '#94a3b8' }}>
                        <span>€ 0</span>
                        <span>Max 30%: € {Math.round(carPrice * 0.3).toLocaleString('nl-NL')}</span>
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748b', marginTop: '6px', background: '#f8fafc', padding: '6px 10px', borderRadius: '4px' }}>
                        💡 Een hogere slottermijn verlaagt uw maandelijks termijnbedrag.
                      </div>
                    </div>

                    {/* Slider 4: Interest rate (static / informative) */}
                    <div style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '10px', backgroundColor: '#f8fafc' }}>
                      <div className="d-flex justify-content-between align-items-center" style={{ fontSize: '13px' }}>
                        <span className="d-flex align-items-center gap-1.5 font-semibold text-slate-700">
                          <Landmark size={16} className="text-secondary" />
                          Effectieve rentevoet (jaarlijks):
                        </span>
                        <span style={{ color: '#22c55e', fontWeight: 800 }}>{interestRate}% JKP</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Modal Right Column: Dynamic Summary and Apply Form */}
                <div className="col-12 col-md-5 p-4 p-lg-5" style={{ backgroundColor: '#f8fafc', borderTopRightRadius: '20px', borderBottomRightRadius: '20px' }}>
                  
                  {/* Monthly Price Highlight */}
                  <div style={{
                    backgroundColor: '#1a5276',
                    borderRadius: '12px',
                    padding: '20px',
                    color: '#ffffff',
                    textAlign: 'center',
                    marginBottom: '24px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '1px', opacity: 0.8 }}>
                      Uw maandelijks tarief
                    </span>
                    <div style={{ fontSize: '36px', fontWeight: 800, margin: '4px 0' }}>
                      € {calculatedFinance.monthlyPayment}
                    </div>
                    <span style={{ fontSize: '12px', opacity: 0.9 }}>
                      inclusief BTW en {interestRate}% rente
                    </span>
                  </div>

                  {/* Finance Calculations Summary */}
                  <div className="d-flex flex-column gap-2 mb-4 pb-3 border-bottom border-secondary-subtle" style={{ fontSize: '13px', color: '#475569' }}>
                    <div className="d-flex justify-content-between">
                      <span>Consumentenprijs:</span>
                      <strong className="text-slate-800">€ {carPrice.toLocaleString('nl-NL')}</strong>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Aanbetaling:</span>
                      <strong className="text-slate-800">- € {downPayment.toLocaleString('nl-NL')}</strong>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Slottermijn:</span>
                      <strong className="text-slate-800">- € {residualValue.toLocaleString('nl-NL')}</strong>
                    </div>
                    <div className="d-flex justify-content-between" style={{ paddingLeft: '10px', borderLeft: '2px solid #cbd5e1' }}>
                      <span>Kredietbedrag:</span>
                      <strong className="text-slate-800">€ {calculatedFinance.loanAmount.toLocaleString('nl-NL')}</strong>
                    </div>
                    <div className="d-flex justify-content-between border-top border-light-subtle pt-2 mt-1">
                      <span>Totaal rentekosten:</span>
                      <strong style={{ color: '#006b99' }}>€ {calculatedFinance.totalInterest.toLocaleString('nl-NL')}</strong>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Totaal te betalen:</span>
                      <strong className="text-slate-800">€ {calculatedFinance.totalPayment.toLocaleString('nl-NL')}</strong>
                    </div>
                  </div>

                  {/* Interactive Apply Form */}
                  <form onSubmit={handleApplyFinance} className="d-flex flex-column gap-3">
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>
                      Direct vrijblijvende offerte aanvragen:
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Uw naam"
                        required
                        value={formInputs.name}
                        onChange={e => setFormInputs(prev => ({ ...prev, name: e.target.value }))}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          backgroundColor: '#ffffff',
                          fontSize: '13px',
                          outline: 'none'
                        }}
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="E-mailadres"
                        required
                        value={formInputs.email}
                        onChange={e => setFormInputs(prev => ({ ...prev, email: e.target.value }))}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          backgroundColor: '#ffffff',
                          fontSize: '13px',
                          outline: 'none'
                        }}
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Telefoonnummer"
                        required
                        value={formInputs.phone}
                        onChange={e => setFormInputs(prev => ({ ...prev, phone: e.target.value }))}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          backgroundColor: '#ffffff',
                          fontSize: '13px',
                          outline: 'none'
                        }}
                      />
                    </div>
                    {submitError && (
                      <div className="alert alert-danger" style={{ fontSize: '13px', padding: '10px 12px', borderRadius: '8px', margin: 0, backgroundColor: '#fef2f2', border: '1px solid #fee2e2', color: '#991b1b' }}>
                        ❌ {submitError}
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn w-100 d-flex align-items-center justify-content-center gap-2"
                      style={{
                        backgroundColor: isSubmitting ? '#94a3b8' : '#22c55e',
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '14px',
                        padding: '12px',
                        borderRadius: '8px',
                        border: 'none',
                        boxShadow: '0 4px 6px -1px rgba(34, 197, 94, 0.2)',
                        transition: 'background-color 0.2s',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer'
                      }}
                      onMouseEnter={e => {
                        if (!isSubmitting) e.currentTarget.style.backgroundColor = '#16a34a';
                      }}
                      onMouseLeave={e => {
                        if (!isSubmitting) e.currentTarget.style.backgroundColor = '#22c55e';
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="animate-spin" size={16} />
                          <span>Versturen...</span>
                        </>
                      ) : (
                        <>
                          <span>Vrijblijvend aanvragen</span>
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  </form>

                </div>

              </div>

            </div>
          </div>
        );
      })()}

      {/* Offerte success toast notification */}
      {showSuccessToast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#0f172a',
          color: '#ffffff',
          padding: '16px 24px',
          borderRadius: '12px',
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 10000,
          animation: 'slideInRight 0.3s ease-out'
        }}>
          <CheckCircle size={24} className="text-success" />
          <div>
            <div style={{ fontWeight: 700, fontSize: '14px' }}>Offerteaanvraag ontvangen!</div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>We nemen binnen 1 werkdag contact met u op.</div>
          </div>
        </div>
      )}

      {/* Styled inline keyframes in style block to ensure animations work natively */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      ` }} />

    </div>
  );
}
