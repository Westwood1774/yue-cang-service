import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'username', nullable: false })
  username: string;

  @Column({ type: 'varchar', name: 'password', nullable: false })
  password: string;

  @Column({ type: 'varchar', name: 'first_name', nullable: false })
  first_name: string;

  @Column({ type: 'varchar', name: 'last_name', nullable: false })
  last_name: string;

  @Column({ type: 'varchar', name: 'email', nullable: false })
  email: string;

  @Column({ type: 'varchar', name: 'phone', nullable: true })
  phone: string;

  @Column({ type: 'varchar', name: 'role', nullable: true })
  role: string;
}
