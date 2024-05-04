// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;

contract Dappazon {

  address public owner;
  address[] public users;
  uint256[] public shops;

  struct Item{
    uint256 id;
    string name;
    string category;
    string image;
    uint256 cost;
    uint256 rating;
    uint256 stock;
  }

  struct Order{
    uint256 time;
    Item item;
  }

  mapping (uint256 => Item) public items;
  mapping (address => mapping (uint256 => Order)) public orders;
  mapping (address => uint256) public orderCount;

  event Buy(address buyer,uint256 orderId,uint256 itemId);
  event List(string name, uint256 cost,uint256 quantity);

  modifier onlyOwner(){
    require(msg.sender == owner);
    _;
  }
  constructor() {
        owner = msg.sender;
    }
  
  function list(uint256 _id,string memory _name,string memory _category,string memory _image,uint256 _cost,uint256 _rating,uint256 _stock) public onlyOwner{
    Item memory item = Item(_id,_name,_category,_image,_cost,_rating,_stock);

    items[_id] = item;
    shops.push(_id);

    emit List(_name,_cost,_stock);
  }

  function buy(uint256 _id) public payable {
    Item memory item = items[_id];

    require(msg.value >= item.cost, unicode"余额不足");
    require(item.stock > 0, unicode"商品不足");

    Order memory order = Order(block.timestamp, item);

    orderCount[msg.sender]++;
    orders[msg.sender][orderCount[msg.sender]] = order;
    
    require(orderCount[msg.sender]!=0,unicode"用户已存在");
    users.push(msg.sender);

    items[_id].stock = item.stock - 1;

    emit Buy(msg.sender,orderCount[msg.sender],item.id);
  }

  function withdraw() public onlyOwner{
    (bool success,) = owner.call{value: address(this).balance}("");
    require(success);
  }

  function getBalance() public view returns (uint){
    return address(this).balance;
  }

  function getUsers() public view returns (address[] memory){
    return users;
  }
  function getShops() public view returns (Item[] memory){
    Item[] memory ShopList = new Item[](shops.length);
    for(uint256 i=0;i < shops.length;i++){
      ShopList[i]=items[shops[i]];
    }
    return ShopList;
  }

}
      