import './Heading.css';

const Heading = ({ filter }) => {
 
    return (
        <section className="filter-heading">
            {
                filter === "all" ? (<h1 style={{ color: "white" }}>ALL BOOKS</h1>) :
                    filter === "title" ? <h1>Filtered By Title</h1>
                        : filter === "author" ? <h1>Filtered by Author</h1>
                            : filter === "date" ? <h1>Filtered By date</h1>
                                : <h1>Filtered By Favourites</h1>
            }
        </section>
    )
}
export default Heading