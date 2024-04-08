import {Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn} from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: string

    @Column({ nullable: false } )
    firstName: string

    @Column({ nullable: false } )
    lastName: string

    @Column({ nullable: false } )
    email: string

    @Column({ nullable: false } )
    username: string

    @Column({ nullable: false } )
    password: string

    @Column({ nullable: false } )
    birthdate: Date

    @Column( { default: 'user' })
    role: string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
