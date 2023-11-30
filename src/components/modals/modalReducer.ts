export interface ModalReducerState {
    isCreateClientOpen: boolean
    isDeleteAllOpen: boolean
    isEditRecordOpen: boolean
}

export interface ModalAction {
    type: "openCreateClient" | "openDeleteAll" | "openEditRecord"
}


// Since our reducer func that the dispatchModal in ClientsView func uses returns a <state_value> boolean if a
// case is satisfied, while at the same time having dispatchModal return void, 
// we can make sure our onClose prop in our modals takes a () => void function as its value

export default function modalReducer(state: ModalReducerState, action: ModalAction) {
    switch (action.type) {
        case "openCreateClient":
            return { ...state, isCreateClientOpen: !state.isCreateClientOpen }
        case "openDeleteAll":
            return { ...state, isDeleteAllOpen: !state.isDeleteAllOpen }
        case "openEditRecord":
            return { ...state, isEditRecordOpen: !state.isEditRecordOpen }
        default:
            throw new Error(`${action.type} does not exist on ModalAction`)
    }
}
