/**
 * The namespace a scene instance of an entity reads under: `entityId@instanceId`.
 * Every per-instance dot key in the values store starts with it.
 */
export function entityNamespace(entityId: string, instanceId: string): string {
  return `${entityId}@${instanceId}`;
}

/**
 * The entity a scene instance's namespace belongs to, the inverse of
 * {@link entityNamespace}. A namespace that names no instance is the
 * entity's own id.
 */
export function namespaceEntity(namespace: string): string {
  const at = namespace.indexOf("@");
  return at === -1 ? namespace : namespace.slice(0, at);
}

const RUNTIME_INPUT_PREFIX = "input:";

/**
 * The id under which Studio shows an input an entity's runtime declares
 * beyond its animatables, `key` as the runtime declares it: what an
 * animatable's id is for its input — the last segment of the dot key, the
 * `animatableId` of a track on it. The key is percent-encoded, its dots
 * included, so that the id holds no `.`, `/` or `@`, which dot keys, track
 * source ids and namespaces are split on; the prefix keeps it apart from
 * every animatable id. {@link runtimeInputKey} reads the key back.
 */
export function runtimeInputId(key: string): string {
  return `${RUNTIME_INPUT_PREFIX}${encodeURIComponent(key).replaceAll(".", "%2E")}`;
}

/** The key of a runtime input's id ({@link runtimeInputId}); `undefined` for any other id. */
export function runtimeInputKey(id: string): string | undefined {
  if (!id.startsWith(RUNTIME_INPUT_PREFIX)) return undefined;
  try {
    return decodeURIComponent(id.slice(RUNTIME_INPUT_PREFIX.length));
  } catch {
    return undefined;
  }
}
