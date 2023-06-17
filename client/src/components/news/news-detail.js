import {Component} from "react";
import NewsService from "../../service/news-service/news-service";
import NewsComponent from "./news-component";
import {RESOURCE_URL} from "../../Constants";

export default class NewsDetail extends Component {
    constructor(props) {
        super(props);

        this.newsService = new NewsService();

        this.state = {
            newsItem: null
        }
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        this.newsService.service.findById(id).then(response => {
            console.log(response)
            this.setState({newsItem: response})
        });
    }

    render() {
        const { newsItem } = this.state;

        return (
            <>
                {newsItem &&
                    <div>
                        <div>
                            <h1>{newsItem.id}</h1>
                            <p>{newsItem.title}</p>
                            <p>{newsItem.caption}</p>
                            <img src={RESOURCE_URL + newsItem.imagePath}/>
                        </div>


                        {newsItem.components?.map(item => (
                            <NewsComponent item={item}/>
                            ))
                        };
                    </div>
                }
            </>
        )
    }
}