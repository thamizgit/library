
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import RecentBookLayout from "../../layouts/RecentBookLayout";
import './Recent.css';
const Recents = ({setBookClick,recentBooks}) => {
   
    const { auth} = useContext(AuthContext);
    
    return (
        <section className="recent-layout">
            {recentBooks.length && auth.username && <>
                <h1>Recently Viewed</h1>
                <article className="recent-section">
                    {recentBooks.map((recent) => (
                        <article key={recent._id}>
                            <RecentBookLayout id={recent._id}
                                img={recent.img}
                                title={recent.title}
                                author={recent.author}
                                date={recent.date}
                                rating={recent.rating}
                                setBookClick={setBookClick}
                                
                            />
                        </article>
                    ))}
                </article>
            </>}
      </section>
    );
}
export default Recents