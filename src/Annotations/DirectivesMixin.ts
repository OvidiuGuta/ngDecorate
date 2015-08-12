export interface DirectiveFunction extends FunctionConstructor {
	[key: string]: Function;
	$compile?: Function;
	$link?: Function;compile?: Function;
}

export class Directive {
	ddo: angular.IDirective;
	
	protected getDirectiveDefinitionFunction(params: <IDirectiveAnnotationOptions || IComponentAnnotationOptions>, target: Function): angular.IDirectiveFactory {
		let ddo = this.getDDO(params, target);
		let directiveDefinitionFunction = (...injectables: any[]) => {
			for(let i = 0; i < injectables.length; i++) {
				let injectableName = directiveDefinitionFunction.$inject[i];
				(<DirectiveFunction>target)[injectableName] = injectables[i];
			}
			return ddo;
		}
		
		directiveDefinitionFunction.$inject = params.staticInject;
		
		return directiveDefinitionFunction;
	}
	
	protected getDDO(params: IDirectiveAnnotationOptions, target: Function): angular.IDirective {
		let ddo: angular.IDirective = angular.extend({}, {
				bindToController: true,
				compile: (<DirectiveFunction>target).$compile,
				controller: target,
				controllerAs: name,
				link: (<DirectiveFunction>target).$link,
				restrinct: 'AC',
				scope: true,
			}, params.ddo);
			
		return ddo;
	}
}