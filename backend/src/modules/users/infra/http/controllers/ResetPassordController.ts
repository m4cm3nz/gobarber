import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';

export default class ResetPasswordController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { password, token, password_confirmation } = request.body;

        const resetPasswordService = container.resolve(ResetPasswordService);

        await resetPasswordService.execute({
            token,
            password,
            password_confirmation,
        });

        return response.status(204).json();
    }
}
