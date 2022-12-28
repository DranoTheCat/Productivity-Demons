$SD.on('connected', conn => connected(conn));

function connected (jsn) {
    console.log('Productivity Demon plugin connected: ' + jsn);
    $SD.on('com.dranothecat.productivitydemon.action.willAppear', jsonObj =>
        demonAction.onWillAppear(jsonObj)
    );
    $SD.on('com.dranothecat.productivitydemon.action.keyDown', jsonObj =>
        demonAction.onKeyDown(jsonObj)
    );
    $SD.on('com.dranothecat.productivitydemon.action.keyUp', jsonObj =>
        demonAction.onKeyUp(jsonObj)
    );
    $SD.on('com.dranothecat.productivitydemon.action.sendToPlugin', jsonObj =>
        demonAction.onSendToPlugin(jsonObj)
    );
}

// we want to lose these values when we restart / crash
var keyDownPush = false; 
var lastSave = 0;
var slotMode = false;
var animationTime = 0;
var animationFrame = 1;
var animationSet = "happy";
var animationAction = "idle";
var lastBreath = 0;
var lastOtherAnim = 0;
var frameNum = 0;
var lastFrame = 0;
var lastReset = 0;

var demonAction = {
    type: "com.dranothecat.productivitydemon.action",
    cache: {},
    lastContext: null,
    defaultHandleObj: {
        timer: null,
        canvas: null,
        settings: {
            easyOutcome: "Relax!",
            mediumOutcome: "Stretch!",
            hardOutcome: "Be Productive!",
            interactionIntervalMinutes: 15,
            dailyScoreTarget: 100,
            resetHour: 0,
            r_lastInteractionTime: 0,
            r_scoreTotal: 0,
        },
    },

    getHandleObjFromCache: function(context){
        let handleObj = this.cache[context];
        if(handleObj === undefined){
            handleObj = JSON.parse(JSON.stringify(this.defaultHandleObj));
            this.cache[context] = handleObj;
        }
        return handleObj;
    },

    onKeyDown: function(jsonObj) { 
        var context = jsonObj.context;
        lastContext = context;
        keyDownPush = true;
        demonAction.updateSafeSettings(context, {
            r_lastInteractionTime: Date.now(),
        });
    },

    onKeyUp: function(jsonObj) {
        var context = jsonObj.context;
        lastContext = context;
        let handleObj = this.getHandleObjFromCache(context);
        let r_scoreTotal = handleObj.settings.r_scoreTotal;
        let r_lastInteractionTime = handleObj.settings.r_lastInteractionTime;
        let now = Date.now();

        if (keyDownPush == true && now - r_lastInteractionTime > 500) { // long press -- reset
            keyDownPush = false;
            r_scoreTotal = 0;
            animationSet = "happy";
            r_lastInteractionTime = now;
            lastReset = now;
            demonAction.updateSafeSettings(context, {
                r_scoreTotal: r_scoreTotal,
                r_lastInteractionTime: r_lastInteractionTime,
            });
        }

        // If we are in slots mode, we want to stop the spin. 
        // Otherwise, enter it.
        if (slotMode) {
            slotMode = false;
            // TODO - Choose an outcome
        } else {
            slotMode = true;
            animationSet = "slots";
            animationAction = "spin";
            demonAction.updateSafeSettings(context, {
                r_lastInteractionTime: now,
            });
        }

        /*r_scoreTotal += 5;

        let as = "happy";
        if (r_animationSet == 'blissful') {
            as = 'blissful';
        }
        demonAction.updateSafeSettings(context, {
            r_lastInteractionTime: now,
            r_animationSet: as,
            r_animationAction: "blink",
            r_scoreTotal: r_scoreTotal,
        }); */
        this.updateDisplay(context);
    },

    onWillAppear: function(jsonObj) {
        var context = jsonObj.context;
        var settings = jsonObj.payload.settings;
        console.log(jsonObj);
        console.log("settings: ");
        console.log(settings);
        lastContext = context;
        let handleObj = this.getHandleObjFromCache(context);
        if (settings != null) {
            if (settings.hasOwnProperty('r_lastInteractionTime')) {
                handleObj.settings.r_lastInteractionTime = settings['r_lastInteractionTime'];
                if (handleObj.settings.r_lastInteractionTime === undefined || isNaN(handleObj.settings.r_lastInteractionTime)) {
                    handleObj.settings.r_lastInteractionTime = 0;
                }
            }
            if (settings.hasOwnProperty('r_scoreTotal')) {
                handleObj.settings.r_scoreTotal = settings['r_scoreTotal'];
                if (handleObj.settings.r_scoreTotal === undefined || isNaN(handleObj.settings.r_scoreTotal)) {
                    handleObj.settings.r_scoreTotal = 0;
                }
            }
            if (settings.hasOwnProperty('easyOutcome')) {
                handleObj.settings.easyOutcome = settings['easyOutcome'] || "Rleax!";
            }
            if (settings.hasOwnProperty('mediumOutcome')) {
                handleObj.settings.mediumOutcome = settings['mediumOutcome'] || "Stretch!";
            }
            if (settings.hasOwnProperty('hardOutcome')) {
                handleObj.settings.hardOutcome = settings['hardOutcome'] || "Be Productive!";
            }
            if (settings.hasOwnProperty('interactionIntervalMinutes')) {
                handleObj.settings.interactionIntervalMinutes = settings['interactionIntervalMinutes'] || 5; // Swich 5 for some kind of var ffs
            }
            if (settings.hasOwnProperty('dailyScoreTarget')) {
                handleObj.settings.dailyScoreTarget = settings['dailyScoreTarget'] || 100;
            }
            if (settings.hasOwnProperty('resetHour')) {
                handleObj.settings.resetHour = settings['resetHour'] || 0;
            }
        }

        console.log("onWillAppear interactionIntervalMinutes at " + handleObj.settings.interactionIntervalMinutes);
        handleObj.timer = setInterval(function () {
            demonAction.updateDisplay(context);
        }, 32);
        demonAction.updateDisplay(context);
    },

    onSendToPlugin: function(jsonObj){
        var context = jsonObj.context;
        let handleObj = this.getHandleObjFromCache(context);
        if (jsonObj.payload.hasOwnProperty('DATAREQUEST')) {
            console.log(jsonObj);
            console.log("updating PI");
            $SD.api.sendToPropertyInspector(
                jsonObj.context,
                {
                    easyOutcome: handleObj.settings.easyOutcome,
                    mediumOutcome: handleObj.settings.mediumOutcome,
                    hardOutcome: handleObj.settings.hardOutcome,
                    interactionIntervalMinutes: handleObj.settings.interactionIntervalMinutes,
                    dailyScoreTarget: handleObj.settings.dailyScoreTarget,
                    resetHour: handleObj.settings.resetHour,
                },
                this.type
            );
        } else {
            if (jsonObj.payload.hasOwnProperty('easyOutcome')) {
                const val = jsonObj.payload['easyOutcome'];
                handleObj.settings.easyOutcome = val;
            }
            if (jsonObj.payload.hasOwnProperty('mediumOutcome')) {
                const val = jsonObj.payload['mediumOutcome'];
                handleObj.settings.mediumOutcome = val;
            }
            if (jsonObj.payload.hasOwnProperty('hardOutcome')) {
                const val = jsonObj.payload['hardOutcome'];
                handleObj.settings.hardOutcome = val;
            }
            if (jsonObj.payload.hasOwnProperty('interactionIntervalMinutes')) {
                const val = parseInt(jsonObj.payload['interactionIntervalMinutes']) || 15;
                console.log("onSendToPlugin resetting interactionIntervalMinutes to " + val);
                handleObj.settings.interactionIntervalMinutes = val;
            }
            if (jsonObj.payload.hasOwnProperty('dailyScoreTarget')) {
                const val = parseInt(jsonObj.payload['dailyScoreTarget']) || 100;
                handleObj.settings.dailyScoreTarget = val;
            }
            if (jsonObj.payload.hasOwnProperty('resetHour')) {
                const val = parseInt(jsonObj.payload['resetHour']) || 0;
                handleObj.settings.resetHour = val;
            }
            console.log("onSendToPlugin resetting interactionIntervalMinutes to " + handleObj.settings.interactionIntervalMinutes);
            demonAction.updateSettings(context, {
                easyOutcome: handleObj.settings.easyOutcome,
                mediumOutcome: handleObj.settings.mediumOutcome,
                hardOutcome: handleObj.settings.hardOutcome,
                interactionIntervalMinutes: handleObj.settings.interactionIntervalMinutes,
                dailyScoreTarget: handleObj.settings.dailyScoreTarget,
                resetHour: handleObj.settings.resetHour,
            });
        }
    },

    updateDisplay: function(context) {
        let handleObj = this.getHandleObjFromCache(context);
        
        let r_lastInteractionTime = handleObj.settings.r_lastInteractionTime;
        let r_scoreTotal = handleObj.settings.r_scoreTotal;
        let now = Date.now();

        if (now - lastSave > 30000) {
            console.log("Saving runtime.");
            lastSave = now;
            demonAction.saveSafeSettings(context);
        }

        // Do we need to reset?
        let tdelta = now - lastReset;
        if (tdelta > 7200000) { // 7.2m is 2 hours of ms
            let td = new Date();
            if (td.getHours() >= handleObj.settings.resetHour || tdelta > 86400000) { // 1 day in ms
                r_scoreTotal = 0;
                r_lastInteractionTime = now;
                demonAction.updateSafeSettings(context, {
                    r_lastInteractionTime: now,
                    r_scoreTotal: r_scoreTotal,
                });
            }
        }

        // Track 24 frame-rate for background stuffs (pentagram, etc.)
        if (now - lastFrame > 41.67) {
            frameNum += 1;
            if (frameNum >= 24) {
                frameNum = 1;
            }
            lastFrame = now;
        }

        if (animationAction == 'idle') {
            animationFrame = 1;
            if (animationSet != 'blissful') {
                if (r_scoreTotal >= handleObj.settings.dailyScoreTarget) {
                    animationSet = "blissful";
                }
            }
        } else {
            if (animationFrame >= Object.keys(animationTimings[""+animationSet][""+animationAction]).length) {
                animationFrame = 1;
                if (animationAction != "spin") { // TODO: Find a way to make suck less
                    animationAction = 'idle';
                }
                demonAction.updateSafeSettings(context, {
                    animationFrame: animationFrame,
                    animationAction: animationAction,
                });
            }
        }

        // Are we currently idle? If so, other animations are possible.
        if (animationAction == 'idle') {
            // Has our last breath been over 4 seconds ago?
            if (now - lastBreath > breathCycles[""+animationSet]) {
                lastBreath = now;
                animationAction = "breath";
                animationFrame = 1;
            } else {
                if (now - lastOtherAnim > 1000) { // Check to run other animations every second
                    lastOtherAnim = now;
                    // Also a good time to see if we need to change state
                    if (animationSet != 'blissful') {
                        deltaInterval = parseInt((now - r_lastInteractionTime) / (handleObj.settings.interactionIntervalMinutes * 500 * 60)); // 500 because /2
                        if (deltaInterval >= stateIntervals.length) {
                            deltaInterval = stateIntervals.length - 1;
                        }
                        nstate = stateIntervals[deltaInterval];
                        if (nstate != animationSet) {
                            animationSet = nstate;
                        }
                    }
                    for (let j in animationOthers[animationSet]) {
                        if (Math.random() < animationOthers[animationSet][j]) {
                            animationFrame = 1;
                            animationAction = j;
                        }
                    }
                }
            }
        } else {
            if (now - animationTime > animationTimings[""+animationSet][""+animationAction][animationFrame]) {
                animationFrame += 1;
                animationTime = now;
            }
        }

        if(handleObj.canvas === null){
            handleObj.canvas = document.createElement("canvas");
            handleObj.canvas.width = 144;
            handleObj.canvas.height = 144;
            handleObj.canvas.context = context;
        }

        let ctx = handleObj.canvas.getContext("2d");
        ctx.filter = "none";
        ctx.fillStyle = "#0A1423";
        ctx.fillRect(0, 0, handleObj.canvas.width, handleObj.canvas.height);
        
        // Draw the background frame if we have one
        if (animationSet == 'hellpossessed') {
            let bgImg = new Image();
            let bgImgURL = bgAnimations["hellpossessed"][frameNum];
            bgImg.onload = () => {
                // Set the background gradient
                let gradient = ctx.createLinearGradient(72, 0, 72, 144);
                gradient.addColorStop(0, "black");
                gradient.addColorStop(0.5, gradientBackgrounds[""+animationSet][0]);
                gradient.addColorStop(1, gradientBackgrounds[""+animationSet][1]);
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, 144, 144);
                ctx.fillStyle = "#0A1423";
                // draw the pentagram
                ctx.drawImage(bgImg, 0, -144 + (12 * frameNum));
            };
            bgImg.src = bgImgURL;
        } else {
            // Set the background gradient
            let gradient = ctx.createLinearGradient(72, 0, 72, 144);
            gradient.addColorStop(0, "black");
            gradient.addColorStop(0.5, gradientBackgrounds[""+animationSet][0]);
            gradient.addColorStop(1, gradientBackgrounds[""+animationSet][1]);
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 144, 144);
        }

        let resImageURL = animationFrames[""+animationSet][""+animationAction][animationFrame]
        let img = new Image();
        img.onload = () => {
            var handleObj = this.getHandleObjFromCache(context);

            // Draw the base frame PNG
            ctx.fillStyle = "#0A1423";
            ctx.drawImage(img, 0, 0);
            
            // Draw the Progress Bar until Next Slot Event
            if (animationAction != "spin") { 
                nextEventBar = {
                    x: 6,
                    y: 6,
                    width: 2,
                    height: 120,
                };
                let time_delta = now - r_lastInteractionTime;
                let time_pct = time_delta / (handleObj.settings.interactionIntervalMinutes * 1000 * 60);
                time_pct = time_pct - Math.floor(time_pct); // Keep resetting the bar
                if (time_pct > 1) {
                    time_pct = 1;
                }
                // Red Bar Total
                ctx.fillStyle = "#FF4444";
                ctx.fillRect(nextEventBar.x, nextEventBar.y, nextEventBar.width, nextEventBar.height);   
                // Green Bar Percent
                ctx.fillStyle = "#44FF44";
                let pixels_to_fill = nextEventBar.height;
                if (time_pct <= 1) {
                    pixels_to_fill -= Math.floor(time_pct * nextEventBar.height);
                    if (pixels_to_fill < 1) {
                        pixels_to_fill = 1;
                    }
                }
                if (animationSet == 'blissful') {
                    pixels_to_fill = nextEventBar.height;
                }
                ctx.fillRect(nextEventBar.x, nextEventBar.y + (nextEventBar.height - pixels_to_fill), nextEventBar.width, pixels_to_fill);

                // Draw the Score Progress Bar
                scoreBar = {
                    x: 136,
                    y: 6,
                    width: 2,
                    height: 120,
                };
                score_pct = r_scoreTotal / handleObj.settings.dailyScoreTarget;
                if (score_pct > 1) {
                    score_pct = 1;
                }
                // Gray Bar Total
                ctx.fillStyle = "#888888";
                ctx.fillRect(scoreBar.x, scoreBar.y, scoreBar.width, scoreBar.height);   
                // Blue Bar Percent
                ctx.fillStyle = "#4444FF";
                ctx.fillRect(scoreBar.x, scoreBar.y + ((1 - score_pct) * scoreBar.height), scoreBar.width, score_pct * scoreBar.height);
            }

            // Update
            $SD.api.setImage(context, handleObj.canvas.toDataURL());
        };
        img.src = resImageURL;
    },

    saveSafeSettings: function(context) {
        let handleObj = this.getHandleObjFromCache(context);
        $SD.api.setSettings(context, handleObj.settings);
    },

    updateSafeSettings: function(context, settings) {
        let handleObj = this.getHandleObjFromCache(context);
        let updatedSettings = handleObj.settings;
        for(let field in settings){
            updatedSettings[field] = settings[field];
        }
    },

    updateSettings: function(context, settings) {
        let handleObj = this.getHandleObjFromCache(context);
        let updatedSettings = handleObj.settings;
        for(let field in settings){
            updatedSettings[field] = settings[field];
        }
        $SD.api.setSettings(context, updatedSettings);
    },
};
