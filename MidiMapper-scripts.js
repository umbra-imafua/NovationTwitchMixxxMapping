//made by Kazakore - dj_kaza@hotmail.com

var MidiMapper = {} ;

MidiMapper.init = function (id, debugging) {};
MidiMapper.shutdown = function (id, debugging) {};

MidiMapper.store = [] ; // This is where all function will end up being stored

MidiMapper.check = function(status) { // Ran by set function to ensure 2nd level of array exists
	if (Array.isArray(MidiMapper.store[status]) === false) {
    	MidiMapper.store[status] = [] ;
	}
};

MidiMapper.set = function(status, control, func) { // Set method using status and control numbers directly as Mixxx does internally
	MidiMapper.check(status) ;
	MidiMapper.store[status][control] = func ;
} ;

MidiMapper.setHR = function(type, channel, control, func) { // human readable set function, capitalisation irrelevant, Midi Channels number 1 to 16.
	var status ;
	if (type.toLowerCase() == "noteon") {
		status = (0x90 + channel - 1) ; 
	} 
	else if (type.toLowerCase() == "noteoff") {
		status = (0x80 + channel -1) ;
	}
	else if (type.toLowerCase() == "cc") {
		status = (0xb0 + channel -1) ;
	}
	MidiMapper.set(status, control, func) ;
} ;

MidiMapper.input = function(channel, control, value, status, group) { // All midi commands are mapped to trigger this one function which references store array
	if (Array.isArray(MidiMapper.store[status]) === false) {
		return	;
	} 
	if (typeof MidiMapper.store[status][control] == "function") {
		MidiMapper.store[status][control](channel, control, value, status, group) ; 
    }
} ;
