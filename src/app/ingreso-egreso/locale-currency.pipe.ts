import { Pipe, PipeTransform, Inject, LOCALE_ID } from '@angular/core';
import { formatCurrency, getLocaleCurrencySymbol } from '@angular/common';
// Custom Pipe del currency pipe de angular para que aplique el formato de cada locale
@Pipe({
    name: 'localeCurrency'
})

export class LocaleCurrencyPipe implements PipeTransform {

    constructor(
        @Inject(LOCALE_ID) private _localeId: string
    ) { }

    transform(value: number, currencyCode?: string, digitInfo?: string): any {
        return formatCurrency(value, this._localeId, getLocaleCurrencySymbol(this._localeId), currencyCode, digitInfo);
    }
}
