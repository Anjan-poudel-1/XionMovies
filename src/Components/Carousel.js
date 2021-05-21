
import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {makeStyles} from '@material-ui/core/styles'
import { img_300, noPicture } from "../Config/Config";
const useSTyles= makeStyles((theme)=>({
carouselItem:{
display: "flex",
flexDirection:"column",
objectFit:"contain",
padding: "10px"
},
carouselItem__img:{
    borderRadius:"10px",
    marginBottom:"5px",
    boxShadow:"0 0 5px black"
},
text:{
    fontSize:"14px",
    [theme.breakpoints.down('sm')]:{
        fontSize:"12px"
    }
}
}));
const handleDragStart = (e) => e.preventDefault();

const Carousel = ({data}) => {
const classes = useSTyles();
const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 6,
    },
  };

const items = data.map((c) => (
    <div className={classes.carouselItem}>
      <img
        src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
        alt={c?.name}
        onDragStart={handleDragStart}
        className={classes.carouselItem__img}
      />
      <div className={classes.text}>{c?.name}</div>
    </div>
  ));

  return (
   <AliceCarousel
      mouseTracking
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoPlay
    />
  );
}


export default Carousel
