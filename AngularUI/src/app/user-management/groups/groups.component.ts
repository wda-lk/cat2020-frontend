import { Component, OnInit } from '@angular/core';
import { Group } from '../models/group';
import { GroupRule } from '../models/groupRule';
import { GroupUser } from '../models/groupUser';
import { HttpProviderService } from '../../services/http-provider.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { NgxSpinnerService } from "ngx-spinner";
import { DualListComponent } from 'angular-dual-listbox';
import { UserDetail } from '../models/UserDetail';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit  {
  selectedGroup: Group = new Group();
  selectedGroupUser: GroupUser = new GroupUser();
  selectedGroupRule: GroupRule = new GroupRule();
  enableGroupUserForm:boolean=false;
  enableGroupRuleForm:boolean=false;
  loading = false;
  APIGroupsList:any;
  APIGroupUsersList:any;
  APIGroupRulesList:any;

  groupUsers: GroupUser[] = new Array();
  groupRules: GroupRule[] = new Array();

  selectedGroupIDForGroupUser:number;
  selectedGroupIDForGroupRule:number;
  selectedGroupDescriptionForGroupUser:any;
  selectedGroupDescriptionForGroupRule:any;

  userList:any;
  ruleList:any;

  isSubmitted: boolean = false;
  isValid : boolean =false;
  SelectedLanguage : any;
  isSinhala :boolean = false;
  isTamil :boolean= false;
  isEnglish :boolean= false;


  tab = 1;
	keepSorted = true;
	key: string;
	display: any;
	filter = true;
	source: Array<any>;
	confirmed: Array<any>;
	userAdd = '';
	disabled = false;

	sourceLeft = true;
	format: any = DualListComponent.DEFAULT_FORMAT;

	private sourceTube: Array<string>;
	private sourceStations: Array<any>;
	private sourceUsers: Array<any>;
	private sourceRules: Array<any>;
	private sourceChessmen: Array<any>;

	private confirmedTube: Array<string>;
	private confirmedStations: Array<any>;
	private confirmedUserList: Array<any>;
	private confirmedRuleList: Array<any>;
	private confirmedChessmen: Array<any>;

	private assignedUsersList: Array<any>;
	private notAssignedList: Array<any>;

	// type:any;

	arrayType = [
		{ name: 'Users', detail: '(object array)', value: 'userdetails' },
		{ name: 'Rio Grande', detail: '(object array)', value: 'station' },
		{ name: 'Rules', detail: '(object array)', value: 'rules' }
	];

     type = this.arrayType[0].value;

	private stations: Array<any> = [
		{ key: 1, station: 'Antonito', state: 'CO' },
		{ key: 2, station: 'Big Horn', state: 'NM' },
		{ key: 3, station: 'Sublette', state: 'NM' },
		{ key: 4, station: 'Toltec', state: 'NM' },
		{ key: 5, station: 'Osier', state: 'CO' },
		{ key: 6, station: 'Chama', state: 'NM'},
		{ key: 7, station: 'Monero', state: 'NM' },
		{ key: 8, station: 'Lumberton', state: 'NM' },
		{ key: 9, station: 'Duice', state: 'NM' },
		{ key: 10, station: 'Navajo', state: 'NM' },
		{ key: 11, station: 'Juanita', state: 'CO' },
		{ key: 12, station: 'Pagosa Jct', state: 'CO' },
		{ key: 13, station: 'Carracha', state: 'CO' },
		{ key: 14, station: 'Arboles', state: 'CO' },
		{ key: 15, station: 'Solidad', state: 'CO' },
		{ key: 16, station: 'Tiffany', state: 'CO' },
		{ key: 17, station: 'La Boca', state: 'CO' },
		{ key: 18, station: 'Ignacio', state: 'CO' },
		{ key: 19, station: 'Oxford', state: 'CO' },
		{ key: 20, station: 'Florida', state: 'CO' },
		{ key: 21, station: 'Bocea', state: 'CO' },
		{ key: 22, station: 'Carbon Jct', state: 'CO' },
		{ key: 23, station: 'Durango', state: 'CO' },
		{ key: 24, station: 'Home Ranch', state: 'CO' },
		{ key: 25, station: 'Trimble Springs', state: 'CO' },
		{ key: 26, station: 'Hermosa', state: 'CO' },
		{ key: 27, station: 'Rockwood', state: 'CO' },
		{ key: 28, station: 'Tacoma', state: 'CO' },
		{ key: 29, station: 'Needleton', state: 'CO' },
		{ key: 30, station: 'Elk Park', state: 'CO' },
		{ key: 31, station: 'Silverton', state: 'CO' },
		{ key: 32, station: 'Eureka', state: 'CO' }
	];

  constructor(private httpProvider: HttpProviderService, private spinner: NgxSpinnerService) {
  }

  isadmin:boolean=false;

  ngOnInit() {
        if(Number(localStorage.getItem('IsAdmin'))==1)
    {this.isadmin=true;}
    this.getAllUsers();
    this.getAllRules();
	// this.getGroupUsersForGroup(1);
    // this.doReset();

    this.spinner.show();
    this.refresh();
    this.spinner.hide();
  }

  private stationLabel(item: any) {
		return item.station + ', ' + item.state;
	}

	private useStations() {
		this.key = 'key';
		this.display = this.stationLabel;
		this.keepSorted = true;
		this.source = this.sourceStations;
		this.confirmed = this.confirmedStations;
	}

  private userLabel(item: any) {
		return item.nameWithInitials + ' (' + item.username+')';
	}

	private ruleLabel(item: any) {
		return item.module + " :  " + item.description ;
	}

  private useUserDetails() {
		this.key = 'id';
		this.display = this.userLabel;
		this.keepSorted = true;
		this.source = this.sourceUsers;
		this.confirmed = this.confirmedUserList;
	}

	private useRules() {
		this.key = 'id';
		this.display = this.ruleLabel;
		this.keepSorted = true;
		this.source = this.sourceRules;
		this.confirmed = this.confirmedRuleList;
	}

	doReset() {
		this.getAllUsers();
		this.sourceUsers = JSON.parse(JSON.stringify(this.userList));
		this.getAllRules();
		this.sourceRules = JSON.parse(JSON.stringify(this.ruleList));
		this.sourceStations = JSON.parse(JSON.stringify(this.stations));
		
		this.confirmedUserList = new Array<any>();
		this.confirmedRuleList = new Array<any>();
		this.confirmedStations = new Array<any>();

	// 	switch (this.type) {
    // case this.arrayType[0].value:
    //     this.useUserDetails();
    //     break;
	// 	case this.arrayType[1].value:
	// 		this.useStations();
	// 		break;
	// 	}

	if(this.type=='userdetails')
	{
		this.useUserDetails();
	}
	if(this.type=='rules')
	{
		 this.useRules();
	}
	if(this.type=='stations')
	{
		this.useStations();
	}

	}

	saveGroupUser(groupid:number){
		this.confirmed.forEach((item:any) => {
			this.groupUsers.push({
				userID:item.id,
				groupID:groupid,
				userCreatedID:Number(localStorage.getItem('Currentuserid')),
				userModifiedID:Number(localStorage.getItem('Currentuserid')),
				dateCreated: new Date(),
				dateModified: new Date()
			  });
	});
	this.httpProvider.saveGroupUsers(this.groupUsers)
    .subscribe({
    next: (result) => {
         var resultData = result.body;
         Notify.success('Group User Saved Successfully..!');
    },
    error: error => {
      Notify.failure('Error Occured..!');
    }
	});
	this.groupUsers=[];
	this.confirmed=[];
	this.refresh();
	setTimeout(() => {
	this.selectedGroup = new Group();
	this.selectedGroupUser = new GroupUser();
	this.isValid=false;
	this.resetGroupUser(groupid);
	}, 1000);
	}
	


	saveGroupRule(groupid:number){
		this.confirmed.forEach((item:any) => {
			this.groupRules.push({
				ruleID:item.id,
				groupID:groupid,
				userCreatedID:Number(localStorage.getItem('Currentuserid')),
				userModifiedID:Number(localStorage.getItem('Currentuserid')),
				dateCreated: new Date(),
				dateModified: new Date()
			  });
	});
	// console.log(this.groupRules);
	this.httpProvider.saveGroupRules(this.groupRules)
    .subscribe({
    next: (result) => {
         var resultData = result.body;
         Notify.success('Group Rule Saved Successfully..!');
    },
    error: error => {
      Notify.failure('Error Occured..!');
    }
	});
	this.groupRules=[];
	this.confirmed=[];
	this.refresh();
	setTimeout(() => {
	this.selectedGroup = new Group();
	this.selectedGroupRule = new GroupRule();
	this.isValid=false;
	this.resetGroupRule(groupid);
	}, 1000);
	}


	resetGroupUser(id:number){
		this.getAllUsers();
		this.getGroupUsersForGroup(id);
	}
	setAssignedGroupUsers(){
		this.APIGroupUsersList.assignedList.forEach((assignedUser:any) => {
			let index = this.userList.findIndex((x:any) => x.id === Number(assignedUser.id));
			this.confirmedUserList.push(this.userList[index]);
	});
	this.useUserDetails();
	}


	resetGroupRule(id:number){
		this.getAllRules();
		this.getGroupRulesForGroup(id);
	}
	setAssignedGroupRules(){
		// console.log(this.APIGroupRulesList);
		this.APIGroupRulesList.assignedList.forEach((assignedRule:any) => {
			let index = this.ruleList.findIndex((x:any) => x.id === Number(assignedRule.id));
			this.confirmedRuleList.push(this.ruleList[index]);
	});
	// console.log('Assigned for Group  :##' + this.confirmedRuleList  +'###');
	this.useRules();
	}

	doDelete() {
		if (this.source.length > 0) {
			this.source.splice(0, 1);
		}
	}

	doCreate() {
		if (typeof this.source[0] === 'object') {
			const o = { };
			// o[this.key] = this.source.length + 1;
			// o[this.display] = this.userAdd;
			// this.source.push( o );

		} else {
			this.source.push(this.userAdd);
		}
		this.userAdd = '';
	}

	doAdd() {
		for (let i = 0, len = this.source.length; i < len; i += 1) {
			const o = this.source[i];
			const found = this.confirmed.find( (e: any) => e === o );
			if (!found) {
				this.confirmed.push(o);
				break;
			}
		}
	}

	doRemove() {
		if (this.confirmed.length > 0) {
			this.confirmed.splice(0, 1);
		}
	}

	doFilter() {
		this.filter = !this.filter;
	}

	filterBtn() {
		return (this.filter ? 'Hide Filter' : 'Show Filter');
	}

	doDisable() {
		this.disabled = !this.disabled;
	}

	disableBtn() {
		return (this.disabled ? 'Enable' : 'Disabled');
	}

	swapDirection() {
		this.sourceLeft = !this.sourceLeft;
		this.format.direction = this.sourceLeft ? DualListComponent.LTR : DualListComponent.RTL;
	}

  async refresh() {
    this.isSinhala=false;
    this.isTamil=false;
    this.isEnglish=false;
    this.SelectedLanguage = localStorage.getItem('CurrentSabhaLang');
    if (this.SelectedLanguage=="Sinhala")
    {this.isSinhala=true;}
    if (this.SelectedLanguage=="Tamil")
    {this.isTamil=true;}
    if (this.SelectedLanguage=="English")
    {this.isEnglish=true;}
    this.loading = true;
    this.isValid = false;
    this.getAllGroups();
    this.loading = false;

  }


  async getAllUsers() {
    this.httpProvider.getAllUsers(Number(localStorage.getItem('sabhaId'))).subscribe({
      next: (data) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.userList = resultData;
        //   console.log(resultData);
        //   this.doReset();
        }
      }
    },
    error: error => {
          if (error.status == 404) {
            if(error.error && error.error.message){
              Notify.failure(error.error.message);
              this.userList = [];
            }
        }}
      });
  }



  async getAllRules() {
    this.httpProvider.getAllRules().subscribe({
      next: (data) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.ruleList = resultData;
        //   console.log(resultData);
        //   this.doReset();
        }
      }
    },
    error: error => {
          if (error.status == 404) {
            if(error.error && error.error.message){
              Notify.failure(error.error.message);
              this.ruleList = [];
            }
        }}
      });
  }

