const journeyData = [
    {
        id: "meknes",
        city: "Meknès",
        country: "Maroc",
        transport: "train",
        theme: "morocco-meknes",
        text: `Il y avait aussi une tradition : à l’arrivée dans notre village natal, il fallait rendre visite aux morts. Mon père et ma grand-mère sont enterrés à côté, une drôle de coïncidence. Mon père n’était pas du tout marocain. Il était né en Égypte et avait immigré en Suisse pour devenir ingénieur informaticien, alors que le métier en était encore à ses débuts. Il est décédé d’un cancer du cerveau quand j’avais six ans.\n\nJ’aime bien le Maroc. C’est un endroit très vrai, où le superficiel n’a pas sa place. Lorsque je rendis visite à une amie de la famille, Soukaina Boubia, professeur d’histoire-géographie à la Haute École de tourisme de Rabat-Salé, elle m’offrit un livre sur l’histoire du Maroc. C’est un très beau cadeau : offrir le savoir.`,
        images: [
            "images/meknes/000118380040.jpg",
            "images/meknes/IMG_0043.JPG",
            "images/meknes/IMG_0047.JPG",
            "images/meknes/IMG_0061.JPG",
            "images/meknes/IMG_0083.JPG",
            "images/meknes/IMG_0090.JPG",
            "images/meknes/IMG_0096.JPG",
            "images/meknes/IMG_0101.JPG",
            "images/meknes/IMG_0113.JPG",
            "images/meknes/IMG_0114.JPG"
        ]
    },
    {
        id: "rabat",
        city: "Rabat",
        country: "Maroc",
        transport: "avion",
        theme: "morocco-rabat",
        text: `Je rejoignis ma famille à l’avenue Hassan, près du mausolée de Mohamed V. Nous nous rendîmes directement à la gare ferroviaire et prîmes le train Al Atlas, qui relie les grandes villes marocaines.\n\nDans mon compartiment, à part ma sœur et ma mère, il y avait un homme dans un coin qui lisait son journal pendant tout le trajet. À côté, toute une famille était également présente : la grand-mère, la mère, la fille et la petite fille.\n\nMa mère me raconta une habitude de ses années étudiantes, lorsqu’elle faisait la navette entre Rabat et Meknès. À l’arrivée à une gare, ses camarades masculins ouvraient toujours les portes alors que le train était encore en approche, prétendant que c’était pour s’aérer.`,
        images: [
            "images/rabat/000118380036.jpg",
            "images/rabat/000118380037.jpg",
            "images/rabat/000118380038.jpg",
            "images/rabat/000118380039.jpg",
            "images/rabat/IMG_0164.JPG",
            "images/rabat/IMG_0169.JPG",
            "images/rabat/IMG_0176.JPG",
            "images/rabat/IMG_0189.JPG"
        ]
    },
    {
        id: "paris",
        city: "Paris",
        country: "France",
        transport: "avion",
        theme: "paris",
        text: `Paris Paris, ville lumière, ville des arts, mais surtout ville de misère. On entend souvent dire que les inégalités sont aujourd’hui plus fortes que du temps de la Révolution française.\n\nLe lendemain, je me levai pour continuer ma visite. Objectif : banlieue. Je me dirigeai vers le quartier qui me correspondrait : Barbès-Rochechouart, un quartier à forte population maghrébine.\n\nL’après-midi, je me rends au cimetière du Père-Lachaise. Je suis allé voir quelques tombes précises pour, en quelque sorte, recevoir leur bénédiction : Guillaume Apollinaire, Frédéric Chopin, Jean-Baptiste Poquelin, etc.`,
        images: [
            "images/paris/IMG_0377.JPG",
            "images/paris/IMG_0380.JPG",
            "images/paris/IMG_0410.JPG",
            "images/paris/IMG_0420.JPG",
            "images/paris/IMG_0422.JPG",
            "images/paris/IMG_0430.JPG",
            "images/paris/IMG_0456.JPG",
            "images/paris/IMG_0458.JPG"
        ]
    },
    {
        id: "stockholm",
        city: "Stockholm",
        country: "Suède",
        transport: "avion",
        theme: "sweden",
        text: `J’arrive à l’aéroport de Stockholm-Arlanda à 00h20. C’est la première fois que je ne comprends rien. Où sont les belles blondes pour me guider vers mon hôtel ?\n\nJ’aime bien Stockholm : les cinnamon rolls, Ikea, et leur lait d’avoine. Je pense que je pourrais y vivre quelque temps. Mais il me reste quand même ce sentiment qu’au fond, je ne serai jamais vraiment accepté.`,
        images: [
            { src: "images/stockholm/IMG_0660.JPG", name: "BILLY Bibliothèque", price: 599 },
            { src: "images/stockholm/IMG_0663.JPG", name: "POÄNG Fauteuil", price: 899 },
            { src: "images/stockholm/IMG_0687.JPG", name: "KALLAX Étagère", price: 499 },
            { src: "images/stockholm/IMG_0689.JPG", name: "MALM Lit", price: 1995 },
            { src: "images/stockholm/IMG_0697.JPG", name: "STOCKHOLM Miroir", price: 799 },
            { src: "images/stockholm/IMG_0730.JPG", name: "HEMNES Commode", price: 1495 },
            { src: "images/stockholm/IMG_0742.JPG", name: "LACK Table", price: 99 },
            { src: "images/stockholm/IMG_0743.JPG", name: "FÄRGKLAR Assiette", price: 49 }
        ]
    },
    {
        id: "helsinki",
        city: "Helsinki",
        country: "Finlande",
        transport: "bateau",
        theme: "finland",
        text: `C’est seulement après avoir découvert les Moomins que j’ai commencé à apprécier Helsinki. La nuit tombe tellement vite. Elle s’écrase.\n\nLe départ de ce pays fut fabuleux. Sur le pont d’un ferry, je voyais défiler d’abord Helsinki, puis ses îles, et je me retrouvais sur la mer du Nord. Une immensité de bleu à perte de vue.`,
        images: [
            "images/helsinki/000118380034.jpg",
            "images/helsinki/IMG_1005.JPG",
            "images/helsinki/IMG_1007.JPG",
            "images/helsinki/IMG_1013.JPG",
            "images/helsinki/IMG_1014.JPG",
            "images/helsinki/IMG_1016.JPG",
            "images/helsinki/IMG_1018.JPG",
            "images/helsinki/IMG_1043.JPG"
        ]
    },
    {
        id: "tallinn",
        city: "Tallinn",
        country: "Estonie",
        transport: "bus",
        theme: "estonia",
        text: `Ce qui m’a surpris à Tallinn, c’est la manière dont ce pays est passé d’un pays communiste à un pays européen comme les autres. Certes, il restait des vestiges, mais la comparaison avec la Suisse était tentante.\n\nJe visitai le musée national des arts estoniens. L’approche critique et sociale a été déclenchée par les profondes inégalités ressenties dans la société des années 1990.`,
        images: [
            "images/tallinn/000118380030.jpg",
            "images/tallinn/000118380031.jpg",
            "images/tallinn/000118380032.jpg",
            "images/tallinn/000118380033.jpg",
            "images/tallinn/IMG_1332.JPG",
            "images/tallinn/IMG_1387.JPG",
            "images/tallinn/IMG_1395.JPG",
            "images/tallinn/IMG_1399.JPG"
        ]
    },
    {
        id: "riga",
        city: "Riga",
        country: "Lettonie",
        transport: "bus",
        theme: "latvia",
        text: `La Lettonie ressemble davantage au communisme d’avant. Les gens y sont d’une gentillesse débordante. Le froid signifie beaucoup de choses : la solitude, la température, l’atmosphère.`,
        images: [
            "images/riga/IMG_1690.JPG",
            "images/riga/IMG_1704.JPG",
            "images/riga/IMG_1712.JPG",
            "images/riga/IMG_1716.JPG",
            "images/riga/IMG_1719.JPG",
            "images/riga/IMG_1723.JPG",
            "images/riga/IMG_1726.JPG",
            "images/riga/IMG_1731.JPG"
        ]
    },
    {
        id: "varsovie",
        city: "Varsovie",
        country: "Pologne",
        transport: "train",
        theme: "poland",
        text: `Après une longue nuit dans ce car polonais, je me sens assommé à l’arrivée. Un froid que je n’avais jamais ressenti m’a paralysé.\n\nLe soir, je retournai à la gare de Warszawa Centralna pour prendre le train Chopin, direction Praha hlavní nádraží.`,
        images: [
            "images/varsovie/000118380024.jpg",
            "images/varsovie/000118380025.jpg",
            "images/varsovie/000118380026.jpg",
            "images/varsovie/000118380027.jpg",
            "images/varsovie/IMG_2020.JPG",
            "images/varsovie/IMG_2031.JPG",
            "images/varsovie/IMG_2056.JPG",
            "images/varsovie/IMG_2058.JPG"
        ]
    },
    {
        id: "prague",
        city: "Prague",
        country: "République Tchèque",
        transport: "avion",
        theme: "czechia",
        text: `Prague est une belle ville. J’ai surtout aimé sa ressemblance avec la Suisse : cétait comme retrouver mon chez-moi. Prague a été profondément marquée par l’influence du Kremlin.\n\nCe soir-là, je partis pour la Suisse avec un goût amer en bouche. Comment peut-on être à ce point aveugle à la misère ?`,
        images: [
            "images/prague/000118380001.jpg",
            "images/prague/000118380002.jpg",
            "images/prague/000118380003.jpg",
            "images/prague/000118380004.jpg",
            "images/prague/000118380006.jpg",
            "images/prague/000118380007.jpg",
            "images/prague/000118380009.jpg",
            "images/prague/000118380010.jpg"
        ]
    },
    {
        id: "about",
        city: "À propos de l'auteur",
        country: "Mazin",
        transport: "none",
        theme: "author",
        text: "Je m'appelle Mazin, et ce voyage est le reflet de ma quête d'identité entre l'Orient et l'Occident.\n\nPassionné d'informatique et d'histoire, j'ai voulu documenter ces moments de vie à travers une interface qui rappelle mes premiers pas sur un ordinateur.",
        images: []
    },
    {
        id: "project",
        city: "Le Projet",
        country: "Documentation",
        transport: "fin",
        theme: "project",
        text: "Ce site est une SPA narrative utilisant des technologies web modernes pour simuler un système rétro.\n\nChaque pays dispose d'un univers visuel propre, codé en CSS pour refléter l'âme du voyage.",
        images: []
    }
];

