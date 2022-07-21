<template>
 <v-simple-table>
   <template v-slot:default>
     <thead>
       <tr>
         <th class="text-left">Address</th>
         <th class="text-left">Balance</th>
       </tr>
     </thead>
     <tbody>
       <tr v-for="account, index in Accounts" :key="index">
         <td>{{ account.address }}</td>
         <td>{{ account.balance }} ETH</td>
       </tr>
     </tbody>
   </template>
 </v-simple-table>
</template>
<script>
 export default {
   data() {
     return {
       Accounts: [],
     }
   },
   beforeMount(){
     this.$web3.eth.getAccounts().then(accounts => {
       for (const account of accounts) {
         this.$web3.eth.getBalance(account).then(balance => {
           this.Accounts.push({
             "address": account,
             "balance": this.$web3.utils.fromWei(balance),
           })
         })
       }
     });
   },
 }
</script>
