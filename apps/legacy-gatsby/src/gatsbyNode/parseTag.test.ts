import parseTag from './parseTag';

describe('parseTag', () => {
    it('properly parse "hoge"', () => {
        expect(parseTag('hoge')).toEqual({
            tagName: 'hoge',
            tagId: 'hoge',
        });
    });

    it('properly parse "日本語名(asciiId)"', () => {
        expect(parseTag('日本語名(asciiId)')).toEqual({
            tagName: '日本語名',
            tagId: 'asciiId',
        });
    });
});
