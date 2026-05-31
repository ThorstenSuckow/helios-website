import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import fs from 'node:fs';
import path from 'node:path';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
type GeneratedSidebarItem = {
  type?: string;
  collapsed?: boolean;
  items?: GeneratedSidebarItem[];
  [key: string]: unknown;
};

function collapseGeneratedApiCategories(item: GeneratedSidebarItem): GeneratedSidebarItem {
  if (item.type === 'category') {
    item.collapsed = true;
  }

  item.items?.forEach(collapseGeneratedApiCategories);
  return item;
}

const generatedApiSidebars = [
  'sidebar-category-doxygen-helios-ecs.json',
  'sidebar-category-doxygen-helios-engine.json',
  'sidebar-category-doxygen-helios-math.json',
  'sidebar-category-doxygen-helios-opengl.json',
  'sidebar-category-doxygen-helios-glfw.json',
]
  .map((fileName) => path.join(__dirname, fileName))
  .filter((filePath) => fs.existsSync(filePath))
  .map((filePath) => collapseGeneratedApiCategories(JSON.parse(fs.readFileSync(filePath, 'utf8'))));

const sidebars: SidebarsConfig = {
  // Main documentation sidebar
  tutorialSidebar: [
    'intro',
    'status',
    {
      type: 'category',
      label: 'Modules',
      link: {
        type: 'doc',
        id: 'modules/overview'
      },
      items: [
        'modules/helios-ecs',
        'modules/helios-engine',
        'modules/helios-math',
        'modules/helios-opengl',
        'modules/helios-glfw',
      ],
    },
    {
      type: 'category',
      label: 'Contributing',
      link: {
        type: 'doc',
        id: 'contributing/overview'
      },
      items: [
        'contributing/guide',
      ],
    },
  ],
  apiSidebar: [
    'api/overview',
    ...(generatedApiSidebars as never[]),
  ],
};

export default sidebars;
