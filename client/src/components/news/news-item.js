import {Component} from "react";
import {Link} from "react-router-dom";
import {RESOURCE_URL} from "../../Constants";

export default class NewsItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let newsItem = this.props.newsItem
        let { caption, imagePath, title, id } = newsItem;

        return (
            <>
                <div>
                    <h3>{title}</h3>
                    <p>{caption}</p>
                    <img STYLE={"width: 200px"} src={RESOURCE_URL + imagePath}/>
                    <Link to={`/news/${id}`}>details..</Link>
                    <br/>
                </div>
            </>
        );
    }
}