import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Moviecard from '../Containers/Moviecard'
import Loading from '../Components/Loading';
const useStyles = makeStyles((theme)=>({
 
  
}));
function Trending() {
const classes = useStyles();
    const [trending,setTrending]= useState();
const [page,setpage]= useState(1);
    const setpageNumber = (pg)=>{
        setpage(pg)
    }

    const fetchtrending = async()=>{
        //&page=${page}
await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_kEY}&page=${page}`).then(res=>{
    console.log(res.data)
    setTrending(res.data)
}).catch(err=>{
    console.log(err)
})
    }

    useEffect(() => {
        fetchtrending();
    }, [page])

    return (
        <div>
             <Typography style={{
                 textAlign:"center",
                 margin:"30px 0 20px 0",
                 fontSize:"32px",
                 color:"#FAFAFA",
                 fontFamily:"sans-serif"}}>

                 Trending Today!!
                 </Typography>
           {trending?
           <div className={classes.wrap}>
           
          <Moviecard data={trending} setpageNumber={setpageNumber} />

           </div>
           
           
           :<><Loading/></>}
        </div>
    )
}

export default Trending
