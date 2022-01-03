import { __prod__ } from './configs/constants';
import { Post } from './entities/Post';
import { join as pathJoin } from 'path';
import { MikroORM } from '@mikro-orm/core';
import { User } from './entities/User';

// instance
export default {
    dbName: 'lireddit',
    entities: [Post, User],
    user: 'eris',
    password: 'root',
    debug: !__prod__,
    type: 'postgresql',
    port: 5432,
    migrations: {
        path: pathJoin(__dirname, './migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    }
} as Parameters<typeof MikroORM.init>[0]
