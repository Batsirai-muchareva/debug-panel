import { getSettings } from "@app/sync/get-settings";

export const http = () => {
    const { nonce, baseUrl } = getSettings();

    return {
        post: async ( params: URLSearchParams ) => {
            params.append( 'nonce', nonce );

            const response = await fetch( baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params
            });

            if ( ! response.ok ) {
                throw {
                    code: "HTTP_ERROR",
                    message: await response.text() ?? `HTTP error! status: ${response.status}`,
                    status: response.status,
                };
            }

            return {
                data: await response.json()
            };
        }
    };
};
