"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./configs/constants");
const Post_1 = require("./entities/Post");
const path_1 = require("path");
exports.default = {
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
};
//# sourceMappingURL=mikro-orm.config.js.map