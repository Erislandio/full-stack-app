import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
import { Post } from '../entities/Post';
import { join as pathJoin } from 'path';

(async function main() {
    // instance
    const orm = await MikroORM.init({
        dbName: 'lireddit',
        entities: [Post],
        user: 'eris',
        password: 'root',
        debug: !__prod__,
        type: 'postgresql',
        port: 5432,
        migrations: {
            path: pathJoin(__dirname, './migrations'),
            pattern: /^[\w-]+\d+\.[tj]s$/,
        }
    });

    const post = orm.em.create(Post, { title: "Test post" });
    await orm.em.persistAndFlush(post);

})();