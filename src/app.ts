import { Book } from "./models/Book"
import { Service } from "./models/services"
import { Subject } from "./models/Subject"
const express = require('express');
var cors = require('cors');
const app = express();
const port = 5004;


app.use(express.json());

app.use(cors({
    oringin: '*',
    credentials: true
}));

var service = new Service();
service.start();

app.get('/book/list', listAllBooks);
app.get('/book', filterBook);
app.post('/book/add', createBook);
app.get('/subject/list', listAllSubjects);
app.post('/subject/add', createSubject);

app.listen(port, listenHandler);


async function listAllBooks(req, res) {
    let books = await service.listAllBook();
    let booksWithSubjects = books.map(book => {
        return {
            ...book,
        };
    });
    let booksJson = JSON.stringify(booksWithSubjects);
    res.setHeader('Content-Type', 'application/json');
    res.end(booksJson);
}

async function filterBook(req, res) {
    const filter = req.query.filter;

    if (!filter) {
        res.status(400).json({ error: 'O parâmetro de busca  é obrigatório.' });
        return;
    }

    let books = await service.listAllBook();
    let filteredBooks = books.filter(book => {
        // Verifica se a string de pesquisa está presente em alguma propriedade do livro
        for (let key in book) {
            if (typeof book[key] === 'string' && (book[key].includes(filter) || book.subject.name.includes(filter))) {
                return true;
            }
        }
        return false;
    });

    filteredBooks.forEach(el => {
        console.log(el.publicationDate)
        el.publicationDate = formatDate(el.publicationDate)
    })
    let booksJson = JSON.stringify(filteredBooks);
    res.setHeader('Content-Type', 'application/json');
    res.end(booksJson);
}

function formatDate(dateString): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
}

async function listAllSubjects(req, res) {
    let subjects = await service.listAllSubject();
    let allSubjects = subjects.map(subject => {
        return {
            ...subject,
        };
    });
    let subjectsJson = JSON.stringify(allSubjects);
    res.setHeader('Content-Type', 'application/json');
    res.end(subjectsJson);
}


async function createBook(req, res) {
    let novo_book = new Book();
    for (let key in req.body) {
        novo_book[key] = req.body[key];
    }
    await service.insertBook(novo_book);
    let novo_book_i = JSON.stringify(novo_book);
    res.setHeader('Content-Type', 'application/json');
    res.end(novo_book_i);
}

async function createSubject(req, res) {
    let new_subject = new Subject();
    for (let key in req.body) {
        new_subject[key] = req.body[key];
    }
    await service.insertSubject(new_subject);
    let new_subject_i = JSON.stringify(new_subject);
    res.setHeader('Content-Type', 'application/json');
    res.end(new_subject_i);
}

function listenHandler() {
    console.log(`Escutando na porta ${port}!`);
}