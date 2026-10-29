# @semio/data

## 0.1.0

### Minor Changes

- 87f9c41: Initial release. `@semio/data` holds Semio's value model, licensed Apache-2.0:
  - **Value types** — the raw values (`RawValue` and its members, `RawColor` as `RawRGB | RawHSL`), the animatables that carry them (`AnimatableValue`, `AnimatableGroupType`, …), their `instanceOfRaw*` guards, and `rawRGBToHex` / `rawHSLToHex`.
  - **The store port** — Arora's data store interface (`DataStore`, `Slot`, `AroraValue`, `StateChange`), injected through `DataStoreContext` and read with `useDataStore()` and `watchKey()`.
  - **The values store** — the zustand implementation hosts inject (`useValuesStore`, `createValuesStore`, `mergeValueMaps`), presented through the port by `valuesDataStore()`.
  - **The value encoding** — `toTaggedValue` / `fromTaggedValue` between a scalar (`ScalarValue`) and its tagged arora form (`TaggedValue`), and `isNumberType`.
  - **Id conventions** — `entityNamespace` / `namespaceEntity` (the `entityId@instanceId` namespace), `runtimeInputId` / `runtimeInputKey`, and the dot-key lookups `getLookup`, `getNamespace`, `getId`.
  - **`storedEulerXYZtoRPY`**, which migrates a stored rotation from the `{ x, y, z }` form to `{ r, p, y }`.

  Every export was previously exported by `@semio/utils`, under the same name and with the same behaviour. `DataStoreContext` and `useValuesStore` are this package's own instances, distinct from those `@semio/utils` 0.5 exported.
