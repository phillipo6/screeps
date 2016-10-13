var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepair = require('role.repair');
var spawn = require('spawning');

module.exports.loop = function () {
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
    Memory.soonToDie.ticks = 99999;
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
        if(Memory.soonToDie.ticks){
          if(creep.ticksToLive < Memory.soonToDie.ticks){
            Memory.soonToDie.ticks = creep.ticksToLive;
            Memory.soonToDie.name = name;
          }
        }else{
          Memory.soonToDie.ticks = creep.ticksToLive;
          Memory.soonToDie.name = name;
        }
    }
    console.log('Next Creep to die: ' + Memory.soonToDie.name);
}
