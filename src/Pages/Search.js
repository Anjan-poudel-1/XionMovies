import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Button, makeStyles } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import Moviecard from '../Containers/Moviecard';
const useStyles = makeStyles((theme)=>({
  wrapHeader:{
      
        width:"70%",
        margin:"auto",
        [theme.breakpoints.down('xs')]:{
            width:"95%"
        }
       
    },
    root: {
        flexGrow: 1,
      },
      searchbar:{
textAlign:"center"
      },
        searchfield:{
            border:"none",
            backgroundColor:"black",
            outline:"none",
            padding:"15px",
            width:"320px",
            borderBottom:"1 px solid white",
        borderRadius:"10px 0 0 10px",
        color:"white",
        margin:"40px 0",
        [theme.breakpoints.down('sm')]:{
            width:"180px",
            padding:"10px"
        }
            },
            searchbtn:{
              backgroundColor:"black",
              color:"white",
              borderRadius:"0 10px 10px 0",
              boxShadow:"none",
              padding:"11px 0",
              '&:hover': {
               color: 'red',
               backgroundColor:"black",
                boxShadow: 'none',
              },
              '&:active': {
                boxShadow: 'none',
                backgroundColor: '#3c52b2',
              },
              [theme.breakpoints.down('sm')]:{
                  padding:"6px"
              }

            },
            tabs:{
                width:"800px",
                backgroundColor:"none",
                [theme.breakpoints.down('sm')]:{
                    width:"160px"
                },
                color:"white",
                boxShadow:"none"
               
            },
            displayData:{
              width:"100%"
            }
}))
function Search() {
    const classes = useStyles();
    const [search,setSearch] = useState();
    const [value, setValue] = React.useState(0);
    const [TVpage,setTVpage]= useState(1);
    const [Moviepage,setMoviepage]= useState(1);
    const [page,setpage]= useState(1);
const [moviesSearched,setmoviesSearched] = useState();
const [tvSearched,setTVsearched] = useState();

    const handleChange = (event, newValue) => {
      setpage(1)
      setValue(newValue);
      console.log(newValue,"changed")
     
    };
    const onchangeHandler=(e)=>{
        setSearch(e.target.value);
        searchHandler();
    }
    const setpageNumber = (pg)=>{
      setpage(pg)
  }
    const searchHandler=()=>{
      fetchMovies();
      fetchTV();
    }

    const fetchMovies = async()=>{
      await axios.get(`
      https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_kEY}&language=en-US&page=${page}&query=${search}&include_adult=false`).then(res=>{
      console.log(res)  
      setmoviesSearched(res.data);
      setMoviepage(res.data.total_pages);
      }).catch(err=>{
        console.log(err)
      });
    }
    const fetchTV = async()=>{
      await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_API_kEY}&language=en-US&page=${page}&query=${search}&include_adult=false`).then(res=>{
        console.log(res.data)
        setTVsearched(res.data)
        setTVpage(res.data.total_pages);
      }).catch(err=>{
        console.log(err)
      });
    }
    useEffect(()=>{
      console.log("page changed")
      if(search)
      searchHandler();
    },[page])

    return (
      <>
        <div className={classes.wrapHeader}>
            <div className={classes.searchbar}>

            <input type="text" placeholder="Search for a movie or Series..."
             value={search} 
              onChange={(e)=>onchangeHandler(e)}
              className={classes.searchfield}

              ></input>
            <Button 
            disabled={search?false:true}
             variant="contained" 
             className={classes.searchbtn}
            
             > <SearchIcon /></Button>
            </div>
</div>

            <div className={classes.Tabwrap}>
            <Paper className={classes.root}>


      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="secondary"
        centered
      >
        <Tab label="Movies" disableFocusRipple disableRipple className={classes.tabs}  />
   
        <Tab label="TV SERIES" disableFocusRipple disableRipple className={classes.tabs}   />
      </Tabs>
    </Paper>
            </div>
           <div className={classes.displayData}>
          {moviesSearched?
        value===0?
        (<Moviecard data={moviesSearched} setpageNumber={setpageNumber} field="search" no_ofpages={Moviepage} type="movie"/>)
        :<Moviecard data={tvSearched} setpageNumber={setpageNumber} field="search" no_ofpages={TVpage} type="tv"/>
        
        :null  
        } 

           </div>
           </>
       
    )
    
}

export default Search
