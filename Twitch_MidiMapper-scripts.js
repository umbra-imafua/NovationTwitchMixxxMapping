//Imafua Umbra's weird Mixxx script for novation twitch (Good luck working this one out)
//Built on Kazakore's fantastic mapping framework and original setup - https://github.com/kazakore/Novation-Twitch-MIDI-Mapping-for-Mixxx - dj_kaza@hotmail.com

var KazasTwitch = {};
  var leftdeck = 0;
  var rightdeck = 0;
var shiftleftX = false;
var shiftrightX = false;
var shiftleftY = false;
var shiftrightY = false;
var shiftleft = 0;
var shiftright = 0;
  var lasttouchstrippos = 64;
var Abeathalf = 0; var Bbeathalf = 0; var Cbeathalf = 0; var Dbeathalf = 0;
var Abeathalflock = false; var Bbeathalflock = false; var Cbeathalflock = false; var Dbeathalflock = false;
  var auditmode = false;
// SHUTDOWN /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
KazasTwitch.shutdown = function() {
    midi.sendShortMsg(0xb7,0x00,0x6f);          // init Advanced Mode
    midi.sendShortMsg(0xb7,0x00,0x70);          // turn off all LEDs on exit
};

// INIT /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
KazasTwitch.init = function (id, debugging) {   // INIT Scripts, including saving to MIDI Mapper array
    midi.sendShortMsg(0xb7,0x00,0x00);          // init Basic Mode
    midi.sendShortMsg(0xb7,0x00,0x6f);          // init Advanced Mode
    midi.sendShortMsg(0xb7,0x00,0x01);          // Read current controler status (does nothing??)
    midi.sendShortMsg(0xb7,0x00,0x70);          // init Device

//__________________________________________________________________/MASTER UNMAPPABLE/___________________________________________________________________/

//______________________________________________________________________/MASTER FX/_______________________________________________________________________/

MidiMapper.set(0xb7, 0x5b, KazasTwitch.headphonesMix);      MidiMapper.set(0xbb, 0x01, KazasTwitch.nullo);       MidiMapper.set(0xbb, 0x02, KazasTwitch.nullo);
            /*KNOB*/                                 MidiMapper.set(0x9b, 0x01, KazasTwitch.nullo);       MidiMapper.set(0x9b, 0x02, KazasTwitch.nullo);

MidiMapper.set(0x9b, 0x1c, KazasTwitch.nullo);      MidiMapper.set(0x9b, 0x1d, KazasTwitch.nullo);       MidiMapper.set(0x9b, 0x1e, KazasTwitch.nullo);
            /*BUTTON*/                                                 /*BUTTON*/                                       /*BUTTON*/

MidiMapper.set(0x9b, 0x20, KazasTwitch.nullo);      MidiMapper.set(0x9b, 0x21, KazasTwitch.nullo);       MidiMapper.set(0x9b, 0x22, KazasTwitch.nullo);
            /*BUTTON*/                                                 /*BUTTON*/                                       /*BUTTON*/
//_______________________________________________________________________/MIC/AUX/________________________________________________________________________/

MidiMapper.set(0xb7, 0x0c, KazasTwitch.micfxlevel);
            /*KNOB*/

MidiMapper.set(0x97, 0x0b, KazasTwitch.micfx1);
            /*BUTTON*/

MidiMapper.set(0x97, 0x0c, KazasTwitch.micfx2);
            /*BUTTON*/
//_______________________________________________________________________/BROWSE/________________________________________________________________________/

MidiMapper.set(0x97, 0x50, KazasTwitch.loadButtonsA);                                                                          MidiMapper.set(0x97, 0x51, KazasTwitch.loadButtonsB);
                /*BUTTON*/                                                                                                                          /*BUTTON*/
        MidiMapper.set(0x97, 0x54, KazasTwitch.stoppreview);  MidiMapper.set(0xb7, 0x55, KazasTwitch.libBrowseEnc);  MidiMapper.set(0x97, 0x56, KazasTwitch.preview);
                        /*BUTTON*/                            MidiMapper.set(0x97, 0x55, KazasTwitch.browser);                           /*BUTTON*/
MidiMapper.set(0x97, 0x52, KazasTwitch.loadButtonsC);                                                                          MidiMapper.set(0x97, 0x53, KazasTwitch.loadButtonsD);
            /*BUTTON*/                                                                                                                            /*BUTTON*/
//________________________________________________________________________/CORE/_________________________________________________________________________/

MidiMapper.set(0xb7, 0x09, KazasTwitch.boteq); MidiMapper.set(0xb7, 0x48, KazasTwitch.eq); MidiMapper.set(0xb8, 0x48, KazasTwitch.eq); MidiMapper.set(0xb8, 0x09, KazasTwitch.boteq);
                /*KNOB*/                                /*KNOB*/                                     /*KNOB*/                                           /*KNOB*/

MidiMapper.set(0x97, 0x0a, KazasTwitch.headphonesA); MidiMapper.set(0xb7, 0x47, KazasTwitch.eq); MidiMapper.set(0xb8, 0x47, KazasTwitch.eq); MidiMapper.set(0x98, 0x0a, KazasTwitch.headphonesB);
                /*BUTTON*/                              /*KNOB*/                                      /*KNOB*/                                          /*BUTTON*/

MidiMapper.set(0xb7, 0x06, KazasTwitch.bpm); MidiMapper.set(0xb7, 0x46, KazasTwitch.eq); MidiMapper.set(0xb8, 0x46, KazasTwitch.eq); MidiMapper.set(0xb8, 0x06, KazasTwitch.bpm);
MidiMapper.set(0x97, 0x06, KazasTwitch.bpmreset);                  /*KNOB*/                                   /*KNOB*/          MidiMapper.set(0x98, 0x06, KazasTwitch.bpmreset);

MidiMapper.set(0x97, 0x0d, KazasTwitch.headphonesC);                                                                                          MidiMapper.set(0x98, 0x0d, KazasTwitch.headphonesD);
            /*BUTTON*/                                                                                                                              /*BUTTON*/

                    MidiMapper.set(0xb7, 0x07, KazasTwitch.volume);                                                          MidiMapper.set(0xb8, 0x07, KazasTwitch.volume);
                                /*FADER**/                                                                                           /*FADER**/
                                                                MidiMapper.set(0xb7, 0x08, KazasTwitch.xfade);
                                                                                /*CROSSFADER*/
//________________________________________________________________________/LEFT/_________________________________________________________________________/

MidiMapper.set(0x97, 0x10, KazasTwitch.deckA); MidiMapper.set(0x97, 0x11, KazasTwitch.syncTop); MidiMapper.set(0x97, 0x00, KazasTwitch.keyLock);
                /*BUTTON*/                                      /*BUTTON*/                                      /*BUTTON*/
MidiMapper.set(0x97, 0x12, KazasTwitch.deckC); MidiMapper.set(0x97, 0x13, KazasTwitch.syncBottom);
                /*BUTTON*/                                      /*BUTTON*/                                  MidiMapper.set(0xb7, 0x03, KazasTwitch.loopLength);
MidiMapper.set(0x97, 0x16, KazasTwitch.shift2); MidiMapper.set(0x97, 0x17, KazasTwitch.shift1);               MidiMapper.set(0x97, 0x03, KazasTwitch.loop);
              /*BIG BUTTON*/                                  /*BIG BUTTON*/             MidiMapper.set(0x97, 0x14, KazasTwitch.Reverse); MidiMapper.set(0x97, 0x15, KazasTwitch.Play);
                                                                                                            /*BUTTON*/                                  /*BUTTON*/
                                                                MidiMapper.set(0xb7, 0x34, KazasTwitch.touchStrip);
                                                                MidiMapper.set(0x97, 0x47, KazasTwitch.touchStripPress);
                                                                                    /*TOUCHSTRIP*/
MidiMapper.set(0x97, 0x38, KazasTwitch.hyper1); MidiMapper.set(0x97, 0x39, KazasTwitch.hyper2); MidiMapper.set(0x97, 0x3a, KazasTwitch.hyper3); MidiMapper.set(0x97, 0x3b, KazasTwitch.hyper4);
                /*BUTTON*/                                      /*BUTTON*/                                      /*BUTTON*/                                      /*BUTTON*/
MidiMapper.set(0x97, 0x3c, KazasTwitch.jump1); MidiMapper.set(0x97, 0x3d, KazasTwitch.jump2); MidiMapper.set(0x97, 0x3e, KazasTwitch.jump3); MidiMapper.set(0x97, 0x3f, KazasTwitch.jump4);
            /*BIG BUTTON*/                                  /*BIG BUTTON*/                                    /*BIG BUTTON*/                                   /*BIG BUTTON*/
MidiMapper.set(0x97, 0x40, KazasTwitch.hotcue1); MidiMapper.set(0x97, 0x41, KazasTwitch.hotcue2); MidiMapper.set(0x97, 0x42, KazasTwitch.hotcue3); MidiMapper.set(0x97, 0x43, KazasTwitch.hotcue4);
            /*BIG BUTTON*/                                  /*BIG BUTTON*/                                    /*BIG BUTTON*/                                   /*BIG BUTTON*/

//______________________________________________________________________/RIGHT/_________________________________________________________________________/

                                                MidiMapper.set(0x98, 0x00, KazasTwitch.keyLock);  MidiMapper.set(0x98, 0x10, KazasTwitch.syncTop); MidiMapper.set(0x98, 0x11, KazasTwitch.deckB);
                                                            /*BUTTON*/                                      /*BUTTON*/                                      /*BUTTON*/
                                                                                                MidiMapper.set(0x98, 0x12, KazasTwitch.syncBottom); MidiMapper.set(0x98, 0x13, KazasTwitch.deckD);
MidiMapper.set(0xb8, 0x03, KazasTwitch.loopLength);                                                              /*BUTTON*/                                      /*BUTTON*/
MidiMapper.set(0x98, 0x03, KazasTwitch.loop);                                                  MidiMapper.set(0x98, 0x16, KazasTwitch.shift1); MidiMapper.set(0x98, 0x17, KazasTwitch.shift2);
MidiMapper.set(0x98, 0x14, KazasTwitch.Reverse); MidiMapper.set(0x98, 0x15, KazasTwitch.Play);                  /*BIG BUTTON*/                                  /*BIG BUTTON*/
                    /*BUTTON*/                                  /*BUTTON*/
                                                                MidiMapper.set(0xb8, 0x34, KazasTwitch.touchStrip);
                                                                MidiMapper.set(0x98, 0x47, KazasTwitch.touchStripPress);
                                                                                    /*TOUCHSTRIP*/
MidiMapper.set(0x98, 0x38, KazasTwitch.hyper1); MidiMapper.set(0x98, 0x39, KazasTwitch.hyper2); MidiMapper.set(0x98, 0x3a, KazasTwitch.hyper3); MidiMapper.set(0x98, 0x3b, KazasTwitch.hyper4);
                /*BUTTON*/                                      /*BUTTON*/                                      /*BUTTON*/                                      /*BUTTON*/
MidiMapper.set(0x98, 0x3c, KazasTwitch.jump1); MidiMapper.set(0x98, 0x3d, KazasTwitch.jump2); MidiMapper.set(0x98, 0x3e, KazasTwitch.jump3); MidiMapper.set(0x98, 0x3f, KazasTwitch.jump4);
            /*BIG BUTTON*/                                  /*BIG BUTTON*/                                    /*BIG BUTTON*/                                   /*BIG BUTTON*/
MidiMapper.set(0x98, 0x40, KazasTwitch.hotcue1); MidiMapper.set(0x98, 0x41, KazasTwitch.hotcue2); MidiMapper.set(0x98, 0x42, KazasTwitch.hotcue3); MidiMapper.set(0x98, 0x43, KazasTwitch.hotcue4);
            /*BIG BUTTON*/                                  /*BIG BUTTON*/                                    /*BIG BUTTON*/                                   /*BIG BUTTON*/
//______________________________________________________________________________________________________________________________________________________/

// VU Meter connection
//engine.makeConnection("[Master]", "VuMeterL", KazasTwitch.vuCallback);
//engine.makeConnection("[Master]", "VuMeter", KazasTwitch.vuCallback);

// TODO  //[ChannelN]PeakIndicator

//Beat tick
engine.makeConnection("[Channel1]", "beat_active", KazasTwitch.BeatA);
engine.makeConnection("[Channel2]", "beat_active", KazasTwitch.BeatB);
engine.makeConnection("[Channel3]", "beat_active", KazasTwitch.BeatC);
engine.makeConnection("[Channel4]", "beat_active", KazasTwitch.BeatD);

engine.makeConnection("[Master]", "audio_latency_usage", KazasTwitch.Tick);

// Set init decks selecte
midi.sendShortMsg(0x97, 0x10, 0x7F)
midi.sendShortMsg(0x98, 0x11, 0x7F);
};

