import { promises as fs } from "fs";
import path from "path";

const dataDir = path.resolve("data");

export const readData = async (filename) => {
  const filePath = path.join(dataDir, filename);
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
};

export const writeData = async (filename, data) => {
  const filePath = path.join(dataDir, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};
