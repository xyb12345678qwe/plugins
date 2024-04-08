import express, { Request, Response, NextFunction } from 'express';
import { readJson, writeJson } from '../model/index.js';
import cookieParser from 'cookie-parser';

export const getReviewPlugins = express();
export const adoptPlugin = express();
export const auth = express()
auth.use(cookieParser());
getReviewPlugins.get('/', async (req, res) => {
    res.send((await readJson("plugins")).filter(item => item.review_status == 0))
})
adoptPlugin.post('/', async (req, res) => {
    const { pluginName } = req.body;
    const plugins = await readJson('plugins');
    const plugin = plugins.find(item => item.name == pluginName)
    plugin.review_status = 1;
    await writeJson('plugins', plugins);
    res.send({ message: "插件通过审核成功" });
});
auth.post('/', async (req, res) => {
    const now = new Date().getTime();
    const login = req.cookies.adminLogin || {loginStatus:false,now:now};
    if (login.loginStatus && now - login <= 24 * 60 * 60 * 1000 ) return res.send({ message: "登录成功", auth: "success" });

    const { username, password  } = req.body;
    const admin = await readJson('admin');
    if (admin.username != username || admin.password != password) return res.send({ message: "用户名或者密码不对", auth: "false" });
    login.loginStatus = true
    login.now = now
    res.cookie('adminLogin', login);
    res.send({ message: "登录成功",auth:"success"});
});
