import React, { useState } from 'react'
import EmployeeForm from '../Employess/EmployeeForm'
import {makeStyles, Paper, TableBody, TableCell, TableRow} from '@material-ui/core'
import useTable from '../Components/useTable'
import  * as employeeService from '../Services/employeeService'
import AddIcon from '@material-ui/icons/Add'
import Controls from '../Components/Controls/Controls'
import PopUp from '../Components/PopUp'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import CloseIcon from '@material-ui/icons/Close'
import Notifications from '../Components/Notifications'

const useStyles = makeStyles(theme=>({

pageContent: {
    margin: theme.spacing(5),
    padding:theme.spacing(3)
},

newButton:{
    position:'absolute',
    right:'10px'
}

}))

const headCells =[
    {id:'fullName', label:'Employee Name'},
    {id:'email', label:'Email Address(Personal)'},
    {id:'mobile', label:'Mobile Number'},
    {id:'department', label:'Department'},
    {id:'actions', label:'Actions'},
    
]

export default function Employees() {


    const classes = useStyles();
    const [recordForEdit ,setRecordForEdit] =useState(null);
    const [records, setRecords] =useState(employeeService.getAllEmployees());
    const [openPopup ,setOpenPopup] =useState(false)
    const [notify,setNotify]=useState({isOpen:false, message:'',type:''})
    const [filterfn, setFilterFn]=useState({fn:items=>{return items;}})
    
    const{
    TblContainer,
    Tblhead,
   // TblPagination
    } =useTable(records,headCells);

    const addOrEdit =(employee , restForm)=>{
        if(employee.id==0)
          employeeService.insertEmployee(employee)
          else
             employeeService.updateEmployee(employee)
        restForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(employeeService.getAllEmployees())

        setNotify({
            isOpen:true,
            message:'Submitted Succwssfully',
            type:'success'
        })
    }
   
    const openInPopup = item=>{
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const onDelete=id=>{
    if(window.confirm('Are You Sure To Delete? This Record')){
        employeeService.deleteEmployee(id);
        setRecords(employeeService.getAllEmployees())

        setNotify({
            isOpen:true,
            message:'Deleted Succwssfully',
            type:'error'
        })
    }
}
 return (
        <>
        <Paper className={classes.pageContent}> 

        <Controls.Buttons
        onClick={()=>{setOpenPopup(true);setRecordForEdit(null);}}
        className={classes.newButton}
         text="Add New"
         variant="outlined"
         startIcon={<AddIcon/>}
         
        />
        <br></br>
        <br></br>
        
        
        <TblContainer>
            <Tblhead/>
            <TableBody>
                {
            records.map(item =>
            (<TableRow key={item.id}>
               
               <TableCell>    {item.fullName} </TableCell>
               <TableCell>    {item.email}   </TableCell>
               <TableCell>    {item.mobile}  </TableCell>
               <TableCell>    {item.department}  </TableCell>
               <TableCell> 
                    <Controls.ActionButton
                     color="primary"
                     onClick={()=>{openInPopup(item)}}
                     >
                   <EditOutlinedIcon
                    frontSize="small"/>
                   </Controls.ActionButton> 
                   
                   <Controls.ActionButton
                    color="secondary"
                    onClick={()=>{onDelete(item.id)}}
                    >
                   <CloseIcon 
                   frontSize="small"/>
                   </Controls.ActionButton> 
                    
                   </TableCell>
                
            </TableRow>

            ))
        }
            </TableBody>
        </TblContainer>
      {  /*<TblPagination/>*/}
         </Paper>
         <PopUp
         title="Employee From"
         openPopup ={openPopup}
         setOpenPopup ={setOpenPopup}
         >
             <EmployeeForm
             addOrEdit={addOrEdit}
             recordForEdit={recordForEdit}
             />
         </PopUp>
         <Notifications
         
         notify={notify}
         setNotify={setNotify}
         />
        </>
    )
}
