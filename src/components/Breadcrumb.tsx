import React from 'react';
import Link from 'next/link';

type BreadcrumbProps = {
  pageTitle?: string;
};

export function Breadcrumb({ pageTitle = 'Home' }: BreadcrumbProps) {
  return (
    <div className="breadcrumb">
      <div className="inner">
        <span>You are here: </span>
        {pageTitle === 'Home' ? (
          <Link href="/">Home</Link>
        ) : (
          <span>{pageTitle}</span>
        )}
      </div>
    </div>
  );
}
