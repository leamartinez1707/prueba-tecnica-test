import { useState, useMemo, useEffect } from 'react'
import { library } from '../books.json'
import genres from './data/categories.js'
import './App.css'


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


      </section>
      <div className='div-titles'>
        {list.length === 0 && <h2>No hay libros en la lista de lectura</h2>}
        {books.length === 0 && <h2>No hay libros para elegir</h2>}
        {books.length > 0 && <h3>{disponibleBooks} Libros disponibles</h3>}
        <h3>{listLength} en la lista de lectura</h3>
        <div>


          <h3>Filtrar por género</h3>
          <select
            className='selectFilter'
            onChange={(e) => setSearch(e.target.value)}
            name="select" id="select" defaultValue={''}>
            <option value="">Todos</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.name}>{genre.name}</option>
            ))}
          </select>
          <h3>Filtrar por página</h3>
        </div>
        <section className='Books'>
          <div className="listaLibros">

            {books
              .filter(book => (
                search === '' ? book :
                  book.book.genre === search))
              .map((book) => (
                <div className='book-div' key={book.book.ISBN}>
                  <img onClick={() => handleAddBook(book)} src={book.book.cover} alt="" />
                </div>
              ))}
          </div>

          {list.length > 0 &&
            <aside className='listOfBooks'>
              <h2>Lista de lectura</h2>

              <div className='listaLibros'>
                {list && list.map((book) => (
                  <div className='book-div' key={book.book.ISBN}>
                    <img onClick={() => handleRemoveBook(book)} src={book.book.cover} alt={book.book.title} />
                  </div>
                ))}</div>
            </aside>
          }
        </section>
      </div>
    </main>
  )
}

export default App
