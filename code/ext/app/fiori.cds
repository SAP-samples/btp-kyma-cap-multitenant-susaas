using { PublicService } from './extension';

annotate PublicService.Assessments:x_contact with @(
    Common : {
      ValueList: {
        CollectionPath: 'Users',
        Parameters:[
          { 
            $Type               : 'Common.ValueListParameterInOut', 
            LocalDataProperty   : x_contact_ID, 
            ValueListProperty   : 'ID' 
          },
          {
            $Type               : 'Common.ValueListParameterDisplayOnly',
            ValueListProperty   : 'firstName'
          },
          {
            $Type               : 'Common.ValueListParameterDisplayOnly',
            ValueListProperty   : 'lastName'
          }
        ]
      }
    }
);



annotate PublicService.Assessments:x_status with @(
    Common : {
      ValueListWithFixedValues : true,
      ValueList: {
        CollectionPath: 'x_Status',
        Parameters:[
          { 
            $Type               : 'Common.ValueListParameterInOut', 
            LocalDataProperty   : x_status_ID, 
            ValueListProperty   : 'ID' 
          },
          {
            $Type               : 'Common.ValueListParameterDisplayOnly',
            ValueListProperty   : 'name'
          }
        ]
      }
    }
);



annotate PublicService.Assessments:x_priority with @(
    Common : {
      ValueListWithFixedValues : true,
      ValueList: {
        CollectionPath: 'x_Priority',
        Parameters:[
          { 
            $Type               : 'Common.ValueListParameterInOut', 
            LocalDataProperty   : x_priority_ID, 
            ValueListProperty   : 'ID' 
          },
          {
            $Type               : 'Common.ValueListParameterDisplayOnly',
            ValueListProperty   : 'name'
          }
        ]
      }
    }
);


annotate PublicService.Assessments with @(
    UI.LineItem: [
        ... up to { Value: description },
        { 
          Value : x_contact_ID,
          ![$Type] : 'UI.DataField',
          Label : '{i18n>contact}', 
          ![@UI.Importance] : #High
        },
        ...
    ],
    UI.FieldGroup #x_DetailInformation : {
        Data : [
            { Value : x_contact_ID },
            { Value : x_notes },
            { Value : x_priority_ID },
            { Value : x_status_ID },
            { Value : x_validFrom },
            { Value : x_validTo },
        ]
    },
);

annotate PublicService.Assessments with @(
    UI.Facets : [ 
        ... up to {
            $Type : 'UI.CollectionFacet',
            ID     : 'collectionFacetSectionGeneral',
        },
        {
            $Type  : 'UI.CollectionFacet',
            ID     : 'collectionFacetSectionDetailed', 
            Label  : '{i18n>detailedInformation}',
            Facets : [{
                $Type  : 'UI.ReferenceFacet',
                Label  : '{i18n>detailedInformation}',
                Target : '@UI.FieldGroup#x_DetailInformation'
            }]
        },
        ...
    ]
);
