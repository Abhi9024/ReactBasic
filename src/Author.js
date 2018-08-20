import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './bootstrap.css';
import  AuthorService from './AuthorService.js';
import PopUp from './PopUp.js';
import CustomPop from './CustomPop.js';

const authorService = new AuthorService();

class Author extends Component {

  authors=[{}];
  
  componentWillMount() {
   this.authors = authorService.GetAllAuthors();
    
  //   authorService.GetAllAuthors().then(res=> { console.log(res); this.setState(prevState => ({
  //     authors: [
  //         ...res
  //     ],
  // }));
  //    console.log(this.state.authors); console.log(this.authors)},err=>console.log(err));
  }
  
  state = {
    newAuthor :{},
  };

 addAuthor = () =>{
   console.log("Add author called!");
   console.log(this.state.newAuthor);
   var newData = authorService.AddAuthor(this.state.newAuthor);
   this.setState(prevState => ({
    authors: {
        ...newData
    },
}));
 }
 

 handleChange(e) {   
  var oldValue = this.state.newAuthor;
  var newValue = (e.target.name === "name")?
  {Name: e.target.value, Gender: oldValue.Gender, Age:oldValue.Age,Books: oldValue.Books}:
  ((e.target.name==="age")?
  {Name: oldValue.Name, Gender: oldValue.Gender, Age:e.target.value,Books: oldValue.Books}:
  (e.target.name==="gender")?
  {Name: oldValue.Name, Gender: e.target.value, Age:oldValue.Age,Books: oldValue.Books}:
  {Name: oldValue.Name, Gender: oldValue.Gender, Age:oldValue.Age,Books: [e.target.value]});
  console.log(newValue);
  this.setState(prevState =>({newAuthor : newValue}));
}


 editAuthor = (id,author)=>{
  var newData =  authorService.UpdateAuthor(id,author);
  this.setState(prevState => ({
    authors: {
        ...newData
    },
}));
 }

 deleteAuthor = (id) =>{

  var newData = authorService.DeleteAuthor(id);
  this.setState(prevState => ({
    authors: {
        ...newData
    },
}));
 }

  render() {
    return (
  <div>
      <h3>Welcome to Author CRUD</h3>
      <br/>
      

<table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Age</th>
      <th scope="col">Gender</th>
      <th scope="col">Books</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {this.authors.map(auth =>
       <tr>
         <th scope="row">{auth.Id}</th>
         <td>{auth.Name}</td>
         <td>{auth.Age}</td>
         <td>{auth.Gender}</td>
         {<td>{auth.Books.map(b=><span>{b}, </span>)}</td>}
         <td>
         <CustomPop keyId={auth.Id}  editAuthor={this.editAuthor} deleteAuthor={this.deleteAuthor}/>
         </td>
       </tr>
      )}
      
  </tbody>
</table>

<br/>
<div className="container">
<div className="row">
<div className="col-sm-3">
  <label>Name:</label>
  <br/>
  <input type="text" name="name" value={this.state.newAuthor.Name} onChange={ this.handleChange.bind(this) }/>
</div>
<div className="col-sm-3">
<label>Age:</label>
<br/>
<input type="text" name="age" value={this.state.newAuthor.Age} onChange={ this.handleChange.bind(this) }/>
</div>
<div className="col-sm-3">
<label>Gender:</label>
<br/>
<input type="text" name="gender" value={this.state.newAuthor.Gender} onChange={ this.handleChange.bind(this) }/>
</div>
<div className="col-sm-3">
<label>Books:</label>
<br/>
<input type="text" name="books" value={this.state.newAuthor.Books} onChange={ this.handleChange.bind(this) }/>
</div>
</div>
<br/>
<div className="row">
<div className="col-sm-12">
  <input type="button" value="Add" className="btn btn-primary float-right" onClick={this.addAuthor}/>
</div>


</div>
</div>
      </div>
     
    );
  }
}

export default Author;
