import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { createBook, getErrorMessage } from '../services/api';
import type { BookFormProps, BookFormState } from '../types/book';

const initialState: BookFormState = {
  title: '',
  author: '',
  status: 'Não lido',
};

function BookForm({ onBookAdded }: BookFormProps) {
  const [form, setForm] = useState<BookFormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Um único handler para todos os campos, usando o atributo `name`.
  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.title.trim() || !form.author.trim()) {
      setError('Preencha título e autor.');
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const created = await createBook({
        ...form,
        title: form.title.trim(),
        author: form.author.trim(),
      });
      onBookAdded(created);
      setForm(initialState);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Título"
        value={form.title}
        onChange={handleChange}
      />
      <input
        name="author"
        placeholder="Autor"
        value={form.author}
        onChange={handleChange}
      />
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="Não lido">Não lido</option>
        <option value="Lido">Lido</option>
      </select>
      <button type="submit" disabled={submitting}>
        {submitting ? 'Adicionando...' : 'Adicionar livro'}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default BookForm;
