import path,{dirname} from 'path';
import { fileURLToPath } from 'url';
// 获取前文件的 URL
const __filename = fileURLToPath(import.meta.url);
// 获取当前文件所在的目录
const Dirpath = dirname(__filename);
const AppName = path.basename(Dirpath)
export {Dirpath,AppName}