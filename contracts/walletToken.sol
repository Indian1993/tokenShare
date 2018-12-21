pragma solidity ^0.5.0;

contract walletToken {
	
	uint256 public totalSupply;       
	string public name = "Test Wallet";
	string public symbol = "WALL";
	uint256 public tokenPrice = 1 ;


	mapping(address => uint256) public balanceOf;
	
	constructor (uint256 _amount) public {
   //constructor to initialize amount of tokens 
		 balanceOf[msg.sender] = _amount;
		 totalSupply= _amount;
	}
	
	//event for transaction of tokens b/w accounts 
	event Transfer(
		address indexed _from,
		address indexed _to,
		uint256 _value
		);

	 //transfer of token to other accounts
	 function transfer(address _to, uint256 _value) public returns (bool success) {

	 	require(balanceOf[msg.sender] >= _value);

	 	balanceOf[msg.sender] -= _value;
	 	balanceOf[_to] += _value;

	 	emit Transfer(msg.sender,_to,_value);

	 	return true;


	 }
	 

}