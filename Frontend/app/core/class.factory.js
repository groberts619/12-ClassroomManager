(function() {
    'use strict';

    angular
        .module('app')
        .factory('classFactory', classFactory);

    classFactory.$inject = ['$http'];

    /* @ngInject */
    function classFactory($http) {
        var vm = this;
        var service = {
            createClass: createClass,
            getAllClasses: getAllClasses,
            getClassById: getClassById,
            updateClass: updateClass,
            removeClass: removeClass
        };
        return service;

        ////////////////

        function createClass(_class) {
            return $http.post('http://localhost:51069/api/classes', _class);
        }

        function getAllClasses() {
            return $http.get('http://localhost:51069/api/classes');
        }

        function getClassById(id) {
            return $http.get('http://localhost:51069/api/classes/' + id);
        }

        function updateClass(id, _class) {
            return $http.put('http://localhost:51069/api/classes/' + id, _class);
        }

        function removeClass(id) {
            return $http.delete('http://localhost:51069/api/classes/' + id);
        }
    }
})();