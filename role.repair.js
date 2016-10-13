var roleRepair = {
    run: function(creep){
    if(creep.carry[RESOURCE_ENERGY] < 50 && creep.memory.refilled == false) {
    var spawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
    var moveResult = creep.moveTo(spawn);
    var transferResult = spawn.transferEnergy(creep);
    creep.memory.refilled = true;
    }else if(creep.carry[RESOURCE_ENERGY] < 10){
        creep.memory.refilled = false;
    }
    else{
    var SR = creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: s=> s.hits < s.hitsMax})
    if(creep.repair(SR) == ERR_NOT_IN_RANGE){
                creep.moveTo(SR);
    }

    }
}
};

module.exports = roleRepair;
