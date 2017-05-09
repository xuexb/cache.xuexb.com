/**
 * @file nginx日志
 * @author xuexb <fe.xiaowu@gmail.com>
 */

import path from 'path';
import fs from 'fs';

export default class NginxLog extends think.service.base {
    static filename = 'access.log';

    /**
     * 初始化实例
     *
     * @param {...Object} args 配置参数
     */
    init(...args) {
        super.init(...args);

        if (!args.length || !args[0] || !args[0].last_path || !args[0].back_path) {
            throw new TypeError('nginx_log配置参数错误, 请使用({last_path, back_path})');
        }

        this.options = args[0];

        if ('function' !== typeof this.options.filter) {
            this.options.filter = () => true;
        }

    }

    /**
     * 读取nginx日志
     *
     * @param  {string} [date=last] 要读取的日期, 最新的为last
     *
     * @return {Array}
     */
    read(date = 'last') {
        let filepath;

        if (date === 'last') {
            filepath = path.join(this.options.last_path, NginxLog.filename);
        }
        else if (date) {
            filepath = path.join(this.options.back_path, date, NginxLog.filename);
        }
        else {
            throw new TypeError('date参数错误');
        }

        let data = [];

        if (filepath && !fs.existsSync(filepath)) {
            return data;
        }

        try {
            data = fs.readFileSync(filepath).toString().trim();
        }
        catch (e) {
            console.error('读取文件错误', filepath);
        }

        if (data) {
            data = data.split(/\n+/).map(str => {
                try {
                    return JSON.parse(str);
                }
                catch (e) {
                    console.error('JSON.parse失败', e);
                    return null;
                }
            }).filter(v => v !== null);
        }

        return data;
    }
}
