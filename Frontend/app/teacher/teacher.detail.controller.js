(function() {
    'use strict';

    angular
        .module('app')
        .controller('TeacherDetailController', TeacherDetailController);

    TeacherDetailController.$inject = ['$stateParams', 'teacherFactory', 'toastr'];

    /* @ngInject */
    function TeacherDetailController($stateParams, teacherFactory, toastr) {
        var vm = this;
        vm.title = 'TeacherDetailController';

        vm.teacherId = $stateParams.id;
        vm.currentTeacher = [];
        vm.updateTeacher = updateTeacher;
        vm.isNewTeacher = true;
        vm.createTeacher = createTeacher;


        activate();

        ////////////////

        function activate() {
            if (vm.teacherId != null) {
                vm.isNewTeacher = false;
                teacherFactory
                    .getTeacherById(vm.teacherId)
                    .then(function(response) {
                        vm.currentTeacher = response.data;

                });
            } 
        }

        function updateTeacher(id, teacher) {
            teacherFactory
                .updateTeacher(id, teacher)
                .then(function(response) {
                    toastr.success("Save successful.");
                })
                .catch(function(error) {
                    toastr.error("Save NOT successful.");
                })
        }

        function createTeacher(teacher) {
            teacherFactory
                .createTeacher(teacher)
                .then(function(response) {
                    vm.newTeacher = {};
                    toastr.success("Add successful.");
                })
                .catch(function(error) {
                    toastr.error("Add NOT successful.");
                });
        }
    }
})();