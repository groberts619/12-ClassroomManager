(function() {
    'use strict';

    angular
        .module('app')
        .controller('StudentGridController', StudentGridController);

    StudentGridController.$inject = ['studentFactory', 'toastr'];

    /* @ngInject */
    function StudentGridController(studentFactory, toastr) {
        var vm = this;
        vm.title = 'StudentGridController';

        vm.students = [];

        vm.removeStudent = removeStudent;

        activate();

        ////////////////

        function activate() {
             studentFactory
                .getAllStudents()
                .then(function(response) {
                    vm.students = response.data;
                
                });
        }

        function removeStudent(student) {
            studentFactory
                .removeStudent(student.studentId)
                .then(function(response) {
                    var index = vm.students.indexOf(student);
                    vm.students.splice(index, 1);
                    toastr.success("Student successfully removed.");
                })
                .catch(function(error) {
                    toastr.error("Student NOT removed.");
                })
        }
    }
})();