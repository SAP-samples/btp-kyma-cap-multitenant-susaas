
service OnboardService @(path : '/catalog/OnboardService', requires: 'authenticated-user', impl: 'srv/obd-service' ){
    @open
    entity Object {};

    function tenant() returns String;
    function status() returns String; 
    function login() returns String; 

    function onboardTenant() returns String;
    function offboardTenant() returns String;
}