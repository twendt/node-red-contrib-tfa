module.exports = function(RED) {
    function TfaNode(config) {
        RED.nodes.createNode(this,config);
	this.topic_prefix = config.topic_prefix
        var node = this;
        this.on('input', function(msg) {
		vals = msg.payload.split(" ");
		sensorid = vals[2];

		//Get Temperature
		part1 = parseInt(vals[4]);
		part2 = parseInt(vals[5]);
		temp = ((part1 * 256) + part2 - 1000)/10;
		msg.payload = temp;
		msg.topic = [node.topic_prefix, sensorid, "/temperature"].join("");
		node.send(msg);

		//Get Humidity
		humidity = parseInt(vals[6]);
		msg.topic = [node.topic_prefix, sensorid, "/humidity"].join("");
		msg.payload = humidity;
		node.send(msg);
		return;
	});
    }
    RED.nodes.registerType("tfa",TfaNode);
}
