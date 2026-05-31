---
sidebar_position: 1
---

# Welcome to helios

**helios** is a modular C++23 game framework ecosystem built from first principles.

## What is helios?

helios is an educational and experimental engine architecture project organized
as focused modules with clear responsibilities and explicit dependencies.

The current documentation is organized around these repositories:

- **[helios::ecs](/docs/modules/helios-ecs)** - Generic ECS primitives and typed entity domains
- **[helios::engine](/docs/modules/helios-engine)** - Runtime, world orchestration, rendering abstractions, state, and platform contracts
- **[helios::math](/docs/modules/helios-math)** - Vector, matrix, transform, and projection helpers
- **[helios::opengl](/docs/modules/helios-opengl)** - OpenGL backend integration
- **[helios::glfw](/docs/modules/helios-glfw)** - GLFW platform/window integration

## Quick Start

Start with the module overview and then open the repository README for the module
you want to use or build.

```bash
# Main engine/runtime repository
git clone https://github.com/thorstensuckow/helios-engine.git
cd helios-engine

cmake -S . -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build
```

For local multi-repository development, place the module repositories next to each
other in the same parent directory:

```text
workspace/
  helios-engine/
  helios-ecs/
  helios-math/
  helios-opengl/
  helios-glfw/
  helios-website/
```

## Features

- **Modern C++23**: Module-based architecture with explicit package boundaries
- **Reusable ECS**: Domain-safe typed handles, sparse-set storage, and typed views
- **Math Library**: Vector, matrix, transform, and projection operations
- **Runtime Architecture**: Game loop, command buffers, event buses, state management, and resource registries
- **Rendering Integration**: Engine rendering abstractions with OpenGL backend support
- **Platform Integration**: GLFW-backed window and platform lifecycle handling
- **Documentation from READMEs**: Module pages are generated from each repository's root `README.md`

## Learning Path

1. **[Module Overview](/docs/modules)** - Understand the repository split and dependency graph
2. **[Getting Started](./getting-started)** - Clone/build the current module repositories
3. **[helios::ecs](/docs/modules/helios-ecs)** - Learn the typed-domain ECS foundation
4. **[helios::engine](/docs/modules/helios-engine)** - Explore the runtime and engine integration layer

## Project Philosophy

helios focuses on understanding engine architecture by building core systems from
first principles: typed entity identity, data-oriented component storage,
module-based dependency boundaries, explicit rendering abstractions, and
runtime orchestration through commands, events, and managers.

## Contributing

Contributions and feedback should target the relevant module repository. For
cross-module or engine-level topics, use the engine repository:

- [helios-engine issues](https://github.com/thorstensuckow/helios-engine/issues)
- [helios-engine discussions](https://github.com/thorstensuckow/helios-engine/discussions)

## Academic Context

This project originated as a computer science thesis project. The design principles,
architecture, ECS approach, and prototypical implementation are documented in:

- **[Suc25]** Suckow-Homberg, Thorsten: *helios: Design and prototypical implementation of a C++ game framework* (2025), [ResearchGate](https://www.researchgate.net/publication/397445662_helios_Design_and_prototypical_implementation_of_a_C_game_framework)
- **[Suc25b]** Suckow-Homberg, Thorsten: *helios: Explorative Entwicklung einer ECS-basierten Game Engine* (2025), [ResearchGate](https://www.researchgate.net/publication/403758780_helios_Explorative_Entwicklung_einer_ECS-basierten_Game_Engine)

## License

The helios modules are released under the MIT License. See the license file in the
corresponding module repository, for example [helios-engine/LICENSE](https://github.com/thorstensuckow/helios-engine/blob/main/LICENSE).
