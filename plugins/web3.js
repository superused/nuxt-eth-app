import Web3 from "web3"

export default async function(context, inject) {
 const httpEndPoint = "http://127.0.0.1:8545" // ここを変更すればチェーンの接続先を変えられます。
 const web3 = new Web3(new Web3.providers.HttpProvider(httpEndPoint))

 inject('web3', web3)
}

