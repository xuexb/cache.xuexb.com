/**
 * @file session配置
 * @author xuexb <fe.xiaowu@gmail.com>
 */

export default {
    name: 'thinkjs',
    type: 'file',
    secret: 'HWTRGD@^',
    timeout: 24 * 3600,
    cookie: { // cookie options
        length: 32,
        httponly: true
    },
    adapter: {
        file: {
            path: think.RUNTIME_PATH + '/session'
        }
    }
};
