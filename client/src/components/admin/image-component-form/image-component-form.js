import {Component} from "react";
import ImageComponentService from "../../../service/news-service/image-component-service";

export default class ImageComponentForm extends Component {
    constructor(props) {
        super(props);

        this.imageComponentService = new ImageComponentService();

        this.state = {
            image: null
        }
    }

    onChange(e) {
        this.setState({image:e.target.files[0]})
    }

    handleSubmit(e) {
        e.preventDefault();
        const { image } = this.state;
        const formData = new FormData();
        formData.append("multipartFile", image);
        this.imageComponentService.service.save(formData, { headers: {'content-type': 'multipart/form-data'}})
            .then(r => this.props.onSubmit(r));
    }

    render() {
        return (
            <>
                <input type="file"
                       name="multipartFile"
                       accept="image/png, image/jpeg"
                       onChange={e => this.onChange(e)} />
                <button onClick={e => this.handleSubmit(e)}>Submit</button>
            </>
        )
    }
}