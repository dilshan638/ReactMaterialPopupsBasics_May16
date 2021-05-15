import React, {useState, useEffect} from 'react'
import {  Grid} from '@material-ui/core'
import useForm ,{Form}  from '../Components/useForm'
import Controls from '../Components/Controls/Controls'
import * as employeeService from '../Services/employeeService'
import { validate } from '@material-ui/pickers'



const genderItems=[
    {id:'male', title:'Male'},
    {id:'female', title:'Female'},
    {id:'other', title:'Other'}
]
const initialFValues ={
    id :0,
    fullName: '',
    email: '',
    mobile : '',
    city : '',
    gender : 'male',
    departmentId: '',
    hireDate : new Date(),
    isPermanent :false,
}

export default function EmployeeForm(props) {
    const {addOrEdit, recordForEdit} =props

    const validate =(fieldValues= values)=>{
        let temp ={...errors}
        if('fullName' in fieldValues )
          temp.fullName=fieldValues.fullName ? "" : "This Field Is Required"
        if('email' in fieldValues )
          temp.email=(/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email Is not Valid"
        if('mobile' in fieldValues )
          temp.mobile=fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required"
        if('departmentId' in fieldValues )
          temp.departmentId=fieldValues.departmentId.length !=0 ? "" : "This Field Is Required"

       
        setErrors({
            ...temp
        })
        if(fieldValues== values)
        return Object.values(temp).every(x => x == "")
    }

    
    const{ values,
    setvalues,
    handleInputChange,
    errors,
    setErrors,
    restForm
    } = useForm(initialFValues, true, validate)

    
 const handleSubmit = e => {
     e.preventDefault()
     if(validate()){
    // employeeService.insertEmployee(values)
    // restForm()
     addOrEdit(values,restForm);
 }
}

useEffect(()=>{
    if(recordForEdit!=null)
    setvalues({
        ...recordForEdit
    })
},[recordForEdit])
  
    return (
        
        <Form onSubmit={handleSubmit}>
       
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                      label="Full Name"
                      name="fullName"
                      value={values.fullName}
                      onChange={handleInputChange}
                      error={errors.fullName}
                     />
                   

                    <Controls.Input
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    />

                    <Controls.Input
                    label="Mobile"
                    name="mobile"
                    value={values.mobile}
                    onChange={handleInputChange}
                    error={errors.mobile}
                    />

                    <Controls.Input
                    label="City"
                    name="city"
                    value={values.city}
                    onChange={handleInputChange}
                    />
                </Grid>
                
                
                <Grid item xs={6}>

                    <Controls.RadioGroup
                     
                      label="Gender"
                      name="gender"
                      value={values.gender}
                      onChange={handleInputChange}
                      items={genderItems}
                    />

                    <Controls.Select
                    
                    name="departmentId"
                    label="Department"
                    value={values.departmentId}
                    onChange={handleInputChange}
                    options={employeeService.getDepartment()}
                    error={errors.departmentId}
                    
                    />

                    <Controls.DatePicker 
                    name="hireDate"
                    label="Date"
                    onChange={handleInputChange}
                    value={values.hireDate}

                    />
                    <Controls.Checkbox 
                    name="isPermanent"
                    label="Perment Employee"
                    onChange={handleInputChange}
                    value={values.isPermanent}

                    />
                    <div>
                        <Controls.Buttons
                        type="submit"
                        text="Submit"
                         />

                        <Controls.Buttons
                        type="reset"
                        text="Reset"
                        color="default"
                        onClick={restForm}
                         />

                    </div>
                </Grid>

            </Grid>
        
        </Form>

        
    )
}
