import {Component} from "react";
import {RESOURCE_URL} from "../../Constants";

export default class NewsComponent extends Component {
    constructor(props) {
        super(props);

        this.item = this.props.item;
    }

    render() {
        let style = {}
        if (this.item.cssStyle === null) {
             style = {}
        } else {
            style = JSON.parse(this.item.cssStyle)
        }
        style["position"] = "relative"

        if (this.item.resourcePath) {
            return (
                <>
                    <img alt={this.item.text}
                         src={RESOURCE_URL + this.item.resourcePath}
                         style={style}/>
                    <br/>
                </>
            )
        } else if (this.item.text) {
            return (
                <>
                    <p style={style}>{this.item.text}</p>
                </>
            )
        }
    }
}
