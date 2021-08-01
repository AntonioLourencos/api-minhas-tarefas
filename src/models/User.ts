import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import Bcrypt from "bcrypt";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: String;

  @Column()
  email: String;

  @Column()
  password: String;

  @Column({ nullable: true })
  token_reset: String;

  @Column()
  createAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassowrd() {
    this.password = Bcrypt.hashSync(String(this.password), 10);
  }
}

export default User;
