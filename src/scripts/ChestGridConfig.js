export let ChestGridConfig = {
    pieces: [],
    piece_in_width: 3,
    piece_in_height: 2,
    chestSize: document.body.clientWidth / 5,
    gap: {
        width: document.body.clientWidth / 5 / 3,
        height: document.body.clientWidth / 5 / 25,
    }
};

for (let height_index = 0; height_index < ChestGridConfig.piece_in_height; height_index++) {
    for (let width_index = 1; width_index <= ChestGridConfig.piece_in_width; width_index++) {
        const id = width_index + (ChestGridConfig.piece_in_width * height_index);
        let x;
        let y;

        if (id%ChestGridConfig.piece_in_width === 1) {
            x = -ChestGridConfig.chestSize - ChestGridConfig.gap.width;
        } else if (id%ChestGridConfig.piece_in_width === 2) {
            x = 0;
        } else {
            x = ChestGridConfig.chestSize + ChestGridConfig.gap.width;
        }

        if (Math.floor((id - 1)/ChestGridConfig.piece_in_width) === 0) {
            y = -ChestGridConfig.chestSize/2 - ChestGridConfig.gap.height;
        } else if (Math.floor((id - 1)/ChestGridConfig.piece_in_width) === 1) {
            y = ChestGridConfig.chestSize/2 + ChestGridConfig.gap.height;
        }

        ChestGridConfig.pieces.push({id, x, y});
    }
}