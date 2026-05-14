'use client';
import React from 'react';
import Link from 'next/link';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';

type AccordionItem = {
  title: string;
  enabled?: boolean | null;
  defaultOpen?: boolean | null;
  links?: { label: string; url: string; id?: string | null }[] | null;
  id?: string | null;
};

type AccordionProps = {
  items: AccordionItem[];
};

export function AccordionClient({ items }: AccordionProps) {
  const enabledItems = items.filter((item) => item.enabled !== false);

  return (
    <div className="accordion">
      {enabledItems.map((item, index) => {
        return (
          <Disclosure key={item.id ?? index} as="div" defaultOpen={!!item.defaultOpen}>
            {({ open }) => (
              <div className={`accordion-item ${open ? 'open' : ''}`}>
                <DisclosureButton className="accordion-header w-full border-none" style={{ width: '100%', textAlign: 'left', border: 'none', appearance: 'none', fontFamily: 'inherit' }}>
                  <div className="accordion-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                  </div>
                  <span className="title">{item.title}</span>
                  <span className="chevron">{open ? '▲' : '▼'}</span>
                </DisclosureButton>
                <DisclosurePanel className="accordion-body" static>
                  <ul>
                    {item.links?.map((link, linkIndex) => (
                      <li key={link.id ?? linkIndex}>
                        <Link href={link.url}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </DisclosurePanel>
              </div>
            )}
          </Disclosure>
        );
      })}
    </div>
  );
}
