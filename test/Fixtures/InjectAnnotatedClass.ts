/// <reference path="../../dist/ngDecorate.d.ts"/>
import {Inject} from 'ngDecorate/ngDecorate';

@Inject('inject1')
export class InjectOne {
	
}

@Inject('inject1', 'inject2', 'inject3', 'inject4')
export class InjectMultiple {
	
}