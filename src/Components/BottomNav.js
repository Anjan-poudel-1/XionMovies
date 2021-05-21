import React,{useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import SearchIcon from '@material-ui/icons/Search';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import MovieIcon from '@material-ui/icons/Movie';
import {Link} from 'react-router-dom'
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme)=>({
  root: {
    width: 500,
    color:"white",
width:"90%",
backgroundColor:theme.palette.primary.main,

  },
  floatingLabelFocusStyle: {
    color: "#fff"
},
  wrap:{
    backgroundColor:theme.palette.primary.main,
display:"flex",
justifyContent:"center",
alignItems:"center",
position:"fixed",
bottom:"0",
width:"100%",
color:"white"
  },
  label:{
    color:"white"
  }
  
}));


function BottomNav(props) {
  let history = useHistory();
    const classes = useStyles();
    const [NavValue, setNavValue] = React.useState('recents');
  
    const handleChange = (event, newValue) => {

      //Iffff clicked on home ... we should go to trending ....
      setNavValue(newValue);
      history.push(`/${newValue}`);
    };
    useEffect(() => {
     handleChange("","trending");

    }, [])

    return (
        <div className={classes.wrap}>
            <BottomNavigation  value={NavValue} onChange={handleChange} className={classes.root}  >
             <BottomNavigationAction   classes={{label: classes.label}} label="Trending" value="trending"  icon={<WhatshotIcon color="secondary" />} floatingLabelFocusStyle={classes.floatingLabelFocusStyle}/>
             <BottomNavigationAction classes={{label: classes.label}}  label="Movies" value="movies" icon={<MovieIcon color="secondary" />} />
            <BottomNavigationAction classes={{label: classes.label}}  label="TV Series" value="tv-series" icon={<LiveTvIcon color="secondary" />} />
            <BottomNavigationAction classes={{label: classes.label}}  label="Search" value="search" icon={<SearchIcon color="secondary"/>} />
    </BottomNavigation>
        </div>
    )
}

export default BottomNav
