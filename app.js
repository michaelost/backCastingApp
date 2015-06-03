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
			if($scope.currentStakeHolder.factors) {
				$scope.currentStakeHolder.factors.push(factor);
			}
		}

		$scope.currentStakeHolder = {};


	}]);