/// <reference path="../typings/jasmine/jasmine.d.ts"/>
/// <reference path="../node_modules/reflect-metadata/reflect-metadata.d.ts"/>
/// <reference path="../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
import * as angular from 'angular'
import ngDecorateTest from './Fixtures/module';
import {ViewAnnotatedClass, ViewAnnotatedClassWithDirectives} from './Fixtures/ViewAnnotatedClass';
import {SimpleDirective} from './Fixtures/DirectiveAnnotatedClass';

export function runTest() {
	describe("ViewAnnotation", function () {
		beforeEach(angular.mock.module('ngDecorate.test'));
		
		it('should get template and templateUrl properties', function() {
			let viewAnnotation = Reflect.getMetadata(4, ViewAnnotatedClass);
			expect(viewAnnotation.getTemplate()).toBe('template');
			expect(viewAnnotation.getTemplateUrl()).toBe('/template.html');
		});
		
		it('should get ViewAnnotation using the static method', function() {
			let viewAnnotation = Reflect.getMetadata(4, ViewAnnotatedClass);
			let ownViewAnnotation = viewAnnotation.constructor.getViewAnnotation(ViewAnnotatedClass);
			
			expect(ownViewAnnotation).toBeDefined();
			expect(ownViewAnnotation.getTemplate()).toBe('template');
			expect(ownViewAnnotation.getTemplateUrl()).toBe('/template.html');
		});
		
		it('should register directives', function() {
			let viewAnnotation = Reflect.getMetadata(4, ViewAnnotatedClassWithDirectives);
			viewAnnotation.registerDirectives(ngDecorateTest);
			
			let directiveAnnotation = Reflect.getMetadata(3, SimpleDirective);
			expect(directiveAnnotation.isRegistered()).toBeTruthy();
		});
		
		it('should register no directives', function() {
			let viewAnnotation = Reflect.getMetadata(4, ViewAnnotatedClass);
			spyOn(viewAnnotation, 'registerDirective');
			viewAnnotation.registerDirectives(ngDecorateTest);
			expect(viewAnnotation.registerDirective).not.toHaveBeenCalled();
		});
	});
}