import {Direction, RESOURCE_URL} from "../../../Constants";
import {Component} from "react";
import "./component-preview.css"
import {ResizableAndDraggable} from "../helpers/resizable-and-draggable";

export default class ComponentPreview extends Component{
    constructor(props) {
        super(props);

        this.state = {
            item: this.props.item,
            size: this.props.size,
            position: this.props.position,
            direction: null,
        }
    }

    render() {
        const { item } = this.state

        if (item.cssStyle === null) {
            item.cssStyle = {}
        }

        let style = structuredClone(item.cssStyle)
        style["position"] = "inherit"

        if (item.multipartFile) {
            return (
                <ResizableAndDraggable position={this.state.position}
                                       onDrag={this.props.onDrag}
                                       size={this.state.size}
                                       onResize={this.props.onResize}>
                    <img alt={item.text}
                         src={item.multipartFile? item.multipartFile: ""}
                         style={style}/>
                </ResizableAndDraggable>
            )
        } else if (item.text) {
            return (
                <ResizableAndDraggable position={this.state.position}
                                       onDrag={this.props.onDrag}
                                       size={this.state.size}
                                       onResize={this.props.onResize}>
                    <p style={style}>{item.text}</p>
                </ResizableAndDraggable>
            )
        }
    }
}