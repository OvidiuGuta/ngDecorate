import {IAngularAnnotationOptions} from './IAngularAnnotationOptions';

export interface IControllerAnnotationOptions extends IAngularAnnotationOptions {
	appInjector: Function[];
};