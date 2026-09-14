/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://aitoolshub.co.in',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.8,
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: path === '/' ? 'daily' : 'weekly',
      priority: path === '/' ? 1.0 : 0.9,
      lastmod: new Date().toISOString(),
    };
  },
  additionalPaths: async (config) => {
    const additional = [
      // Core Categories
      '/finance',
      '/media-tools',
      '/text-tools',
      '/dev-tools',
      '/productivity',
      // Finance Suite
      '/finance/lumpsum-calculator',
      '/finance/car-loan-vs-lease',
      '/finance/retirement-planner',
      '/finance/inflation-impact',
      '/finance/fd-vs-mutual-fund',
      '/finance/hra-exemption',
      '/finance/nps-calculator',
      '/finance/crypto-pnl',
      '/finance/rd-calculator',
      '/finance/interest-comparator',
      // Media Suite
      '/media-tools/passport-photo-maker',
      '/media-tools/image-to-webp-png',
      '/media-tools/svg-to-png',
      '/media-tools/color-picker',
      // Text Suite
      '/text-tools/case-converter',
      '/text-tools/speech-to-text-and-back',
      // Dev Suite
      '/dev-tools/css-box-shadow-generator',
      '/dev-tools/json-validator',
      // Productivity Suite
      '/productivity/water-intake-calculator',
      '/productivity/pomodoro-timer',
    ];
    return additional.map((path) => ({
      loc: path,
      changefreq: 'weekly',
      priority: 0.9,
      lastmod: new Date().toISOString(),
    }));
  },
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Mediapartners-Google', allow: '/' },
    ],
  },
};
