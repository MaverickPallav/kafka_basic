const { kafka } = require("./client")

async function init(){
    const admin = kafka.admin()
    console.log("Connecting Admin")
    
    await admin.connect()
    console.log("Connected Admin")

    console.log("Creating Topic [rider-updates]")

    await admin.createTopics({
        topics: [
            {
                topic: "rider-updates",
                numPartitions: 2
            }
        ]
    })

    console.log("Topic [rider-updates] Created")

    console.log("Disconnecting Admin")
    await admin.disconnect()
}

init()