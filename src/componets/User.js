import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserConsumer from '../context'
import axios from 'axios'
import {Link} from 'react-router-dom'
 class User extends Component {
   state={
    test:"Test",
    isVisible:false
   }
  static defaultProps={
    name:"Bilgi Yok",
    salary:"Bilgi Yok",
    department:"Bilgi Yok"
  }
  onClickEvent=(number,e)=>{
    this.setState({
      isVisible: !this.state.isVisible
    })
  }
  onDeleteUser= async(dispatch,e)=>{
    const{id}=this.props;
    await axios.delete(`http://localhost:3000/users/${id}`);
    dispatch({type:"DELETE_USER",payload:id});
  }
  //silindiği zaman çalışıyor
  // componentWillUnmount(){
  //   console.log("componentWillUnmount");
  // }
  render() {
    //destructing
    const{id,name,department,salary}=this.props;
    const{isVisible}=this.state;

    return(
    <UserConsumer>
     {
        value=>
        {
          const {dispatch}=value;
          return (
      <div className="col-md-8 mb-4">
      <div className="card" style={isVisible?{backgroundColor:"#FFF0BA"}:null}>
        <div className="card-header d-flex justify-content-between" onClick={this.onClickEvent}>
         {/* <h4 className="d-inline" onClick={this.onClickEvent.bind(this,32)}>{name}</h4> */}
         <h4 className="d-inline">{name}</h4>
         <i onClick={this.onDeleteUser.bind(this,dispatch)} className="far fa-trash-alt" style={{cursor:"pointer"}}></i>
      </div>
     {isVisible ?     <div className="card-body">
      <p className="d-inline">Departman: {department}</p><br/>
      <p className="d-inline">Maaş: {salary}</p><br/>
      {/* <p className="d-inline">{test}</p> */}
      <br></br>
      <Link to={`edit/${id}`} className="btn btn-dark btn-block">Update User</Link>
      </div> : null}
      </div>
      </div>
    )
        }
    
     }
    </UserConsumer>);
    
  }
}
User.propTypes={
  name: PropTypes.string.isRequired,
  salary:PropTypes.string.isRequired,
  department:PropTypes.string.isRequired,
  id:PropTypes.string.isRequired
}
export default User;