// END INIT ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

KazasTwitch.nulloo = function (channel, control, value) {};

//______________________________________________________________________/MIC/AUX/________________________________________________________________________/

//Headmix
KazasTwitch.headphonesMix = function(channel, control, value) {
    engine.setParameter("[Master]", "headMix", (value/127)) ;
};

//Mic fx
KazasTwitch.micfxlevel = function(channel, control, value) {
    engine.setParameter("[EffectRack1_EffectUnit1]", "super1", (value/127));
};

//Mic fx 1
KazasTwitch.micfx1 = function(channel, control, value) {
    engine.setParameter("[EffectRack1_EffectUnit1]", "super1", 1);
};

//Mic fx 2
KazasTwitch.micfx2 = function(channel, control, value) {

};

//______________________________________________________________________/BROWSER/________________________________________________________________________/

//Scroll
var libLast = 1 ;
KazasTwitch.libBrowseEnc = function (channel, control, value) {
    if (value > 64) {engine.setValue('[Library]', 'MoveVertical', ((-1) * libLast * (0x80-value)) ) ;
        libLast = (0x80-value);
    }
    else {engine.setValue('[Library]', 'MoveVertical', (libLast * value) ) ;
        libLast = value;
    }
};

//Maxamise/Minimise
KazasTwitch.browser = function(channel, control, value) { if (value==127){
    engine.setParameter("[Master]", "maximize_library", 1-engine.getParameter("[Master]", "maximize_library")); }};

