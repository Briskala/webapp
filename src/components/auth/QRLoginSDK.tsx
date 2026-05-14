'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import QRCode from 'react-qr-code';
import { ChevronLeft, Globe, Smartphone, Info, HelpCircle } from 'lucide-react';
import { GoogleLoginButton } from '@/components/auth/GoogleLoginButton';

type Props = {
  sessionToken: string;
};

export function QRLoginSDK({ sessionToken }: Props) {
  const router = useRouter();
  const [showMobileView, setShowMobileView] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [language, setLanguage] = useState('nl');
  
  // Modals/Dialogs
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [altLoginDialogOpen, setAltLoginDialogOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        userAgent.toLowerCase()
      );
      setIsMobileDevice(isMobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'nl' : 'en');
  };

  const handleVerificatieAppLogin = () => {
    if (isMobileDevice) {
      const verificatieAppUri = `verificatie://login?token=${sessionToken}`;
      window.location.href = verificatieAppUri;
    } else {
      setQrDialogOpen(true);
    }
  };

  const handleAlternativeLogin = () => {
    setAltLoginDialogOpen(true);
  };

  return (
    <div style={{ fontFamily: 'inherit' }}>
      {/* Header removed as requested */}
      
      <main style={{ maxWidth: '800px', margin: '40px auto', padding: '0 16px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#1a5276', marginBottom: '32px' }}>
          {language === 'nl' ? 'Verificatie SDK Test' : 'Verification SDK Test'}
        </h1>
        
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: '#333' }}>
            {language === 'nl' ? 'Authenticatie Opties' : 'Authentication Options'}:
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button 
              onClick={handleVerificatieAppLogin}
              style={{ 
                background: '#1a5276', color: '#fff', padding: '12px 24px', borderRadius: '4px', 
                border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px',
                fontSize: '15px', fontWeight: 600, transition: 'background 0.2s', maxWidth: '400px'
              }}
            >
              <div style={{ width: '24px', height: '24px', background: '#fff', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a5276', fontWeight: 'bold', fontSize: '12px' }}>V</div>
              <span>{language === 'nl' ? 'Inloggen met Verificatie App' : 'Login with Verificatie App'}</span>
            </button>
            
            <button 
              onClick={handleAlternativeLogin}
              style={{ 
                background: '#f7f9fb', color: '#1a5276', padding: '12px 24px', borderRadius: '4px', 
                border: '1px solid #d0dce8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px',
                fontSize: '15px', fontWeight: 600, transition: 'background 0.2s', maxWidth: '400px'
              }}
            >
              <HelpCircle size={20} />
              <span>{language === 'nl' ? 'Alternatieve Inlogmethoden' : 'Alternative Login Methods'}</span>
            </button>
            
            <div style={{ background: '#e8f0f8', padding: '12px 16px', borderRadius: '4px', display: 'flex', alignItems: 'flex-start', gap: '12px', marginTop: '8px', maxWidth: '600px' }}>
              <Info size={20} color="#2471a3" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{ fontSize: '13px', color: '#444', margin: 0, lineHeight: 1.5 }}>
                {language === 'nl' 
                  ? `Uw sessie token is: ${sessionToken}. Deze token wordt geregistreerd in het beveiligde logboek.` 
                  : `Your session token is: ${sessionToken}. This token is securely logged in the system.`}
              </p>
            </div>
          </div>
          
          {!isMobileDevice && (
            <button
              style={{ color: '#2471a3', background: 'none', border: 'none', marginTop: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600 }}
              onClick={() => setShowMobileView(!showMobileView)}
            >
              <Smartphone size={16} />
              {showMobileView ? 
                (language === 'nl' ? 'Verberg Mobiele Weergave' : 'Hide Mobile View') : 
                (language === 'nl' ? 'Toon Mobiele Weergave' : 'Show Mobile View')
              }
            </button>
          )}
        </div>
        
        {showMobileView && (
          <div style={{ marginBottom: '40px', border: '1px solid #e0e0e0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', maxWidth: '320px', margin: '0 auto' }}>
            <div style={{ background: '#f7f9fb', padding: '8px 16px', borderBottom: '1px solid #e0e0e0', display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '60px', height: '4px', background: '#ccc', borderRadius: '4px' }}></div>
            </div>
            <div style={{ padding: '32px 16px', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '64px', height: '64px', background: '#1a5276', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '32px', marginBottom: '16px' }}>
                V
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, textAlign: 'center', marginBottom: '8px', color: '#333' }}>
                Verificatie App
              </h3>
              <p style={{ fontSize: '13px', color: '#666', textAlign: 'center', marginBottom: '24px' }}>
                {language === 'nl' ? 'Scan deze QR-code met de app' : 'Scan this QR code with the app'}
              </p>
              <div style={{ padding: '12px', background: '#f0f4f8', borderRadius: '8px' }}>
                <QRCode
                  value={`verificatie://login?token=${sessionToken}`}
                  size={160}
                  level="H"
                  fgColor="#1a5276"
                  bgColor="transparent"
                />
              </div>
            </div>
          </div>
        )}
        
        <div style={{ marginTop: '60px', borderTop: '1px solid #e0e0e0', paddingTop: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#333' }}>Links:</h2>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link href="/terms" style={{ color: '#2471a3', fontSize: '13px', textDecoration: 'none' }}>
              {language === 'nl' ? 'Gebruiksvoorwaarden' : 'Terms of Service'}
            </Link>
            <Link href="/privacy" style={{ color: '#2471a3', fontSize: '13px', textDecoration: 'none' }}>
              {language === 'nl' ? 'Privacybeleid' : 'Privacy Policy'}
            </Link>
            <Link href="/support" style={{ color: '#2471a3', fontSize: '13px', textDecoration: 'none' }}>
              Support
            </Link>
          </div>
        </div>
      </main>

      {/* QR Code Dialog / Modal overlay */}
      {qrDialogOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: '#fff', borderRadius: '8px', padding: '32px', maxWidth: '400px', width: '90%', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button 
              onClick={() => setQrDialogOpen(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#666' }}
            >×</button>
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px', color: '#1a5276' }}>
              {language === 'nl' ? 'Scan de QR-code' : 'Scan QR Code'}
            </h2>
            <div style={{ padding: '16px', background: '#f0f4f8', borderRadius: '8px', marginBottom: '24px' }}>
              <QRCode
                value={`verificatie://login?token=${sessionToken}`}
                size={200}
                level="H"
                fgColor="#1a5276"
                bgColor="transparent"
              />
            </div>
            <p style={{ fontSize: '13px', color: '#555', textAlign: 'center', marginBottom: '16px' }}>
              {language === 'nl' 
                ? 'Open de Verificatie App op uw telefoon en scan deze code om veilig in te loggen.' 
                : 'Open the Verificatie App on your phone and scan this code to log in securely.'}
            </p>
            <button 
              onClick={() => { setQrDialogOpen(false); setAltLoginDialogOpen(true); }}
              style={{ background: 'none', border: 'none', color: '#2471a3', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
            >
              {language === 'nl' ? 'Problemen met scannen?' : 'Having trouble scanning?'}
            </button>
          </div>
        </div>
      )}

      {/* Alternative Login Methods Modal */}
      {altLoginDialogOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: '#fff', borderRadius: '8px', padding: '32px', maxWidth: '400px', width: '90%', position: 'relative' }}>
            <button 
              onClick={() => setAltLoginDialogOpen(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#666' }}
            >×</button>
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: '#1a5276' }}>
              {language === 'nl' ? 'Kies inlogmethode' : 'Choose login method'}
            </h2>
            <p style={{ fontSize: '13px', color: '#555', marginBottom: '24px' }}>
              {language === 'nl' 
                ? 'Kies een van de volgende methoden om in te loggen op uw account.' 
                : 'Choose one of the following methods to log into your account.'}
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <GoogleLoginButton />
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#9ca3af', fontSize: '12px', margin: '4px 0' }}>
                <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }}></div>
                of
                <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }}></div>
              </div>

              <button style={{ width: '100%', padding: '12px', background: '#f8f9fa', border: '1px solid #d0dce8', borderRadius: '4px', textAlign: 'left', fontWeight: 600, color: '#333', cursor: 'pointer' }}>
                🔹 DigiD Inloggen
              </button>
              <button style={{ width: '100%', padding: '12px', background: '#f8f9fa', border: '1px solid #d0dce8', borderRadius: '4px', textAlign: 'left', fontWeight: 600, color: '#333', cursor: 'pointer' }}>
                🇪🇺 EU Login
              </button>
              <button style={{ width: '100%', padding: '12px', background: '#f8f9fa', border: '1px solid #d0dce8', borderRadius: '4px', textAlign: 'left', fontWeight: 600, color: '#333', cursor: 'pointer' }}>
                💳 e-ID Inloggen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

