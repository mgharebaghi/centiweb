<h1>A Blockchain network with high scalability and very low cost</h1>

Consensus mechanisms are used to confirm trades and generate new blocks in blockchain networks. Usually, these systems either need strong hardware with a high energy consumption, investments from users to enter the network, a very special hardware or a combination of them. Proof of Work(PoW), as an example, needs miners which are computationally powerful to solve complicated puzzles, leading to a high energy consumption and also concentration of power be in the hands of a few. Proof of Stake(PoS) needs stockholders to stake their assets in the network. That gives rise to inequality since having more stocks increases the chances of being block generators. The Proof of Elapsed Time(PoET) consensus mechanism has been near to a solution, but as it needs a very precise time computation, queue management may be affected – even a bit. POET is also vague and could lower the certainty of choosing the block generator. Having more processors and more memory might raise the chance of the generator choosing, it leads to concentration and lack of justice though.

<b>Transactional Consensus</b>

Proof of Patience is a new consensus mechanism to overcome these weak points. In this mechanism choosing the block generators happens in turn and each node in the network has an equal chance of being the next. To do so, the prevailing generator selects a random node as the next generator (leader) to create a new block and that node cannot be the leader again as long as every other node in the network has not created at least one block.
Some points are worth to be mentioned here:

First of all, everything is completely clear and all the network members behold choosing the next leader by the current one.Second, it is totally fair and no member in the network has more chances than the others. Third, no node needs to use a special hardware or keep the value in the network due to the simplicity in the consensus. Unlike POET consensus mechanism, there would be no call for a time computation as each node has to wait until all the members create a block. In fact, the number of the blocks matters, not the time!

A question might arise now that by joining new nodes, would the line for choosing the leader get longer and would the members have to wait for the newcomers to create a block?
This mechanism’s solution: Each new node to the network has to wait a complete round, meaning the new node cannot be the leader until all the members have created a block since the newcomer’s arrival. It in fact should prove its patience to get into the list of leaders.
Another possible question: What if the next generator chosen by the current one has left the network?
The answer: The existing leader would select a new leader and it continues to an online leader be found.
Another question to be asked is on what basis the leader chooses the next?
The answer is simple: Randomly! Only once to be a leader would make the fairness in the network unaffected for the reason that the existing leader will be removed from the queue as soon as they create a block.
There is still one important question. Who would choose the leader if the prevailing leader has left the network?
In this case, Proof of Patience defines the last existing block generator in the network. Remember that the agreed-upon node just chooses the new leader among the eligible nodes and does not have any more chances to create a block.

<b>Network Capacity</b>

For efficient and secure communication, Centichain uses a separate chain as a communication relay. This chain is composed of computers with public and accessible addresses, which are called relay nodes in the Centichain network. Relay nodes have no other task than to deliver messages to validator nodes and of course, they also receive rewards for it. In fact, each validator in the network connects to a relay node, and the relay node sends the messages of the validator using the gossip protocol to other validators that are connected to it. Each relay node can have more than one validator connected. Centichain does not use port forwarding at all to preserve the security of the participants in the network and to make it easier to be a validator in the network. In fact, there is no need to configure the modem for port forwarding or use a VPN to bypass NAT to be a validator in the Centichain network, and it is easy to become a validator without any special configuration and with a home internet. Also, if someone has a public and accessible internet address or even a Virtual Private Server(VPS) or dedicated server, in addition to being a validator, they can also be a relay node to help expand the network and receive more rewards for their activities within their network.
Here, the question arises that what happens to the validators that are connected to it if a relay node leaves the network? In this case, Centichain immediately forces the validator to contact other relay nodes to reconnect to the network. In fact, validators always have a list of existing relay nodes in the network so that as soon as their connection with a relay node is interrupted, they can connect to another relay node to synchronize with the network.

<b>Transaction Legitimacy</b>

Like common blockchain networks, Centichain uses common cryptography to perform secure transactions on the network. Centichain uses the ECDSA public key encryption model for the security of transactions in the presence of relay nodes, and also to prevent MITM attacks. In fact, every message sent on the network will have a signature. Also, for hashing blocks and transactions, Centichain uses the SHA-256 algorithm for the immutability of information. CENTI, Supply, Halving, UTXO CENTI is a cryptocurrency that uses Centichain to record and verify its transactions. In fact, CENTI is the native coin of the Centichain network. All rewards and transaction fees are paid in CENTI. The total supply of CENTI will be 21 million, as a tribute to Bitcoin. Also, initially, the reward for each validator for verifying and recording transactions on the ledger will be 50 CENTI.Of course, it should be noted that Centichain has a halving schedule, and after the production of every 150,000 blocks, the reward for validators will be halved. The number 150,000 is used in Centichain due to the lack of computational puzzles for block production. It should also be noted that the reward for relay nodes will be one percent of the fee for each transaction that is included in the block produced by the validators connected to it. Also, to prevent the double-spending problem, Centichain uses the UTXO model for its transactions. In the UTXO model, each transaction spends some of the UTXOs (unspent transaction outputs) that the sender has. The receiver then receives new UTXOs as a result of the transaction. This model ensures that each UTXO can only be spent once.

<b>Advantages</b>

Bearing the foregoing in mind, Centichain has these benefits:

It does not need to have a special hardware nor stake assets.
It prevents the concentration of power.
It is impervious to 51% attacks.
It is effective and stable.
It is decentralized completely.
It is totally clear.
It is easy to use.
It is safe.
It is anti-inflammatory.
It is fast.

<h2>Conclusion</h2>

Proof of Patience is a new promising consensus mechanism that resolves other consensus mechanisms problems and is apt for blockchain networks which seek high safety, effectiveness and stability. Centichain is also easy to use, and anyone with a simple computer and home internet can use it without the need for any specialized knowledge or skills. Centichain remains anti-inflationary and affordable due to the limited supply of CENTI. Centichain uses the UTXO model for its transactions. In the UTXO model, each transaction spends some of the UTXOs (unspent transaction outputs) that the sender has. The receiver then receives new UTXOs as a result of the transaction. This model ensures that each UTXO can only be spent once.
