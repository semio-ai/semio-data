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

## License

Apache-2.0
