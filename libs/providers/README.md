# @debug-panel/providers

## 🧠 High-level verdict

### **Main strengths:** 
- Extensibility, 
- Separation of concerns
- Composability

### Plugin-based data pipeline system:
- **Providers** → logical groups (e.g. database, schema)
- **Variants** → specific data views within a provider
- **Sources** → async data producers with lifecycle (subscribe/prefetch)
- **Middleware** → transform pipeline for data shaping
- **Registry** → global orchestration layer
- **React hook** → consumption layer

## Core flow (end-to-end)
runtime flow:

```mdxjs
[ registerProvider() ]
        ↓
[ providerRegistry.add ]
        ↓
[ applyMiddleware ]
        ↓
-------------------------------------

(UI mounts)
        ↓
useProviderSource()
        ↓
variant.source.subscribe()
        ↓
createSource()
        ↓
sourceFn({ notify })
        ↓
(fetch / event / adapter)
        ↓
emit(data)
        ↓
cachedNotifier
        ↓
middleware pipeline
        ↓
compose()
        ↓
React state update
```


        ┌───────────────┐
        │   SourceFn    │
        │ (fetch/events)│
        └──────┬────────┘
               ↓
        ┌───────────────┐
        │ emit()        │
        │ (cache layer) │
        └──────┬────────┘
               ↓
        ┌───────────────┐
        │ Middleware 1  │ (keys)
        └──────┬────────┘
               ↓
        ┌───────────────┐
        │ Middleware N  │
        └──────┬────────┘
               ↓
        ┌───────────────┐
        │ compose()     │
        │ + timestamp   │
        └──────┬────────┘
               ↓
        ┌───────────────┐
        │ React state   │
        └───────────────┘

1. Clear separation of concerns
   Sources don’t know about React
   Middleware is pure transformation
   Registry is isolated
