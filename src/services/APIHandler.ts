export default class APIHandler {
    public static async fetchJSON(url: string): Promise<any> {
        const response: Response = await fetch(url);
        return response.json();
    }
}
