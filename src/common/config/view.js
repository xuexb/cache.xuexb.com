/**
 * @file 模板配置
 * @author xuexb <fe.xiaowu@gmail.com>
 */

export default {
    type: 'nunjucks',
    content_type: 'text/html',
    file_ext: '.html',
    file_depr: '_',
    root_path: think.ROOT_PATH + '/view',
    adapter: {
        nunjucks: {
            trimBlocks: true,
            lstripBlocks: true
        }
    }
};
