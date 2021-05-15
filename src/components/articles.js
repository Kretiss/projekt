const Articles = (props) => {
    return(
        <div className="articlesContainer">
            {props.articles.map((article, key) => {
                return(
                    <div className="article" key={key}>
                        <h2>{article.name}</h2>
                        <div className="content">{article.content}</div>
                        <div className="articleCategories">
                            {article.categories.map((category, key) => {
                                return <span key={key}>{category.category}</span>
                            })}
                        </div>
                        <small>{article.date}</small>
                    </div>
                )

            })}
        </div>
    )
}

export default Articles