/**
 * The one value shape an animatable takes at runtime: the scalar of its `type`.
 * Composite animatables (vectors, eulers, colors) are flattened to one scalar
 * per axis before they reach a store, so nothing here handles an object.
 */
export type ScalarValue = number | string | boolean;

/**
 * An arora `Value` as it crosses the JS boundary: the externally tagged JSON of
 * the Rust enum, tagged by its serde name. Only the three shapes a Studio
 * animatable produces are spelled out; `fromTaggedValue` also reads the other
 * numeric tags, since a device may publish a feedback number as any width.
 */
export type TaggedValue = { f64: number } | { str: string } | { bool: boolean };

/** The serde tags of arora's numeric `Value` variants, all read as a number. */
const NUMERIC_TAGS = new Set(["f64", "f32", "i8", "i16", "i32", "i64", "u8", "u16", "u32", "u64"]);

/**
 * Whether an arora type name (a `Value` tag, a `KeyMeta.ty`) is a number's:
 * one of the numeric variants, which a number control edits and
 * {@link fromTaggedValue} reads as a number.
 */
export function isNumberType(ty: string): boolean {
  return NUMERIC_TAGS.has(ty);
}

/** The tagged `Value` JSON for a scalar: `number` is an `f64`, never an integer. */
export function toTaggedValue(value: ScalarValue): TaggedValue {
  switch (typeof value) {
    case "number":
      return { f64: value };
    case "string":
      return { str: value };
    case "boolean":
      return { bool: value };
  }
}

/**
 * The scalar inside a tagged `Value`, or `undefined` when the value is not one
 * an animatable can hold (a structure, an array, `unit`, or not a tagged value at
 * all). A caller that reads a key it bound to an animatable treats `undefined`
 * as "nothing to project", not as an error: the key is the device's to type.
 */
export function fromTaggedValue(tagged: unknown): ScalarValue | undefined {
  if (typeof tagged !== "object" || tagged === null) return undefined;
  const entries = Object.entries(tagged);
  if (entries.length !== 1) return undefined;
  const [tag, inner] = entries[0];
  if (NUMERIC_TAGS.has(tag) && typeof inner === "number") return inner;
  if (tag === "str" && typeof inner === "string") return inner;
  if (tag === "bool" && typeof inner === "boolean") return inner;
  return undefined;
}
