 var walletToken= artifacts.require("./walletToken");

 contract('walletToken', function(accounts) {
 	var  tokeninstance;
   var price= 1; // in ether

 	it('allocate the total supply upon deployment',function(){

 		return walletToken.deployed().then((instance) =>{
 			tokeninstance = instance;
 			return tokeninstance.name();

 		}).then((name) => {
 			assert.equal(name, 'Test Wallet', 'checks for name equality');
 			return tokeninstance.symbol();
 		}).then((symbol) => {
 			assert.equal(symbol, 'WALL');
         return tokeninstance.tokenPrice();
 		}).then((tokenprice) =>{
            assert.equal(price, tokenprice, 'price is equal')
      })     

 	})


 	it('allocate the total supply upon deployment',function(){
 		return walletToken.deployed().then((instance) => {
 			tokeninstance = instance;
 			return tokeninstance.totalSupply();
 		}).then((total) => {
 			assert.equal(total.toNumber(),100,'sets totaltokes to 1000')
 			return tokeninstance.balanceOf(accounts[0])
 		}).then((balance) => {
 			assert.equal(balance.toNumber(),100,'set balance')
 		})
 	})

   	it('transfer tokens', function(){
   		return walletToken.deployed().then((instance) => {
   			tokeninstance = instance;
   			return tokeninstance.transfer.call(accounts[1],1001);

   		}).then(assert.fail).catch(function(error) {
   			assert(error.message.indexOf('revert') >= 0, 'error message must cointain revert');
   			return tokeninstance.transfer.call(accounts[1],250, {  from: accounts[0] });
   		}).then((success) =>{
   			assert.equal(success, true, 'it returns true');
   			return tokeninstance.transfer(accounts[1],25, {  from: accounts[0] })	;
   		}).then((receipt) =>{

   			assert.equal(receipt.logs.length,1, 'triggers one event');
   			assert.equal(receipt.logs[0].event,'Transfer');
   			assert.equal(receipt.logs[0].args._from, accounts[0]);
   			assert.equal(receipt.logs[0].args._to, accounts[1]);
   			assert.equal(receipt.logs[0].args._value, 250);

   			return tokeninstance.balanceOf(accounts[1]);
   		}).then((balance) => {
   			assert.equal(balance.toNumber(), 250, 'adds the ammount to account');
   			return tokeninstance.balanceOf(accounts[0]);

   		}).then((balance) => {
   			assert.equal(balance.toNumber(), 750, 'subs amount');
           
   		})
         

		})










 })