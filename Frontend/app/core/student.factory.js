(function() {
    'use strict';

    angular
        .module('app')
        .factory('studentFactory', studentFactory);

    studentFactory.$inject = ['$http'];

    /* @ngInject */
    function studentFactory($http) {
        var vm = this;
        var service = {
            createStudent: createStudent,
            getAllStudents: getAllStudents,
            getStudentById: getStudentById,
            updateStudent: updateStudent,
            removeStudent: removeStudent
        };
        return service;

        ////////////////

       function createStudent(student) {
            return $http.post('http://localhost:51069/api/students', student);
        }

        function getAllStudents() {
            return $http.get('http://localhost:51069/api/students');
        }

        function getStudentById(id) {
            return $http.get('http://localhost:51069/api/students/' + id);
        }

        function updateStudent(id, student) {
            return $http.put('http://localhost:51069/api/students/' + id, student);
        }

        function removeStudent(id) {
            return $http.delete('http://localhost:51069/api/students/' + id);
        }
    }
})();