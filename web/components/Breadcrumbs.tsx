'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href: string;
}

const Breadcrumbs: React.FC = () => {
  const pathname = usePathname();

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    // Always start with Home
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/' }
    ];

    // If we're on the home page, return just Home
    if (pathname === '/') {
      return breadcrumbs;
    }

    // Split the pathname into segments
    const segments = pathname.split('/').filter(Boolean);

    // Build breadcrumbs from segments
    let currentPath = '';
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Generate label from segment (capitalize and replace hyphens)
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      breadcrumbs.push({
        label,
        href: currentPath
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't render breadcrumbs on home page
  if (pathname === '/') {
    return null;
  }

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs-list">
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          
          return (
            <li key={breadcrumb.href} className="breadcrumb-item">
              {!isLast ? (
                <Link href={breadcrumb.href} className="breadcrumb-link">
                  {breadcrumb.label}
                </Link>
              ) : (
                <span className="breadcrumb-current" aria-current="page">
                  {breadcrumb.label}
                </span>
              )}
              {!isLast && (
                <span className="breadcrumb-separator" aria-hidden="true">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;