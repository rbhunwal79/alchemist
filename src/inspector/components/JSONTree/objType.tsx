/* eslint-disable @typescript-eslint/no-explicit-any */

import { TNodeType } from "./types";

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export default function objType(obj:any):TNodeType {
	const type = Object.prototype.toString.call(obj).slice(8, -1) as TNodeType;
	if (type === "Object" && typeof obj[Symbol.iterator] === "function") {
		return "Iterable";
	}

	if (type === "Custom" && obj.constructor !== Object && obj instanceof Object) {
		// For projects implementing objects overriding `.prototype[Symbol.toStringTag]`
		return "Object";
	}

	return type;
}
