class Game {
    constructor(data) {
        this.time = data?.time || 0;

        this.points = {
            total: data?.points?.total || 0,
            perTick: data?.points?.perTick || 0.02,
            upgradebonus: data?.points?.upgradebonus || 1,
            max: data?.points?.max || 0,
        };

        this.upgrade1 = {
            cost: data?.upgrade1?.cost || 7.77,
            level: data?.upgrade1?.level || 0,
            increase: data?.upgrade1?.increase || 1.1,
            increase2: data?.upgrade1?.increase2 || 1.1,
        };

        this.upgrade2 = {
            cost: data?.upgrade2?.cost || 100,
            level: data?.upgrade2?.level || 0,
        };

        this.Ppoints = {
            total: data?.Ppoints?.total || 0,
            earn: data?.Ppoints?.earn || 0,
            reset: data?.Ppoints?.reset || 0,
            time: data?.Ppoints?.time || 0,
            max: data?.Ppoints?.max || 0,
        };

        this.PrestigeUpgrade1 = {
            cost: data?.PrestigeUpgrade1?.cost || 1,
            level: data?.PrestigeUpgrade1?.level || 0,
            effectiveness: data?.PrestigeUpgrade1?.effectiveness || 1
        };

        this.PrestigeUpgrade2 = {
            cost: data?.PrestigeUpgrade2?.cost || 5,
            level: data?.PrestigeUpgrade2?.level || 0,
            effectiveness: data?.PrestigeUpgrade2?.effectiveness || 1
        };

        this.PrestigeUpgrade3 = {
            cost: data?.PrestigeUpgrade3?.cost || 3,
            level: data?.PrestigeUpgrade3?.level || 0,
            effectiveness: data?.PrestigeUpgrade3?.effectiveness || 1
        };

        this.PrestigeUpgrade4 = {
            cost: data?.PrestigeUpgrade4?.cost || 2,
            level: data?.PrestigeUpgrade4?.level || 0,
            effectiveness: data?.PrestigeUpgrade4?.effectiveness || 1
        };

        this.PrestigeUpgrade5 = {
            cost: data?.PrestigeUpgrade5?.cost || 10000,
            level: data?.PrestigeUpgrade5?.level || 0,
            effectiveness: data?.PrestigeUpgrade5?.effectiveness || 0,
        };

        this.generator = {
            total: data?.generator?.total || 1,
            multiplier: data?.generator?.multiplier || 1.0002,
            translate: data?.generator?.translate || 1,
            exponent: data?.generator?.exponent || 1.5,
        };

        this.gupgrade1 = {
            cost: data?.gupgrade1?.cost || 4,
            level: data?.gupgrade1?.level || 0,
        };

        this.gupgrade2 = {
            cost: data?.gupgrade2?.cost || 1e25,
            level: data?.gupgrade2?.level || 0,
        };

        this.gupgrade3 = {
            cost: data?.gupgrade3?.cost || 1e30,
            level: data?.gupgrade3?.level || 0,
        };

        this.gupgrade4 = {
            cost: data?.gupgrade4?.cost || new OmegaNum("1e500"),
            level: data?.gupgrade4?.level || 0,
        };
    };
};

var game = new Game();

function addPoints() {
    game.points.total = OmegaNum.add(game.points.perTick, game.points.total);
    game.points.perTick = OmegaNum.times(0.02, game.PrestigeUpgrade1.effectiveness).times(game.points.upgradebonus).times(game.PrestigeUpgrade2.effectiveness).times(game.PrestigeUpgrade3.effectiveness).times(game.PrestigeUpgrade4.effectiveness).times(game.generator.translate);
    game.Ppoints.time = OmegaNum.add(0.02, game.Ppoints.time);
    game.PrestigeUpgrade5.effectiveness = (OmegaNum.times(game.Ppoints.earn, OmegaNum.divide(game.PrestigeUpgrade5.level, 250)));
    game.Ppoints.total = OmegaNum.add(game.Ppoints.total, game.PrestigeUpgrade5.effectiveness)
    game.generator.translate = OmegaNum.pow(game.generator.total, game.generator.exponent);
};

