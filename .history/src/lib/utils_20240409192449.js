const { default: mongoose } = require("mongoose");

// If we are working in dev mode, whenever we refresh our application it will create a new connection to db.
const connection = {
    isConnected: false,
};

export const connectToDb = async () => {
  try {
    if(connection.isConnected){
        console.log("Using existing connection")
        return;
    }
    const db = await mongoose.connect(process.env.MONGO);
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error(error)
    // handleError(error);
  }
};
