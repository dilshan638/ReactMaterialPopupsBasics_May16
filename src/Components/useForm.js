import React , {useState} from 'react'
import { makeStyles } from '@material-ui/core'
import { validate } from '@material-ui/pickers';


const useStyles = makeStyles(theme =>({
    root:{
        '& .MuiFormControl-root':{
            width:'80%',
            margin: theme.spacing(1)
        }
    }
}))
export default function useForm(initialFValues, validateOnChange=false,validate) {

    const[values, setvalues]= useState(initialFValues); //---------InsertData
    const[errors, setErrors]= useState({});             //-------Validation


    const handleInputChange=e=>{
        const {name, value} = e.target
        setvalues({
            ...values,
            [name]: value
        }) 

    if(validateOnChange)
    validate({[name]: value})
    
        }

        const restForm =()=>{
            setvalues(initialFValues);
            setErrors({})
        }
   
   
    return {
        values,
        setvalues,
        errors,
        setErrors,
        handleInputChange,
        restForm


    }
}




export  function Form(props) {
    const classes= useStyles();
    const {children, ...other} =props;
    return (
       <form  className={classes.root} autoComplete="off" {...other}>
           {props.children}

       </form>
    )
}

