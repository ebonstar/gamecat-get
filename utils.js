/**
 * getTextFromNodes
 * given a parent node, select all matching nodes and return their text in an array
 */
export function getTextFromNodes(parent, selector) {
  return Array.from(parent.querySelectorAll(selector)).map((element) =>
    element.textContent.trim()
  );
}
