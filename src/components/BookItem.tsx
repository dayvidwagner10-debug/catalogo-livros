import { useState } from 'react';
import {
  deleteBook,
  getErrorMessage,
  updateBookStatus,
} from '../services/api';
import type { BookItemProps } from '../types/book';

function BookItem({ book, onDeleted, onStatusChanged }: BookItemProps) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setBusy(true);
    setError(null);
    try {
      await deleteBook(book._id);
      onDeleted(book._id);
    } catch (err) {
      setError(getErrorMessage(err));
      setBusy(false);
    }
  }

  // Opcional: alterna Lido <-> Não lido via PUT.
  async function handleToggleStatus() {
    setBusy(true);
    setError(null);
    try {
      const next = book.status === 'Lido' ? 'Não lido' : 'Lido';
      const updated = await updateBookStatus(book, next);
      onStatusChanged(updated);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <li className="book-item">
      <div className="book-info">
        <strong>{book.title}</strong>
        <span>{book.author}</span>
      </div>
      <button
        type="button"
        className={`status ${book.status === 'Lido' ? 'read' : 'unread'}`}
        onClick={handleToggleStatus}
        disabled={busy}
        title="Clique para alterar o status"
      >
        {book.status}
      </button>
      <button
        type="button"
        className="danger"
        onClick={handleDelete}
        disabled={busy}
      >
        Remover
      </button>
      {error && <p className="error">{error}</p>}
    </li>
  );
}

export default BookItem;
