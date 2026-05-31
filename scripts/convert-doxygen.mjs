#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const MODULES = [
  {
    id: 'helios-ecs',
    projectName: 'helios::ecs',
    title: 'helios::ecs API Reference',
    sourceDirs: ['src'],
  },
  {
    id: 'helios-engine',
    projectName: 'helios::engine',
    title: 'helios::engine API Reference',
    sourceDirs: ['src'],
  },
  {
    id: 'helios-math',
    projectName: 'helios::math',
    title: 'helios::math API Reference',
    sourceDirs: ['src'],
  },
  {
    id: 'helios-opengl',
    projectName: 'helios::opengl',
    title: 'helios::opengl API Reference',
    sourceDirs: ['src'],
  },
  {
    id: 'helios-glfw',
    projectName: 'helios::glfw',
    title: 'helios::glfw API Reference',
    sourceDirs: ['src'],
  },
  {
    id: 'helios-imgui',
    projectName: 'helios::imgui',
    title: 'helios::imgui API Reference',
    sourceDirs: ['src'],
  },
];

function quoteDoxygenPath(value) {
  return `"${value.replaceAll('\\', '/').replaceAll('"', '\\"')}"`;
}

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: false,
      ...options,
    });

    child.on('error', reject);
    child.on('close', (code, signal) => {
      if (code === 0) {
        resolve();
        return;
      }

      const suffix = signal ? `signal ${signal}` : `exit code ${code}`;
      reject(new Error(`${command} ${args.join(' ')} failed with ${suffix}`));
    });
  });
}

async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function assertDoxygenAvailable() {
  try {
    await run('doxygen', ['--version'], { stdio: 'ignore' });
  } catch {
    throw new Error(
      'Doxygen is required for npm run convert-doxygen. Install it locally with `brew install doxygen graphviz` or in CI with `apt-get install doxygen graphviz`.',
    );
  }
}

async function moduleInputs(module, repoRoot) {
  const moduleRoot = path.join(repoRoot, module.id);
  const inputs = [];

  for (const sourceDir of module.sourceDirs) {
    const sourcePath = path.join(moduleRoot, sourceDir);
    if (!(await pathExists(sourcePath))) {
      throw new Error(`Source directory not found for ${module.id}: ${sourcePath}`);
    }
    inputs.push(sourcePath);
  }

  const readmePath = path.join(moduleRoot, 'README.md');
  if (await pathExists(readmePath)) {
    inputs.push(readmePath);
  }

  return { moduleRoot, inputs, readmePath };
}

async function writeModuleDoxyfile({ module, websiteRoot, repoRoot }) {
  const { moduleRoot, inputs, readmePath } = await moduleInputs(module, repoRoot);
  const moduleDoxygenRoot = path.join(websiteRoot, 'doxygen', module.id);
  const generatedDoxyfilePath = path.join(moduleDoxygenRoot, 'Doxyfile');
  const warnLogPath = path.join(moduleDoxygenRoot, 'warnings.log');
  const baseDoxyfilePath = path.join(websiteRoot, 'Doxyfile');
  const hasReadme = await pathExists(readmePath);

  await fs.rm(moduleDoxygenRoot, { recursive: true, force: true });
  await fs.mkdir(moduleDoxygenRoot, { recursive: true });

  const lines = [
    `@INCLUDE = ${quoteDoxygenPath(baseDoxyfilePath)}`,
    `PROJECT_NAME = ${quoteDoxygenPath(module.projectName)}`,
    `PROJECT_BRIEF = ${quoteDoxygenPath(module.title)}`,
    `OUTPUT_DIRECTORY = ${quoteDoxygenPath(moduleDoxygenRoot)}`,
    `INPUT = ${inputs.map(quoteDoxygenPath).join(' ')}`,
    `STRIP_FROM_PATH = ${quoteDoxygenPath(moduleRoot)} ${quoteDoxygenPath(repoRoot)}`,
    `WARN_LOGFILE = ${quoteDoxygenPath(warnLogPath)}`,
  ];

  if (hasReadme) {
    lines.push(`USE_MDFILE_AS_MAINPAGE = ${quoteDoxygenPath(readmePath)}`);
  }

  await fs.writeFile(generatedDoxyfilePath, `${lines.join('\n')}\n`, 'utf8');
  return generatedDoxyfilePath;
}

async function convertModule({ module, websiteRoot, repoRoot, converterBin }) {
  console.log(`\n[convert-doxygen] ${module.id}: generating Doxygen XML...`);
  const generatedDoxyfilePath = await writeModuleDoxyfile({ module, websiteRoot, repoRoot });
  await run('doxygen', [generatedDoxyfilePath], { cwd: websiteRoot });

  console.log(`\n[convert-doxygen] ${module.id}: converting XML to Docusaurus docs...`);
  await run(process.execPath, [converterBin, '--id', module.id, '-C', websiteRoot], {
    cwd: websiteRoot,
  });
}

async function main() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const websiteRoot = path.resolve(__dirname, '..');
  const repoRoot = path.resolve(websiteRoot, '..');
  const converterBin = path.join(
    websiteRoot,
    'node_modules',
    '@xpack',
    'doxygen2docusaurus',
    'bin',
    'doxygen2docusaurus.js',
  );

  await assertDoxygenAvailable();

  if (!(await pathExists(converterBin))) {
    throw new Error('doxygen2docusaurus is not installed. Run `npm ci` before `npm run convert-doxygen`.');
  }

  console.log('[convert-doxygen] Converting helios module APIs...');
  for (const module of MODULES) {
    await convertModule({ module, websiteRoot, repoRoot, converterBin });
  }
  console.log('\n[convert-doxygen] Module API documentation completed successfully.');
}

await main().catch((err) => {
  console.error('[convert-doxygen] Error:', err.message);
  process.exit(1);
});
