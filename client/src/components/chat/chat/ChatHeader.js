import { useContext } from 'react';

import { Box, Typography, styled } from '@mui/material';
import { Search, MoreVert } from '@mui/icons-material';

import { AccountContext } from '../../../context/AccountProvider';
import { defaultProfilePicture } from '../../../images/data'
// import { SunIcon } from './Icons';
import './Chat.css'

const Header = styled(Box)`
    height: 44px;
    background: #dad6d8;
    display: flex;
    padding: 8px 16px;
    align-items: center;
`;
    
const Image = styled('img')({
    width: 40,
    height: 40,
    objectFit: 'cover',
    borderRadius: '50%'
})

const Name = styled(Typography)`
    margin-left: 12px !important;
`;

const RightContainer = styled(Box)`
    margin-left: auto;
    & > svg {
        padding: 8px;
        font-size: 22px;
        color: #000;
    }
`;

const Status = styled(Typography)`
    font-size: 12px !important;
    color: rgb(0, 0, 0, 0.6);
    margin-left: 12px !important;
`;

const ChatHeader = ({person}) => {  

    // const url = person.picture || defaultProfilePicture;
    
    const { activeUsers,theme } = useContext(AccountContext);
    console.log(activeUsers);
    
    return (
        <Header className='chatheader' id={theme}>
            <Image src={person.picture} alt="display picture" />     
            <Box>
                <Name style={{color: theme === 'light' ? 'black' : 'white'}}>{person.name}</Name>
                <Status style={{color: theme === 'light' ? 'black' : 'white'}} >{activeUsers?.find(user=>user.sub===person.sub) ? "Online" : "Offline"}</Status>    
            </Box>   
            <RightContainer>
                <Search style={{color: theme === 'light' ? 'black' : 'white'}} />
                <MoreVert style={{color: theme === 'light' ? 'black' : 'white'}} />    
            </RightContainer> 
        </Header>
    )
}

export default ChatHeader;