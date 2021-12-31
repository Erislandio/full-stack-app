"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const constants_1 = require("./constants");
const Post_1 = require("../entities/Post");
const path_1 = require("path");
(async function main() {
    const orm = await core_1.MikroORM.init({
        dbName: 'lireddit',
        entities: [Post_1.Post],
        user: 'eris',
        password: 'root',
        debug: !constants_1.__prod__,
        type: 'postgresql',
        port: 5432,
        migrations: {
            path: (0, path_1.join)(__dirname, './migrations'),
            pattern: /^[\w-]+\d+\.[tj]s$/,
        }
    });
    const post = orm.em.create(Post_1.Post, { title: "Test post" });
    await orm.em.persistAndFlush(post);
})();
//# sourceMappingURL=mikro-orm.config.js.map