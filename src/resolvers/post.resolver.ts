import { Provide, Inject, App } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { IMidwayKoaApplication } from '@midwayjs/koa';

import { Resolver, Query, Arg, Int, Mutation, Ctx } from 'type-graphql';
import { Repository } from 'typeorm';

import Post from '../entities/Post.entity';
import { PostService } from '../services/post.service';

import { PostCreateInput, PostUpdateInput } from '../graphql/Post.type';
import { IContext } from '../typing';

@Provide()
@Resolver(of => Post)
export default class PostResolver {
  @App()
  app: IMidwayKoaApplication;

  @InjectEntityModel(Post)
  PostModel: Repository<Post>;

  @Inject()
  PostService: PostService;

  @Query(returns => [Post])
  async GetAllPosts(@Ctx() context: IContext): Promise<Post[]> {
    return await this.PostService.getAllPosts();
  }

  @Query(returns => Post)
  async GetPostById(@Arg('id', type => Int) id: number) {
    return await this.PostService.getPostById(id);
  }

  @Mutation(returns => Post)
  async CreatePost(
    @Arg('createParams', type => PostCreateInput) createParams: PostCreateInput
  ) {
    return await this.PostService.createPost(createParams);
  }

  @Mutation(returns => Post)
  async UpdatePost(
    @Arg('updateParams', type => PostUpdateInput)
    updateParams: PostUpdateInput
  ) {
    return await this.PostService.updatePost(updateParams);
  }

  @Mutation(returns => Post)
  async DeletePost(
    @Arg('id', type => Int)
    id: number
  ) {
    return await this.PostService.deletePost(id);
  }
}
