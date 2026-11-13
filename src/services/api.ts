import axios from 'axios';
import type { Book, BookStatus, NewBook } from '../types/book';

const API_URL = import.meta.env.VITE_API_URL;

const http = axios.create({ baseURL: API_URL });

export async function fetchBooks(): Promise<Book[]> {
  const { data } = await http.get<Book[]>('');
  return data;
}

export async function createBook(book: NewBook): Promise<Book> {
  // O crudcrud devolve o objeto criado já com o _id.
  const { data } = await http.post<Book>('', book);
  return data;
}

export async function deleteBook(id: string): Promise<void> {
  await http.delete(`/${id}`);
}

export async function updateBookStatus(
  book: Book,
  status: BookStatus,
): Promise<Book> {
  // O crudcrud NÃO aceita _id no corpo do PUT, por isso separamos o _id.
  const { _id, ...rest } = book;
  const body: NewBook = { ...rest, status };
  // O PUT responde sem corpo, então montamos o livro atualizado localmente.
  await http.put(`/${_id}`, body);
  return { ...body, _id };
}

// Transforma qualquer erro em uma mensagem amigável para a interface.
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return 'Não foi possível conectar à API. Verifique sua internet e a URL do crudcrud.';
    }
    if (error.response.status === 404) {
      return 'Recurso não encontrado. Sua URL do crudcrud pode ter expirado (dura 24h).';
    }
    return `Erro ${error.response.status} ao falar com a API.`;
  }
  return 'Ocorreu um erro inesperado.';
}
