app.controller('OpzioniController', ['$scope', 'crudService','$routeParams','$http','$q','$interval','uiGridConstants', function($scope, crudService,$routeParams,$http,$q,$interval,uiGridConstants) {
	var vm = $scope;
	window.vm=vm;
	vm.cat=$routeParams && $routeParams.opz || 'classi';
	vm.id= false;
    vm.data = [];
	vm.gridOptions={
		enableCellEditOnFocus: true,
		enableRowSelection: true,
		selectionRowHeaderWidth: 35,
		rowHeight: 35,		
		enableSelectAll: false,
		multiSelect:false,
		onRegisterApi:function(gridApi){
			vm.gridApi = gridApi;
			gridApi.rowEdit.on.saveRow(vm, vm.save);
		}		
	}
    var populateData = function(response){
        vm.data = response.data && response.data.docs ||[];
		vm.gridOptions.data=vm.data
		
		switch (true){
			case (vm.cat=='persone'):
				vm.gridOptions.columnDefs=[
					{ name: 'cognome', displayName: 'Cognome' },
					{ name: 'nome' }
				];
				break;
			case (vm.cat=='classi'):
				vm.gridOptions.columnDefs=[
					{ name: 'classe'},
					{ name: 'livello',type:'number',width:70},
					{name:'sezione',width:90}
				];
				break;				
			case (vm.cat=='discipline'):
				vm.gridOptions.columnDefs=[
					{ name: 'disciplina'},
					{ name: 'abbr',displayName:'Abbr.',width:90}
				];
				break;
			case (vm.cat=='anniscolastici'):
				vm.gridOptions.columnDefs=[
					{ name: 'annoscolastico',displayName:'Anno Scolastico'},
					{ name: 'dal',type:'date',width:130,cellFilter: 'date:"dd/MM/yyyy"'},
					{ name: 'al',type:'date',width:130,cellFilter: 'date:"dd/MM/yyyy"'}
				];
				break;				
		}
		
    };
	vm.addRow=function(){
		vm.data.push({_id:null})
	};
	vm.deleteRow=function(row,grid) {
		if (!grid) return 
		if (!grid.options) return
	   var i = grid.options.data.indexOf(row.entity);
	   grid.options.data.splice(i, 1);
	};
    vm.read = function(){
		var fnd={"cat":vm.cat};
		if (vm.id) fnd._id=vm.id;
        crudService.fnd(fnd, populateData);
    };	
    vm.save = function(row){
		var promise = $q.defer();
		vm.gridApi.rowEdit.setSavePromise(row,promise.promise)
		row.cat=vm.cat
        crudService.set(row,function(r){
			promise.resolve(); //promise.reject();
		});
    };
	vm.remove = function(){	
		var d=vm.gridApi.grid.selection.lastSelectedRow.entity
		vm.data.splice(vm.data.indexOf(d),1)	
        crudService.del(d,function(r){
			//window.location="#/"+vm.cat+"/"
			
		});
    };
    vm.init = function(){
        $(function(){
			var gc=$('.ui-grid')
			var po=gc.position();
			var gh=window.innerHeight-po.top-100;
			if (gh<150) gh=150;			
			gc.height(gh);
		})
        vm.read();
    };	
	vm.init();
}]);