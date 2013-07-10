/* shakeit.js */

function Shakeit(config)
{

	this.config = config || {};
	// TODO: determine if the accelerometer is supported, if not, check to see if the config has a failure handler, call it
	
	// if it is, start listening
	
	this.x = 0;
	this.y = 0;
	this.z = 0;
	
	this.averageX = 0;
	this.averageY = 0;
	this.averageZ = 0;
	
	this.xG = 0;
	this.yG = 0;
	this.zG = 0;
	
	this.listenForMotion = function(){
		var shakeit = this;	
		window.ondevicemotion = function(event) {
			shakeit.x = event.acceleration.x;
			shakeit.y = event.acceleration.y;
			shakeit.z = event.acceleration.z;
		}
	};
	
	this.listenForMotionWithGravity = function(){
		var shakeit = this;
		window.ondevicemotion = function(event)
		{
			shakeit.xG = event.accelerationIncludingGravity.x;
			shakeit.yG = event.accelerationIncludingGravity.y;
			shakeit.zG = event.accelerationIncludingGravity.z;
		}
	};
	
	// define events that are supported
	this.supportedEvents = ['xchange', 'ychange', 'zchange', 'shakeup', 'shakedown', 'shakeright', 'shakeleft'];
	
	this.isSupportedEvent = function(evt){
		var i = this.supportedEvents.length;
		while(i--)
		{
			if(this.supportedEvents[i] == evt)
				return true;
		}
		return false;
	}
	
	this.evtListeners = [];
	this.on = function(evtName, filter, functionHandle){
		if(!this.isSupportedEvent(evtName))
		{
			return false;
		}
		this.evtListeners.push({'evt':evtName, 'filter': filter, 'functionHandle':functionHandle});
	};
	
	this.off = function(evtName, filter, functionHandle){
	
	};
	
	// send an intervalled event pulse
	this.triggerPulse = function(){
		
	};
	
	this.listening = true;
	this.intervalHandle = null;
	this.interval = 250; // milliseconds
	this.pauseHandle = null;
	this.start = function(interval){
		this.listening = true;
		if(typeof interval === 'undefined' && interval === null)
		{
			interval = this.interval;
		}
		var shakeit = this;
		this.intervalHandle = setInterval(function(){shakeit.triggerPulse();}, interval);
	};
	
	this.pause = function(howLong){
		this.listening = false;
		clearTimeout(this.pauseHandle);
		if(howLong)
		{
			var x = this;
			this.pauseHandle = setTimeout(function(){x.start();}, howLong);
		}
	};
	
	this.stop = function(){
		this.pause(0);
	}
		
	this.toggle = function(){
		if(this.listening)
			this.start();
		else
			this.pause(0);
	};
	
	this.setInterval = function(interval){
		this.interval = interval;
	}
}