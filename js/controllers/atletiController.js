app.controller('AtletiController', ['$scope', 'AtletiService', //'$routeParams',
    function ($scope, AtletiService/*, $routeParams*/) {
        var vm = $scope;

        vm.item = {};
        vm.items = [];

        vm.loadItem = function (response) {
            vm.item = response.data && response.data.item || vm.resetItem();
            vm.message = response.data && response.data.message || "";
        };

        vm.resetItem = function () {
            return {
                nome: '',
                telefono: '',
                cf: '',
                datanascita: null,
                sesso: ''
            }
        };

        vm.loadItems = function (response) {
            var list = response.data && response.data.items || [];
            vm.items.length = 0;
            angular.forEach(list, function (v, k) {
                vm.items.push(v);
            });
            vm.message = response.data && response.data.message || "";
        };

        vm.save = function () {
            console.info(vm.item);
            AtletiService.saveItem(vm.item, vm.loadItems);
            vm.resetItem();
        };

        vm.delete = function (id) {
            AtletiService.delItem(id, vm.loadItems);
        };

        vm.init = function () {
            //vm.id = $routeParams && $routeParams.id || false;
            if (vm.id) {
                AtletiService.getItem(vm.id, vm.loadItem);
            } else {
                AtletiService.getList(vm.loadItems);
                vm.item = vm.resetItem();
            }
        };

        vm.init();
    }]);