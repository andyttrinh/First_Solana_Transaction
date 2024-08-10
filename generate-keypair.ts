import "dotenv/config";
import { getKeypairFromEnvironment, addKeypairToEnvFile, airdropIfRequired, getKeypairFromFile } from "@solana-developers/helpers";
import { 
	Keypair,
	Connection,
	Transaction,
	SystemProgram,
	sendAndConfirmTransaction,
	PublicKey,
	LAMPORTS_PER_SOL
} from "@solana/web3.js";
import dotenv from "dotenv";

// Generate a new keypair
//const keypair = Keypair.generate();
//console.log("Public Key: ", keypair.publicKey.toBase58());
//console.log("Secret Key: ", keypair.secretKey);

// Add SOL to account

async function main(){
const suppliedToPublicKey = process.argv[2] || null;
if (!suppliedToPublicKey) {
	console.log("Please provied a public key to send to");
	process.exit(1);
}

const sendKeypair = await getKeypairFromFile("./keypair.json"); 
const toPubkey = new PublicKey(suppliedToPublicKey);

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

//await airdropIfRequired(
//	connection,
//	keypair.publicKey,
//	1 * LAMPORTS_PER_SOL,
//	0.5 * LAMPORTS_PER_SOL
//);


console.log("Loaded Keypair, the destination key, and conncetion to Solana Network");

// Transaction
const transaction = new Transaction();
const LAMPORTS_TO_SEND = 5000;

// Create instruction
const sendSolInstruction = SystemProgram.transfer({
	fromPubkey: sendKeypair.publicKey,
	toPubkey,
	lamports: LAMPORTS_TO_SEND
});

// Add instruction to transaction
transaction.add(sendSolInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [
	sendKeypair,
]);

console.log("TRANSACTION COMPLETE");
console.log("Signature: ", signature) 
};

main();






















 
