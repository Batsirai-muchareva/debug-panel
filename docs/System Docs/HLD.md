# High-Level Design (HLD)

## 1. Purpose

This document describes the high-level architecture of the data browsing system.
It focuses on responsibilities, data flow, and dependency boundaries rather than
implementation details.

---

## 2. Problem Statement

The system must:
- Consume data from external environments (WordPress, Elementor, Window)
- Normalize and manage this data consistently
- Provide filtered, searchable views
- Avoid duplicated filtering logic in UI components
- Scale without architectural rewrites

---

## 3. Architecture Overview

* External Systems
↓
* Adapter
↓
* Data Domain (Source → Provider → Manager)
↓
* React Provider
↓
* Context
↓
* Selector Hooks
↓
* UI Views

The architecture enforces **one-way data flow** and **strict ownership boundaries**.

---

## 4. Layers & Responsibilities

### Data Domain (Non-React)
- Adapts and normalizes external data
- Owns lifecycle of raw data
- Has no knowledge of UI or React

### React Data Layer
- Subscribes to the data domain
- Derives filtered data
- Owns memoization and side effects

### Selector Layer
- Read-only access to context
- Exposes minimal, intent-driven APIs

### UI Layer
- Renders views
- Never performs filtering or data mutation

---

## 5. Dependency Constraints

- UI must not import domain code
- Selector hooks must be pure
- Providers are the only mutation boundary
- Data flow must never be bidirectional

---

## 6. Non-Goals

- No global state managers (Redux, MobX)
- No per-component filtering logic
- No UI-driven data mutation

---
