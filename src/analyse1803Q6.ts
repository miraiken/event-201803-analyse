// import * as Map from 'core-js/es6/map';
// import * as Object from 'core-js/es6/object';

const symbols = ['○', '◯', '◎', '△', '×'];
function isSymbol(s: string) {
  return symbols.some(symbol => symbol === s);
}
// tslint:disable-next-line:prettier
const normalizeKeyMap = new Map<string, string>([
  ['◯', '○'],
  ['楽しかった', '○'],
  ['面白かった', '○']
]);
function normalizeKey(k: string): string {
  return normalizeKeyMap.get(k) || k;
}
const enjoyKindKeyWords = new RegExp(
  '(' + ['楽しかった', '面白', 'おもしろ', 'ENJOY'].join('|') + ')'
);
function isContainEnjoy(s: string): boolean {
  return enjoyKindKeyWords.test(s);
}
export class Analyse1803Q6 {
  private joined: number;
  private howWasIt: Map<string, number>;
  private comments: string[];
  constructor() {
    this.joined = 0;
    this.howWasIt = new Map<string, number>();
    this.comments = [];
  }
  private incHowWasIt(key: string) {
    this.howWasIt.set(key, (this.howWasIt.get(key) || 0) + 1);
  }
  private push(howWasIt?: string, comment?: string) {
    ++this.joined;
    if (howWasIt !== undefined) this.incHowWasIt(howWasIt);
    if (comment !== undefined) this.comments.push(comment);
  }
  parseOne(arg: string | null) {
    if (null == arg || 0 === arg.length) return;
    const a = arg.replace(/^\s+/g, '');
    if (isSymbol(a[0])) {
      //楽しかったかどうかが○などで表されている場合
      //マークが一つは参加していると仮定し、楽しかったかどうかを示すものとして扱う
      const howWasItPos = isSymbol(a[1]) ? 1 : 0;
      if (howWasItPos + 1 < a.length) {
        this.push(a[howWasItPos], a.slice(2));
      } else {
        this.push(a[howWasItPos]);
      }
    } else {
      //楽しかったかどうかがマークで表されていないのでスーパー頑張る場合
      //正規表現でsplitを試みる
      const splitted = /[ 　、]*[^ 　、]+[ 　、]+(.+)/.exec(arg);
      if (null == splitted) {
        //つらすぎる。入力者を呪いつつ、楽しかったかどうかだけ判定して後はコメント送り
        if (isContainEnjoy(arg)) {
          this.push('○');
        } else {
          this.push();
        }
      } else {
        //splitできた場合
        //コメントの有無を確認
        const hasComment = /([^ 　、]+)[ 　、]+(.+)/.exec(splitted[0]);
        if (null == hasComment) {
          this.push(isContainEnjoy(splitted[0]) ? '○' : splitted[0].split(/[ 　、]/)[0]);
        } else {
          this.push(isContainEnjoy(hasComment[0]) ? '○' : hasComment[0], hasComment[1]);
        }
      }
    }
  }
  /**
   * conver to Google SpreadSheet acceptable format
   */
  convert(): string[][] {
    let re: string[][] = [];
    let paramDescriptions = Array.from(this.howWasIt.keys());
    paramDescriptions.unshift('参加');
    re.push(Object.assign([], paramDescriptions));
    let params = Array.from(this.howWasIt.values());
    params.unshift(this.joined);
    re.push(Object.assign([], params.map(n => n.toString())));
    re.push(Object.assign([], this.comments));
    return re;
  }
}
