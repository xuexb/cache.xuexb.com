/**
 * @file nginx缓存
 * @author xuexb <fe.xiaowu@gmail.com>
 */

import {execSync} from 'child_process';
import path from 'path';
import fs from 'fs';

export default class NginxCache extends think.service.base {

    /**
     * 初始化实例
     *
     * @param {...Object} args 配置参数
     */
    init(...args) {
        super.init(...args);

        if (!args.length || !args[0] || !args[0].path) {
            throw new TypeError('nginx_cache参数配置错误');
        }

        this.options = args[0];

        if ('function' !== typeof this.options.filter) {
            this.options.filter = () => true;
        }
    }

    /**
     * 获取缓存文件的keys
     *
     * @return {Array} [{url, filepath, cache_key}]
     */
    getKeys() {
        let data = '';

        try {
            data = execSync(`grep -ar 'KEY:' .`, {
                cwd: this.options.path
            });
        }
        catch (e) {
            console.error('getKeys grep错误', e);
        }

        return String(data).split(/\n+/).filter(str => !!str).map(str => {
            const arr = str.split(':');

            return {
                url: String(arr[2]).trim(),
                cache_key: String(arr[0]).indexOf('./') === 0 ? arr[0].substr(2) : arr[0],
                filepath: path.join(this.options.path, arr[0])
            };
        }).filter(v => this.options.filter(v.filepath));
    }

    /**
     * 使用keys删除缓存文件
     *
     * @param  {Array} keys 文件keys
     */
    delByKeys(keys) {
        if (!keys || !Array.isArray(keys)) {
            throw new TypeError('参数keys必须为数组');
        }

        for (let key of keys) {
            const filepath = path.join(this.options.path, key);

            if (!fs.existsSync(filepath)) {
                continue;
            }

            fs.unlinkSync(filepath);
        }
    }

    /**
     * 删除所有缓存
     */
    delAll() {
        const root = this.options.path;
        const filter = this.options.filter;

        // 如果不存在
        if (!fs.existsSync(root)) {
            return;
        }

        let data = fs.readdirSync(root);

        for (let key of data) {
            const filepath = path.join(root, key);
            if (filter(filepath)) {
                execSync(`rm -rf ${filepath}`);
            }
        }
    }
}
