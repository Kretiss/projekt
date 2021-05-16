import "../styles/home.css";
import {useRef, useState} from "react";
import axios from "axios";
import { Multiselect } from 'multiselect-react-dropdown';
import {Helmet} from "react-helmet";

const Home = () => {

    const multiselectRef = useRef(null)

    const categories = [
        {name: "Sport", id: 1},
        {name: "Kultura", id: 2},
        {name: "Věda", id: 3},
        {name: "Vzdělávání", id: 4},
        {name: "Historie", id: 5},
    ]

    const [name, setName] = useState('')
    const [content, setContent] = useState('')
    const [submit, setSubmit] = useState(false)

    const message = document.querySelector("#message")

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!submit){
            message.classList.remove(...message.classList)
            setSubmit(true)

            axios.post("http://localhost:80/backend/uploadArticle.php", {
                name: name,
                categories: multiselectRef.current.getSelectedItems(),
                content: content,
            })
                .then((response) => {

                    if (!response.data){
                        message.textContent = "Někde nastala chyba.";
                        message.classList.add("error");
                    }

                    if(response.data === "empty"){
                        message.textContent = "Vyplňte všechna políčka formuláře!";
                        message.classList.add("error");
                    }

                    if(response.data === "exists"){
                        message.textContent = "Článek s tímto názvem již existuje!";
                        message.classList.add("error");
                    }

                    if(response.data === "success"){
                        message.textContent = "Článek byl úspěšně přidán.";
                        message.classList.add("success");
                        document.querySelector("form").reset();
                        multiselectRef.current.resetSelectedValues();
                    }

                    setSubmit(false)

                }, (error) => {
                    message.textContent = "Někde nastala chyba."
                    message.classList.add("error")
                    setSubmit(false)
                    console.log(error)
                })
        }

    }


    return(
    <>

        <Helmet>
            <title>Formulář | Projekt</title>
        </Helmet>

        <div className="container home">

            <div className="formContainer">
                <h1>Formulář</h1>
                <form>
                    <div className="inputGroup" >
                        <label htmlFor='name'>Název článku</label>
                        <input
                            type='text'
                            id="name"
                            name='name'
                            onChange={(e) => {setName(e.target.value)}}
                            required
                        />
                    </div>
                    <div className="inputGroup" >
                        <label htmlFor='category'>Kategorie</label>
                        <Multiselect
                            options={categories}
                            placeholder="Vybrat kategorie"
                            displayValue="name"
                            emptyRecordMsg="Žádné další kategorie"
                            className="categories"
                            id="category"
                            ref={multiselectRef}
                        />
                    </div>
                    <div className="inputGroup" >
                        <label htmlFor='content'>Obsah článku</label>
                        <textarea
                            name='content'
                            id="content"
                            onChange={(e) => {setContent(e.target.value)}}
                            rows={7}
                            required
                        />
                    </div>
                    <p id="message"></p>
                    <button
                        type="submit"
                        onClick={(e) => {handleSubmit(e)}}
                        id="formSubmit"
                    >
                        {submit
                            ?   "Odesílání..."
                            :   "ODESLAT"
                        }

                    </button>
                </form>

            </div>

            <div className="imageContainer"></div>

        </div>

    </>
    )
}

export default Home