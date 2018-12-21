app={
	web3Provider: null,
	contracts: {},
	account: '0x0',
	loading: false,
	tokenprice: 1,
	admin: web3.eth.address,


	init :function(){
		console.log('app is running')
		return app.initWeb3();
	},

	initWeb3 : function() {
		if (typeof web3 !== 'undefined') {
			app.web3Provider = web3.currentProvider;
		 	web3 = new Web3(web3.currentProvider);
		} 
		else {
		 app.web3Provider = new Web3.providers.HttpProvider("http://localhost:7545");
		 web3 = new Web3(app.web3Provider);
	}
     
	return app.initContracts();

  },

  initContracts: function() {
  	$.getJSON("walletToken.json", function(wallettoken){
  		app.contracts.walletToken = TruffleContract(wallettoken); 
  		app.contracts.walletToken.setProvider(app.web3Provider);
  		app.contracts.walletToken.deployed().then((wallettoken) => {
  			console.log(" wallet token address:", wallettoken.address)
  		})
  		app.eventlisten();
  		return app.main();
  	})

  },

//to refesh page after transaction
  eventlisten: function(){
    
    app.contracts.walletToken.deployed().then((instance) => {
    	instance.Transfer({},{
    		fromBlock: 0,
    		toBlock: 'latest'
    	}).watch((err,event) =>{
    		app.main();
    	})
    })
  },


  main : function() {
  	if(app.loading) {
  		return;
  	}
  	app.loading = true;

  	var loader = $('#loader');
  	var content = $('#content');

  	loader.show();
  	content.hide();

  	web3.eth.getCoinbase((err,account) => {
  		if(err == null) {
  			app.account= account;
  			$('#Address').html(" Present Account : " + account);
  		}
  	})

  	app.contracts.walletToken.deployed().then((instance) =>{
  			walletinstance = instance;
  			console.log(instance)
  			return walletinstance.tokenPrice(); //tokenprice
  	}).then((tokenprice) =>{
  			console.log('tokenprice : '+ tokenprice);
  			app.tokenprice =  tokenprice;
  			$('#Amount').html(" Token Price in Ether : " + tokenprice);
  			return walletinstance.balanceOf(app.account);
  	}).then((balance) =>{
  		console.log(' Account Balance : '+balance);
  		$('#balance').html("Account Balance : " + balance);
  		return walletinstance.name();
  	}).then((name) =>{
  		console.log('name is ' + name);
  		$('#name').html("Wallet Name : " + name);
  		app.loading = false;
  		loader.hide();
  		content.show();
  	})


  		

  },

   transfer: function()
   {
    
    $('#content').hide();
    $('#loader').show();

   	var toaddress     = 	$('#toaddress').val();
   	var numberoftokens = document.getElementById("tokennumber").value;
   
   	app.contracts.walletToken.deployed().then((instance)=>{
   		return instance.transfer(toaddress,numberoftokens, {  from: app.admin })
   		console.log('transfer init')
   	}).then((result) =>{
   		console.log("Tokens Transfered")
   		$('form').trigger('reset')
   		loader.hide();
  		content.show();
   
   	});

   }
}

$(function() {
	$(window).load(function() {
		app.init();
	})

});