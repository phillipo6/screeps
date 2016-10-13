var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('building');
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }else{
                creep.moveTo(Game.spawns['Spawn1']);
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            sources = creep.pos.findClosestByRange(sources);
            if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources);
            }
        }
        //var container = creep.room.find(FIND_STRUCTURES, {filter: { structureType: STRUCTURE_CONTAINER},{ (s) => s.store[RESOURCE_ENERGY] < s.storeCapacity}});
        const emptyContainer = _.filter(creep.room.find(FIND_MY_STRUCTURES), (structure) => {
                return structure.structureType === STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
             });

        if( creep.memory.OldRole == 'harvester' &&  (Game.spawns['Spawn1'].energy != Game.spawns['Spawn1'].energyCapacity || emptyContainer.length > 0)){
            creep.memory.role = 'harvester';
            creep.say('Changing to Harvester Role');
        }
    }
};

module.exports = roleBuilder;
