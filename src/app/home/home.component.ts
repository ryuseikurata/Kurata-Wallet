import { Component, OnInit } from '@angular/core';
import {
  NEMLibrary,
  NetworkTypes,
  Address,
  Account,
  TransferTransaction,
  TimeWindow,
  EmptyMessage,
  TransactionHttp,
  SignedTransaction
} from "nem-library";
import { XEM } from "nem-library/dist/src/models/mosaic/XEM";
import { privateKey } from '../../models/secret';
import { nodes } from '../../models/nodes';

NEMLibrary.bootstrap(NetworkTypes.MAIN_NET);
const cosignerAccount = Account.createWithPrivateKey(privateKey);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public address = ""
  public amount = 0
  constructor() { }

  ngOnInit() {
  }
public async transfer() {
  let address = new Address(this.address);
  const transferTransaction = TransferTransaction.create(
    TimeWindow.createWithDeadline(),
    address,
    new XEM(this.amount),
    EmptyMessage
);
  const transactionHttp = new TransactionHttp(nodes);
  const signedTransaction: SignedTransaction = cosignerAccount.signTransaction(transferTransaction);
  transactionHttp.announceTransaction(signedTransaction).subscribe( x => console.log(x));
}
}
