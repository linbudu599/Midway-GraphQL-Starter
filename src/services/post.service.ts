import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';

import Post from '../entities/Post.entity';
import { PostCreateInput, PostUpdateInput } from '../graphql/post.type';

@Provide()
export class PostService {
  @InjectEntityModel(Post)
  postModel: Repository<Post>;

  async getAllPosts(): Promise<Post[]> {
    return await this.postModel.find({
      relations: ['author'],
    });
  }

  async getPostById(postId: number) {
    return await this.postModel.findOne(postId, { relations: ['author'] });
  }

  async createPost(createParams: PostCreateInput): Promise<Post> {
    return await this.postModel.save(createParams);
  }

  async updatePost(updateParams: PostUpdateInput) {
    await this.postModel.update(updateParams.postId, updateParams);
    return await this.getPostById(updateParams.postId);
  }

  async deletePost(id: number) {
    return await this.postModel.delete(id);
  }
}
