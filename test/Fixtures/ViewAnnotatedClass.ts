/// <reference path="../../dev/ngDecorate.d.ts"/>
import {View} from 'ngDecorate/ngDecorate';
import {SimpleDirective} from './DirectiveAnnotatedClass';


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