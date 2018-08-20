import axios from 'axios';


const data= [
    { Id: 1, Name: 'Test2', Gender: 'Male', Age:45,Books: ['book1','book2','book3'] },
    { Id: 2, Name: 'Test3', Gender: 'Female', Age:25,Books: ['The Wall','Computer Scientist','SomeBook'] },
    { Id: 3, Name: 'Test4', Gender: 'Female', Age:55,Books: ['New Book'] }];


async function GetAuthors(params) {
    return await GetAllAuthorsAsync();
}


function GetAllAuthorsAsync() {
    return new Promise(resolve => {
        axios.get('http://localhost:14820/api/Author/GetAuthors',{ headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers' : {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS'},
            
          }})
        .then(res =>{ 
            let authorsData = [...res.data];
            //console.log(updatedHeadersArray);
            for(var i =0 ; i< authorsData.length;i++){
               let newData = {};
               newData.Id = authorsData[i].AuthorId;
               newData.Name=authorsData[i].Name;
               newData.Gender = authorsData[i].Gender;
               newData.Age = authorsData[i].Age;
               newData.Books = authorsData[i].Books;
               data.push(newData);
            }
            //console.log(data);
            resolve(data);
        });
    });
  }

class AuthorService{

     GetAllAuthors() {
       //return GetAuthors();   
       return data;
    };

    addData(authors) {
        this.setState({ toDoNotes: [...this.state.toDoNotes, authors]});
        data.push(authors);
      }

    GetAuthor=(id)=>{
       let author = (data.find(i=>i.Id === id)) ;
       return author;
    };

    UpdateAuthor = (id,author)=>{
        let auth = (data.find(i=>i.Id === id));
        var index = data.indexOf(auth);
        data[index].Name = author.Name;
        data[index].Age =author.Age;
        data[index].Gender=author.Gender;
        data[index].Books = [];
        let booksArray = author.Books.split(",");
        for(var i=0; i< booksArray.length;i++){
            data[index].Books.push(booksArray[i]);
        }
        //data[index].Books = author.Books;
        return data;
    };

    DeleteAuthor = (id)=>{
        console.log(id);
        let auth = (data.find(i=>i.Id === id));
        data.pop(auth);
        return data;
    };

    AddAuthor = (author)=>{
       author.Id =  data.length + 1; 
       data.push(author);
       return data;
    };
}


export default AuthorService;