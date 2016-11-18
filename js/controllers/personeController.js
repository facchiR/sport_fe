app.controller('PersoneController', ['$scope', 'crudService','$routeParams','$http', function($scope, crudService,$routeParams,$http) {
    var vm = $scope;
	window.vm=vm;
	vm.id= $routeParams && $routeParams.id || false;
    vm.data = [];
	vm.gridEmailsOptions={
		columnDefs:[
			{ name: 'email'},
			{ name: 'note' }
		],
		enableCellEditOnFocus: true,
		enableRowSelection: true,
		selectionRowHeaderWidth: 35,
		enableSelectAll: true,
		multiSelect:true,
		onRegisterApi:function(gridApi){
			vm.gridEmailsApi = gridApi;
		}		
	};
    var populateData = function(response){
        var data = response.data && response.data.docs ||[];
		vm.data=JSON.parse(JSON.stringify(data));
		if (vm.id){
			vm.d=vm.data[0] || {};
			if (!vm.d.emails) vm.d.emails=[];
			vm.gridEmailsOptions.data=vm.d.emails;
		}
		
    };
	vm.createEmail=function(){
		vm.d.emails.push({})
	};
	vm.removeEmail = function(){	
		vm.gridEmailsApi.grid.rows.map(function(r){
			if (r.isSelected) vm.d.emails.splice(vm.d.emails.indexOf(r.entity),1)
		})
		
    };	
    vm.read = function(){
		var fnd={"cat":"persone"};
		if (vm.id) fnd._id=vm.id;
        crudService.fnd(fnd, populateData);
    };	
    vm.save = function(){
		vm.d.cat='persone';
		if (vm.id=='new') delete(vm.id)
        crudService.set(vm.d,function(r){
			if (!vm.id){
				window.location="#/persone/"+r.id
			}
		});
    };
	vm.remove = function(){
        crudService.del(vm.d,function(r){
			window.location="#/persone/"
		});
    };
    vm.init = function(){
        vm.read();
		var pr=function(){
			$('[ng-model="cognome"]').focus()
		}
		$(pr)
    };
	vm.init();
}]);


/* TODO:

autofocus
notifiche 
pulsanti salva, elimina eccetera quando necessario

*/