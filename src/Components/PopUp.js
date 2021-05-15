import { Button, Dialog, DialogContent, DialogTitle, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Controls from './Controls/Controls'
import CloseIcon from '@material-ui/icons/Close'


const useStyles = makeStyles(theme=>({
    dialogWraper:{
        padding:theme.spacing(2),
        position:'absolute',
        top:theme.spacing(5)
    },

    dialogTitle :{
        paddingRight:'0px'
    }
}))

export default function PopUp(props) {
    
    const {title ,children, openPopup, setOpenPopup}=props
    const classes =useStyles();
    return (
        <Dialog open={openPopup} maxWidth="md" classes={{paper:classes.dialogWraper}}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{display:'flex'}}>
                    <Typography variant="h6" component="div" style={{flexGrow:1}}>{title}</Typography>
               
              { <Controls.ActionButton  color="secondary"
              onClick={()=>{setOpenPopup(false)}}>
                   <CloseIcon/>
               </Controls.ActionButton>
             }
           
             
              <Button  color="secondary"
               onClick={()=>{setOpenPopup(false)}}
               >  <CloseIcon 
               onClick={()=>{setOpenPopup(false)}}
               /></Button>
              
                </div>
            </DialogTitle>
            <DialogContent dividers>
           {children}
            </DialogContent>
        </Dialog>
    )
}
