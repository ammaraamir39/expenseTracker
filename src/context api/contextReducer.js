const contextReducer = (state, {type,payload})=>{
    let transactions;
    switch (type) {

        case 'DELETE_TRANSACTION':
            transactions = state.filter(st=>st.id !== payload)
            localStorage.setItem('transactions',JSON.stringify(transactions))
            return transactions
            
        
        
        case 'ADD_TRANSACTION':
            transactions = [payload, ...state];
            localStorage.setItem('transactions',JSON.stringify(transactions))
            return transactions
    
        default:
            return state;
    }
}

export default contextReducer;