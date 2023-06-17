import {Component} from "react";
import ImageComponentForm from "../image-component-form/image-component-form";
import NewsService from "../../../service/news-service/news-service";
import NewsItem from "../../news/news-item";
import TextComponentForm from "../text-component-form/text-component-form";
import {RESOURCE_URL} from "../../../Constants";

export default class NewsItemForm extends Component {
    constructor(props) {
        super(props);

        this.newsService = new NewsService();

        this.state = {
            image: null,
            newsItem: new NewsItem(),
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

    omitKeys(obj, keys) {
        let dup = {};
        for (let key in obj) {
            if (keys.indexOf(key) === -1) {
                dup[key] = obj[key];
            }
        }
        return dup;
    }

    handleSubmit(e) {
        e.preventDefault();
        const { newsItem, image, components } = this.state;

        for (let i = 0; i < components.length; i++) {
            components[i] = this.omitKeys(components[i], ["text", "imagePath"]);
        }

        newsItem["components"] = components;
        const json = JSON.stringify(this.omitKeys(newsItem, ["props", "refs", "updater", "isReactComponent"]));

        console.log(json)

        const body = {
            "json": json,
            "multipartFile": image
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
    }

    render() {
        const { newsItem, image, components } = this.state;
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
                    if (component.text) {
                        return <h1>{component.text}</h1>
                    }

                    if (component.imagePath) {
                        return <img src={RESOURCE_URL + component.imagePath}/>
                    }
                })}

                <ImageComponentForm onSubmit={(component) => this.handleComponentSubmit(component)}/>
                <TextComponentForm onSubmit={(component) => this.handleComponentSubmit(component)}/>

                <br/>
                <br/>
                <button onClick={e => this.handleSubmit(e)}>Save</button>
            </>
        )
    }
}