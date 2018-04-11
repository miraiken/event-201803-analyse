import { SheetService } from './sheet.service';
/// <reference types="typescript" />
import * as type from 'object-type-traits';
import { Analyse1803Q6 } from './analyse1803Q6';

declare var global: any;

global.analyse1803Q6 = (arg: any): string[][] => {
  let re = new Analyse1803Q6();
  switch (type.of(arg)) {
    case 'String':
      re.parseOne(arg);
    case 'Array':
      for (const e of arg) {
        switch (type.of(e)) {
          case 'String':
            re.parseOne(e);
            break;
          case 'Array':
            for (const v of e) {
              if (type.isSame('String', v)) {
                re.parseOne(v);
              }
            }
            break;
          default:
            break;
        }
      }
      break;
    default:
      break;
  }
  return re.convert();
};
