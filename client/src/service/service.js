import axios from "axios";

export class Service {
    constructor(url) {
        this.url = url;
    }

    async find() {
        return (await axios.get(this.url)).data
    }

    async findById(id) {
        return (await axios.get(this.url + id)).data
    }

    async save(body, config={'Content-Type':'application/json; charset=UTF-8'}) {
        return (await axios.post(this.url + "save", body, config)).data;
    }

    async delete(id) {
        await axios.delete(this.url + "delete" + id)
    }
}