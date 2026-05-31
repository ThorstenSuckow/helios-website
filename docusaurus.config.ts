import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkGithubAdmonitionsToDirectives from "remark-github-admonitions-to-directives";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'helios',
  tagline: 'A C++23 Game Framework built from first principles',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://helios.garagecraft.games',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'thorstensuckow', // Usually your GitHub org/user name.
  projectName: 'helios-engine', // Usually your repo name.

  onBrokenLinks: 'warn',

  markdown: {
    format: "detect",
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          beforeDefaultRemarkPlugins: [remarkGithubAdmonitionsToDirectives],
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/thorstensuckow/helios-engine/tree/main/',
        },
        blog: false, // Disable blog for now
        theme: {
          customCss: [
              './src/css/custom-doxygen2docusaurus.css',
              './src/css/custom.css',
          ]
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    algolia: {
      appId: "LK14YGETTG",
      apiKey: "dbbc28aec6e30ac87f0e1c52f26d841d",
      indexName: "garagecraft.games",
      contextualSearch: true,
      externalUrlRegex: 'external\\.com|domain\\.com',

      searchParameters: {},
      searchPagePath: 'search',
    },
    announcementBar: {
      id: 'alpha-status',
      content: '⚠️ <strong>Alpha Status:</strong> helios is in early development. APIs may change. <a href="/helios/docs/status">Learn more</a>',
      backgroundColor: '#2a1400',
      textColor: '#ffb347',
      isCloseable: true,
    },
    navbar: {
      title: 'helios',
      logo: {
        alt: 'helios Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          type: 'docSidebar',
          sidebarId: 'apiSidebar',
          position: 'left',
          label: 'API Reference',
        },
        {
          to: '/docs/status',
          position: 'right',
          label: 'Status',
        },
        {
          href: 'https://github.com/thorstensuckow/helios-engine',
          className: "header-github-link",
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Module Overview',
              to: '/docs/modules',
            },
            {
              label: 'helios::ecs',
              to: '/docs/modules/helios-ecs',
            },
            {
              label: 'helios::engine',
              to: '/docs/modules/helios-engine',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub Discussions',
              href: 'https://github.com/thorstensuckow/helios-engine/discussions',
            },
            {
              label: 'Issues',
              href: 'https://github.com/thorstensuckow/helios-engine/issues',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Academic Paper: Game Framework',
              href: 'https://www.researchgate.net/publication/397445662_helios_Design_and_prototypical_implementation_of_a_C_game_framework',
            },
            {
              label: 'Academic Paper: ECS Engine',
              href: 'https://www.researchgate.net/publication/403758780_helios_Explorative_Entwicklung_einer_ECS-basierten_Game_Engine',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/thorstensuckow/helios-engine',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} <a href="https://thorsten.suckow-homberg.de">Thorsten Suckow-Homberg</a> / <a href="https://garagecraft.games">GarageCraft Games</a>. Licensed under MIT. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['cpp', 'cmake', 'bash', 'powershell'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
