import { describe, expect, it } from "vitest";
import { entityNamespace, namespaceEntity, runtimeInputId, runtimeInputKey } from "./entity-ids";

describe("namespaceEntity", () => {
  it("is the entity of the namespace entityNamespace spells, and a bare id's own", () => {
    expect(namespaceEntity(entityNamespace("ent-1", "inst-2"))).toBe("ent-1");
    expect(namespaceEntity("default")).toBe("default");
  });
});

describe("runtime input ids", () => {
  it("names it by an id that holds none of the characters keys are split on, and reads the key back", () => {
    const id = runtimeInputId("speaker/gain.db@2");
    expect(id).not.toMatch(/[./@]/);
    expect(runtimeInputKey(id)).toBe("speaker/gain.db@2");
    expect(runtimeInputKey("anim-joint")).toBeUndefined();
  });
});