//Preview
KazasTwitch.preview = function(channel, control, value) { if (value==127){
    engine.setParameter("[PreviewDeck1]", "LoadSelectedTrackAndPlay", 1); } };

//StopPreview and audit mode
KazasTwitch.stoppreview = function(channel, control, value) { if (value==127){
        engine.setParameter("[PreviewDeck1]", "play", 0);
        auditmode = true;
    }else{
        auditmode = false;
    }
};

//Load button and 1star in audit mode
KazasTwitch.loadButtonsA = function(channel, control, value) { if (value==127){
    if(!auditmode){engine.setParameter("[Channel1]", "LoadSelectedTrack", 1);}
    else{OneStarAudit("[Channel1]");}
}};
KazasTwitch.loadButtonsB = function(channel, control, value) { if (value==127){
    if(!auditmode){engine.setParameter("[Channel2]", "LoadSelectedTrack", 1);}
    else{OneStarAudit("[Channel2]");}
}};
KazasTwitch.loadButtonsC = function(channel, control, value) { if (value==127){
    if(!auditmode){engine.setParameter("[Channel3]", "LoadSelectedTrack", 1);}
    else{OneStarAudit("[Channel3]");}
}};
KazasTwitch.loadButtonsD = function(channel, control, value) { if (value==127){
    if(!auditmode){engine.setParameter("[Channel4]", "LoadSelectedTrack", 1);}
    else{OneStarAudit("[Channel4]");}
}};
function OneStarAudit(channel) {
    engine.setParameter(channel, "stars_down", 1); engine.setParameter(channel, "stars_down", 1); engine.setParameter(channel, "stars_down", 1);
    engine.setParameter(channel, "stars_down", 1); engine.setParameter(channel, "stars_down", 1); engine.setParameter(channel, "stars_up", 6);
}

//________________________________________________________________________/CORE/_________________________________________________________________________/


//Eq1
KazasTwitch.eq = function(channel, control, value) {

    var threshold = 0.07; //on the CMD Studio 4a this threshold got the right balance between smooth takeover and keeping up with quick turns, but you can adjust the value to suit your needs
	var currentKnobVal = value/128;

    var eqNo = (control - 0x45) ;
    if ( eqNo==3 ){ if (Math.abs(engine.getParameter(getActive(channel), "filterHigh") - currentKnobVal) < threshold){ engine.setParameter(getActive(channel), "filterHigh", value/127)} };
    if ( eqNo==2 ){ if (Math.abs(engine.getParameter(getActive(channel), "filterMid") - currentKnobVal) < threshold){ engine.setParameter(getActive(channel), "filterMid", value/127)} };
    if ( eqNo==1 ){ if (Math.abs(engine.getParameter(getActive(channel), "filterLow") - currentKnobVal) < threshold){ engine.setParameter(getActive(channel), "filterLow", value/127)} };
};


// Headphone
KazasTwitch.headphonesA = function (channel, control, value) { if (value==127){
    engine.setParameter("[Channel1]", "pfl", 1-engine.getParameter("[Channel1]", "pfl")); }
    midi.sendShortMsg(0x97, 0x0a, engine.getParameter("[Channel1]", "pfl")*0x7F);
    midi.sendShortMsg(0x99, 0x0a, engine.getParameter("[Channel1]", "pfl")*0x7F);
};
KazasTwitch.headphonesB = function (channel, control, value) { if (value==127){
    engine.setParameter("[Channel2]", "pfl", 1-engine.getParameter("[Channel2]", "pfl")); }
    midi.sendShortMsg(0x98, 0x0a, engine.getParameter("[Channel2]", "pfl")*0x7F);
    midi.sendShortMsg(0x9a, 0x0a, engine.getParameter("[Channel2]", "pfl")*0x7F);
};
KazasTwitch.headphonesC = function (channel, control, value) { if (value==127){
    engine.setParameter("[Channel3]", "pfl", 1-engine.getParameter("[Channel3]", "pfl")); }
    midi.sendShortMsg(0x97, 0x0d, engine.getParameter("[Channel3]", "pfl")*0x7F);
    midi.sendShortMsg(0x99, 0x0d, engine.getParameter("[Channel3]", "pfl")*0x7F);
};
KazasTwitch.headphonesD = function (channel, control, value) { if (value==127){
    engine.setParameter("[Channel4]", "pfl", 1-engine.getParameter("[Channel4]", "pfl")); }
    midi.sendShortMsg(0x98, 0x0d, engine.getParameter("[Channel4]", "pfl")*0x7F);
    midi.sendShortMsg(0x9a, 0x0d, engine.getParameter("[Channel4]", "pfl")*0x7F);
};

// Faders
KazasTwitch.volume = function (channel, control, value) {
    if (channel == 8 || channel == 10) {
        engine.setParameter("[Channel2]", "volume", (value/64)-0.25) ;
        engine.setParameter("[Channel4]", "volume", 2-(value/64)) ;
    }else{
        engine.setParameter("[Channel1]", "volume", (value/64)-0.25) ;
        engine.setParameter("[Channel3]", "volume", 2-(value/64)) ;
    }
};

// Crossfader
KazasTwitch.xfade = function (channel, control, value) {
    engine.setParameter("[Master]", "crossfader", (value/127)) ;
};
//_________________________________________________________________________________________________________________________________________________/

//Deck selector
KazasTwitch.deckA = function (channel, control, value) { if (value==127){
    leftdeck = 0; midi.sendShortMsg(0x97, 0x10, 0x7F); midi.sendShortMsg(0x97, 0x12, 0x00);
}};
KazasTwitch.deckB = function (channel, control, value) { if (value==127){
    rightdeck = 0; midi.sendShortMsg(0x98, 0x13, 0x00); midi.sendShortMsg(0x98, 0x11, 0x7F);
}};
KazasTwitch.deckC = function (channel, control, value) { if (value==127){
    leftdeck = 2; midi.sendShortMsg(0x97, 0x12, 0x7F); midi.sendShortMsg(0x97, 0x10, 0x00);
}};
KazasTwitch.deckD = function (channel, control, value) { if (value==127){
    rightdeck = 2; midi.sendShortMsg(0x98, 0x11, 0x00); midi.sendShortMsg(0x98, 0x13, 0x7F);
}};

