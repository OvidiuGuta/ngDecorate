/// <reference path="../../dist/ngDecorate.d.ts"/>
import {View} from 'ngDecorate/ngDecorate';
import {SimpleDirective} from './DirectiveAnnotatedClass';
import {SimpleComponent} from './ComponentAnnotatedClass';


@View({
	template: 'template',
	templateUrl: '/template.html'
})
export class ViewAnnotatedClass {
	constructor() {
		
	}
}

@View({
	template: 'template',
	directives: [SimpleDirective]
})
export class ViewAnnotatedClassWithDirectives {
	
}

@View({
	template: 'template',
	directives: [SimpleComponent]
})
export class ViewAnnotatedClassWithComponent {
	
}