/**
 * @file 开发环境配置
 * @author xuexb <fe.xiaowu@gmail.com>
 */

export default {
    nginx_cache_path: think.ROOT_PATH + '/mock/cache',
    nginx_cache_filter(filepath) {
        return filepath.indexOf(think.ROOT_PATH + '/mock/cache/temp') === -1;
    },
    nginx_log_last_path: think.ROOT_PATH + '/mock/log/last',
    nginx_log_back_path: think.ROOT_PATH + '/mock/log/back',
    nginx_log_filter(path) {
        return !!path;
    }
};
