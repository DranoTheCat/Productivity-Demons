$SD.on('connected', conn => connected(conn));

function connected (jsn) {
    console.log('Productivity Demon plugin connected: ' + jsn);

    /** subscribe to the willAppear event */
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

var r_animationFrames = {
    "happy": {
        "idle": {
            "1": "images/happy1.png",
        },
        "breath": {
            "1": "images/happy2.png",
            "2": "images/happy3.png",
            "3": "images/happy4.png",
        },
        "blink": {
            "1": "images/happy6.png",
            "2": "images/happy7.png",
            "3": "images/happy8.png",
            "4": "images/happy9.png",
            "5": "images/happy10.png",
        },
    },
    "meh": {
        "idle": {
            "1": "images/meh1.png",
        },
        "breath": {
            "1": "images/meh2.png",
            "2": "images/meh3.png",
            "3": "images/meh4.png",
        },
        "blink": {
            "1": "images/meh6.png",
            "2": "images/meh7.png",
            "3": "images/meh8.png",
            "4": "images/meh9.png",
            "5": "images/meh10.png",
        },
    },
    "angry": {
        "idle": {
            "1": "images/angry1.png",
        },
        "breath": {
            "1": "images/angry2.png",
            "2": "images/angry3.png",
            "3": "images/angry4.png",
        },
        "blink": {
            "1": "images/angry6.png",
            "2": "images/angry7.png",
            "3": "images/angry8.png",
            "4": "images/angry9.png",
            "5": "images/angry10.png",
        },
    },
    "furious": {
        "idle": {
            "1": "images/furious1.png",
        },
        "breath": {
            "1": "images/furious2.png",
            "2": "images/furious3.png",
            "3": "images/furious4.png",
        },
        "blink": {
            "1": "images/furious6.png",
            "2": "images/furious7.png",
            "3": "images/furious8.png",
            "4": "images/furious9.png",
            "5": "images/furious10.png",
        },
    },
    "hellpossessed": {
        "idle": {
            "1": "images/furious1.png",
        },
        "breath": {
            "1": "images/furious2.png",
            "2": "images/furious3.png",
            "3": "images/furious4.png",
        },
        "blink": {
            "1": "images/furious6.png",
            "2": "images/furious7.png",
            "3": "images/furious8.png",
            "4": "images/furious9.png",
            "5": "images/furious10.png",
        },
    },
    "blissful": {
        "idle": {
            "1": "images/blissful1.png",
        },
        "breath": {
            "1": "images/blissful2.png",
            "2": "images/blissful3.png",
            "3": "images/blissful4.png",
        },
        "blink": {
            "1": "images/blissful6.png",
            "2": "images/blissful7.png",
            "3": "images/blissful8.png",
            "4": "images/blissful9.png",
            "5": "images/blissful10.png",
        },
    },
};

var bgAnimations = {
    "hellpossessed": {
        "1": "images/ring1.png",
        "2": "images/ring2.png",
        "3": "images/ring3.png",
        "4": "images/ring4.png",
        "5": "images/ring5.png",
        "6": "images/ring6.png",
        "7": "images/ring1.png",
        "8": "images/ring2.png",
        "9": "images/ring3.png",
        "10": "images/ring4.png",
        "11": "images/ring5.png",
        "12": "images/ring6.png",
        "13": "images/ring1.png",
        "14": "images/ring2.png",
        "15": "images/ring3.png",
        "16": "images/ring4.png",
        "17": "images/ring5.png",
        "18": "images/ring6.png",
        "19": "images/ring1.png",
        "20": "images/ring2.png",
        "21": "images/ring3.png",
        "22": "images/ring4.png",
        "23": "images/ring5.png",
        "24": "images/ring6.png",
    },
};

var animationTimings = {
    "happy": {
        "idle": {
            "1": 9999,
        },
        "breath": {
            "1": 32,
            "2": 420,
            "3": 64,
        },
        "blink": {
            "1": 50,
            "2": 32,
            "3": 200,
            "4": 32,
            "5": 50,
        }
    },
    "meh": {
        "idle": {
            "1": 9999,
        },
        "breath": {
            "1": 32,
            "2": 420,
            "3": 64,
        },
        "blink": {
            "1": 50,
            "2": 32,
            "3": 200,
            "4": 32,
            "5": 50,
        }
    },
    "angry": {
        "idle": {
            "1": 9999,
        },
        "breath": {
            "1": 32,
            "2": 420,
            "3": 64,
        },
        "blink": {
            "1": 50,
            "2": 32,
            "3": 200,
            "4": 32,
            "5": 50,
        }
    },
    "furious": {
        "idle": {
            "1": 9999,
        },
        "breath": {
            "1": 32,
            "2": 420,
            "3": 64,
        },
        "blink": {
            "1": 50,
            "2": 32,
            "3": 200,
            "4": 32,
            "5": 50,
        }
    },
    "hellpossessed": {
        "idle": {
            "1": 9999,
        },
        "breath": {
            "1": 32,
            "2": 420,
            "3": 64,
        },
        "blink": {
            "1": 50,
            "2": 32,
            "3": 200,
            "4": 32,
            "5": 50,
        }
    },
    "blissful": {
        "idle": {
            "1": 9999,
        },
        "breath": {
            "1": 32,
            "2": 420,
            "3": 64,
        },
        "blink": {
            "1": 50,
            "2": 32,
            "3": 200,
            "4": 32,
            "5": 50,
        }
    },
};

var animationOthers = {
    "happy": {
        "blink": 0.2, // 20% chance each second
    },
    "meh": {
        "blink": 0.2, 
    },
    "angry": {
        "blink": 0.15, 
    },
    "furious": {
        "blink": 0.1, 
    },
    "hellpossessed": {
        "blink": 0.05,
    },
    "blissful": {
        "blink": 0.2, 
    }
};

var breathCycles = {
    "happy": 4000,
    "meh": 4000,
    "angry": 4000,
    "furious": 3000,
    "hellpossessed": 2000,
    "blissful": 6000,
};

var gradientBackgrounds = {
    "happy": [
        "#000000",
        "#000000",
    ],
    "meh": [
        "#110000",
        "#220000",
    ],
    "angry": [
        "#220000",
        "#440000",
    ],
    "furious": [
        "#440000",
        "#880000",
    ],
    "hellpossessed": [
        "#880000",
        "#ff0000",
    ],
    "blissful": [
        "#ff00ff",
        "#00ffff",
    ],
};

var stateIntervals = [
    "happy",
    "meh",
    "meh",
    "angry",
    "angry",
    "angry",
    "angry",
    "furious",
    "furious",
    "furious",
    "furious",
    "hellpossessed",
];

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
            interactionIntervalMinutes: 33, // 15?
            dailyScoreTarget: 100,
            r_lastInteractionTime: 0,
            r_scoreTotal: 0,
            r_animationTime: 0,
            r_animationFrame: 1,
            r_animationSet: "happy",
            r_animationAction: "idle",
            r_lastBreath: 0,
            r_lastOtherAnim: 0,
            r_frameNum: 0,
            r_lastFrame: 0,
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
        demonAction.updateSafeSettings(context, {
            r_lastInteractionTime: Date.now(),
        });
    },

    onKeyUp: function(jsonObj) {
        var context = jsonObj.context;
        lastContext = context;
        let handleObj = this.getHandleObjFromCache(context);
        let r_scoreTotal = handleObj.settings.r_scoreTotal;
        let r_animationSet = handleObj.settings.r_animationSet;
        let r_lastInteractionTime = handleObj.settings.r_lastInteractionTime;

        if (Date.now() - r_lastInteractionTime > 500) { // long press -- reset
            r_scoreTotal = 0;
            r_animationSet = "happy";
            demonAction.updateSafeSettings(context, {
                r_animationSet: r_animationSet,
                r_scoreTotal: r_scoreTotal,
            });
        }

        // do slot machine stuff here    
        r_scoreTotal += 5;

        let now = Date.now();
        let as = "happy";
        if (r_animationSet == 'blissful') {
            as = 'blissful';
        }
        demonAction.updateSafeSettings(context, {
            r_lastInteractionTime: now,
            r_animationSet: as,
            r_animationAction: "blink",
            r_scoreTotal: r_scoreTotal,
        });
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
            if (settings.hasOwnProperty('r_animationTime')) {
                handleObj.settings.r_animationTime = settings['r_animationTime'];
                if (handleObj.settings.r_animationTime === undefined || isNaN(handleObj.settings.r_animationTime)) {
                    handleObj.settings.r_animationTime = 0;
                }
            }
            if (settings.hasOwnProperty('r_animationFrame')) {
                handleObj.settings.r_animationFrame = settings['r_animationFrame'];
                if (handleObj.settings.r_animationFrame === undefined || isNaN(handleObj.settings.r_animationFrame)) {
                    handleObj.settings.r_animationFrame = 1;
                }
            }
            if (settings.hasOwnProperty('r_animationSet')) {
                handleObj.settings.r_animationSet = settings['r_animationSet'];
                if (handleObj.settings.r_animationSet === undefined) {
                    handleObj.settings.r_animationSet = "happy";
                }
            }
            if (settings.hasOwnProperty('r_animationAction')) {
                handleObj.settings.r_animationAction = settings['r_animationAction'];
                if (handleObj.settings.r_animationAction === undefined) {
                    handleObj.settings.r_animationAction = "idle";
                }
            }
            if (settings.hasOwnProperty('r_lastBreath')) {
                handleObj.settings.r_lastBreath = settings['r_lastBreath'];
                if (handleObj.settings.r_lastBreath === undefined) {
                    handleObj.settings.r_lastBreath = 0;
                }
            }
            if (settings.hasOwnProperty('r_lastOtherAnim')) {
                handleObj.settings.r_lastOtherAnim = settings['r_lastOtherAnim'];
                if (handleObj.settings.r_lastOtherAnim === undefined) {
                    handleObj.settings.r_lastOtherAnim = 0;
                }
            }
            if (settings.hasOwnProperty('r_frameNum')) {
                handleObj.settings.r_frameNum = settings['r_frameNum'];
                if (handleObj.settings.r_frameNum === undefined) {
                    handleObj.settings.r_frameNum = 0;
                }
            }
            if (settings.hasOwnProperty('r_lastFrame')) {
                handleObj.settings.r_lastFrameNum = settings['r_lastFrame'];
                if (handleObj.settings.r_lastFrame === undefined) {
                    handleObj.settings.r_lastFrame = 0;
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
        }

        console.log("onWillAppear interactionIntervalMinutes at " + handleObj.settings.interactionIntervalMinutes);
        handleObj.timer = setInterval(function () {
            demonAction.updateDisplay(context);
        }, 32);
        demonAction.onKeyUp(jsonObj); // click on start
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
                const val = parseInt(jsonObj.payload['interactionIntervalMinutes']) || 5;
                console.log("onSendToPlugin resetting interactionIntervalMinutes to " + val);
                handleObj.settings.interactionIntervalMinutes = val;
            }
            if (jsonObj.payload.hasOwnProperty('dailyScoreTarget')) {
                const val = parseInt(jsonObj.payload['dailyScoreTarget']) || 100;
                handleObj.settings.dailyScoreTarget = val;
            }
            console.log("onSendToPlugin resetting interactionIntervalMinutes to " + handleObj.settings.interactionIntervalMinutes);
            demonAction.updateSettings(context, {
                easyOutcome: handleObj.settings.easyOutcome,
                mediumOutcome: handleObj.settings.mediumOutcome,
                hardOutcome: handleObj.settings.hardOutcome,
                interactionIntervalMinutes: handleObj.settings.interactionIntervalMinutes,
                dailyScoreTarget: handleObj.settings.dailyScoreTarget,
            });
        }
    },

    updateDisplay: function(context) {
        let handleObj = this.getHandleObjFromCache(context);
        
        let r_animationTime = handleObj.settings.r_animationTime;
        let r_animationFrame = handleObj.settings.r_animationFrame;
        let r_animationSet = handleObj.settings.r_animationSet;
        let r_animationAction = handleObj.settings.r_animationAction;
        let r_lastBreath = handleObj.settings.r_lastBreath;
        let r_lastOtherAnim = handleObj.settings.r_lastOtherAnim;
        let r_lastInteractionTime = handleObj.settings.r_lastInteractionTime;
        let r_scoreTotal = handleObj.settings.r_scoreTotal;
        let r_frameNum = handleObj.settings.r_frameNum;
        let r_lastFrame = handleObj.settings.r_lastFrame;
        let now = Date.now();

        // Track 24 frame-rate for background stuffs (pentagram, etc.)
        if (now - r_lastFrame > 41.67) {
            r_frameNum += 1;
            if (r_frameNum >= 24) {
                r_frameNum = 1;
            }
            r_lastFrame = now;
            demonAction.updateSafeSettings(context, {
                r_frameNum: r_frameNum,
                r_lastFrame: r_lastFrame,
            });
        }

        if (r_animationAction == 'idle') {
            r_animationFrame = 1;
            if (r_animationSet != 'blissful') {
                if (r_scoreTotal >= handleObj.settings.dailyScoreTarget) {
                    r_animationSet = "blissful";
                    demonAction.updateSafeSettings(context, {
                        r_animationSet: r_animationSet,
                    });
                }
            }
        } else {
            if (r_animationFrame >= Object.keys(animationTimings[""+r_animationSet][""+r_animationAction]).length) {
                r_animationFrame = 1;
                r_animationAction = 'idle';
                demonAction.updateSafeSettings(context, {
                    r_animationFrame: r_animationFrame,
                    r_animationAction: r_animationAction,
                });
            }
        }

        // Are we currently idle? If so, other animations are possible.
        if (r_animationAction == 'idle') {
            // Has our last breath been over 4 seconds ago?
            if (now - r_lastBreath > breathCycles[""+r_animationSet]) {
                r_lastBreath = now;
                r_animationAction = "breath";
                r_animationFrame = 1;
                demonAction.updateSafeSettings(context, {
                    r_animationFrame: r_animationFrame,
                    r_animationAction: r_animationAction,
                    r_lastBreath: r_lastBreath,
                });
            } else {
                if (now - r_lastOtherAnim > 1000) { // Check to run other animations every second
                    // Also a good time to see if we need to change state
                    if (r_animationSet != 'blissful') {
                        deltaInterval = parseInt((now - r_lastInteractionTime) / (handleObj.settings.interactionIntervalMinutes * 500)); // TODO: * 60 // 500 because /2
                        if (deltaInterval >= stateIntervals.length) {
                            deltaInterval = stateIntervals.length - 1;
                        }
                        nstate = stateIntervals[deltaInterval];
                        if (nstate != r_animationSet) {
                            r_animationSet = nstate;
                            demonAction.updateSafeSettings(context, {
                                r_animationSet: r_animationSet,
                            });
                        }
                    }
                    for (let j in animationOthers[r_animationSet]) {
                        if (Math.random() < animationOthers[r_animationSet][j]) {
                            r_animationFrame = 1;
                            r_animationAction = j;
                            demonAction.updateSafeSettings(context, {
                                r_animationFrame: r_animationFrame,
                                r_animationAction: r_animationAction,
                                r_lastOtherAnim: now,
                            });
                            //break;
                        }
                    }
                    demonAction.updateSafeSettings(context, {
                        r_lastOtherAnim: now,
                    });
                }
            }
        } else {
            if (now - r_animationTime > animationTimings[""+r_animationSet][""+r_animationAction][r_animationFrame]) {
                r_animationFrame += 1;
                r_animationTime = now;
                demonAction.updateSafeSettings(context, {
                    r_animationFrame: r_animationFrame,
                    r_animationTime: r_animationTime,
                });
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
        if (r_animationSet == 'hellpossessed') {
            let bgImg = new Image();
            let bgImgURL = bgAnimations["hellpossessed"][r_frameNum];
            bgImg.onload = () => {
                // Set the background gradient
                let gradient = ctx.createLinearGradient(72, 0, 72, 144);
                gradient.addColorStop(0, "black");
                gradient.addColorStop(0.5, gradientBackgrounds[""+r_animationSet][0]);
                gradient.addColorStop(1, gradientBackgrounds[""+r_animationSet][1]);
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, 144, 144);
                ctx.fillStyle = "#0A1423";
                // draw the pentagram
                ctx.drawImage(bgImg, 0, -144 + (12 * r_frameNum));
            };
            bgImg.src = bgImgURL;
        } else {
            // Set the background gradient
            let gradient = ctx.createLinearGradient(72, 0, 72, 144);
            gradient.addColorStop(0, "black");
            gradient.addColorStop(0.5, gradientBackgrounds[""+r_animationSet][0]);
            gradient.addColorStop(1, gradientBackgrounds[""+r_animationSet][1]);
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 144, 144);
        }

        let resImageURL = r_animationFrames[""+r_animationSet][""+r_animationAction][r_animationFrame]
        let img = new Image();
        img.onload = () => {
            var handleObj = this.getHandleObjFromCache(context);

            // Draw the base frame PNG
            ctx.fillStyle = "#0A1423";
            ctx.drawImage(img, 0, 0);
            
            // Draw the Progress Bar until Next Slot Event
            nextEventBar = {
                x: 6,
                y: 6,
                width: 2,
                height: 120,
            };
            let time_delta = now - r_lastInteractionTime;
            let time_pct = time_delta / (handleObj.settings.interactionIntervalMinutes * 1000); // * TODO: *60 more
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
            if (r_animationSet == 'blissful') {
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

            // Update
            $SD.api.setImage(context, handleObj.canvas.toDataURL());
        };
        img.src = resImageURL;
    },

    updateSafeSettings: function(context, settings) {
        let handleObj = this.getHandleObjFromCache(context);
        let updatedSettings = handleObj.settings;
        for(let field in settings){
            updatedSettings[field] = settings[field];
        }
        //$SD.api.setSettings(context, updatedSettings);
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
