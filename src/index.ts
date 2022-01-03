import 'reflect-metadata';
import { MikroORM } from "@mikro-orm/core";
import mikroConfig from "./mikro-orm.config";
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { PostResolver } from "./resolvers/post";
import { UserResolver } from './resolvers/user';

async function main() {
    const orm = await MikroORM.init(mikroConfig);
    await orm.getMigrator().up();

    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [PostResolver, UserResolver],
            validate: false
        }),
        context: () => ({
            em: orm.em
        })
    });

    apolloServer.applyMiddleware({ app });

    app.listen(8000, () => {
        console.log('app listen on localhost:8000');
        console.log('graphql listen on localhost:8000/graphql');
    });
};

main().catch(error => console.error(error));