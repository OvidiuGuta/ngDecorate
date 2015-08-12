import {IAngularAnnotationOptions} from './IAngularAnnotationOptions';

export interface IServiceAnnotationOptions extends IAngularAnnotationOptions {
	factory: boolean;
};
