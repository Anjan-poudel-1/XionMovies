import React,{useEffect} from 'react'
import axios from 'axios'
import Chip from '@material-ui/core/Chip';
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme)=>({
    chip:{
        padding:"1px",
        margin:"3px"
    },
    filtered:{
        color:"white",
        margin:"0 0 15px 0",
        fontSize:"22px"
    }
   ,
   selectgenres:{
       marginBottom:"15px"
   }
    
}));

function GenreComp({type,setpageNumber,genre,setGenre,selectedgenre,setSelectedGenre}) {

    const classes = useStyles();
const fetchdetails = async()=>{
axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_kEY}&language=en-US`).then(res=>{
    console.log(res.data.genres);
    setGenre(res.data.genres);
}).catch((err)=>{
console.log(err)
})
}

useEffect(() => {
    fetchdetails();
}, []);


const handleSelected= (id)=>{
const selectedgenrearr = selectedgenre?selectedgenre:[]
    console.log(id);
    const newarr = genre.filter(a=>{
       if( a.id!==id){
           return true
       }
       else{
        selectedgenrearr.push(a)
       }
    });
    setSelectedGenre(selectedgenrearr)
    setGenre(newarr);

}

const deleteSelected = (id)=>{
    const genres = genre
    const newarr = selectedgenre.filter(a=>{
        if( a.id!==id){
            return true
        }
        else{
            genres.push(a)
        }
     });
     setSelectedGenre(newarr)
     setGenre(genres);
}

    return (
        <div>
            <div className={classes.selectgenres}>
            {
                genre?  genre.map(a=>{
                   return <Chip
                    key={a.id}
                    clickable
                    color="secondary"
                    className={classes.chip}
                    label={a.name}
                    onClick={()=>handleSelected(a.id)}
                    size="small"
                  />
                }) :null
            }
            </div>
          {}  <div className={classes.selectedgenres}>
{selectedgenre? <div className={classes.filtered}>Filtered By:</div>:null}
{
     selectedgenre?  selectedgenre.map(a=>{
        return <Chip
         key={a.id}
         clickable
         
         className={classes.chip}
      
         label={a.name}
         onDelete={()=>deleteSelected(a.id)}
         size="small"
       />
     }) :null
}


            </div>
           
        
        </div>
    )
}

export default GenreComp
