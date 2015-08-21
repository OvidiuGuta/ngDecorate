/// <reference path="../typings/jasmine/jasmine.d.ts"/>
/// <reference path="../node_modules/reflect-metadata/reflect-metadata.d.ts"/>
import {InjectOne, InjectMultiple} from './Fixtures/InjectAnnotatedClass';

export function runTest() {
	describe("InjectAnnotation tests", function () {
		
		it('should have injectables property with one element', function() {
			let injectAnnotation = Reflect.getMetadata(1, InjectOne);
			
			expect(injectAnnotation.injectables.length).toBe(1);
		});
		
		it('should have injectables property with one element', function() {
			let injectAnnotation = Reflect.getMetadata(1, InjectMultiple);
			
			expect(injectAnnotation.injectables.length).toBe(4);
		});
		
		it('should have static $inject property on class with one element', function() {
			expect(InjectOne.$inject.length).toBe(1);
			expect(InjectOne.$inject).toEqual(['inject1']);
		});
		
		it('should have static $inject property on class with 4 elements', function() {
			expect(InjectMultiple.$inject.length).toBe(4);
			expect(InjectMultiple.$inject).toEqual(['inject1', 'inject2', 'inject3', 'inject4']);
		});
	});
}