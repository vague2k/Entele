export interface ModalReducerState {
    isCreateClientOpen: boolean
    isDeleteAllOpen: boolean
    isEditRecordOpen: boolean
}

export interface ModalAction {
    type: "openCreateClient" | "openDeleteAll" | "openEditRecord"
}


export default function modalReducer(state: ModalReducerState, action: ModalAction) {
    switch (action.type) {
        case "openCreateClient":
            return { ...state, isCreateClientOpen: !state.isCreateClientOpen }
        case "openDeleteAll":
            return { ...state, isDeleteAllOpen: !state.isDeleteAllOpen }
        case "openEditRecord":
            return { ...state, isEditRecordOpen: !state.isEditRecordOpen }
        default:
            throw new Error()
    }
}
