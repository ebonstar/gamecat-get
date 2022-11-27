import got from "got";
import { JSDOM } from "jsdom";
import { getTablesByFirstText, getTextFromNodes } from "./utils.js";

const [LR, HR, MR] = ["LR", "HR", "MR"];

/**
 * getMonsterName
 * return english monster name
 */
function getMonsterName(table) {
  const cells = getTextFromNodes(table, "td");
  return cells[0];
}

/**
 * getMonsterRank
 * return possible monster ranks
 */
function getMonsterRank(table) {
  const rank = [];
  const cells = getTextFromNodes(table, "td:first-child");
  if (cells.includes("Low")) rank.push(LR);
  if (cells.includes("High")) rank.push(HR);
  if (cells.includes("Master")) rank.push(MR);
  return rank;
}

/**
 * getMonsterMaterials
 * return monster material info
 */
function getMonsterMaterials(tables, ranks) {
  const materials = [];
  tables.forEach((table, i) => {
    const rows = [...table.querySelectorAll("tbody tr")];
    rows.forEach((row) => {
      const cells = getTextFromNodes(row, "td");

      materials.push({
        name: cells[1],
        rank: ranks[i],
        target: cells[3],
        carve: cells[4],
        capture: cells[5],
        break: cells[6],
        drop: cells[7],
        palico: cells[8],
      });
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
    "https://gamecat.fun/en/index.php?title=Monster/Aknosom"
  );

  const dom = new JSDOM(response.body);
  const page = dom.window.document;

  const tables = [...page.querySelectorAll("table.wikitable.sortable")];

  const nameTable = getTablesByFirstText(tables, "English");
  const name = getMonsterName(nameTable);

  const armourTable = getTablesByFirstText(tables, "Rank");
  const ranks = getMonsterRank(armourTable);

  const materialTables = getTablesByFirstText(
    tables,
    "Material name",
    "filter"
  );
  const materials = getMonsterMaterials(materialTables, ranks);

  const monster = {
    name,
    ranks,
    materials,
    quests: [],
  };
  console.log(monster);
}
