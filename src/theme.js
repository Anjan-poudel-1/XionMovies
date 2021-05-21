import {createMuiTheme} from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette:{
        type:"dark",
        secondary:{
    light:'#ff5131',
    main:'#d50000',
    dark:'#9b0000',
},
primary:{
    light:'#484848',
    main:'#212121',
    dark:'#000000'
},
text:{
    primary:"#fff",
    secondary:"rgba(0, 0, 0, 1)"
}
    }
});

export default theme;