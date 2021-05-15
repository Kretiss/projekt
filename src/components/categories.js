const Categories = (props) => {

   return(
       <div className="articlesHead">
           <div>Použitých kategorií: {props.count}</div>
           <div>Počet článků v kategoriích:&nbsp;
               {props.categories.map((category, key) => {
                   return <span key={key}>{category.name}: {category.count}</span>
               })}
           </div>
       </div>
   )

}

export default Categories