//bpm
KazasTwitch.bpm = function (channel, control, value) {
    for ( var i = 0; i < Math.abs(encoderCalc(value)); i++) {
        if(encoderCalc(value) > 0){
            engine.setValue( getActive(channel), "bpm_up", 1);
        }else{
            engine.setValue( getActive(channel), "bpm_down", 1);
        }
    }
};
KazasTwitch.bpmreset = function (channel, control, value) { if (value==127){
    engine.setValue( getActive(channel), "bpm", engine.getParameter(getActive(channel), "file_bpm"));
}};

//Sync
KazasTwitch.syncTop = function (channel, control, value) { if (value==127){
    if (engine.getParameter( getTop(channel), "sync_mode") == 0){
        engine.setValue( getTop(channel), "sync_mode", 2);
    }else{
        engine.setValue( getTop(channel), "sync_mode", 0);
    }
}};
KazasTwitch.syncBottom = function (channel, control, value) {
    if (engine.getParameter( getBottom(channel), "sync_mode") == 0){
        engine.setValue( getBottom(channel), "sync_mode", 2);
    }else{
        engine.setValue( getBottom(channel), "sync_mode", 0);
    }
};

//Keylock
KazasTwitch.keyLock = function (channel, control, value) { if (value==127){
        engine.setValue( getActive(channel), "keylock", 1-engine.getParameter(getActive(channel), "keylock") )
}};

//Beatloop
KazasTwitch.loopLength = function (channel, control, value) {
    if(getShiftRaw(channel)==3){   if (value==127){ engine.setValue( getActive(channel), "beats_translate_earlier", 1);}else{ engine.setValue( getActive(channel), "beats_translate_later", 1); }  } else
    if(getShiftRaw(channel)==2){   if (value==127){ engine.setValue( getActive(channel), "pitch_down", 1);}else{ engine.setValue( getActive(channel), "pitch_up", 1); }  } else
    {  if (value==127){ engine.setValue( getActive(channel), "loop_halve", 1);}else{ engine.setValue( getActive(channel), "loop_double", 1); }  }
}
KazasTwitch.loop = function (channel, control, value) { if (value==127){
    if(getShiftRaw(channel)==3){ engine.setValue( getActive(channel), "beats_translate_curpos", 1) } else
    if(getShiftRaw(channel)==2){ engine.setValue( getActive(channel), "reset_key", 1) } else
    { engine.setValue( getActive(channel), "beatloop_"+engine.getParameter( getActive(channel), "beatloop_size")+"_toggle", 1)}
}};

//Play
KazasTwitch.Play = function (channel, control, value) { if (value==127){
    if(getShiftRaw(channel)==3){
        engine.setValue( getActive(channel), "eject", 1);
        engine.setValue( getActive(channel), "eject", 0);
    }else if(getShiftRaw(channel)==2){
        engine.setValue( getActive(channel), "play", 0);
    }else{
        engine.setValue( getActive(channel), "play", 1);
        engine.setValue( getActive(channel), "reverse", 0);
}}};

//Reverse
KazasTwitch.Reverse = function (channel, control, value) { if (value==127){
    if(getShiftRaw(channel)==3){
        engine.setValue( getActive(channel), "eject", 1);
        engine.setValue( getActive(channel), "eject", 0);
    }else if(getShiftRaw(channel)==2){
        engine.setValue( getActive(channel), "play", 0);
    }else{
        engine.setValue( getActive(channel), "reverse", 1)
}}};

//Shift
KazasTwitch.shift1 = function(channel, control, value) { if (value==127){
        if (getIsLeftRaw(channel)) { shiftleftX=true}
        else{ shiftrightX=true}
    }else{
        if (getIsLeftRaw(channel)) { shiftleftX=false}
        else{ shiftrightX=false}
    }
    shiftleft = (shiftleftX*1)+(shiftleftY*2)
    shiftright = (shiftrightX*1)+(shiftrightY*2)
};
KazasTwitch.shift2 = function(channel, control, value) { if (value==127){
        if (getIsLeftRaw(channel)) { shiftleftY=true}
        else{ shiftrightY=true}
    }else{
        if (getIsLeftRaw(channel)) { shiftleftY=false}
        else{ shiftrightY=false}
    }
    shiftleft = (shiftleftX*1)+(shiftleftY*2)
    shiftright = (shiftrightX*1)+(shiftrightY*2)
};

// Touchstrip
KazasTwitch.touchStrip = function(channel, control, value) {
    var scratchmode = 0 ;
    if(getIsLeftRaw(channel)){
        scratchmode = shiftleft;
    }else{
        scratchmode = shiftright;
    }

    if(scratchmode==2){
        engine.setValue( getActive(channel), "playposition", (value/128)) ;
    }else if(scratchmode==1){
        engine.setParameter("[QuickEffectRack1_"+getActive(channel)+"]", "super1", value/128);
    }else{
        var amt;
        amt = (value - lasttouchstrippos);
        lasttouchstrippos = value;
        switch (true) {

            case (amt == 0): break;

            case (amt > 0 && amt <= 1):     engine.setValue( getActive(channel), "beatjump_0.03125_forward", 1) ; break;
            case (amt > 1 && amt <= 2):     engine.setValue( getActive(channel), "beatjump_0.0625_forward", 1) ; break;
            case (amt > 2 && amt <= 4):     engine.setValue( getActive(channel), "beatjump_0.125_forward", 1) ; break;
            case (amt > 4 && amt <= 8):    engine.setValue( getActive(channel), "beatjump_0.125_forward", 1) ; break;
            case (amt > 8):                break;

            case (amt < 0 && amt >= -1):    engine.setValue( getActive(channel), "beatjump_0.03125_backward", 1) ; break;
            case (amt < -1 && amt >= -2):   engine.setValue( getActive(channel), "beatjump_0.0625_backward", 1) ; break;
            case (amt < -2 && amt >= -4):   engine.setValue( getActive(channel), "beatjump_0.125_backward", 1) ; break;
            case (amt < -4 && amt <= -8):  engine.setValue( getActive(channel), "beatjump_0.25_backward", 1) ; break;
            case (amt < -8):               break;

            default: break;
        }
    }
};
KazasTwitch.touchStripPress = function(channel, control, value) { if (value==0){
    engine.setParameter("[QuickEffectRack1_[Channel1]]", "super1", 0.5);
    engine.setParameter("[QuickEffectRack1_[Channel2]]", "super1", 0.5);
    engine.setParameter("[QuickEffectRack1_[Channel3]]", "super1", 0.5);
    engine.setParameter("[QuickEffectRack1_[Channel4]]", "super1", 0.5);
}};


