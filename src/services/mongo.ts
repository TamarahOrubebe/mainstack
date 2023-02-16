
import mongoose from 'mongoose';

//Connect to Mongo Atlas with URL

mongoose.connection.once("open", () => {
	console.log("Mongodb connection is ready");
});

mongoose.connection.on("error", (error) => {
	console.error(error);
});

async function connect(MONGO_URL: string) {
	try {
		await mongoose.connect(MONGO_URL);
		console.log("connected to Mongo Atlas");
	} catch (error) {
		console.error(error);
		
	}	
	
}

async function disconnect() {
	await mongoose.disconnect();
}

export default{
	connect,
	disconnect,
};
