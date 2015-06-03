angular.module("backCastingApp",[])
	.controller("backController",["$scope","stakeHolders",'factors',function ($scope,stakeHolders,factors) {
		
		$scope.stage1Finished = false;
		$scope.stakeHolders = stakeHolders;
		$scope.factors = factors;

		$scope.sortedFactors = {
			social: [],
			economic: [],
			organizational: [],
			technological: []
		}

		$scope.sortFactors = function () {
			$scope.factors.forEach(function (n) {
				switch(n.category) {
					case "economic":
					$scope.sortedFactors.economic.push(n);
					break;

					case "technological":
					$scope.sortedFactors.technological.push(n);
					break;

					case "social":
					$scope.sortedFactors.social.push(n);
					break;

					case "organizational":
					$scope.sortedFactors.organizational.push(n);
					break;
				}
			});
		}

		$scope.projectStakeHolders  = [];

		$scope.endStage1 = function () {
			$scope.stage1Finished = true;
			$scope.sortFactors();
		}

		$scope.addStakeHolder = function (item) {
			if($scope.projectStakeHolders.indexOf(item) == -1) {
				$scope.projectStakeHolders.push(item);	
			}
			
		}

		$scope.deleteStakeHolder = function (item) {
			var index = -1;
			for(var i = 0; i < $scope.projectStakeHolders.length; i++) {
				if( $scope.projectStakeHolders[i].name == item.name) {
					index = i;
					break;
				}
			}
			if (index != -1)
			$scope.projectStakeHolders.splice(index,1);
		}

		$scope.setCurrentStakeHolder = function (holder) {
			$scope.currentStakeHolder = holder;
		}

		$scope.addFactorToStakeHolder = function (factor) {
			var index = -1;
			for(var i = 0; i < $scope.currentStakeHolder.factors.length; i++) {
				if($scope.currentStakeHolder.factors[i].descr == factor.descr) {
					index = i;
				}
			}

			if($scope.currentStakeHolder.factors) {
				if (index == -1)
				$scope.currentStakeHolder.factors.push(factor);
				index = -1;
			}
		}

		$scope.removeFactor = function (item) {
			var index = -1;
			for(var i = 0; i < $scope.currentStakeHolder.factors.length; i++) {
				if($scope.currentStakeHolder.factors[i].descr == item) {
					index = i;
				}
				if(index != -1) {
					$scope.currentStakeHolder.factors.splice(index,1);

				}

			}
		}

		$scope.ind = 0;

		$scope.nextFactor = function () {
			if($scope.ind == $scope.currentStakeHolder.factors.length - 1) {
				$scope.ind = 0;
			} else $scope.ind++;
		}
		$scope.prevFactor = function () {
			if($scope.ind == 0) {
				$scope.ind = $scope.currentStakeHolder.factors.length-1;
			} else $scope.ind--;

		}
		$scope.saveFactorMeasures = function () {

		}

		$scope.currentStakeHolder = {};


	}]);