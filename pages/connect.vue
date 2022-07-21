<template>
 <v-simple-table>
   <template v-slot:default>
     <thead>
       <tr>
         <th class="text-left">
           Name
         </th>
         <th class="text-left">
           Value
         </th>
       </tr>
     </thead>
     <tbody>
       <tr>
         <td>Host</td>
         <td>{{Host}}</td>
       </tr>
       <tr>
         <td>CoinBase</td>
         <td>{{CoinBase}}</td>
       </tr>
       <tr>
         <td>HashRate</td>
         <td>{{HashRate}}</td>
       </tr>
       <tr>
         <td>IsMining</td>
         <td>{{IsMining}}</td>
       </tr>
       <tr>
         <td>GasPrice</td>
         <td>{{GasPrice}}</td>
       </tr>
       <tr>
         <td>BlockNumber</td>
         <td>{{BlockNumber}}</td>
       </tr>
       <tr>
         <td>NetId</td>
         <td>{{NetId}}</td>
       </tr>
       <tr>
         <td>PeerCount</td>
         <td>{{PeerCount}}</td>
       </tr>
     </tbody>
   </template>
 </v-simple-table>
</template>

<script>
export default {
 name: 'ConnectPage',
 data() {
   return {
     Host: "",
     IsMining: false,
     CoinBase: "",
     HashRate: 0,
     BlockNumber:0,
     GasPrice:0,
     NetId:0,
     PeerCount:0,
   }
 },
 beforeMount(){
   this.Host = this.$web3.currentProvider.host;
   this.$web3.eth.getCoinbase().then(val => this.CoinBase = val);
   this.$web3.eth.isMining().then(val => this.IsMining = val);
   this.$web3.eth.getHashrate().then(val => this.HashRate = val);
   this.$web3.eth.getGasPrice().then(val => this.GasPrice = val);
   this.$web3.eth.getBlockNumber().then(val => this.BlockNumber = val);
   this.$web3.eth.net.getId().then(val => this.NetId = val);
   this.$web3.eth.net.getPeerCount().then(val => this.PeerCount = val);
 },
}
</script>
