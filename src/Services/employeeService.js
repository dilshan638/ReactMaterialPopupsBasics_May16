const KEYS ={
    employees:'employees',
    employeeId:'employeeId'
}
export const getDepartment =()=>([

    {id:'1', title:'Development'},
    {id:'2', title:'Marketing'},
    {id:'3', title:'Accounting'},
    {id:'4', title:'HR'}
])

export function insertEmployee(data){
    let employees=getAllEmployees();
    data['id']= generateEmployeeId()
    employees.push(data)
    localStorage.setItem(KEYS.employees,JSON.stringify(employees))
}

export function updateEmployee(data){
    let employees=getAllEmployees();
   let recordIndex =employees.findIndex(x=>x.id==data.id);
   employees[recordIndex]={...data}
    localStorage.setItem(KEYS.employees,JSON.stringify(employees))
}

export function deleteEmployee(id){
    let employees=getAllEmployees();
    employees =employees.filter(x=>x.id != id)
    localStorage.setItem(KEYS.employees,JSON.stringify(employees));
}



export function generateEmployeeId(data){
   
    if(localStorage.getItem(KEYS.employeeId)==null)///changes
    localStorage.setItem(KEYS.employeeId,'0')//change

    var id= parseInt(localStorage.getItem(KEYS.employeeId))
    localStorage.setItem(KEYS.employeeId,(++id).toString())
    return id;
}


export function getAllEmployees(){

    if(localStorage.getItem(KEYS.employees)==null)
    localStorage.setItem(KEYS.employees,JSON.stringify([]))
//return JSON.parse(localStorage.getItem(KEYS.employees)); //-----This Is Comment for DrodownList
 let employees= JSON.parse(localStorage.getItem(KEYS.employees));
 let departments =getDepartment();
return  employees.map(x =>({
  ...x,
  department : departments[x.departmentId-1].title   
 }))
}