function addPPoints() {
    if (OmegaNum.compare(game.points.total, 1e9) >= 0) {
        game.Ppoints.total = OmegaNum.add(game.Ppoints.earn, game.Ppoints.total);
        game.points.total = 0;
        game.points.perTick = OmegaNum.times(game.PrestigeUpgrade1.effectiveness, 0.02).times(game.PrestigeUpgrade2.effectiveness).times(game.PrestigeUpgrade3.effectiveness).times(game.PrestigeUpgrade4.effectiveness);
        game.upgrade1.cost = new OmegaNum("10");
        game.upgrade1.level = new OmegaNum("0");
        game.upgrade2.cost = new OmegaNum("100");
        game.upgrade2.level = new OmegaNum("0");
        game.points.upgradebonus = new OmegaNum("1");
        game.Ppoints.reset += 1;
        game.Ppoints.time = 0;
        game.upgrade1.increase = 1.1;
    } else {
        alert("You can't prestige now!");
    };
};

function notate(n = new OmegaNum(0)) {
    n = new OmegaNum(n);

    if (n.sign == -1) { return `-${n.abs()}`; }
    if (isNaN(n.array[0])) { return "NaN"; }
    if (!isFinite(n.array[0])) { return Infinity; }

    let s = "";
    if (!n.array[1]) {
        let e = Math.floor(Math.log10(n.array[0]));
        let m = n.array[0] / 10 ** e;
        return e < 3 ? n.toPrecision(3) : `${m.toPrecision(3)}e${e}`;
    }
    else if (n.array[1] < 2) { 
        return `${Math.pow(10, n.array[0] - Math.floor(n.array[0])).toPrecision(3)}e${Math.floor(n.array[0]).toLocaleString("pt-BR")}`;
    }
    else {
        return `${"e".repeat(n.array[1])}${Math.floor(n.array[0])}`;
    }
}

window.addEventListener('keyup', function(e) {
    switch (e.key) {
        case "p":
            addPPoints()
}})

function Save() {
    saveData = game;
    localStorage.saveData = JSON.stringify(saveData);
};

function Load() {
    game = new Game(JSON.parse(localStorage.saveData));
    console.log("Save loaded");
    return saveData.obj || "default";
};

var mainGameLoop = window.setInterval(function() {
    ui();
}, 1);

var mainGameLoop = window.setInterval(function() {
    addPoints();
}, 20);

var mainGameLoop = window.setInterval(function() {
    if (OmegaNum.compare(game.points.total, game.points.max) >= 0) {
        game.points.max = game.points.total;
    };
}, 1);

var mainGameLoop = window.setInterval(function() {
    if (OmegaNum.compare(game.Ppoints.total, game.Ppoints.max) >= 0) {
        game.Ppoints.max = game.Ppoints.total;
    };
}, 1);

function recalculate() {
    game.PrestigeUpgrade1.effectiveness = OmegaNum.pow(game.time, 0.5).pow(game.PrestigeUpgrade1.level).pow(OmegaNum.divide(game.gupgrade3.level, 7).add(1));
    game.PrestigeUpgrade2.effectiveness = OmegaNum.pow(OmegaNum.add(game.Ppoints.time, 1), 0.55).pow(game.PrestigeUpgrade2.level);
    if (OmegaNum.compare(game.points.total, 1e9) >= 0 || (OmegaNum.compare(game.Ppoints.reset, 0) == 1)) {
        game.Ppoints.earn = OmegaNum.pow(10, OmegaNum.log10(game.points.total) / 27 - 0.7).times(2.3263);
    }
    game.points.upgradebonus = OmegaNum.times(OmegaNum.pow(game.upgrade1.increase2, game.upgrade1.level), OmegaNum.pow(1.3333333333333333333333333, game.upgrade2.level));
    game.upgrade1.level = new OmegaNum(game.upgrade1.level);
    game.upgrade2.level = new OmegaNum(game.upgrade2.level);
    game.gupgrade1.level = new OmegaNum(game.gupgrade1.level);
    game.gupgrade4.level = new OmegaNum(game.gupgrade4.level);
};

var mainGameLoop = window.setInterval(function() {
    recalculate();
}, 1);

function openPage(pageName, elmnt, color) {
    // Hide all elements with class="tabcontent" by default */
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove the background color of all tablinks/buttons
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }

    // Show the specific tab content
    document.getElementById(pageName).style.display = "block";

    // Add the specific color to the button used to open the tab content
    elmnt.style.backgroundColor = color;
}


