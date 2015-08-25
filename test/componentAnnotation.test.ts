/// <reference path="../typings/jasmine/jasmine.d.ts"/>
/// <reference path="../node_modules/reflect-metadata/reflect-metadata.d.ts"/>
/// <reference path="../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
import * as angular from 'angular'
import {bootstrap} from 'ngDecorate/ngDecorate';
import ngDecorateTest from './Fixtures/module';
import {SimpleComponent, SimpleComponentNoView} from './Fixtures/ComponentAnnotatedClass';

export function runTest() {
	describe("ComponentAnnotation", function () {
		beforeEach(angular.mock.module('ngDecorate.test'));
		
		let $rootScope: any
		beforeEach(inject(function(_$rootScope_: any) {
			$rootScope = _$rootScope_;
		}));
		
		it('should construct component annotation', function() {
			let componentAnnotation = Reflect.getMetadata(6, SimpleComponent);
			expect(componentAnnotation).toBeDefined();
		});
		
		it('should throw if component annotated class has no View annotation attached', function() {
			let componentAnnotation = Reflect.getMetadata(6, SimpleComponentNoView);
			expect(function() {componentAnnotation.register()}).toThrow();
		});
		
		it('should register component annotation', function() {
			let componentAnnotation = Reflect.getMetadata(6, SimpleComponent);
			componentAnnotation.register(ngDecorateTest);
			expect(componentAnnotation.isRegistered()).toBeTruthy();
		});
		
		it('should not register component annotation twice', function() {
			let componentAnnotation = Reflect.getMetadata(6, SimpleComponent);
			componentAnnotation.register(ngDecorateTest);
			expect(componentAnnotation.isRegistered()).toBeTruthy();
			spyOn(componentAnnotation, 'reattach');
			componentAnnotation.register(ngDecorateTest);
			expect(componentAnnotation).toBeDefined();
			expect(componentAnnotation.reattach).not.toHaveBeenCalled();
		});
		
		it('should get correct default ddo for directive', function() {
			let componentAnnotation = Reflect.getMetadata(6, SimpleComponent);
			let ddo = componentAnnotation.getDDO({}, SimpleComponent);
			
			expect(ddo.bindToController).toEqual(true);
			expect(ddo.restrict).toEqual('E');
			expect(ddo.scope).toEqual(true);
			expect(ddo.replace).toEqual(true);
			expect(ddo.compile).toEqual(undefined);
			expect(ddo.link).toEqual(SimpleComponent.$link);
			expect(ddo.controller).toEqual(SimpleComponent);
			expect(ddo.controllerAs).toEqual(SimpleComponent.name);
			expect(ddo.template).toEqual('template');
		});
		
		it('should override ddo properties for directive', function() {
			let componentAnnotation = Reflect.getMetadata(6, SimpleComponent);
			let newLinkFunction = () => {}
			let ddo = componentAnnotation.getDDO({
				bindToController: false,
				scope: false,
				restrict: 'AC',
				replace: false,
				link: newLinkFunction,
				controller: newLinkFunction,
				controllerAs: 'NewLinkFunction',
				template: 'newTemplate'
			}, SimpleComponent);
			
			expect(ddo.bindToController).toEqual(false);
			expect(ddo.restrict).toEqual('AC');
			expect(ddo.scope).toEqual(false);
			expect(ddo.replace).toEqual(false);
			expect(ddo.compile).toEqual(undefined);
			expect(ddo.link).toEqual(newLinkFunction);
			expect(ddo.controller).toEqual(newLinkFunction);
			expect(ddo.controllerAs).toEqual('NewLinkFunction');
			expect(ddo.template).toEqual('newTemplate');
		});
		
		it('should get directiveDefinitionFunction', function() {
			let componentAnnotation = Reflect.getMetadata(6, SimpleComponent);
			let ddoFunction = componentAnnotation.getDirectiveDefinitionFunction(componentAnnotation.params, SimpleComponent);
			expect(ddoFunction.$inject).toEqual(['staticInjectable']);
		});
		
		it('should get directiveDefinitionFunction and attach static injected services', function() {
			let componentAnnotation = Reflect.getMetadata(6, SimpleComponent);
			let ddoFunction = componentAnnotation.getDirectiveDefinitionFunction(componentAnnotation.params, SimpleComponent);
			expect(ddoFunction.$inject).toEqual(['staticInjectable']);
			
			ddoFunction('mockService');
			expect(SimpleComponent.staticInjectable).toEqual('mockService');
		});
	});
}