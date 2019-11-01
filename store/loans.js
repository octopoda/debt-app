export const state = () => ({
    currentLoans: [],
    totalDebt : ''
})


export const getters =  {
    singleLoan: (state) => (slug) => {
        return state.currentLoans.filter(loan => loan.slug === slug)
    }
}


export const mutations = {
    addLoan(state, object) {
        state.currentLoans = [...state.currentLoans, object]
    },
    
    removeLoan(state, object) {
        state.currentLoans = state.currentLoans.filter(loan => object.title  !== loan.title)
    },
    
    setTotalDebt(state, number) {
        state.totalDebt = number;
    }
}


export const actions =  {
    async fetchLoans({commit}) {
        const { data } = await this.$axios.get('/loans.json')
        for(let loan of data.loans) {
            commit('addLoan', loan)
        }
    },

    addLoan({ commit }, object) {
        commit('addLoan', object);
    },
    removeLoan({ commit} , object) {
        commit('removeLoan', object);
    },
    setTotalDebt({ commit }, number) {
        commit('setTotalDebt', number);
    } 
}