import BookLayout from "../../layouts/BookLayout";
import InfiniteScroll from "react-infinite-scroll-component";

const Books = ({ books, fetchData, hasMore,isLoading,errMsg,setBookClick }) => (
  <>
    {!books.length && !isLoading && !errMsg && <p style={{textAlign:"center",color:"red",margin:"4rem 0"}}>No Books to Display</p>}
    {books.length && (
      <section className={`books ${isLoading && 'spin'}`}>
        <InfiniteScroll
          className="books"
          dataLength={books.length}
          next={() => { if (hasMore) fetchData() }}
          hasMore={hasMore}
          loader={<section className="spin"></section>}
        >
          {books.map((book) => {
            return (
              <article key={book._id} >
                <BookLayout
                  id={book._id}
                  img={book.img}
                  title={book.title}
                  author={book.author}
                  date={book.date}
                  rating={book.rating}
                  setBookClick={setBookClick}
                />
              </article>
            );
          })}
        </InfiniteScroll>
      </section>
    )}
  </>
);
export default Books;
