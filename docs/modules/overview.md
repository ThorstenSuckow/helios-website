---
title: Module Overview
description: Overview of the modular helios repository structure and links to module documentation.
slug: /modules
sidebar_label: Overview
sidebar_position: 1
---

# Module Overview

helios is now organized into dedicated repositories/modules with clear responsibilities.
This section links to documentation synchronized from each module's root `README.md`.

## Available Modules

- [helios::ecs](./helios-ecs.md): Generic ECS primitives and storage/query infrastructure
- [helios::engine](./helios-engine.md): Core runtime and engine-level systems
- [helios::math](./helios-math.md): Math types and operations for graphics/gameplay
- [helios::opengl](./helios-opengl.md): OpenGL backend integration
- [helios::glfw](./helios-glfw.md): GLFW-based platform integration
- [helios::imgui](./helios-imgui.md): Dear ImGui overlays and developer UI tools

## Module Dependency Graph

```mermaid
flowchart LR
    ECS["helios::ecs"] --> ENGINE["helios::engine"]
    MATH["helios::math"] --> ENGINE
    ENGINE --> OPENGL["helios::opengl"]
    ENGINE --> GLFW["helios::glfw"]
    ECS --> IMGUI["helios::imgui"]
    ENGINE --> IMGUI
    GLFW --> IMGUI
```

- An edge `A -> B` means: **B directly depends on A**.
- This graph shows only **internal helios module dependencies** (no third-party libraries such as GLFW/GLAD/ImGui).

## Notes

- The synchronized pages are generated automatically by `scripts/sync-changelog.mjs`.
- Edit source content in the module `README.md` files, not in generated docs.
