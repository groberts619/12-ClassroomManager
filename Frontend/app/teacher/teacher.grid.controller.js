(function() {
    'use strict';

    angular
        .module('app')
        .controller('TeacherGridController', TeacherGridController);

    TeacherGridController.$inject = ['teacherFactory', 'toastr'];

    /* @ngInject */
    function TeacherGridController(teacherFactory, toastr) {
        var vm = this;
        vm.title = 'TreacherGridController';

        vm.teachers = [];

        vm.removeTeacher = removeTeacher;

        activate();

        ////////////////

        function activate() {
            teacherFactory
                .getAllTeachers()
                .then(function(response) {
                    vm.teachers = response.data;
                    
                });
        }

        function removeTeacher(teacher) {
            teacherFactory
                .removeTeacher(teacher.teacherId)
                .then(function(response) {
                    var index = vm.teachers.indexOf(teacher);
                    vm.teachers.splice(index, 1);
                    toastr.success("Teacher successfully removed.");
                })
                .catch(function(error) {
                    toastr.error("Teacher NOT removed.");
                })
        }
    }
})();