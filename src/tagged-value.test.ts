import { describe, expect, it } from "vitest";
import { toTaggedValue, fromTaggedValue } from "./tagged-value";

describe("tagged values", () => {
  it("tags a scalar by its arora variant", () => {
    expect(toTaggedValue(0.5)).toEqual({ f64: 0.5 });
    expect(toTaggedValue("x")).toEqual({ str: "x" });
    expect(toTaggedValue(true)).toEqual({ bool: true });
  });

  it("reads the scalar back", () => {
    expect(fromTaggedValue({ f64: 0.5 })).toBe(0.5);
    expect(fromTaggedValue({ str: "x" })).toBe("x");
    expect(fromTaggedValue({ bool: false })).toBe(false);
  });

  it("reads every numeric width as a number", () => {
    expect(fromTaggedValue({ f32: 1.5 })).toBe(1.5);
    expect(fromTaggedValue({ u64: 3 })).toBe(3);
    expect(fromTaggedValue({ i32: -2 })).toBe(-2);
  });

  it("reads nothing from a shape an animatable cannot hold", () => {
    expect(fromTaggedValue({ unit: null })).toBeUndefined();
    expect(fromTaggedValue({ f64s: [1, 2] })).toBeUndefined();
    expect(fromTaggedValue({ struct: { a: { f64: 1 } } })).toBeUndefined();
    expect(fromTaggedValue({ bool: "true" })).toBeUndefined();
    expect(fromTaggedValue({ f64: 1, str: "x" })).toBeUndefined();
    expect(fromTaggedValue(0.5)).toBeUndefined();
    expect(fromTaggedValue(null)).toBeUndefined();
    expect(fromTaggedValue(undefined)).toBeUndefined();
  });

  it("round-trips through JSON", () => {
    for (const value of [0.25, "label", true] as const) {
      expect(fromTaggedValue(JSON.parse(JSON.stringify(toTaggedValue(value))))).toBe(value);
    }
  });
});
