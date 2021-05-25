import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import Paginationcomp from '../Components/Paginationcomp';
import Loading from '../Components/Loading';
import {motion} from 'framer-motion'
import {unavailable} from '../Config/Config'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ModalComp from '../Containers/ModalComp'
const useStyles = makeStyles((theme)=>({
    trendinglist:{
backgroundColor:"",
padding:"15px",
width:"70%",
margin:"auto",

color:"#FAFAFA",
paddingBottom:"50px",
[theme.breakpoints.down('md')]:{
    width:"75%",
},

    }
    ,
    poster:{
textAlign:"center"
    },
    indivisualgrid:{
        backgroundColor:""
    },
    posts:{
        padding:"10px",
        position:"relative"
    },
    info:{
        display:"flex",
        width:"90%",
        padding:"5px 10px",
        justifyContent:"space-between"
    },
    rating:{
        position:"absolute",
        height:"25px",
        width:"25px",
        backgroundColor:theme.palette.secondary.main,
        top:"5px",
        right:"0",
        borderRadius:"50%",
        textAlign:"center",
        color:"white",
        fontSize:"14px",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
    },
    cards:{
        backgroundColor:"#3c3c3c",
    borderRadius:"10px 0 0 0",
    padding:"3px",
    boxShadow:"0 0px 8px 3px rgba(0,0,0,0.2)",
    cursor:"pointer",
    "&:hover": {
        backgroundColor: "#dbd9d9",
        color:theme.palette.text.secondary,
        
      }

},
notfound:{
    textAlign:"center",
    fontSize:"26px",
    width:"100%",
    margin:"40px 0 ",
    letterSpacing:"3px",
    [theme.breakpoints.down('sm')]:{
        fontSize:"22px"
    }
},
modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  




}));
function Moviecard(props) {


  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  }
    
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }



    const classes = useStyles();
    const [open, setOpen] = useState(false);
const[modalData,setModalData]= useState(null);

  const handleOpen = (data,index) => {
      console.log(props.type);
      if(props.field==="myListview"){
setModalData({data,type:props.type[index]})
      }else{
        setModalData({data,type:(data.media_type?data.media_type:(props.type==="movie"?"movie":"tv"))});
      }
   
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
let datad= props.data.results
    return (
     <>
     {console.log(props)}
        <motion.div className={classes.trendinglist}
        variants={container}
        initial="hidden"
        animate="visible"
        >
        <Grid container spacing={3} style={{marginBottom:"20px"}}>
          
        {(datad && datad.length>=1)?
        datad.map((a,index)=>
      <Grid item key={a.id} md={3} sm={6}  xs={12} className={classes.indivisualgrid}>
         <motion.div className={classes.posts}
         variants={item}

         >
             <div className={classes.rating}>
    {a.vote_average}
             </div>


             <div className={classes.cards} onClick={()=>handleOpen(a,index)}>
    
            
         <div className={classes.poster}>
        {a.poster_path?
    <img src={`https://image.tmdb.org/t/p/w200/${a.poster_path}`} width="100%" style={{borderRadius:"10px 10px 15px 15px"}}></img>
    :<img src={`${unavailable}`} width="100%" style={{borderRadius:"10px 10px 15px 15px"}}></img>    
    }
         </div>
         
         <Typography style={{textAlign:"center",margin:"15px 0" }}>
         {a.title?a.title:a.name}
         </Typography>
         <div className={classes.info}>
             <Typography style={{fontSize:"14px",opacity:"0.6"}}>
                 
    {a.media_type?a.media_type.toUpperCase():(props.type==="movie"?"MOVIE":"TV")}
             </Typography>
             <Typography style={{fontSize:"14px",opacity:"0.6"}}>
    {a.first_air_date||a.release_date}
             </Typography>
         </div>
         
         </div>
         </motion.div>
        </Grid>
    ): (props.field==="myListview"?<div className={classes.notfound}>"ADD SOME MOVIES YOU WISH TO WATCH LATER"</div> :
    
    <div className={classes.notfound}>"SORRY! DESCRIBED DATA COULDN'T BE FOUND"</div>)}
        </Grid>
        {!props.field && (props.data.results.length>=1)?
        <Paginationcomp style={{padding:"0",width:"100px"}} setpageNumber={props.setpageNumber} no_ofpages={props.no_ofpages}/>
        :null}
        </motion.div>

        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
         
              <ModalComp type={props.type} data={modalData} handleClose={handleClose}/>
          
        </Fade>
      </Modal>
  </>
    )
}

export default Moviecard
