/// <reference path="../typings/jasmine/jasmine.d.ts"/>
/// <reference path="../node_modules/reflect-metadata/reflect-metadata.d.ts"/>
/// <reference path="../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
import * as angular from 'angular'
import ngDecorateTest from './Fixtures/module';
import {bootstrapService} from 'ngDecorate/ngDecorate';
import {SimpleService, SimpleFactory, NoFactoryMethod, SimpleService2} from './Fixtures/ServiceAnnotatedClass';

export function runTest() {
	describe("ServiceAnnotation", function () {
		beforeEach(angular.mock.module('ngDecorate.test'));
		
		let $injector: any, $rootScope: any, $timeout: any;
		beforeEach(inject(function(_$injector_: any, _$rootScope_: any, _$timeout_: any) {
			$injector = _$injector_;
			$rootScope = _$rootScope_;
			$timeout = _$timeout_;
		}));
		
		// Service
		it('should construct service annotation on class', function() {
			let serviceAnnotation = Reflect.getMetadata(2, SimpleService);
			
			expect(serviceAnnotation).toBeDefined();
			expect(serviceAnnotation.params.factory).toBeFalsy();
		});
		
		it('should register service on angular module', function() {
			expect($injector.has('SimpleService')).toBeTruthy();
			
			var simpleService = $injector.get('SimpleService');
			expect(simpleService).toBeDefined();
		});
		
		it('should check if service is registered on angular module', function() {
			expect($injector.has('SimpleService')).toBeTruthy();
			
			let serviceAnnotation = Reflect.getMetadata(2, SimpleService);
			
			expect(serviceAnnotation).toBeDefined();
			expect(serviceAnnotation.isRegistered()).toBeTruthy();
		});
		
		it('should not register service on angular module twice', function() {
			expect($injector.has('SimpleService')).toBeTruthy();
			let serviceAnnotation = Reflect.getMetadata(2, SimpleService);
			spyOn(serviceAnnotation, 'reattach');
			
			bootstrapService(ngDecorateTest, SimpleService);
			
			expect(serviceAnnotation).toBeDefined();
			expect(serviceAnnotation.reattach).not.toHaveBeenCalled();
		});
		
		// Factory
		it('should construct factory service annotation on class', function() {
			let serviceAnnotation = Reflect.getMetadata(2, SimpleFactory);
			
			expect(serviceAnnotation).toBeDefined();
			expect(serviceAnnotation.params.factory).toBeTruthy();
		});
		
		it('should check if factory service is registered on angular module', function() {
			expect($injector.has('SimpleFactory')).toBeTruthy();
			
			var simpleService = $injector.get('SimpleFactory');
			expect(simpleService).toBeDefined();
			
			var serviceInstance = new simpleService();
			expect(serviceInstance.test).toBe('test');
		});
		
		it('should regiser service on angular module', function() {
			expect($injector.has('SimpleFactory')).toBeTruthy();
			
			let serviceAnnotation = Reflect.getMetadata(2, SimpleFactory);
			
			expect(serviceAnnotation).toBeDefined();
			expect(serviceAnnotation.isRegistered()).toBeTruthy();
		});
		
		it('should not register factory service on angular module twice', function() {
			expect($injector.has('SimpleFactory')).toBeTruthy();
			let serviceAnnotation = Reflect.getMetadata(2, SimpleFactory);
			spyOn(serviceAnnotation, 'reattach');
			
			bootstrapService(ngDecorateTest, SimpleFactory);
			
			expect(serviceAnnotation).toBeDefined();
			expect(serviceAnnotation.reattach).not.toHaveBeenCalled();
		});
		
		it('should throw error if no static $factory method is provided for factory service', function() {
			let serviceAnnotation = Reflect.getMetadata(2, NoFactoryMethod);
			expect(function() {serviceAnnotation.register();}).toThrow();
		});
		
		it('should register services', function() {
			let serviceAnnotation = Reflect.getMetadata(2, SimpleService2);
			
			expect(serviceAnnotation.isRegistered()).toBeFalsy();
			serviceAnnotation.constructor.registerServices(ngDecorateTest, [SimpleService2]);			
			expect(serviceAnnotation.isRegistered()).toBeTruthy();
		});
		
		it('should throw when trying to bootstrap without Service annotation', function() {
			let emptyFunction = () => {};
			expect(function() {
				bootstrapService(ngDecorateTest, emptyFunction)
			}).toThrow(new Error(`ngDecorate: No Service annotation on bootstrap target ${emptyFunction}`));
		});
	});
}