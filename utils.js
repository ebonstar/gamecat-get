export function getTablesByFirstText(tables, text, type) {
  const matches = tables.filter(
    (table) => table.textContent.trim().search(text) === 0
  );

  return type === "filter" ? matches : matches[0];
}

/**
 * getTextFromNodes
 * given a parent node, select all matching nodes and return their text in an array
 */
export function getTextFromNodes(parent, selector) {
  return Array.from(parent.querySelectorAll(selector)).map((element) =>
    element.textContent.trim()
  );
}
