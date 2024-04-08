import express,{ Request, Response, NextFunction } from 'express';
import fs from 'fs'
import { Dirpath } from './config.js';
import { getPlugins, setPlugins, likePlugin } from './src/apps/plugins.js';
import { getReviewPlugins , adoptPlugin , auth} from './src/apps/pluginAdmin.js'
import path from 'path'
const app = express();

const hostname = '127.0.0.1';
const port = 13333;
app.use(express.json());
app.use(express.static(path.join(Dirpath, 'public')));
app.use("/plugins/setPlugins", setPlugins);
app.use("/plugins/getPlugins", getPlugins)
app.use("/plugins/likePlugin", likePlugin)
app.use("/plugins/admin/getReviewPlugins", getReviewPlugins)
app.use("/plugins/admin/adoptPlugin", adoptPlugin)
app.use("/plugins/admin/auth",auth)
app.get('/', (req, res) => {
  // 使用res.sendFile()方法重定向到HTML文件
  res.sendFile(path.join(Dirpath + '/public/pages/plugins.html'));
});
app.get('/admin', (req, res) => {
  // 使用res.sendFile()方法重定向到HTML文件
  res.sendFile(path.join(Dirpath + '/public/pages/admin/admin.html'));
});
app.listen(port, hostname, () => {
    console.log(`服务器运行在http://${hostname}:${port}`);
});

