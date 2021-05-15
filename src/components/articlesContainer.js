import {useEffect, useState} from "react";
import axios from "axios";
import "../styles/articles.css";
import Categories from "./categories";
import Articles from "./articles";


const ArticlesContainer = () => {

    const [loaded, setLoaded] = useState(false)
    const [articles, setArticles] = useState("")
    const [categories, setCategories] = useState("")
    const [categoriesCount, setCategoriesCount] = useState("")
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("")

    const loadData = () => {
        axios.get("http://localhost:80/backend/getLastArticles.php")
            .then((response) => {
                if (!response.data){
                    setError(true);
                    setMessage("Někde nastala chyba.");
                }

                if(response.data === "empty"){
                    setError(true);
                    setMessage("Nejsou dostupné žádné články.");
                }

                if(response.data.loaded){
                    setArticles(response.data["articles"]);
                    setCategories(response.data["articlesInCategoriesCount"]);
                    setCategoriesCount(response.data["usedCategoriesCount"]);
                }

                setLoaded(true)
            }, (error) => {
                setError(true)
                setMessage("Někde nastala chyba.")
                console.log(error)
            })
    }

    useEffect(() => {
        loadData();
    }, []);


    return(
        <div className="container">
            <h1>Články</h1>
            {
                loaded
                ?   error
                    ?   <p className="error">{message}</p>
                    :   <>
                            <Categories
                                count={categoriesCount}
                                categories={categories}
                            />

                            <Articles
                                articles={articles}
                            />
                        </>

                :   <p>Načítání článků...</p>
            }

        </div>
    )
}

export default ArticlesContainer