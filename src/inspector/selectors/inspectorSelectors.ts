import { createSelector } from "reselect";
import { IRootState } from "../../shared/store";

const all = (state:IRootState) => state.inspector;
 
export const getMainTabID = createSelector([all], s => s.activeSection);
export const getModeTabID = createSelector([all], s => s.inspector.activeTab);

export const getSelectedTargetReference = createSelector([all], s => s.selectedReferenceType);
export const getFilterBySelectedReferenceType = createSelector([all], s => s.filterBySelectedReferenceType);
export const getTargetReference = createSelector([all], s => s.targetReference);
export const getAutoUpdate = createSelector([all],s=>s.settings.autoUpdate);
export const getAllDescriptors = createSelector([all], s => s.descriptors);
export const getSelectedDescriptors = createSelector([all], s => s.descriptors.filter((d) => d.selected === true));
export const getSelectedDescriptorsUUID = createSelector([getSelectedDescriptors], s => s.map(d => d.id));
export const getPropertySettings = createSelector([all],s=>s.settings.properties);
export const getLockedSelection = createSelector([getSelectedDescriptors], s => s.some(d => d.locked));
export const getPinnedSelection = createSelector([getSelectedDescriptors], s => s.some(d => d.pinned));
export const getRemovableSelection = createSelector([getLockedSelection], s => !s);

export const getActiveTargetReference = createSelector([getTargetReference, getSelectedTargetReference], (targets, selected) => {
	const result = targets?.find(item => item.type === selected);
	return (result || null);
});

export const getAddAllowed = createSelector([getActiveTargetReference], s => { 
	if (s) {
		if (s.type === "generator") {
			return true;
		}
		for (const key in s.data) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			if ((s.data as any)[key] === "undefined") {
				return false;
			}
		}
		return true;
	}
	return false;
});
export const getDescriptorsListView = createSelector([getAllDescriptors], (t) => {	
	const pinned = t.filter(i => i.pinned);
	const notPinned = t.filter(i => !i.pinned);
	return [...pinned, ...notPinned];
});
export const getActiveReferenceProperty = createSelector([getActiveTargetReference], (t) => {	
	return t?.data.find(i => i.subType === "property")?.content;	
});
export const getActiveReferenceGuide = createSelector([getActiveTargetReference], (t) => {
	return t?.data.find(i => i.subType === "guide")?.content;
});
export const getActiveReferencePath = createSelector([getActiveTargetReference], (t) => {
	return t?.data.find(i => i.subType === "path")?.content;
});
export const getActiveReferenceChannel = createSelector([getActiveTargetReference], (t) => {
	return t?.data.find(i => i.subType === "channel")?.content;
});
export const getActiveReferenceActionSet = createSelector([getActiveTargetReference], (t) => {
	return t?.data.find(i => i.subType === "actionset")?.content;
});
export const getActiveReferenceActionItem = createSelector([getActiveTargetReference], (t) => {
	return t?.data.find(i => i.subType === "action")?.content;
});
export const getActiveReferenceCommand = createSelector([getActiveTargetReference], (t) => {
	return t?.data.find(i => i.subType === "command")?.content;
});

export const getActiveDescriptors = createSelector([all], s => {
	const selected = s.descriptors.filter(d => d.selected);
	return selected;
});

export const getAutoActiveDescriptor = createSelector([getActiveDescriptors, getAllDescriptors], (activeDescs, all) => {
	if (activeDescs.length === 0) {
		if (all.length) {
			return all[0];			
		}
	}
	return null;
});

export const getHasAutoActiveDescriptor = createSelector([getAutoActiveDescriptor], d => {
	return !!d;
});

export const getActiveDescriptorContent = createSelector([getActiveDescriptors, getAutoActiveDescriptor], (selected, autoActive) => {
	if (selected.length > 1) {
		return "Select 1 descriptor";
	} else if (selected.length === 1) {
		return JSON.stringify(selected[0].originalData, null, 3);		
	} else if (autoActive) {
		return JSON.stringify(autoActive.originalData, null, 3);
	} else {
		return "Add some descriptor";
	}	
});

export const getActiveDescriptorCalculatedReference =createSelector([getActiveDescriptors, getAutoActiveDescriptor], (selected, autoActive) => {
	if (selected.length > 1) {
		return "Select 1 descriptor";
	} else if (selected.length === 1) {
		return JSON.stringify(selected[0].calculatedReference, null, 3);		
	} else if (autoActive) {
		return JSON.stringify(autoActive.calculatedReference, null, 3);
	} else {
		return "Add some descriptor";
	}	
});
export const getActiveDescriptorOriginalReference =createSelector([getActiveDescriptors, getAutoActiveDescriptor], (selected, autoActive) => {
	if (selected.length > 1) {
		return "Select 1 descriptor";
	} else if (selected.length === 1) {
		return JSON.stringify(selected[0].originalReference, null, 3);		
	} else if (autoActive) {
		return JSON.stringify(autoActive.originalReference, null, 3);
	} else {
		return "Add some descriptor";
	}	
});

export const getActiveTargetDocument = createSelector([getActiveTargetReference], (t) => {
	if (!t) { return null;}
	const result = t.data.find(i => i.subType === "document")?.content;

	return (result===undefined) ? null : result;
});

export const getActiveTargetLayer = createSelector([getActiveTargetReference], (t) => {
	if (!t) { return null;}
	const result = t.data.find(i => i.subType === "layer")?.content;

	return (result===undefined) ? null : result;
});

// action

