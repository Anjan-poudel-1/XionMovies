import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
const useStyles = makeStyles((theme)=>({
    root: {
        '& > *': {
        paddingBottom:"30px"
        },
      display:"flex",
      justifyContent:"center",
    
      },
  
}));
function Paginationcomp(props) {
    const classes = useStyles();
    const onchangeHandler= (e,page)=>{
      console.log(page);

props.setpageNumber(page);
window.scroll(0,0)
    }
    
    return (
        <div>
             <div className={classes.root}>
      <Pagination hideNextButton hidePrevButton count={props.no_ofpages? props.no_ofpages:10} color="primary" size="medium" onChange={(e,page)=>onchangeHandler(e.target.textContext,page)}/>
      </div>
        </div>
    )
}

export default Paginationcomp