async getAllGroups() {
	this.APIGroupsList = [];
  this.httpProvider.getAllGroupsForSabhaId(localStorage.getItem('sabhaId')).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIGroupsList = resultData;
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIGroupsList = [];
          }
      }}
    });
}

async getGroupUsersForGroup(groupid:number) {
this.APIGroupUsersList = [];
  this.httpProvider.getGroupUsersForGroup(groupid).subscribe({
    next: (data) => {
    if (data != null && data.body != null) {
      var resultData = data.body;
      if (resultData) {
        this.APIGroupUsersList = resultData;
		this.setAssignedGroupUsers();
		// this.APIGroupUsersList.assignedList.forEach((assignedUser:any) => {
		//   let index = this.userList.findIndex((x:any) => x.id === Number(assignedUser.id));
		//   this.confirmedUserList.push(this.userList[index]);

		//    console.log(index);
	// });
      }
    }
  },
  error: error => {
        if (error.status == 404) {
          if(error.error && error.error.message){
            Notify.failure(error.error.message);
            this.APIGroupUsersList = [];
          }
      }}
    });
}

async getGroupRulesForGroup(groupid:number) {
	this.APIGroupRulesList = [];
	  this.httpProvider.getGroupRulesForGroup(groupid).subscribe({
		next: (data) => {
		if (data != null && data.body != null) {
		  var resultData = data.body;
		  if (resultData) {
			this.APIGroupRulesList = resultData;
			this.setAssignedGroupRules();
			// console.log(this.APIGroupRulesList );
		  }
		}
	  },
	  error: error => {
			if (error.status == 404) {
			  if(error.error && error.error.message){
				Notify.failure(error.error.message);
				this.APIGroupRulesList = [];
			  }
		  }}
		});
	}

  async saveGroup() {
    if (this.selectedGroup.description == "" || this.selectedGroup.description == undefined){
      this.isValid=false; Notify.warning('Description is Required.');
    } else{this.isValid=true;}
      this.selectedGroup.sabhaID = Number(localStorage.getItem('sabhaId'));

      this.selectedGroup.userCreatedID = Number(localStorage.getItem('Currentuserid'));
      this.selectedGroup.userModified = Number(localStorage.getItem('Currentuserid'));

if(this.isValid==true)
{
    this.httpProvider.saveGroup(this.selectedGroup)
    .subscribe({
    next: (result) => {
         var resultData = result.body;
         Notify.success('Group Created successfully..!');
    },
    error: error => {
      Notify.failure('Error Occured..!');
    }
});
this.refresh();
 setTimeout(() => {
this.selectedGroup = new Group();
this.isValid=false;
this.getAllGroups();
 }, 1000);
}
}


