export const PRICE_MAP = {
  "cerebrum": 0.04,
  "cerebellum": 0.03,
  "brainstem": 0.02,
  "arterial": 0.01
}

export const footerData = {
  title: 'Thanks for submitting your response',
  leadCaptureMessage: 'Sign up for the Beta here!',
  notice: '© Tejas Nikumbh 2018. All rights reserved'
}

export const lockedSection = {
  image: 'template/lockv3.2.svg',
  notInstalled: {
    titles: ['Install Metamask', ''],
    description: `Oops! To play, you need to have metamask installed and setup
    correctly. Click below to download metamask.`,
    metamaskImage: 'template/download_metamask.png'
  },
  incorrectSetup: {
    titles: ['Setup', 'Metamask'],
    description: `To play, you need to have metamask unlocked and be on
    the Rinkeby Test Network. Click the button below to see how.`
  }
}

export const sectionData = [
    {
      logoImage: 'template/logov3.5.svg',
      title: 'BrainFunc',
      subTitle: `Learn about the Brain. Fight epic Battles. Build the ultimate
      Brain on the Blockchain!`
    },
    {
      image: 'custom/sections/networkv3.3.svg',
      titles: ['Collect.', ' Construct.', 'Battle.'],
      description: `BrainFunc is a learning adventure where you can apply your
        knowledge of neuroscience to compete and win in battles.`
    },
    {
      images: [
        'custom/sections/collectNeuronsv3.3.svg',
        'custom/sections/brainPartsv3.3.svg',
        'custom/sections/battlev3.3.svg'],
      titles: ['Collect Neurons', 'Construct Parts', 'Fight Epic Battles'],
      descriptions: [
        `Start by buying neural packs on the marketplace. Neurons are available
        in 13 different varieties and are randomly distributed. You can use these
        to build different brain parts or trade them on the market place.`,
        `Construct your own unique parts using neurons. These are crypto
        collectibles that exist forever on the blockchain, and are  unique to you.
        Each part is as valuable as it's strength, which can be increased in
        interesting ways.`,
        `Battles pair you with a random opponent. You can win these based on your
        knowledge of neuro science and the strength of your crypto collectibles.
        Each battle win will further strengthen your brain (or brain parts).`
      ]
    }
];

export const templateData = {
  "images": {
    "lock": "template/lock.png"
  }
}
export const menuData = {
  "marketplace": {
    "images": {
      "pack": {
        "cerebrum": "menu/marketplace/cerebrum_pack.png",
        "cerebellum": "menu/marketplace/cerebellum_pack.png",
        "brainstem":"menu/marketplace/brainstem_pack.png",
        "arterial":"menu/marketplace/arterial_pack.png"
      }
    },
    "details" : {
      "cerebrum": {
        "title": "Cerebrum",
        "subtitle": "5 Neuron Types",
        "description": `Buying this neuron will give you a neuron of either of the
        5 types, namely Frontal Lobe(left and right), Occipital Lobe, Temporal Lobe
        and Parietal Lobe. These 5 parts correspond to the parts of the Cerebrum and
        will help you compete in battles involving Cerebrum functionality.`,
        "price": "0.04",
        "neurons": 5
      },
      "cerebellum": {
        "title": "Cerebellum",
        "subtitle": "3 Neuron Types",
        "description": `Buying this neuron will give you a neuron of  either of
        the 3 types, namely Focculonodular lobe, Anterior Lobe and Posterior Lobe.
        These 3 parts correspond to the parts of the Cerebellum and will help you
        compete in battles involving Cerebellum related functionality.`,
        "price": "0.03",
        "neurons": 3
      },
      "brainstem": {
        "title": "Brainstem",
        "subtitle": "3 Neuron Types",
        "description": `Buying this neuron will give you a neuron of  either of
        the 3 types, namely Medulla, Midbrain and Pons. These 3 parts correspond
        to the parts of the Brainstem and will help you compete in battles
        involving brainstem related functionality.`,
        "price": "0.02",
        "neurons": 3
      },
      "arterial": {
        "title": "Arterial",
        "subtitle": "2 Neuron Types",
        "description": `Buying this neuron will give you a neuron of  either of
        the 2 types, namely the Basilar or Vertebral Arteries. They will help you
        construct these Arteries and aid you in fighting battles that require
        their functionality.`,
        "price": "0.01",
        "neurons": 2
      }
    }
  }
}

//Collect different parts of the brain using different neurons.
//Battle to increase their strength. Try various combinations
//to come up with the ultimate brain!
// export const sectionData = [
//   {
//     image: 'custom/sections/brain.svg',
//     titles: 'Get started by buying neurons',
//     description: `Buy neurons from our marketplace to get started on building
//     your brain. There are 12 types of neurons (corresponding to 12 brain sub parts),
//     and each will help you create some sub part of the brain. The kind of neuron
//     you will get is random.`
//   },
//   {
//     image: 'custom/sections/expert_scheduler.png',
//     title: 'Increase sub part strength',
//     description: `Each sub part strength is based on it's neuron count. You can
//     increase it by (a) collecting neurons of the same type via the marketplace
//     or (b) competing in Power Battles.`
//   },
//   {
//     image: 'custom/sections/expert_scheduler.png',
//     title: 'Fight in Power Battles',
//     description: `Power battles help you improve sub part strength by pitting you
//     against random opponents. Winning is based on current sub part strength and
//     each win will increase the sub part strength (by increasing it's neuron count)`
//   },
//   {
//     image: 'custom/sections/expert_chat_ui.png',
//     title: 'Construct a major part by collecting all sub parts',
//     description: `There are 3 major parts of the brain, namely Cerebrum,
//     Cerebellum and the Brain Stem. Each major part is constructed using 4 sub parts.
//     Once you have all sub parts for any major part (with any strength), you will
//     be able to construct it. You need atleast one major part to partake in Balance
//     Battles.`
//   },
//   {
//     image: 'custom/sections/expert_chat_storage.png',
//     title: 'Fight in Balance Battles',
//     description: `Balance battles are different than Power Battles. Here not only
//     does sub part strength play a role, but also their combination. Getting the
//     right combination of sub part strength to construct a powerful major part can
//     be tricky. This is currently only possible via experimentation by fighting
//     in battles.`
//   },
//   {
//     image: 'custom/sections/expert_chat_ui.png',
//     title: 'Fight in the Ultimate Battle',
//     description: `Ultimate battles are similar to Balance Battles, but are only
//     possible if you have the complete brain - viz all 3 major parts. The bounties
//     for Ultimate Battles are higher and these can be considered a more advanced
//     version of Balance Battles.`
//   },
//   {
//     image: 'custom/sections/expert_chat_storage.png',
//     title: 'Sell on the marketplace',
//     description: `You can sell neurons, sub parts and major parts or even the
//     entire brain on the market place. The more the strength of these items, the
//     more you should keep your price!`
//   }
// ];
