var spawnNew = {
    run: function() {
var AmountOfHarvester = 10;
var AmountOfUpgrader = 3;
var AmountOfBuilder = 3;
var AmountOfRepair = 2;
var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
var OldHarvester = _.filter(Game.creeps, (creep) => creep.memory.OldRole == 'harvester');
Memory.SourceOne = 0;
var harvesterlength = 0;
for(var id in harvesters){
    var thisHarvester = harvesters[id];
    if(thisHarvester.memory.role == 'harvester' || thisHarvester.memory.OldRole == 'harvester'){
        harvesterlength += 1;
    }
    if(thisHarvester.memory.SourceID == '579fa9210700be0674d2ecc3'){
        Memory.SourceOne += 1;
    }
}

    if(harvesterlength < AmountOfHarvester) {
        if(Memory.SourceOne < Game.creeps.length/2){
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'harvester', SourceID: '579fa9210700be0674d2ecc3'});
        Memory.SourceOne +=1;
        console.log('Spawning new harvester: ' + newName);

        }else{
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'harvester', SourceID: '579fa9210700be0674d2ecc4'});
        console.log('Spawning new harvester: ' + newName);
        }
    }

    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');


    if(upgraders.length < AmountOfUpgrader && harvesterlength >= AmountOfHarvester){
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'upgrader'});
        console.log('Spawning new upgrader: ' + newName);

    }

    var repairs = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair');

    if(repairs.length < AmountOfRepair && harvesterlength >= AmountOfHarvester){
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'repair'});
        console.log('Spawning new RepairMan: ' + newName);
    }

    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

    if(builders.length < AmountOfBuilder && harvesterlength >= AmountOfHarvester){
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'builder'});
        console.log('Spawning new builder: ' + newName);

    }
        console.log('Repair: ' + repairs.length);
        console.log('Builder: ' + builders.length);
        console.log('Harvesters: ' + harvesterlength);
        console.log('Upgrader: ' + upgraders.length);
        console.log('---------------------');
    }
};
module.exports = spawnNew;
