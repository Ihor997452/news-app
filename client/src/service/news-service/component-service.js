import {Service} from "../service";

let IMAGE_URL = "http://localhost:8000/components/";

export default class ComponentService {
    constructor() {
        this.service = new Service(IMAGE_URL);
    }
}