//Jumps
KazasTwitch.jump1 = function(channel, control, value) { if (value==127){
    if(getShiftRaw(channel)==3){ engine.setValue( getActive(channel), "", 1) } else
    if(getShiftRaw(channel)==2){ engine.setValue( getActive(channel), "", 1) } else
    if(getShiftRaw(channel)==1){ engine.setValue( getActive(channel), "", 1) } else
    { engine.setValue( getActive(channel), "beatjump_4_backward", 1) }}};
KazasTwitch.jump2 = function(channel, control, value) { if (value==127){
    if(getShiftRaw(channel)==3){ engine.setValue( getActive(channel), "", 1) } else
    if(getShiftRaw(channel)==2){ engine.setValue( getActive(channel), "", 1) } else
    if(getShiftRaw(channel)==1){ engine.setValue( getActive(channel), "", 1) } else
    { engine.setValue( getActive(channel), "beatjump_1_backward", 1) }}};
KazasTwitch.jump3 = function(channel, control, value) { if (value==127){
    if(getShiftRaw(channel)==3){ engine.setValue( getActive(channel), "", 1) } else
    if(getShiftRaw(channel)==2){ engine.setValue( getActive(channel), "", 1) } else
    if(getShiftRaw(channel)==1){ engine.setValue( getActive(channel), "", 1) } else
    { engine.setValue( getActive(channel), "beatjump_1_forward", 1) }}};
KazasTwitch.jump4 = function(channel, control, value) { if (value==127){
    if(getShiftRaw(channel)==3){ engine.setValue( getActive(channel), "", 1) } else
    if(getShiftRaw(channel)==2){ engine.setValue( getActive(channel), "", 1) } else
    if(getShiftRaw(channel)==1){ engine.setValue( getActive(channel), "", 1) } else
    { engine.setValue( getActive(channel), "beatjump_4_forward", 1) }}};

KazasTwitch.hyper1 = function(channel, control, value) { if (value==127){
    if(getShiftRaw(channel)==3){ engine.setValue( getActive(channel), "", 1) } else
    if(getShiftRaw(channel)==2){ engine.setValue( getActive(channel), "", 1) } else
    if(getShiftRaw(channel)==1){ engine.setValue( getActive(channel), "", 1) } else
    { engine.setValue( getActive(channel), "beatjump_64_backward", 1) }}};
KazasTwitch.hyper2 = function(channel, control, value) { if (value==127){
    if(getShiftRaw(channel)==3){ engine.setValue( getActive(channel), "", 1) } else
    if(getShiftRaw(channel)==2){ engine.setValue( getActive(channel), "", 1) } else
    if(getShiftRaw(channel)==1){ engine.setValue( getActive(channel), "", 1) } else
    { engine.setValue( getActive(channel), "beatjump_16_backward", 1) }}};
KazasTwitch.hyper3 = function(channel, control, value) { if (value==127){
    if(getShiftRaw(channel)==3){ engine.setValue( getActive(channel), "", 1) } else
    if(getShiftRaw(channel)==2){ engine.setValue( getActive(channel), "", 1) } else
    if(getShiftRaw(channel)==1){ engine.setValue( getActive(channel), "", 1) } else
    { engine.setValue( getActive(channel), "beatjump_16_forward", 1) }}};
KazasTwitch.hyper4 = function(channel, control, value) { if (value==127){
    if(getShiftRaw(channel)==3){ engine.setValue( getActive(channel), "", 1) } else
    if(getShiftRaw(channel)==2){ engine.setValue( getActive(channel), "", 1) } else
    if(getShiftRaw(channel)==1){ engine.setValue( getActive(channel), "", 1) } else
    { engine.setValue( getActive(channel), "beatjump_64_forward", 1) }}};


//Cues
KazasTwitch.hotcue1 = function(channel, control, value) { if (value==127){
    if(getShiftRaw(channel)==3){ engine.setValue( getActive(channel), "hotcue_1_clear", 1) } else
    if(getShiftRaw(channel)==2){ engine.setValue( getActive(channel), "hotcue_1_setcue", 1) } else
    if(getShiftRaw(channel)==1){
        var looptemppos = engine.getParameter(getActive(channel), "loop_start_position"); engine.setValue( getActive(channel), "hotcue_1_clear", 1);
        engine.setValue( getActive(channel), "hotcue_1_activateloop", 1); engine.setValue( getActive(channel), "hotcue_1_position", looptemppos);
    } else{
        if(engine.getParameter(getActive(channel), "hotcue_1_type")==4 ){ engine.setValue( getActive(channel), "hotcue_1_cueloop", 1)  } else{ engine.setValue( getActive(channel), "hotcue_1_activate", 1)  }
    }}};
KazasTwitch.hotcue2 = function(channel, control, value) { if (value==127){
    if(getShiftRaw(channel)==3){ engine.setValue( getActive(channel), "hotcue_2_clear", 1) } else
    if(getShiftRaw(channel)==2){ engine.setValue( getActive(channel), "hotcue_2_setcue", 1) } else
    if(getShiftRaw(channel)==1){
        var looptemppos = engine.getParameter(getActive(channel), "loop_start_position"); engine.setValue( getActive(channel), "hotcue_2_clear", 1);
        engine.setValue( getActive(channel), "hotcue_2_activateloop", 1); engine.setValue( getActive(channel), "hotcue_2_position", looptemppos)
    } else{
        if(engine.getParameter(getActive(channel), "hotcue_2_type")==4 ){ engine.setValue( getActive(channel), "hotcue_2_cueloop", 1)  } else{ engine.setValue( getActive(channel), "hotcue_2_activate", 1)  }
    }}};
KazasTwitch.hotcue3 = function(channel, control, value) { if (value==127){
    if(getShiftRaw(channel)==3){ engine.setValue( getActive(channel), "hotcue_3_clear", 1) } else
    if(getShiftRaw(channel)==2){ engine.setValue( getActive(channel), "hotcue_3_setcue", 1) } else
    if(getShiftRaw(channel)==1){
        var looptemppos = engine.getParameter(getActive(channel), "loop_start_position"); engine.setValue( getActive(channel), "hotcue_3_clear", 1);
        engine.setValue( getActive(channel), "hotcue_3_activateloop", 1); engine.setValue( getActive(channel), "hotcue_3_position", looptemppos)
    } else{
        if(engine.getParameter(getActive(channel), "hotcue_3_type")==4 ){ engine.setValue( getActive(channel), "hotcue_3_cueloop", 1)  } else{ engine.setValue( getActive(channel), "hotcue_3_activate", 1)  }
    }}};
