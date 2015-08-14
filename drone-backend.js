var Cylon = require('cylon');
var bot;

// Initialise the robot
Cylon.robot()
    .connection("ardrone", {
        adaptor: 'ardrone',
        port: '192.168.1.1'
    })
    .device("drone", {
        driver: "ardrone",
        connection: "ardrone"
    })
.device("nav", {
    driver: "ardrone-nav",
connection: "ardrone"
})
    .on("ready", fly);
    
// Fly the bot
function fly(robot) {
    bot = robot;
    bot.drone.disableEmergency();
    bot.drone.ftrim();
    bot.nav.on("altitudeChange", function (data) {
        console.log("Altitude:", data);
        // Drone is higher than 1.5 meters up
        if (altitude > 1.5) {
            bot.drone.land();
        }
    });
    bot.drone.takeoff();
    after(10 * 1000, function () {
        bot.drone.land();
    });
    after(15 * 1000, function () {
        bot.drone.stop();
    });
    after(5*1000, function(){
        bot.drone.left(0.2);
    })

    after(8 * 1000, function () {
        bot.drone.left(0);
    })


}


Cylon.start();
