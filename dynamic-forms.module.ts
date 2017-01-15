import {NgModule, Type, ModuleWithProviders, Provider } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import {DynamicFormsComponent} from './dynamic-forms.component';
import {DynamicElementComponent, TdDynamicElementDirective} from './dynamic-element.component';
import {DynamicFormsService} from './services/dynamic-forms.service';

import {DynamicInputComponent} from './dynamic-elements/dynamic-input/dynamic-input.component';
import {DynamicTextareaComponent} from './dynamic-elements/dynamic-textarea/dynamic-textarea.component';
import {TdDynamicArrayComponent} from './dynamic-elements/array/array.component';
import {DynamicGroupComponent} from './dynamic-elements/group/group.component';
import {BrowserModule} from '@angular/platform-browser';

const TD_DYNAMIC_FORMS : Type < any > [] = [DynamicFormsComponent, DynamicElementComponent, TdDynamicElementDirective];

export const TD_DYNAMIC_FORMS_ENTRY_COMPONENTS : Type < any > [] = [DynamicGroupComponent, TdDynamicArrayComponent, DynamicInputComponent, DynamicTextareaComponent];


const MODULE_CONFIG = {
  declarations: [
    TD_DYNAMIC_FORMS, TD_DYNAMIC_FORMS_ENTRY_COMPONENTS
  ],
  imports: [
    ReactiveFormsModule, BrowserModule, FormsModule
  ],
  exports: [
    TD_DYNAMIC_FORMS, TD_DYNAMIC_FORMS_ENTRY_COMPONENTS
  ],
  entryComponents: [TD_DYNAMIC_FORMS_ENTRY_COMPONENTS]
}


export class NIDynamicFormsModule {
  static forRoot(formsProvider: typeof DynamicFormsService, entryComponents) : ModuleWithProviders {
    const declarations = [TD_DYNAMIC_FORMS, entryComponents];
    const provider: Provider =  { provide: DynamicFormsService, useClass: formsProvider };
    const moduleConfig = Object.assign({}, MODULE_CONFIG, { declarations: entryComponents });
    return {ngModule:  NgModule(MODULE_CONFIG)(NIDynamicFormsModule), providers: [provider]};
  }
  static forRootDefault() : ModuleWithProviders {
      return {
        ngModule : NgModule(MODULE_CONFIG)(NIDynamicFormsModule),
        providers : [DynamicFormsService]
      };
    }
}