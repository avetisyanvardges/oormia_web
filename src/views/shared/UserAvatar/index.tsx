import {FC} from 'react';
import {Avatar} from "antd";
import defaultAvatarImage from 'assets/images/avatar.png';
import "./style.scss";

interface IProps {
    size: number,
    imageUrl?: string,
}

const UserAvatar: FC<IProps> = ({size = 85, imageUrl}) => {
    return (
        <Avatar
            src={imageUrl || defaultAvatarImage}
            style={{
                width: size,
                height: size,
            }}
            className='userAvatar'
        >
            {/*{user.first_name[0]}*/}
        </Avatar>
    )
};

export default UserAvatar;
