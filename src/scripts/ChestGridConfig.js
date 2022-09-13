export let ChestGridConfig = {
    chests: [],
    chests_in_width: 3,
    chests_in_height: 2,
    chestSize: document.body.clientWidth / 8,
    animation: {
        init_delay: 425,
        position_duration: 275,
    },
    bonusWinChance: 1/10,
    bonusMaxCount: 1,
};

ChestGridConfig.gap = {
    width: ChestGridConfig.chestSize,
    height: ChestGridConfig.chestSize / 10,
}

for (let height_index = 0; height_index < ChestGridConfig.chests_in_height; height_index++) {
    for (let width_index = 1; width_index <= ChestGridConfig.chests_in_width; width_index++) {
        const id = width_index + (ChestGridConfig.chests_in_width * height_index);
        let x;
        let y;

        if (id%ChestGridConfig.chests_in_width === 1) {
            x = -ChestGridConfig.chestSize - ChestGridConfig.gap.width;
        } else if (id%ChestGridConfig.chests_in_width === 2) {
            x = 0;
        } else {
            x = ChestGridConfig.chestSize + ChestGridConfig.gap.width;
        }

        if (Math.floor((id - 1)/ChestGridConfig.chests_in_width) === 0) {
            y = -ChestGridConfig.chestSize/2 - ChestGridConfig.gap.height;
        } else if (Math.floor((id - 1)/ChestGridConfig.chests_in_width) === 1) {
            y = ChestGridConfig.chestSize/2 + ChestGridConfig.gap.height;
        }

        ChestGridConfig.chests.push({id, x, y});
    }
}