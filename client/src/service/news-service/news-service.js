import {Service} from "../service";

let NEWS_URL = "http://localhost:8000/news/";

export default class NewsService {
    constructor() {
        this.service = new Service(NEWS_URL);
    }
}