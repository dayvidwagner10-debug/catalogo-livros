# Catálogo de Livros (React + TypeScript + crudcrud)

Lista, cadastra, remove e (opcional) atualiza o status de livros usando uma API do [crudcrud.com](https://crudcrud.com).

## Como rodar

1. Gere uma URL em https://crudcrud.com e copie o endpoint.
2. Copie `.env.example` para `.env` e ajuste: `VITE_API_URL=https://crudcrud.com/api/SEU_ID/books`
3. `npm install`
4. `npm run dev`

> A URL do crudcrud expira em 24h e aceita ~100 requisições. Se parar de funcionar, gere outra e atualize o `.env`.

## Estrutura

- `src/types/book.ts` – interfaces e types (Book, NewBook, props, estado do formulário)
- `src/services/api.ts` – chamadas HTTP (GET, POST, DELETE, PUT) com axios
- `src/components/BookList.tsx` – busca os livros (`useEffect`) e guarda o estado
- `src/components/BookForm.tsx` – formulário de cadastro (POST)
- `src/components/BookItem.tsx` – exibe um livro, remove (DELETE) e alterna status (PUT)
