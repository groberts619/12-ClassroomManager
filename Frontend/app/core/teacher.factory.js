(function() {
    'use strict';

    angular
        .module('app')
        .factory('teacherFactory', teacherFactory);

    teacherFactory.$inject = ['$http'];

    /* @ngInject */
    function teacherFactory($http) {
        var vm = this;
        var service = {
            createTeacher: createTeacher,
            getAllTeachers: getAllTeachers,
            getTeacherById: getTeacherById,
            updateTeacher: updateTeacher,
            removeTeacher: removeTeacher
        };
        return service;

        ////////////////

        function createTeacher(teacher) {
            return $http.post('http://localhost:51069/api/teachers', teacher);
        }

        function getAllTeachers() {
            return $http.get('http://localhost:51069/api/teachers');
        }

        function getTeacherById(id) {
            return $http.get('http://localhost:51069/api/teachers/' + id);
        }

        function updateTeacher(id, teacher) {
            return $http.put('http://localhost:51069/api/teachers/' + id, teacher);
        }

        function removeTeacher(id) {
            return $http.delete('http://localhost:51069/api/teachers/' + id);
        }
    }
})();