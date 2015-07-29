var db = require('../models/index');

var User = db['User'];
var ConfigAmbientSound = db['ConfigAmbientSound'];
var ConfigAmbientLight = db['ConfigAmbientLight'];
var Device = db['Device'];

createUser();
createConfigAmbientSound();

/********/
/* USER */
/********/
function createUser()
{
    // create the user model and save it into db
    User.create({
        username: 'tessel',
        password: 'tessel123'
    })
    .then(function(record) {
        console.log('User inserted with id %s', record.id);
    })
    .catch(function(err) {
        console.log('Error during insert the User: %s', err.message);
    });
}

/************************/
/* CONFIG AMBIENT SOUND */
/************************/
function createConfigAmbientSound()
{
    // create the configAmbientSound model and save it into db
    ConfigAmbientSound.create({
        threshold: 0.010001
    })
    .then(function(record) {
        console.log('ConfigAmbientSound inserted with id %s', record.id);

        createConfigAmbientLight(record.id);
    })
    .catch(function(err) {
        console.log('Error during insert the ConfigAmbientSound: %s', err.message);
    });
}

/************************/
/* CONFIG AMBIENT LIGHT */
/************************/
function createConfigAmbientLight(configAmbientSoundId)
{
    // create the configAmbientLight model and save it into db
    ConfigAmbientLight.create({
        threshold: 0.010002
    })
    .then(function(record) {
        console.log('ConfigAmbientLight inserted with id %s', record.id);

        createDevice(configAmbientSoundId, record.id);
    })
    .catch(function(err) {
        console.log('Error during insert the ConfigAmbientLight: %s', err.message);
    });
}

/**********/
/* DEVICE */
/**********/
function createDevice(configAmbientSoundId, configAmbientLightId){
    // create the device model and save it into db
    Device.create({
        name: 'tesselHara',
        configAmbientSoundId: configAmbientSoundId,
        configAmbientLightId: configAmbientLightId
    })
    .then(function(record) {
        console.log('Device inserted with id %s', record.id);
    })
    .catch(function(err) {
        console.log('Error during insert the Device: %s', err.message);
    });
}
