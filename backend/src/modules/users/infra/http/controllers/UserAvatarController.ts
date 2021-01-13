import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { classToClass } from 'class-transformer';

export default class UsersController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const updateUserAvatarService = container.resolve(
            UpdateUserAvatarService,
        );

        const user = await updateUserAvatarService.execute({
            user_id: request.user.id,
            avatarFileName: request.file.filename,
        });

        return response.json(classToClass(user));
    }
}