const poems = [
    {
        title: "Demain, dès l'aube...",
        author: "Victor Hugo",
        text: "Demain, dès l'aube, à l'heure où blanchit la campagne,\nJe partirai. Vois-tu, je sais que tu m'attends.\nJ'irai par la forêt, j'irai par la montagne.\nJe ne puis demeurer loin de toi plus longtemps."
    },
    {
        title: "Le Pont Mirabeau",
        author: "Guillaume Apollinaire",
        text: "Sous le pont Mirabeau coule la Seine\nEt nos amours\nFaut-il qu'il m'en souvienne\nLa joie venait toujours après la peine"
    },
    {
        title: "Sensation",
        author: "Arthur Rimbaud",
        text: "Par les soirs bleus d'été, j'irai dans les sentiers,\nPicoté par les blés, fouler l'herbe menue :\nRêveur, j'en sentirai la fraîcheur à mes pieds.\nJe laisserai le vent baigner ma tête nue."
    },
    {
        title: "Le Dormeur du val",
        author: "Arthur Rimbaud",
        text: "C'est un trou de verdure où chante une rivière,\nAccrochant follement aux herbes des haillons\nD'argent ; où le soleil, de la montagne fière,\nLuit : c'est un petit val qui mousse de rayons."
    },
    {
        title: "Correspondances",
        author: "Charles Baudelaire",
        text: "La Nature est un temple où de vivants piliers\nLaissent parfois sortir de confuses paroles ;\nL'homme y passe à travers des forêts de symboles\nQui l'observent avec des regards familiers."
    }
];
