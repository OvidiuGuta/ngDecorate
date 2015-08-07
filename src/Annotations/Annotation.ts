import {MetadataType, annotate} from '../annotate';

export default class Annotation {
	target: Function;
	type: MetadataType;
	
	constructor(target: Function, type: MetadataType) {
		this.target = target;
		this.type = type;
	}
	
	attach() {
		annotate(this);
	}
}