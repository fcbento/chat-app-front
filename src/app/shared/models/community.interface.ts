import { User } from "./user.interface";

export interface Community{
    _id: string;
    name: string;
    logo: string;
    owner: User;
    createdAt: string;
}