import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CommentsService {
  async create(createCommentDto: CreateCommentDto) {
    const comment = await Comment.create(createCommentDto);

    const commentResp = await Comment.findByPk(comment.id, {
      include: {
        model: User,
        attributes: ['name', 'lastName'],
      },
      attributes: { exclude: ['updatedAt'] },
    });

    return { comment: commentResp };
  }

  async findAll() {
    const comments = await Comment.findAll({
      include: {
        model: User,
        attributes: ['name', 'lastName'],
      },
      attributes: { exclude: ['updatedAt'] },
    });

    return { comments };
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
