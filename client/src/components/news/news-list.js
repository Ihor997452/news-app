import {Component} from "react";
import NewsService from "../../service/news-service/news-service";
import NewsItem from "./news-item";

export default class NewsList extends Component {
    constructor(props) {
        super(props);

        this.newsService = new NewsService();

        this.state = {
            news: null
        };
    }

    componentDidMount() {
        this.newsService.service.find().then(response => {
                this.setState({news: response})
            }
        );
    }

    render() {
        const { news } = this.state

        return (
            <>
                {news?.map((item) => (
                    <NewsItem newsItem={item}/>))
                }
            </>
        )
    }
}