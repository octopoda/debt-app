<template>
    <div>
        <BackNav backButtonText="All Loans" edit="false" backLink="/" />
        <section class="thisMonth">
            <h4>This Month</h4>
            <div v-for="loan of loans" :key="loan.id" class="grey lighten-2 card">
                <div class="loanWrapper">
                    <h2>{{ loan.loanName }}</h2>
                    <div class="information">
                        <div class="date" v-html="nextPayment(loan)"></div>
                        <div class="suggested">
                            <span>Suggested</span>
                            {{ makeItRain(loan.minimum * 1.65) }}
                        </div>
                        <div class="mimimum">
                            <span>Minimum:</span>
                            {{ makeItRain(loan.minimum) }}
                        </div>
                    </div>
                </div>
                <div class="button grey lighten-1">
                    <p>Paid It!</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { singleNextPayment, formatMoney } from '~/library/utils';
import BackNav from '~/components/BackNav'
import moment from 'moment';

export default {
    components: {
        BackNav
    },   
    data() {
        return {
            loans: [] 
        }
    },
    asyncData({ app, params, store }) {
        const loans =  store.state.loans.currentLoans;
        
        return {
            loans
        }
    },
    methods: {
        makeItRain(num) {
            return formatMoney(num);
        },
        nextPayment(loan) {
            let date = singleNextPayment(loan.paymentDay)
            const month = moment(date, 'MMMM DD').format('MMM')
            const day = moment(date, 'MMMM DD').format('DD')
            return `<span class="month" style="font-size:14px; display:block; font-weight:400">${month}</span><span style="font-size:37px; display:block; margin-top:-13px; font-weight:400;">${day}</span>`;
        }
    }

}
</script>


<style lang="scss" scoped>
    .thisMonth {
        margin-top:30px;

        h4 {
            font-weight:300;
            margin-bottom:10px;
            font-size:20px;
        }
    }

    .card {
        margin-bottom:20px;
    }

    .loanWrapper {
        padding:10px;
    }


    .information {
        margin-top:12px;
        display:grid;
        grid-template-columns: 3fr 2fr 2fr;
        grid-gap:20px;
        
        div {
            font-size: 22px;
            font-weight:300;
            
            span {
                display: block;
                font-size:12px;
            }
        }
    }


    .date {
        span {
            display:block;
        }
    }

    .day {
        border:1px solid black;
        font-size: 37px;
    }
    


     .button {
        text-align:center;
        font-size: 16px;
        padding:8px;
        
         
         p {
             color: $blue;
             margin:0;
             font-weight:400;
         }
     }
</style>