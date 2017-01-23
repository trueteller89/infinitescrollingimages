// Define the `imageViewer` module
var imageViewer = angular.module('imageViewer', []);

// Define the `ImageViewerController` controller on the `imageViewer` module
imageViewer
    .controller('ImageViewerController', ["$scope", "$http", function ImageViewerController($scope, $http) {
            //$scope.imageWidth = 300;
            //$scope.imageHeigth = 250;
            $scope.imagesToAdd = 3;//how many images add on scrollend
            $scope.infiniteScroll = true;
            $scope.imagesNumber = 12;//number of images to view after initialization
            $scope.scrollBoxHeight = 800;//show the sizes of container div
            $scope.images = [];//array to view
            //imagesCollection  - all photos to show, will duplicate this array few times to get really long array
            var imagesCollection = [
                "http://i1085.photobucket.com/albums/j429/imawakenlove/ANIMAL%20CUTE/ani20.jpg",
                "http://i1085.photobucket.com/albums/j429/imawakenlove/ANIMAL%20CUTE/10-fenglin-conjugal-love-7414-N_l.jpg",
                "http://i245.photobucket.com/albums/gg58/ari_of_shadow/Cute%20Animal/3.jpg",
                "http://i1085.photobucket.com/albums/j429/imawakenlove/ANIMAL%20CUTE/4-gdpc-sankha-wildebeest2.jpg",
                "http://i1085.photobucket.com/albums/j429/imawakenlove/ANIMAL%20CUTE/BIRD3.jpg",
                "http://i1085.photobucket.com/albums/j429/imawakenlove/ANIMAL%20CUTE/ani22.jpg",
                "http://i1085.photobucket.com/albums/j429/imawakenlove/ANIMAL%20CUTE/ani1.jpg",
                "http://i1085.photobucket.com/albums/j429/imawakenlove/ANIMAL%20CUTE/9-gdpc-313199-feeding-10.jpg",
                "http://i1085.photobucket.com/albums/j429/imawakenlove/ANIMAL%20CUTE/ani10.jpg",
                "http://i1085.photobucket.com/albums/j429/imawakenlove/ANIMAL%20CUTE/5-gdpc-barriesalon-lion-play-no-1.jpg",
                "http://i1085.photobucket.com/albums/j429/imawakenlove/ANIMAL%20CUTE/ani11.jpg",
                "http://i1085.photobucket.com/albums/j429/imawakenlove/ANIMAL%20CUTE/ani3.jpg",
                "http://i1085.photobucket.com/albums/j429/imawakenlove/ANIMAL%20CUTE/ani21.jpg",
                "http://i245.photobucket.com/albums/gg58/ari_of_shadow/Cute%20Animal/27.jpg",
                "http://i245.photobucket.com/albums/gg58/ari_of_shadow/Cute%20Animal/4.jpg",
                "http://i245.photobucket.com/albums/gg58/ari_of_shadow/Cute%20Animal/13.jpg",
                "http://i245.photobucket.com/albums/gg58/ari_of_shadow/Cute%20Animal/7.jpg",
                "http://i1085.photobucket.com/albums/j429/imawakenlove/ANIMAL%20CUTE/bird1.jpg",
                "http://i245.photobucket.com/albums/gg58/ari_of_shadow/Cute%20Animal/28.jpg",
                "http://i245.photobucket.com/albums/gg58/ari_of_shadow/Cute%20Animal/16.jpg",
                "http://i245.photobucket.com/albums/gg58/ari_of_shadow/Cute%20Animal/9.jpg",
                "http://i245.photobucket.com/albums/gg58/ari_of_shadow/Cute%20Animal/ew.jpg",
                "http://i1085.photobucket.com/albums/j429/imawakenlove/ANIMAL%20CUTE/ani9.jpg",
                "http://i245.photobucket.com/albums/gg58/ari_of_shadow/Cute%20Animal/29.jpg",
                "http://i245.photobucket.com/albums/gg58/ari_of_shadow/Cute%20Animal/14.jpg",
                "http://i245.photobucket.com/albums/gg58/ari_of_shadow/Cute%20Animal/15.jpg",
                "http://i245.photobucket.com/albums/gg58/ari_of_shadow/Cute%20Animal/8.jpg",
                "http://i1085.photobucket.com/albums/j429/imawakenlove/ANIMAL%20CUTE/1gdpc--50192655-no-4-full-of-happiness-2.jpg",
                "http://i1085.photobucket.com/albums/j429/imawakenlove/ANIMAL%20CUTE/12-benas1971-duo-2524-N_l.jpg",
                "http://i1085.photobucket.com/albums/j429/imawakenlove/ANIMAL%20CUTE/ani5.jpg"
            ];
            var imagesCollection = imagesCollection.concat(imagesCollection).concat(imagesCollection).concat(imagesCollection).concat(imagesCollection).concat(imagesCollection);//really long array to get photos from it
            $scope.images = imagesCollection.slice(0, $scope.imagesNumber);
            var startIndex = $scope.images.length;//remember the number of last image to load different images after deleting-on-click
//loadMoreImages - loamMore on scroll end
            $scope.loadMoreImages = function () {
                if ($scope.infiniteScroll) {
                    $scope.images = $scope.images.concat(imagesCollection.slice(startIndex, startIndex + $scope.imagesToAdd));
                    startIndex = startIndex + $scope.imagesToAdd;
                }
            }
            //deleteImage - delete item in array on click
            $scope.deleteImage = function (item) {
                var index = $scope.images.indexOf(item);
                $scope.images.splice(index, 1);
            }
            //addImages - loadMore images on click on button
            $scope.addImages = function () {
                $scope.images = $scope.images.concat(imagesCollection.slice(startIndex, startIndex + $scope.imagesToAdd));
                startIndex = startIndex + $scope.imagesToAdd;
            }
        }]
    )
    .directive('whenScrolled', function () {
        //directive to loadMoreImages on scrollend
        return {
            link: function (scope, element, attr) {

                var raw = element[0];
                element.bind('scroll', function () {
                    if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                        scope.$apply(attr.whenScrolled);
                    }
                });
            }
        }
    });