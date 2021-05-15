import {
    BrowserRouter,
    Route,
    Switch
} from "react-router-dom";

import 'normalize.css';
import "./styles/global.css"

import Home from "./components/home";
import ArticlesContainer from "./components/articlesContainer";
import ScrollToTop from "./components/scrollToTop";
import NotFound from "./components/notFound";
import Header from "./components/header";
import Footer from "./components/footer";


const App = () => {
    return(
        <BrowserRouter>
            <ScrollToTop />
            <Header />
            <main role="main">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/clanky" component={ArticlesContainer} />
                    <Route component={NotFound} />
                </Switch>
            </main>
            <Footer />
        </BrowserRouter>
    )
}

export default App