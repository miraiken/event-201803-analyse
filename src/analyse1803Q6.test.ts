import { Analyse1803Q6 } from './analyse1803Q6';
jest.unmock('./analyse1803Q6');

describe('Analyse1803Q6', () => {
  it('empty', () => {
    const analyse = new Analyse1803Q6();
    const expected = [['参加', '0', '']];
    expect(analyse.convert()).toEqual(expected);
  });
  it('○○石が宝石みたいでおもしろかった', () => {
    const analyse = new Analyse1803Q6();
    analyse.parseOne('○○石が宝石みたいでおもしろかった');
    // tslint:disable-next-line:prettier
    const expected = [
      ['参加', '1', '石が宝石みたいでおもしろかった'],
      ['○', '1', '']
    ];
    expect(analyse.convert()).toEqual(expected);
  });
  it('〇 ◎ 石！！', () => {
    const analyse = new Analyse1803Q6();
    analyse.parseOne('〇 ◎ 石！！');
    // tslint:disable-next-line:prettier
    const expected = [
      ['参加', '1', '石！！'],
      ['◎', '1', '']
    ];
    expect(analyse.convert()).toEqual(expected);
  });
  it('○ 他にどんなのがあるのかな', () => {
    const analyse = new Analyse1803Q6();
    analyse.parseOne('○ 他にどんなのがあるのかな');
    // tslint:disable-next-line:prettier
    const expected = [
      ['参加', '1', '他にどんなのがあるのかな'],
      ['○', '1', '']
    ];
    expect(analyse.convert()).toEqual(expected);
  });
  it('◯◯', () => {
    const analyse = new Analyse1803Q6();
    analyse.parseOne('◯◯');
    // tslint:disable-next-line:prettier
    const expected = [
      ['参加', '1', ''],
      ['○', '1', '']
    ];
    expect(analyse.convert()).toEqual(expected);
  });
  it('◯', () => {
    const analyse = new Analyse1803Q6();
    analyse.parseOne('◯');
    // tslint:disable-next-line:prettier
    const expected = [
      ['参加', '1', ''],
      ['○', '1', '']
    ];
    expect(analyse.convert()).toEqual(expected);
  });
  it('参加、楽しかった', () => {
    const analyse = new Analyse1803Q6();
    analyse.parseOne('参加、楽しかった');
    // tslint:disable-next-line:prettier
    const expected = [
      ['参加', '1', ''],
      ['○', '1', '']
    ];
    expect(analyse.convert()).toEqual(expected);
  });
  it('参加、楽しかった、おもしろかった', () => {
    const analyse = new Analyse1803Q6();
    analyse.parseOne('参加、楽しかった、おもしろかった');
    // tslint:disable-next-line:prettier
    const expected = [
      ['参加', '1', 'おもしろかった'],
      ['○', '1', '']
    ];
    expect(analyse.convert()).toEqual(expected);
  });
  it('面白かった', () => {
    const analyse = new Analyse1803Q6();
    analyse.parseOne('面白かった');
    // tslint:disable-next-line:prettier
    const expected = [
      ['参加', '1', '面白かった'],
      ['○', '1', '']
    ];
    expect(analyse.convert()).toEqual(expected);
  });
  it('聞くのがやだ', () => {
    const analyse = new Analyse1803Q6();
    analyse.parseOne('聞くのがやだ');
    const expected = [['参加', '1', '聞くのがやだ']];
    expect(analyse.convert()).toEqual(expected);
  });
  it('参加，楽しかった　たのかった', () => {
    const analyse = new Analyse1803Q6();
    analyse.parseOne('参加，楽しかった　たのかった');
    // tslint:disable-next-line:prettier
    const expected = [
      ['参加', '1', 'たのかった'],
      ['○', '1', '']
    ];
    expect(analyse.convert()).toEqual(expected);
  });
  it('初めてのことだった、もう1回行きたい', () => {
    const analyse = new Analyse1803Q6();
    analyse.parseOne('初めてのことだった、もう1回行きたい');
    // tslint:disable-next-line:prettier
    const expected = [['参加', '1', '初めてのことだった、もう1回行きたい']];
    expect(analyse.convert()).toEqual(expected);
  });
});
