import { Community } from "./community.interface";

export interface Channel {
    _id: string;
    name: string;
    community: Community;
    createdAt: string;
}