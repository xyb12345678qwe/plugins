import express, { Request, Response, NextFunction } from 'express';
import { readJson, writeJson } from '../model/index.js';
import { LocalStorage } from 'node-localstorage';
const localStorage = new LocalStorage('./scratch');
import cookieParser from 'cookie-parser';
export const getPlugins = express();
export const setPlugins = express();
export const likePlugin = express();
setPlugins.use(cookieParser());
likePlugin.use(cookieParser());
getPlugins.get('/', async (req, res) => {
    res.send(await readJson("plugins"))
})
setPlugins.post('/', async (req, res) => {
    const { pluginName, author, dowUrl, dos } = req.body;
    // 获取从客户端发来的上一次提交的时间
    const lastUploadTime = req.cookies.lastUploadTime;
    const now = Date.now();

    // 限制每隔5分钟才能上传一次
    if (lastUploadTime && now - lastUploadTime < 5 * 60 * 1000) {
        return res.send({ message: "已经上传过插件了, 请等待五分钟" });
    }

    // 更新上传时间到cookies
    res.cookie('lastUploadTime', now);

    const plugins = await readJson('plugins');
    plugins.push({
        name: pluginName,
        author,
        dowUrl,
        dos,
        likes: 0,
        comments: [],
        review_status: 0
    });
    await writeJson('plugins', plugins);
    
    res.send({ message: "上传插件成功" });
});

likePlugin.post('/', async (req, res) => {
    const pluginId = req.body.pluginId;
    const likedPluginIds = req.cookies.likedPluginIds || [];
    const plugins = await readJson('plugins');
    const plugin = plugins.find(item => item.name === pluginId);
    if (!plugin) {
        return res.send({ message: "点赞出错", newLikes: 0, success: false });
    }

    // 检查是否已经点赞过了
    if (likedPluginIds.includes(pluginId)) {
        return res.send({ message: "已经点赞过了", newLikes: plugin.likes, success: false });
    }

    // 添加点赞的插件ID到cookies
    likedPluginIds.push(pluginId);
    res.cookie('likedPluginIds', likedPluginIds);

    plugin.likes += 1;
    await writeJson('plugins', plugins);
    res.send({ message: "点赞成功", newLikes: plugin.likes, success: true });
});