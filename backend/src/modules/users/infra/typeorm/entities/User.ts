import upload from '@config/upload';
import { Exclude, Expose } from 'class-transformer';
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Exclude()
    @Column()
    password: string;

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    avatar: string;

    @Expose({ name: 'avatar_url' })
    getAvatarUrl(): string | null {
        const { config } = upload;
        return (
            this.avatar && `${config[upload.driver].public_url}/${this.avatar}`
        );
    }
}

export default User;
