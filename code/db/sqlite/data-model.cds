
using {cuid} from '@sap/cds/common';
using {Country,Currency,Language} from '@sap/cds-common-content';

context susaas.common {
    entity Shared : cuid {
        value : String;
    };
}