let libraryBook = [];

const btn = document.querySelector('button');
let box = document.querySelector('.bookBox');

btn.addEventListener('click', () => {
    let bookTitle = document.getElementById('title').value;
    let bookAuthor = document.getElementById('author').value;
    let haveRead = document.getElementById('haveRead').value === 'true';
    
    addBooksToLibrary(bookTitle, bookAuthor, haveRead);
    renderLibrary();
});


function Books(title, author, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.read = read;
}

function addBooksToLibrary(title, author, read){
    const bookObj = new Books(title, author, read);

    libraryBook.push(bookObj);
}


Books.prototype.toogleReadStatus = function(){
    this.read = !this.read;
}

box.addEventListener('click', (e) => {
    if(e.target.classList.contains('deleteButton')){
        const id = e.target.getAttribute('data-id');
        deleteAction(id);
    }
})


box.addEventListener('click', (e) => {
    if (e.target.classList.contains('statusBtn')){
        const id = e.target.getAttribute('data-id');
        editStatus(id);
    }
})

function deleteAction(val){
    const index = libraryBook.findIndex(book => book.id == val);
    if(index !== -1){
        libraryBook.splice(index, 1);
        renderLibrary();
    }
}

function editStatus(val){
    
    // libraryBook.forEach((books) => {
    //     console.log(books.read);
    //     if(books.id == val){
    //         if(books.read){
    //             books.read = false;
    //         }else{
    //             books.read = true;
    //         }
    //     }
    // })
    const book = libraryBook.find((book) => book.id == val);
    if(book){
        book.toogleReadStatus();
        renderLibrary();
    }
    
    
}

function changebookstatus(){

}

function renderLibrary(){
    box.innerHTML = '';
    libraryBook.forEach((book) => {
        let bookDiv = document.createElement('div');
        bookDiv.classList.add('book-entry');

        let titleElem = document.createElement('p');
        titleElem.textContent = `Title: ${book.title}`;

        let authorElem = document.createElement('p');
        authorElem.textContent = `Author: ${book.author}`;

        let readElem = document.createElement('p');
        readElem.textContent = book.read ? 'You have read this book already' : 'You are yet to read this book.';

        let editbuttons = document.createElement('div');
        editbuttons.classList.add('editbuttons');

        let deletebtn = document.createElement('button');
        deletebtn.classList.add('deleteButton');
        deletebtn.textContent = `delete`;
        deletebtn.setAttribute('data-id', book.id);

        let changeStatusBtn = document.createElement('button');
        changeStatusBtn.classList.add('statusBtn');
        changeStatusBtn.textContent = 'status';
        changeStatusBtn.setAttribute('data-id', book.id);


        editbuttons.appendChild(deletebtn);
        editbuttons.appendChild(changeStatusBtn);
        bookDiv.appendChild(editbuttons);
        bookDiv.appendChild(titleElem);
        bookDiv.appendChild(authorElem);
        bookDiv.appendChild(readElem);
        
        
        box.appendChild(bookDiv);
        
    })

}