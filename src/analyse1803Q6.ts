const symbols = ['○', '◯', '◎', '△', '×'];
function isSymbol(s: string) {
  return symbols.some(symbol => symbol === s);
}
const normalizeKeyMap = {
  '◯': '○',
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
    let paramDescriptions: string[] = [];
    let params: string[] = [];
    for (const key in this.howWasIt) {
      paramDescriptions.push(key);
      params.push(this.howWasIt[key].toString());
    }
    paramDescriptions.unshift('参加');
    re.push(paramDescriptions);
    params.unshift(this.joined.toString());
    re.push(params);
    re.push(this.comments);
    return re;
  }
}
