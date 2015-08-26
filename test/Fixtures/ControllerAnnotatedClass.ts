/// <reference path="../../dist/ngDecorate.d.ts"/>
import {Controller, bootstrap} from 'ngDecorate/ngDecorate';
import ngDecorateTest from './module';

@Controller({
	name: 'TestCtrl'
})
export class TestController {
	contructor() {
		
	}
}


@Controller({
	name: 'TestCtrlRegistered'
})
export class TestControllerRegistered {
	testProperty = 'string';
	contructor() {
		this.testProperty = 'test';
	}
}
bootstrap(ngDecorateTest, TestControllerRegistered);