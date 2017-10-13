/**
 * Created by PpTMUnited on 2/21/2017.
 */
(function () {
    'use strict';

    angular
        .module('udt')
        .controller('ImageCropDialogController', ImageCropDialogController);

    ImageCropDialogController.$inject = ['$scope', '$uibModalInstance', 'DataUtils', 'areaType', 'image', 'imageType', 'resultImageSize'];

    function ImageCropDialogController($scope, $uibModalInstance, DataUtils, areaType, image, imageType, resultImageSize) {

        var vm = this;

        vm.save = save;
        vm.clear = clear;

        $scope.myImage = '';
        $scope.myCroppedImage = '';
        vm.memeType = 'data:image/jpeg;base64,';

        vm.image = image;
        vm.imageType = imageType;
        vm.resultImageSize = Number(resultImageSize);

        vm.file = {
            image: null,
            type: null
        };
        vm.areaType = areaType;

        load();

        function load() {
            if (image) {
                $scope.myImage = vm.memeType + image;
                vm.file.image = image;
                vm.file.type = imageType;
            }
        }

        $scope.handleFileSelect = function(evt, file) {
            vm.file = file;
            // var fileUp = file;
            var reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function($scope){
                    $scope.myImage=evt.target.result;
                });
            };
            reader.readAsDataURL(file);
        };

        // angular.element(document.querySelector('#fileInput')).on('change',$scope.handleFileSelect);

        function clear () {
            $uibModalInstance.dismiss(null);
            // angular.copy(vm.imageTmp, vm.image);
        }

        function save () {
            var file = {
                image: $scope.myCroppedImage.split(',')[1],
                imageType: vm.file.type
            };
            $uibModalInstance.dismiss(file);
        }
    }
})();

