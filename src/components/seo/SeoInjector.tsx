import React, { useEffect } from 'react';
import { SeoInjectionSettings } from '../../types';

export const DEFAULT_SEO_SETTINGS: SeoInjectionSettings = {
  enabled: true,
  headerCode: `<!-- Google tag (gtag.js) / SEO Meta Tag Injection -->
<meta name="robots" content="index, follow" />
<meta name="author" content="aitoolshub Editorial Team" />`,
  bodyTopCode: `<!-- Body Top Injection (e.g. GTM noscript or Announcement) -->
<!-- <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXX" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript> -->`,
  footerCode: `<!-- Footer / Body Bottom Script Injection (e.g. Analytics, Chatbot) -->
<!-- Global site verification and footer tracking -->`,
};

interface SeoInjectorProps {
  settings?: SeoInjectionSettings;
}

export const SeoInjector: React.FC<SeoInjectorProps> = ({ settings }) => {
  useEffect(() => {
    const currentSettings: SeoInjectionSettings =
      settings ||
      (() => {
        try {
          const saved = localStorage.getItem('aitoolshub_seo_settings');
          return saved ? JSON.parse(saved) : DEFAULT_SEO_SETTINGS;
        } catch {
          return DEFAULT_SEO_SETTINGS;
        }
      })();

    if (!currentSettings.enabled) {
      // Remove any previously injected elements
      document.querySelectorAll('[data-aitoolshub-injected="true"]').forEach((el) => el.remove());
      return;
    }

    // 1. Inject Header Code into <head>
    const existingHeadTags = document.querySelectorAll('[data-aitoolshub-injected="head"]');
    existingHeadTags.forEach((el) => el.remove());

    if (currentSettings.headerCode && currentSettings.headerCode.trim()) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = currentSettings.headerCode.trim();

      Array.from(tempDiv.children).forEach((child) => {
        const clone = child.cloneNode(true) as HTMLElement;
        clone.setAttribute('data-aitoolshub-injected', 'head');

        // Handle inline or external scripts so they actually execute in the browser
        if (child.tagName.toLowerCase() === 'script') {
          const script = document.createElement('script');
          Array.from(child.attributes).forEach((attr) => {
            script.setAttribute(attr.name, attr.value);
          });
          script.innerHTML = child.innerHTML;
          script.setAttribute('data-aitoolshub-injected', 'head');
          document.head.appendChild(script);
        } else {
          document.head.appendChild(clone);
        }
      });
    }

    // 2. Inject Body Top Code
    let bodyTopContainer = document.getElementById('aitoolshub-body-top-injection');
    if (!bodyTopContainer) {
      bodyTopContainer = document.createElement('div');
      bodyTopContainer.id = 'aitoolshub-body-top-injection';
      document.body.prepend(bodyTopContainer);
    }
    bodyTopContainer.innerHTML = '';
    if (currentSettings.bodyTopCode && currentSettings.bodyTopCode.trim()) {
      bodyTopContainer.innerHTML = currentSettings.bodyTopCode.trim();
    }

    // 3. Inject Footer / Body Bottom Code
    let footerContainer = document.getElementById('aitoolshub-footer-injection');
    if (!footerContainer) {
      footerContainer = document.createElement('div');
      footerContainer.id = 'aitoolshub-footer-injection';
      document.body.appendChild(footerContainer);
    }
    footerContainer.innerHTML = '';
    if (currentSettings.footerCode && currentSettings.footerCode.trim()) {
      const tempFooter = document.createElement('div');
      tempFooter.innerHTML = currentSettings.footerCode.trim();

      Array.from(tempFooter.children).forEach((child) => {
        if (child.tagName.toLowerCase() === 'script') {
          const script = document.createElement('script');
          Array.from(child.attributes).forEach((attr) => {
            script.setAttribute(attr.name, attr.value);
          });
          script.innerHTML = child.innerHTML;
          footerContainer?.appendChild(script);
        } else {
          footerContainer?.appendChild(child.cloneNode(true));
        }
      });
    }

    return () => {
      // Optional cleanup on unmount
    };
  }, [settings]);

  return null;
};
