using { sap, cuid } from '@sap/cds/common';

context susaas.common {
    @cds.persistence.exists
    entity Shared : cuid {
        value  : String;
    }
}

/* 
 *  Here the entities annotated with persistence exists since the DB Artifacts are created 
 *  in db_com folder in common container (com-hdi-container)
*/
@cds.persistence.exists
extend sap.common.Countries {} 

@cds.persistence.exists
extend sap.common.Currencies {} 

@cds.persistence.exists
extend sap.common.Languages {} 