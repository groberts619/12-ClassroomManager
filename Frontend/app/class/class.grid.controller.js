(function() {
    'use strict';

    angular
        .module('app')
        .controller('ClassGridController', ClassGridController);

    ClassGridController.$inject = ['classFactory', '$stateParams', 'toastr'];

    /* @ngInject */
    function ClassGridController(classFactory, $stateParams, toastr) {
        var vm = this;
        vm.title = 'ClassGridController';
        vm.classes = [];
       

        vm.removeClass = removeClass;
       
        activate();

        ////////////////

        function activate() {
            classFactory
                .getAllClasses()
                .then(function(response) {
                    vm.classes = response.data;
                });
        }

         function removeClass(_class) {
            classFactory
                .removeClass(_class.classId)
                .then(function(response) {
                    var index = vm.classes.indexOf(_class);
                    vm.classes.splice(index, 1);
                    toastr.success("Class successfully removed.");
                })
                .catch(function(error) {
                    toastr.error("Class NOT removed.");
                });
        };
    }
})();