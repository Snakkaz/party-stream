import { Request, Response } from 'express';
import { User } from '../models/User';

export class UserController {
    private users: User[] = [];

    public connectUser(req: Request, res: Response): void {
        const { userId, username } = req.body;
        const newUser = new User(userId, username);
        this.users.push(newUser);
        res.status(200).json({ message: 'User connected', user: newUser });
    }

    public disconnectUser(req: Request, res: Response): void {
        const { userId } = req.body;
        this.users = this.users.filter(user => user.id !== userId);
        res.status(200).json({ message: 'User disconnected' });
    }

    public getUsers(req: Request, res: Response): void {
        res.status(200).json(this.users);
    }
}