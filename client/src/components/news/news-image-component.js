import {Component} from "react";
import {RESOURCE_URL} from "../../Constants";

export default class NewsImageComponent extends Component {
    constructor(props) {
        super(props);

        this.imagePath = this.props.imagePath;
    }


    render() {
        return (
            <img src={RESOURCE_URL + this.imagePath}/>
        )
    }
}
