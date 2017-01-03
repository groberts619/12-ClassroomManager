(function() {
    'use strict';

    angular
        .module('app')
        .controller('StudentDetailController', StudentDetailController);

    StudentDetailController.$inject = ['$stateParams','studentFactory', 'toastr'];

    /* @ngInject */
    function StudentDetailController($stateParams, studentFactory, toastr) {
        var vm = this;
        vm.title = 'StudentDetailController';

        vm.studentId = $stateParams.id;
        vm.currentStudent = [];
        vm.updateStudent = updateStudent;
        vm.isNewStudent = true;
        vm.createStudent = createStudent;

        activate();

        ////////////////

        function activate() {
             if (vm.studentId != null) {
                vm.isNewStudent = false;
                studentFactory
                    .getStudentById(vm.studentId)
                    .then(function(response) {
                        vm.currentStudent = response.data;

                });
            } 
        }

        function updateStudent(id, student) {
            studentFactory
                .updateStudent(id, student)
                .then(function(response) {
                    toastr.success("Save successful.");
                })
                .catch(function(error) {
                    toastr.error("Save NOT successful.");
                })
        }

        function createStudent(student) {
            studentFactory
                .createStudent(student)
                .then(function(response) {
                    vm.newStudent = {};
                    toastr.success("Add successful.");
                })
                .catch(function(error) {
                    toastr.error("Add NOT successful.");
                });
        }
    }
})();