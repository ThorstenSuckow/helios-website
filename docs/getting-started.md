---
sidebar_position: 2
---

# Getting Started

This guide explains how to work with the current split-repository version of helios.
The website documentation is generated from the root `README.md` files of the
module repositories.

## Prerequisites

Before building a module, check the module's README in the [Module Overview](./modules/overview.md).
The typical baseline is:

- **C++23 compatible compiler**
- **CMake 4.0+**
- **Git** for cloning repositories
- **OpenGL/GLFW development environment** when building rendering/platform modules
- **Dear ImGui/OpenGL backend prerequisites** when building developer UI modules

Module-specific dependencies are documented on the generated module pages.

## Repository layout

For local development, keep the repositories as siblings. This mirrors the layout
used by the website build workflow:

```text
workspace/
  helios-engine/
  helios-ecs/
  helios-math/
  helios-opengl/
  helios-glfw/
  helios-imgui/
  helios-website/
```

Clone the modules you need:

```bash
mkdir helios-workspace
cd helios-workspace

git clone https://github.com/thorstensuckow/helios-engine.git
git clone https://github.com/thorstensuckow/helios-ecs.git
git clone https://github.com/thorstensuckow/helios-math.git
git clone https://github.com/thorstensuckow/helios-opengl.git
git clone https://github.com/thorstensuckow/helios-glfw.git
git clone https://github.com/thorstensuckow/helios-imgui.git
```

## Build a module

Start with the module you want to use. For the engine module:

```bash
cd helios-engine
cmake -S . -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build
```

On Windows with Visual Studio:

```powershell
cd helios-engine
cmake -S . -B build -G "Visual Studio 17 2022" -A x64
cmake --build build --config Release
```

The backend/platform repositories can be built the same way from their own
repository roots:

```bash
cd ../helios-opengl
cmake -S . -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build

cd ../helios-glfw
cmake -S . -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build

cd ../helios-imgui
cmake -S . -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build
```

## Use installed packages

Several modules expose CMake package targets. A typical consumer links the module
it needs directly:

```cmake
find_package(helios-engine CONFIG REQUIRED)
target_link_libraries(your_target PRIVATE helios::engine)
```

Rendering/platform integrations use their own package targets:

```cmake
find_package(helios-opengl CONFIG REQUIRED)
find_package(helios-glfw CONFIG REQUIRED)
find_package(helios-imgui CONFIG REQUIRED)

target_link_libraries(your_target PRIVATE
  helios::opengl
  helios::glfw
  helios::imgui
)
```

See each module page for exact package flags and build/install commands:

- [helios::ecs](./modules/helios-ecs.md)
- [helios::engine](./modules/helios-engine.md)
- [helios::math](./modules/helios-math.md)
- [helios::opengl](./modules/helios-opengl.md)
- [helios::glfw](./modules/helios-glfw.md)
- [helios::imgui](./modules/helios-imgui.md)

## Build the website locally

The website reads module documentation from the local sibling repositories listed
above. From `helios-website`:

```bash
npm ci
npm run sync:docs
npm run dev
```

`npm run dev` runs the local README sync first and then starts the Docusaurus dev
server. The generated files under `helios-website/docs/modules/*.md` should not be
edited directly.

## Running tests

Tests are module-specific. Build the target module and run CTest from that module's
build directory:

```bash
cmake --build build
ctest --test-dir build --output-on-failure
```

For Visual Studio builds, pass the configuration:

```powershell
ctest --test-dir build -C Release --output-on-failure
```

## Next Steps

- **[Module Overview](./modules/overview.md)** - Understand the modular repository structure and dependency graph
- **[helios::ecs](./modules/helios-ecs.md)** - Start with typed entity domains and component storage
- **[helios::engine](./modules/helios-engine.md)** - Explore runtime, world orchestration, commands, events, and state
- **[Project Status](./status.md)** - Open the current repository links

## Troubleshooting

### CMake version too old

Use CMake 4.0 or newer for the module builds.

### C++23 modules are not supported by your compiler

Update to a compiler/toolchain with C++23 module support. Compiler support varies
by platform and CMake generator.

### Module repositories are not found locally

Ensure the repositories are checked out as siblings of `helios-website` when using
`npm run sync:docs` or `npm run dev`.

### OpenGL or GLFW setup fails

Check the `helios-opengl` and `helios-glfw` module pages for backend/platform
requirements and dependency notes.

### ImGui module setup fails

Check the `helios-imgui` module page for its Dear ImGui, GLFW/OpenGL backend, and
optional legacy-widget notes.

## Getting Help

- [helios-engine discussions](https://github.com/thorstensuckow/helios-engine/discussions)
- [helios-engine issues](https://github.com/thorstensuckow/helios-engine/issues)
