---
title: Contributing to helios
description: Overview of contribution guidelines, code style, commit conventions, and testing practices.
slug: /contributing
sidebar_label: Overview
sidebar_position: 1
tags: [contributing, overview]
keywords: [helios, contributing, code style, testing, documentation]
---

# Contributing to helios

This guide provides an overview of the contribution process and links to detailed documentation.

## Quick Links

- **[Contributing Guide](./guide.md)** – Complete guide for getting started, commit conventions, pull requests, and testing
- **[Issue Tracker](https://github.com/thorstensuckow/helios/issues)** – Guidelines and templates for reports and proposals

## Getting Started

### Prerequisites

- **C++23 compatible compiler** (MSVC 19.38+, GCC 13.2+, or Clang 17+)
- **CMake 4.0** or higher
- **Git** for version control
- Familiarity with [C++ modules](https://en.cppreference.com/w/cpp/language/modules)

### Quick Setup

```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/helios.git
cd helios

# Add upstream remote
git remote add upstream https://github.com/thorstensuckow/helios.git

# Create a feature branch
git checkout -b feature/your-feature-name

# Build the project
cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug
cmake --build build --config Debug

# Run tests
cd build
ctest -C Debug --output-on-failure
```

## Contribution Workflow

1. **Choose an issue** or create a new one describing your proposed change
2. **Fork the repository** and create a feature branch
3. **Make your changes** following the conventions in the [Contributing Guide](./guide.md)
4. **Write tests** for your changes
5. **Update documentation** if you modify public APIs
6. **Commit** using [conventional commit format](./guide.md#commit-conventions)
7. **Push** to your fork and **open a pull request**

## Commit Message Format

helios follows [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

**Common types:**
- `feat:` – New feature
- `fix:` – Bug fix
- `refactor:` – Code restructuring
- `docs:` – Documentation changes
- `test:` – Test additions/changes
- `perf:` – Performance improvements

**Example:**
```
feat(rendering): add HDR rendering support

Implements tone mapping and exposure controls for HDR pipeline.

Fixes #123
```

See the [Contributing Guide](./guide.md#commit-conventions) for detailed commit conventions.

## Code Quality Standards

Before submitting a PR, ensure:

-  **Code compiles** in both Debug and Release modes
-  **All tests pass** (`ctest -C Debug --output-on-failure`)
-  **Code is formatted** (`clang-format -i <files>`)
-  **No new warnings** introduced
-  **Public APIs documented** with Doxygen comments
-  **CHANGELOG updated** (if applicable)

:::tip Automated Checks
GitHub Actions automatically runs build and test workflows on all pull requests. You can view the CI status in your PR.
:::

## Continuous Integration

helios uses GitHub Actions for automated testing and deployment:

- **Tests** – Multi-platform testing on Windows, Linux (GCC 13, Clang 17), and macOS
- **Deploy helios Documentation** – Automatically deploys website on changes to `main`
- **Custom Workflows** – Manual triggers for:
  - Rebuild website on demand
  - Generate Doxygen API documentation
  - Update changelog from GitHub milestones
  - Run performance benchmarks

See [`.github/workflows/README.md`](https://github.com/thorstensuckow/helios/tree/main/.github/workflows) for detailed workflow documentation.

## Review Process

- At least **one maintainer approval** required
- Address feedback by adding new commits (don't force-push during review)
- Maintainers may squash commits during merge for a clean history

## Resources

▸  **[Documentation](../)** – Full project documentation<br />
▸  **[Issue Tracker](https://github.com/thorstensuckow/helios/issues)** – Report bugs or request features<br />
▸  **[Discussions](https://github.com/thorstensuckow/helios/discussions)** – Ask questions<br />
▸  **[License](https://github.com/thorstensuckow/helios/blob/main/LICENSE)** – MIT License<br />

## Questions?

If you have questions or need help:

- Check the [Contributing Guide](./guide.md) for detailed instructions
- Browse [existing issues](https://github.com/thorstensuckow/helios/issues)
- Start a [discussion](https://github.com/thorstensuckow/helios/discussions)

---

Thank you for contributing to helios! 🕹️

