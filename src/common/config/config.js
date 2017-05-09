/**
 * @file 配置
 * @author xuexb <fe.xiaowu@gmail.com>
 */

export default {
    route_on: true,
    nginx_cache_path: '/var/cache/nginx/xuexb.com',
    nginx_cache_filter(filepath) {
        return filepath.indexOf('/var/cache/nginx/xuexb.com/temp') === -1;
    },
    nginx_log_last_path: '/var/log/nginx/xuexb.com/last',
    nginx_log_back_path: '/var/log/nginx/xuexb.com/back',
    // nginx_log_filter(path) {
    //     return !!path;
    // }
};
