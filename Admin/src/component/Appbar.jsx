



import { Typography , Button , AppBar, Toolbar  } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userEmail } from "../store/selector/userEmail";
import { isUserLoading } from "../store/selector/isUserLoading";
import { userState } from "../store/atoms/user";
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';




export default Appbar;


function Appbar() {
  const navigate = useNavigate();
  const useremail = useRecoilValue(userEmail)
  const userloading = useRecoilValue(isUserLoading)
  const setUser = useSetRecoilState(userState)

  if(userloading){
    return (
      <>Loading...</>
    )
  }
  if(useremail){
    return <div>
    <AppBar >
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
       <div style={{display: "flex" , justifyContent: "flex-start"}} >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            
          >
            <MenuIcon />
          </IconButton>
      <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
             marginTop:1,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            AcmeStore
          </Typography>
          </div>
          <div>
            <Button  color="inherit" onClick={() => {
               window.location.href = '/product'
               }}>Product</Button>
      <Button color="inherit" onClick={() => { 
      localStorage.setItem("token", null); 
      navigate('/login')
      setUser({ isLoading: false, userEmail: null})
    }}>Logout</Button>
    </div>
    
    </Toolbar>
    </AppBar>
   </div>
    }
    else{
      return <div>
    <AppBar >
    <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
    <div style={{display:"flex" , justifyContent:"flex-start" }}>
    <IconButton
            
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            
          >
            <MenuIcon />
          </IconButton>
    <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              marginTop: 1,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            AcmeStore
          </Typography>
          </div>
          <div > 
          <Button onClick={() => window.location.href = '/Register'}  color="inherit">Signup</Button>
          <Button onClick={() => window.location.href = '/Login'} color="inherit">Login</Button>
          </div>
          </Toolbar>
          </AppBar>
          </div>
          }  
}