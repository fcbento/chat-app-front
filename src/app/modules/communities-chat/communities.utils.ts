import { Menu } from "../../shared/models/menu.interface";

export class CommunitiesUtils {

    getPendingMenuItems(): Menu[] {
        return [
            {
                icon: 'fas fa-check',
                name: 'Accept',
                action: 'accept'
            },
            {
                icon: 'fas fa-ban',
                name: 'Decline',
                action: 'decline'
            }
        ]
    }

    getCommunityMenuItems(): Menu[] {
        return [
            {
                icon: 'fas fa-cog',
                name: 'Settings',
                action: 'settings'
            },
            {
                icon: 'fas fa-user-plus',
                name: 'User',
                action: 'addUser'
            },
            {
                icon: 'fas fa-folder-plus',
                name: 'Channel',
                action: 'addChannel'
            },
            {
                icon: 'fas fa-trash-alt',
                name: 'Remove',
                action: 'deleteCommunity'
            }
        ]
    }

    getChannelMenuItems(): Menu[] {
        return [
            {
                icon: 'fas fa-cog',
                name: 'Edit',
                action: 'edit'
            },
            {
                icon: 'fas fa-trash-alt',
                name: 'Delete',
                action: 'deleteChannel'
            }
        ]
    }
}

