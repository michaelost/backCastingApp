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
	
});