const { kafka } = require("./client")
const group = process.argv[2]

async function init(){
    const consumer = kafka.consumer({ groupId: group })

    console.log("Connecting Consumer")

    await consumer.connect()

    console.log("Connected Consumer")

    await consumer.subscribe({ topics: ["rider-updates"], fromBeginning: true})

    await consumer.run({
        eachMessage: async({ topic, partition, message, heartbeat, pause }) => {
            console.log(`${group}: [${topic}]: Partition:${partition}`, message.value.toString())
        }
    })
}

init()