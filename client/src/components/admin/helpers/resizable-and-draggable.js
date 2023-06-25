import {Direction} from "../../../Constants";
import {Component} from "react";

export class ResizableAndDraggable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isResizing: false,
            isDragging: false,
            size: this.props.size,
            position: this.props.position,
            direction: null,
        }

        this.mouseMoveHandler = this.mouseMoveHandler.bind(this)
        this.mouseDownHandler = this.mouseDownHandler.bind(this)
        this.mouseUpHandler = this.mouseUpHandler.bind(this)
        this.handleResize = this.handleResize.bind(this)
        this.handleDrag = this.handleDrag.bind(this)
    }

    handleDrag(movementX, movementY) {
        const { position } = this.state

        position.x = position.x + movementX
        position.y = position.y + movementY

        this.props.onDrag(position.x, position.y)
        this.setState({ position: position })
    }

    handleResize(direction, movementX, movementY) {
        let { size } = this.state

        switch (direction) {
            case Direction.Top:
                size.h = size.h - movementY
                break
            case Direction.Bottom:
                size.h = size.h + movementY
                break
            case Direction.Left:
                size.w = size.w + movementX
                break
            case Direction.Right:
                size.w = size.w + movementX
                break
            case Direction.TopLeft:
                size.h = size.h - movementY
                size.w = size.w + movementX
                break
            case Direction.BottomLeft:
                size.h = size.h + movementY
                size.w = size.w + movementX
                break
            case Direction.TopRight:
                size.h = size.h - movementY
                size.w = size.w + movementX
                break
            case Direction.BottomRight:
                size.h = size.h + movementY
                size.w = size.w + movementX
                break

        }

        this.props.onResize(size.w, size.h)
        this.setState({ size: size })
    }

    mouseMoveHandler(e) {
        const { direction, isResizing, isDragging } = this.state

        const movementX = 100 / window.innerWidth * e.movementX
        const movementY = 100 / window.innerHeight * e.movementY

        if (isResizing) {
            this.handleResize(direction, movementX, movementY)
        } else if (isDragging) {
            this.handleDrag(movementX, movementY)
        }
    }

    mouseUpHandler() {
        console.log(33)
        this.setState({ isResizing: false})
        this.setState({ isDragging: false})

        window.removeEventListener("mousemove", this.mouseMoveHandler)
        window.removeEventListener("mouseup", this.mouseUpHandler)
    }

    mouseDownHandler(e, direction) {
        console.log(22)
        this.setState({ direction: direction})

        if (direction) {
            this.setState({ isResizing: true})
        } else {
            this.setState({ isDragging: true})
        }

        window.addEventListener("mousemove", this.mouseMoveHandler)
        window.addEventListener("mouseup", this.mouseUpHandler)
    }

    render() {
        const { position } = this.state

        const css = `transform: translate(${position.x}vw, ${position.y}vh);`

        return (
            <div className="ogo" STYLE={css}>
                <div className="panel-container" STYLE={"user-select: none; position: relative; width: fit-content;"}>
                    <div className={"top-left"} onMouseDown={e => this.mouseDownHandler(e, Direction.TopLeft)}></div>
                    <div className={"top"} onMouseDown={e => this.mouseDownHandler(e, Direction.Top)}></div>
                    <div className={"top-right"} onMouseDown={e => this.mouseDownHandler(e, Direction.TopRight)}></div>
                    <div className={"right"} onMouseDown={e => this.mouseDownHandler(e, Direction.Right)}></div>
                    <div className={"right-bottom"} onMouseDown={e => this.mouseDownHandler(e, Direction.BottomRight)}></div>
                    <div className={"bottom"} onMouseDown={e => this.mouseDownHandler(e, Direction.Bottom)}></div>
                    <div className={"bottom-left"} onMouseDown={e => this.mouseDownHandler(e, Direction.BottomLeft)}></div>
                    <div className={"left"} onMouseDown={e => this.mouseDownHandler(e, Direction.Left)}></div>
                    <div className={"panel-header"}></div>
                    <div className={"panel-content"} onMouseDown={e => this.mouseDownHandler(e, null)}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}