/// <reference path="../typings/jasmine/jasmine.d.ts"/>
/// <reference path="../node_modules/reflect-metadata/reflect-metadata.d.ts"/>
/// <reference path="../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
import * as angular from 'angular'
import {bootstrap} from 'ngDecorate/ngDecorate';
import ngDecorateTest from './Fixtures/module';
import {SimpleStateConfig, StateConfigNoController, 
	StateConfigNoView, BootstrapedStateConfig,
	SimpleStateConfigWithDirectives} from './Fixtures/StateConfigAnnotatedClass';

export function runTest() {
	describe("StateConfigAnnotation", function () {
		beforeEach(angular.mock.module('ngDecorate.test'));
		
		let $rootScope: any
		beforeEach(inject(function(_$rootScope_: any) {
			$rootScope = _$rootScope_;
		}));
		
		it('should construct stateConfig annotation', function() {
			let stateConfigAnnotation = Reflect.getMetadata(5, SimpleStateConfig);
			expect(stateConfigAnnotation).toBeDefined();
		});
		
		it('should register stateConfig', function() {
			let stateConfigAnnotation = Reflect.getMetadata(5, SimpleStateConfig);
			expect(stateConfigAnnotation.isRegistered()).toBeFalsy();
			stateConfigAnnotation.register(ngDecorateTest);
			expect(stateConfigAnnotation.isRegistered()).toBeTruthy();
		});
		
		it('should not register stateConfig twice', function() {
			let stateConfigAnnotation = Reflect.getMetadata(5, SimpleStateConfig);
			expect(stateConfigAnnotation.isRegistered()).toBeTruthy();
			
			spyOn(stateConfigAnnotation, 'reattach');
			stateConfigAnnotation.register(ngDecorateTest);
			expect(stateConfigAnnotation.reattach).not.toHaveBeenCalled();
		});
		
		it('should register directives stateConfig', function() {
			let stateConfigAnnotation = Reflect.getMetadata(5, SimpleStateConfigWithDirectives);
			let viewAnnotation = Reflect.getMetadata(4, SimpleStateConfigWithDirectives);
			
			spyOn(viewAnnotation, 'registerDirective');
			stateConfigAnnotation.register(ngDecorateTest);
			
			expect(viewAnnotation.registerDirective).toHaveBeenCalled();
			expect(viewAnnotation.registerDirective.calls.count()).toBe(2);
		});
		
		it('should throw if target class has no Controller annotation', function() {
			let stateConfigAnnotation = Reflect.getMetadata(5, StateConfigNoController);
			expect(function() {
				stateConfigAnnotation.register(ngDecorateTest)
				}).toThrow(new Error(`ngDecorate: No Controller annotation on class ${StateConfigNoController}!`));
		});
		
		it('should throw if target class has no View annotation', function() {
			let stateConfigAnnotation = Reflect.getMetadata(5, StateConfigNoView);
			expect(function() { 
				stateConfigAnnotation.register(ngDecorateTest) 
				}).toThrow(new Error(`ngDecorate: No View annotation on class ${StateConfigNoView}!`));
		});
		
		it('should bootstrap StateConfig', function() {
			let stateConfigAnnotation = Reflect.getMetadata(5, BootstrapedStateConfig);
			expect(stateConfigAnnotation.isRegistered()).toBeTruthy();
			
			let controllerAnnotation = Reflect.getMetadata(0, BootstrapedStateConfig);
			expect(controllerAnnotation.isRegistered()).toBeTruthy();
		});
	});
}