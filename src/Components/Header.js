import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {AppBar,Toolbar,Typography} from '@material-ui/core'
import {Link} from 'react-router-dom'
import HdIcon from '@material-ui/icons/Hd';
const useStyles = makeStyles((theme)=>({
    toolbar:{
    display:"flex",
    justifyContent:"space-between",
    width:"80%",
    margin:"auto",
    padding:"5px 0"
},
links:{
textDecoration:"none",
color:"white"
}
}));
function Header() {
    const classes = useStyles();
    return (
        <div>
             <AppBar position="static">
        <Toolbar variant="dense" className={classes.toolbar}>
        <Link to="/" className={classes.links}>
        <>
        
        <Typography color="secondary" variant="h3" style={{fontFamily:"Orbitron"}}>
         XION 
         </Typography >
        </>
        </Link>
        
  <Link to="/my-wishlist" className={classes.links}>
  <Typography >
             My wishlist
         </Typography>
  </Link>      
        </Toolbar>
      </AppBar> 
        </div>
    )
}

export default Header
