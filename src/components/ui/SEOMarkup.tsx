import React, { useEffect } from 'react';
import { CalculatorMeta } from '../../types';

interface SEOMarkupProps {
  meta: CalculatorMeta;
}

export const SEOMarkup: React.FC<SEOMarkupProps> = ({ meta }) => {
  useEffect(() => {
    // 1. SoftwareApplication schema
    const appSchema = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: `${meta.name} - aitoolshub`,
      operatingSystem: 'All Modern Web Browsers (Mobile, Tablet, Desktop)',
      applicationCategory: 'FinanceApplication',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR',
      },
      description: meta.description,
      featureList: meta.keyHighlights.join(', '),
      url: `https://aitoolshub.co.in${meta.path}`,
    };

    // 2. FAQPage schema
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: meta.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };

    // 3. BreadcrumbList schema
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://aitoolshub.co.in',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Calculators',
          item: 'https://aitoolshub.co.in/#calculators',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: meta.shortName,
          item: `https://aitoolshub.co.in${meta.path}`,
        },
      ],
    };

    // Inject into head
    const scriptId = `seo-jsonld-${meta.id}`;
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify([appSchema, faqSchema, breadcrumbSchema]);

    // Update document title and description
    document.title = `${meta.name} | Calculator, Schedule & Guide - aitoolshub`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', meta.description);
    }

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [meta]);

  return null;
};
