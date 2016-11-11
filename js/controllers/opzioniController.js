app.controller('OpzioniController', ['$scope', 'crudService','$routeParams','$http', function($scope, crudService,$routeParams,$http) {
	var vm = $scope;
	vm.cat=$routeParams && $routeParams.opz || 'persone';
	vm.id= false;
    vm.data = [];
	vm.gridOptions={}
    var populateData = function(response){
        var data = response.data && response.data.docs ||[];
		vm.data=JSON.parse(JSON.stringify(data));
		vm.gridOptions.data=vm.data
    };
	vm.addRow=function(){
		vm.data.push({})
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
    vm.save = function(){
		vm.d.cat=vm.cat;
		if (vm.id=='new') delete(vm.id)
        crudService.set(vm.d,function(r){
			if (!vm.id){
				window.location="#/"+vm.cat+"/"+r.id
			}
		});
    };
	vm.remove = function(){		
        crudService.del(vm.d,function(r){
			window.location="#/"+vm.cat+"/"
		});
    };
    vm.init = function(){
        vm.read();
    };	
	vm.init();
}]);