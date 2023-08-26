import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";
import { useMemo } from "react";

export const useActions = () => {
	const dispatch = useDispatch();
	// To render only one time
	// Otherwise code-cell might recognize createBundle as changed every 0.5 second
	// and it blinks as it's in independent array of useEffect.
	return useMemo(() => { // useMemo remembers state like useState, and repeated whenever something inside the array changes like useEffect
		return bindActionCreators(actionCreators, dispatch);
	},[dispatch]);
};
