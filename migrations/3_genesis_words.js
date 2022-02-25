let Baseballs = artifacts.require("Baseballs")
let BaseballWords = artifacts.require("BaseballWords")
let Words = artifacts.require("Words")


module.exports = async function (deployer, network) {

    try {

        let wordsContract = await Words.deployed()
        let baseballWordsContract = await BaseballWords.deployed()
        let baseballsContract = await Baseballs.deployed()

        async function getWordId(word) {
            let wordId = await wordsContract.wordId(word)
            return parseInt(wordId)
        }

        await wordsContract.createWords(['Theme', 'Grass', 'Dirt', 'Diamond', 'Bat', 'Wood', 'USA', 'Font Face',
                                        'Arial', 'Courier New', 'Georgia', 'Times New Roman', 'Verdana', 'Font Size', '50', '80',
                                        '110', '140', 'Font Style', 'NORMAL', 'ITALIC', 'BOLD', 'BOLDITALIC']
        )

        //Create 3 projects
        await baseballWordsContract.createProject(
            ['The 714 Collection', "You're 24. You're a great pitcher but you're sick of only playing every 5 days and America just outlawed booze which is your favorite beverage. You tell the manager you want to hit. He puts you in the lineup but you know he hates it. He wants you to pitch. What an idiot. You start to dream about big apples.", "QmPXMXk3tMwzEAnt16dtzv8pbYWjgULX1kcucVRy84F3ba"],
            [714, '10000000000000000000'],
            [
             1, /**Theme*/ 
             8, /**Font Face */
             14, /**Font Size */
             19 /**Font Style */
            ],
            [
                [
                    await getWordId('Diamond'), /** Diamond */
                    25000,

                    await getWordId('USA'), /** USA */
                    75000,

                    await getWordId('Bat'), /** Bat */
                    100000,

                    await getWordId('Dirt'), /** Dirt*/
                    250000,

                    await getWordId('Grass'), /**Grass*/
                    550000
                ],
                [

                    await getWordId('Verdana'), /** Verdana */
                    31250,

                    await getWordId('Times New Roman'), /** Times New Roman */
                    93750,

                    await getWordId('Georgia'), /** Georgia */
                    125000,

                    await getWordId('Courier New'), /** Courier New */
                    250000,

                    await getWordId('Arial'), /** Arial */
                    500000
                ],
                [
                    await getWordId('50'), /** 50 font size */
                    62500,
                    
                    await getWordId('80'), /** 80 font size */
                    187500,

                    await getWordId('110'), /** 110 font size */
                    250000,

                    await getWordId('140'), /** 140 font size */
                    500000,

                ],
                [
                    await getWordId('BOLDITALIC'), /** BOLDITALIC */
                    62500,

                    await getWordId('BOLD'), /** BOLD */
                    187500,

                    await getWordId('ITALIC'), /** ITALIC */
                    250000,

                    await getWordId('NORMAL'), /** NORMAL */
                    500000,
    
                ]
            ]
        )

        await baseballWordsContract.createProject(
            ['The 755 Collection', "You're 39. You just hit 40 home runs. Crazy. Who does that? You didn’t quite make it though. So close. Now you have the whole offseason to think about it and you joke that you just hope you don’t die before April. You don’t. You’re alive and you are going to make them remember your name. You’ve never stopped swinging. You start to dream about nails.", "QmV5HxsFCutsfJta6bKmzBQyhpmvnB5GYztRX3Gs9RobdQ"],
            [755, '10000000000000000000'],
            [
             1, /**Theme*/ 
             8, /**Font Face */
             14, /**Font Size */
             19 /**Font Style */
            ],
            [
                [
                    await getWordId('Diamond'), /** Diamond */
                    25000,

                    await getWordId('USA'), /** USA */
                    75000,

                    await getWordId('Bat'), /** Bat */
                    100000,

                    await getWordId('Dirt'), /** Dirt*/
                    250000,

                    await getWordId('Grass'), /**Grass*/
                    550000
                ],
                [

                    await getWordId('Verdana'), /** Verdana */
                    31250,

                    await getWordId('Times New Roman'), /** Times New Roman */
                    93750,

                    await getWordId('Georgia'), /** Georgia */
                    125000,

                    await getWordId('Courier New'), /** Courier New */
                    250000,

                    await getWordId('Arial'), /** Arial */
                    500000
                ],
                [
                    await getWordId('50'), /** 50 font size */
                    62500,
                    
                    await getWordId('80'), /** 80 font size */
                    187500,

                    await getWordId('110'), /** 110 font size */
                    250000,

                    await getWordId('140'), /** 140 font size */
                    500000,

                ],
                [
                    await getWordId('BOLDITALIC'), /** BOLDITALIC */
                    62500,

                    await getWordId('BOLD'), /** BOLD */
                    187500,

                    await getWordId('ITALIC'), /** ITALIC */
                    250000,

                    await getWordId('NORMAL'), /** NORMAL */
                    500000,
    
                ]
            ]
        )

        await baseballWordsContract.createProject(
            ['The 762 Collection', "You’re 35. You have 3 MVPs but you’d have 6 if they didn’t hate you. They only care about home runs. You’d hit more but they literally won’t pitch to you. You’re shopping for clothes. You tell your wife that a walk and a stolen base is basically a double. She doesn’t care. Why does none of this stuff fit anymore she asks you. You tell her you’re trying a new diet and why does it even matter? Geez. You tell yourself you’re never going to hit another single. Home runs only. You start to have really weird dreams that you don’t want to tell the doctor about.", "QmPdEmBPta68Q8zGc95RmtGDUdrU4ETK78rMoC1ZvFmWYV"],
            [762, '10000000000000000000'],
            [
             1, /**Theme*/ 
             8, /**Font Face */
             14, /**Font Size */
             19 /**Font Style */
            ],
            [
                [
                    await getWordId('Diamond'), /** Diamond */
                    25000,

                    await getWordId('USA'), /** USA */
                    75000,

                    await getWordId('Bat'), /** Bat */
                    100000,

                    await getWordId('Dirt'), /** Dirt*/
                    250000,

                    await getWordId('Grass'), /**Grass*/
                    550000
                ],
                [

                    await getWordId('Verdana'), /** Verdana */
                    31250,

                    await getWordId('Times New Roman'), /** Times New Roman */
                    93750,

                    await getWordId('Georgia'), /** Georgia */
                    125000,

                    await getWordId('Courier New'), /** Courier New */
                    250000,

                    await getWordId('Arial'), /** Arial */
                    500000
                ],
                [
                    await getWordId('50'), /** 50 font size */
                    62500,
                    
                    await getWordId('80'), /** 80 font size */
                    187500,

                    await getWordId('110'), /** 110 font size */
                    250000,

                    await getWordId('140'), /** 140 font size */
                    500000,
                ],
                [
                    await getWordId('BOLDITALIC'), /** BOLDITALIC */
                    62500,

                    await getWordId('BOLD'), /** BOLD */
                    187500,

                    await getWordId('ITALIC'), /** ITALIC */
                    250000,

                    await getWordId('NORMAL'), /** NORMAL */
                    500000,
    
                ]
            ]
        )

        

        //Testing - mint many
        // for (let i=0; i < 9000; i+=1000) {
        //     console.log(`Minting baseballs ${i}`)

        //     tokens = [...Array(i+1000).keys()].slice(i) //2000-2050
        //     baseballsContract.mint(tokens)
        // }
    
        // //Approve to spend
        // let maxApproval = '115792089237316195423570985008687907853269984665640564039457584007913129639935'; //(2^256 - 1 )
        // baseballsContract.approve(baseballWordsContract.address, maxApproval)

        // //Activate
        // baseballWordsContract.activateProject('340282366920938463463374607431768211456')
        // baseballWordsContract.activateProject('680564733841876926926749214863536422912')
        // baseballWordsContract.activateProject('1020847100762815390390123822295304634368')


        //Mint
        // for (let i=0; i < 714; i++) {
        //     console.log(`Minting ${i}`)
        //     baseballWordsContract.mint('340282366920938463463374607431768211456')
        // }

        // for (let i=0; i < 755; i++) {
        //     console.log(`Minting ${i}`)
        //     baseballWordsContract.mint('680564733841876926926749214863536422912')
        // }

        // for (let i=0; i < 100; i++) {
        //     console.log(`Minting ${i}`)
        //     baseballWordsContract.mint('1020847100762815390390123822295304634368')
        // }


        
    } catch (e) {
        console.log(`Error in migration: ${e.message}`)
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }