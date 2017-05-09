/**
 * @file base
 * @author xuexb <fe.xiaowu@gmail.com>
 */

export default class extends think.controller.base {

    /**
     * 初始化
     *
     * @param  {Object} http http对象
     */
    init(http) {
        super.init(http);
    }

    /**
     * 前置方法
     */
    async __before() {
        const NginxCacheService = think.service('nginx_cache');
        this.nginxCache = new NginxCacheService({
            path: this.config('nginx_cache_path'),
            filter: this.config('nginx_cache_filter')
        });

        const NginxLogService = think.service('nginx_log');
        this.nginxLog = new NginxLogService({
            back_path: this.config('nginx_log_back_path'),
            last_path: this.config('nginx_log_last_path'),
            filter: this.config('nginx_log_filter')
        });
    }
}
