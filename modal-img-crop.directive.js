(function () {
    'use strict';

    angular
        .module('bluebookApp')
        .directive('udtImageCrop', udtImageCrop);

    udtImageCrop.$inject = ['$uibModal', '$state', 'Chart'];

    function udtImageCrop($uibModal, $state, Chart) {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/udt/udt-image-crop/udt-img-crop.html',
            scope: {//all this scope value defined, are attr for the directive. Can be used like is explained below
                image: '=',//modal field for the image value
                imageType: '=',//modal field form the image type
                size: '@',//size for the modal, can be: sm or lg[e.g: modalSize="sm"]. This attr modified the size of the modal
                class: '@',
                service: '=',
                ngModel: '=',//modal object(entity) to resolve
                areaType: '@',//form for the image component. Can be square or circle[e.g: class="circle/square"]
                onSave: '&', // function to execute after of
                resultImageSize: '@' //size of the crop image
            },
            link: linkFunc
        };

        return directive;

        /* private helper methods*/

        function linkFunc($scope, element) {
            $scope.openModal = function (element) {
                $uibModal.open({
                    templateUrl: 'app/components/udt/udt-image-crop/udt-img-crop-dialog.html',
                    controller: 'ImageCropDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    // size: $scope.size?$scope.size:'sm',
                    size: 'lg',
                    windowTopClass: 'custom-dialog-styles',
                    resolve: {
                        image: function () {
                            return $scope.image;
                        },
                        imageType: function () {
                            return $scope.imageType?$scope.imageType:'image/jpeg';
                        },
                        areaType: function () {
                            return $scope.areaType?$scope.areaType:'square';
                        },
                        resultImageSize: function () {
                            return $scope.resultImageSize?$scope.resultImageSize:300;
                        }
                    }
                }).result.then(function (result) {}, function (result) {
                    if (result) {
                        $scope.ngModel.picture = result.image;
                        $scope.ngModel.pictureContentType = result.imageType;
                        $scope.image = result.image;
                        $scope.imageType = result.imageType;
                        $scope.onSave($scope.ngModel);
                    }
                });
            };
        }
    }
})();
