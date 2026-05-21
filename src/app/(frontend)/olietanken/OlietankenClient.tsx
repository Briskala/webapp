'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Flame, ShieldAlert, Check, CheckCircle, TrendingUp, 
  Droplet, Info, ArrowRight, Clock, ShieldCheck, 
  RefreshCw, Phone, Mail, User, AlertCircle
} from 'lucide-react';
import { submitOilRequest } from '../actions/submitForms';

export default function OlietankenClient() {
  // --- STATE FOR INTERACTIVE TANK WIDGET ---
  const [tankCapacity, setTankCapacity] = useState<number>(2500); // in liters
  const [fillLevelPercent, setFillLevelPercent] = useState<number>(65); // in percent

  // --- STATE FOR SIMULATED LIVE OIL PRICES ---
  const [brentPrice, setBrentPrice] = useState<number>(74.32);
  const [brentTrend, setBrentTrend] = useState<'up' | 'down'>('up');
  const [heatingOilPrice, setHeatingOilPrice] = useState<number>(0.892); // price per liter in Euros
  const [heatingOilTrend, setHeatingOilTrend] = useState<'up' | 'down'>('up');

  // --- FORM STATE ---
  const [formInputs, setFormInputs] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: 'inspectie',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // --- SIMULATED LIVE MARKET FEED TICKER ---
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate micro-fluctuations in Brent oil price
      setBrentPrice(prev => {
        const delta = (Math.random() - 0.48) * 0.15; // slightly skewed up
        const nextPrice = Number((prev + delta).toFixed(2));
        setBrentTrend(delta >= 0 ? 'up' : 'down');
        return nextPrice;
      });

      // Simulate micro-fluctuations in heating oil price
      setHeatingOilPrice(prev => {
        const delta = (Math.random() - 0.49) * 0.003;
        const nextPrice = Number((prev + delta).toFixed(4));
        setHeatingOilTrend(delta >= 0 ? 'up' : 'down');
        return nextPrice;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // --- DERIVED TANK CALCULATIONS ---
  const currentVolume = useMemo(() => {
    return Math.round((tankCapacity * fillLevelPercent) / 100);
  }, [tankCapacity, fillLevelPercent]);

  const valueInTank = useMemo(() => {
    return Math.round(currentVolume * heatingOilPrice);
  }, [currentVolume, heatingOilPrice]);

  // Autonomy calculator: Average heating consumes ~9 liters of oil/day for a medium single family home in winter/spring
  const heatingDaysAutonomy = useMemo(() => {
    if (currentVolume <= 0) return 0;
    return Math.round(currentVolume / 9.5);
  }, [currentVolume]);

  const isLowLevel = fillLevelPercent < 20;

  // --- FORM SUBMISSION HANDLER ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await submitOilRequest({
        name: formInputs.name,
        email: formInputs.email,
        phone: formInputs.phone,
        serviceType: formInputs.serviceType.toUpperCase(),
        tankCapacity: tankCapacity,
        message: formInputs.message
      });

      if (res.success) {
        setShowSuccessToast(true);
        setFormInputs({
          name: '',
          email: '',
          phone: '',
          serviceType: 'inspectie',
          message: ''
        });
        setTimeout(() => {
          setShowSuccessToast(false);
        }, 5000);
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

  // Sparkline SVG values for mock dashboard decoration
  const brentSparklinePoints = brentTrend === 'up' 
    ? "5,45 25,35 45,38 65,22 85,28 105,15 125,8" 
    : "5,8 25,18 45,15 65,32 85,25 105,38 125,45";

  return (
    <div style={{ backgroundColor: '#f8fafc', padding: '10px 0 80px 0', fontFamily: "'Open Sans', sans-serif" }}>
      
      {/* ==========================================
          1. MARKET TICKER BAR (Premium Dark Accent)
          ========================================== */}
      <div style={{
        background: 'linear-gradient(90deg, #0f172a 0%, #1e293b 100%)',
        color: '#ffffff',
        padding: '12px 24px',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        marginBottom: '40px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        border: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div className="d-flex align-items-center gap-3">
          <span style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 800, background: '#1e3a8a', color: '#60a5fa', padding: '4px 8px', borderRadius: '4px', letterSpacing: '1px' }}>
            MARKET DATA
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
            <span style={{ color: '#94a3b8' }}>Brent Crude Oil:</span>
            <strong style={{ color: '#ffffff' }}>${brentPrice}</strong>
            <span style={{
              fontSize: '11px',
              fontWeight: 700,
              padding: '2px 6px',
              borderRadius: '4px',
              backgroundColor: brentTrend === 'up' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              color: brentTrend === 'up' ? '#22c55e' : '#ef4444',
              display: 'flex',
              alignItems: 'center',
              gap: '2px'
            }}>
              {brentTrend === 'up' ? '▲' : '▼'} {brentTrend === 'up' ? '+0.4%' : '-0.2%'}
            </span>
          </div>
        </div>

        {/* Live Sparkline Graph */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="d-none d-md-flex">
          <svg width="130" height="50" style={{ overflow: 'visible' }}>
            <polyline
              fill="none"
              stroke={brentTrend === 'up' ? '#22c55e' : '#ef4444'}
              strokeWidth="2"
              points={brentSparklinePoints}
              style={{ transition: 'all 0.5s ease' }}
            />
          </svg>
        </div>

        {/* Heating Oil (Mazout) Price */}
        <div className="d-flex align-items-center gap-3">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
            <span style={{ color: '#94a3b8' }}>Consumentenprijs Mazout (p/l):</span>
            <strong style={{ color: '#ffffff', fontSize: '14px' }}>€ {heatingOilPrice.toFixed(3)}</strong>
            <span style={{
              fontSize: '11px',
              fontWeight: 700,
              padding: '2px 6px',
              borderRadius: '4px',
              backgroundColor: heatingOilTrend === 'up' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              color: heatingOilTrend === 'up' ? '#22c55e' : '#ef4444',
              display: 'flex',
              alignItems: 'center',
              gap: '2px'
            }}>
              {heatingOilTrend === 'up' ? '▲' : '▼'}
            </span>
          </div>
        </div>
      </div>

      <div className="row g-4">
        
        {/* ==========================================
            2. LEFT COLUMN: CORE DOCUMENTATION & COPY
            ========================================== */}
        <div className="col-12 col-lg-7">
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '36px',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03), 0 2px 4px -1px rgba(0,0,0,0.02)',
            border: '1px solid #e2e8f0',
            height: '100%'
          }}>
            <div className="d-flex align-items-center gap-2 mb-3">
              <Droplet className="text-primary" size={28} style={{ fill: '#3b82f6', opacity: 0.15 }} />
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#1e3a8a', margin: 0, letterSpacing: '-0.5px' }}>
                Olietanken & Milieuadvies
              </h2>
            </div>
            
            <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.7', marginBottom: '28px' }}>
              Als toonaangevende specialist in vastgoed- en assetmanagement biedt Briskala (BPAG) hoogwaardige, veilige en milieuvriendelijke oplossingen voor het beheer, onderhoud en de sanering van stookolietanks. In nauwe samenwerking met gecertificeerde milieutechnische partners garanderen wij volledige ontzorging en absolute conformiteit met de strengste wet- en regelgeving.
            </p>

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1e3a8a', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={20} style={{ color: '#22c55e' }} />
              Onze Gecertificeerde Expertises
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Expertise 1 */}
              <div style={{ display: 'flex', gap: '16px', padding: '16px', borderRadius: '12px', border: '1px solid #f1f5f9', backgroundColor: '#f8fafc', transition: 'all 0.2s' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Clock className="text-primary" size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', margin: '0 0 4px 0' }}>Keuring & Periodiek Onderhoud</h4>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: '1.5' }}>
                    Grondige periodieke keuring en inspecties van zowel bovengrondse als ondergrondse stookolietanks door gecertificeerde technici. Inclusief reiniging, ultrasone diktemeting en lekdetectie.
                  </p>
                </div>
              </div>

              {/* Expertise 2 */}
              <div style={{ display: 'flex', gap: '16px', padding: '16px', borderRadius: '12px', border: '1px solid #f1f5f9', backgroundColor: '#f8fafc', transition: 'all 0.2s' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'rgba(239,68,68,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Flame className="text-danger" size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', margin: '0 0 4px 0' }}>Milieuvriendelijke Sanering & Verwijdering</h4>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: '1.5' }}>
                    Veilige buitengebruikstelling, lediging, dieptereiniging en fysieke verwijdering (of inertisering/opvullen met biologisch inert schuim) van tanks, inclusief het officieel verplichte saneringsattest.
                  </p>
                </div>
              </div>

              {/* Expertise 3 */}
              <div style={{ display: 'flex', gap: '16px', padding: '16px', borderRadius: '12px', border: '1px solid #f1f5f9', backgroundColor: '#f8fafc', transition: 'all 0.2s' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <ShieldAlert className="text-success" size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', margin: '0 0 4px 0' }}>Plaatsing van Moderne Dubbelwandige Tanks</h4>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: '1.5' }}>
                    Ontwerp, advisering en vakkundige installatie van de nieuwste generatie kunststof of stalen dubbelwandige opslagtanks, volledig uitgerust met permanente lekdetectiesystemen en overvulbeveiligingen.
                  </p>
                </div>
              </div>

              {/* Expertise 4 */}
              <div style={{ display: 'flex', gap: '16px', padding: '16px', borderRadius: '12px', border: '1px solid #f1f5f9', backgroundColor: '#f8fafc', transition: 'all 0.2s' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'rgba(168,85,247,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <CheckCircle className="text-purple" size={20} style={{ color: '#a855f7' }} />
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', margin: '0 0 4px 0' }}>Wettelijke Certificering & Administratie</h4>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: '1.5' }}>
                    Oplevering en registratie van de wettelijk vereiste groene/blauwe keuringsdoppen en attesten voor uw verkoopdossier, verzekering of milieuvergunning.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ==========================================
            3. RIGHT COLUMN: LIVE DYNAMIC WIDGETS
            ========================================== */}
        <div className="col-12 col-lg-5 d-flex flex-column gap-4">
          
          {/* A. INTERACTIVE STORAGE DYNAMIC TANK VISUALIZER */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '28px',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03), 0 2px 4px -1px rgba(0,0,0,0.02)',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#1e3a8a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={18} style={{ color: '#3b82f6' }} />
              Live Opslag & Autonomie Dashboard
            </h3>
            <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '20px' }}>
              Simuleer uw olietankgegevens en bereken direct uw resterende capaciteit en budget.
            </p>

            <div className="row align-items-center mb-4">
              {/* Visual SVG Tank with wavy oil gradient fill */}
              <div className="col-5 d-flex flex-column align-items-center">
                <div style={{ position: 'relative', width: '100%', maxWidth: '120px', height: '150px', backgroundColor: '#e2e8f0', borderRadius: '14px 14px 10px 10px', border: '3px solid #64748b', overflow: 'hidden' }}>
                  
                  {/* Oil liquid gradient level */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: `${fillLevelPercent}%`,
                    background: isLowLevel 
                      ? 'linear-gradient(0deg, #b91c1c 0%, #ef4444 100%)' // red if low
                      : 'linear-gradient(0deg, #1e293b 0%, #475569 50%, #64748b 100%)', // dark oil grey
                    transition: 'height 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {/* Wavy surface simulation */}
                    <div style={{
                      position: 'absolute',
                      top: '-4px',
                      left: 0,
                      right: 0,
                      height: '8px',
                      backgroundColor: isLowLevel ? '#ef4444' : '#64748b',
                      borderRadius: '50%',
                      opacity: 0.8
                    }} />
                  </div>

                  {/* Level percentage label overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '18px',
                    color: fillLevelPercent > 45 ? '#ffffff' : '#1e293b',
                    zIndex: 2,
                    textShadow: fillLevelPercent > 45 ? '1px 1px 2px rgba(0,0,0,0.5)' : 'none',
                    transition: 'color 0.4s'
                  }}>
                    {fillLevelPercent}%
                  </div>
                </div>

                {isLowLevel && (
                  <span style={{ fontSize: '10px', fontWeight: 800, color: '#ef4444', animation: 'pulse 1.5s infinite', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    ⚠️ PEIL TE LAAG
                  </span>
                )}
              </div>

              {/* Tank Calculations Summary Grid */}
              <div className="col-7 d-flex flex-column gap-2" style={{ fontSize: '13px' }}>
                <div className="d-flex justify-content-between pb-1 border-bottom border-light">
                  <span style={{ color: '#64748b' }}>Volume over:</span>
                  <strong style={{ color: '#1e293b' }}>{currentVolume.toLocaleString('nl-NL')} L</strong>
                </div>
                <div className="d-flex justify-content-between pb-1 border-bottom border-light">
                  <span style={{ color: '#64748b' }}>Autonomie (raming):</span>
                  <strong style={{ color: heatingDaysAutonomy < 30 ? '#ef4444' : '#22c55e' }}>
                    ± {heatingDaysAutonomy} dagen
                  </strong>
                </div>
                <div className="d-flex justify-content-between pb-1 border-bottom border-light">
                  <span style={{ color: '#64748b' }}>Waarde stookolie:</span>
                  <strong style={{ color: '#1e3a8a' }}>€ {valueInTank.toLocaleString('nl-NL')}</strong>
                </div>
                <div className="d-flex justify-content-between pb-1" style={{ fontSize: '11px', color: '#94a3b8' }}>
                  <span>* o.b.v. gem. verbruik 9.5L/dag</span>
                </div>
              </div>
            </div>

            {/* Sliders to control Tank State */}
            <div className="d-flex flex-column gap-3 pt-3 border-top border-slate-100">
              
              {/* Slider 1: Tank Capacity */}
              <div>
                <div className="d-flex justify-content-between align-items-center mb-1" style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>
                  <span>Tankgrootte (Capaciteit):</span>
                  <span style={{ color: '#1e3a8a', fontWeight: 800 }}>{tankCapacity.toLocaleString('nl-NL')} L</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="5000"
                  step="500"
                  value={tankCapacity}
                  onChange={e => setTankCapacity(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#1e3a8a', cursor: 'pointer' }}
                />
              </div>

              {/* Slider 2: Fill Level */}
              <div>
                <div className="d-flex justify-content-between align-items-center mb-1" style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>
                  <span>Actuele vullingsgraad:</span>
                  <span style={{ color: isLowLevel ? '#ef4444' : '#1e3a8a', fontWeight: 800 }}>{fillLevelPercent}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={fillLevelPercent}
                  onChange={e => setFillLevelPercent(Number(e.target.value))}
                  style={{ width: '100%', accentColor: isLowLevel ? '#ef4444' : '#1e3a8a', cursor: 'pointer' }}
                />
              </div>

            </div>
          </div>

          {/* B. VRIJBLIJVEND ADVIES OFFETEAANVRAAG FORM */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03), 0 2px 4px -1px rgba(0,0,0,0.02)',
            border: '1px solid #e2e8f0',
            position: 'relative'
          }}>
            
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#1e3a8a', marginBottom: '6px' }}>
              Vrijblijvend Advies Aanvragen
            </h3>
            <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '20px' }}>
              Vul uw gegevens in. Onze olietankspecialisten nemen binnen 1 werkdag contact met u op.
            </p>

            {/* Success Toast */}
            {showSuccessToast && (
              <div style={{
                backgroundColor: '#ecfdf5',
                color: '#065f46',
                border: '1px solid #a7f3d0',
                padding: '12px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <CheckCircle size={18} className="text-success" />
                <span>Aanvraag ontvangen! We nemen spoedig contact op.</span>
              </div>
            )}

            {/* Error Message */}
            {submitError && (
              <div style={{
                backgroundColor: '#fef2f2',
                color: '#991b1b',
                border: '1px solid #fec2c2',
                padding: '12px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <AlertCircle size={18} className="text-danger" />
                <span>{submitError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              
              {/* Name */}
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }}>
                  <User size={16} />
                </span>
                <input
                  type="text"
                  placeholder="Uw naam"
                  required
                  disabled={isSubmitting}
                  value={formInputs.name}
                  onChange={e => setFormInputs(prev => ({ ...prev, name: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 38px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '13px',
                    outline: 'none',
                    backgroundColor: isSubmitting ? '#f8fafc' : '#ffffff'
                  }}
                />
              </div>

              {/* Email */}
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }}>
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  placeholder="E-mailadres"
                  required
                  disabled={isSubmitting}
                  value={formInputs.email}
                  onChange={e => setFormInputs(prev => ({ ...prev, email: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 38px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '13px',
                    outline: 'none',
                    backgroundColor: isSubmitting ? '#f8fafc' : '#ffffff'
                  }}
                />
              </div>

              {/* Phone */}
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }}>
                  <Phone size={16} />
                </span>
                <input
                  type="tel"
                  placeholder="Telefoonnummer"
                  required
                  disabled={isSubmitting}
                  value={formInputs.phone}
                  onChange={e => setFormInputs(prev => ({ ...prev, phone: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 38px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '13px',
                    outline: 'none',
                    backgroundColor: isSubmitting ? '#f8fafc' : '#ffffff'
                  }}
                />
              </div>

              {/* Service Type Dropdown */}
              <div>
                <select
                  value={formInputs.serviceType}
                  disabled={isSubmitting}
                  onChange={e => setFormInputs(prev => ({ ...prev, serviceType: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '13px',
                    outline: 'none',
                    backgroundColor: isSubmitting ? '#f8fafc' : '#ffffff',
                    cursor: 'pointer'
                  }}
                >
                  <option value="inspectie">Keuring & Periodiek Onderhoud</option>
                  <option value="sanering">Sanering & Verwijdering</option>
                  <option value="plaatsing">Nieuwe Dubbelwandige Tank</option>
                  <option value="certificering">Wettelijke Certificering / Attest</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <textarea
                  placeholder="Beschrijf uw situatie of stel uw vraag (optioneel)"
                  disabled={isSubmitting}
                  value={formInputs.message}
                  onChange={e => setFormInputs(prev => ({ ...prev, message: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '13px',
                    outline: 'none',
                    minHeight: '80px',
                    resize: 'vertical',
                    backgroundColor: isSubmitting ? '#f8fafc' : '#ffffff'
                  }}
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  backgroundColor: isSubmitting ? '#94a3b8' : '#1e3a8a',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '13px',
                  padding: '12px',
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 6px -1px rgba(30, 58, 138, 0.15)',
                  transition: 'background-color 0.2s',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                onMouseEnter={e => {
                  if (!isSubmitting) e.currentTarget.style.backgroundColor = '#1e40af';
                }}
                onMouseLeave={e => {
                  if (!isSubmitting) e.currentTarget.style.backgroundColor = '#1e3a8a';
                }}
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="animate-spin" size={16} />
                    <span>Versturen...</span>
                  </>
                ) : (
                  <>
                    <span>Vrijblijvend advies aanvragen</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

            </form>

          </div>
        </div>

      </div>

      {/* Dynamic Keyframes Styling */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
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
