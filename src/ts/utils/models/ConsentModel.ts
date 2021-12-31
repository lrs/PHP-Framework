import TokenModel from './TokenModel';

export class ConsentModel {
    public set = (): Promise<any>  => {
        const token = new TokenModel();

        return token.get()
            .then(result => result.text())
            .then(tkn => {
                const url: string = `/api/consent?token=${ tkn }`;

                return fetch(
                    url,
                    {
                        method: 'POST'
                    }
                )
                .then(result => result);
            });
    }
}
