/**
 * This function coerces a string into a string literal type.
 * Using tagged union types in TypeScript 2.0, this enables
 * powerful typechecking of our reducers.
 * 
 * Since every action label passes through this function it
 * is a good place to ensure all of our action labels
 * are unique.
 */

let typeCache: { [label: string]: boolean } = {};
export function type<T>(label: T | ''): T {
  if (typeCache[<string>label]) {
    throw new Error(`Action type "${label}" is not unique"`);
  }

  typeCache[<string>label] = true;

  return <T>label;
}

export const defaults = {
  pagination: { per_page: 10, items: 0, pages: 0, page: 1 }
};

export function getCachedItems(list: any): any[] {
  const items = list && (list.wants || list.collection || list.sales);
  return items || [];
}

export function goodKey(e) {
  return (
    // alpha numeric == OK
    e.which > 40 ||
    // space bar == OK
    e.keyCode === 13 ||
    // Ctrl/Alt + other keys != OK
    !e.ctrlKey ||
    !e.altKey ||
    !e.metaKey
  ) &&
    // Shift != OK
    e.keyCode !== 16 &&
    // Ctrl != OK
    e.keyCode !== 17;
}
