<template>
    <div>
        <BackNav backButtonText="All Loans" backLink="/" />
         
         <v-tabs grow light centered background-color="transparent" v-model="tab" class="tabs">
            <v-tab @click="daily()">Day</v-tab>
            <v-tab @click="monthly()">Month</v-tab>
            <v-tab @click="yearly()">Year</v-tab>
        </v-tabs>

        <section class="header">
            <h1>What you could buy with {{ makeItRain(payment)}}. </h1>
        </section>
        <!-- Coffee -->
        <section v-if="moreThan(payment, coffee)" class="compareCard grey lighten-2">
            {{ howMany(coffee) }}  Cup{{ plural(howMany(coffee),'s')}} of Coffee
            <div class="image grey lighten-1"></div>
        </section>
        
        <!-- Spotify -->
        <section v-if="moreThan(payment, spotify)" class="compareCard grey lighten-2">
            <div>
                {{ howMany(spotify) }} Spotify Premium Subscription{{ plural(howMany(spotify), 's')}}
            </div>
            <div class="image grey lighten-1"></div>
        </section>
        
        <!-- Oreos -->
        <section v-if="moreThan(payment, oreos)" class="compareCard grey lighten-2">
            {{ howMany(oreos) }} Bag{{ plural(howMany(oreos), 's')}} of Oreo{{ plural(howMany(oreos), 's')}}
            <div class="image grey lighten-1"></div>
        </section>

        <section v-if="moreThan(payment, netflix)" class="compareCard grey lighten-2">
            {{ howMany(netflix) }}  Monthly Netflix Subscription{{ plural(howMany(netflix), 's')}}
            <div class="image grey lighten-1"></div>
        </section>
        
        <!-- Macbook Air -->
        <section v-if="moreThan(payment, macbook)" class="compareCard grey lighten-2">
            {{ howMany(macbook) }} Macbook{{ plural(howMany(macbook), 's')}} Airs
            <div class="image grey lighten-1"></div>
        </section>
    
    </div>
</template>


<script>
import BackNav from '~/components/BackNav'
import { getDailyPayment, getMonthlyPayment, getYearlyPayment, formatMoney } from '~/library/utils';

export default {
    components: { 
        BackNav
    },
    data() {
        return {
            tab: 0,
            loans: null,
            payment: 0.00,
            coffee: 3.25,
            oreos: 2.98,
            spotify: 9.99,
            netflix: 8.99,
            macbook: 999
        }
    },
    asyncData({ app, params, store }) {
        const loans =  store.state.loans.currentLoans
        
        let payment = 0.00;
        let tab = 0;
        switch(params.compare) {
            case 'day' :
                payment = 0.00;
                for(let loan of loans) {
                    payment  += getDailyPayment(loan.total, loan.apr);
                }
                break;
            case 'month' : 
                payment = 0.00;
                tab = 1;
                for(let loan of loans) {
                    payment += getMonthlyPayment(loan.total, loan.apr)
                }
                break;
            case 'year' : 
                payment = 0.00;
                tab = 2 ;
                for(let loan of loans) {
                    payment += getYearlyPayment(loan.total, loan.apr)
                }
                break;
        }

        return {
            loans,
            payment,
            tab
        }
    },  
    methods: {
        plural(number, string) {
            if (number > 1) {
                return string;
            }
        },
        daily() {
            let payment = 0;
            for(let loan of this.loans) {
                payment  += getDailyPayment(loan.total, loan.apr);
            }
            this.tab = 0
            this.payment = payment;
        },
        monthly() {
            let payment = 0;
            
            for(let loan of this.loans) {
                payment += getMonthlyPayment(loan.total, loan.apr)
            }
            this.tab = 1
            this.payment = payment;
        },
        yearly() {
            let payment = 0;
            
            for(let loan of this.loans) {
                payment += getYearlyPayment(loan.total, loan.apr)
            }
            this.tab = 2
            this.payment = payment;
        },
        moreThan(payment, price) {
            return (this.payment < price) ? false : true;
        },
        howMany(price) {
            return Math.floor(this.payment/price);
        },
        makeItRain(num) {
            return formatMoney(num);
        }
    }  
}
</script>


<style lang="scss" scoped>
    .tabs {
        margin-top: 46px
    }

    .header {
        margin-top: 35px;
        margin-bottom: 35px;
         h1 {
              font-size:30px;
         }
    }

    .compareCard {
       margin-bottom:20px; 
       padding: 25px 15px;

       display:grid;
       grid-template-columns: repeat(2, 1fr);
       align-items:center;

       font-size:25px;
       font-weight:300;

       .image {
           width: 100px;
           height: 100px;
           border-radius: 50%;
           justify-self: end;
       }
    }
</style>