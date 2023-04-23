import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';
import { WebApiService } from './web-api.service';
import { environment } from '../../environments/environment';
import { MixinCancelOrder } from '../mix-income-management/models/MixinCancelOrder';
var apiUrl = environment.apiUrl;
localStorage.setItem('apiUrl', apiUrl);

var httpLink = {

//Begin Vote Management APIs

//programme
getAllProgramme: apiUrl + "/api/vote/programmes/getAllProgrammesForSabhaId", 
deleteProgrammeById: apiUrl + "/api/vote/programmes/deleteProgramme",
getProgrammeDetailById: apiUrl + "/api/vote/programmes/getProgrammeById",
saveProgramme: apiUrl + "/api/vote/programmes/saveProgramme",
updateProgramme: apiUrl + "/api/vote/programmes/updateProgramme",

//project
getAllProject: apiUrl + "/api/vote/projects/getAllProjectsForSabhaId",
deleteProjectById: apiUrl + "/api/vote/projects/deleteProject",
getProjectDetailById: apiUrl + "/api/vote/projects/getProjectById",
saveProject: apiUrl + "/api/vote/projects/saveProject",
updateProject: apiUrl + "/api/vote/projects/updateProject",
getAllProjectsForProgramme: apiUrl + "/api/vote/projects/GetAllProjectsForProgrammeId",  //OK

//subproject
getAllsubproject: apiUrl + "/api/vote/subProject/getAllSubProjectsForSabhaId", 
deletesubprojectById: apiUrl + "/api/vote/subProject/deletesubproject",
getsubprojectDetailById: apiUrl + "/api/vote/subProject/getsubprojectById",
savesubproject: apiUrl + "/api/vote/subProject/savesubproject",
updatesubproject: apiUrl + "/api/vote/subProject/updatesubproject",
getAllsubprojectforprojectID: apiUrl + "/api/vote/subProject/getAllSubProjectsForProjectId", 
getAllsubprojectforProgrammeID: apiUrl + "/api/vote/subProject/getAllSubProjectsForProgrammeId", 

//incometitle 
getAllIncometitle: apiUrl + "/api/vote/incomeTitle/getAllIncomeTitlesForSabhaId",//OK
getAllIncometitleByProgrammeId: apiUrl + "/api/vote/incomeTitle/getAllWithIncomeTitleByProgrammeId",   //OK
deleteIncometitleById: apiUrl + "/api/vote/incometitle/deleteIncometitle",
getIncometitleDetailById: apiUrl + "/api/vote/incomeTitle/getIncomeTitleById",
saveIncometitle: apiUrl + "/api/vote/incomeTitle/saveIncomeTitle",
updateIncometitle: apiUrl + "/api/vote/incometitle/updateIncomeTitle"

//accountbalancedetail
,getAllAccountBalanceDetail: apiUrl + "/api/vote/accountBalance/getAllAccountBalanceDetailsForSabhaId",
deleteAccountBalanceDetailById: apiUrl + "/api/vote/accountBalance/deleteAccountBalanceDetail",
getAccountBalanceDetailDetailById: apiUrl + "/api/vote/accountBalance/getAccountBalanceDetailById",
saveAccountBalanceDetail: apiUrl + "/api/vote/accountBalance/saveAccountBalanceDetail",
updateAccountBalanceDetail: apiUrl + "/api/vote/accountBalance/updateAccountBalanceDetail",
getAllAccountbalancedetailsByAccountIdandSabhaId: apiUrl + "/api/vote/accountBalance/getAllAccountBalanceDetailsForAccountDetailIdandSabhaId"

//balancesheetbalance
,getAllBalancesheetBalance: apiUrl + "/api/vote/balancesheetbalances/getAllBalancesheetBalancesForSabhaId",
deleteBalancesheetBalanceById: apiUrl + "/api/vote/balancesheetbalances/deleteBalancesheetBalance",
getBalancesheetBalanceDetailById: apiUrl + "/api/vote/balancesheetbalances/getBalancesheetBalanceById",
GetAllBalancesheetBalancesForVoteDetailIdandYear: apiUrl + "/api/vote/balancesheetbalances/GetAllBalancesheetBalancesForVoteDetailIdandYear",
saveBalancesheetBalance: apiUrl + "/api/vote/balancesheetbalances/saveBalancesheetBalance",
updateBalancesheetBalance: apiUrl + "/api/vote/balancesheetbalances/updateBalancesheetBalance"

//accountdetail
,getAllAccountDetail: apiUrl + "/api/vote/AccountDetails/getAllAccountDetailsForOfficeId",
deleteAccountDetailById: apiUrl + "/api/vote/accountdetails/deleteAccountDetail",
getAccountDetailDetailById: apiUrl + "/api/vote/accountdetails/getAccountDetailById",
saveAccountDetail: apiUrl + "/api/vote/accountdetails/saveAccountDetail",
updateAccountDetail: apiUrl + "/api/vote/accountdetails/updateAccountDetail"

//balancesheetsubtitle
,getAllBalancesheetSubtitle: apiUrl + "/api/vote/balancesheetSubtitles/getAllBalancesheetSubtitlesForSabhaId",
deleteBalancesheetSubtitleById: apiUrl + "/api/vote/balancesheetSubtitles/deleteBalancesheetSubtitle",
getBalancesheetSubtitleDetailById: apiUrl + "/api/vote/balancesheetsubtitles/getBalancesheetSubtitleById",
saveBalancesheetSubtitle: apiUrl + "/api/vote/balancesheetSubtitles/saveBalancesheetSubtitle",
updateBalancesheetSubtitle: apiUrl + "/api/vote/balancesheetSubtitles/updateBalancesheetSubtitle",
getAllBalancesheetSubtitleByTitleID: apiUrl + "/api/vote/balancesheetSubtitles/getAllBalancesheetSubtitlesForTitleID",
getAllBalancesheetSubtitlesForTitleIDAndAccountDetailID: apiUrl + "/api/vote/balancesheetSubtitles/getAllBalancesheetSubtitlesForTitleIDAndAccountDetailID"

//balancesheettitle
,getAllBalancesheetTitle: apiUrl + "/api/vote/balancesheettitles/getAllBalancesheetTitlesForSabhaId",
deleteBalancesheetTitleById: apiUrl + "/api/vote/balancesheettitles/deleteBalancesheetTitle",
getBalancesheetTitleDetailById: apiUrl + "/api/vote/balancesheettitles/getBalancesheetTitleById",
saveBalancesheetTitle: apiUrl + "/api/vote/balancesheettitles/saveBalancesheetTitle",
updateBalancesheetTitle: apiUrl + "/api/vote/balancesheettitles/updateBalancesheetTitle",
getAllBalancesheetTitleForAccountDetailsId: apiUrl + "/api/vote/balancesheettitles/getAllBalancesheetTitlesForAccountDetailId",

//incomesubtitle
getAllIncomeSubtitle: apiUrl + "/api/vote/incomeSubtitle/getAllIncomeSubTitlesForSabhaId",  //OK
deleteIncomeSubtitleById: apiUrl + "/api/vote/incomeSubtitle/deleteIncomeSubtitle",
getIncomeSubtitleDetailById: apiUrl + "/api/vote/incomeSubtitle/getIncomeSubtitleById",     
saveIncomeSubtitle: apiUrl + "/api/vote/incomeSubtitle/saveIncomeSubtitle",    
updateIncomeSubtitle: apiUrl + "/api/vote/incomeSubtitle/updateIncomeSubtitle",
getAllIncomeSubtitlebyTitleID: apiUrl + "/api/vote/incomeSubtitle/getAllIncomeSubTitlesForTitleId",  //OK
getAllIncomeSubtitlebyProgrammeID: apiUrl + "/api/vote/incomeSubtitle/getAllIncomeSubTitlesForProgrammeId",  //OK

//voteallocation
getAllVoteAllocation: apiUrl + "/api/vote/voteAllocations/getAllWithVoteAllocationBySabhaId",
deleteVoteAllocationById: apiUrl + "/api/vote/voteallocations/deleteVoteAllocation",
getVoteAllocationDetailById: apiUrl + "/api/vote/voteallocations/getVoteAllocationById",
saveVoteAllocation: apiUrl + "/api/vote/voteallocations/saveVoteAllocation",
updateVoteAllocation: apiUrl + "/api/vote/voteallocations/updateVoteAllocation",
getAllVoteAllocationbyVoteDetailIdandSabhaId: apiUrl + "/api/vote/voteAllocations/getAllVoteAllocationsForVoteDetailIdandSabhaId",
getAllVoteAllocationsForVoteDetailIdandSabhaIdandYear: apiUrl + "/api/vote/voteAllocations/getAllVoteAllocationsForVoteDetailIdandSabhaIdandYear",

//votedetails
getAllVoteDetails: apiUrl + "/api/vote/voteDetail/getAllVoteDetailBySabhaId",
deleteVoteDetailsById: apiUrl + "/api/vote/voteDetail/deleteVoteDetail",
getVoteDetailsDetailById: apiUrl + "/api/vote/voteDetail/getVoteDetailsById",
saveVoteDetails: apiUrl + "/api/vote/voteDetail/saveVoteDetail",
updateVoteDetails: apiUrl + "/api/vote/voteDetail/updateVoteDetail",  //ok
getAllVoteDetailsForProgrammeId: apiUrl + "/api/vote/voteDetail/getAllVoteDetailForProgrammeId"

//End of Vote Management APIs


//Begin of Common APIs

//banks
,getAllBankDetails: apiUrl + "/api/BankDetails",

//years
getAllYears: apiUrl + "/api/Years",

//years
getAllMonths: apiUrl + "/api/Months",

//Genders
getAllGenders: apiUrl + "/api/Genders",

//Offices
getAllOfficesForSabhaId: apiUrl + "/api/Offices/getAllOfficesForSabhaId",
getOfficeById: apiUrl + "/api/Offices/getById",

//PaymentNbts
getAllPaymentVats: apiUrl + "​/api​/PaymentVats​/getAll",
getPaymentVatsById: apiUrl + "/api/PaymentVats/getById",

//PaymentNbts
getAllPaymentNbts: apiUrl + "​/api​/PaymentNbts​/getAll",
getPaymentNbtsById: apiUrl + "/api/PaymentNbts/getById",

//GnDivisions
getAllGnDivisions: apiUrl + "/api/GnDivisions/getAll",
getGnDivisions: apiUrl + "/api/GnDivisions/getById",
getAllGnDivisionsForOffice: apiUrl + "/api/GnDivisions/getAllForOffice",
getAllGnDivisionsForSabha: apiUrl + "/api/GnDivisions/getAllForSabha",

//Partner 
getAllPartners: apiUrl + "/api/mixin/partners/getAll",
getAllPartnersForSabha: apiUrl + "/api/mixin/partners/getAllForSabha",
getPartnerById: apiUrl + "/api/mixin/partners/getById",
getPartnerByNIC: apiUrl + "/api/mixin/partners/getByNIC",
getPartnerByPhoneNo: apiUrl + "/api/mixin/partners/getByPhoneNo",
getAllPartnersForPartnerType : apiUrl + "/api/mixin/partners/getAllForPartnerType",
getAllForPartnerTypeAndSabha : apiUrl + "/api/mixin/partners/getAllForPartnerTypeAndSabha",
savePartner:apiUrl+"/api/mixin/partners/save",


//Session 
getSessionById: apiUrl + "/api/mixin/sessions/getById",
getSessionByOfficeAndModule: apiUrl + "/api/mixin/sessions/getByOfficeAndModule",
getSessionByOfficeModuleAndDate: apiUrl + "/api/mixin/sessions/getByOfficeModuleAndDate",
getAllActiveSessionsByOffice: apiUrl + "/api/mixin/sessions/getAllActiveSessionsByOffice",
getAllSessionsByOffice: apiUrl + "/api/mixin/sessions/getAllSessionsByOffice",
getAllSessionsByOfficeAndModule: apiUrl + "/api/mixin/sessions/getAllSessionsByOfficeAndModule",
startSession: apiUrl + "/api/mixin/sessions/startSession",
endSession: apiUrl + "/api/mixin/sessions/endSession",
startCustomSession: apiUrl + "/api/mixin/sessions/startCustomSession",
allowReceiptsForExpiredSession: apiUrl + "/api/mixin/sessions/allowReceiptsForExpiredSession",

//End of Common APIs


//Begin of User Management APIs

//security Questions
getAllSecurityQuestions: apiUrl + "/api/UserRecoverQuestions",

//user
getUserById: apiUrl + "/api/Users/getUserById",
updateUserDetails: apiUrl + "/api/Users/updateUser",
getAllUsers:apiUrl+"/api/Users/getAllUsers",
saveUser:apiUrl+"/api/Users/saveUser",

//Groups
getAllGroupsForSabhaId: apiUrl + "/api/Group/getAllForSabhaId",  
deleteGroup: apiUrl + "/api/Group/deleteGroup",  
saveGroup: apiUrl + "/api/Group/save",
getGroupUsersForGroup: apiUrl + "/api/Group/getForGroupUsers",  
getGroupRulesForGroup: apiUrl + "/api/Group/getForGroupRules",  
saveGroupUsers: apiUrl + "/api/Group/saveUsers",
saveGroupRules: apiUrl + "/api/Group/saveRules",

getCheckAccessByRuleCode: apiUrl + "/api/Group/getCheckAccessByRuleCode",  
getPermittedRulesForUser: apiUrl + "/api/Group/getPermittedRulesForUser",  

//rules
getAllRules: apiUrl + "/api/Group/rules/getAll",

//End of User Management APIs


//Begin of Mix Income Management APIs

//voteAssignments
getAllVoteAssignmentsForSabhaId:  apiUrl +"/api/mixin/voteAssignments/getAllForSabhaId",
getVoteAssignmentById:  apiUrl +"/api/mixin/voteAssignments/getById",
saveVoteAssignment: apiUrl +"/api/mixin/voteAssignments/save",
deleteVoteAssignment: apiUrl +"/api/mixin/voteAssignments/delete",
getAllVoteAssignmentsForOfficeId:  apiUrl +"/api/mixin/voteAssignments/GetAllForOfficeId",
getAllVoteAssignmentsForOfficeIdAndAccountDetailId:  apiUrl +"/api/mixin/voteAssignments/GetAllForOfficeIdAndAccountDetailId",
getAllVoteAssignmentsForVoteId: apiUrl +"/api/mixin/voteAssignments/GetAllForVoteId",
getAllOfficeGroupedForVoteAssignment: apiUrl +"/api/mixin/voteAssignments/getAllOfficeGroupedForVoteAssignment",

//voteAssignmentDetails
getAllVoteAssignmentDetails:  apiUrl +"/api/mixin/voteAssignmentDetails/getAll",
getVoteAssignmentDetailById:  apiUrl +"/api/mixin/voteAssignmentDetails/getById",
saveVoteAssignmentDetail: apiUrl +"/api/mixin/voteAssignmentDetails/save",
deleteVoteAssignmentDetail: apiUrl +"/api/mixin/voteAssignmentDetails/delete",
getAllVoteAssignmentDetailsForOfficeId:  apiUrl +"/api/mixin/voteAssignmentDetails/GetAllForOfficeId",
getAllVoteAssignmentDetailsForVoteAssignmentId: apiUrl +"/api/mixin/voteAssignmentDetails/getAllVoteAssignmentDetailsForVoteAssignmentId",

//MixinOrder
getAllMixinOrders:  apiUrl +"/api/mixin/mixinOrder/getAll",
getMixinOrderByIdAndOffice:  apiUrl +"/api/mixin/mixinOrder/getByIdAndOffice",
saveMixinOrder: apiUrl +"/api/mixin/mixinOrder/save",
cancelMixinOrder: apiUrl +"/api/mixin/mixinOrder/cancel",
deleteMixinOrder: apiUrl +"/api/mixin/mixinOrder/delete",
paidMixinOrder: apiUrl +"/api/mixin/mixinOrder/paid",
approveCancelMixinOrder: apiUrl +"/api/mixin/mixinOrder/approveCancelOrder",
disapproveCancelMixinOrder: apiUrl +"/api/mixin/mixinOrder/disapproveCancelOrder",
updateMixinOrderState: apiUrl +"/api/mixin/mixinOrder/updateState",
getAllMixinOrdersForOffice: apiUrl +"/api/mixin/mixinOrder/getAllForOffice",
getAllMixinOrdersForOfficeAndState: apiUrl +"/api/mixin/mixinOrder/getAllForOfficeAndState",
getAllMixinOrdersForOfficeAndStateAndDate: apiUrl +"/api/mixin/mixinOrder/getAllForOfficeAndStateAndDate",
getAllMixinOrdersForSessionAndState: apiUrl +"/api/mixin/mixinOrder/getAllForSessionAndState",
getAllMixinOrdersForUserAndState: apiUrl +"/api/mixin/mixinOrder/getAllForUserAndState",
getMixinOrderByBarcode:  apiUrl +"/api/mixin/mixinOrder/getOrderByBarcode",
getAllCashBookForOfficeId:  apiUrl +"/api/mixin/mixinOrder/getAllCashBookForOfficeId",
getAllCashBookForOfficeIdBankAccountId:  apiUrl +"/api/mixin/mixinOrder/getAllCashBookForOfficeIdBankAccountId",
banking:  apiUrl +"/api/mixin/mixinOrder/banking",

//End of Mix Income Management APIs


//Reports
getMixinSarapReceiptsDailyReport:  apiUrl +"/api/Report/getMixinSarapReceiptsDailyReport",
getTestReport:  apiUrl +"/api/Report/TestReport",
//End of Reports

}

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {

  constructor(private webApiService: WebApiService) { }
 

  //Begin of Vote Management Functions
  //programme
  public getAllProgramme(model : any): Observable<any> {
    return this.webApiService.get(httpLink.getAllProgramme+ '/'+model);
  }

  public deleteProgrammeById(model: any): Observable<any> {
    return this.webApiService.post(httpLink.deleteProgrammeById + '/' + model, "");
  }

  public getProgrammeDetailById(model: any): Observable<any> {
    return this.webApiService.get(httpLink.getProgrammeDetailById + '/' + model);
  }

  public saveProgramme(model: any): Observable<any> {
    return this.webApiService.post(httpLink.saveProgramme, model);
  }

  public updateProgramme(model: any): Observable<any> {
    return this.webApiService.post(httpLink.updateProgramme, model);
  }
 
//project
public getAllProject(model : any): Observable<any> {
  return this.webApiService.get(httpLink.getAllProject+ '/'+model);
}

public deleteProjectById(model: any): Observable<any> {
  return this.webApiService.post(httpLink.deleteProjectById + '/' + model, "");
}

public getProjectDetailById(model: any): Observable<any> {
  return this.webApiService.get(httpLink.getProjectDetailById + '/' + model);
}

public saveProject(model: any): Observable<any> {
  return this.webApiService.post(httpLink.saveProject, model);
}

public updateProject(model: any): Observable<any> {
  return this.webApiService.post(httpLink.updateProject, model);
}
public getAllProjectsForProgrammeId(model: any): Observable<any> {
  return this.webApiService.get(httpLink.getAllProjectsForProgramme + '/' + model);
}

//subproject
public getAllSubproject(model : any): Observable<any> {
  return this.webApiService.get(httpLink.getAllsubproject  + '/'+model);
}

public deleteSubprojectById(model: any): Observable<any> {
  return this.webApiService.post(httpLink.deletesubprojectById + '/' + model, "");
}

public getSubprojectDetailById(model: any): Observable<any> {
  return this.webApiService.get(httpLink.getsubprojectDetailById + '/' + model);
}

public saveSubproject(model: any): Observable<any> {
  return this.webApiService.post(httpLink.savesubproject, model);
}

public updateSubproject(model: any): Observable<any> {
  return this.webApiService.post(httpLink.updatesubproject, model);
}

public getAllsubprojectforprojectID(model: any): Observable<any> {
  return this.webApiService.get(httpLink.getAllsubprojectforprojectID + '/' + model);
}

public getAllsubprojectforprogrammeID(model: any): Observable<any> {
  return this.webApiService.get(httpLink.getAllsubprojectforProgrammeID + '/' + model);
}

//incometitle
public getAllIncometitle(model : any): Observable<any> {
  return this.webApiService.get(httpLink.getAllIncometitle  + '/'+model);
}

public getAllIncometitleByProgrammeId(model: any): Observable<any> {
  return this.webApiService.get(httpLink.getAllIncometitleByProgrammeId + '/' + model);
}

public deleteIncometitleById(model: any): Observable<any> {
  return this.webApiService.post(httpLink.deleteIncometitleById + '/' + model, "");
}

public getIncometitleDetailById(model: any): Observable<any> {
  return this.webApiService.get(httpLink.getIncometitleDetailById + '/' + model);
}

public saveIncometitle(model: any): Observable<any> {
  return this.webApiService.post(httpLink.saveIncometitle, model);
}

public updateIncometitle(model: any): Observable<any> {
  return this.webApiService.post(httpLink.updateIncometitle, model);
}

//accountbalancedetail
public getAllAccountBalanceDetail(model : any): Observable<any> {
  return this.webApiService.get(httpLink.getAllAccountBalanceDetail  + '/'+model);
}

public deleteAccountBalanceDetailById(model: any): Observable<any> {
  return this.webApiService.post(httpLink.deleteAccountBalanceDetailById + '/' + model, "");
}

public getAccountBalanceDetailDetailById(model: any): Observable<any> {
  return this.webApiService.get(httpLink.getAccountBalanceDetailDetailById + '/' + model);
}

public saveAccountBalanceDetail(model: any): Observable<any> {
  return this.webApiService.post(httpLink.saveAccountBalanceDetail, model);
}

public updateAccountBalanceDetail(model: any): Observable<any> {
  return this.webApiService.post(httpLink.updateAccountBalanceDetail, model);
}

public getAllAccountbalancedetailsByAccountIdandSabhaId(accountdetail: any,sabha: any): Observable<any> {
  return this.webApiService.get(httpLink.getAllAccountbalancedetailsByAccountIdandSabhaId + '/' + accountdetail + '/' + sabha);
}

//balancesheetbalance
public getAllBalancesheetBalance(model : any): Observable<any> {
  return this.webApiService.get(httpLink.getAllBalancesheetBalance  + '/'+model);
}

public deleteBalancesheetBalanceById(model: any): Observable<any> {
  return this.webApiService.post(httpLink.deleteBalancesheetBalanceById + '/' + model, "");
}

public getBalancesheetBalanceDetailById(model: any): Observable<any> {
  return this.webApiService.get(httpLink.getBalancesheetBalanceDetailById + '/' + model);
}

public GetAllBalancesheetBalancesForVoteDetailIdandYear(voteid: any,year: any): Observable<any> {
  return this.webApiService.get(httpLink.GetAllBalancesheetBalancesForVoteDetailIdandYear + '/' + voteid+ '/' + year);
}

public saveBalancesheetBalance(model: any): Observable<any> {
  return this.webApiService.post(httpLink.saveBalancesheetBalance, model);
}

public updateBalancesheetBalance(model: any): Observable<any> {
  return this.webApiService.post(httpLink.updateBalancesheetBalance, model);
}

//accountdetail
public getAllAccountDetail(model : any): Observable<any> {
  return this.webApiService.get(httpLink.getAllAccountDetail  + '/'+model);
}

public deleteAccountDetailById(model: any): Observable<any> {
  return this.webApiService.post(httpLink.deleteAccountDetailById + '/' + model, "");
}

public getAccountDetailDetailById(model: any): Observable<any> {
  return this.webApiService.get(httpLink.getAccountDetailDetailById + '/' + model);
}

public saveAccountDetail(model: any): Observable<any> {
  return this.webApiService.post(httpLink.saveAccountDetail, model);
}

public updateAccountDetail(model: any): Observable<any> {
  return this.webApiService.post(httpLink.updateAccountDetail, model);
}

//balancesheetsubtitle
public getAllBalancesheetSubtitle(model : any): Observable<any> {
  return this.webApiService.get(httpLink.getAllBalancesheetSubtitle  + '/'+model);
}

public deleteBalancesheetSubtitleById(model: any): Observable<any> {
  return this.webApiService.post(httpLink.deleteBalancesheetSubtitleById + '/' + model, "");
}

public getBalancesheetSubtitleDetailById(model: any): Observable<any> {
  return this.webApiService.get(httpLink.getBalancesheetSubtitleDetailById + '/' + model);
}

public saveBalancesheetSubtitle(model: any): Observable<any> {
  return this.webApiService.post(httpLink.saveBalancesheetSubtitle, model);
}

public updateBalancesheetSubtitle(model: any): Observable<any> {
  return this.webApiService.post(httpLink.updateBalancesheetSubtitle, model);
}

public getAllBalancesheetSubtitleByTitleID(model: any): Observable<any> {
  return this.webApiService.get(httpLink.getAllBalancesheetSubtitleByTitleID + '/' + model);
}
public getAllBalancesheetSubtitlesForTitleIDAndAccountDetailID(titleid: any,acountdetailid: any): Observable<any> {
  return this.webApiService.get(httpLink.getAllBalancesheetSubtitlesForTitleIDAndAccountDetailID + '/' + titleid+ '/' + acountdetailid);
}


//balancesheettitle
public getAllBalancesheetTitle(model : any): Observable<any> {
  return this.webApiService.get(httpLink.getAllBalancesheetTitle  + '/'+model);
}

public deleteBalancesheetTitleById(model: any): Observable<any> {
  return this.webApiService.post(httpLink.deleteBalancesheetTitleById + '/' + model, "");
}

public getBalancesheetTitleDetailById(model: any): Observable<any> {
  return this.webApiService.get(httpLink.getBalancesheetTitleDetailById + '/' + model);
}

public saveBalancesheetTitle(model: any): Observable<any> {
  return this.webApiService.post(httpLink.saveBalancesheetTitle, model);
}

public updateBalancesheetTitle(model: any): Observable<any> {
  return this.webApiService.post(httpLink.updateBalancesheetTitle, model);
}

public getAllBalancesheetTitleForAccountDetailsId(accountdetailid : any): Observable<any> {
  return this.webApiService.get(httpLink.getAllBalancesheetTitleForAccountDetailsId  + '/'+accountdetailid);
}

//incomesubtitle
public getAllIncomeSubtitle(model : any): Observable<any> {
  return this.webApiService.get(httpLink.getAllIncomeSubtitle  + '/'+model);
}

public deleteIncomeSubtitleById(model: any): Observable<any> {
  return this.webApiService.post(httpLink.deleteIncomeSubtitleById + '/' + model, "");
}

public getIncomeSubtitleDetailById(model: any): Observable<any> {
  return this.webApiService.get(httpLink.getIncomeSubtitleDetailById + '/' + model);
}

public saveIncomeSubtitle(model: any): Observable<any> {
  return this.webApiService.post(httpLink.saveIncomeSubtitle, model);
}

public updateIncomeSubtitle(model: any): Observable<any> {
  return this.webApiService.post(httpLink.updateIncomeSubtitle, model);
}

public getAllIncomeSubtitlebyTitleID(model: any): Observable<any> {
  return this.webApiService.get(httpLink.getAllIncomeSubtitlebyTitleID + '/' + model);
}

public getAllIncomeSubtitlebyProgrammeID(model: any): Observable<any> {
  return this.webApiService.get(httpLink.getAllIncomeSubtitlebyProgrammeID + '/' + model);
}

//voteallocation
public getAllVoteAllocation(model : any): Observable<any> {
  return this.webApiService.get(httpLink.getAllVoteAllocation  + '/'+model);
}

public deleteVoteAllocationById(model: any): Observable<any> {
  return this.webApiService.post(httpLink.deleteVoteAllocationById + '/' + model, "");
}

public getVoteAllocationDetailById(model: any): Observable<any> {
  return this.webApiService.get(httpLink.getVoteAllocationDetailById + '/' + model);
}

public saveVoteAllocation(model: any): Observable<any> {
  return this.webApiService.post(httpLink.saveVoteAllocation, model);
}

public updateVoteAllocation(model: any): Observable<any> {
  return this.webApiService.post(httpLink.updateVoteAllocation, model);
}

public getAllVoteAllocationbyVoteDetailIdandSabhaId(vote: any,sabha: any): Observable<any> {
  return this.webApiService.get(httpLink.getAllVoteAllocationbyVoteDetailIdandSabhaId + '/' + vote + '/' + sabha);
}

public getAllVoteAllocationsForVoteDetailIdandSabhaIdandYear(vote: any,sabha: any,year: any): Observable<any> {
  return this.webApiService.get(httpLink.getAllVoteAllocationsForVoteDetailIdandSabhaIdandYear + '/' + vote + '/' + sabha + '/' + year);
}

//votedetails
public getAllVoteDetails(model : any): Observable<any> {
  return this.webApiService.get(httpLink.getAllVoteDetails  + '/'+model);
}

public deleteVoteDetailsById(model: any): Observable<any> {
  return this.webApiService.post(httpLink.deleteVoteDetailsById + '/' + model, "");
}

public getVoteDetailsDetailById(model: any): Observable<any> {
  return this.webApiService.get(httpLink.getVoteDetailsDetailById + '/' + model);
}

public saveVoteDetails(model: any): Observable<any> {
  return this.webApiService.post(httpLink.saveVoteDetails, model);
}

public updateVoteDetails(model: any): Observable<any> {
  return this.webApiService.post(httpLink.updateVoteDetails, model);
}
public getAllVoteDetailsForProgrammeId(model : any): Observable<any> {
  return this.webApiService.get(httpLink.getAllVoteDetailsForProgrammeId  + '/'+model);
}

//End of Vote Management Functions



//Begin of Common Functions

//bank details
public getAllBankDetails(): Observable<any> {
  return this.webApiService.get(httpLink.getAllBankDetails);
}

//Years details
public getAllYears(): Observable<any> {
  return this.webApiService.get(httpLink.getAllYears);
}
//Months details
public getAllMonths(): Observable<any> {
  return this.webApiService.get(httpLink.getAllMonths);
}
//Gender
public getAllGenders(): Observable<any> {
  return this.webApiService.get(httpLink.getAllGenders);
}

public getAllOfficesForSabhaId(id:any): Observable<any> {
  return this.webApiService.get(httpLink.getAllOfficesForSabhaId+ '/'+ id);
}
public getOfficeById(id:any): Observable<any> {
  return this.webApiService.get(httpLink.getOfficeById+ '/'+ id);
}


//PaymentNbts
public getAllPaymentVats(): Observable<any> {
  return this.webApiService.get(httpLink.getAllPaymentVats);
}
public getPaymentVatsById(id:any): Observable<any> {
  return this.webApiService.get(httpLink.getPaymentVatsById+ '/'+ id);
}

//PaymentNbts
public getAllPaymentNbts(): Observable<any> {
  return this.webApiService.get(httpLink.getAllPaymentNbts);
}
public getPaymentNbtsById(id:any): Observable<any> {
  return this.webApiService.get(httpLink.getPaymentNbtsById+ '/'+ id);
}

//GnDivisions
public getAllGnDivisions(): Observable<any> {
  return this.webApiService.get(httpLink.getAllGnDivisions);
}
public getGnDivisions(id:any): Observable<any> {
  return this.webApiService.get(httpLink.getGnDivisions+ '/'+ id);
}
public getAllGnDivisionsForOffice(id:any): Observable<any> {
  return this.webApiService.get(httpLink.getAllGnDivisionsForOffice+ '/'+ id);
}
public getAllGnDivisionsForSabha(id:any): Observable<any> {
  return this.webApiService.get(httpLink.getAllGnDivisionsForSabha+ '/'+ id);
}


//Partner 
public getAllPartners(): Observable<any> {
  return this.webApiService.get(httpLink.getAllPartners);
}
public getAllPartnersForSabha(id:any): Observable<any> {
  return this.webApiService.get(httpLink.getAllPartnersForSabha+ '/'+ id);
}
public getPartnerById(id:any): Observable<any> {
  return this.webApiService.get(httpLink.getPartnerById+ '/'+ id);
}
public getPartnerByNIC(NIC:any): Observable<any> {
  return this.webApiService.get(httpLink.getPartnerByNIC+ '/'+ NIC);
}
public getPartnerByPhoneNo(PhoneNo:any): Observable<any> {
  return this.webApiService.get(httpLink.getPartnerByPhoneNo+ '/'+ PhoneNo);
}
public getAllPartnersForPartnerType(id:any): Observable<any> {
  return this.webApiService.get(httpLink.getAllPartnersForPartnerType+ '/'+ id);
}
public getAllForPartnerTypeAndSabha(type:any,sabha:any): Observable<any> {
  return this.webApiService.get(httpLink.getAllPartnersForPartnerType+ '/'+ type + '/'+ sabha);
}
public savePartner(partner:any): Observable<any> {
  return this.webApiService.post(httpLink.savePartner, partner);
}


//Session
public getSessionById(id:any): Observable<any> {
  return this.webApiService.get(httpLink.getSessionById+ '/'+ id);
}
public getSessionByOfficeAndModule(officeid:any,module:any): Observable<any> {
  return this.webApiService.get(httpLink.getSessionByOfficeAndModule+ '/'+ officeid+ '/'+ module);
}
public getSessionByOfficeModuleAndDate(officeid:any,module:any,date:any): Observable<any> {
  return this.webApiService.get(httpLink.getSessionByOfficeModuleAndDate+ '/'+ officeid+ '/'+ module+ '/'+ date);
}
public getAllActiveSessionsByOffice(officeid:any): Observable<any> {
  return this.webApiService.get(httpLink.getAllActiveSessionsByOffice+ '/'+ officeid);
}
public getAllSessionsByOffice(officeid:any): Observable<any> {
  return this.webApiService.get(httpLink.getAllSessionsByOffice+ '/'+ officeid);
}
public getAllSessionsByOfficeAndModule(officeid:any, module:any): Observable<any> {
  return this.webApiService.get(httpLink.getAllSessionsByOfficeAndModule+ '/'+ officeid+ '/'+ module);
}


public startSession(session:any): Observable<any> {
  return this.webApiService.post(httpLink.startSession, session);
}
public endSession(session:any): Observable<any> {
  return this.webApiService.post(httpLink.endSession, session);
}
public startCustomSession(session:any): Observable<any> {
  return this.webApiService.post(httpLink.startCustomSession, session);
}
public allowReceiptsForExpiredSession(session:any): Observable<any> {
  return this.webApiService.post(httpLink.allowReceiptsForExpiredSession, session);
}

//Begin of Common Functions

//Begin of User Management Functions

//Security Questions
public getAllSecurityQuestions(): Observable<any> {
  return this.webApiService.get(httpLink.getAllSecurityQuestions);
}

//user
public getUserById(model : any): Observable<any> {
  return this.webApiService.get(httpLink.getUserById  + '/'+model);
}
public updateUserDetails(model: any): Observable<any> {
  return this.webApiService.post(httpLink.updateUserDetails, model);
}
public getAllUsers(sabhaID : any): Observable<any> {
  return this.webApiService.get(httpLink.getAllUsers+ '/'+sabhaID);
}
 
public saveUser(model: any): Observable<any> {
  return this.webApiService.post(httpLink.saveUser, model);
}

//groups
public getAllGroupsForSabhaId(sabhaID:any): Observable<any> {
  return this.webApiService.get(httpLink.getAllGroupsForSabhaId+ '/'+ sabhaID);
}
public deleteGroup(id:any): Observable<any> {
  return this.webApiService.post(httpLink.deleteGroup+ '/'+ id,"");
}
public saveGroup(model: any): Observable<any> {
  return this.webApiService.post(httpLink.saveGroup, model);
}
public getGroupUsersForGroup(id:any): Observable<any> {
  return this.webApiService.get(httpLink.getGroupUsersForGroup+ '/'+ id);
}
public getGroupRulesForGroup(id:any): Observable<any> {
  return this.webApiService.get(httpLink.getGroupRulesForGroup+ '/'+ id);
}
public saveGroupUsers(model: any): Observable<any> {
  return this.webApiService.post(httpLink.saveGroupUsers, model);
}
public saveGroupRules(model: any): Observable<any> {
  return this.webApiService.post(httpLink.saveGroupRules, model);
}

public getAllRules(): Observable<any> {
  return this.webApiService.get(httpLink.getAllRules);
}
public getCheckAccessByRuleCode(ruleCode:any,userID:Number): Observable<any> {
  return this.webApiService.get(httpLink.getCheckAccessByRuleCode+ '/'+ ruleCode+ '/'+ userID);
}
public getPermittedRulesForUser(userID:Number): Observable<any> {
  return this.webApiService.get(httpLink.getPermittedRulesForUser+ '/'+ userID);
}


// public hasPermission(ruleCode:any,userID:Number): Observable<any> {
//   return this.webApiService.get(httpLink.getCheckAccessByRuleCode+ '/'+ ruleCode+ '/'+ userID);
// }
//End of User Management Functions



//Begin of Mix Income Management Functions

//VoteAssignment
public getVoteAssignmentById(id : any): Observable<any> {
  return this.webApiService.get(httpLink.getVoteAssignmentById  + '/'+ id);
}
public getAllVoteAssignmentsForSabhaId(id : any): Observable<any> {
  return this.webApiService.get(httpLink.getAllVoteAssignmentsForSabhaId  + '/'+ id);
}
public saveVoteAssignment(model: any): Observable<any> {
  return this.webApiService.post(httpLink.saveVoteAssignment, model);
}
public deleteVoteAssignment(id: any): Observable<any> {
  return this.webApiService.post(httpLink.deleteVoteAssignment + '/' + id, "");
}
public getAllVoteAssignmentsForOfficeId(id: any): Observable<any> {
    return this.webApiService.get(httpLink.getAllVoteAssignmentsForOfficeId + '/'+ id);
}
public getAllVoteAssignmentsForOfficeIdAndAccountDetailId(officeid: any,bankaccountid: any): Observable<any> {
  return this.webApiService.get(httpLink.getAllVoteAssignmentsForOfficeIdAndAccountDetailId + '/'+ officeid+ '/'+ bankaccountid);
}

public getAllVoteAssignmentsForVoteId(id: any): Observable<any> {
  return this.webApiService.get(httpLink.getAllVoteAssignmentsForVoteId + '/'+ id);
}
public getAllOfficeGroupedForVoteAssignment(id: any): Observable<any> {
  return this.webApiService.get(httpLink.getAllOfficeGroupedForVoteAssignment + '/'+ id);
}

//VoteAssignment Details
public getVoteAssignmentDetailById(id : any): Observable<any> {
  return this.webApiService.get(httpLink.getVoteAssignmentDetailById  + '/'+id);
}
public getAllVoteAssignmentDetails(): Observable<any> {
  return this.webApiService.get(httpLink.getAllVoteAssignmentDetails);
}
public saveVoteAssignmentDetail(model: any): Observable<any> {
  return this.webApiService.post(httpLink.saveVoteAssignmentDetail, model);
}
public deleteVoteAssignmentDetail(id: any): Observable<any> {
  return this.webApiService.post(httpLink.deleteVoteAssignmentDetail + '/' + id, "");
}
public getAllVoteAssignmentDetailsForOfficeId(id : any): Observable<any> {
  return this.webApiService.get(httpLink.getAllVoteAssignmentDetailsForOfficeId + '/'+ id);
}
public getAllVoteAssignmentDetailsForVoteAssignmentId(id : any): Observable<any> {
  return this.webApiService.get(httpLink.getAllVoteAssignmentDetailsForVoteAssignmentId + '/'+ id);
}

//Mixin Order
public getMixinOrderByIdAndOffice(id : any, officeid : any): Observable<any> {
  return this.webApiService.get(httpLink.getMixinOrderByIdAndOffice + '/'+id + '/'+officeid);
}
public getAllMixinOrders(): Observable<any> {
  return this.webApiService.get(httpLink.getAllMixinOrders);
}
public saveMixinOrderDetail(model: any): Observable<any> {
  return this.webApiService.post(httpLink.saveMixinOrder, model);
}
public updateMixinOrderState(model:any): Observable<any> {
  return this.webApiService.post(httpLink.updateMixinOrderState + '/' + model, "");
}
public deleteMixinOrder(id: any, cashierid:number): Observable<any> {
  return this.webApiService.post(httpLink.deleteMixinOrder + '/' + id + '/' + cashierid, "");
}
public cancelMixinOrder(cancelOrder:MixinCancelOrder): Observable<any> {
  return this.webApiService.post(httpLink.cancelMixinOrder, cancelOrder);
}
public paidMixinOrder(id: any, cashierid:number): Observable<any> {
  return this.webApiService.post(httpLink.paidMixinOrder + '/' + id + '/' + cashierid, "");
}
public approveCancelMixinOrder(cancelOrder:MixinCancelOrder): Observable<any> {
  return this.webApiService.post(httpLink.approveCancelMixinOrder, cancelOrder);
}
public disapproveCancelMixinOrder(cancelOrder:MixinCancelOrder): Observable<any> {
  return this.webApiService.post(httpLink.disapproveCancelMixinOrder, cancelOrder);
}
public getAllMixinOrdersForOffice(id: any): Observable<any> {
  return this.webApiService.get(httpLink.getAllMixinOrdersForOffice + '/' + id);
}
public getAllMixinOrdersForOfficeAndState(office: any, status: any): Observable<any> {
  return this.webApiService.get(httpLink.getAllMixinOrdersForOfficeAndState + '/' + office + '/' + status);
}
public getAllMixinOrdersForOfficeAndStateAndDate(office: any, status: any, date: any): Observable<any> {
  return this.webApiService.get(httpLink.getAllMixinOrdersForOfficeAndStateAndDate + '/' + office + '/' + status + '/' + date);
}
public getAllMixinOrdersForSessionAndState(session: any, status: any): Observable<any> {
  return this.webApiService.get(httpLink.getAllMixinOrdersForSessionAndState + '/' + session + '/' + status);
}
public getAllMixinOrdersForUserAndState(user: any, status: any): Observable<any> {
  return this.webApiService.get(httpLink.getAllMixinOrdersForUserAndState + '/' + user + '/' + status);
}
public getMixinOrderByBarcode(id : any,officeid : any): Observable<any> {
  return this.webApiService.get(httpLink.getMixinOrderByBarcode  + '/'+id+ '/'+officeid);
}
public getAllCashBookForOfficeId(officeid: any): Observable<any> {
  return this.webApiService.get(httpLink.getAllCashBookForOfficeId + '/' + officeid );
}
public getAllCashBookForOfficeIdBankAccountId(officeid: any, bankaccid: any): Observable<any> {
  return this.webApiService.get(httpLink.getAllCashBookForOfficeIdBankAccountId + '/' + officeid + '/' + bankaccid);
}
public saveBanking(model: any): Observable<any> {
  return this.webApiService.post(httpLink.banking, model);
}
//End of Mix Income Management Functions


//Reports
public getMixinSarapReceiptsDailyReport(reporttype : any, officeId : any): Observable<any> {
  return this.webApiService.get(httpLink.getMixinSarapReceiptsDailyReport  + '/'+reporttype+ '/'+officeId);
}
public getTestReport(reporttype : any): Observable<any> {
  return this.webApiService.get(httpLink.getTestReport  + '/'+reporttype);
}

//End of Report Functions
}
