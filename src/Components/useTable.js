import { makeStyles, Table, TableCell, TableHead, TableRow } from '@material-ui/core'
import React, { useState } from 'react'

const useStyles = makeStyles(theme=>({
    table :{
        marginTop:theme.spacing(3),
        '& thead th':{
            fontWeight:'600',
            color:theme.palette.primary.main,
            backgroundColor:theme.palette.primary.light,
        },
        '& tbody td':{
            fontWeight: '300',

        },
        '& tbody tr:hover':{
            backgroundColor:'#fffbf2',
            cursor:'pointer',
        },
    },
}))

export default function useTable(records, headCells) {

    const classes = useStyles();

   // const pages=[5,10,25]
  //  const [page, setPage] =useState(0);
    //const [rowsPerPage, setRowsPerPage]=useState(pages[page])

    const TblContainer =props=>( //See Different
        <Table className={classes.table}>
                {props.children}
          </Table>
 )

 const Tblhead = props=>{ //See Different

    return(<TableHead>
        <TableRow>
            {
            headCells.map(headCells=>(<TableCell key={headCells.id}>
                {headCells.label}
            </TableCell>))
            
            }
            </TableRow>
    </TableHead>)
 }

    //const TblPagination =()=>(<TblPagination
    //component="div"
   // page={page}
  //  rowsPerPageOptions ={pages}
   // rowsPerPage={rowsPerPage}
   // count={records.length}
  //  />)
    return {
        TblContainer,
        Tblhead,
       //TblPagination
    }
}
