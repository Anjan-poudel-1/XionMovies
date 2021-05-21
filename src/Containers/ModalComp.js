import React,{useState,useEffect,useContext} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import { Button, Grid, Typography } from '@material-ui/core';
import {unavailable,unavailableLandscape,noPicture} from '../Config/Config'
import axios from 'axios'
import Loading from '../Components/Loading';
import YouTubeIcon from '@material-ui/icons/YouTube';
import {WishContext} from '../Context/Context'
import Carousel from '../Components/Carousel';
const useStyles = makeStyles((theme)=>({
wrap:{
    color:"white",
},
paper: {
    backgroundColor: theme.palette.primary.main,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width:"70%",
    [theme.breakpoints.down('sm')]:{
        height:"450px",
    overflowY:"scroll",
    overflowX:"hidden",
    padding:"0px 10px 25px 10px"
    }
    
  },
  postergrid:{
textAlign:"center"
  },
  title:{
    fontFamily:"Courgette",
    fontSize:"34px",
    [theme.breakpoints.down('md')]:{
        fontSize:"26px"
    }
  },
  potraitposterimg:{
      height:"450px",
      borderRadius:"8px",
      [theme.breakpoints.down('sm')]:{
          height:"0",
          width:"0",
          opacity:"0"
      }
  },
  landscapeposterimg:{
    height:"0",
    width:"0",
    opacity:"0",
    
    [theme.breakpoints.down('sm')]:{
        width:"120%",
        opacity:"1",
        height:"auto",
        borderRadius:"8px",
        position: "relative",
        left:"-9.5%"

    }
},
  datagrid:{
      textAlign:"center",
      backgroundColor:theme.palette.primary.main
  },
  buttons:{
     width:"90%",
     marginTop:"10px",
     textDecoration:"none"

  }
}));
function ModalComp({data,handleClose,type}) {
    const {wishList,setWishList} = useContext(WishContext);
    const classes = useStyles();
    const [modaldata,setModalData]= useState();
const[video,setvideo]=useState();
const [images,setImages]= useState();
const[inmyList,setinmyList]= useState(false);
{console.log(data)}
    const fetchdata= async()=>{
axios.get(`https://api.themoviedb.org/3/${data.type}/${data.data.id}?api_key=${process.env.REACT_APP_API_kEY}&language=en-US`).then(
    res=>{
      
        setModalData(res);
    }
).catch(err=>{
    console.log(err)
})
    }

    const fetchVideo= async()=>{
        axios.get(`https://api.themoviedb.org/3/${data.type}/${data.data.id}/videos?api_key=${process.env.REACT_APP_API_kEY}&language=en-US`).then(res=>{
           
      

setvideo(res.data.results[0].key);

        }).catch(err=>console.log(err))
    }

    const fetchimages = async()=>{
        axios.get(`https://api.themoviedb.org/3/${data.type}/${data.data.id}/credits?api_key=${process.env.REACT_APP_API_kEY}&language=en-US`).then(
            res=>{
           
               
                setImages(res);
            }
        ).catch(err=>{
            console.log(err)
        })
    }
    const AddtowishList=(provided)=>{
        let arr= wishList?wishList:[];
        console.log(provided);
        arr.push(provided);
        setWishList(arr);
      handleClose();
    }
    const RemovewishList=(provided)=>{
        let arr= wishList; 
        handleClose();
       
        let newarr= [];
   newarr= arr.filter(a=>a.data.id!==provided.data.id)
        setWishList(newarr);
       
    }


useEffect(() => {
    fetchdata();
    fetchimages();
    fetchVideo();
}, []);

useEffect(() => {
    if(wishList){
       
wishList.map(a=>{
    console.log(a)
    if(a.data.id===data.data.id){
        setinmyList(true)
    }
    
    
})
       
    }
    
}, [wishList])
useEffect(() => {
 
    localStorage.setItem("Wishlist",JSON.stringify(wishList));
});

    return (
        <div className={classes.paper}>
            {
                modaldata?
              
<div className={classes.wrap}>
             <Grid container spacing={3}>
                 <Grid item xs={12} md={5} className={classes.postergrid}>
                 {modaldata && modaldata.data.poster_path?
    <img src={`https://image.tmdb.org/t/p/w200/${modaldata.data.poster_path}`} className={classes.potraitposterimg}></img>
    :<img src={`${unavailable}`}  className={classes.potraitposterimg}></img>    
    }
     {modaldata && modaldata.data.backdrop_path?
    <img src={`https://image.tmdb.org/t/p/w500/${modaldata.data.backdrop_path}`} className={classes.landscapeposterimg}></img>
    :<img src={`${unavailableLandscape}`} className={classes.landscapeposterimg}></img>    
    }

                 </Grid>
                 <Grid item xs={12} md={7} className={classes.datagrid}>
               <Typography  className={classes.title}> {data.data.title?data.data.title:data.data.name}</Typography>
               <Typography style={{fontSize:"12px",fontFamily:"cursive"}}>{modaldata && modaldata.data.tagline?`"${modaldata.data.tagline}"`:"------------"} </Typography>  
                
                <div style={{marginTop:"40px",padding:"20px",border:"2px solid black",borderRadius:"8px",position:"relative"}}>
                   
                        {modaldata? modaldata.data.overview:null}
                <div className={{position:"absolute",}}><div style={{position:"absolute",width:"100px",top:"-15px",backgroundColor:"#212121"}}>OVERVIEW</div></div>
                </div>
                <div className={classes.carousel}>
                {images?<Carousel data={images.data.cast}/>:null}
                </div>
<div >
              
             <a href={`https://www.youtube.com/watch?v=${video}`} target="_blank" style={{textDecoration:"none"}}>
             <Button variant="contained" color="secondary" className={classes.buttons}>Watch Trailer<YouTubeIcon style={{marginLeft:"10px"}}/></Button>     
            </a>  
   {!inmyList?
   <Button variant="contained" color="secondary" className={classes.buttons} onClick={()=>AddtowishList(data)}>Add to wishlist</Button>:
   <Button variant="contained" color="secondary" className={classes.buttons} onClick={()=>RemovewishList(data)}> Remove from wishlist</Button>
}
   
</div>
                 </Grid>

             </Grid>
            
  
        </div>
        :<Loading/>
            }
         
         </div>
       
    )
}

export default ModalComp
