<template>
    <div>
        <BackNav  backButtonText="All Accounts" edit="true" backLink="/" :editLink="`/edit/${loan.slug}`" />
        <section class="header">
            <div>
                <h3>{{ loan.loanName}}</h3>
            </div>
            <div>
                <h4>
                    <small>Balance: </small>
                    {{ makeItRain(loan.total) }}
                </h4>
                <h4> 
                    <small>Interest Rate:</small>
                    {{ oneHundo(loan.apr) }}
                </h4>
            </div>
        </section>
        <section class="lastPayment">
            <h1>Based on your last payment of {{ makeItRain(loan.payments[loan.payments.length-1].payment) }} you will pay off this loan in November of 2023</h1>
            <p>Add {{ makeItRain(33) }} to your payment to pay it off one year earlier.</p>
        </section>
        <section class="interest">
            <div class="grey lighten-2">
                <p>Day: </p>
                <h3> {{ dayReturns() }}</h3>
            </div>
            <div class="grey lighten-2">
                <p>Month: </p>
                <h3> {{ monthReturns() }}</h3>
            </div>
            <div class="grey lighten-2">
                <p>Year: </p>
                <h3> {{ yearReturns() }}</h3>
            </div>
        </section>
        <section class="nextPayment">
            Your next payment is due on {{ nextPayment() }}.
        </section>
        <section class="paymentHistory">
            <p class="grey lighten-1">Payments</p>
            <ul class="grey lighten-2">
                <li v-for="payment of reversePayments(loan.payments)" :key="`${payment.month}-${payment.year}`">
                    <span>{{ formatMonth(payment.month) }}</span>
                    <span>{{ makeItRain(payment.payment) }}</span>
                </li>
            </ul>
        </section>
        <section class="decrease">
            <h3>Decrease Your APR</h3>

            <div class="grey lighten-2 decreaseWrapper">
                <section class="ccName">
                    <div class="image grey lighten-1"></div>
                    <div class="text">Credit Card Name</div>
                </section>
                <section>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor quos minus provident reiciendis vel rerum nulla laboriosam at tenetur, ex, officia neque debitis possimus officiis suscipit voluptates fugit libero est.</p>
                </section>
                <section class="apr">
                    <p>APR:</p>
                    <h4>15.45% - 23.47%</h4>
                </section>
            </div>
            <section class="apply grey lighten-1">
                    <p>Apply Now</p>
            </section>
        </section>
    </div> 
</template>

<script>
import { makePercent, formatMoney, getDailyPayment, getMonthlyPayment, getYearlyPayment, singleNextPayment } from '~/library/utils';
import moment from 'moment';
import BackNav from '~/components/BackNav'

export default {
    components: {
        BackNav
    },
    data() {
        return {
            loan: null
        }
    },
    asyncData({ app, params, store }) {
        const loan =  store.state.loans.currentLoans.filter(loan =>  loan.slug === params.loan);
        return {
            loan: loan[0]
        }
    },
    methods: {
        oneHundo(num) {
            return makePercent(num);
        },
        makeItRain(num) {
            return formatMoney(num);
        },
        dayReturns() {
            console.log(this.loan.payments[this.loan.payments.length-1].payment);
            const day = getDailyPayment(this.loan.total, this.loan.apr)
            return formatMoney(day);
        },
        monthReturns() {
            const month =  getMonthlyPayment(this.loan.total, this.loan.apr)
            return formatMoney(month);
        },
        yearReturns() {
            const year =  getYearlyPayment(this.loan.total, this.loan.apr)
            return formatMoney(year)
        },
        nextPayment() {
            return singleNextPayment(this.loan.paymentDay)
        },
        formatMonth(monthNumber) {
            return moment(monthNumber, 'MM').format('MMMM')
        },
        reversePayments(array) {
            const newArray = [...array]
            return newArray.reverse();
        }
    }
}
</script>

<style lang="scss" scoped>

.header {
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    align-items:start;
    margin-top: 30px;

    div:last-child {
        justify-content: end;
        text-align:right;
    }
}

.lastPayment {
    margin-top: 57px !important;

    h1 {
        font-size: 27px;
        font-weight:200;
    }

    p {
        font-size: 13px;
    }
}

.interest {
    display:grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    margin-top:44px;
    
    div {
        padding: 5px;
        display:Grid;
        justify-content: center;
    }

    p {
        font-size: 18px;
        text-align:center;
        font-weight:200;
    }

    h3 {
        text-align:center;
        font-size:25px;
        font-weight:400;
    }
}

.nextPayment {
    margin-top: 38px;
    font-weight: 400;
}

.paymentHistory {
    display:grid;
    margin-top:47px;
    
    p {
        text-align:center;
        justify-self: center;
        width:auto;
        margin:auto;
        padding: 5px 12px;
        z-index: 2;
    }

    ul, li {
        margin:0;
        padding:0;
        margin-top: -8px;
        padding: 15px;
    }
    
    ul {
        padding: 5px;
        padding-top: 20px;
    }

    li {
        list-style:none;
        display:grid;
        line-height: 1.6;
        grid-template-columns: repeat(2, 1fr);
        align-items: center;
        
        span:last-child  {
            justify-self:end; 
            text-align:right;
        }
    }
}

.decrease {
    margin-top:47px;

    h3 {
        text-align:center;
    }

    .decreaseWrapper {
        padding: 10px;
    }

    .ccName {
        display:grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap:20px;
        margin-bottom: 20px;
    }

    .image {
       width:80%;
       height:100px;
       margin-top: 20px;
    }

    .text {
        margin-top:20px;
    }

     p {
         font-size:12px;
     }

     .apr {
         p {
             margin:0;
             padding:0;
         }

         h4 {
             font-weight: 400;
         }
     }

     .apply {
        text-align:center;
        font-size: 16px;
        padding:8px;
        
         
         p {
             color: $blue;
             margin:0;
         }
     }
    
}


</style>