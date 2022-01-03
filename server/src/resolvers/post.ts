import { Post } from "../entities/Post";
import { MyContext, PostInput } from "../types";
import { Resolver, Query, Ctx, Mutation, Arg } from "type-graphql";

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    posts(@Ctx() { em }: MyContext): Promise<Post[]> {
        return em.find(Post, {});
    }

    @Mutation(() => Post)
    async createPost(
        @Arg('title', () => String) title: PostInput,
        @Ctx() { em }: MyContext,
    ): Promise<Post | null> {
        const post = em.create(Post, { title })
        await em.persistAndFlush(post)
        return {
            createdAt: post.createdAt,
            id: post.id,
            title: post.title,
            updatedAt: post.updatedAt
        }
    }
}
