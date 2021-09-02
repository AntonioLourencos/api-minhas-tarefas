import path from 'path';
import moduleAlias from 'module-alias';

const files = path.resolve(__dirname, '../..');

moduleAlias.addAliases({
    '@utils': path.join(files, 'utils'),
    '@services': path.join(files, 'services'),
    '@controllers': path.join(files, 'app/controllers'),
    '@middlewares': path.join(files, 'app/middlewares'),
    '@models': path.join(files, 'app/models'),
});
