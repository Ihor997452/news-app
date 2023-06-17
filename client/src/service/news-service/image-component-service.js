import {Service} from "../service";

let IMAGE_URL = "http://localhost:8000/image-components/";

export default class ImageComponentService {
    constructor() {
        this.service = new Service(IMAGE_URL);
    }
}