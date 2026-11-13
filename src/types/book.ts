// União de literais: só estes dois valores são aceitos pelo compilador.
export type BookStatus = 'Lido' | 'Não lido';

// Formato do livro como a API devolve (com _id gerado pelo crudcrud).
export interface Book {
  _id: string;
  title: string;
  author: string;
  status: BookStatus;
}

// Formato do livro antes de existir na API: ainda não tem _id.
export type NewBook = Omit<Book, '_id'>;

// Estado do formulário (os mesmos campos de um livro novo).
export type BookFormState = NewBook;

// Props dos componentes
export interface BookFormProps {
  onBookAdded: (book: Book) => void;
}

export interface BookItemProps {
  book: Book;
  onDeleted: (id: string) => void;
  onStatusChanged: (updated: Book) => void;
}
