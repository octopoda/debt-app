  <template>
  <v-container>
    <section class="alert">
      <i class="material-icons">notifications</i>
    </section>
    <section class="hello">
      <h1>Hello Claire, 
        <small>Way to pay and extra $30.00 on your Car Loan this month!</small>  
      </h1>
    </section>  
    <section class="loan-interest ">
      <Interest :loans="loans" />
    </section>

    <section class="totalDebt">
      <div>Total Debt: </div>
      <div class="money"> {{ addItUp() }}</div>
    </section>
    <section class="loans">
      <ul class="grey lighten-2">
        <li v-for="loan of loans" :key="loan.id"> 
          <nuxt-link :to="`/loan/${loan.slug}`">
            <span>{{ lookGoodYo(loan.loanName) }}</span>
            <span>{{ makeItRain(loan.total) }}</span>
          </nuxt-link>
        </li>
      </ul>
    </section>

    <section class="next-payment">
      <h2>Your next payment is due on {{ this.nextPayment }} for  {{ lookGoodYo(this.nextLoan) }}  </h2>
      <nuxt-link to="/upcoming">View All Upcoming Payments</nuxt-link>
    </section>
  </v-container>
</template>

<script>
import  { mapActions } from 'vuex'
import { titleCase, formatMoney, nextPayment, getData } from '~/library/utils';

import Interest from '~/components/Interest';

export default {
  components:{
    Interest
  },
  data() {
    return {
      loans: {},
      nextPayment: '',
      nextLoan: ''
    }
  },
  async asyncData({ $axios, store }) {
    let data = {}
    
    if (store.state.loans.currentLoans.length === 0 ) {
      const res  = await $axios.get('/loans.json');
      data = res.data.loans;

      for(let loan of data) {
        store.commit('loans/addLoan', loan)
      }
    } else {
      data = store.state.loans.currentLoans;
    }
    
    const next = nextPayment(data);
    
    return { 
      loans: data,
      nextPayment: next.date,
      nextLoan: next.loanName
    }
  },
  methods: {
    ...mapActions({
      setTotalDebt: 'loans/setTotalDebt'
    }),

    lookGoodYo(string) {
      return titleCase(string);
    },

    makeItRain(num) {
      return formatMoney(num)
    },

    addItUp() {
      let total = 0;
      const reduce = this.loans.reduce((total, loan) =>  parseInt(total + loan.total) , 0);
      
      this.setTotalDebt(reduce);
      return formatMoney(reduce);
    }
  }
}
</script>

<style lang="scss" scoped>



.alert i {
  font-size: 34px;
  text-align:right;
  width:100%;
  margin-top: 20px;
}

.hello {
  h1 {
    font-size: 30px;
    line-height: 1.4;
    margin-top: 36px;
    font-weight:100;
    font-size:45px;

    small {
      display:block; 
      font-size: 25px;
    }
  }
}

.loan-interest {
  margin-top:36px;
  
}

.totalDebt {
  display:grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  font-size: 15px;
  margin-top: 52px;

  div:last-child {
    justify-self: end;
    font-size: 21px;
  }
}

.loans {
  ul, li {
    padding:0;
    margin:0;
  }

  ul {
    padding: 10px;
  }

  li {
    list-style:none;
    line-height: 40px;
    font-size: 15px;
    
    
    a {
      display:grid;
      grid-template-columns: repeat(2, 1fr);
      align-items: center;
    }

    a span:last-child {
      justify-self:end;
    }
    
  }
}

.next-payment {
  margin-top:48px;
  padding-bottom: 60px;
  
  h2 {
    font-weight:100;
    font-size: 25px;
    margin-bottom: 12px;
  }

  a {
    font-size: 16px;
  }
}

</style>

