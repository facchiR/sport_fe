app.controller('OpzioniController', ['$scope', 'crudService','$routeParams','$http', function($scope, crudService,$routeParams,$http) {
    var vm = $scope;
	vm.id= $routeParams && $routeParams.id || false;
    vm.data = [];
    var populateData = function(response){
        var data = response.data && response.data.docs ||[];
		vm.data=JSON.parse(JSON.stringify(data));
		if (vm.id) vm.d=vm.data[0] || {};
    }
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