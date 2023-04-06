const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract",function (){
    let Token;
    let hardhatToken;
    let owner;
    let addr1;
    let adr2;
    let addrs;

    //runs before every test, thus reducing the repetition of code
    beforeEach(async function(){
        Token = await ethers.getContractFactory("Token");
        hardhatToken = await Token.deploy();
        [owner,addr1,addr2,...addrs]= await ethers.getSigners();
    });

    describe("Deployment", function(){

        it("Should set the right owner", async function(){
            expect(await hardhatToken.owner()).to.equal(owner.address);
        })

        it("Should assign the total supply to the owner", async function(){
            const ownerBalance = await hardhatToken.balanceOf(owner.address);
            expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
        })
    });

    describe("Transactions", function(){
        it("Should transfer tokens between accounts",async function(){
            //from owner account to addr1 
            await hardhatToken.transfer(addr1.address,5);
            const addr1Balance = await hardhatToken.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(5);

            //from addr1 to addr2
            await hardhatToken.connect(addr1).transfer(addr2.address,5);
            const addr2Balance = await hardhatToken.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(5);
        })
        it("Should fail if sender does not have enough balance", async function(){
            const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);//10000

            await expect(hardhatToken.connect(addr1).transfer(owner.address,1)//initially addr1 has 0 tokens
            ).to.be.revertedWith("Not enough tokens"); //matches the statement with the statement in the transfer function if the leading condition is not fullfilles, if it matches, then the test passes
            
            expect(await hardhatToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
        })
        it("Should update the balance after transfer", async function(){
            const initialOwnerBalance = await  hardhatToken.balanceOf(owner.address);
            await hardhatToken.transfer(addr1.address,5);
            await hardhatToken.transfer(addr2.address,10);
            
            const finalOwnerBalance = await hardhatToken.balanceOf(owner.address);
            expect(finalOwnerBalance).to.equal(initialOwnerBalance-15);

            expect(await hardhatToken.balanceOf(addr1.address)).to.equal(5);
            expect(await hardhatToken.balanceOf(addr2.address)).to.equal(10);
        })
    })

})

// describe("Token Contract", function(){

//     it("Deployment should assign the total supply of tokens to the owner", async function(){

//         const owner = await ethers.getSigner();
//         // console.log("Signer object:",owner);

//         const Token = await ethers.getContractFactory("Token"); //instance contract

//         const hardhatToken = await Token.deploy(); //deploy contract

//         const ownerBalance = await hardhatToken.balanceOf(owner.address); //ownerBalance =10000
//         // console.log("owner address:",owner.address);

//         expect(await hardhatToken.totalSupply()).to.equal(ownerBalance); //totalSupply = 10000
//     })

//     it("Should transfer tokens between accounts", async function(){

//         const [owner, addr1, addr2] = await ethers.getSigners();

//         const Token = await ethers.getContractFactory("Token"); //instance contract

//         const hardhatToken = await Token.deploy(); //deploy contract

//         //Transfer 10 tokens from owner to addr1
//         await hardhatToken.connect(owner).transfer(addr1.address,10);
//         expect(await hardhatToken.balanceOf(addr1.address)).to.equal(10);

//         //transfer 5 tokens from addr1 to addr2
//         await hardhatToken.connect(addr1).transfer(addr2.address,5);
//         expect(await hardhatToken.balanceOf(addr2.address)).to.equal(5);

//     })
    
// });