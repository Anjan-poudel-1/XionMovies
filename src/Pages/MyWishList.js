import React,{useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {WishContext} from '../Context/Context'
import Moviecard from '../Containers/Moviecard';

const useStyles = makeStyles((theme)=>({

}));

function MyWishList() {
    const classes = useStyles();
    let {wishList,setWishList} = useContext(WishContext);
    console.log(wishList);
   let wisharr = [];
   let typearr=[];
   wishList.map(a=>{
       wisharr.push(a.data);
       typearr.push(a.type);
   })
    return (
        <div>
            {
              <Moviecard data={{results:wisharr}} type={typearr} field="myListview"/>
            }
        </div>
    )
}

export default MyWishList
