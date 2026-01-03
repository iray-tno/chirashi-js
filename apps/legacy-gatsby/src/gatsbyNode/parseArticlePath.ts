const pattern = /^\/(\d{4}-\d{1,2}-\d{1,2})_(\d{2})_(.+)\/$/;

export default function parseArticlePath(path: string): string[] {
    const results = path.match(pattern);
    if (results == null) return ['', '', ''];

    const [/* ignore */, date, index, name] = results;
    return [date, index, name];
}
