import { Column, Entity, PrimaryGeneratedColumn, } from 'typeorm';

@Entity({
  name: 'user',
})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'user_id',
    comment: 'Идентификатор пользователя',
  })
  readonly userId!: string;

  @Column({
    comment: 'Номер телефона пользователя',
    nullable: false,
    length: 20,
  })
  phone!: string;

  @Column({
    comment: 'Логин пользователя',
    nullable: false,
    length: 20,
  })
  login!: string;

  @Column({
    comment: 'Имя пользователя',
    nullable: false,
  })
  firstName!: string;

  @Column('varchar', {
    comment: 'Фамилия пользователя',
    nullable: false,
  })
  lastName!: string;

  @Column({
    comment: 'Отчество пользователя',
    nullable: false,
  })
  middleName!: string;

  @Column({
    comment: 'E-mail пользователя',
    nullable: false,
  })
  email!: string;

  @Column({
    comment: 'Хеш пароля',
    nullable: false,
  })
  passwordHash!: string;

  @Column({
    comment: 'Соль пароля',
    nullable: false,
  })
  passwordSalt!: string;

  @Column('varchar', {
    comment: 'Баланс пользователя',
    nullable: false,
    default: '0',
  })
  balance!: string;

  @Column('boolean', {
    comment: 'Был ли удален аккаунт',
    nullable: true,
    default: false,
  })
  isDeleted!: boolean;
}