import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Typography } from '@material-ui/core';
import Moviecard from '../Containers/Moviecard'
import { makeStyles } from '@material-ui/core/styles';
import GenreComp from '../Components/GenreComp'
import Loading from '../Components/Loading';
const useStyles = makeStyles((theme)=>({
    genreComp:{
        width:"70%",
        margin:"auto",
        [theme.breakpoints.down('xs')]:{
            width:"95%"
        }
    }
  
}));
function Movies() {

const classes = useStyles();
    const [movies,setMovies]= useState();
    const [page,setpage]= useState(1);
    const [genre,setGenre]= useState();
    const [selectedgenre,setSelectedGenre]= useState();
    const[genreforfetch,setgenreforfetch] = useState('')
    const setpageNumber = (pg)=>{
        setpage(pg)
    }
    const fetchMovies = async()=>{
await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_kEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate&with_genres=${genreforfetch}`).then(res=>{
    console.log(res.data)
    setMovies(res.data)
}).catch(err=>{
    console.log(err)
})
    }

    useEffect(() => {
        fetchMovies();
    }, [page,genreforfetch]);
    useEffect(() => {
        if(selectedgenre){
            console.log(selectedgenre)
            let url =""; 
            selectedgenre.map(a=>{
                console.log("asd")
                if(!url){
                    url=a.id
                }
                else{
                    url=url+","+a.id
                }
            });
            console.log(url);
            setgenreforfetch(url);
        }
    }, [selectedgenre,genre])

    return (
        <div>
              <Typography style={{
                 textAlign:"center",
                 margin:"30px 0 20px 0",
                 fontSize:"32px",
                 color:"#FAFAFA",
                 fontFamily:"sans-serif"}}>
                  Discover Movies
              </Typography>
             
           {movies?
           <>
           <div className={classes.genreComp}>
           <GenreComp 
              type="movie"
              setpageNumber={setpageNumber}
              genre={genre}
              setGenre={setGenre}
              selectedgenre={selectedgenre}
              setSelectedGenre={setSelectedGenre}
              />
           </div>
            
           <div className={classes.wrap}>
           
          <Moviecard data={movies} setpageNumber={setpageNumber} no_ofpages={movies.total_pages} type="movie"/>

           </div>
           </>
           
           :<><Loading/></>}
        </div>
    )
}

export default Movies
