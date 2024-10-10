import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

///// disable comment out when created archive version
// import versions from './versions.json'
//
// const ArchivedVersionsDropdownItems = Object.entries(VersionsArchived).splice(
//   0,
//   5,
// );

const config: Config = {
  title: 'Peace Net Document',
  // tagline: 'Dinosaurs are cool',
  favicon: 'img/peacenet.png',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'TECH-C-LT', // Usually your GitHub org/user name.
  projectName: 'Peace-Net', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja'],
  },

  customFields: {
    peace_net: '平和ネットAPI',
    guardian: 'Guardian API',
    sunshine: 'Sunshine API',
    prism: 'Prism API',
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          lastVersion: 'current',
          versions: {
            current: {
              label: '1.6.2 (latest)',
              path: '/',
            },
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/peacenet.png',
    navbar: {
      title: '平和ネットAPI',
      logo: {
        alt: 'PeaceNet logo',
        src: 'img/peacenet.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'API Reference',
        },
        {
          href: 'https://pe-ace.net/',
          label: 'Website',
          position: 'right',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownActiveClassDisabled: true,
          dropdownItemsAfter: [
            {
              type: 'html',
              value: '<hr class="dropdown-separator">',
            },
            ///// disable comment out when created archive version
            // {
            //   type: 'html',
            //   className: 'dropdown-archived-versions',
            //   value: '<b>Archived versions</b>',
            // },
            // ...ArchivedVersionsDropdownItems.map(
            //   ([versionName, versionUrl]) => ({
            //     label: versionName,
            //     href: versionUrl,
            //   }),
            // ),
            // {
            //   to: '/versions',
            //   label: 'All versions',
            // },
          ],
        },
        {
          href: 'https://github.com/TECH-C-LT/Peace-Net',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'API Reference',
              to: '/docs/overview',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Website',
              href: 'https://pe-ace.net/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/TECH-C-LT/Peace-Net',
            },
          ],
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
}

export default config
