import { Dirpath } from "../../config.js"
import path from 'path'
export const data = {
    plugins: path.join(Dirpath, "public", "data", "plugins.json"),
    admin :path.join(Dirpath,"public","data","admin.json")
}