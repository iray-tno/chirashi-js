export type Tag = {
    tagName: string,
    tagId: string,
};

export default function parseTag(tag: string) : Tag {
    const startIndex = tag.indexOf('(');
    const endIndex = tag.indexOf(')');
    if (startIndex < 0 && endIndex < 0) {
        return {
            tagName: tag,
            tagId: tag,
        };
    }

    return {
        tagName: tag.substring(0, startIndex),
        tagId: tag.substring(startIndex + 1, endIndex),
    };
}