KazasTwitch.hotcue4 = function(channel, control, value) { if (value==127){
    if(getShiftRaw(channel)==3){ engine.setValue( getActive(channel), "hotcue_4_clear", 1) } else
    if(getShiftRaw(channel)==2){ engine.setValue( getActive(channel), "hotcue_4_setcue", 1) } else
    if(getShiftRaw(channel)==1){
        var looptemppos = engine.getParameter(getActive(channel), "loop_start_position"); engine.setValue( getActive(channel), "hotcue_3_clear", 1);
        engine.setValue( getActive(channel), "hotcue_4_activateloop", 1); engine.setValue( getActive(channel), "hotcue_4_position", looptemppos)
    } else{
        if(engine.getParameter(getActive(channel), "hotcue_4_type")==4 ){ engine.setValue( getActive(channel), "hotcue_4_cueloop", 1)  } else{ engine.setValue( getActive(channel), "hotcue_4_activate", 1)  }
    }}};

//Beat tick
KazasTwitch.BeatA = function (channel, control, value) { if(channel==1){
    midi.sendShortMsg(0x97, 0x11, 0x7F);}else{
    midi.sendShortMsg(0x97, 0x11, 0x00);}};
KazasTwitch.BeatB = function (channel, control, value) { if(channel==1){
    midi.sendShortMsg(0x98, 0x10, 0x7F); }else{
    midi.sendShortMsg(0x98, 0x10, 0x00); }};
KazasTwitch.BeatC = function (channel, control, value) { if(channel==1){
    midi.sendShortMsg(0x97, 0x13, 0x7F); }else{
    midi.sendShortMsg(0x97, 0x13, 0x00);}};
KazasTwitch.BeatD = function (channel, control, value) { if(channel==1){
    midi.sendShortMsg(0x98, 0x12, 0x7F); }else{
    midi.sendShortMsg(0x98, 0x12, 0x00);}};

