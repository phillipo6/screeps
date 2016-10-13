var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var container = creep.room.find(FIND_STRUCTURES, {filter: { structureType: STRUCTURE_CONTAINER}});
        if(creep.carry.energy < creep.carryCapacity) {
            var sources = Game.getObjectById(creep.memory.SourceID);
            if(sources){
            if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources);
            }
            }else{
                var sources = creep.pos.findClosestByRange(FIND_SOURCES);
            if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources);
            }
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            if(targets.length <=0){
                if(creep.transfer(container[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(container[0]);
                }
            }
        }

        var isNotFull = false;
        for(var id in container){
            var thisContainer = container[id];
            if(thisContainer.store[RESOURCE_ENERGY] < thisContainer.storeCapacity){
            isNotFull = true;
            }
        }

        var extensions = creep.room.find(FIND_STRUCTURES, {filter: { structureType: STRUCTURE_EXTENSION}});
        var isNotFullEx = false;
        for(var id in extensions){
            var thisExtension = extensions[id];
            if(thisExtension.energy < thisExtension.energyCapacity){
                isNotFullEx = true;
            }
        }

        if(Game.spawns['Spawn1'].energy == Game.spawns['Spawn1'].energyCapacity && isNotFull == false && isNotFullEx == false){
            creep.memory.role = 'builder';
            creep.memory.OldRole = 'harvester';
            creep.say('Changing to Builder Role');
        }
        if(creep.ticksToLive < 2 && creep.memory.SourceID == '579fa9210700be0674d2ecc3'){
            Memory.SourceOne -= 1;
        }
    }
};

module.exports = roleHarvester;
