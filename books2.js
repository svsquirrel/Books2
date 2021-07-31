

const form = document.querySelector('#popupForm');

const openbtn = document.querySelector('.openButton');
openbtn.addEventListener('click', () => form.style.display = 'block');

const cancelform = document.querySelector('.cancel');
cancelform.addEventListener('click', () => form.style.display='none');

const submit = document.querySelector('#submit');
submit.addEventListener('click', addBookToLibrary);

class Book {
    constructor (title, author, genre, read){
        this.title  = title;
        this.author = author;
        this.genre  = genre;
        this.read   = read;
    };
};

let myLibrary = [];
let newBook;

function addBookToLibrary() {
    event.preventDefault();
    form.style.display = 'none';
    
    let title =  document.querySelector('#title').value;
    let author=  document.querySelector('#author').value;
    let genre =  document.querySelector('#genre').value;
    let read =   document.querySelector('#read').checked;
    newBook =    new Book(title, author, genre, read);
    
    myLibrary.push(newBook);
    setLibrary();
    displayLibrary();
    clearForm();
 }

function clearForm(){
    document.querySelector('#title').value  = '';
    document.querySelector('#author').value = '';
    document.querySelector('#genre').value  = '';
    document.querySelector('#read').checked = false;
 }
 
 function setLibrary() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function getLibrary() {
     if  (!localStorage.myLibrary){
        let notice = document.querySelector('#alert');
        notice.textContent = 'Add some books!';
    }else {
        var storage = localStorage.getItem('myLibrary');
        storage    = JSON.parse(storage);
        myLibrary  = storage;
        displayLibrary();
    };
};

function displayLibrary(){
    resetGrid();
    for(i=0; i< myLibrary.length; i++){
        createBookDisplay(myLibrary[i]);
    }
};

function resetGrid() {
    var newinfo  = document.createElement('tbody');
    var oldbooks = document.querySelector('#newbooks');
    oldbooks.parentNode.replaceChild(newinfo, oldbooks);
    newinfo.id = 'newbooks';
    newinfo.classList = 'booktable';
};

function createBookDisplay(item){
    const grid   = document.querySelector('#newbooks');
   

    let bookdiv  = document.createElement('tr');
    bookdiv.id   = 'id' + (myLibrary.indexOf(item));
    bookdiv.classList = 'ugh';           
    var celltitle         = document.createElement('td');
    var cardtitle         = document.createElement('p');
    cardtitle.textContent = item.title;
    celltitle.style.cssText += 'width: 40%';
    celltitle.appendChild(cardtitle);
    bookdiv.appendChild(celltitle);
     
    var cellauthor         = document.createElement('td');
    var cardauthor         = document.createElement('p');
    cardauthor.textContent = item.author;
    cellauthor.style.cssText += 'width: 25%';
    cellauthor.appendChild(cardauthor);
    bookdiv.appendChild(cellauthor);
    
    var cellgenre         =  document.createElement('td');
    var cardgenre         =  document.createElement('p');
    cardgenre.textContent =  item.genre;
    cellgenre.style.cssText += 'width: 15%';
    cellgenre.appendChild(cardgenre);
    bookdiv.appendChild(cellgenre);

    var cellread =  document.createElement('td');
        cellread.classList = 'fixedbutton';
        cellread.style.cssText += 'width: 10%';
    var cardread =   document.createElement('button');
            if (item.read === true){
            cardread.textContent = 'I read it!'
            }else{
             cardread.textContent = 'Not read'
             } ;
        cardread.classList = 'pressifread';
        cellread.appendChild(cardread);
        bookdiv .appendChild(cellread);
    
    var celldelete =  document.createElement('td')
        celldelete.classList = 'fixedbutton';
        celldelete.style.cssText += 'width: 10%';
    var delbutton =  document.createElement('button');
        delbutton.classList='deletebook';
        delbutton.innerHTML = 'Delete';
        delbutton.addEventListener('click', () => {
        delBook(bookdiv.id)
    });
    celldelete.appendChild(delbutton);
    bookdiv.appendChild(celldelete);

    grid.appendChild(bookdiv);

    cardread.addEventListener('click', () =>{
            item.read = !item.read;
            setLibrary();
            displayLibrary();
     });
 };
 function delBook(divid) {
    var str = divid;
    var num =  str.slice (2);
    
    myLibrary.splice(num, 1)
    setLibrary();
    getLibrary();
};    

function trial() {
    var x = document.querySelector('#newbooks');
    var y = document.createElement('tr');
    var z = document.createElement('td');
    var pp = document.createElement ('p')
    z.appendChild(pp);
    y.appendChild(z);
    x.appendChild(y);
}
//trial();
getLibrary(); 


 
 /*
 

    
    3 if possible, make sure that new book isn't a duplicate of existing book
 https://www.youtube.com/watch?v=k8yJCeuP6I8 (local storage)
 https://www.youtube.com/watch?v=rVyTjFofok0 (local storage)
https://www.youtube.com/watch?v=jV8B24rSN5o (CSS GRID)
 //https://stackoverflow.com/questions/63310980/how-to-display-my-array-of-objects-into-my-html-pages-table-individually-by

 ************************************************************************************
*/