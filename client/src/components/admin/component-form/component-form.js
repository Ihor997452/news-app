import {Component} from "react";
import ComponentService from "../../../service/news-service/component-service";
import ComponentPreview from "../preview/component-preview";
import {MyComponent} from "../../../model/MyComponent";

export default class ComponentForm extends Component {
    constructor(props) {
        super(props);

        this.service = new ComponentService();

        this.state = {
            selected: null,
            image: null,
            size: {w: 0, h:0 },
            position: {x: 0, y: 0},
            component: new MyComponent("", "")
        }

        this.handleImageLoad = this.handleImageLoad.bind(this)
    }

    onChange(e) {
        let { name, value } = e.target;
        let { component } = this.state;

        if (name === "multipartFile") {
            this.setState({image: e.target.files[0]})

            let reader = new FileReader()
            reader.onload = e => this.handleReadFile(e)
            reader.readAsDataURL(e.target.files[0])
        } else {
            component[name] = value;
        }

        this.setState({component: component});
    }

    onDrag(x, y) {
        const { component } = this.state

        let style = structuredClone(component.cssStyle)

        style["left"] = `${x}vw`
        style["top"] = `${y}vh`

        component.cssStyle = style
        this.setState({ component: component })
    }

    onResize(w, h) {
        const { component } = this.state

        let style = structuredClone(component.cssStyle)

        style["width"] = w + "vw";
        style["height"] = h + "vh"

        component.cssStyle = style
        this.setState({ component: component })
    }

    handleSubmit(e) {
        e.preventDefault();
        let { component, image } = this.state;

        const body = {
            "text": component.text,
            "cssStyle": JSON.stringify(component.cssStyle),
            "multipartFile": image
        }

        this.service.service.save(body, { headers: {'content-type': 'multipart/form-data'}})
            .then(r => this.props.onSubmit(r));

        component.multipartFile = null
        component.text = ""
        component.cssStyle = {}

        this.setState({ image: null})
        this.setState({component: component})
        this.setState({size: {x:0 ,y:0}})
        this.setState({position: {x:0 ,y:0}})
    }

    handleSelect(e) {
        const { component } = this.state

        console.log(component)

        component.text = ""
        component.multipartFile = ""

        this.setState({ component: component })
        this.setState({ selected: e.target.value })
    }

    handleTextTypeSelect(e) {
        const value = e.target.value

        const { component } = this.state

        let style = structuredClone(component.cssStyle)

        if (value === "Text") {
            style["font-size"] = "20px"
            style["font-weight"] = "normal"
            style["font-style"] = "normal"
        } else if (value === "Header") {
            style["font-size"] = "40px"
            style["font-weight"] = "bold"
            style["font-style"] = "normal"
        } else if (value === "Sub Header") {
            style["font-size"] = "30px"
            style["font-weight"] = "normal"
            style["font-style"] = "normal"
        } else {
            style["font-size"] = "20px"
            style["font-weight"] = "normal"
            style["font-style"] = "italic"
        }

        component.cssStyle = style

        this.setState({component: component})
    }

    handleImageLoad(e, image) {
        const { size } = this.state

        size.w = 100 / window.innerWidth * image.width
        size.h = 100 / window.innerHeight * image.height

        this.setState({ size: size })
    }

    handleReadFile(e) {
        let { component } = this.state

        let image = new Image()
        image.onload = (e) => this.handleImageLoad(e, image)
        image.src = e.target.result

        component.multipartFile = e.target.result
        this.setState({component: component});
    }

    render() {
        const { position, size, component, selected } = this.state

        const imgInput = (
            <input type="file"
                   name="multipartFile"
                   accept="image/png, image/jpeg"
                   onChange={e => this.onChange(e)} />
        )

        const textInput = (
            <div>
                <select name="type" onChange={e => this.handleTextTypeSelect(e)}>
                    <option disabled selected>Select</option>
                    <option>Header</option>
                    <option>Sub Header</option>
                    <option>Text</option>
                    <option>Italic</option>
                </select>
                <input type="text"
                       name="text"
                       onChange={e => this.onChange(e)}/>
            </div>
        )

        return (
            <>
                {component?
                    <ComponentPreview position={position}
                                      onDrag={(x, y) => this.onDrag(x, y)}
                                      size={size}
                                      onResize={(w, h) => this.onResize(w, h)}
                                      item={component}/>: ""
                }

                <select value={selected} onChange={e => this.handleSelect(e)}>
                    <option disabled selected>Select</option>
                    <option>img</option>
                    <option>text</option>
                </select>

                {selected === "img"?
                    imgInput: ""
                }
                {selected === "text"?
                    textInput: ""
                }

                <button onClick={e => this.handleSubmit(e)}>Submit</button>
            </>
        )
    }
}