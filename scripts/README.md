# Website Build Scripts

This directory contains build-time scripts for the helios Docusaurus website.

## Scripts

### `convert-doxygen.mjs`

Generates module-wise API documentation from the sibling helios repositories.

**Purpose:**
- Runs Doxygen once per module repository (`helios-ecs`, `helios-engine`, `helios-math`, `helios-opengl`, `helios-glfw`)
- Uses the shared website `Doxyfile` as the common base configuration
- Writes Doxygen XML to `doxygen/<module>/xml`
- Converts each module XML tree with `doxygen2docusaurus --id <module>`
- Emits Docusaurus docs below `docs/api/<module>` and sidebar JSON files in the website root

**Prerequisites:**

```bash
brew install doxygen graphviz
npm ci
```

**Usage:**

```bash
npm run convert-doxygen
npm run build
```

The GitHub Actions workflows install `doxygen` and `graphviz` before running `npm run build`.

### `sync-changelog.mjs`

Synchronizes module overview pages from the root `README.md` files of the local
sibling repositories.

Despite its historical filename, this script no longer synchronizes changelogs,
legacy core-concept pages, or example documentation. The source of truth is the
root `README.md` of each module repository.

**Generated pages:**

| Source | Destination |
|--------|-------------|
| `../helios-ecs/README.md` | `docs/modules/helios-ecs.md` |
| `../helios-engine/README.md` | `docs/modules/helios-engine.md` |
| `../helios-math/README.md` | `docs/modules/helios-math.md` |
| `../helios-opengl/README.md` | `docs/modules/helios-opengl.md` |
| `../helios-glfw/README.md` | `docs/modules/helios-glfw.md` |

**Usage:**

```bash
npm run sync:docs
```

The script adds Docusaurus frontmatter, escapes MDX-incompatible prose, preserves
code blocks, and rewrites relative markdown links. Links that resolve to another
local synced module page are rewritten to local Docusaurus routes. Other relative
markdown links fall back to the corresponding GitHub repository URL.

## Build integration

```bash
npm run dev
npm run build
npm run serve
```

- `npm run dev` synchronizes module READMEs and starts Docusaurus.
- `npm run build` synchronizes module READMEs, regenerates module-wise API docs,
  and builds the static website.
- `npm run serve` synchronizes module READMEs, regenerates module-wise API docs,
  and serves the static build.

## Generated files

The generated documentation is intentionally ignored by Git:

- `doxygen/`
- `docs/api/helios-*/`
- `sidebar-category-doxygen-helios-*.json`
- `docusaurus-config-navbar-doxygen-helios-*.json`
- `static/img/doxygen/`

Regenerate these files locally or in CI instead of editing them manually.

## CI/CD integration

The GitHub Actions workflows check out `helios-website` and all module
repositories as siblings, install Node dependencies, install Doxygen/Graphviz,
and run `npm run build`.

## Troubleshooting

### `doxygen` or `dot` not found

Install Doxygen and Graphviz locally:

```bash
brew install doxygen graphviz
```

Then verify:

```bash
doxygen --version
dot -V
```

### Missing module source directory

Ensure the module repositories are checked out next to `helios-website`, not
inside it.

### Doxygen2Docusaurus emits unsupported C++20/23 warnings

`@xpack/doxygen2docusaurus` may log unsupported XML elements such as
`requiresclause` or `conceptparts` for modern C++ constructs. These messages are
converter limitations. They do not necessarily indicate a failed conversion if
the command exits successfully and the Docusaurus build passes.

### Broken generated API links

Regenerate from a clean state:

```bash
rm -rf doxygen docs/api/helios-* sidebar-category-doxygen-helios-*.json static/img/doxygen
npm run convert-doxygen
npm run build
```

## Maintenance

When changing these scripts:

1. Keep source-of-truth documentation in the module repository READMEs.
2. Keep generated website files ignored unless there is a deliberate decision to
   commit generated API snapshots.
3. Validate the script syntax.
4. Run the conversion and the website build.

```bash
node --check scripts/convert-doxygen.mjs
node --check scripts/sync-changelog.mjs
npm run convert-doxygen
npm run build
```

