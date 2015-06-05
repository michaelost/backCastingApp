angular.module("backCastingApp",[])
	.controller("backController",["$scope","stakeHolders",'factors',function ($scope,stakeHolders,factors) {
		
		$scope.stage1Finished = false;
		$scope.stakeHolders = stakeHolders;
		$scope.factors = factors;

		$scope.compromiseFactors = [];
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

		$scope.autoFill = function (stake) {
			stake.factors = [];
			var min = 3, max = 9,
			factorsCount = Math.floor(Math.random() * (max - min)) + min, 
			prevRand = [],
			curr
			while(factorsCount) {
				while(prevRand.indexOf(curr) != -1) {
					curr = Math.floor(Math.random() * ($scope.factors.length-2 - 1)) + 1;	
				}

				function fact(obj) {
					if (obj){
						this.descr = obj.descr;
					}
				}

				stake.factors.push(new fact($scope.factors[curr]));

				if (stake.factors.length > 1){



				stake.factors[stake.factors.length-1].impact = Math.floor(Math.random() * (10 - 1)) + 1;
				stake.factors[stake.factors.length-1].interest = Math.floor(Math.random() * (10 - 1)) + 1;
				}
				prevRand.push(curr);
				factorsCount--;
				
			}
			console.log(stake.factors);
			stake.factors.shift();

		}

		$scope.currentStakeHolder = {};

		$scope.somethingWrong = false;

		$scope.checkAllIsReady = function () {
			var compromiseFactors = [],
				metrica;
		
		function search(descr) {
				var index = -1;
			
				for(var i = 0; i < compromiseFactors.length; i++) {
					if (compromiseFactors[i].descr == descr ) {
						index = i;
						return i;
					}
				}
				

			
		return index;
		}


			for(var i = 0; i < $scope.projectStakeHolders.length; i++) {
				console.log($scope.projectStakeHolders.length);
				for(var j = 0; j < $scope.projectStakeHolders[i].factors.length; j++) {
				  metrica = search($scope.projectStakeHolders[i].factors[j].descr); 
					if (metrica == -1 ) {
					 var temp = {
							descr : "",
							impacts : [],
							interests : [],
							owners : [],
							category: "",
						};
						temp.descr = $scope.projectStakeHolders[i].factors[j].descr; 
						temp.impacts.push($scope.projectStakeHolders[i].factors[j].impact);
						temp.interests.push($scope.projectStakeHolders[i].factors[j].interest);
						temp.owners.push($scope.projectStakeHolders[i].name);
						temp.category = $scope.projectStakeHolders[i].factors[j].category;
					
						compromiseFactors.push(temp);
					}
					else {
						compromiseFactors[metrica].impacts.push($scope.projectStakeHolders[i].factors[j].impact);
						compromiseFactors[metrica].interests.push($scope.projectStakeHolders[i].factors[j].interest);
						compromiseFactors[metrica].owners.push($scope.projectStakeHolders[i].name);
						
					}

				}
			}
			console.log("================");
			console.log(compromiseFactors);
			$scope.compromiseFactors = compromiseFactors;
			
		}


		$scope.drawGraph = function () {

			var s = new Snap(1000,1000);
		s.line(0,0,1000,0).attr({
  			stroke: "#000",
 			 strokeWidth: 5,
 			 strokeLinecap:"round"
			})
	    s.line(0,0,0,1000).attr({
			 stroke: "#000",
 			 strokeWidth: 5,
 			 strokeLinecap:"round"
			});
	    s.line(0,1000,1000,1000).attr({
	    	 stroke: "#000",
 			 strokeWidth: 5,
 			 strokeLinecap:"round"
	    });
	    s.line(1000,1000,1000,0).attr({
	    	 stroke: "#000",
 			 strokeWidth: 5,
 			 strokeLinecap:"round"
	    });
	   /*interes coordinates*/
	   s.line(1,30,900,30).attr({
	   		stroke: "red",
	   		strokeWidth: 15,
 			strokeLinecap:"round"
	   });
	   s.line(900,30,850,60).attr({
	   		stroke: "red",
	   		strokeWidth: 15,
 			strokeLinecap:"round"
	   });
	   s.line(900,30,850,10).attr({
	   		stroke: "red",
	   		strokeWidth: 15,
 			strokeLinecap:"round"
	   });

	   s.text(800,80,"interes").attr({
				fill: "#200000",
				fontSize: "40px" 
			});

	   /*impact coordinate line*/

	   s.line(30,0,30,900).attr({
	   		stroke: "red",
	   		strokeWidth: 15,
 			strokeLinecap:"round"
	   });
	   s.line(30,900,60,850).attr({
	   		stroke: "red",
	   		strokeWidth: 15,
 			strokeLinecap:"round"
	   });
	   s.line(30,900,10,850).attr({
	   		stroke: "red",
	   		strokeWidth: 15,
 			strokeLinecap:"round"
	   });

	   s.text(50,900,"impact").attr({
				fill: "#200000",
				fontSize: "40px" 
			});


	   

	   


	    for (var i = 0; i < $scope.compromiseFactors.length; i++) {
			var sum = 0, count = 0;
			$scope.compromiseFactors[i].impacts.forEach(function (n) {
				sum+=n; 
				count+=1;
			});
			$scope.compromiseFactors[i].avImpact = Math.floor(sum / count);
			sum = 0; count = 0;

			$scope.compromiseFactors[i].interests.forEach(function (n) {
				sum +=n;
				count+=1;
			});
			$scope.compromiseFactors[i].avInterest = Math.floor(sum / count);
			sum = 0; count = 0;
			$scope.compromiseFactors[i].number = i;
		}

		console.log("========compromiseFactors====");
		for(var i = 0; i < $scope.compromiseFactors.length; i++) {
			console.log($scope.compromiseFactors[i]);
		}

		/*draw circles*/


		$scope.compromiseFactors.forEach( function (n) {
			s.circle(n.avInterest*100,n.avImpact*100,50).attr({
				fill: "#404040" 
			});
			s.text(n.avInterest*100,n.avImpact*100,n.number).attr({
				fill: "#200000",
				fontSize: "40px" 
			});
		});





		}



	}]);