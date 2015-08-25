/// <reference path="../typings/jasmine/jasmine.d.ts"/>
/// <reference path="../dev/ngDecorate.d.ts"/>
import {Annotation, AngularAnnotation} from 'ngDecorate/ngDecorate';
import ngDecorateTest from './Fixtures/module';

export function runTest() {
	describe("Annotation", function () {
		
		it('should create and annotate annotation metadata', function() {
			let target = () => {};
			let annotation = new Annotation('myannotation', target);
			Annotation.annotate(annotation);
			
			expect(Annotation.hasAnnotation('myannotation', target)).toBeTruthy();
			expect(Annotation.getAnnotation('myannotation', target)).toBe(annotation);
		});
		
		it('should return true if target has metadata', function() {
			let target = () => {};
			let annotation = new Annotation('myannotation', target);
			annotation.attach();
			
			expect(Annotation.hasAnnotation('myannotation', target)).toBeTruthy();
			expect(Annotation.getAnnotation('myannotation', target)).toBe(annotation);
		});
		
		it('should throw if decorator is not on a class', function() {
			let classDecoratorBody = () => {};
			let classDecorator = Annotation.getClassDecorator(classDecoratorBody);
			
			expect(function() { classDecorator() }).toThrow();
		});
		
		it('should throw if register method is called', function() {
			let angularAnnotation = new AngularAnnotation(0, () => {});
			
			expect(function() { angularAnnotation.register(ngDecorateTest) }).toThrow(new Error('This method is abstract'));
		});
	});
}