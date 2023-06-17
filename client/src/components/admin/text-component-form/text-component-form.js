import {Component} from "react";
import ImageComponentService from "../../../service/news-service/image-component-service";
import axios from "axios";
import TextComponentService from "../../../service/news-service/text-component-service";

export default class TextComponentForm extends Component {
    constructor(props) {
        super(props);

        this.textComponentService = new TextComponentService();

        this.state = {
            text: null
        }
    }

    onChange(e) {
        let { value } = e.target;
        this.setState({text: value})
    }

    handleSubmit(e) {
        e.preventDefault();
        const { text } = this.state;
        const formData = new FormData();
        formData.append("text", text);
        this.textComponentService.service.save(formData, {haeders: {'content-type': 'text/plain'}})
            .then(r => this.props.onSubmit(r));
    }

    render() {
        return (
            <>
                <input type="text"
                       name="text"
                       onChange={e => this.onChange(e)} />
                <button onClick={e => this.handleSubmit(e)}>Submit</button>
            </>
        )
    }
}