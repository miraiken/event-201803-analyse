const symbols = ['○', '◯', '〇', '◎', '△', '×'];
function isSymbol(s: string) {
  return symbols.some(symbol => symbol === s);
}
const normalizeKeyMap = {
  '◯': '○',
  // tslint:disable-next-line:prettier
  '〇': '○',
  // tslint:disable-next-line:prettier
  '楽しかった': '○',
  // tslint:disable-next-line:prettier
  '面白かった': '○'
};
function normalizeKey(k: string): string {
  return k in normalizeKeyMap ? normalizeKeyMap[k] : k;
}
const enjoyKindKeyWords = new RegExp(
  '(' + ['楽しかった', '面白', 'おもしろ', 'ENJOY'].join('|') + ')'
);
function isContainEnjoy(s: string): boolean {
  return enjoyKindKeyWords.test(s);
}
export class Analyse1803Q6 {
  private joined: number;
  private howWasIt: object;
  private comments: string[];
  constructor() {
    this.joined = 0;
    this.howWasIt = {};
    this.comments = [];
  }
  private incHowWasIt(key: string) {
    this.howWasIt[key] = (key in this.howWasIt ? this.howWasIt[key] : 0) + 1;
  }
  private push(howWasIt?: string, comment?: string) {
    ++this.joined;
    if (howWasIt !== undefined) this.incHowWasIt(normalizeKey(howWasIt));
    if (comment !== undefined) this.comments.push(comment);
  }
  parseOne(arg: string | null) {
    if (null == arg || 0 === arg.length) return;
    const a = arg.replace(/^[\s 　]+/g, '');
    if (isSymbol(a[0])) {
      const s = a.replace(/[\s 　]+/g, '');
      //楽しかったかどうかが○などで表されている場合
      //マークが一つは参加していると仮定し、楽しかったかどうかを示すものとして扱う
      const howWasItPos = isSymbol(s[1]) ? 1 : 0;
      if (howWasItPos + 1 < s.length) {
        this.push(s[howWasItPos], s.slice(howWasItPos + 1));
      } else {
        this.push(s[howWasItPos]);
      }
    } else {
      //楽しかったかどうかがマークで表されていないのでスーパー頑張る場合
      //正規表現でsplitを試みる
      const splitted = /[ 　、，,]*([^ 　、，,]+)[ 　、，,]+(.+)/.exec(a);
      if (null == splitted || !/参加/.test(splitted[1])) {
        //つらすぎる。入力者を呪いつつ、楽しかったかどうかだけ判定して後はコメント送り
        if (isContainEnjoy(a)) {
          this.push('○', a);
        } else {
          this.push(undefined, a);
        }
      } else {
        //splitできた場合
        //コメントの有無を確認
        const hasComment = /([^ 　、，,]+)[ 　、，,]+(.+)/.exec(splitted[2]);
        if (null == hasComment) {
          this.push(isContainEnjoy(splitted[2]) ? '○' : splitted[2].split(/[ 　、，,]/)[0]);
        } else {
          this.push(isContainEnjoy(hasComment[1]) ? '○' : hasComment[1], hasComment[2]);
        }
      }
    }
  }
  /**
   * conver to Google SpreadSheet acceptable format
   */
  convert(): string[][] {
    let re: string[][] = [];
    let paramDescriptions: string[] = [];
    let params: string[] = [];
    for (const key in this.howWasIt) {
      paramDescriptions.push(key);
      params.push(this.howWasIt[key].toString());
    }
    paramDescriptions.unshift('参加');
    params.unshift(this.joined.toString());
    const max = Math.max(paramDescriptions.length, params.length, this.comments.length);
    for (let i = 0; i < max; i++) {
      re.push([
        i < paramDescriptions.length ? paramDescriptions[i] : '',
        i < params.length ? params[i] : '',
        i < this.comments.length ? this.comments[i] : ''
      ]);
    }
    return re;
  }
}
