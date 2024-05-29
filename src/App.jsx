import { useState, useMemo, useEffect } from 'react'
import './App.css'
import { library } from '../books.json'

function App() {
  const [books, setBooks] = useState(window.localStorage.getItem('books') ? JSON.parse(window.localStorage.getItem('books')) : library)
  const [search, setSearch] = useState('')
  const [list, setList] = useState(window.localStorage.getItem('list') ? JSON.parse(window.localStorage.getItem('list')) : [])


  const listLength = useMemo(() => list.length, [list])
  const disponibleBooks = useMemo(() => books.length, [books])

  const handleAddBook = (value) => {
    setList([...list, value])
    setBooks(books.filter(book => book.book.ISBN !== value.book.ISBN))
  }
  const handleRemoveBook = (value) => {
    setList(list.filter(book => book.book.ISBN !== value.book.ISBN))
    setBooks([...books, value])
  }

  useEffect(() => {
    window.localStorage.setItem('books', JSON.stringify(books))
    window.localStorage.setItem('list', JSON.stringify(list))

  }, [books, list])


  return (
    <main>
      <section className='Search'>
        <h1>Bienvenidos a la libreria</h1>
        <h2>Busque el libro según su categoría preferida</h2>
        <select
          onChange={(e) => setSearch(e.target.value)}
          name="select" id="select" defaultValue={''}>
          <option value="">Todos</option>
          {books.map((books) => (
            <option key={books.book.ISBN} value={books.book.genre}>{books.book.genre}</option>
          ))}
        </select>
      </section>

      <section className='Books'>
        <div className="listaLibros">
          {list.length === 0 && <h2>No hay libros en la lista de lectura</h2>}
          <h3>Libros disponibles: {disponibleBooks}</h3>
          {books
            .filter(book => (
              search === '' ? book :
                book.book.genre === search))
            .map((book) => (
              <div className='book-div' key={book.book.ISBN}>
                <img onClick={() => handleAddBook(book)} src={book.book.cover} alt="" />
              </div>
            ))}
          {listLength}
        </div>

        {list.length > 0 &&
          <aside className='listOfBooks'>
            <h2>Lista de lectura</h2>
            <h3>Libros en lista: {listLength}</h3>
            <div className='listaLibros'>
              {list && list.map((book) => (
                <div className='book-div' key={book.book.ISBN}>
                  <img onClick={() => handleRemoveBook(book)} src={book.book.cover} alt="Imagen del libro" />
                </div>
              ))}</div>
          </aside>
        }
      </section>

    </main>
  )
}

export default App
