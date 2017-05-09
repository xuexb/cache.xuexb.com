/**
 * @file index
 * @author xuexb <fe.xiaowu@gmail.com>
 */


import Base from './base.js';

export default class extends Base {

    /**
     * 缓存列表
     */
    indexAction() {
        this.assign('list', this.nginxCache.getKeys());
        return this.display();
    }

    /**
     * 清除缓存
     */
    clearAction() {
        let keys = this.post('keys');

        this.nginxCache.delByKeys([keys]);

        return this.success();
    }

    /**
     * 清除全部缓存
     */
    clearAllAction() {
        this.nginxCache.delAll();
        return this.success();
    }

    /**
     * 日志仪表盘
     */
    dashboardAction() {
        const data = this.nginxLog.read();
        // return this.json(data)

        // 处理http状态码
        let status = {};
        for (let val of data) {
            if (!status[val.status]) {
                status[val.status] = 0;
            }
            status[val.status] += 1;
        }
        status = Object.keys(status).map(key => {
            return {
                key,
                value: status[key],
                ratio: (status[key] / data.length * 100).toFixed(2)
            };
        }).sort((a, b) => a.value < b.value ? 1 : -1);
        this.assign('status', status);

        // 处理nginx缓存状态
        let cache_status = {};
        for (let val of data) {
            if (!cache_status[val.cache_status]) {
                cache_status[val.cache_status] = 0;
            }
            cache_status[val.cache_status] += 1;
        }
        cache_status = Object.keys(cache_status).map(key => {
            return {
                key,
                value: cache_status[key],
                ratio: (cache_status[key] / data.length * 100).toFixed(2)
            };
        }).sort((a, b) => a.value < b.value ? 1 : -1);
        this.assign('cache_status', cache_status);

        // 处理访问top10
        let request_uri = {};
        for (let val of data) {
            if (!val.request_uri) {
                continue;
            }
            if (val.request_uri.indexOf('?') > 0) {
                val.request_uri = val.request_uri.substr(0, val.request_uri.indexOf('?'));
            }
            if (!request_uri[val.request_uri]) {
                request_uri[val.request_uri] = 0;
            }
            request_uri[val.request_uri] += 1;
        }
        request_uri = Object.keys(request_uri).map(key => {
            return {
                key,
                value: request_uri[key],
                ratio: (request_uri[key] / data.length * 100).toFixed(2)
            };
        }).sort((a, b) => a.value < b.value ? 1 : -1).slice(0, 10);
        this.assign('request_uri', request_uri);


        return this.display();
    }
}