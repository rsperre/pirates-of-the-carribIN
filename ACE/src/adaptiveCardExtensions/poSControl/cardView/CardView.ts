import {
  BaseBasicCardView,
  IBasicCardParameters,
  IExternalLinkCardAction,
  IQuickViewCardAction,
  ICardButton,
  IActionArguments
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'PoSControlAdaptiveCardExtensionStrings';
import { IPoSControlAdaptiveCardExtensionProps, IPoSControlAdaptiveCardExtensionState } from '../PoSControlAdaptiveCardExtension';

export class CardView extends BaseBasicCardView<IPoSControlAdaptiveCardExtensionProps, IPoSControlAdaptiveCardExtensionState> {
  public get cardButtons(): [ICardButton] | [ICardButton, ICardButton] | undefined {
    return [
      {
        title: "Raise alarm",
        id: 'button1',
        action: {
          type: 'Submit',
          parameters: {
          
          }
        }
      },
      {
        title: "Clear alarm",
        id: 'button2',
        action: {
          type: 'Submit',
          parameters: {}
        }
      }
    ];
  }

  public get data(): IBasicCardParameters {
    return {
      primaryText: "Alert status",
      title: 'POS Control'
    };
  }

  private async setAlertStatus(message: string): Promise<void> {
    await fetch(this.properties.alertURL, {method: 'POST', body: message});
  }

  public onAction(action: IActionArguments): void {
    if (action.type === 'Submit') {
      const { id } = action;
  
      switch (id) {
        case 'button1':
          this.setAlertStatus('ALERT');
          break;
        case 'button2':
          this.setAlertStatus('CLEAR');
          break;
      }
    }
  }
}
