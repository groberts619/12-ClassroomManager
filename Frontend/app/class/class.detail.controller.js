(function() {
    'use strict';

    angular
        .module('app')
        .controller('ClassDetailController', ClassDetailController);

    ClassDetailController.$inject = ['$stateParams', 'classFactory', 'teacherFactory', 'studentFactory', 'toastr'];

    /* @ngInject */
    function ClassDetailController($stateParams, classFactory, teacherFactory, studentFactory, toastr) {
        var vm = this;
        vm.title = 'ClassDetailController';

        vm.classId = $stateParams.id;
        vm.currentClass = [];
        vm.updateClass = updateClass;
        vm.isNewClass = true;
        vm.createClass = createClass;
        vm.teachers = [];
        vm.students = [];

        activate();

        ////////////////
        
        function activate() {
             if (vm.classId != null) {
                vm.isNewClass = false;        
                classFactory
                    .getClassById(vm.classId)
                    .then(function(response) {
                        vm.currentClass = response.data;
                        
                    });
                teacherFactory
                    .getAllTeachers()
                    .then(function(response) {
                        vm.teachers = response.data;
                       
                    });
                studentFactory
                    .getAllStudents()
                    .then(function(response) {
                        vm.students = response.data;
                       
                    });
            } else {
                teacherFactory
                    .getAllTeachers()
                    .then(function(response) {
                        vm.teachers = response.data;
                        
                    });
            }
        }

        function updateClass(id, _class) {
            classFactory
                .updateClass(id, _class)
                .then(function(response) {
                    toastr.success("Save successful.");
                })
                .catch(function(error) {
                    toastr.error("Save NOT successful.");
                })
        }

         function createClass(_class) {            
            classFactory
                .createClass(_class)
                .then(function(response) {
                    vm.newClass = {};
                    toastr.success("Add successful.");
                })
                .catch(function(error) {
                    toastr.error("Add NOT successful.");
                });
        }

    }
})();