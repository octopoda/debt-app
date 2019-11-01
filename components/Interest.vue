<template>
    <v-card flat class="grey lighten-2">
        <v-tabs grow light centered background-color="transparent" v-model="tab">
            <v-tab>Day</v-tab>
            <v-tab>Month</v-tab>
            <v-tab>Year</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab" class="grey lighten-2">
            <v-tab-item class="interestTab">
                <v-card flat class="grey lighten-2">
                    <v-card-text>
                        <p>Today's Interest Payment:</p>
                        <h2 class="money">{{ daily() }}</h2>
                        <nuxt-link to="/compare/day">What could you buy instead?</nuxt-link>    
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item class="interestTab ">
                <v-card flat class="grey lighten-2">
                    <v-card-text >
                        <p>{{ monthName() }} Interest:</p>
                        <h2 class="money">{{ monthly() }}</h2>
                        <nuxt-link to="/compare/month">What could you buy instead?</nuxt-link>    
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item class="interestTab">
                <v-card flat class="grey lighten-2">
                    <v-card-text>
                        <p>{{ year() }} Interest:</p>
                        <h2 class="money">{{ yearly() }}</h2>
                        <nuxt-link to="/compare/year">What could you buy instead?</nuxt-link>    
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</template>

<script>
import { getDailyPayment, getMonthlyPayment, getYearlyPayment, formatMoney } from '~/library/utils';
import moment from 'moment';

export default {
    props: ['loans'],
    data() {
        return {
            tab: null,
            dailyPayment: 0,
            monthlyPayment: 0,
            yearlyPayment: 0
        }
    },
    methods: {
        daily() {
            let payment = 0;
            for(let loan of this.loans) {
                payment  += getDailyPayment(loan.total, loan.apr);
            }
            return formatMoney(payment);
        },
        monthly() {
            let payment = 0;
            
            for(let loan of this.loans) {
                payment += getMonthlyPayment(loan.total, loan.apr)
            }
            return formatMoney(payment)
        },
        yearly() {
            let payment = 0;
            
            for(let loan of this.loans) {
                payment += getYearlyPayment(loan.total, loan.apr)
            }
            return formatMoney(payment)
        },

        monthName() {
            const month = moment().format('MMMM');
            return `${month}'s`;
        },
        year() {
            return moment().format('YYYY')
        }
    }

}
</script>

<style lang="scss" scoped>
    .interestTab {
        padding: 26px 10px;
    }
    .money  {
        font-size: 45px;
        font-weight:300;
        color:#000000;
        margin-top: 21px;
        margin-bottom:21px;
    }

    .v-card__text  {
        font-size: 15px;
    }
</style>