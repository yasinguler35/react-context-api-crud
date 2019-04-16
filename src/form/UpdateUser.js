import React, { Component } from 'react'
import UserConsumer from '../context';
import axios from 'axios';

 class UpdateUser extends Component {
     state=
     {
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
     UpdateUser=async (dispatch,e)=>{

      e.preventDefault();
      const{name,salary,department}=this.state;
      const {id}=this.props.match.params;
      const updatedUser = {
          name,
          salary,
          department
      }
      if (!this.validateForm()) {
         this.setState({
            error:true
         })
         return;
      }
      const response = await axios.put(`http://localhost:3000/users/${id}`,updatedUser);
      dispatch({type:"UPDATE_USER",payload:response.data});
      this.props.history.push('/');
    //   console.log(`http://localhost:3000/users/${id}`);
    //   console.log(updatedUser);
     }
   changeInput=(e)=>{
        this.setState({
           [e.target.name]:e.target.value
        })
   }
   componentDidMount = async() => {
     const {id}=this.props.match.params;
     const response= await axios.get(`http://localhost:3000/users/${id}`);
     const{name,salary,department}=response.data;
     this.setState({
         name,
         salary,
         department
     })
   }
   
  render() {
    const{name,salary,department,error}=this.state;
    return (<UserConsumer>
       {
          value=>{
             const{dispatch}=value;
            return (
               <div>
               <div className="col-md-8 mb-4" >
                  <div className="card">
                   <div className="card-header">
                      <h4>Update User Form</h4>
                   </div>
                   <div className="card-body">
                   {
                      error ? <div className="alert alert-danger">Boş geçilemez</div>:null
                   }
                      <form onSubmit={this.UpdateUser.bind(this,dispatch)}>
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
                          <button className="btn btn-danger btn-block" type="submit">Update User</button>
                          <br></br>
                          {/* <div className="alert alert-success">Ekleme Başarılı</div> */}
                      </form>
                   </div>
                  </div>
               </div>
               </div>
             )
                 
                 }
       }
    </UserConsumer>)
    
  }
}
export default UpdateUser;