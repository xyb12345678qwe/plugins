import path from "path";
import fs from "fs";
import readline from "readline";
import {data} from "./path.js"
/**
 *
 * @param {*} num 路径
 * @param  {...any} path
 */
export async function readJson(name, ...paths) {
  try {
    const Path = path.join(data[name], ...paths);
    const fileStream = fs.createReadStream(Path, "utf8");
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    const lines = [];
    for await (const line of rl) {
      lines.push(line);
    }

    const json = JSON.parse(lines.join(""));
    return json;
  } catch (err) {
    console.log(err);
    return "error";
  }
}
export async function writeJson(name, json, ...paths) {
  try {
    const Path = path.join(data[name], ...paths);
    const new_ARR = JSON.stringify(json, null, "\t");
    fs.writeFileSync(Path, new_ARR, "utf8");
  } catch (err) {
    console.log(err);
  }
}