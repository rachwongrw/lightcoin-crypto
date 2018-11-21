class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() { // Calculate the balance using the transaction objects
    var balance = 0;
    for (let t of this.transactions) {
      balance += t.value;
    }
    return balance;
  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (this.isAllowed() === false) {
      console.log (`Transaction Denied`);
      return;
    }
    this.time = new Date();
    this.account.addTransaction(this);
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  isAllowed() {
    if ((this.account.balance - this.amount) < 0) {
      return false;
    }
    return true;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }
}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account('crypto');

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount); // passing myAccount into this object is Dependency Injection!
t1.commit();

const t2 = new Withdrawal(50.00, myAccount);
t2.commit();

const t3 = new Withdrawal(80.00, myAccount); // Testing negative withdrawal
t3.commit();

console.log('Closing Balance:', myAccount.balance);

console.log('Transactions', myAccount.transactions);
