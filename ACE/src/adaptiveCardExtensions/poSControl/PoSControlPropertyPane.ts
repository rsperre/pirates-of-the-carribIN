import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import * as strings from 'PoSControlAdaptiveCardExtensionStrings';

export class PoSControlPropertyPane {
  public getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: strings.PropertyPaneDescription },
          groups: [
            {
              groupFields: [
                PropertyPaneTextField('alertURL', {
                  label: "Set alert url"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
