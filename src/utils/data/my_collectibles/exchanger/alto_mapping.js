// Alchemical Mug
// Amulet of Dreams
// Arcanist's Tome of Spells
// Haste Drums
// Scroll of the Light's Watch
export const Data = {
  General: {
    brainfunc_item: {
      locked_image: `/style/images/collectibles/brainparts/lockedBrainpart5.png`
    }
  },
  LootItemMappings: [
    {
      brainfunc_item : {
        title: `Medulla`,
        index: 10,
        category: 2,
        categoryIndex: 2,
        subcategoryIndex: 10,
        status: "locked",
        substitle: ``,
        image: `/style/images/collectibles/brainparts/medulla.png`
      },
      alto_item: {
        id: `8`,
        title: `Scroll of the Light's Watch`,
        image: `/style/images/collectibles/alto/scroll.png`,
        gray_scale: `/style/images/collectibles/alto/scroll_gray.png`
      }
    },
    {
      brainfunc_item : {
        title: `Frontal Lobe(left)`,
        index: 0,
        category: 0,
        categoryIndex: 0,
        subcategoryIndex: 0,
        status: "locked",
        substitle: ``,
        image: `/style/images/collectibles/brainparts/leftfrontal.png`
      },
      alto_item: {
        id: `2`,
        title: `Arcanist's Tome of Spells`,
        image: `/style/images/collectibles/alto/arcanist.png`,
        gray_scale: `/style/images/collectibles/alto/arcanist_gray.png`
      }
    },
    {
      brainfunc_item : {
        title: `Occipital Lobe`,
        index: 4,
        category: 0,
        categoryIndex: 0,
        subcategoryIndex: 4,
        status: "unlocked",
        substitle: ``,
        image: `/style/images/collectibles/brainparts/occipital.png`
      },
      alto_item: {
        id: `19`,
        title: `Amulet of Dreams`,
        image: `/style/images/collectibles/alto/amulet.png`,
        gray_scale: `/style/images/collectibles/alto/amulet_gray.png`
      }
    },
    {
      brainfunc_item : {
        title: `Posterior Lobe`,
        index: 6,
        category: 1,
        categoryIndex: 1,
        subcategoryIndex: 6,
        status: "locked",
        substitle: ``,
        image: `/style/images/collectibles/brainparts/posteriorlobe.png`
      },
      alto_item: {
        id: `46`,
        title: `Alchemical Mug`,
        image: `/style/images/collectibles/alto/alchemialmug.png`,
        gray_scale: `/style/images/collectibles/alto/alchemialmug_gray.png`
      }
    },
    {
      brainfunc_item : {
        title: `Temporal Lobe`,
        index: 3,
        category: 0,
        categoryIndex: 0,
        subcategoryIndex: 3,
        status: "locked",
        substitle: ``,
        image: `/style/images/collectibles/brainparts/temporal.png`
      },
      alto_item: {
        id: `25`,
        title: `Haste \nDrums`,
        image: `/style/images/collectibles/alto/hastedrums.png`,
        gray_scale: `/style/images/collectibles/alto/hastedrums_gray.png`
      }
    }
  ]
};
