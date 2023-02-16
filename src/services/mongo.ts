import mongoose from 'mongoose';

//Connect to Mongo Atlas with URL
export const MONGO_URL = process.env.MONGO_URL as string;

mongoose.connection.once("open", () => {
	console.log("Mongodb connection is ready");
});

mongoose.connection.on("error", (error) => {
	console.error(error);
});

async function mongoConnect() {
	try {
		await mongoose.connect(MONGO_URL);
		console.log("connected to Mongo Atlas");
	} catch (error) {
		console.error(error);
		
	}	
	
}

async function mongoDisconnect() {
	await mongoose.disconnect();
}

export {
	mongoConnect,
	mongoDisconnect,
};
