import {Component} from "react";
import Header from "./header/header";
import Footer from "./footer/footer";
import NewsList from "./news/news-list";
import {Link} from "react-router-dom";

export default class Home extends Component {
    render() {
        return (
            <>
                <Header/>
                <NewsList/>
                <Link to={`/news-item-form`}>NewsItemForm</Link>
                <Footer/>
            </>
        );
    }
}