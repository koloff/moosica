import _ from 'lodash';

/**
 * With VUE 2 the debounce attribute was removed this function is a workaround to it
 * use it when you want to delay the execution of particular method (search field with data fetching for example)
 * MUST BE BOUND TO THIS CONTEXT!
 * @param fieldPointer pointer to the vue field that is observed
 * @param callback the method that is going to be executed after the delay
 * @param delayTime delay for typing
 */
export default function expensiveTimeout(fieldPointer, callback, delayTime) {
  // TODO
}