KazasTwitch.Tick = function (channel, control, value) {

    //if (engine.getParameter( "[Channel1]", "loop_enabled")==0){
    //    engine.setValue( "[Channel1]", "loop_remove", 1 );
    //}


    if (shiftleft == 3){
        midi.sendShortMsg(0x97, 0x17, 0x2F); midi.sendShortMsg(0x97, 0x16, 0x2F);}
    else if (shiftleft == 2){
        midi.sendShortMsg(0x97, 0x17, 0x41); midi.sendShortMsg(0x97, 0x16, 0x7F);}
    else if (shiftleft == 1){
        midi.sendShortMsg(0x97, 0x17, 0x4F); midi.sendShortMsg(0x97, 0x16, 0x71);}
    else{
        midi.sendShortMsg(0x97, 0x17, 0x42); midi.sendShortMsg(0x97, 0x16, 0x72);}

    if (shiftright == 3){
        midi.sendShortMsg(0x98, 0x16, 0x2F); midi.sendShortMsg(0x98, 0x17, 0x2F);}
    else if (shiftright == 2){
        midi.sendShortMsg(0x98, 0x16, 0x41); midi.sendShortMsg(0x98, 0x17, 0x7F);}
    else if (shiftright == 1){
        midi.sendShortMsg(0x98, 0x16, 0x4F); midi.sendShortMsg(0x98, 0x17, 0x71);}
    else{
        midi.sendShortMsg(0x98, 0x16, 0x42); midi.sendShortMsg(0x98, 0x17, 0x72);}


    if (shiftleft == 3){
        midi.sendShortMsg(0x97, 0x3A, 0);
        midi.sendShortMsg(0x97, 0x38, 0); midi.sendShortMsg(0x97, 0x39, 0); midi.sendShortMsg(0x97, 0x3B, 0);
    }else if (shiftleft == 2){
        midi.sendShortMsg(0x97, 0x3B, 0x7F);
        midi.sendShortMsg(0x97, 0x38, 0); midi.sendShortMsg(0x97, 0x39, 0); midi.sendShortMsg(0x97, 0x3A, 0);
    }else if (shiftleft == 1){
        midi.sendShortMsg(0x97, 0x38, 0x7F);
        midi.sendShortMsg(0x97, 0x39, 0); midi.sendShortMsg(0x97, 0x3A, 0); midi.sendShortMsg(0x97, 0x3B, 0);
    }else{
        midi.sendShortMsg(0x97, 0x39, 0x7F);
        midi.sendShortMsg(0x97, 0x38, 0); midi.sendShortMsg(0x97, 0x3A, 0); midi.sendShortMsg(0x97, 0x3B, 0);
    }


    for ( var i = 0; i < 4; i++) {

        if (shiftleft == 3){
            if ( engine.getParameter(getLeft(), "hotcue_"+(i+1)+"_enabled") != 0 ){ midi.sendShortMsg(0x97, 0x40+i, 0x2F); //0F 4F 7F
            }else{ midi.sendShortMsg(0x97, 0x40+i, 0);}
        }else if (shiftleft == 2){
            if ( engine.getParameter(getLeft(), "hotcue_"+(i+1)+"_enabled") != 0 ){ midi.sendShortMsg(0x97, 0x40+i, 0x7F); //0F 4F 7F
            }else{ midi.sendShortMsg(0x97, 0x40+i, 0);}
        }else if (shiftleft == 1){
            if ( engine.getParameter(getLeft(), "hotcue_"+(i+1)+"_enabled") != 0 ){ midi.sendShortMsg(0x97, 0x40+i, 0x4F); //0F 4F 7F
            }else{ midi.sendShortMsg(0x97, 0x40+i, 0);}
        }else{
            if ( engine.getParameter(getLeft(), "hotcue_"+(i+1)+"_enabled") != 0 ){

                if(engine.getParameter(getLeft(channel), "hotcue_1_type")==4 ){ midi.sendShortMsg(0x97, 0x40+i, 0x1F);
                }else{ midi.sendShortMsg(0x97, 0x40+i, 0x0F) }

            }else{ midi.sendShortMsg(0x97, 0x40+i, 0);}2
        }
    }
    for ( var i = 0; i < 4; i++) {
        if (shiftright == 3){
            if ( engine.getParameter(getRight(), "hotcue_"+(i+1)+"_enabled") != 0 ){ midi.sendShortMsg(0x98, 0x40+i, 0x2F); //0F 4F 7F
            }else{ midi.sendShortMsg(0x98, 0x40+i, 0);}
        }else if (shiftright == 2){
            if ( engine.getParameter(getRight(), "hotcue_"+(i+1)+"_enabled") != 0 ){ midi.sendShortMsg(0x98, 0x40+i, 0x7F); //0F 4F 7F
            }else{ midi.sendShortMsg(0x98, 0x40+i, 0);}
        }else if (shiftright == 1){
            if ( engine.getParameter(getRight(), "hotcue_"+(i+1)+"_enabled") != 0 ){ midi.sendShortMsg(0x98, 0x40+i, 0x4F); //0F 4F 7F
            }else{ midi.sendShortMsg(0x98, 0x40+i, 0);}
        }else{
            if ( engine.getParameter(getRight(), "hotcue_"+(i+1)+"_enabled") != 0 ){

                if(engine.getParameter(getRight(channel), "hotcue_1_type")==4 ){ midi.sendShortMsg(0x97, 0x40+i, 0x1F);
                }else{ midi.sendShortMsg(0x97, 0x40+i, 0x0F) }

            }else{ midi.sendShortMsg(0x98, 0x40+i, 0);}
        }
    }


    for ( var i = 0; i < 4; i++) {
        if (shiftleft == 3){
            if ( true ){ midi.sendShortMsg(0x97, 0x3c+i, 0x2F); //0F 4F 7F
            }else{ midi.sendShortMsg(0x97, 0x3c+i, 0);}
        }else if (shiftleft == 2){
            if ( true ){ midi.sendShortMsg(0x97, 0x3c+i, 0x7F); //0F 4F 7F
            }else{ midi.sendShortMsg(0x97, 0x3c+i, 0);}
        }else if (shiftleft == 1){
            if ( true ){ midi.sendShortMsg(0x97, 0x3c+i, 0x4F); //0F 4F 7F
            }else{ midi.sendShortMsg(0x97, 0x3c+i, 0);}
        }else{
            if ( true ){ midi.sendShortMsg(0x97, 0x3c+i, 0x0F); //0F 4F 7F
            }else{ midi.sendShortMsg(0x97, 0x3c+i, 0);}
        }
    }
    for ( var i = 0; i < 4; i++) {
        if (shiftright == 3){
            if ( true ){ midi.sendShortMsg(0x98, 0x3c+i, 0x2F); //0F 4F 7F
            }else{ midi.sendShortMsg(0x98, 0x3c+i, 0);}
        }else if (shiftright == 2){
            if ( true){ midi.sendShortMsg(0x98, 0x3c+i, 0x7F); //0F 4F 7F
            }else{ midi.sendShortMsg(0x98, 0x3c+i, 0);}
        }else if (shiftright == 1){
            if ( true){ midi.sendShortMsg(0x98, 0x3c+i, 0x4F); //0F 4F 7F
            }else{ midi.sendShortMsg(0x98, 0x3c+i, 0);}
        }else{
            if ( true){ midi.sendShortMsg(0x98, 0x3c+i, 0x0F); //0F 4F 7F
            }else{ midi.sendShortMsg(0x98, 0x3c+i, 0);}
        }
    }



    if ( engine.getParameter(getLeft(), "keylock") == 1 ){ midi.sendShortMsg(0x97, 0x00, 1);
    }else{ midi.sendShortMsg(0x97, 0x00, 0);
    }
    if ( engine.getParameter(getRight(), "keylock") == 1 ){ midi.sendShortMsg(0x98, 0x00, 1);
    }else{ midi.sendShortMsg(0x98, 0x00, 0);
    }

    var Async = engine.getParameter("[Channel1]","sync_mode") != 0;
    var Bsync = engine.getParameter("[Channel2]","sync_mode") != 0;
    var Csync = engine.getParameter("[Channel3]","sync_mode") != 0;
    var Dsync = engine.getParameter("[Channel4]","sync_mode") != 0;

    if ( engine.getParameter(getLeft(), "sync_mode") != 0 && engine.getParameter(getRight(), "sync_mode") != 0 ){
        midi.sendShortMsg(0x97, 0x5E, Math.round(engine.getParameter(getLeft(), "bpm")*127));
        midi.sendShortMsg(0x98, 0x5E, Math.round(engine.getParameter(getRight(), "bpm")*127));
    }else{
        midi.sendShortMsg(0x97, 0x5A, Math.round(engine.getParameter(getLeft(), "bpm")*127));
        midi.sendShortMsg(0x98, 0x5A, Math.round(engine.getParameter(getRight(), "bpm")*127));
    }

    if ( (engine.getParameter("[Channel1]", "beat_distance") < (0.1 + (0.7*(Async)))) && engine.getParameter( "[Channel1]", "play") || (Async && !engine.getParameter("[Channel1]", "play")) ){
    midi.sendShortMsg(0x97, 0x11, 0x7F);}else{
    midi.sendShortMsg(0x97, 0x11, 0x00);}
    if ( (engine.getParameter("[Channel2]", "beat_distance") < (0.1 + (0.7*(Bsync)))) && engine.getParameter( "[Channel2]", "play") || (Bsync && !engine.getParameter("[Channel2]", "play")) ){
    midi.sendShortMsg(0x98, 0x10, 0x7F); }else{
    midi.sendShortMsg(0x98, 0x10, 0x00);}
    if ( (engine.getParameter("[Channel3]", "beat_distance") < (0.1 + (0.7*(Csync)))) && engine.getParameter( "[Channel3]", "play") || (Csync && !engine.getParameter("[Channel3]", "play")) ){
    midi.sendShortMsg(0x97, 0x13, 0x7F); }else{
    midi.sendShortMsg(0x97, 0x13, 0x00);}
    if ( (engine.getParameter("[Channel4]", "beat_distance") < (0.1 + (0.7*(Dsync)))) && engine.getParameter( "[Channel4]", "play") || (Dsync && !engine.getParameter("[Channel4]", "play")) ){
    midi.sendShortMsg(0x98, 0x12, 0x7F); }else{
    midi.sendShortMsg(0x98, 0x12, 0x00);}


    var A18 = Math.round(engine.getParameter("[Channel1]", "beat_distance") * 9)
    var B18 = Math.round(engine.getParameter("[Channel2]", "beat_distance") * 9)
    var C18 = Math.round(engine.getParameter("[Channel3]", "beat_distance") * 9)
    var D18 = Math.round(engine.getParameter("[Channel4]", "beat_distance") * 9)
    if (A18<3){
        if(!Abeathalflock){ Abeathalf = 1-Abeathalf; Abeathalflock=true;}
    }else{Abeathalflock=false;}
    if (B18<3){
        if(!Bbeathalflock){ Bbeathalf = 1-Bbeathalf; Bbeathalflock=true;}
    }else{Bbeathalflock=false;}
    if (C18<3){
        if(!Cbeathalflock){ Cbeathalf = 1-Cbeathalf; Cbeathalflock=true;}
    }else{Cbeathalflock=false;}
    if (D18<3){
        if(!Dbeathalflock){ Dbeathalf = 1-Dbeathalf; Dbeathalflock=true;}
    }else{Dbeathalflock=false;}
    A18 += (9*Abeathalf);
    B18 += (9*Bbeathalf);
    C18 += (9*Cbeathalf);
    D18 += (9*Dbeathalf);
    var Aarray = [A18==0,A18==1,A18==2,A18==3,A18==4,A18==5,A18==6,A18==7,A18==8,A18==9,A18==10,A18==11,A18==12,A18==13,A18==14,A18==15,A18==16,A18==17,A18==18] ;
    var Barray = [B18==0,B18==1,B18==2,B18==3,B18==4,B18==5,B18==6,B18==7,B18==8,B18==9,B18==10,B18==11,B18==12,B18==13,B18==14,B18==15,B18==16,B18==17,B18==18] ;
    var Carray = [C18==0,C18==1,C18==2,C18==3,C18==4,C18==5,C18==6,C18==7,C18==8,C18==9,C18==10,C18==11,C18==12,C18==13,C18==14,C18==15,C18==16,C18==17,C18==18] ;
    var Darray = [D18==0,D18==1,D18==2,D18==3,D18==4,D18==5,D18==6,D18==7,D18==8,D18==9,D18==10,D18==11,D18==12,D18==13,D18==14,D18==15,D18==16,D18==17,D18==18] ;
    var La = [];
    for ( var i = 0; i < 19; i++) {
        La[i] = (   (Aarray[i]*5*engine.getParameter( "[Channel1]", "play")) + (Carray[i]*5*engine.getParameter( "[Channel3]", "play")) +
                    (Barray[i]*1*engine.getParameter( "[Channel2]", "play")) + (Darray[i]*1*engine.getParameter( "[Channel4]", "play")) ).clamp(0,7);}
    var Ra = [];
    for ( var i = 0; i < 19; i++) {
        Ra[i] = (   (Aarray[i]*1*engine.getParameter( "[Channel1]", "play")) + (Carray[i]*1*engine.getParameter( "[Channel3]", "play")) +
                    (Barray[i]*5*engine.getParameter( "[Channel2]", "play")) + (Darray[i]*5*engine.getParameter( "[Channel4]", "play")) ).clamp(0,7);}
    var leftarrayformatted = [0x10+La[0], (16*La[1])+La[2], (16*La[3])+La[4], (16*La[5])+La[6], (16*La[7])+La[8], (16*La[9])+La[10], (16*La[11])+La[12], (16*La[13])+La[14], (16*La[15])+La[16], (16*La[17])+La[18]]
    var rightarrayformatted = [0x20+Ra[0], (16*Ra[1])+Ra[2], (16*Ra[3])+Ra[4], (16*Ra[5])+Ra[6], (16*Ra[7])+Ra[8], (16*Ra[9])+Ra[10], (16*Ra[11])+Ra[12], (16*Ra[13])+Ra[14], (16*Ra[15])+Ra[16], (16*Ra[17])+Ra[18]]


    if(shiftleft==2){
        var La = [];
        for ( var i = 0; i < 19; i++) { La[i] =     Math.round( ( ( engine.getParameter(getLeft(), "playposition")*19 ) - i ).clamp(0,1) * 7 )   }
        leftarrayformatted = [0x10+La[0], (16*La[1])+La[2], (16*La[3])+La[4], (16*La[5])+La[6], (16*La[7])+La[8], (16*La[9])+La[10], (16*La[11])+La[12], (16*La[13])+La[14], (16*La[15])+La[16], (16*La[17])+La[18]]
    }else if(shiftleft==1){
        var La = [];
        for ( var i = 0; i < 19; i++) { La[i] =   5- Math.abs( Math.round( ( ( engine.getParameter("[QuickEffectRack1_"+getLeft()+"]", "super1")*19 ) - i ).clamp(-5,5) ) ) }
        leftarrayformatted = [0x10+La[0], (16*La[1])+La[2], (16*La[3])+La[4], (16*La[5])+La[6], (16*La[7])+La[8], (16*La[9])+La[10], (16*La[11])+La[12], (16*La[13])+La[14], (16*La[15])+La[16], (16*La[17])+La[18]]
    }

    if(shiftright==2){
        var Ra = [];
        for ( var i = 0; i < 19; i++) { Ra[i] =     Math.round( ( ( engine.getParameter(getRight(), "playposition")*19 ) - i ).clamp(0,1) * 7 )   }
        rightarrayformatted = [0x20+Ra[0], (16*Ra[1])+Ra[2], (16*Ra[3])+Ra[4], (16*Ra[5])+Ra[6], (16*Ra[7])+Ra[8], (16*Ra[9])+Ra[10], (16*Ra[11])+Ra[12], (16*Ra[13])+Ra[14], (16*Ra[15])+Ra[16], (16*Ra[17])+Ra[18]]
    }else if(shiftright==1){
        var Ra = [];
        for ( var i = 0; i < 19; i++) { Ra[i] =   5- Math.abs(  Math.round( ( ( engine.getParameter("[QuickEffectRack1_"+getRight()+"]", "super1")*19 ) - i ).clamp(-5,5) ) ) }
        rightarrayformatted = [0x20+Ra[0], (16*Ra[1])+Ra[2], (16*Ra[3])+Ra[4], (16*Ra[5])+Ra[6], (16*Ra[7])+Ra[8], (16*Ra[9])+Ra[10], (16*Ra[11])+Ra[12], (16*Ra[13])+Ra[14], (16*Ra[15])+Ra[16], (16*Ra[17])+Ra[18]]
    }

        var sysinit = [0xF0,0x00,0x20,0x29,0x00,0x16];
        var sysend = [0xF7];

        midi.sendSysexMsg(sysinit.concat(leftarrayformatted, sysend));
        midi.sendSysexMsg(sysinit.concat(rightarrayformatted, sysend));



}


