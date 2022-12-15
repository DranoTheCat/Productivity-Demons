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
        "1": "images/happy/happy1.png",
        "2": "images/happy/happy2.png",
        "3": "images/happy/happy3.png",
        "4": "images/happy/happy4.png",
        "5": "images/happy/happy5.png",
        "6": "images/happy/happy6.png",
        "7": "images/happy/happy7.png",
        "8": "images/happy/happy8.png",
        "9": "images/happy/happy9.png",
        "10": "images/happy/happy10.png",
    },
};

var animationTimings = {
    "happy": {
        "1": 2600,
        "2": 32,
        "3": 420,
        "4": 64,
        "5": 900,
        "6": 50,
        "7": 32,
        "8": 200,
        "9": 32,
        "10": 50,
    },
}

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
        },
        runtime: {
            lastInteractionTime: 0,
            scoreTotal: 0,
            animationTime: 0,
            animationFrame: 1,
            animationSet: "happy",
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
    },

    onKeyUp: function(jsonObj) {
        var context = jsonObj.context;
        lastContext = context;
        let handleObj = this.getHandleObjFromCache(context);

        // do dice stuff here
        let now = Date.now();
        demonAction.updateRuntime(context, {lastInteractionTime: now});
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
                    handleObj.runtime.scoreTotal = "happy";
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
                const val = parseInt(jsonObj.payload['interactionIntervalMinutes']) || 15;
                handleObj.settings.interactionIntervalMinutes = val;
            }
            demonAction.updateSettings(context, {
                easyOutcome: handleObj.settings.easyOutcome,
                mediumOutcome: handleObj.settings.mediumOutcome,
                hardOutcome: handleObj.settings.hardOutcome,
                interactionIntervalMinutes: handleObj.settings.interactionIntervalMinutes,
            });
        }
    },

    updateDisplay: function(context) {
        let handleObj = this.getHandleObjFromCache(context);
        
        let animationTime = handleObj.runtime.animationTime;
        let animationFrame = handleObj.runtime.animationFrame;
        let animationSet = handleObj.runtime.animationSet;
        let lastInteractionTime = handleObj.runtime.lastInteractionTime;
        let scoreTotal = handleObj.runtime.scoreTotal;
        let now = Date.now();

        // Do it here just in case we get in a weird state
        if (animationFrame >= Object.keys(animationTimings[""+animationSet]).length) {
            animationFrame = 1;
            console.log("Reset animation loop");
            demonAction.updateRuntime(context, {animationFrame: animationFrame});
        }

        console.log(now - animationTime);
        if (now - animationTime > animationTimings[""+animationSet][animationFrame]) {
            animationFrame += 1;
            animationTime = now;
            demonAction.updateRuntime(context, {
                animationFrame: animationFrame,
                animationTime: animationTime,
            });
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
        
        //let resImageURL = "images/pluginIcon@2x.png";
        console.log(animationFrame);
        let resImageURL = animationFrames[""+animationSet][animationFrame];

        let img = new Image();
        img.onload = () => {
            var handleObj = this.getHandleObjFromCache(context);
            ctx.drawImage(img, 0, 0);
            let time_delta = now - lastInteractionTime;
            let time_pct = time_delta / (handleObj.settings.interactionIntervalMinutes * 1000); // * 60 more
            if (time_pct > 1) {
                time_pct = 1;
            }

            ctx.fillStyle = "#FF00FF";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = "3em Georgia";
            ctx.fillText(animationFrame, 72, 15);

            ctx.fillStyle = "#FF4444";
            ctx.fillRect(12, 40, 120, 2);   
            ctx.fillStyle = "#44FF44";
            let pixels_to_fill = 120;
            if (time_pct <= 1) {
                pixels_to_fill -= Math.floor(time_pct * 120);
                if (pixels_to_fill < 1) {
                    pixels_to_fill = 1;
                }
            }
            ctx.fillRect(12, 40, pixels_to_fill, 2);
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