export default class TokenModel {
    public get = (): Promise<any>  => {
        let url: string;
        url = '/api/token';

        return fetch(
            url,
            {
                headers: {
                    'content-Type': 'application/json'
                },
                method: 'GET'
            }
        )
        .then(result => result);
    }
}
