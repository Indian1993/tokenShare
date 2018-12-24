pragma solidity ^0.5.0;

contract walletToken {
    string  public name = "Test Wallet";
    string  public symbol = "WALL";
    uint256 public tokenPrice = 1 ;
    uint256 totalSup;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) balances;
    mapping(address => mapping(address => uint256)) public allowanced;

    constructor (uint256 _initialSupply) public {
        //constructor to initialize amount of tokens
        balances[msg.sender] = _initialSupply;
        totalSup = _initialSupply;
    }


    function balanceOf(address tokenOwner) public view returns (uint balance) {
        return balances[tokenOwner];
    }
    
    function totalSupply() public view returns (uint256){
        return totalSup;
    }

    //event for transaction of tokens b/w accounts
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balances[msg.sender] >= _value);
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowanced[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
    
    function allowance(address _owner, address _spender) public view returns (uint256 remaining){
        return allowanced[_owner][_spender];
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balances[_from]);
        require(_value <= allowanced[_from][msg.sender]);
        balances[_from] -= _value;
        balances[_to] += _value;
        allowanced[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}
