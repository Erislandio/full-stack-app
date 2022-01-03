
import { Post } from '../entities/Post';
import { MyContext } from '../types';
import { Resolver, Query, Ctx, Mutation } from 'type-graphql';

@Resolver()
export class PostResolver {

    @Query(() => [Post])
    posts(@Ctx() { em }: MyContext): Promise<Post[]> {
        return em.find(Post, {});
    }

    @Mutation(() => Post)
    async post(@Ctx() { }: MyContext, params: any): Promise<Post> {
        console.log(params)
        return await {
            createdAt: new Date(),
            id: 1,
            title: '',
            updatedAt: new Date()
        }
    }
}