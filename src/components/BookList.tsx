import { useEffect, useState } from 'react';
import { fetchBooks, getErrorMessage } from '../services/api';
import type { Book } from '../types/book';
import BookForm from './BookForm';
import BookItem from './BookItem';

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carrega a lista uma única vez, quando o componente monta.
  useEffect(() => {
    async function load() {
      try {
        setBooks(await fetchBooks());
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Callbacks que os filhos chamam: o estado fica sempre aqui, no pai.
  function handleAdded(book: Book) {
    setBooks((prev) => [...prev, book]);
  }

  function handleDeleted(id: string) {
    setBooks((prev) => prev.filter((b) => b._id !== id));
  }

  function handleStatusChanged(updated: Book) {
    setBooks((prev) => prev.map((b) => (b._id === updated._id ? updated : b)));
  }

  return (
    <section>
      <BookForm onBookAdded={handleAdded} />

      {loading && <p>Carregando livros...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && books.length === 0 && (
        <p>Nenhum livro cadastrado ainda. Adicione o primeiro acima.</p>
      )}

      <ul className="book-list">
        {books.map((book) => (
          <BookItem
            key={book._id}
            book={book}
            onDeleted={handleDeleted}
            onStatusChanged={handleStatusChanged}
          />
        ))}
      </ul>
    </section>
  );
}

export default BookList;
