import React from 'react';
import { AdminNavbar } from './AdminNavbar';
import { AdminLoginSimpleFooter } from './AdminLoginSimpleFooter';
import '@/app/(frontend)/styles.css';

export const AdminLoginHeader = () => {
  return (
    <>
      <link rel="stylesheet" href="/assets/css/brand.css" />
      <style dangerouslySetInnerHTML={{ __html: `
        /* Overrides for Payload CMS Login Page */
        html, body, #app, #__next {
          background: #ffffff !important;
          background-image: none !important;
        }
        
        /* Remove Payload default background images/styles on the login page */
        main, main[class*="template-default"], main[class*="payload-default"] {
          background: transparent !important;
          background-image: none !important;
          padding: 0 !important;
          margin: 0 !important;
          max-width: 100% !important;
        }
        
        /* The main login wrapper */
        div[class*="login__wrap"] {
          background: transparent !important;
          box-shadow: none !important;
          padding: 0 !important;
          margin: 0 auto !important;
          height: auto !important;
          min-height: auto !important;
        }

        /* The actual login form box */
        form {
          max-width: 400px;
          margin: 120px auto 40px auto;
          background: #fff;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          position: relative;
          z-index: 10;
        }

        /* Hide the default logo since we have the Header */
        div[class*="login__brand"], .payload-brand {
          display: none !important;
        }
        
        /* Ensure the Header and Footer span full width */
        .admin-login-header-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          z-index: 1000;
        }
        
        .admin-login-footer-wrapper {
          position: relative;
          width: 100%;
          z-index: 1000;
          margin-top: 60px;
        }
      ` }} />
      <div className="admin-login-header-wrapper">
        <AdminNavbar />
      </div>
    </>
  );
};

export const AdminLoginFooter = () => {
  return (
    <div className="admin-login-footer-wrapper">
      <AdminLoginSimpleFooter />
    </div>
  );
};
