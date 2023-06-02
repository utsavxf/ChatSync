
import { styled, Drawer, Box, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Profile from './Profile';


//CSS
const Header = styled(Box)`
  background: #008069;
  height: 107px;
  color: #FFFFFF;
  display: flex;
  & > svg, & > p {
    margin-top: auto;
    padding: 15px;
    font-weight: 600;
`;

const Component = styled(Box)`
  background: #ededed;
  height: 85%;
`;

const Text = styled(Typography)`
    font-size: 18px;
`

const drawerStyle = {
    left: 20,
    top: 17,
    height: '95%',
    width: '30%',
    boxShadow: 'none'
}



const InfoDrawer = ({open,setOpen}) => {       //using object destructuring because props is also an type of object

  const handleClose=()=>{
    setOpen(false);
  }

  return (
    <Drawer
    open={open}
    onClose={handleClose}
    PaperProps={{ sx: drawerStyle }}
    style={{ zIndex: 1500 }}   //taaki jo popup hum open kar rahe hai,vo upar dikhe
>
    <Header>
        <ArrowBack onClick={() => setOpen(false)} />
        <Text>Profile</Text>
    </Header>
    <Component>
        <Profile/>
    </Component>
</Drawer>
  )
}

export default InfoDrawer
 