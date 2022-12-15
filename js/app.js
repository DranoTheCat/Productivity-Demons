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

var animationFrames = {
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
            interactionIntervalMinutes: 5, // 15?
            dailyScoreTarget: 100,
        },
        runtime: {
            lastInteractionTime: 0,
            scoreTotal: 0,
            animationTime: 0,
            animationFrame: 1,
            animationSet: "happy",
            animationAction: "idle",
            lastBreath: 0,
            lastOtherAnim: 0,
            frameNum: 0,
            lastFrame: 0,
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
        demonAction.updateRuntime(context, {
            lastInteractionTime: Date.now(),
        });
    },

    onKeyUp: function(jsonObj) {
        var context = jsonObj.context;
        lastContext = context;
        let handleObj = this.getHandleObjFromCache(context);
        let scoreTotal = handleObj.runtime.scoreTotal;
        let animationSet = handleObj.runtime.animationSet;
        let lastInteractionTime = handleObj.runtime.lastInteractionTime;

        if (Date.now() - lastInteractionTime > 500) { // long press -- reset
            scoreTotal = 0;
            animationSet = "happy";
            demonAction.updateRuntime(context, {
                animationSet: animationSet,
                scoreTotal: scoreTotal,
            });
        }

        // do slot machine stuff here
        scoreTotal += 5;

        let now = Date.now();
        let as = "happy";
        if (animationSet == 'blissful') {
            as = 'blissful';
        }
        demonAction.updateRuntime(context, {
            lastInteractionTime: now,
            animationSet: as,
            animationAction: "blink",
            scoreTotal: scoreTotal,
        });
        this.updateDisplay(context);
    },

    onWillAppear: function(jsonObj) {
        var context = jsonObj.context;
        var settings = jsonObj.payload.settings;
        var runtime = jsonObj.payload.runtime;
        lastContext = context;
        let handleObj = this.getHandleObjFromCache(context);
        if (runtime != null) {
            if (runtime.hasOwnProperty('lastInteractionTime')) {
                handleObj.runtime.lastInteractionTime = runtime['lastInteractionTime'];
                if (unaldeObj.runtime.lastInteractionTime === undefined || isNaN(handleObj.runtime.lastInteractionTime)) {
                    handleObj.runtime.lastInteractionTime = 0;
                }
            }
            if (runtime.hasOwnProperty('scoreTotal')) {
                handleObj.runtime.scoreTotal = runtime['scoreTotal'];
                if (unaldeObj.runtime.scoreTotal === undefined || isNaN(handleObj.runtime.scoreTotal)) {
                    handleObj.runtime.scoreTotal = 0;
                }
            }
            if (runtime.hasOwnProperty('animationTime')) {
                handleObj.runtime.animationTime = runtime['animationTime'];
                if (unaldeObj.runtime.animationTime === undefined || isNaN(handleObj.runtime.animationTime)) {
                    handleObj.runtime.animationTime = 0;
                }
            }
            if (runtime.hasOwnProperty('animationFrame')) {
                handleObj.runtime.animationFrame = runtime['animationFrame'];
                if (unaldeObj.runtime.animationFrame === undefined || isNaN(handleObj.runtime.animationFrame)) {
                    handleObj.runtime.animationFrame = 1;
                }
            }
            if (runtime.hasOwnProperty('animationSet')) {
                handleObj.runtime.animationSet = runtime['animationSet'];
                if (unaldeObj.runtime.animationSet === undefined) {
                    handleObj.runtime.animationSet = "happy";
                }
            }
            if (runtime.hasOwnProperty('animationAction')) {
                handleObj.runtime.animationAction = runtime['animationAction'];
                if (unaldeObj.runtime.animationAction === undefined) {
                    handleObj.runtime.animationAction = "idle";
                }
            }
            if (runtime.hasOwnProperty('lastBreath')) {
                handleObj.runtime.lastBreath = runtime['lastBreath'];
                if (unaldeObj.runtime.lastBreath === undefined) {
                    handleObj.runtime.lastBreath = 0;
                }
            }
            if (runtime.hasOwnProperty('lastOtherAnim')) {
                handleObj.runtime.lastOtherAnim = runtime['lastOtherAnim'];
                if (unaldeObj.runtime.lastOtherAnim === undefined) {
                    handleObj.runtime.lastOtherAnim = 0;
                }
            }
            if (runtime.hasOwnProperty('frameNum')) {
                handleObj.runtime.frameNum = runtime['frameNum'];
                if (unaldeObj.runtime.frameNum === undefined) {
                    handleObj.runtime.frameNum = 0;
                }
            }
            if (runtime.hasOwnProperty('lastFrame')) {
                handleObj.runtime.fralastFrameeNum = runtime['lastFrame'];
                if (unaldeObj.runtime.lastFrame === undefined) {
                    handleObj.runtime.lastFrame = 0;
                }
            }
        }
        if (settings != null) {
            if (settings.hasOwnProperty('easyOutcome')) {
                handleObj.settings.easyOutcome = settings['easyOutcome'] || "Rleax!";
            }
            if (settings.hasOwnProperty('mediumOutcome')) {
                handleObj.settings.mediumOutcome = settings['mediumOutcome'] || "Stretch!";
            }
            if (settings.hasOwnProperty('hardOutcome')) {
                handleObj.settings.hardOutcome = settings['hardOutcome'] || "Be Productive!";
            }
        }
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
                const val = jsonObj.payload['easyOutcome'] || "Relax!";
                handleObj.settings.easyOutcome = val;
            }
            if (jsonObj.payload.hasOwnProperty('mediumOutcome')) {
                const val = jsonObj.payload['mediumOutcome'] || "Stretch!";
                handleObj.settings.mediumOutcome = val;
            }
            if (jsonObj.payload.hasOwnProperty('hardOutcome')) {
                const val = jsonObj.payload['hardOutcome'] || "Be Productive!";
                handleObj.settings.hardOutcome = val;
            }
            if (jsonObj.payload.hasOwnProperty('interactionIntervalMinutes')) {
                const val = parseInt(jsonObj.payload['interactionIntervalMinutes']) || 5;
                handleObj.settings.interactionIntervalMinutes = val;
            }
            if (jsonObj.payload.hasOwnProperty('dailyScoreTarget')) {
                const val = parseInt(jsonObj.payload['dailyScoreTarget']) || 5;
                handleObj.settings.dailyScoreTarget = val;
            }
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
        
        let animationTime = handleObj.runtime.animationTime;
        let animationFrame = handleObj.runtime.animationFrame;
        let animationSet = handleObj.runtime.animationSet;
        let animationAction = handleObj.runtime.animationAction;
        let lastBreath = handleObj.runtime.lastBreath;
        let lastOtherAnim = handleObj.runtime.lastOtherAnim;
        let lastInteractionTime = handleObj.runtime.lastInteractionTime;
        let scoreTotal = handleObj.runtime.scoreTotal;
        let frameNum = handleObj.runtime.frameNum;
        let lastFrame = handleObj.runtime.lastFrame;
        let now = Date.now();

        // Track 24 frame-rate for background stuffs (pentagram, etc.)
        if (now - lastFrame > 41.67) {
            frameNum += 1;
            if (frameNum >= 24) {
                frameNum = 1;
            }
            lastFrame = now;
            demonAction.updateRuntime(context, {
                frameNum: frameNum,
                lastFrame: lastFrame,
            });
        }

        if (animationAction == 'idle') {
            animationFrame = 1;
            if (animationSet != 'blissful') {
                if (scoreTotal >= handleObj.settings.dailyScoreTarget) {
                    animationSet = "blissful";
                    demonAction.updateRuntime(context, {
                        animationSet: animationSet,
                    });
                }
            }
        } else {
            if (animationFrame >= Object.keys(animationTimings[""+animationSet][""+animationAction]).length) {
                animationFrame = 1;
                animationAction = 'idle';
                demonAction.updateRuntime(context, {
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
                demonAction.updateRuntime(context, {
                    animationFrame: animationFrame,
                    animationAction: animationAction,
                    lastBreath: lastBreath,
                });
            } else {
                if (now - lastOtherAnim > 1000) { // Check to run other animations every second
                    // Also a good time to see if we need to change state
                    if (animationSet != 'blissful') {
                        deltaInterval = parseInt((now - lastInteractionTime) / (handleObj.settings.interactionIntervalMinutes * 500)); // TODO: * 60 // 500 because /2
                        if (deltaInterval >= stateIntervals.length) {
                            deltaInterval = stateIntervals.length - 1;
                        }
                        nstate = stateIntervals[deltaInterval];
                        if (nstate != animationSet) {
                            animationSet = nstate;
                            console.log("new state: " + nstate);
                            demonAction.updateRuntime(context, {
                                animationSet: animationSet,
                            });
                        }
                    }
                    for (let j in animationOthers[animationSet]) {
                        if (Math.random() < animationOthers[animationSet][j]) {
                            animationFrame = 1;
                            animationAction = j;
                            demonAction.updateRuntime(context, {
                                animationFrame: animationFrame,
                                animationAction: animationAction,
                                lastOtherAnim: now,
                            });
                            //break;
                        }
                    }
                    demonAction.updateRuntime(context, {
                        lastOtherAnim: now,
                    });
                }
            }
        } else {
            if (now - animationTime > animationTimings[""+animationSet][""+animationAction][animationFrame]) {
                animationFrame += 1;
                animationTime = now;
                demonAction.updateRuntime(context, {
                    animationFrame: animationFrame,
                    animationTime: animationTime,
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
        if (animationSet == 'hellpossessed') {
            let bgImg = new Image();
            let bgImgURL = bgAnimations["hellpossessed"][frameNum];
            console.log(bgImgURL);
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
            nextEventBar = {
                x: 6,
                y: 6,
                width: 2,
                height: 120,
            };
            let time_delta = now - lastInteractionTime;
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
            score_pct = scoreTotal / handleObj.settings.dailyScoreTarget;
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

    // Really just saved in settings, but :whistle:
    updateRuntime: function(context, runtime) {
        let handleObj = this.getHandleObjFromCache(context);
        let updatedRuntime = handleObj.runtime;
        for(let field in runtime){
            updatedRuntime[field] = runtime[field];
        }
        $SD.api.setSettings(context, updatedRuntime);
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