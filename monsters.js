import got from "got";
import { JSDOM } from "jsdom";

/**
 * getMonsterName
 * return english monster name
 */
function getMonsterName(table) {
  const cells = Array.from(table.querySelectorAll("td")).map((cell) =>
    cell.textContent.trim()
  );
  return cells[0];
}

/**
 * getMonsterMaterials
 * return monster material info
 */
function getMonsterMaterials(table) {
  const materials = [];
  const rows = Array.from(table.querySelectorAll("tbody tr"));
  rows.forEach((row) => {
    const cells = Array.from(row.querySelectorAll("td")).map((cell) =>
      cell.textContent.trim()
    );

    materials.push({
      name: cells[1],
      target: cells[3],
      carve: cells[4],
      capture: cells[5],
      break: cells[6],
      drop: cells[7],
      palico: cells[8],
    });
  });
  return materials;
}

/**
 * getMonsters
 * return array of monsters and their data (name, materials, quests)
 */
export async function getMonsters() {
  const response = await got(
    "https://gamecat.fun/en/index.php?title=Monster/Astalos"
  );

  const dom = new JSDOM(response.body);
  const page = dom.window.document;

  const monster = {};
  const tables = page.querySelectorAll("table.wikitable.sortable");
  tables.forEach((table) => {
    const headers = Array.from(table.querySelectorAll("th")).map((header) =>
      header.textContent.trim()
    );
    if (headers.includes("Japanese")) monster.name = getMonsterName(table);
    if (headers.includes("Material name"))
      monster.materials = getMonsterMaterials(table);
  });
  console.log(monster);
}
