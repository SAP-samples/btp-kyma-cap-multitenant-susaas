using { susaas.db, PublicService, sap } from 'susaas';
namespace x_susaas.extension;

@cds.autoexpose
entity x_Priority {
  key ID      : UUID @Common.Text : name  @Common.TextArrangement : #TextOnly;
  name        : String;
}

@cds.autoexpose
entity x_Status {
  key ID      : UUID @Common.Text : name  @Common.TextArrangement : #TextOnly;
  name        : String;
}


extend db.Assessments with  {
  x_status      : Association to one x_Status @title: '{i18n>status}' @Common.Text : x_status.name  @Common.TextArrangement : #TextOnly;
  x_priority    : Association to one x_Priority @title: '{i18n>priority}' @Common.Text : x_priority.name  @Common.TextArrangement : #TextOnly;
  x_contact     : Association to one db.Users  @title: '{i18n>contact}' @Common.Text : x_contact.fullName  @Common.TextArrangement : #TextOnly;
  x_validFrom   : Date @title: '{i18n>validFrom}';
  x_validTo     : Date @title: '{i18n>validTo}';
  x_notes       : String @title: '{i18n>notes}';
}
