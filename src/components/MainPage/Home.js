import Header from "../Header/Header";
import Books from "../Books/Books";
import Filter from "../Filter/Filter";
import { useState } from "react";
import axios from "../../api/axios";
import Heading from "../Heading/Heading";
import Footer from "../Footer/Footer";
import '../../App.css';
import Recents from "../Recents/Recent";
import BookContent from "../BookContent.js/BookContent";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
const Home = ({ books,setBooks,isLoading,setIsLoading,errMsg,setErrMsg,bookClick,setBookClick,recentBooks }) => {
  const [filter, setFilter] = useState("all");
  const [filterClick, setFilterClick] = useState(false);
  const [filterTitle, setFilterTitle] = useState("");
  const [filterAuthor, setFilterAuthor] = useState("");
  
  const { skip, setSkip } = useContext(AuthContext);
  const [hasMore, setHasMore] = useState(true);
  const fetchData = async () => {
    if (filter !== "all") {
      setHasMore(false);
      return;
    }
    try {
      if (hasMore !== false) {
        const result = await axios.post("/books/slow", JSON.stringify({ skip: skip + "" }), {
          headers: {
            Accept: "application/json,text/plain",
            "Content-Type": "application/json"
          }
        });
        setSkip(skip + 8);
        if (result.data.length === 0 || result.data.length < 8) {
          setHasMore(false);
        }
        const newArr = [...books, ...result.data];
        setBooks(newArr);
      }
      }
      
      catch (err) {
        if (!err?.response)
          setErrMsg("No server response")
        else if (!err?.response?.status === 500)
          setErrMsg("Network Error")
        else
          setErrMsg("Something Went Wrong")
        
      }
        
  }

  return (
    <>
      <Header />
      {!bookClick && <>
        <Recents setBooks={setBooks} setBookClick={setBookClick} recentBooks={recentBooks} />
      <Filter
        filter={filter}
        setFilter={setFilter}
        filterClick={filterClick}
        setFilterClick={setFilterClick}
        filterTitle={filterTitle}
        setFilterTitle={setFilterTitle}
        setBooks={setBooks}
        filterAuthor={filterAuthor}
        setFilterAuthor={setFilterAuthor}
        setIsLoading = {setIsLoading}
      />
      <Heading filter={filter} />
      
        <section className={`book-section ${isLoading && 'spinner'}`}>
          <Books books={books} fetchData={fetchData} hasMore={hasMore} isLoading={isLoading} errMsg={errMsg} setBookClick={setBookClick} />
        </section>
        </>
      }
      {bookClick && <BookContent setBookClick={setBookClick} />}
      {!isLoading && errMsg && <p style={{ color: "red", textAlign: "center" }}>{errMsg}</p>}
      {isLoading && <section className="spin"></section>}
      
        <Footer />
      
    </>
  );
};
export default Home;
