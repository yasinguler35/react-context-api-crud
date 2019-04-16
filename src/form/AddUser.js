import React, { Component } from 'react'
import posed from 'react-pose';
import UserConsumer from '../context';
import axios from 'axios'
var uniqid = require('uniqid');
const Animation=posed.div({
    visible: { opacity: 1,applyAtStart:{display:"block"} },
    hidden: { opacity: 0,applyAtEnd:{display:"none"} }
  });
 class AddUser extends Component {
     state=
     {
          isVisible:true,
          name:"",
          department:"",
          salary:"",
          error:false
     }
     validateForm=()=>{
      const{name,department,salary}=this.state;
      if (name=="" || department=="" || salary=="") {
         return false;
      } 
      else{
         return true;
      }
     }
     changeVisibility=(e)=>
     {
         this.setState({
             isVisible:!this.state.isVisible
         })
     }
     addUser=async (dispatch,e)=>{

      e.preventDefault();
   
      const{name,department,salary}=this.state;
         const newUser={
            id:uniqid(),
            name:name,
            department:department,
            salary:salary
                       }
         if (!this.validateForm()) {
            this.setState({
               error:true
            })
            return;
         }
         const response=await axios.post("http://localhost:3000/users",newUser);
   
         // console.log(newUser);
         dispatch({type:"ADD_USER",payload:response.data});
         this.props.history.push('/');
      
 
     }
   changeInput=(e)=>{
        this.setState({
           [e.target.name]:e.target.value
        })
   }
  render() {
    const{isVisible,name,salary,department,error}=this.state;
    return (<UserConsumer>
       {
          value=>{
             const{dispatch}=value;
            return (
               <div>
               <div className="col-md-8 mb-4" >
               <button className="btn btn-dark btn-block mb-2" onClick={this.changeVisibility}>{isVisible ? "Hide Form":"Show Form"}</button>
                  <Animation pose={isVisible?"visible":"hidden"}>
                  <div className="card">
                   <div className="card-header">
                      <h4>Add User Form</h4>
                   </div>
                   <div className="card-body">
                   {
                      error ? <div className="alert alert-danger">Boş geçilemez</div>:null
                   }
                      <form onSubmit={this.addUser.bind(this,dispatch)}>
                          <div className="form-group">
                             <label htmlFor="name">Name</label>
                             <input onChange={this.changeInput} value={name} type="text" name="name" id="name" placeholder="Enter Name" className="form-control"></input>
                          </div>
                          <div className="form-group">
                             <label htmlFor="department">Department</label>
                             <input onChange={this.changeInput} value={department} type="text" name="department" id="department" placeholder="Enter Department" className="form-control"></input>
                          </div>
                          <div className="form-group">
                             <label htmlFor="salary">Salary</label>
                             <input onChange={this.changeInput} value={salary} type="text" name="salary" id="salary" placeholder="Enter Salary" className="form-control"></input>
                          </div>
                          <button className="btn btn-danger btn-block" type="submit">Add User</button>
                          <br></br>
                          {/* <div className="alert alert-success">Ekleme Başarılı</div> */}
                      </form>
                   </div>
                  </div>
                  </Animation>
               </div>
               </div>
             )
                 
                 }
       }
    </UserConsumer>)
    
  }
}
export default AddUser;