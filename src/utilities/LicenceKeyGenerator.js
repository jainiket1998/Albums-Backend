let generator ={}
generator.generateKey = () => {
    return "ID_"+generator.generateRandom()+generator.generateRandom();
}

generator.generateLicenceKey = (LicenceNumber) => {
    return ""+LicenceNumber+"_"+generator.generateRandom()+generator.generateRandom();
}

generator.generateRandom = () => {
    return Math.floor((1 + Math.random()) * 0x1000000)
    .toString(32)
    .substring(1);
}

console.log(generator.generateLicenceKey("license"));

module.exports = generator;