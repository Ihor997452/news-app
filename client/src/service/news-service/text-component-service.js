import {Service} from "../service";

let TEXT_URL = "http://localhost:8000/text-components/";

export default class TextComponentService {
    constructor() {
        this.service = new Service(TEXT_URL);
    }
}