/**
 * Choose component based on predicateFn result
 * Second component is optional, to replicate {predicateFn && Comp1 || null}
 * @param  {function} predicateFn function returning Boolean
 * @param  {function} Comp1 component if pred true
 * @param  {function} [Comp2=null] component if pred false
 * @return {function} react component
 */
function branch(predicateFn, Comp1, Comp2 = null) {
  if (predicateFn == null) throw new Error('branch predicateFn was undefined!');
  return predicateFn ? Comp1 : Comp2;
}

export default branch;
