import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { ClusterUser } from "./ClusterUser";

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  public id: string;

  @ManyToOne(() => ClusterUser, (clusterUser) => clusterUser.user)
  public clusterUsers: ClusterUser[];

  static async findOrCreate(authorId: string): Promise<User> {
    const foundUser = await User.findOne(authorId);
    if (foundUser) return foundUser;

    const user = await User.create({
      id: authorId,
    }).save();
    return user;
  }
}
