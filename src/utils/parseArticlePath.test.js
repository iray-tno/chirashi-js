import parseArticlePath from './parseArticlePath';

describe('parseArticlePath', () => {
    it('properly parse "/2012-10-22_01_nanoc_ijiri/"', () => {
        expect(parseArticlePath('/2012-10-22_01_nanoc_ijiri/')).toEqual([
            '2012-10-22',
            '01',
            'nanoc_ijiri',
        ]);
    });
});
