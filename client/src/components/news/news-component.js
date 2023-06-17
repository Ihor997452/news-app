import {Component} from "react";
import NewsTextComponent from "./news-text-component";
import NewsImageComponent from "./news-image-component";

export default class NewsComponent extends Component {
    constructor(props) {
        super(props);

        this.item = this.props.item;
    }

    render() {
        if (this.item.text) {
            return <NewsTextComponent text={this.item.text}/>
        }
        if (this.item.imagePath) {
            return <NewsImageComponent imagePath={this.item.imagePath}/>
        }
    }
}
