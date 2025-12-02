# ratio-lock Demo

This folder is used to test the `ratio-lock` library types against the published npm package.

## Setup

```bash
cd demo
pnpm install
```

## Test Types

Run TypeScript type checking to verify types compile correctly:

```bash
pnpm typecheck
```

## What it tests

- `src/type-tests.tsx` - Various usage scenarios to verify:
  - Simple forms with numeric fields
  - Nested form fields with dot notation paths
  - Precision option
  - Type safety for field names (invalid names should cause compile errors)
  - Exported types (`UseRatioLockFieldOptions`)
  - Large forms (performance test)

## Testing against local build

To test against the local build instead of npm:

1. In the root folder, run `pnpm build`
2. Update `demo/package.json` to use `"ratio-lock": "file:.."`
3. Run `pnpm install` in demo folder
4. Run `pnpm typecheck`
