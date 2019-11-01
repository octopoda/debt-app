import moment from 'moment';
import _ from 'underscore';


export const getData = async (store) => {
  if (_.isEmpty(store.state.loans.currentLoans)) {
    await store.dispatch('loans/fetchLoans');
    console.log('here', store.state.loans);
  } else {
    return store.state.loans.currentLoans
  }
}

/**
 * Format Money in USD
 * @param {int} number
 */
export const formatMoney = number => {
    return new Intl.NumberFormat('en-us', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(number)
  }
  
  /**
   * Make a string into title case
   * @param {string} string
   */
  export const titleCase = string => {
    return string.replace(/\w\S*/g, function(string) {
      return string.charAt(0).toUpperCase() + string.substr(1).toLowerCase()
    })
  }

  export const makePercent = num => {
    const percent = num*100;
    return `${percent.toFixed(2)}%`;
  }
  

  export const getDailyPayment = (total, apr) =>  {
    const dailyApr = apr/365;
    return total * dailyApr;
  }

  export const getMonthlyPayment = (total, apr) =>  {
    const dailyApr = apr/365;
    const daysInMonth = moment().daysInMonth();
    return (total * dailyApr) * daysInMonth;
  }


  export const getYearlyPayment = (total, apr) =>  {
    return total * apr;
  }

  export const singleNextPayment = (date) => {
    const nextDate = moment().format('D');
    const daysInMonth = moment().daysInMonth();
    
    const month = moment().format('MM')
    const year = moment().format('YYYY')

    if (nextDate > date) {
      date = `${year}-${parseInt(month)+1}-${date}`;
    } else {
      date = `${year}-${parseInt(month)}-${date}`;
    }

    return moment(date, 'YYYY-MM-DD').format('MMMM Do')
  }

  export const nextPayment = (loans) => {
    const nextDate = moment().format('D');
    const daysInMonth = moment().daysInMonth();
    const month = moment().format('MM')
    const year = moment().format('YYYY')
    
    const paymentDays = loans.map(loan => loan.paymentDay * 1);
    const sortedDays = paymentDays.sort((a, b) => a-b);
    
    const min = Math.min(...paymentDays);
    const max = Math.max(...paymentDays);
    let date = `${year}-${month}-`;
    let loan = {};
    if (nextDate > max) {
        date = `${year}-${parseInt(month)+1}-${paymentDays[0]}`;
        loan = loans.filter(loan => loan.paymentDay === paymentDays[0])
    }
    else if (nextDate < min) {
        date = `${year}-${month}-${paymentDays[0]}`;
        loan = loans.filter(loan => loan.paymentDay === paymentDays[0])
    }
    else {
        for(let i = 0; i < paymentDays.length; i ++) {
            if (nextDate > paymentDays[i] && nextDate < paymentDays[i+1]) {
                date = `${year}-${month}-${paymentDays[i+1]}`;
                loan = loans.filter(loan => loan.paymentDay === paymentDays[i+1])
                continue;
            }    
        }
    }

    return {
        date: moment(date, 'YYYY-MM-DD').format('MMMM Do'),
        loanName: loan[0].loanName
    } 
  }

  

  

