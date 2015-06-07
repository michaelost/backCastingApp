describe("check backCasgint", function () {
	
	it("checking stakeHolders pannel", function () {
		browser.get('http://localhost:3000/');	
		expect($('div.section1 legend').getText()).toEqual('Оберіть зацікавлені сторони для участі у проекті');
		expect(element.all(by.css('ul.stakeList li')).count()).toBe(9);
		expect($('div.section1 button').getText()).toEqual('Далі');
		expect($('div.selectedStakeHolders').isDisplayed()).toBeTruthy();


	});
	it("checking selecbatleness of stakeHolders ", function () {
		var items =  element.all(by.css('ul.stakeList li'));
	 		items.each(function (n) {
	 			n.click();
	 		});

	 	expect(element.all(by.css('div.selectedStakeHolders tr')).count()).toBe(9);
	 	expect(element.all(by.css('div.selectedStakeHolders tr td:nth-child(1)')).get(0).getText()).toEqual("замовники");
	 	expect(element.all(by.css('div.selectedStakeHolders tr td:nth-child(1)')).get(1).getText()).toEqual("користувачі");
	 	expect(element.all(by.css('div.selectedStakeHolders tr td:nth-child(1)')).get(2).getText()).toEqual("розробники ПЗ");
	 	expect(element.all(by.css('div.selectedStakeHolders tr td:nth-child(1)')).get(3).getText()).toEqual("незалежні тестувальники");
	 	expect(element.all(by.css('div.selectedStakeHolders tr td:nth-child(1)')).get(4).getText()).toEqual("аудитори якості");
	 	expect(element.all(by.css('div.selectedStakeHolders tr td:nth-child(1)')).get(6).getText()).toEqual("експерти");
	 	expect(element.all(by.css('div.selectedStakeHolders tr td:nth-child(1)')).get(5).getText()).toEqual("науковці-дослідники");
	 	expect(element.all(by.css('div.selectedStakeHolders tr td:nth-child(1)')).get(7).getText()).toContain("громадські");
	 	expect(element.all(by.css('div.selectedStakeHolders tr td:nth-child(1)')).get(8).getText()).toContain("соціальні");
	 	
	 	
	 	
	});

	it("checking appearance of compromise table", function () {
		$('div.section1 button').click().then(function () {
			expect($('.compromise').isDisplayed()).toBeTruthy();
		});
	});


	it("checking propertyness of stakeHolders autofilling", function () {
		element.all(by.css('div.selectedStakeHolders tr button.auto')).each(function (n) {
			n.click();
		});
		element.all(by.css('div.selectedStakeHolders tr td:nth-child(2)')).each(function (n) {
			expect(n.getText()).not.toContain("0");
		});


		element.all(by.css('div.selectedStakeHolders tr td:nth-child(1)')).each(function (n) {
			n.click().then( function () {
				expect($('.currentStakeHolderFactors').isDisplayed()).toBeTruthy();
				expect(element.all(by.css('.currentStakeHolderFactors tr')).count()).not.toEqual(0);
				element.all(by.css('.currentStakeHolderFactors tr th:nth-child(0)')).each(function (n) {
					expect(n.getText()).not.toEqual("");
				});
				element.all(by.css('.currentStakeHolderFactors tr th:nth-child(1)')).each(function (n) {
					expect(n.getText()).not.toEqual("");
				});
				element.all(by.css('.currentStakeHolderFactors tr th:nth-child(2)')).each(function (n) {
					expect(n.getText()).not.toEqual("");
				});
				


				
			});
		});


	});

	it("checking building compromise table", function () {
		$('button.buildTable').click().then(function () {
			$('button.buildGr').click().then(function () {
				expect(element.all(by.css('.resultTable tr')).count()).not.toEqual(1);
				element.all(by.css('.resultTable tr')).each(function (n) {
					expect(n.element(by.css('td:nth-of-type(1)')).getText()).not.toEqual("");
					expect(n.element(by.css('td:nth-of-type(2)')).getText()).not.toEqual("");
					expect(n.element(by.css('td:nth-of-type(3)')).getText()).not.toEqual("");
					expect(n.element(by.css('td:nth-of-type(4)')).getText()).not.toEqual("");
					expect(n.element(by.css('td:nth-of-type(5)')).getText()).not.toEqual("");
				});
			});	
		});
	});


	it("checking graph", function () {
		expect($('div.graphic svg').isDisplayed()).toBeTruthy();
		expect($('.compromiseTable').isDisplayed()).toBeTruthy();


		expect(element.all(by.css('.compromiseTable tr')).count()).not.toEqual(1);
				element.all(by.css('.compromiseTable tr')).each(function (n) {
					expect(n.element(by.css('td:nth-of-type(1)')).getText()).not.toEqual("");
					expect(n.element(by.css('td:nth-of-type(2)')).getText()).not.toEqual("");
					expect(n.element(by.css('td:nth-of-type(3)')).getText()).not.toEqual("");
								
				});
	});

	

	it("checking manual filling", function () {
		browser.get('http://localhost:3000/');
		var items =  element.all(by.css('ul.stakeList li'));
	 		items.each(function (n) {
	 			n.click();
	 		});

	 	$('div.section1 button').click().then(function () {
			expect($('.compromise').isDisplayed()).toBeTruthy();
			expect(element.all(by.css('div.selectedStakeHolders tr td:nth-child(1)')).get(0).getText()).toEqual("замовники");
			element.all(by.css('div.selectedStakeHolders tr td:nth-child(1)')).get(0).click().then(function () {
			
				var items = element.all(by.css('.factorsPanel ul li.list-group-item'));
				items.get(0).click();	  	
				$(".factorsChanging .int").sendKeys(5);
				$(".factorsChanging .imp").sendKeys(5);
				items.get(1).click();
				$('.glyphicon-chevron-right').click();
				$(".factorsChanging .int").sendKeys(6);
				$(".factorsChanging .imp").sendKeys(6);
				items.get(2).click();
				$('.glyphicon-chevron-right').click();
				$('.glyphicon-chevron-right').click();
				
				$(".factorsChanging .int").sendKeys(7);
				$(".factorsChanging .imp").sendKeys(7);
				
				expect(element(by.css('.currentStakeHolderFactors tr:nth-of-type(2) td:nth-of-type(1)')).getText()).toEqual('вартість');
				expect(element(by.css('.currentStakeHolderFactors tr:nth-of-type(2) td:nth-of-type(2)')).getText()).toEqual('5');
				expect(element(by.css('.currentStakeHolderFactors tr:nth-of-type(2) td:nth-of-type(3)')).getText()).toEqual('5');
				
				expect(element(by.css('.currentStakeHolderFactors tr:nth-of-type(3) td:nth-of-type(1)')).getText()).toEqual('ресурсоємність');
				expect(element(by.css('.currentStakeHolderFactors tr:nth-of-type(3) td:nth-of-type(2)')).getText()).toEqual('6');
				expect(element(by.css('.currentStakeHolderFactors tr:nth-of-type(3) td:nth-of-type(3)')).getText()).toEqual('6');
				
				expect(element(by.css('.currentStakeHolderFactors tr:nth-of-type(4) td:nth-of-type(1)')).getText()).toEqual('зарплатня');
				expect(element(by.css('.currentStakeHolderFactors tr:nth-of-type(4) td:nth-of-type(2)')).getText()).toEqual('7');
				expect(element(by.css('.currentStakeHolderFactors tr:nth-of-type(4) td:nth-of-type(3)')).getText()).toEqual('7');
				
				
				
					

				browser.sleep(5000);
									
			

			});


		});

	});


	
});