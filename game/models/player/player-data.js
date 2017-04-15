PlayerData = {};

PlayerData.COLORS_RGB = {
    'Blue': '41, 98, 255',
    'Cyan': '13, 115, 119',
    'Orange': '255, 145, 0',
    'Purple': '131, 68, 150',
    'Red': '239, 83, 80',
    'Yellow': '255, 206, 62',
    'Pink': '197, 17, 98',
    'White': '224, 224, 224'
}

PlayerData.MAX_LIFE = 5;

PlayerData.defaultHorizontalVelocity = 1000;

// Calculates the x-velocity of the player, based on a given width
PlayerData.calculateHorizontalVelocity = function(width) {
    PlayerData.defaultHorizontalVelocity = (800 + ChartData.DIFFICULTY[ChartData.currentDifficulty] * 50) * width / 800;
}