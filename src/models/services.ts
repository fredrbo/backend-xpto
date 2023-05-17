import { MariaDBDataSource } from "./data_source";
import { Book } from "./Book";
import { Subject } from "./Subject";

export class Service {
    start() {
        MariaDBDataSource.initialize().then(() => {
            console.log("Iniciando banco dados...");
        }).catch((err) => {
            console.error("Erro de inicialização !");
        })
    }
    async listAllBook() {
        let list = await MariaDBDataSource.manager.find(Book, { relations: ['subject'] });
        return list;
    }

    async insertBook(book: Book) {
        const subjectRepository = MariaDBDataSource.manager.getRepository(Subject);
        const subject = await subjectRepository.findOne({ where: { id: book.subjectId } });
        if(!subject){
            return
        }
        book.subject = subject;
        await MariaDBDataSource.manager.save(book);
    }
    async listAllSubject() {
        let list = await MariaDBDataSource.manager.find(Subject);
        return list;
    }
    async insertSubject(subject: Subject) {
        await MariaDBDataSource.manager.save(subject);
    }
}

