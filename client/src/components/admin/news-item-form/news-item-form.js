import {Component} from "react";
import NewsService from "../../../service/news-service/news-service";
import NewsItem from "../../news/news-item";
import ComponentForm from "../component-form/component-form";
import NewsComponent from "../../news/news-component";
import ComponentPreview from "../preview/component-preview";

export default class NewsItemForm extends Component {
    constructor(props) {
        super(props);

        this.newsService = new NewsService();

        this.state = {
            image: null,
            newsItem: new NewsItem(this.props.match.params.id),
            counter: 0,
            components: []
        }
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        this.newsService.service.findById(id).then(response => {
            this.setState({newsItem: response})
            this.setState({components: response.components});
        }).catch(err => {
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { newsItem, image, components } = this.state;

        const body = {
            "title": newsItem.title,
            "caption": newsItem.caption,
            "componentsJson": JSON.stringify(components ),
            "multipartFile": image
        }

        if (newsItem.id) {
            body["id"] = newsItem.id
        }

        this.newsService.service.save(body, { headers: {'content-type': 'multipart/form-data'}});
    }

    handleComponentSubmit(component) {
        const { components } = this.state;
        components.push(component)
        this.setState({components: components})
    }

    handleChange(e) {
        let { name, value } = e.target;

        if (name === "multipartFile") {
            this.setState({image:e.target.files[0]})
        } else {
            let newsItem = this.state.newsItem;
            newsItem[name] = value;
            this.setState({newsItem: newsItem});
        }

        this.setState({ counter: this.state.counter + 1 })
    }

    render() {
        const { newsItem, components } = this.state;
        const { title, caption } = newsItem;

        return (
            <>
                <input type="text" name={"title"} value={title} onChange={e => this.handleChange(e)}/>
                <br/>
                <input type="text" name={"caption"} value={caption} onChange={e => this.handleChange(e)}/>
                <br/>
                <input type="file"
                       name="multipartFile"
                       accept="image/png, image/jpeg"
                       onChange={e => this.handleChange(e)} />
                <br/>

                {components.map(component => {
                    return <NewsComponent item={component}/>
                })}
                <br/>
                <ComponentForm onSubmit={(component) => this.handleComponentSubmit(component)}/>
                <br/>
                <button onClick={e => this.handleSubmit(e)}>Save</button>
            </>
        )
    }
}