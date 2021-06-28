import { Provide, Inject, App } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { IMidwayKoaApplication } from '@midwayjs/koa';

import { Resolver, Query, Arg, Int, Mutation, Ctx } from 'type-graphql';
import { Repository } from 'typeorm';

import Post from '../entities/Post.entity';
import { PostService } from '../services/post.service';

import { PostCreateInput, PostUpdateInput } from '../graphql/post.type';
import { IContext } from '../typing';

@Provide()
@Resolver(of => Post)
export default class PostResolver {
  @App()
  app: IMidwayKoaApplication;

  @InjectEntityModel(Post)
  PostModel: Repository<Post>;

  @Inject()
  postService: PostService;

  @Query(returns => [Post])
  async GetAllPosts(@Ctx() context: IContext): Promise<Post[]> {
    return await this.postService.getAllPosts();
  }

  @Query(returns => Post, { nullable: true })
  async GetPostById(@Arg('id', type => Int) id: number) {
    return await this.postService.getPostById(id);
  }

  @Mutation(returns => Post, { nullable: true })
  async CreatePost(
    @Arg('createParams', type => PostCreateInput) createParams: PostCreateInput
  ) {
    return await this.postService.createPost(createParams);
  }

  @Mutation(returns => Post, { nullable: true })
  async UpdatePost(
    @Arg('updateParams', type => PostUpdateInput)
    updateParams: PostUpdateInput
  ) {
    return await this.postService.updatePost(updateParams);
  }

  @Mutation(returns => Post, { nullable: true })
  async DeletePost(
    @Arg('id', type => Int)
    id: number
  ) {
    const post = await this.GetPostById(id);
    await this.postService.deletePost(id);
    return post;
  }
}
