import React from "react";
import './_styles/sideBar.scss';
import Drawer from '@material-ui/core/Drawer';
import { Button, Icon } from "@material-ui/core";
import { SimpleObject } from "../types/commonTypes";

const AVATAR_URL = 'https://i0.wp.com/365webresources.com/wp-content/uploads/2016/09/FREE-PROFILE-AVATARS.png?w=502&ssl=1';

interface UserAvatarProps {
    name: string;
    avatar: string;
    onClick: () => void;
};

const UserAvatar: React.FunctionComponent<UserAvatarProps> = ({ name, avatar, onClick }) => (
    <div onClick={onClick}>
        <div className="user-picContainer">
            <img
                className="user-pic"
                src={avatar}
                alt="user avatar"
            />
        </div>
        <h3>{name}</h3>
    </div>
)

interface SideBarProps {
    items: SimpleObject<string>[];
    active: number;
    open: boolean;
    onClose: () => void;
    onStartNewProject: () => void;
    onMenuItemSelected: (index: number) => void;
};

export const SideBar: React.FunctionComponent<SideBarProps> = ({
    onStartNewProject,
    items,
    onClose,
    onMenuItemSelected,
    active,
    open
}) => {
    console.log({ active, open });

    return (
        <Drawer
            className="drawer"
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
                paper: 'drawer',
            }}
        >
            <Button
                onClick={onClose}
                color="primary"
                variant="contained"
            >
                CLOSE SIDEBAR
            </Button>
            <h3>LOGO</h3>
            <UserAvatar
                name="User name"
                avatar={AVATAR_URL}
                onClick={() => console.log('user avatar clicked')}
            />
            <Button
                onClick={onStartNewProject}
                color="primary"
                variant="contained"
            >
                <Icon
                    className="fa fa-plus"
                />
                NEW PROJECT
            </Button>
            {
                items.map(({ icon, title }, index) => (
                    <Button
                        key={index}
                        onClick={() => onMenuItemSelected(index)}
                    >
                        <Icon
                            color="primary"
                            className={`fa ${icon}`}
                        />
                        <p>{title}</p>
                    </Button>
                ))
            }
        </Drawer>
    );
};

export default (SideBar);