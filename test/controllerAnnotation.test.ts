/// <reference path="../typings/jasmine/jasmine.d.ts"/>
/// <reference path="../node_modules/reflect-metadata/reflect-metadata.d.ts"/>
/// <reference path="../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
import * as angular from 'angular'
import {bootstrap} from 'ngDecorate/ngDecorate';
import ngDecorateTest from './Fixtures/module';
import {TestController, TestControllerRegistered} from './Fixtures/ControllerAnnotatedClass';

export function runTest() {
	describe("ControllerAnnotation tests", function () {
		beforeEach(angular.mock.module('ngDecorate.test'));
		
		let $rootScope: any, $controller: any;
		beforeEach(inject(function(_$rootScope_: any, _$controller_: any) {
			$controller = _$controller_;
			$rootScope = _$rootScope_;
		}));
		
		it('should construct controller annotation', function() {
			let controllerAnnotation = Reflect.getMetadata(0, TestController);
			expect(controllerAnnotation.getName()).toBe('TestCtrl');
		});

		it('should construct controller annotation', function() {
			let controllerAnnotation = Reflect.getMetadata(0, TestController);
			expect(controllerAnnotation.getName()).toBe('TestCtrl');
			
			let ownAnnotation = controllerAnnotation.constructor.getControllerAnnotation(TestController);
			expect(ownAnnotation.getName()).toBe('TestCtrl');	
		});
		
		it('should register controller', function() {
			let controllerAnnotation = Reflect.getMetadata(0, TestController);
			expect(controllerAnnotation.getName()).toBe('TestCtrl');
			expect(controllerAnnotation.isRegistered()).toBeFalsy();
			
			controllerAnnotation.register(ngDecorateTest);
			expect(controllerAnnotation.isRegistered()).toBeTruthy();
		});
		
		it('should register controller on angular module', function() {
			let $scope = $rootScope.$new();
			
      		var testController = $controller('TestCtrlRegistered', { $scope: $scope });
			expect(testController).toBeDefined();
		});
		
		it('should not register controlleron angular module twice', function() {
			var testController = $controller('TestCtrlRegistered', { $scope: $rootScope.$new() });
			expect(testController).toBeDefined();
			
			let controllerAnnotation = Reflect.getMetadata(0, TestControllerRegistered);
			spyOn(controllerAnnotation, 'reattach');
			
			bootstrap(ngDecorateTest, TestControllerRegistered);
			
			expect(controllerAnnotation).toBeDefined();
			expect(controllerAnnotation.reattach).not.toHaveBeenCalled();
		});
	});
}