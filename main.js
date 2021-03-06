var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepair = require('role.repair');
var spawn = require('spawning');

module.exports.loop = function () {
    console.log('---------------------');
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    //spawn new Creeps
    spawn.run();

    var tower = Game.getObjectById('TOWER_ID');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
    var soonToDie = 99999;
    var soonToDieName = '';
    var latestCreepTicks = 0;
    var latestCreepName = '';
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repair'){
            roleRepair.run(creep);
        }
        if(creep.ticksToLive < soonToDie){
          soonToDie = creep.ticksToLive;
          soonToDieName = name;
        }
        if(creep.ticksToLive > latestCreepTicks){
          latestCreepName = name;
          latestCreepTicks = creep.ticksToLive;
        }
    }
    console.log('Next Creep to die: ' + soonToDieName + ' with ' + soonToDie + ' ticks to live, creeps job is ' + Game.creeps[soonToDieName].memory.role);
    console.log('Latest Creep is: ' + latestCreepName + ' with ' + latestCreepTicks + ' ticks to live, creeps job is ' + Game.creeps[latestCreepName].memory.role);
    console.log('---------------------');
}
