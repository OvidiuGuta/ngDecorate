/// <reference path="../../dist/ngDecorate.d.ts"/>
import ngDecorateTest from './module';
import {Service, bootstrapService} from 'ngDecorate/ngDecorate';

@Service({
	name: 'SimpleService'
})
export class SimpleService {
	constructor() {
		
	}
}

@Service({
	name: 'SimpleFactory',
	factory: true
})
export class SimpleFactory {
	test: string;
	constructor() {
		this.test = 'test';
	}
	
	static $factory() {
		return SimpleFactory;
	}
}

@Service({
	name: 'SimpleFactory',
	factory: true
})
export class NoFactoryMethod {
	test: string;
	constructor() {
		this.test = 'test';
	}
}

bootstrapService(ngDecorateTest, SimpleService);
bootstrapService(ngDecorateTest, SimpleFactory);

@Service({
	name: 'SimpleService2'
})
export class SimpleService2 {
	constructor() {
		
	}
}