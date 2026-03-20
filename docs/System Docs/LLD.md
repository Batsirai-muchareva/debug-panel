# Low-Level Design (LLD)

## 1. FilteredDataProvider Lifecycle

1. Subscribe to raw data via `useProvider`
2. Sync path indexes
3. Build filter pipeline
4. Apply filters
5. Emit derived data via context
6. Trigger side effects (indexing)

---

## 2. Context Shape

```ts
type FilteredDataContextValue = {
  data: Data | null;
};
```

null indicates data not ready
Empty collections indicate valid but empty results

## 3. Selector Hooks

- useFilteredData
    - Returns the full filtered dataset.

- useHasData 
  - Returns a boolean indicating presence of data.

- useFilteredMeta
  - Returns derived metadata (counts, keys).

Selectors:
- Must not mutate
- Must not trigger side effects
- Must be memoized when necessary

## 4. Memoization Strategy

Filter pipeline memoized on filter inputs

Filtered result memoized on raw data + pipeline

Selector hooks avoid re-deriving heavy structures

## 5. Side Effects

Side effects (e.g. lineMap.buildLineMap) are:

Triggered in useEffect

Driven by derived data changes

Isolated from pure derivation
