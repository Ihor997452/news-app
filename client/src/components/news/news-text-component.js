import {Component} from "react";

export default class NewsTextComponent extends Component {
    constructor(props) {
        super(props);

        this.text = this.props.text;
    }


    render() {
        return (
            <p>{this.text}</p>
        )
    }
}