//_________________________________________________________________________________________________________________________________________________/

Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};

function encoderCalc(value){
    if (value < 64){ return value ;
    }else{ return value-128 ;
}};

function getIsLeftRaw(channel) {
    print("get raw" + channel);
    if (channel == 7) { print("left"); return true ;
    }else{ print("right"); return false ;
    }
}

function getShiftRaw(channel) {
    print("get shift raw" + channel);
    if (channel == 7) { print("left"); return shiftleft ;
    }else{ print("right"); return shiftright ;
    }
}

function getActive(channel) {
    print("get active" + channel);
    if (channel == 7) {
        if(leftdeck==0){ print("left up"); return "[Channel1]" ;
        }else{ print("left down"); return "[Channel3]" ;
        }
    }else{
        if(rightdeck==0){ print("right up"); return "[Channel2]" ;
        }else{ print("right down"); return "[Channel4]" ;
        }
    }
}

function getLeft() {
    if (leftdeck == 0) {return "[Channel1]" ;
    }else{return "[Channel3]" ;}
}

function getRight() {
    if (rightdeck == 0) {return "[Channel2]" ;
    }else{return "[Channel4]" ;}
}

function getTop(channel) {
    if (channel == 7) {return "[Channel1]" ;
    }else{return "[Channel2]" ;}
}

function getBottom(channel) {
    if (channel == 7) {return "[Channel3]" ;
    }else{return "[Channel4]" ;}
}
