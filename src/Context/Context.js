import React,{createContext,useState,useEffect} from 'react'

export const WishContext = createContext();

export function WishlistProvider(props){
    const[wishList,setWishList] = useState([]);
  


    useEffect(() => {
       
 let tempWishList=  localStorage.getItem("Wishlist")?JSON.parse(localStorage.getItem("Wishlist")):[];

  setWishList(tempWishList);
    }, []);



    let value={
wishList,setWishList
    }
    return(

        <WishContext.Provider value={value}>
            {props.children}
        </WishContext.Provider>
    
    )
}




