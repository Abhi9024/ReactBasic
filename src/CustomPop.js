import React from 'react';
import Modal from 'react-responsive-modal';
import './custom-animation.css';
import './bootstrap.css';
import  AuthorService from './AuthorService.js';

export default class CustomPop extends React.Component {
  state = {
    open: false,
    author:{}
  };

  onOpenModal = () => {
    let auth = new AuthorService().GetAuthor(this.props.keyId);

    this.setState(prevState => ({
        author: {
            ...auth
        },
        open:true
    }));
    
};

//     this.setState({ open: true, author: {Id:auth.Id,Name:auth.Name,Age:auth.Age,Books:auth.Books} });
//     console.log(this.state.author);
//   };

  onCloseModal = () => {
      console.log(this.state.author);
    
    this.setState(prevState => ({
        //author: {},
        open:false
    }));
  };

  handleChange(e) {   
    var oldValue = this.state.author;
    var newValue = (e.target.name === "name")?
                   {Name: e.target.value, Gender: oldValue.Gender, Age:oldValue.Age,Books: oldValue.Books}:
                   ((e.target.name==="age")?
                   {Name: oldValue.Name, Gender: oldValue.Gender, Age:e.target.value,Books: oldValue.Books}:
                   (e.target.name==="gender")?
                   {Name: oldValue.Name, Gender: e.target.value, Age:oldValue.Age,Books: oldValue.Books}:
                   {Name: oldValue.Name, Gender: oldValue.Gender, Age:oldValue.Age,Books: e.target.value});
    this.setState(prevState =>({author : newValue}));
  }


  onSubmit = () => {
    this.props.editAuthor(this.props.keyId,this.state.author);
    this.setState(prevState => ({
      //author: {},
      open:false
  }));
  };

  onDelete = () =>{
    this.props.deleteAuthor(this.props.keyId);
  };

  render() {
    const { open } = this.state;
    return (
      <div className="example">
        <button className="btn btn-action" onClick={this.onOpenModal}>
        <span className="glyphicon glyphicon-search"></span> Edit 
        </button>
        {' '}
        <button className="btn btn-action" onClick={this.onDelete}>
        <span className="glyphicon glyphicon-search"></span> Delete 
        </button>
        
        <Modal
          open={open}
          onClose={this.onCloseModal}
          center
          classNames={{
            transitionEnter: 'transition-enter',
            transitionEnterActive: 'transition-enter-active',
            transitionExit: 'transition-exit-active',
            transitionExitActive: 'transition-exit-active',
          }}
          animationDuration={1000}
        >
          <div className="row">
           <div className="col-sm-3">
             <label>Name: </label>
             <input type="text" name="name" value={this.state.author.Name} onChange={ this.handleChange.bind(this) }/>
           </div>
           <div className="col-sm-3">
             <label>Age: </label>
             <input type="text" name="age" value={this.state.author.Age} onChange={ this.handleChange.bind(this) }/>
           </div>
           <div className="col-sm-3">
             <label>Gender: </label>
             <input type="text" name="gender" value={this.state.author.Gender} onChange={ this.handleChange.bind(this) }/>
           </div>
           <div className="col-sm-3">
             <label>Books: </label>
             <input type="text" name="books" value={this.state.author.Books} onChange={ this.handleChange.bind(this) }/>
           </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-12 ">
             <input type="button" value="Submit" className="btn btn-primary float-right" onClick={this.onSubmit}/>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}