function ui() {
    document.getElementById("points").innerHTML = `You have ${notate(game.points.total)} points.`;
    document.getElementById("PPS").innerHTML = `You are earning ${notate(OmegaNum.times(game.points.perTick, 50))} points per second.`;
    if (OmegaNum.compare(game.PrestigeUpgrade4.level, 0) == -1) {
        document.getElementById("increase1").innerHTML = `Receive 10% more points.`
    } else if ((OmegaNum.compare(game.upgrade1.increase2, 1.1) >= 0) && OmegaNum.compare(game.upgrade1.increase2, 2) == -1) {
        document.getElementById("increase1").innerHTML = `Receive ${OmegaNum.sub(game.upgrade1.increase2, 1).times(100).toFixed(2)}% more points.`
    } else {
        document.getElementById("increase1").innerHTML = `Receive ${notate(game.upgrade1.increase2)} times more points.`
    }
    document.getElementById("upgrade1").innerHTML = `Cost: ${notate(game.upgrade1.cost)} (${notate(OmegaNum.divide(game.upgrade1.cost, OmegaNum.times(game.points.perTick, 50)))}s) <br> Level: ${game.upgrade1.level}`;
    if (OmegaNum.compare(game.upgrade1.increase, 2) <= 0) {
        document.getElementById("buy1").innerHTML = `Buy (+${(OmegaNum.sub(game.upgrade1.increase, 1).times(100).toFixed(2))}%)`;
    } else {
        document.getElementById("buy1").innerHTML = `Buy (x${notate(game.upgrade1.increase)})`;
    }

    if (OmegaNum.compare(game.upgrade2.level, 100) <= 0) {
        document.getElementById("buy2").innerHTML = `Buy`;
    } else {
        document.getElementById("buy2").innerHTML = `Buy (x${notate(OmegaNum.divide(OmegaNum.pow(game.upgrade2.cost, 1.015), game.upgrade2.cost))})`;
    }

    document.getElementById("upgrade2").innerHTML = `Cost: ${notate(game.upgrade2.cost)} (${notate(OmegaNum.divide(game.upgrade2.cost, OmegaNum.times(game.points.perTick, 50)))}s) <br> Level: ${game.upgrade2.level}`;
    if ((OmegaNum.compare(game.Ppoints.reset, 0) > 0) || (OmegaNum.compare(game.points.total, 1e9) >= 0)) {
        document.getElementById("Ppoints").innerHTML = `You have <strong>${notate(game.Ppoints.total)}</strong> Prestige Points.`;
    } else {
        document.getElementById("Ppoints").innerHTML = `This space will be unlocked when you have 1.000.000.000 Points.`;
    };

    if (OmegaNum.compare(game.points.total, 1e9) < 0) {
        document.getElementById("Ppointsreset").innerHTML = `${(OmegaNum.divide(OmegaNum.log10(game.points.total), 9).times(100)).toFixed(2)}% completed.`;
    } else if (OmegaNum.compare(game.PrestigeUpgrade5.level, 0) == 0) {
        document.getElementById("Ppointsreset").innerHTML = `Prestige to gain ${notate(game.Ppoints.earn)} Prestige Points.`;
    } else {
        document.getElementById("Ppointsreset").innerHTML = `You are earning ${notate(OmegaNum.times(game.PrestigeUpgrade5.effectiveness, 50))} Prestige Points per second.`
    };

    if (OmegaNum.compare(game.Ppoints.reset, 1) >= 0) {
        document.getElementById("upgrade3").innerHTML = `Increase points multiplier income based on time played. <br> <br> ${notate(game.PrestigeUpgrade1.effectiveness)} times more <br> Cost: ${notate(game.PrestigeUpgrade1.cost)} Prestige Points.`;
        if (OmegaNum.compare(game.PrestigeUpgrade2.cost, 1e3) == -1) {
            document.getElementById("upgrade4").innerHTML = `Increase points multiplier income based on time played during this prestige. <br> <br> ${notate(game.PrestigeUpgrade2.effectiveness)} times more <br> Cost: ${notate(game.PrestigeUpgrade2.cost)} Prestige Points.`;
        } else {
            document.getElementById("upgrade4").innerHTML = `Increase points multiplier income based on time played during this prestige. <br> <br> ${notate(game.PrestigeUpgrade2.effectiveness)} times more <br> Cost: ${notate(game.PrestigeUpgrade2.cost)} PP.`;
        }
        document.getElementById("upgrade5").innerHTML = `Earn 10x more points. <br> <br> ${notate(game.PrestigeUpgrade3.effectiveness)} times more <br> Cost: ${notate(game.PrestigeUpgrade3.cost)} Prestige Points.`;
        document.getElementById("upgrade7").innerHTML = `First points upgrade is stronger. <br> <br> Cost: ${notate(game.PrestigeUpgrade4.cost)} Prestige Points.`;
    } else {
        document.getElementById("upgrade3").innerHTML = `???`;
        document.getElementById("upgrade4").innerHTML = `???`;
        document.getElementById("upgrade5").innerHTML = `???`;
        document.getElementById("upgrade7").innerHTML = `???`;
    };

    if ((OmegaNum.compare(game.Ppoints.total, 1000) >= 0) || (OmegaNum.compare(game.PrestigeUpgrade5.level, 1) >= 0)) {
        document.getElementById("upgrade9").innerHTML = `You earn more Prestige Points automatically based on your current points. <br> <br>  Cost: ${notate(game.PrestigeUpgrade5.cost)} Prestige Points.`;
    } else {
        document.getElementById("upgrade9").innerHTML = `??? <br> <br> Unlocked at 10.000 Prestige Points and viewable at 1.000 Prestige Points.`;
    }

    if (OmegaNum.compare(game.Ppoints.total, 5e6) >= 0) {
        document.getElementById("generatornumber").innerHTML = `You have <strong style="font-size: 125%;">${notate(game.generator.total)}</strong> generator points, translating to ${notate(game.generator.translate)} times more points. <br> <br style="font-size: 75%"> You are earning ${notate(OmegaNum.times((OmegaNum.pow(game.generator.multiplier, 50)), 100).sub(100))}% more generator points per second.`
        document.getElementById("gup1").innerHTML = `Increase generator points receivement. <br> Cost: ${notate(game.gupgrade1.cost)} GP.`
        document.getElementById("gup2").innerHTML = `Improves generator bonus formula. <br> Effect: x<sup>${notate(game.generator.exponent)}</sup> -> x<sup>${notate(OmegaNum.times(game.generator.exponent, 1.0333333333333333))}<br> Cost: ${notate(game.gupgrade2.cost)} GP.`;
        document.getElementById("gup3").innerHTML = `First Prestige Points Upgrade is stronger. <br> <br> Cost: ${notate(game.gupgrade3.cost)} GP.`;
        document.getElementById("gup4").innerHTML = `Point Generation is better based on your second points upgrade. <br> <br> Cost: ${notate(game.gupgrade4.cost)} Points.`;
    } else {
        if (OmegaNum.compare(game.Ppoints.total, 1) <= 0) {
            document.getElementById("generatornumber").innerHTML = `???`;
            document.getElementById("gup1").innerHTML = `???`;
            document.getElementById("gup2").innerHTML = `???`;
            document.getElementById("gup3").innerHTML = `???`;
            document.getElementById("gup4").innerHTML = `???`;
        } else {
            document.getElementById("generatornumber").innerHTML = `Unlocked at 5.000.000 Prestige Points`;
            document.getElementById("gup1").innerHTML = `${(OmegaNum.times(OmegaNum.divide(OmegaNum.log10(game.Ppoints.total), OmegaNum.log10(5e6)), 100)).toFixed(2)}% completed.`
            document.getElementById("gup2").innerHTML = `Another button`;
            document.getElementById("gup3").innerHTML = `Another button`;
            document.getElementById("gup4").innerHTML = `Another button`;
        }
    }

    document.getElementById("time").innerHTML = `Total time played: ${(game.time).toFixed(0)} seconds.`;
    document.getElementById("total").innerHTML = `Total points income: ${notate(OmegaNum.times(game.PrestigeUpgrade1.effectiveness, game.PrestigeUpgrade2.effectiveness).times(game.PrestigeUpgrade3.effectiveness).times(game.PrestigeUpgrade4.effectiveness).times(game.generator.translate))}x`;
    document.getElementById("max").innerHTML = `Maximum points reached: ${notate(game.points.max)}`
};

var mainGameLoop = window.setInterval(function () {
    ui();
}, 1);

function time() {
    game.time = OmegaNum.add(0.02, game.time);
    if (OmegaNum.compare(game.gupgrade4.level, 1) >= 0) {
        game.generator.multiplier = (OmegaNum.pow(40, OmegaNum.div(game.upgrade2.level, 16000000).div(40)).pow(Math.pow(game.gupgrade1.level, 2))).pow(OmegaNum.pow(game.gupgrade4.level, 0.3));
    } else {
        game.generator.multiplier = OmegaNum.pow(1.05, game.gupgrade1.level).times(0.0002).add(1);
    }
}

var mainGameLoop = window.setInterval(function () {
    time();
}, 20);