loadGroupUsers(id:number,description:any) {
	this.enableGroupRuleForm = false;
	this.useUserDetails();
	this.selectedGroupIDForGroupUser=id;
	this.selectedGroupDescriptionForGroupUser=description;
	this.doReset();
	this.enableGroupUserForm = true;
	this.getGroupUsersForGroup(id);
  }

  loadGroupRules(id:number,description:any) {
	this.enableGroupUserForm = false;
	this.useRules();
	this.selectedGroupIDForGroupRule=id
	this.selectedGroupDescriptionForGroupRule=description;
	this.doReset();
	this.enableGroupRuleForm = true;
	this.getGroupRulesForGroup(id);
  }


  closeGroupUsers() {
	this.selectedGroupIDForGroupUser=0;
	this.selectedGroupDescriptionForGroupUser="";
	this.doReset();
	this.enableGroupUserForm = false;
  }

  closeGroupRules() {
	this.selectedGroupIDForGroupRule=0;
	this.selectedGroupDescriptionForGroupRule="";
	this.doReset();
	this.enableGroupRuleForm = false;
  }


onchangeIsActive(value:any) {
	this.selectedGroup.isActive = value.checked;
  }

  editGroup(group: Group) {
    this.selectedGroup = group;
  }

  clearGroup() {
    this.selectedGroup = new Group();
  }

  async deleteGroup(group: Group) {
    this.loading = true;
    if (confirm(`Are you sure you want to delete the group : ${group.description}. This cannot be undone.`)) {
      this.httpProvider.deleteGroup(group.id)
      .subscribe({
        next: (data) => {
             var resultData = data.body;
             Notify.success('Group Deleted successfully..!');
        },
        error: error => {
          Notify.failure('Error Occured..!');
        }
    });
    setTimeout(() => {this.refresh();}, 2000);
  }
}
}
