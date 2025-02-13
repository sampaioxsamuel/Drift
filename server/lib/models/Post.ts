import { BelongsToMany, Column, CreatedAt, DataType, HasMany, IsUUID, Model, PrimaryKey, Scopes, Table, UpdatedAt } from 'sequelize-typescript';
import { PostAuthor } from './PostAuthor';
import { User } from './User';
import { File } from './File';

@Scopes(() => ({
  user: {
    include: [{
      model: User,
      through: { attributes: [] },
    }],
  },
  full: {
    include: [{
      model: User,
      through: { attributes: [] },
    },
    {
      model: File,
      through: { attributes: [] },
    }]
  }
}))

@Table
export class Post extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string

  @Column
  title!: string;

  @BelongsToMany(() => User, () => PostAuthor)
  users?: User[];

  @HasMany(() => File)
  files?: File[];

  @CreatedAt
  @Column
  createdAt!: Date;

  @Column
  visibility!: string;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
