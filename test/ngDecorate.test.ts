import * as annotationTest from './Annotation.test';
import * as viewAnnotationTest from './viewAnnotation.test';
import * as injectAnnotationTest from './injectAnnotation.test';
import * as controllerAnnotationTest from './controllerAnnotation.test';
import * as serviceAnnotationTest from './serviceAnnotation.test';
import * as directiveAnnotation from './directiveAnnotation.test';
import * as componentAnnotation from './componentAnnotation.test';
import * as stateConfigAnnotation from './stateConfigAnnotation.test';

annotationTest.runTest();
viewAnnotationTest.runTest();
injectAnnotationTest.runTest();
controllerAnnotationTest.runTest();
serviceAnnotationTest.runTest();
directiveAnnotation.runTest();
componentAnnotation.runTest();
stateConfigAnnotation.runTest();