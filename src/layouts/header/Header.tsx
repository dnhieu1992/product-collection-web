import React, { useContext } from 'react'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import './header.scss'
import userService from '../../ultils/userService';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
}

const Header = ({ }: HeaderProps): JSX.Element => {
    const navigate = useNavigate();
    const user = userService.getCurrentUser()

    const logOut = () => {
        userService.removeCurrentUser()
        navigate('/login');
    }
    return (
        <div className='header'>
            <p style={{ marginRight: '10px' }}>{user?.username}</p>
            <ExitToAppIcon onClick={logOut} style={{ cursor: 'pointer' }} />
        </div>
    )
}

export default Header