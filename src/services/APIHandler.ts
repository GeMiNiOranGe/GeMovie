export default class APIHandler {
    /**
     * Fetch content from api.
     * @param url API endpoint
     */
    public static async fetchJSON(url: string): Promise<any> {
        const response: Response = await fetch(url);
        return await response.json();
    }
}
