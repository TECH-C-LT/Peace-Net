import type { SidebarsConfig } from '@docusaurus/plugin-content-docs'

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // apiSidebar: [{type: 'autogenerated', dirName: '.'}],
  docs: [
    {
      type: 'category',
      label: 'API 概要',
      link: { type: 'doc', id: 'overview' },
      items: ['how-to-use/basic'],
    },
    {
      type: 'category',
      label: '機能',
      items: ['features/guardian', 'features/sunshine'],
    },
    {
      type: 'category',
      label: 'プラン',
      link: { type: 'doc', id: 'plan/plan' },
      items: [],
    },
    {
      type: 'category',
      label: 'コードリファレンス',
      link: { type: 'doc', id: 'code-reference/index' },
      items: ['code-reference/node-js', 'code-reference/golang'],
    },
    {
      type: 'category',
      label: 'FAQ',
      link: { type: 'doc', id: 'faq/index' },
      items: [],
    },
  ],
}

export default sidebars
