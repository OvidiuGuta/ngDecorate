/// <reference path="../typings/jasmine/jasmine.d.ts"/>
/// <reference path="../node_modules/reflect-metadata/reflect-metadata.d.ts"/>
/// <reference path="../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
import * as angular from 'angular'
import {bootstrap} from 'ngDecorate/ngDecorate';
import ngDecorateTest from './Fixtures/module';
import {SimpleDirective, DirectiveWithInjects} from './Fixtures/DirectiveAnnotatedClass';

export function runTest() {
	describe("DirectiveAnnotation", function () {
		beforeEach(angular.mock.module('ngDecorate.test'));
		
		let $rootScope: any
		beforeEach(inject(function(_$rootScope_: any) {
			$rootScope = _$rootScope_;
		}));
		
		it('should construct directive annotation', function() {
			let directiveAnnotation = Reflect.getMetadata(3, SimpleDirective);
			expect(directiveAnnotation).toBeDefined();
		});
		
		it('should register directive annotation', function() {
			let directiveAnnotation = Reflect.getMetadata(3, SimpleDirective);
			directiveAnnotation.register(ngDecorateTest);
			expect(directiveAnnotation.isRegistered()).toBeTruthy();
		});
		
		it('should not register directive annotation twice', function() {
			let directiveAnnotation = Reflect.getMetadata(3, SimpleDirective);
			directiveAnnotation.register(ngDecorateTest);
			expect(directiveAnnotation.isRegistered()).toBeTruthy();
			spyOn(directiveAnnotation, 'reattach');
			directiveAnnotation.register(ngDecorateTest);
			expect(directiveAnnotation).toBeDefined();
			expect(directiveAnnotation.reattach).not.toHaveBeenCalled();
		});
		
		it('should get correct ddo for directive', function() {
			let directiveAnnotation = Reflect.getMetadata(3, SimpleDirective);
			let ddo = directiveAnnotation.getDDO({}, SimpleDirective);
			
			expect(ddo.bindToController).toEqual(true);
			expect(ddo.restrict).toEqual('AC');
			expect(ddo.scope).toEqual(true);
			expect(ddo.replace).toEqual(false);
			expect(ddo.compile).toEqual(undefined);
			expect(ddo.link).toEqual(SimpleDirective.$link);
			expect(ddo.controller).toEqual(SimpleDirective);
			expect(ddo.controllerAs).toEqual(SimpleDirective.name);
		});
		
		it('should override ddo properties for directive', function() {
			let directiveAnnotation = Reflect.getMetadata(3, SimpleDirective);
			let newLinkFunction = () => {}
			let ddo = directiveAnnotation.getDDO({
				bindToController: false,
				scope: false,
				restrict: 'E',
				replace: true,
				link: newLinkFunction,
				controller: newLinkFunction,
				controllerAs: 'NewLinkFunction'
			}, SimpleDirective);
			
			expect(ddo.bindToController).toEqual(false);
			expect(ddo.restrict).toEqual('E');
			expect(ddo.scope).toEqual(false);
			expect(ddo.replace).toEqual(true);
			expect(ddo.compile).toEqual(undefined);
			expect(ddo.link).toEqual(newLinkFunction);
			expect(ddo.controller).toEqual(newLinkFunction);
			expect(ddo.controllerAs).toEqual('NewLinkFunction');
		});
		
		it('should get directiveDefinitionFunction', function() {
			let directiveAnnotation = Reflect.getMetadata(3, DirectiveWithInjects);
			let ddoFunction = directiveAnnotation.getDirectiveDefinitionFunction(directiveAnnotation.params, DirectiveWithInjects);
			expect(ddoFunction.$inject).toEqual(['staticInjectable']);
		});
		
		it('should get directiveDefinitionFunction and attach static injected services', function() {
			let directiveAnnotation = Reflect.getMetadata(3, DirectiveWithInjects);
			let ddoFunction = directiveAnnotation.getDirectiveDefinitionFunction(directiveAnnotation.params, DirectiveWithInjects);
			expect(ddoFunction.$inject).toEqual(['staticInjectable']);
			
			ddoFunction('mockService');
			expect(DirectiveWithInjects.staticInjectable).toEqual('mockService');
		});
	});
}