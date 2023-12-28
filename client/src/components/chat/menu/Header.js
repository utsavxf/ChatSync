import React, { useContext, useState } from 'react'
import { AccountContext } from '../../../context/AccountProvider'
import { Box, styled } from '@mui/material';
import { Chat as MessageIcon, } from '@mui/icons-material';
import HeaderMenu from './HeaderMenu';
import InfoDrawer from '../../drawer/InfoDrawer';
import { MoonIcon, SunIcon } from './Icons';
import './Total.css'

const Component = styled(Box)`
    height: 44px;
    display: flex;
    padding: 8px 16px;
    align-items: center;
`;

const Wrapper = styled(Box)`
    margin-left: auto;
    & > * {
        margin-left: 2px;
        padding: 8px;
        color: #000;
    };
    & :first-child {
        font-size: 22px;
        margin-right: 8px;
        margin-top: 3px;
    }
`;

const Image = styled('img')({
    height: 40,
    width: 40,
    borderRadius: '50%'
})

const Header = () => {

    const { theme, setTheme } = useContext(AccountContext)


    const { account } = useContext(AccountContext);

    const [openDrawer, setOpenDrawer] = useState(false);

    const toggleDrawer = () => {
        setOpenDrawer(true);
    }

    return (
        <>
            <Component className='hd' id={theme}>
                {/* ye picture us decoded object se hi aa rahi hai(account),google provide karta hai */}
                <Image src={account.picture} alt="dp" onClick={() => toggleDrawer()} />
                <Wrapper>
                    <button onClick={() => { theme === "light" ? setTheme("dark") : setTheme("light") }} style={{ fontSize: '1px', border: 'none', position: 'relative', top: '-7px', left: '10px', cursor: "pointer", background: "none" }}>
                        {
                            theme === 'dark' ?
                                <SunIcon style={{color:"white"}} /> :
                                <MoonIcon  />

                        }
                    </button>
                    <MessageIcon style={{ color: theme === 'light' ? 'black' : 'white' }} />
                    <HeaderMenu style={{ color: 'white' }} setOpenDrawer={setOpenDrawer} />
                </Wrapper>
            </Component>
            <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} />
            {/* passing the state as a prop kyuki jo code likhna hai vo infoDrawer me hi likhna hai */}
        </>
    )
}
export default Header
