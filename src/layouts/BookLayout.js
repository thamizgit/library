import { useState } from "react";
import "./BookLayout.css";
import { AiTwotoneHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { useContext } from "react";
import axios from "../api/axios";
import AuthContext from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BookLayout = ({ id, img, title, author, date, rating,setBookClick }) => {
  const { auth } = useContext(AuthContext);
  const [favLoading, setFavLoading] = useState(false);
  const fetchFav = () => {
    if (auth.username) {
      const isFav = auth.favourites.find((str) => str === id);
      if (isFav) return true;
      else return false;
    }
    else {
      return false;
    }
  }
    const isFav = fetchFav();
  const [fav, setFav] = useState(isFav);
  const rates = [];
  const publish = new Date(date);
  for (let i = 0; i < rating; i++) {
    rates.push(
      <span>
        <AiFillStar style={{ fontSize: "1.2rem", marginBottom: "-0.1rem" }} />
      </span>
    );
  }
  
  const handleFav = async () => {
    if (!auth.username) {
      toast("You need to login to add favourites");
    }
    else {
      if (fav) {
        try {
          setFavLoading(true);
          const result = await axios.put(
            "/books/removefav",
            JSON.stringify({
              username: auth.username,
              id: id,
            }),
            {
              headers: {
                Accept: "application/json,text/plain",
                "Content-Type": "application/json",
              },
            }
          );
          const newArr = auth.favourites.filter((num) => num !== id);
          auth.favourites = newArr;
          if (result) toast.success(`${title} removed from Favourites`);
          setFav(false);
        } catch (err) {
          toast.error("Something went wrong");
        }
        finally {
          setFavLoading(false);
        }
      }
      else {
        try {
          setFavLoading(true);
          const result = await axios.put("/books/addfav", JSON.stringify({
            username: auth.username,
            id: id
          }), {
            headers: {
              Accept: "application/json,text/plain",
              "Content-Type": "application/json"
            }
          });
          auth.favourites.push(id);
          
          if (result)
            toast.success(`${title} added to Favourites`);
          setFav(true);
        }
        catch (err) {
          toast.error("Something went wrong");
        }
        finally {
          setFavLoading(false);
        }
      }
    }
  }
  const handleRecent = async (id) => {
    if (auth.username) {
      try {
        setFavLoading(true);
        await axios.put("/books/recents", JSON.stringify({
          username: auth.username,
          id
        }), {
          headers: {
            Accept: "application/json,text/plain",
            "Content-Type": "application/json"
          }
        });
      }
      catch (err) {
        console.log(err);
      }
      finally {
        setFavLoading(false);
      }
    }
  }
  return (
    <article
      className={`book-layout ${favLoading && "mkblur"}`}
      onClick={() => handleRecent(id)}
    >
      <img
        className="book-img"
        onClick={() => setBookClick(true)}
        src={require(`../../images/books/${img}`)}
        alt={title}
        width={250}
        height={350}
      />
      <p style={{ marginBottom: "-1.5rem", alignSelf: "flex-end" }}>
        {fav ? (
          <AiTwotoneHeart
            onClick={() => handleFav()}
            style={{
              fontSize: "1.5rem",
              cursor: "pointer",
              color: "red",
              marginBottom: "0.5rem",
            }}
          />
        ) : (
          <AiOutlineHeart
            onClick={() => handleFav()}
            style={{
              fontSize: "1.5rem",
              marginBottom: "0.5rem",
              cursor: "pointer",
            }}
          />
        )}
      </p>

      <article
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "rem",
        }}
      >
        <p style={{ marginBottom: "-0.5rem" }}>
          <span className="book-layout-attr">
            <b>Title :</b>
          </span>
          {title}
        </p>
      </article>
      <p style={{ marginBottom: "-0.5rem" }}>
        <span className="book-layout-attr">
          <b>Author :</b>
        </span>
        {author}
      </p>
      <p style={{ marginBottom: "-0.5rem" }}>
        <span className="book-layout-attr">
          <b>Published On :</b>
        </span>
        {`${publish.getFullYear()}/${publish.getMonth()}/${publish.getDate()}`}
      </p>
      <p style={{ marginBottom: "-0.5rem", flexDirection: "row" }}>
        <span style={{ whiteSpace: "nowrap" }} className="book-layout-attr">
          <b>Rating :</b> <span style={{ color: "gold" }}>{rates}</span>
        </span>
      </p>
      <ToastContainer />
    </article>
  );
};
export default BookLayout;
