const host = 'https://danbooru.donmai.us';

export default async (ctx) => {
    const { tags } = ctx.req.param();

    const data = await queryPosts(tags);

    ctx.set('data', {
        title: `danbooru - posts - ${tags}`,
        link: `${host}/posts?tags=${tags}`,
        description: `danbooru - posts - ${tags}`,
        item: data.map((item) => ({
            title: `${host}/posts/${item.id}`,
            description: item.tag_string,
            author: item.tag_string_artist,
            link: `${host}/posts/${item.id}`,
            pubDate: item.created_at,
        })),
    });
};

const queryPosts = async (tags: string) => {
    const endpoint = `${host}/posts.json?tags=${tags}`;
    const resp = await fetch(endpoint);
    return await resp.json();
};
