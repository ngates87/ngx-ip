import {
  forwardRef,
  Component,
  ViewChildren,
  QueryList,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { NgxIpBase } from 'ngx-ip';
import { MatInput } from '@angular/material';

export const ADDRESS_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CustomNgxIpComponent),
  multi: true
};

export const ADDRESS_CONTROL_VALIDATORS: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => CustomNgxIpComponent),
  multi: true
};

/*
 In the 'selector' we could have called it 'ngx-ip'
 but in the demo we already import the module, in app that does not import
 NgxIpModule you can do so
*/
@Component({
  selector: 'custom-ngx-ip',
  templateUrl: './custom-ngx-ip.component.html',
  styleUrls: ['./custom-ngx-ip.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ ADDRESS_CONTROL_VALUE_ACCESSOR, ADDRESS_CONTROL_VALIDATORS ]
})
export class CustomNgxIpComponent extends NgxIpBase {

  @ViewChildren('input') public matInputs: QueryList<MatInput>;

  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }

  onChangeLocal(value: string, idx: number, input: MatInput): void {
    super.onChange(value, idx);
    const hasError = this.invalidBlocks[idx];
    if (hasError !== input.errorState) {
      input.errorState = hasError;
      input.stateChanges.next();
    }
  }

  protected focusNext(idx: number, selectRange: boolean = true): void {
    // the parent focusNext deals with DOM element (ElementRef) focus() method
    // we add calling the MatInput instance focus() method.
    const next = this.matInputs.toArray()[idx + 1];
    if (next) {
      next.focus();
    }
    super.focusNext(idx, selectRange);
  }
}
