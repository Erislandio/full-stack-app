
import { User } from "../entities/User";
import { MyContext } from "../types";
import { InputType, Resolver, Ctx, Mutation, Arg, Field, ObjectType } from "type-graphql";
import argon2 from 'argon2';

@ObjectType()
class FieldError {

    @Field()
    field: string;

    @Field()
    message: string;

}

@ObjectType()
class UserResponse {

    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => User, { nullable: true })
    user?: User;
}

@InputType()
class UsernamePasswordInput {
    @Field()
    username: string;

    @Field()
    password: string;
}

@Resolver()
export class UserResolver {
    @Mutation(() => UserResponse)
    async register(@Arg('input') { password, username }: UsernamePasswordInput, @Ctx() { em }: MyContext): Promise<UserResponse> {

        if (username.length <= 2) {
            return {
                errors: [
                    {
                        field: 'username',
                        message: 'username must be greater than 2 caracters'
                    }
                ]
            }
        }

        if (password.length <= 2) {
            return {
                errors: [
                    {
                        field: 'password',
                        message: 'pasword must be greater than 2 caracters'
                    }
                ]
            }
        }

        const hashPassword = await argon2.hash(password);

        const user = em.create(User, {
            password: hashPassword,
            username
        })

        await em.persistAndFlush(user)
        return {
            user,
            errors: []
        };
    }

    @Mutation(() => UserResponse)
    async login(@Arg('input') { username, password }: UsernamePasswordInput, @Ctx() { em, req }: MyContext): Promise<UserResponse> {
        const user = await em.findOne(User, { username });

        if (!user) {
            return {
                errors: [{
                    field: 'username',
                    message: 'username not exists'
                }]
            }
        }

        const validPassword = await argon2.verify(user.password, password);

        if (!validPassword) {
            return {
                errors: [{
                    field: 'password',
                    message: 'incorrect password'
                }]
            }
        }

        req.session.userId = user.id;

        return {
            user,
            errors: []
        }

    }
}

