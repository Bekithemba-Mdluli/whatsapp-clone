import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Messages from "./dbMessages.js"
import Pusher from "pusher";
import cors from "cors"

dotenv.config({ path: "config.env"})
const app = express();
const PORT = process.env.PORT || 9000;
const CONNECTURL = process.env.connectionURL;


const pusher = new Pusher({
  appId: '1072253',
  key: '8e30429ae68f45dbceea',
  secret: 'f8f5781426d5e1e15c80',
  cluster: 'ap2',
  encrypted: true
});

// Middleware
app.use(express.json());
app.use(cors());

// DB config
mongoose.connect(CONNECTURL, {
	useCreateIndex: true,
	useNewUrlParser:true,
	useUnifiedTopology: true,
});
const db = mongoose.connection;

db.once("open", () => {
	console.log("DB connected")

	const msgCollection = db.collection("messagecontents");

	const changeStream = msgCollection.watch();

	changeStream.on('change', (change) => {
		console.log("A change occured", change.message);


	if(change.operationType === 'insert') {
		const messageDetails = change.fullDocument; 
		pusher.trigger('messages', 'inserted', 
		{
			name: messageDetails.name,
			message: messageDetails.message,
			timestamp: messageDetails.timestamp,
			received: messageDetails.received,
		})
	} else {
		console.log('Error triggering Pusher')
	}
		})
})

app.get("/", (req, res) => {
	res.status(200).send("Hello world")
})

app.get("/api/v1/messages/sync", (req, res) => {
	Messages.find((err, data) => {
		if(err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data)
		}
	})
})

app.post('/api/v1/messages/new', (req, res) => {
	const dbMessage = req.body;

	Messages.create(dbMessage, (err, data) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(201).send(data)
		}
	})
})

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
})