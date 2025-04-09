const { initializeNewBookData } = require('./db/db.connect')
initializeNewBookData()

const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

const NEWBook = require('./models/newBook.models')

const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})


// 1 & 2. Create an API with route "/books" to create a new book data in the books Database. Make sure to do error handling. Test your API with Postman. Add the following book:

async function createNewBookData(newBook) {
    try {
        const book = new NEWBook(newBook)
        const savedBook = await book.save()
        return savedBook
    } catch (error) {
        console.log("Error creating new book data.", error);
        
    }
}

app.post("/book", async (req, res) => {
    try {
        const createdBook = await createNewBookData(req.body)
    res.status(201).json({message: "Book Added Successfully.", book: createdBook})
    } catch (error) {
        res.status(500).json({error: "Failed To Add Book Data."})
    }
})


// 3. Create an API to get all the books in the database as response. Make sure to do error handling.

async function getAllBooks() {
    try {
        const allBook = await NEWBook.find()
        return allBook
    } catch (error) {
        console.log("Error while getting all books data.", error);
    }
}

app.get("/book", async (req, res) => {
    try {
        const allBooks = await getAllBooks()
        if(allBooks.length != 0) {
            res.json(allBooks)
        } else {
          res.status(404).json({error: "Book Not Found!"})  
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch book data."})
    }
})


// 4. Create an API to get a book's detail by its title. Make sure to do error handling.

async function getBooksByTitle(bookTitle) {
    try {
        const booksByTitle = await NEWBook.findOne({title: bookTitle})
        return booksByTitle
    } catch (error) {
        console.log("Error while getting book by title.", error);
    }
}

app.get("/book/:title", async (req, res) => {
    try {
        const bookByTitle = await getBooksByTitle(req.params.title)
        if(bookByTitle) {
            res.json(bookByTitle)
        } else {
          res.status(404).json({error: "Book Not Found!"})  
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch book data."})
    }
})


// 5. Create an API to get details of all the books by an author. Make sure to do error handling.

async function getBooksByAuthor(bookAuthor) {
    try {
        const findBooksByAuthor = await NEWBook.find({author: bookAuthor})
        return findBooksByAuthor
    } catch (error) {
        console.log("Error while getting books by author.", error);
    }
}

app.get("/book/writer/:author", async (req, res) => {
    try {
        const booksByAuthor = await getBooksByAuthor(req.params.author)
        if(booksByAuthor.length != 0) {
            res.json(booksByAuthor)
        } else {
          res.status(404).json({error: "Book Not Found!"})  
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch book data."})
    }
})


// 6. Create an API to get all the books which are of "Business" genre.

async function getBooksByGenre(bookGenre) {
    try {
        const findBooksByGenre = await NEWBook.find({genre: bookGenre})
        return findBooksByGenre
    } catch (error) {
        console.log("Error while getting books by genre.", error);
    }
}

app.get("/book/category/:genre", async (req, res) => {
    try {
        const booksByGenre = await getBooksByGenre(req.params.genre)
        if(booksByGenre.length != 0) {
            res.json(booksByGenre)
        } else {
          res.status(404).json({error: "Book Not Found!"})  
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch book data."})
    }
})


// 7. Create an API to get all the books which was released in the year 2012.


async function getBooksByPublishedYear(releasedYear) {
    try {
        const findBooksByPublishedYear = await NEWBook.find({publishedYear: releasedYear})
        return findBooksByPublishedYear
    } catch (error) {
        console.log("Error while getting books by Published year.", error);
    }
}

app.get("/book/date/:publishedYear", async (req, res) => {
    try {
        const booksByPublishedYear = await getBooksByPublishedYear(req.params.publishedYear)
        if(booksByPublishedYear.length != 0) {
            res.json(booksByPublishedYear)
        } else {
          res.status(404).json({error: "Book Not Found!"})  
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch book data."})
    }
})


// 8. Create an API to update a book's rating with the help of its id. Update the rating of the "Lean In" from 4.1 to 4.5. Send an error message "Book does not exist", in case that book is not found. Make sure to do error handling.

async function updateBookRating(bookId, dataToUpdate) {
    try {
        const UpdateRating = await NEWBook.findByIdAndUpdate(bookId, dataToUpdate, {new: true})
        return UpdateRating
    } catch (error) {
        console.log("Error while updating book rating.", error);
    }
}

app.post("/book/rating/:bookId", async (req, res) => {
    try {
        const updatedBookRating = await updateBookRating(req.params.bookId, req.body)
        if(updatedBookRating) {
            res.status(200).json({message: "Book Updated Successfully", book: updatedBookRating})
        } else {
          res.status(404).json({error: "Book Not Found!"})  
        }
    } catch (error) {
        res.status(500).json({error: "Failed to update book data."})
    }
})


// 9. Create an API to update a book's rating with the help of its title. Update the details of the book "Shoe Dog". Use the query .findOneAndUpdate() for this. Send an error message "Book does not exist", in case that book is not found. Make sure to do error handling.

async function updateBookByTitle(booTitle, dataToUpdate) {
    try {
        const updateYearAndRating = await NEWBook.findOneAndUpdate({ title: booTitle }, dataToUpdate, { new: true })
        return updateYearAndRating
    } catch (error) {
        console.log("Error while updating book rating and year.", error);
    }
}

app.post("/book/rate/:bookTitle", async (req, res) => {
    try {
        const updatedBookByTitle = await updateBookByTitle(req.params.bookTitle, req.body)
        if(updatedBookByTitle) {
            res.status(200).json({message: "Book Updated Successfully", book: updatedBookByTitle})
        } else {
          res.status(404).json({error: "Book Not Found!"})  
        }
    } catch (error) {
        res.status(500).json({error: "Failed to update book data."})
    }
})


// 10. Create an API to delete a book with the help of a book id, Send an error message "Book not found" in case the book does not exist. Make sure to do error handling.

async function deleteBookById(bookId) {
    try {
        const deleteBook = await NEWBook.findByIdAndDelete(bookId)
        return deleteBook
    } catch (error) {
        console.log("Error while deleting the book.", error);
    }
}

app.delete("/book/delete/:bookId", async (req, res) => {
    try {
        const deletedBook = await deleteBookById(req.params.bookId)
        if(deletedBook) {
            res.status(200).json({message: "Book Deleted Successfully"})
        } else {
          res.status(404).json({error: "Book Not Found!"})  
        }
    } catch (error) {
        res.status(500).json({error: "Failed to delete book data."})
    }
})