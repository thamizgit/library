import { useRef, useState } from "react";
import axios from "../../api/axios";
import "./Filter.css";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoMdArrowDropupCircle } from "react-icons/io";
import { AiFillFilter } from "react-icons/ai";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Filter = ({
  filter,
  setFilter,
  filterClick,
  setFilterClick,
  filterTitle,
  setFilterTitle,
  setBooks,
  filterAuthor,
  setFilterAuthor,
  setIsLoading,
}) => {
  const [titleClick, setTitleClick] = useState(false);
  const [authorClick, setAuthorClick] = useState(false);
  const [dateClick, setDateClick] = useState(false);
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [filterLoading, setFilterLoading] = useState(false);
  const titleRef = useRef();
  const { auth } = useContext(AuthContext);
  const handleAll = async () => {
    try {
      setFilterLoading(true);
      const result = await axios.get("/books");
      setBooks(result.data);
      setFilter("all");
      setFilterClick(false);
    } catch (err) {
      console.log(err);
    } finally {
      setFilterLoading(false);
    }
  };
  const handleSubmitTitle = async () => {
    try {
      setFilterLoading(true);
      const result = await axios.post(
        "/books/filterByTitle",
        JSON.stringify({
          title: filterTitle,
        }),
        {
          headers: {
            Accept: "application/json, text/plain",
            "Content-Type": "application/json",
          },
        }
      );
      setBooks(result.data);
      setFilterClick(false);
        setTitleClick(false);
         setFilterStartDate("");
        setFilterEndDate("");
        setFilterAuthor("");
      setFilter("title");
    } catch (err) {
      console.log(err);
    } finally {
      setFilterLoading(false);
    }
  };
  const handleSubmitAuthor = async () => {
    try {
      setFilterLoading(true);
      const result = await axios.post(
        "/books/filterByAuthor",
        JSON.stringify({
          author: filterAuthor,
        }),
        {
          headers: {
            Accept: "application/json, text/plain",
            "Content-Type": "application/json",
          },
        }
      );
      setBooks(result.data);
      setFilterClick(false);
        setAuthorClick(false);
        setFilterStartDate("");
        setFilterEndDate("");
        setFilterTitle("");
      setFilter("author");
    } catch (err) {
      console.log(err);
    } finally {
      setFilterLoading(false);
    }
    };
    const handleSubmitDate = async () => {
        try {
            setFilterLoading(true);
            const result = await axios.post(
        "/books/filterByDate",
        JSON.stringify({
            startdate: filterStartDate,
            enddate:filterEndDate
        }),
        {
          headers: {
            Accept: "application/json, text/plain",
            "Content-Type": "application/json",
          },
        }
            );
            setBooks(result.data);
            setFilterClick(false);
            setDateClick(false);
            setFilter("date");
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setFilterLoading(false);
        }
  }
  const handleFavourites = async () => {
    if (!auth.username)
    {
      toast.error("You need to login to filter by favourites");
      return;
    }
    try {
      setFilterLoading(true);
      const result = await axios.get(`/books/filterByFav/${auth.username}`);
      setBooks(result.data);
      setFilter('favourites');
      setFilterClick(false);
    }
    catch (err) {
      console.log(err);
    }
    finally {
      setFilterLoading(false);
    }
  }
  return (
    <section className={`filter-layout`}>
      <section className={`filter`}>
        <h1 style={{ marginTop: "22px" }}>
          <AiFillFilter /> FILTER BY
        </h1>
        <p className="filter-box">
          {filter}
          {filterClick ? (
            <IoMdArrowDropdownCircle
              style={{
                position: "relative",
                left: "20%",
                top: "1px",
                cursor: "pointer",
              }}
              onClick={() => setFilterClick(!filterClick)}
            />
          ) : (
            <IoMdArrowDropupCircle
              style={{
                position: "relative",
                left: "20%",
                top: "1px",
                cursor: "pointer",
              }}
              onClick={() => setFilterClick(!filterClick)}
            />
          )}
        </p>
      </section>
      {filterClick && (
        <section className={`filter-container ${filterLoading && 'blur'}`}>
          <p
            className={`${filter === "all" && "active"}`}
            onClick={() => handleAll()}
          >
            all
          </p>
          <p
            className={`${filter === "title" && "active"}`}
            onClick={() => setTitleClick(!titleClick)}
          >
            Title
            {titleClick ? (
              <IoMdArrowDropdownCircle
                style={{
                  position: "relative",
                  left: "32%",
                  top: "1px",
                  cursor: "pointer",
                }}
                onClick={() => setTitleClick(!filterClick)}
              />
            ) : (
              <IoMdArrowDropupCircle
                style={{
                  position: "relative",
                  left: "32%",
                  top: "1px",
                  cursor: "pointer",
                }}
                onClick={() => setTitleClick(!filterClick)}
              />
            )}
          </p>
          {titleClick && (
            <form onSubmit={(e) => e.preventDefault()} className="title-layout">
              <input
                ref={titleRef}
                placeholder="enter title"
                type="text"
                required
                autoFocus
                value={filterTitle}
                onChange={(e) => setFilterTitle(e.target.value)}
              />
              {filterTitle && (
                <button onClick={() => handleSubmitTitle()}>Save</button>
              )}
            </form>
          )}
          <p
            className={`${filter === "author" && "active"}`}
            onClick={() => setAuthorClick(!authorClick)}
          >
            Author{" "}
            {authorClick ? (
              <IoMdArrowDropdownCircle
                style={{
                  position: "relative",
                  left: "15%",
                  top: "1px",
                  cursor: "pointer",
                }}
                onClick={() => setAuthorClick(!filterClick)}
              />
            ) : (
              <IoMdArrowDropupCircle
                style={{
                  position: "relative",
                  left: "15%",
                  top: "1px",
                  cursor: "pointer",
                }}
                onClick={() => setAuthorClick(!filterClick)}
              />
            )}
          </p>
          {authorClick && (
            <form onSubmit={(e) => e.preventDefault()} className="title-layout">
              <input
                placeholder="enter author"
                type="text"
                required
                autoFocus
                value={filterAuthor}
                onChange={(e) => setFilterAuthor(e.target.value)}
              />
              {filterAuthor && (
                <button onClick={() => handleSubmitAuthor()}>Save</button>
              )}
            </form>
          )}
          <p
            className={`${filter === "date" && "active"}`}
            onClick={() => setDateClick(!dateClick)}
          >
            Date{" "}
            {dateClick ? (
              <IoMdArrowDropdownCircle
                style={{
                  position: "relative",
                  left: "20%",
                  top: "1px",
                  cursor: "pointer",
                }}
                onClick={() => setDateClick(!filterClick)}
              />
            ) : (
              <IoMdArrowDropupCircle
                style={{
                  position: "relative",
                  left: "27%",
                  top: "1px",
                  cursor: "pointer",
                }}
                onClick={() => setDateClick(!filterClick)}
              />
            )}
          </p>
          {dateClick && (
            <form onSubmit={(e) => e.preventDefault()} className="title-layout">
              <label htmlFor="startdate">Start Date:</label>
              <input
                id="startdate"
                style={{ colorScheme: "dark" }}
                placeholder="enter start date"
                type="date"
                required
                autoFocus
                value={filterStartDate}
                onChange={(e) => setFilterStartDate(e.target.value)}
              />
              <label htmlFor="enddate">End Date:</label>
              <input
                id="enddate"
                style={{ colorScheme: "dark" }}
                placeholder="enter end date"
                type="date"
                required
                autoFocus
                value={filterEndDate}
                onChange={(e) => setFilterEndDate(e.target.value)}
              />
              {filterStartDate && filterEndDate && (
                <button onClick={() => handleSubmitDate()}>Save</button>
              )}
            </form>
          )}
          <p
            className={`${filter === "favourites" && "active"}`}
            onClick={() => handleFavourites()}
          >
            Favourites
          </p>
          <ToastContainer />
        </section>
      )}
    </section>
  );
};
export default Filter;
