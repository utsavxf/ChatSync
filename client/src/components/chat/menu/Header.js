import React, { useContext, useEffect, useState } from 'react'
import { AccountContext } from '../../../context/AccountProvider'
import { Box, TextField, styled, Dialog } from '@mui/material';
import { Chat as MessageIcon, } from '@mui/icons-material';
import HeaderMenu from './HeaderMenu';
import Switch from '@mui/material/Switch';
import InfoDrawer from '../../drawer/InfoDrawer';
import { MoonIcon, SunIcon } from './Icons';
import AddIcon from '@mui/icons-material/Add';
import './Total.css'
import { getUsers } from '../../../service/api';

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
    // const {account,theme,socket,setActiveUsers}=useContext(AccountContext)

    const { theme, setTheme } = useContext(AccountContext)
    const [grp, setGrp] = useState(false)
    const [grpname, setGrpname] = useState("")
    const [selectedUsers, setSelectedUsers] = useState([])

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let data = await getUsers();
            // console.log(data);

            // const filteredData=data.filter(user=>user.name.toLowerCase().includes(text.toLowerCase()))
            // setUsers(filteredData)
            setUsers(data)


        }
        fetchData();
        
    }, [])


    const { account } = useContext(AccountContext);

    const handleUserToggle = (userId) => (event) => {
        const checked = event.target.checked;
        setSelectedUsers(prevSelectedUsers => {
            if (checked) {
                return [...prevSelectedUsers, userId]; // Add user to selectedUsers
            } else {
                return prevSelectedUsers.filter(id => id !== userId); // Remove user from selectedUsers
            }
        });
        console.log(selectedUsers);
        
    };

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
                    <AddIcon style={{ color: theme === 'light' ? 'black' : 'white', position: 'relative', left: '27px', cursor: "pointer" }} />
                    <button onClick={() => { theme === "light" ? setTheme("dark") : setTheme("light") }} style={{ fontSize: '1px', border: 'none', position: 'relative', top: '-7px', left: '10px', cursor: "pointer", background: "none" }}>
                        {
                            theme === 'dark' ?
                                <SunIcon style={{ color: "white" }} /> :
                                <MoonIcon />

                        }
                    </button>

                    <MessageIcon style={{ color: theme === 'light' ? 'black' : 'white' }} />
                    <HeaderMenu style={{ color: 'white' }} setOpenDrawer={setOpenDrawer} />
                </Wrapper>
            </Component>
            <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} />
            {/* passing the state as a prop kyuki jo code likhna hai vo infoDrawer me hi likhna hai */}

            {/* Dialog for grp chat */}
            <Dialog open={grp} onClose={() => setGrp(!grp)}>
                <div className="DialogBox1">
                    <h2>Group Name</h2>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="groupName"
                        label=""
                        type="text"
                        fullWidth
                        value={grpname}
                        onChange={(e) => setGrpname(e.target.value)}
                    />
                    <h2>Add Users</h2>
                    <Box>
                        {users.map((user) => (
                            user.sub !== account.sub &&
                            <div className='ab1' style={{display:"flex"}}>
                                <p>{user.name}</p>
                               <Switch
                               checked={selectedUsers.includes(user.sub)}
                               onChange={handleUserToggle(user.sub)}
                               />
                            </div>
                        ))}
                    </Box>
                    <button>Create Group</button>
                </div>
            </Dialog>


        </>
    )
}
export default Header
