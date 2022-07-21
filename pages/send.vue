<template>
 <v-row justify="center">
   <v-col
     cols="12"
     sm="10"
     md="8"
     lg="6"
   >
     <v-card ref="form">
       <v-card-text>
         <v-text-field
           ref="coinbase"
           v-model="CoinBase"
           label="CoinBase"
           placeholder="******"
           disabled
         ></v-text-field>
         <v-text-field
           ref="balance"
           v-model="Balance"
           label="Balance"
           placeholder="Balance"
           disabled
         ></v-text-field>
         <v-text-field
           ref="password"
           v-model="PassWord"
           label="PassWord"
           placeholder="PassWord"
         ></v-text-field>
         <v-text-field
           ref="sendValue"
           v-model="SendValue"
           :rules="[() => !!SendValue || 'This field is required']"
           label="SendValue(ETH)"
           placeholder="SendValue"
           type="number"
           required
         ></v-text-field>
         <v-autocomplete
           ref="to"
           v-model="To"
           :rules="[() => !!To || 'This field is required']"
           :items="Accounts"
           label="To"
           placeholder="Select..."
           required
         ></v-autocomplete>
         <p> estimateGas : {{EstimateGas}}</p>
       </v-card-text>
       <v-divider class="mt-12"></v-divider>
       <v-card-actions>
         <v-spacer></v-spacer>
         <v-slide-x-reverse-transition>
           <v-tooltip
             v-if="formHasErrors"
             left
           >
             <template v-slot:activator="{ on, attrs }">
               <v-btn
                 icon
                 class="my-0"
                 v-bind="attrs"
                 @click="resetForm"
                 v-on="on"
               >
                 <v-icon>mdi-refresh</v-icon>
               </v-btn>
             </template>
             <span>Refresh form</span>
           </v-tooltip>
         </v-slide-x-reverse-transition>
         <v-btn
           color="primary"
           @click="send"
         >
           Send
         </v-btn>
       </v-card-actions>
     </v-card>
   </v-col>
 </v-row>
</template>
 
<script>
 
 export default {
   data() {
     return {
       CoinBase:"",
       Balance: 0,
       PassWord:"",
       SendValue:1,
       TransactionHash:"",
       Accounts: [],
       To: "",
       EstimateGas:0,
       errorMessages: '',
       formHasErrors: false,
     }
   },
   computed: {
     form () {
       return {
         coinbase: this.CoinBase,
         balance: this.Balance,
         password: this.PassWord,
         sendValue: this.SendValue,
         to: this.To,
       }
     },
   },
   watch:{
     SendValue(){
       if(this.SendValue) {
         this.estimateGas();
       }
     },
     To(){
       if(this.SendValue) {
         this.estimateGas();
       }
     }
   },
   methods: {
     resetForm () {
       this.errorMessages = []
       this.formHasErrors = false
 
       Object.keys(this.form).forEach(f => {
         this.$refs[f].reset()
       })
     },
     estimateGas(){
       this.$web3.eth.estimateGas({
         from: this.CoinBase,
         to: this.To,
         value: this.$web3.utils.toWei('' + this.SendValue),
       }).then((val) => {
         this.EstimateGas = val
       })
     },
     send(){
       this.$web3.eth.personal.unlockAccount(this.CoinBase, this.PassWord).then(()=> {
         this.$web3.eth.sendTransaction({
           from: this.CoinBase,
           to: this.To,
           value: this.$web3.utils.toWei('' + this.SendValue)
         }, (error, txHash) => {
           this.TransactionHash = txHash;
           if (!error) {
             this.$web3.eth.getBalance(this.CoinBase).then(val => this.Balance = this.$web3.utils.fromWei(val));
             alert("Ether Transfer Success");
           } else {
             alert("Ether Transfer Failed");
           }
         });
       }).catch(()=>{
         alert("can't lock account");
       });
     }
   },
   beforeMount(){
     this.$web3.eth.getCoinbase().then(val => {
       this.CoinBase = val;
       this.$web3.eth.getBalance(this.CoinBase).then(val => this.Balance = this.$web3.utils.fromWei(val));
       this.$web3.eth.getAccounts().then(accounts => this.Accounts = accounts.filter(account => account.toUpperCase() !== this.CoinBase.toUpperCase()));
     });
   }
 }
</script>
