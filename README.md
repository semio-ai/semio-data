# @semio/data

Semio's value model: animatable value types, the data store port, its values
store, and Arora value encoding and id conventions. Has no other `@semio/*`
dependencies, so it can be used on its own.

## Installation

```bash
npm install @semio/data
```

Runtime dependencies: `color`, `react` and `zustand`.

## What's inside

| Area                                | Exports                                                                                                                  | Notes                                                            |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| **Value types / colour conversion** | `AnimatableValue`, `RawValue`, raw value guards, `rawRGBToHex`, `rawHSLToHex`                                            | Animatable specifications and composite value shapes.            |
| **Store port**                      | `DataStore`, `DataStoreContext`, `useDataStore`, `watchKey`, `AroraValue`, `Slot`, `StateChange`                         | Arora's read, slot and subscribe interface with tagged values.   |
| **Values store**                    | `createValuesStore`, `useValuesStore`, `valuesDataStore`, `mergeValueMaps`, `ValuesStore`, `ValuesData`, `ValuesActions` | Runtime value and velocity maps, exposed through the store port. |
| **Value encoding**                  | `ScalarValue`, `TaggedValue`, `isNumberType`, `toTaggedValue`, `fromTaggedValue`                                         | Tagged Arora scalar encoding and numeric widths.                 |
| **Id conventions**                  | `entityNamespace`, `namespaceEntity`, `runtimeInputId`, `runtimeInputKey`                                                | Entity instance namespaces and runtime input ids.                |
| **Namespace lookups**               | `getLookup`, `getNamespace`, `getId`                                                                                     | Dot-separated lookup keys.                                       |
| **Euler migration**                 | `storedEulerXYZtoRPY`                                                                                                    | Stored XYZ rotations expressed as roll, pitch and yaw.           |

Everything is re-exported from the package root.

## Usage

```tsx
import { DataStoreContext, createValuesStore, valuesDataStore, watchKey } from "@semio/data";

const values = createValuesStore();
const store = valuesDataStore(values);

<DataStoreContext.Provider value={store}>
  {/* a scene, a Vizij, a timeline */}
</DataStoreContext.Provider>;

store.slot("my.animatable.id").set({ f64: 0.5 });
const stop = watchKey(store, "my.animatable.id", 0, (value) => console.log(value));
```

`subscribe` starts each subscriber from the store's whole state, then hands it
each change (`{ set, unset }`, Arora's `StateChange`).

## Development

```bash
npm ci
npm test
npm run lint
npm run typecheck
npm run build
```

Semio Studio mounts this repository as a git submodule at `packages/data` and develops it
from source there.

A changeset for this library belongs in this repository's `.changeset/`. Inside Studio's
mount, the changesets CLI resolves to Studio's workspace root and writes into Studio's
`.changeset/` instead, which Studio's CI rejects. There, write the file by hand under
`packages/data/.changeset/`, or run `npx changeset` from a standalone clone.

## Releasing

Add a changeset for each pull request that changes the published package. Changesets opens
a Version Packages PR for the next version. Staging does not wait for that PR: every main
run stages the current version when npm has not published it and neither `staged/v<version>`
nor `v<version>` exists on origin, even with pending changesets.

The build uses the version commit: the latest first-parent commit on main changing the
`package.json` version line, whose version must match the current version. A merge commit
merging a Version PR counts as that commit. Its own worktree and `npm ci` keep later code
and Changesets branch handling out of the build. Successful staging creates an annotated
`staged/v<version>` there. A maintainer approves it with 2FA on npmjs.com → package → Staged
Packages, or with `npm stage approve <id>`. The next run validates each marker's ancestry
on main and package version, tags `v<version>` at its commit after npm reports publication,
and deletes the marker. An unapproved annotated marker older than seven days warns with
approval or cleanup instructions. A published current version missing both tags gets its
`v<version>` at the version commit, including when the marker push failed.

Runs happen daily, on main pushes, or by manual dispatch on main. GitHub disables public
schedules after 60 days without activity; after that, use a main push or dispatch.

A rejected version may not be stageable again under the same number; npm's documentation
does not say. Restage by bumping the version with another changeset, and delete the rejected
version's `staged/v<version>` tag from origin.

## License

Apache-2.0
