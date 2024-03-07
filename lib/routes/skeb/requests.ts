import got from '@/utils/got';

const host = 'https://skeb.jp';

export default async (ctx) => {
    const { query } = ctx.req.param();

    const data = await queryRequests(query);

    ctx.set('data', {
        title: 'skeb - requests',
        link: `${host}/search?q=${query}`,
        description: `skeb - requests for ${query}`,
        item: data.hits.map((hit) => ({
            title: `${host}${hit.path}`,
            description: hit.body,
            author: /^\/(?<creator>@.+)\/works\/\d+$/.exec(hit.path)?.groups?.creator,
            category: hit.genre,
            link: `${host}${hit.path}`,
        })),
    });
};

const queryRequests = async (query: string) => {
    const endpoint = 'https://hb1jt3kre9-dsn.algolia.net/1/indexes/Request/query';
    const headers = {
        'x-algolia-api-key': '9a4ce7d609e71bf29e977925e4c6740c',
        'x-algolia-application-id': 'HB1JT3KRE9',
    };
    const body = {
        params: `query=${query}&filters=genre%3Aart+OR+genre%3Acomic+OR+genre%3Avoice+OR+genre%3Anovel+OR+genre%3Avideo+OR+genre%3Amusic+OR+genre%3Acorrection&hitsPerPage=40`,
    };
    const resp = await got(endpoint, {
        headers,
        json: body,
        method: 'POST',
    });
    return resp.data;
};
