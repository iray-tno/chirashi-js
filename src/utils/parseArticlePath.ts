const pattern = /^\/(\d{4}-\d{1,2}-\d{1,2})_(\d{2})_(.+)\/$/;

export default function parseArticlePath(path: string) {
    const [/* ignore */, date, index, name] = path.match(pattern);
    return [date, index, name];
}
