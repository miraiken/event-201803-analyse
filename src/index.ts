import { SheetService } from './sheet.service';
/// <reference types="typescript" />
import * as type from 'object-type-traits';

declare var global: any;

global.test_sheet_function = (): string => 'arikitari_na_sekai';

global.test_sheet_function2 = (arg: any): number => {
  function impl(n: number): number;
  function impl(n?: any) {
    if (type.of('Number') === n) {
      return n + 1;
    } else {
      return 0;
    }
  }
  return impl(arg);
};
